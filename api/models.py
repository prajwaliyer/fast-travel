from django.db import models

# Create your models here.
class Hero(models.Model):
    name = models.CharField(max_length=60)
    alias = models.CharField(max_length=60)
    
    def __str__(self):
        return self.name

class Weather(models.Model):
    country_code = models.CharField(max_length=60)
    temp = models.CharField(max_length=60)
    humidity = models.CharField(max_length=60)
    main = models.CharField(max_length=60)
    icon = models.CharField(max_length=60)
    
    def __str__(self):
        return self.name