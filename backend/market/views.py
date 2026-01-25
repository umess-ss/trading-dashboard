import requests
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import viewsets


class AssetViewSet(viewsets.ModelViewSet):
    @action(detail=True, methods=['get'])
    def candles(self,request,pk=None):
        symbol = "BTCUSDT"
        interval = "1m"   #1 min candle
        limit = 1000      #1000 candles

        url = f"https://api.binance.com/api/v3/klines?symbol={symbol}&interval={interval}&limit={limit}"

        try:
            response = requests.get(url)
            data = response.json()

            formatted_data = []
            for item in data:
                formatted_data.append({
                    "time":item[0]//1000,                #convert ms to s
                    "open": float(item[1]),
                    "high": float(item[2]),
                    "low": float(item[3]),
                    "close": float(item[4]),
                })

            return Response(formatted_data)

        except Exception as e:
            return Response({"error": str(e)}, status=500)