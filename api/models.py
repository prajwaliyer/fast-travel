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
    name = models.CharField(max_length=60, default='')
    country = models.CharField(max_length=60, default='')
    attraction_name = models.CharField(max_length=60, default='')
    rating = models.CharField(max_length=60, default='')
    google_url = models.CharField(max_length=60, default='')
    photo = models.CharField(max_length=600, default='')
    place_id = models.CharField(max_length=60, default='')
    attraction_names = JSONField(default=dict)
    
    def __str__(self):
        return self.name