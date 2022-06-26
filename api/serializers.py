from rest_framework import serializers
from .models import Hero, Weather

class HeroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hero
        fields = ('id', 'name', 'alias')

class WeatherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Weather
        fields = ('id', 'country_code', 'temp', 'humidity', 'main', 'icon')