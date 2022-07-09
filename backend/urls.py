from re import template
from django.contrib import admin
from django.urls import path, include
from .views import index

urlpatterns = [
    path('', index),
    path('admin/', admin.site.urls),
    path('sign-in/',include('apps.oauth.urls')),
    path('accounts/',include('allauth.urls')),
]
