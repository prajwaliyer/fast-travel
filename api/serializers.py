from rest_framework import serializers
from .models import Attractions, Hero, Weather

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

class AttractionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attractions
        fields = ('id', 'city', 'country', 'attraction_names')
        extra_kwargs = {
            'country': {
                'allow_blank': True,
            },
        }