from rest_framework import serializers
from .models import Order

class OrderSerializer(serializers.ModelSerializer):
    asset_symbol = serializers.ReadOnlyField(source='asset.symbol')
    class Meta:
        model = Order
        fields = ['id','asset','asset_symbol','side','price','quantity','status','timestamp']
        read_only_fields = ['status', 'timestamp']