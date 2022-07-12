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
        fields = ('id', 'name', 'country', 'attraction_name', 'rating', 'google_url', 'photo', 'place_id')
        extra_kwargs = {
            'country': {
                'allow_blank': True,
            },
            'attraction_name': {
                'allow_blank': True,
            },
            'rating': {
                'allow_blank': True,
            },
            'google_url': {
                'allow_blank': True,
            },
            'photo': {
                'allow_blank': True,
            },
            'place_id': {
                'allow_blank': True,
            }
        }