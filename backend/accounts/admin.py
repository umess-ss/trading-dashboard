from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import UserProfile, Wallet

@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'usdt_balance', 'btc_balance']
    list_filter = ['user']

@admin.register(Wallet)
class WalletAdmin(admin.ModelAdmin):
    list_display = ['user', 'balance']
