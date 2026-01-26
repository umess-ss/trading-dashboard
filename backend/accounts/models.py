from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Wallet(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='wallet')
    balance = models.DecimalField(max_digits=20, decimal_places=2, default=0.00)
    updated_at = models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return f"{self.user.username} - ${self.balance}"
    

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)


    usdt_balance = models.DecimalField(max_digits=20, decimal_places=2, default=10000)


    btc_balance = models.DecimalField(max_digits=20, decimal_places=8, default=0)
    eth_balance = models.DecimalField(max_digits=20, decimal_places=8, default=0)
    sol_balance = models.DecimalField(max_digits=20, decimal_places=8, default=0)
    bnb_balance = models.DecimalField(max_digits=20, decimal_places=8, default=0)
    ada_balance = models.DecimalField(max_digits=20, decimal_places=8, default=0)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.username}'s Portfolio (${self.usdt_balance} USDT)"




# backend/accounts/views.py
from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import UserProfile
from .serializers import UserProfileSerializer

class UserProfileViewSet(viewsets.ModelViewSet):
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return UserProfile.objects.filter(user=self.request.user)
    
    @action(detail=False, methods=['get'])
    def me(self, request):
        profile, created = UserProfile.objects.get_or_create(user=request.user)
        serializer = self.get_serializer(profile)
        return Response(serializer.data)
