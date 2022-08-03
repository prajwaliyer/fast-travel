import { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import API from "../../../API";

import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

const AddContacts = ({ onAdd }) => {
  const [city, setCity] = useState("");
  const [hotel, setHotel] = useState("");
  const [street, setStreet] = useState("");
  const [country, setCountry] = useState("");
  const [imgs, setImgs] = useState("");
  const [landmarks, setLandmarks] = useState("");
  const [table, setTable] = useState([]);

  //CONDITIONALLY RENDERING VARIABLE
  const [getdata, setGetdata] = useState(false);

  // Variables
  var final_city = ""
  var final_hotels = []
  var final_streets = []
  var final_country = ""
  var final_imgs = []
  var final_landmarks = []
  var final_records = []
  var city_id=0

  useEffect(() => {
    refreshHotels();
  }, []);
  
  const refreshHotels = () => {
    API.get("hotels/")
      .then((res) => {
        setTable(res.data);
      })
      .catch(console.error);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let item = { city, hotel, street, country, imgs, landmarks };
    API.post("hotels/", item).then(() => refreshHotels())
    .then(function(response) {
      setGetdata(true)
      console.log(response);
    }).catch(function(error) {
      console.log(error);
    })
  };
//=================================================================================

//TEXT PRE-PROCESSING
const Split_Data = (response_list) =>{
  console.log(response_list)
  city_id=response_list.id
  // console.log(city_id)
  final_city=response_list.city
  final_hotels = response_list.hotel.split(";")
  final_streets = response_list.street.split(";")
  final_country = response_list.country.split(";")[0]
  final_imgs = response_list.imgs.split(";")
  final_landmarks = response_list.landmarks.split(";")

  var i=0
  for(i=0; i < final_hotels.length; i++){
    final_records.push([final_hotels[i],final_streets[i], final_imgs[i]])
  }

  // console.log(final_hotels)
  // console.log(final_streets)
  // console.log(final_country)
  // console.log(final_imgs)
  // console.log(final_landmarks)
  // console.log(final_records)
}

//=================================================================================
  
  const onDelete = (id) => {
    setGetdata(false);
    API.delete(`hotels/${id}/`).then((res) => refreshHotels());
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4">
          <h3 className="float-left">Find places to stay</h3>
          <Form onSubmit={onSubmit} className="mt-4">
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Control
                type="text"
                placeholder="Enter City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </Form.Group>

            <div className="float-right">
              <Button
                variant="primary"
                type="submit"
                onClick={onSubmit}
                className="mx-2"
              >
                Search
              </Button>
              
            </div>
          </Form>
          <p></p>
          Here's your potential future destination!<p></p>
          <h5>City:</h5> {city}
        </div>

        <div className="col-md-8 m">
          {table.slice(-1).map((hotel, index) => {
                Split_Data(hotel);
                console.log("REACHED HERE")
                return (
                  <div className="row justify-content-center align-item-center">
                    <div>
                    <Card sx={{ maxWidth: 280 }}>
                      <CardMedia
                        component="img"
                        height="120"
                        image={final_records[0][2]}
                        alt="hotel picture"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h6" component="div">
                          {final_records[0][0]}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {final_records[0][1]}
                        </Typography>
                      </CardContent>
                    </Card>
                    </div>
                    
                    <div>
                    <Card sx={{ maxWidth: 280 }}>
                      <CardMedia
                        component="img"
                        height="120"
                        image={final_records[1][2]}
                        alt="hotel picture"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h6" component="div">
                          {final_records[1][0]}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {final_records[1][1]}
                        </Typography>
                      </CardContent>
                    </Card>
                    </div>

                    <div>
                    <Card sx={{ maxWidth: 280 }}>
                      <CardMedia
                        component="img"
                        height="120"
                        image={final_records[2][2]}
                        alt="hotel picture"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h6" component="div">
                          {final_records[2][0]}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {final_records[2][1]}
                        </Typography>
                      </CardContent>
                    </Card>
                    </div>

                    <div>
                    <Card sx={{ maxWidth: 280 }}>
                      <CardMedia
                        component="img"
                        height="120"
                        image={final_records[3][2]}
                        alt="hotel picture"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h6" component="div">
                          {final_records[3][0]}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {final_records[3][1]}
                        </Typography>
                      </CardContent>
                    </Card>
                    </div>

                    <div>
                    <Card sx={{ maxWidth: 280 }}>
                      <CardMedia
                        component="img"
                        height="120"
                        image={final_records[4][2]}
                        alt="hotel picture"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h6" component="div">
                          {final_records[4][0]}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {final_records[4][1]}
                        </Typography>
                      </CardContent>
                    </Card>
                    </div>
                  
                  </div>
                  );
          })}
        </div>
      </div>
    </div>
  );
};

export default AddContacts;