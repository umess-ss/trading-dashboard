from django.db import models
from django.contrib.auth.models import User
from market.models import Asset

# Create your models here.
class Order(models.Model):
    SIDE_CHOICES = (
        ('BUY', 'Buy'),
        ('SELL', 'Sell')
    )
    STATUS_CHOICES = (
        ('OPEN','Open'),
        ('FILLED', 'Filled'),
        ('CANCELLED', 'Cancelled'),
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    asset = models.ForeignKey(Asset ,on_delete=models.CASCADE)
    side = models.CharField(max_length=10, choices=SIDE_CHOICES)
    price = models.DecimalField(max_digits=20, decimal_places=8)
    quantity = models.DecimalField(max_digits=20, decimal_places=8)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='OPEN')
    timestamp = models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return f"{self.side} {self.quantity} {self.asset.symbol}"