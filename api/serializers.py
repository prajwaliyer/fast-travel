from rest_framework import serializers
from .models import Hero, Weather, Hotels

class HeroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hero
        fields = ('id', 'name', 'alias')

class WeatherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Weather
        fields = ('id', 'name', 'country', 'temp', 'humidity', 'main', 'icon')
        extra_kwargs = {
            'country': {
                'allow_blank': True,
            },
            'temp': {
                'allow_blank': True,
            },
            'humidity': {
                'allow_blank': True,
            },
            'main': {
                'allow_blank': True,
            },
            'icon': {
                'allow_blank': True,
            }
        }

class HotelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hotels
        fields = ('id', 'city', 'hotel', 'street', 'country', 'imgs', 'landmarks','price')
        extra_kwargs = {
            'hotel': {
                'allow_blank': True,
            },
            'street': {
                'allow_blank': True,
            },
            'country': {
                'allow_blank': True,
            },
            'imgs': {
                'allow_blank': True,
            },
            'landmarks': {
                'allow_blank': True,
            },
            'price':{
                'allow_blank': True,
            },
        }