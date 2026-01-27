from django.contrib import admin
from .models import Order

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'asset', 'side', 'price', 'quantity', 'status']
    list_filter = ['side', 'status']
