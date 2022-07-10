from django.shortcuts import render

# Create your views here.
from django.shortcuts import render
import urllib.request
import json
import os
import dotenv
from pathlib import Path
from rest_framework.response import Response
import requests

def index(request):
    if request.method == 'POST':
        city = request.POST['city']

        # Get API key from environment file
        BASE_DIR = Path(__file__).resolve().parent.parent
        dotenv_file = os.path.join(BASE_DIR, ".env")
        if os.path.isfile(dotenv_file):
            dotenv.load_dotenv(dotenv_file)
        WEATHER_KEY = os.environ['WEATHER_KEY']

        print(WEATHER_KEY)
        # API call
        source = urllib.request.urlopen('https://api.openweathermap.org/data/2.5/weather?q=' \
            + city + '&units=metric&appid=' + str(WEATHER_KEY)).read()
        
        list_of_data = json.loads(source)

        data = {
            "country_code" : str(list_of_data['sys']['country']),
            "temp" : str(list_of_data['main']['temp']) + '°C',
            "humidity" : str(list_of_data['main']['humidity']),
            "main" : str(list_of_data['weather'][0]['main']),
            "icon" : str(list_of_data['weather'][0]['icon']),
        }
        print(data)
        
        # Response to Request posts data to local API
        res = requests.post('http://127.0.0.1:8000/api/weathers/', data)
    
    else:
        data = {}
        res = {}

    return render(request, "main/index.html", data)
    # return Response(res.json())