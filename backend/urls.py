from django.contrib import admin
from django.urls import path, include
from .views import index

urlpatterns = [
    path('', index),
    path('admin/', admin.site.urls),
    #Importing the urls.py from the oauth folder in apps
    path('sign-in/',include('apps.oauth.urls'))
]
