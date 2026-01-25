import requests
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import viewsets
from .models import Asset
from .serializers import AssetSerializers


class AssetViewSet(viewsets.ModelViewSet):
    queryset = Asset.objects.all()
    serializer_class = AssetSerializers


    @action(detail=True, methods=['get'])
    def candles(self,request,pk=None):
        # symbol = "BTCUSDT"
        symbol = request.query_params.get('symbol', 'BTCUSDT').upper()
        interval = "1m"   #1 min candle
        limit = 1000      #1000 candles


        try:
            url = f"https://api.binance.com/api/v3/klines?symbol={symbol}&interval={interval}&limit={limit}"
            response = requests.get(url, timeout=10)
            response.raise_for_status()


            data = response.json()

            formatted_data = []
            for item in data:
                formatted_data.append({
                    "time": int(item[0]/1000),                #convert ms to s
                    "open": float(item[1]),
                    "high": float(item[2]),
                    "low": float(item[3]),
                    "close": float(item[4]),
                })

            return Response(formatted_data)

        except Exception as e:
            return Response({"error": str(e)}, status=500)