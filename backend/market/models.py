from django.db import models

# Create your models here.
class Asset(models.Model):
    ASSET_TYPES = (
        ('CRYPTO', 'Cryptocurrency'),
        ('STOCK', 'Stock'),
        ('FOREX', 'Forex')
    )
    symbol = models.CharField(max_length=20, unique=True)
    name = models.CharField(max_length=200)
    category = models.CharField(max_length=20, choices=ASSET_TYPES)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.symbol