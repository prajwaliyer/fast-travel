from rest_framework.routers import DefaultRouter
from .views import HeroViewSet
from .views import WeatherViewSet

router = DefaultRouter()
router.register(r'heroes', HeroViewSet, basename='hero')
router.register(r'weather', WeatherViewSet, basename='weather')

urlpatterns = router.urls