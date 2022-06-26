from re import template
from django.contrib import admin
from django.urls import path, include
from .views import index
from django.views.generic import TemplateView

urlpatterns = [
    #path('oauth/', TemplateView.as_view(template_name="oauth/index.html")),
    path('', index),
    path('admin/', admin.site.urls),
    #Importing the urls.py from the oauth folder in apps
    path('sign-in/',include('apps.oauth.urls')),
    path('accounts/',include('allauth.urls')),
]

"""
from django.contrib import admin
from django.urls import path, include
from .views import index

urlpatterns = [
    path('', index),
    path('admin/', admin.site.urls),
    #Importing the urls.py from the oauth folder in apps
    path('sign-in/',include('apps.oauth.urls')),
]
"""