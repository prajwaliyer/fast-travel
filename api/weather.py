from .serializers import WeatherSerializer
from .models import Weather
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
import urllib.request
import json
import os
import dotenv
from pathlib import Path

# Get API key from environment file
BASE_DIR = Path(__file__).resolve().parent.parent
dotenv_file = os.path.join(BASE_DIR, ".env")
if os.path.isfile(dotenv_file):
    dotenv.load_dotenv(dotenv_file)
WEATHER_KEY = os.environ['WEATHER_KEY']

#
# Requests for multiple JSON objects
#
@api_view(['GET', 'POST'])
def weather_all(request):
    
    if request.method == 'GET':
        queryset = Weather.objects.all()
        serializer_class = WeatherSerializer(queryset, many=True)
        return Response(serializer_class.data)
    
    # API querying on POST request
    elif request.method == 'POST':

        city = request.data['name']

        # API call with city name
        source = urllib.request.urlopen('https://api.openweathermap.org/data/2.5/weather?q=' \
            + city + '&units=metric&appid=' + WEATHER_KEY).read()
        list_of_data = json.loads(source)

        # Get rest of data for city name~
        request.data['country'] = str(list_of_data['sys']['country'])
        request.data['temp'] = str(round(list_of_data['main']['temp'])) + '°C'
        request.data['humidity'] = str(list_of_data['main']['humidity']) + '%'
        request.data['main'] = str(list_of_data['weather'][0]['main'])
        request.data['icon'] = str(list_of_data['weather'][0]['icon'])

        # POST data
        serializer_class = WeatherSerializer(data=request.data)
        if serializer_class.is_valid():
            serializer_class.save()
            return Response(serializer_class.data, status=status.HTTP_201_CREATED)

    return Response(serializer_class.errors, status=status.HTTP_400_BAD_REQUEST)

#
# Requests for singular JSON objects
#
@api_view(['GET', 'PUT', 'DELETE'])
def weather_one(request, pk):

    try:
        snippet = Weather.objects.get(pk=pk)
    except Weather.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = WeatherSerializer(snippet)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = WeatherSerializer(snippet, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        snippet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)