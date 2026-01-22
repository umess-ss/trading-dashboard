from rest_framework import serializers
from .models import Order

class OrderSerializer(serializers.Serializer):
    asset_symbol = serializers.ReadOnlyField(source='asset.symbol')
    class Meta:
        model = Order
        fields = ['id','asset','asset_symbol','side','price','quantity','status','created_at']
        read_only_fields = ['status', 'created_at']