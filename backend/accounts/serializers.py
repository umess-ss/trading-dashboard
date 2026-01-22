from rest_framework import serializers
from .models import Wallet

class WalletSerializers(serializers.Serializer):
    username = serializers.ReadOnlyField(source = 'user.username')

    class Meta:
        model = Wallet
        fields = ["username", "balance", "updated_at"]