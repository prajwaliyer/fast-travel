from rest_framework.routers import DefaultRouter
from .views import HeroViewSet, ItineraryViewSet
from .weather import weather_all, weather_one
from .attractions import attractions_all, attractions_one
from .hotel import hotel_all, hotel_set_one
from django.urls import path

router = DefaultRouter()
router.register(r'heroes', HeroViewSet, basename='hero')
router.register(r'itinerary', ItineraryViewSet, basename='itinerary')

urlpatterns = [
    *router.urls,
    path('weather/', weather_all),
    path('weather/<int:pk>/', weather_one),
    path('attractions/', attractions_all),
    path('attractions/<int:pk>/', attractions_one),
    path('hotels/', hotel_all),
    path('hotels/<int:pk>/', hotel_set_one)
]