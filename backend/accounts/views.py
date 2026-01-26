from rest_framework import viewsets, permissions
from .models import Wallet, UserProfile
from .serializers import WalletSerializers, UserProfileSerializer
from rest_framework.decorators import action
from rest_framework.response import Response


class WalletViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = WalletSerializers

    def get_queryset(self):     
        return Wallet.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)



class UserProfileViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UserProfileSerializer


    def get_queryset(self):     
        return UserProfile.objects.filter(user = self.request.user)
    

    def perform_create(self, serializer):      # Automatically set the user to the current request user during creations
        serializer.save(user=self.request.user)


    @action(detail=False, methods=['get'])
    def me(self,request):
        profile, created = UserProfile.objects.get_or_create(user=request.user)
        serializer = self.get_serializer(profile)
        return Response(serializer.data)