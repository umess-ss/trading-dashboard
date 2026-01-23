from rest_framework import viewsets
from .models import Asset
from .serializers import AssetSerializers
from rest_framework.response import Response
from rest_framework.decorators import action

class AssetViewSet(viewsets.ModelViewSet):
    query = Asset.objects.filter(is_tradable=True)
    serializer_class = AssetSerializers

    @action(detail=True,methods=['get'])
    def candles(self,request,pk=None):
        data = [
            {"time": "2026-01-20", "open": 105, "high": 110, "low": 100, "close": 108},
            {"time": "2026-01-21", "open": 108, "high": 115, "low": 107, "close": 112},
        ]
        return Response(data)