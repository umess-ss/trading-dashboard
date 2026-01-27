from rest_framework import serializers
from .models import Order
from accounts.models import UserProfile

class OrderSerializer(serializers.ModelSerializer):
    asset_symbol = serializers.ReadOnlyField(source='asset.symbol')
    class Meta:
        model = Order
        fields = ['id','asset','asset_symbol','side','price','quantity','status','timestamp']
        read_only_fields = ['status', 'timestamp']

    def validate(self,data):
        user = self.context['request'].user
        profile, _ = UserProfile.objects.get_or_create(user=user)


        total_cost = data['price'] * data['quantity']

        if data['side'] == 'BUY':
            if profile.usdt_balance < total_cost:
                raise serializers.ValidationError("Insufficient USDT balance.")
            
        elif data['side'] == 'SELL':
            asset_symbol = data['asset'].symbol.lower()
            balance_field = f"{asset_symbol}_balance"
            user_crypto_balance = getattr(profile, balance_field, 0)


            if user_crypto_balance < data['quantity']:
                raise serializers.ValidationError("Insufficient {asset_symbol.upper()} balance")
            
        return data