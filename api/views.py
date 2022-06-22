from django.shortcuts import render
from rest_framework import viewsets
from .serializers import HeroSerializer
from .models import Hero

# Create your views here.
class HeroViewSet(viewsets.ModelViewSet):
    serializer_class = HeroSerializer
    queryset = Hero.objects.all()