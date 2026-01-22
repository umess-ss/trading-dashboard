from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Order(models.Model):
    ORDER_TYPE = (
        ('BUY', 'Buy'),
        ('SELL', 'Sell')
    )
    STATUS_TYPE = (
        ('PENDING','Pending'),
        ('COMPLETED', 'Completed'),
        ('CANCELLED', 'Cancelled'),
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    asset = models.ForeignKey('market.Asset',on_delete=models.PROTECT)
    order_type = models.CharField(max_length=10, choices=ORDER_TYPE)
    price = models.DecimalField(max_digits=20, decimal_places=8)
    quantity = models.DecimalField(max_digits=20, decimal_places=8)
    status = models.CharField(max_length=20, choices=STATUS_TYPE, default='PENDING')
    timestamp = models.DateTimeField(auto_now_add=True)