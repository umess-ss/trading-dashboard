from rest_framework import viewsets, permissions
from .models import Order
from .serializers import OrderSerializer
from django.db import transaction
from decimal import Decimal
from accounts.models import UserProfile


class OrderViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = OrderSerializer

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user).order_by("-timestamp")
    
    def perform_create(self, serializer):
        with transaction.atomic():
            # 1. save the order

            order = serializer.save(user=self.request.user)

            # 2. Logic for filling the order
            profile, _ = UserProfile.objects.get_or_create(user=self.request.user)
            cost = Decimal(str(order.price)) * Decimal(str(order.quantity))
            asset_field = f"{order.asset.symbol.lower()}_balance"


            try:
                current_crypto_quantity = getattr(profile, asset_field)
            except AttributeError:
                raise Exception(f"Profile has no balance field for {asset_field}")

            if order.side == 'BUY':        # cost need to reduce and asset_balance neeed to be added to user profile
                profile.usdt_balance = Decimal(str(profile.usdt_balance)) - cost
                setattr(profile, asset_field, Decimal(str(current_crypto_quantity)) + order.quantity)

            else:
                profile.usdt_balance = Decimal(str(profile.usdt_balance)) + cost
                setattr(profile, asset_field, Decimal(str(current_crypto_quantity)) - order.quantity)

            # 3. update status and save profile
            order.status = 'FILLED'
            order.save()
            profile.save()