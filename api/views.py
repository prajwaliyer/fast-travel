from django.shortcuts import render
from rest_framework import viewsets
from .serializers import HeroSerializer, WeatherSerializer
from .models import Hero, Weather

# Create your views here.
class HeroViewSet(viewsets.ModelViewSet):
    serializer_class = HeroSerializer
    queryset = Hero.objects.all()

class WeatherViewSet(viewsets.ModelViewSet):
    serializer_class = WeatherSerializer
    queryset = Weather.objects.all()