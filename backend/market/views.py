from rest_framework import viewsets
from .models import Asset
from .serializers import AssetSerializers

class AssetViewSet(viewsets.ModelViewSet):
    query = Asset.objects.filter(is_tradable=True)
    serializer_class = AssetSerializers