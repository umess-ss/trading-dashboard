from django.contrib import admin
from .models import Asset  # your Asset model

@admin.register(Asset)
class AssetAdmin(admin.ModelAdmin):
    list_display = ['id', 'symbol', 'name']
    list_editable = ['symbol', 'name']
