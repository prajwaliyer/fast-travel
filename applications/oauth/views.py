from django.shortcuts import render
from django.http import HttpRequest

# Create your views here.
def indexView(request):
    return HttpRequest("<h1>Howdy! Welcome to Fast Travel</h1>")