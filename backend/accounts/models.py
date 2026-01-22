from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    balence = models.DecimalField(max_length=20, decimal_places=2, default=0.00)
    currency = models.CharField(max_length=10, default='USD')


    def __str__(self):
        return f"{self.user.username}'s Profile"