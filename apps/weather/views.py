from django.shortcuts import render
import urllib.request
import json
import os
import dotenv
from pathlib import Path

# Create your views here.
def index(request):
    if request.method == 'POST':
        city = request.POST['city']

        BASE_DIR = Path(__file__).resolve().parent.parent
        dotenv_file = os.path.join(BASE_DIR, ".env")
        if os.path.isfile(dotenv_file):
            dotenv.load_dotenv(dotenv_file)
        WEATHER_KEY = os.environ['WEATHER_KEY']

        source = urllib.request.urlopen('https://api.openweathermap.org/data/2.5/weather?q=' \
            + city + '&units=metric&appid=' + WEATHER_KEY).read()

        list_of_data = json.loads(source)

        data = {
            "country_code" : str(list_of_data['sys']['country']),
            "temp" : str(list_of_data['main']['temp']) + '°C',
            "humidity" : str(list_of_data['main']['humidity']),
            "main" : str(list_of_data['weather'][0]['main']),
            "description" : str(list_of_data['weather'][0]['description']),
            "icon" : str(list_of_data['weather'][0]['icon']),
        }
        print(data)
    else:
        data = {}

    return render(request, "main/index.html", data)