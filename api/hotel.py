from unittest import result
from .serializers import HotelSerializer
from .models import Hotels
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
import requests
import json
import os
import dotenv
from pathlib import Path
import string

# Get API key from environment file
BASE_DIR = Path(__file__).resolve().parent.parent
dotenv_file = os.path.join(BASE_DIR, ".env")
if os.path.isfile(dotenv_file):
    dotenv.load_dotenv(dotenv_file)
RAPIDAPI_KEY = os.environ['RAPIDAPI_KEY']

#
# Requests for multiple JSON objects
#
@api_view(['GET', 'POST', 'DELETE'])
def hotel_all(request):
    if request.method == 'GET':
        print("GETTTTTT REQUESTTTTT")
        queryset = Hotels.objects.all()
        serializer_class = HotelSerializer(queryset, many=True)
        return Response(serializer_class.data)
    
    # API querying on POST request
    elif request.method == 'POST':
        print("POSTTTTT REQUESTTTT")
        city = request.data['city']
        print("CITY: ", city)
        
        print("MAKING THE REQUEST")
        # PART 1 - GETTING THE DESTINATION ID
        url = "https://hotels4.p.rapidapi.com/locations/v2/search"
        querystring = {"query":city,"locale":"en_US","currency":"USD"}

        # API call with city name
        headers = {
            "X-RapidAPI-Key": RAPIDAPI_KEY,
            "X-RapidAPI-Host": "hotels4.p.rapidapi.com"
        }

        # response = requests.request("GET", url, headers=headers, params=querystring)
        # dest_id=response.json()['suggestions'][0]['entities'][0]['destinationId']

        # print("********************************************************************/n")
        # print(response.text)
        # print("********************************************************************/n")

        #dest_id=1506246
        dest_id=11594
        #PART 2 - GETTING THE HOTEL NAMES
        print("GOT THE DESTINATION ID", dest_id)

        url2 = "https://hotels4.p.rapidapi.com/properties/list"
        querystring2 = {"destinationId":dest_id,"pageNumber":"1","pageSize":"7","checkIn":"2022-01-08","checkOut":"2022-01-15","adults1":"1","sortOrder":"PRICE","locale":"en_US","currency":"USD"}

        response2 = requests.request("GET", url2, headers=headers, params=querystring2)
        #list_of_data=json.loads(response.json())
        print("********************************************************************\n")
        print(response2.text)
        print("********************************************************************\n")
        results=response2.json()['data']['body']['searchResults']['results']
        landmarks=response2.json()['data']['body']['filters']['landmarks']['items']
        
        print("SECOND REQUEST IS DONE")
        # Populate the city's fields
        '''
        temp1=str(results[0]['name'])
        temp2=str(results[0]['address']['streetAddress'])
        temp3=str(results[0]['address']['countryName'])

        for j in range(1,5):
            temp1+=" "+str(results[j]['name'])
            temp2+=" "+str(results[j]['address']['streetAddress'])
            temp3+=" "+str(results[j]['address']['countryName'])
        '''
        # Populate the city's fields
        temp1=string.capwords(str(results[0]['name']))
        temp2=str(results[0]['address']['streetAddress'])+","+str(results[0]['address']['locality'])
        temp3=str(results[0]['address']['countryName'])
        temp4=str(results[0]['optimizedThumbUrls']['srpDesktop'])
        temp5=str(landmarks[1]['label']+str(landmarks[2]['label']+str(landmarks[3]['label'])))
        temp6=str(results[0]['ratePlan']['price']['current'])

        for j in range(1,5):
            temp1+=";"+string.capwords(str(results[j]['name']))
            temp2+=";"+string.capwords(str(results[j]['address']['streetAddress']))+","+str(results[j]['address']['locality']).capitalize()
            temp3+=";"+string.capwords(str(results[j]['address']['countryName']))
            temp4+=";"+str(results[j]['optimizedThumbUrls']['srpDesktop'])
            temp6+=";"+str(results[j]['ratePlan']['price']['current'])

        
        print("HOTEL NAMES: ",temp1)
        print("STREETS: ", temp2)
        print("COUNTRY: ",temp3)
        print("IMG SOURCE: ",temp4)
        print("LANDMARKS: ",temp5)
        print("PRICES: ", temp6)

        request.data['hotel']=temp1
        request.data['street']=temp2
        request.data['country']=temp3
        request.data['imgs']=temp4
        request.data['landmarks']=temp5
        # request.data['price']=temp5


        print("ABOUT TO POST THE DATA")
        # POST data
        serializer_class = HotelSerializer(data=request.data)
        if serializer_class.is_valid():
            serializer_class.save()
            return Response(serializer_class.data, status=status.HTTP_201_CREATED)
        
    return Response(serializer_class.errors, status=status.HTTP_400_BAD_REQUEST)


# Requests for singular JSON objects

@api_view(['GET', 'PUT', 'DELETE'])
def hotel_set_one(request, pk):
    try:
        snippet = Hotels.objects.get(pk=pk)
    except Hotels.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = HotelSerializer(snippet)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = HotelSerializer(snippet, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        snippet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)