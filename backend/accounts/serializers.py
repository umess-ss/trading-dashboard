from rest_framework import serializers
from .models import Wallet, UserProfile

class WalletSerializers(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source = 'user.username')

    class Meta:
        model = Wallet
        fields = ["username", "balance", "updated_at"]


class UserProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    email = serializers.EmailField(source='user.email', read_only=True)
    
    class Meta:
        model = UserProfile
        fields = ['id', 'username', 'email', 'btc_balance', 'eth_balance', 
                  'sol_balance', 'bnb_balance', 'ada_balance', 'usdt_balance']