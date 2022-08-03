from rest_framework import serializers
from .models import Attractions, Hero, Weather, Itinerary, Hotels

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

class ItinerarySerializer(serializers.ModelSerializer):
    class Meta:
        model = Itinerary
        fields = ('id', 'date', 'name', 'time')
        extra_kwargs = {
            'date': {
                'allow_blank': True,
            },
            'time': {
                'allow_blank': True,
            },
        }

class HotelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hotels
        # fields = ('id', 'city', 'hotel', 'street', 'country', 'imgs', 'landmarks','price')
        fields = ('id', 'city', 'hotel', 'street', 'country', 'imgs', 'landmarks')
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
            # 'price':{
            #     'allow_blank': True,
            # },
        }