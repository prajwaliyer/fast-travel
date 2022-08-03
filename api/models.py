from django.db import models
from django.db.models import JSONField

# Create your models here.
class Hero(models.Model):
    name = models.CharField(max_length=60)
    alias = models.CharField(max_length=60)
    
    def __str__(self):
        return self.name

class Weather(models.Model):
    name = models.CharField(max_length=60, default='')
    country = models.CharField(max_length=60, default='')
    temp = models.CharField(max_length=60, default='')
    humidity = models.CharField(max_length=60, default='')
    main = models.CharField(max_length=60, default='')
    icon = models.CharField(max_length=60, default='')
    
    def __str__(self):
        return self.name

class Attractions(models.Model):
    city = models.CharField(max_length=60, default='')
    country = models.CharField(max_length=60, default='')
    attraction_names = JSONField(default=dict)
    
    def __str__(self):
        return self.name

class Itinerary(models.Model):
    name = models.CharField(max_length=60, default='')
    date = models.CharField(max_length=60, default='')
    time = models.CharField(max_length=60, default='')
    
    def __str__(self):
        return self.name

class Hotels(models.Model):
    city = models.CharField(max_length=60, default='')
    hotel = models.CharField(max_length=250, default='')
    street = models.CharField(max_length=250, default='')
    country = models.CharField(max_length=250, default='')
    imgs = models.TextField(default='')
    landmarks = models.CharField(max_length=250, default='')
    # prices = models.CharField(max_length=250, default='')

    def __str__(self):
        return self.hotel
