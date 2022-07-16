from django.db import models

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

class Hotels(models.Model):
    city = models.CharField(max_length=60, default='')
    hotel = models.CharField(max_length=240, default='')
    street = models.CharField(max_length=240, default='')
    country = models.CharField(max_length=200, default='')
    
    def __str__(self):
        return self.hotel

# CITY: NEW YORK
# Records
# NAME | STREET ADDRESS | COUNTRY

#   const [city, setCity] = useState("");
#   const [hotels, setHotels] = useState([]);
#   const [street, setStreet] = useState([]);
#   const [country, setCountry] = useState("");