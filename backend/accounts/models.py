from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Wallet(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='wallet')
    balance = models.DecimalField(max_digits=20, decimal_places=2, default=0.00)
    updated_at = models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return f"{self.user.username} - ${self.balance}"