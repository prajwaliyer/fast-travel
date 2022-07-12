from .serializers import AttractionsSerializer
from .models import Attractions
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
MAPS_KEY = os.environ['MAPS_KEY']

#
# Requests for multiple JSON objects
#
@api_view(['GET', 'POST'])
def attractions_all(request):
    
    if request.method == 'GET':
        queryset = Attractions.objects.all()
        serializer_class = AttractionsSerializer(queryset, many=True)
        return Response(serializer_class.data)
    
    # API querying on POST request
    elif request.method == 'POST':
        
        # Place Search API
        city = request.data['name']
        source_search = urllib.request.urlopen('https://maps.googleapis.com/maps/api/place/textsearch/json?query=' \
            + city + '+point+of+interest&types=tourist_attraction&language=en&key=' + MAPS_KEY).read()
        list_of_data_search = json.loads(source_search)

        request.data['attraction_name'] = str(list_of_data_search['results'][0]['name'])
        request.data['rating'] = str(list_of_data_search['results'][0]['rating'])
        request.data['place_id'] = str(list_of_data_search['results'][0]['place_id'])


        # Place Photos API
        photo_reference = str(list_of_data_search['results'][0]['photos'][0]['photo_reference'])
        # source_photo = urllib.request.urlopen('https://maps.googleapis.com/maps/api/place/photo?photo_reference=' \
        #     + photo_reference + '&max_width=400&key=' + MAPS_KEY).read()
        request.data['photo'] = str('https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=' + photo_reference + \
            '&key=' + MAPS_KEY)
        print(request.data['photo'])

        # Place Details API
        place_id = request.data['place_id']
        source_details = urllib.request.urlopen('https://maps.googleapis.com/maps/api/place/details/json?place_id=' \
            + place_id + '&key=' + MAPS_KEY).read()
        list_of_data_details = json.loads(source_details)
        request.data['google_url'] = str(list_of_data_details['result']['url'])

        # POST data
        serializer_class = AttractionsSerializer(data=request.data)
        if serializer_class.is_valid():
            serializer_class.save()
            return Response(serializer_class.data, status=status.HTTP_201_CREATED)

    return Response(serializer_class.errors, status=status.HTTP_400_BAD_REQUEST)

#
# Requests for singular JSON objects
#
@api_view(['GET', 'PUT', 'DELETE'])
def attractions_one(request, pk):

    try:
        snippet = Attractions.objects.get(pk=pk)
    except Attractions.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = AttractionsSerializer(snippet)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = AttractionsSerializer(snippet, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        snippet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)