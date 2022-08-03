from rest_framework import viewsets
from .serializers import HeroSerializer, ItinerarySerializer
from .models import Hero, Itinerary

# Create your views here.
class HeroViewSet(viewsets.ModelViewSet):
    serializer_class = HeroSerializer
    queryset = Hero.objects.all()

class ItineraryViewSet(viewsets.ModelViewSet):
    serializer_class = ItinerarySerializer
    queryset = Itinerary.objects.all()