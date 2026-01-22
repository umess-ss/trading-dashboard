from rest_framework import serializers
from .models import Asset

class AssetSerializers(serializers.Serializer):
    class Meta:
        model = Asset
        fields = "__all__"