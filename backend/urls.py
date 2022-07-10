from re import template
from django.contrib import admin
from django.urls import path, include
from .views import index
from django.conf import settings

urlpatterns = [
    path('', index),
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api/', include('api.urls')),
    path('sign-in/',include('apps.oauth.urls')),
    path('accounts/',include('allauth.urls')),
    path('weather/', include('apps.weather.urls')),
]
