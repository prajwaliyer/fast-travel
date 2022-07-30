from re import template
from django.contrib import admin
from django.urls import path, include
from .views import index
from django.conf import settings

from django.urls import re_path
from django.views.generic import TemplateView

urlpatterns = [
    path('', index),
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api/', include('api.urls')),
    # path('sign-in/',include('apps.oauth.urls')),
    # path('accounts/',include('allauth.urls')),
    
    #USER STUFF - TO DO JWT TOKEN PATHS => Getting access token 
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('auth/', include('djoser.social.urls')),
]

urlpatterns += [re_path(r'^.*', TemplateView.as_view(template_name='index.html'))]
