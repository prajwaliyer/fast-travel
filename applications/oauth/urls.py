from django import views
from django.contrib import admin
from django.urls import path, include
from .views import indexView

urlpatterns = [
    path('', admin.site.urls),
    # path('', views.indexView, name='page-one'),
]
