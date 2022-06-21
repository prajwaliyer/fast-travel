from django.contrib import admin
from django.urls import path, include
from .views import index
from django.conf import settings

urlpatterns = [
    path('', index),
    path('admin/', admin.site.urls),
    path('weather/', include('apps.weather.urls'))    
]
