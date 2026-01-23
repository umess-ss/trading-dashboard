from rest_framework import viewsets, permissions
from .models import Wallet
from .serializers import WalletSerializers


class WalletViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = WalletSerializers

    def get_queryset(self):
        return Wallet.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)