import { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import API from "../../../API";
// import HotelCard from "../../Card";

import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
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
  // const [price,setPrice]=useState("")
  const [cityId, setCityId] = useState(null);
  const [search, setSearch] = useState({})
  const [table, setTable] = useState([]);
  const [empty, setEmpty] = useState("Y");

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
    // let item = { city, hotel, street, country, imgs, landmarks, price};
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
  console.log(city_id)
  final_city=response_list.city
  final_hotels = response_list.hotel.split(";")
  final_streets = response_list.street.split(";")
  final_country = response_list.country.split(";")[0]
  final_imgs = response_list.imgs.split(";")
  final_landmarks = response_list.landmarks.split(";")

  var i=0
  for(i=0; i < final_hotels.length; i++){
    // final_records+=[[final_hotels[i],final_streets[i], final_imgs[i]]]
    final_records.push([final_hotels[i],final_streets[i], final_imgs[i]])
  }

  console.log(final_hotels)
  console.log(final_streets)
  console.log(final_country)
  console.log(final_imgs)
  console.log(final_landmarks)
  console.log(final_records)
}

  // setFhotels(response_list.hotel.split(";"))
  // setFstreets(response_list.street.split(";"))
  // setFcountry(response_list.country.split(";")[0])
  // setFimgs(response_list.imgs.split(";"))
  // setFlandmarks(response_list.landmarks.split(";"))

  // var i=0
  // for(i=0; i < final_hotels.length; i++){
  //   // final_records+=[[final_hotels[i],final_streets[i], final_imgs[i]]]
  //   final_records.push([final_hotels[i],final_streets[i], final_imgs[i]])
  // }
  //PRINTING
  // console.log(fhotels)
  // console.log(fstreets)
  // console.log(fcountry)
  // console.log(fimgs)
  // console.log(flandmarks)
  //console.log(final_records)

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
              {/* <Button
                variant="primary"
                type="submit"
                onClick={() => onDelete(city_id)}
                className="mx-2"
              >
                Refresh
              </Button> */}
              
            </div>
          </Form>
          <p></p>
          Here's your potential future destination!<p></p>
          <h5>City:</h5> {city}
        </div>

        <div className="col-md-8 m">
          {table.slice(-1).map((hotel, index) => {
            //switch(getdata){
            //  case true:
            // if (getdata){
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
                // } 
                // else{
                //   return (
                //     <div>
                //       SEARCH FOR A CITY!!!
                //     </div>
                //   );
                // }
          })}
        </div>
      </div>
    </div>
  );
};

export default AddContacts;


{/* <tbody>
              {table.map((hotel, index) => {
                return (
                  <tr key="">
                    <th scope="row">{hotel.id}</th>
                    <td>{hotel.city}</td>
                    <td>{hotel.hotel}</td>
                    <td>{hotel.street}</td>
                    <td>{hotel.country}</td>
                    <td>{hotel.imgs}</td>
                    <td>{hotel.landmarks}</td>

                     <td>
                      <Button
                        variant="primary"
                        type="button"
                        onClick={() => selectCity(hotel.id)}
                        className="mx-2"
                      >
                        Edit
                      </Button>
                      <Button
                        variant="primary"
                        type="button"
                        onClick={() => onDelete(hotel.id)}
                        className="mx-2"
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>  */}



  //  {/* () => {return(
  //               <tr key="">
  //                     <th scope="row">{table[-1].id}</th>
  //                     <td>{table[-1].city}</td>
  //                     <td>{table[-1].hotel}</td>
  //                     <td>{table[-1].street}</td>
  //                     <td>{table[-1].country}</td>
  //                     <td>{table[-1].imgs}</td>
  //                     <td>{table[-1].landmarks}</td>
  //                     <td>
  //                       <Button
  //                         variant="primary"
  //                         type="button"
  //                         onClick={() => selectCity(table[table.length-1].id)}
  //                         className="mx-2"
  //                       >
  //                         Edit
  //                       </Button>
  //                       <Button
  //                         variant="primary"
  //                         type="button"
  //                         onClick={() => onDelete(table[table.length-1].id)}
  //                         className="mx-2"
  //                       >
  //                         Delete
  //                       </Button>
  //                     </td>
  //             </tr>);
  //           })



  {/* 
          <View>{
          final_records.map((element, key) => {
              // paste your card component
              HotelCard(element)
          })
          }</View> */}

          {/* {table.map((hotel, index) => {
                return (
                  <tr key="">
                    <th scope="row">{hotel.id}</th>
                    <td>{hotel.city}</td>
                    <td>{hotel.hotel}</td>
                    <td>{hotel.street}</td>
                    <td>{hotel.country}</td>
                    <td>{hotel.imgs}</td>
                    <td>{hotel.landmarks}</td>
                  </tr>
                );
              })} */}
          {/* <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">City</th>
                <th scope="col">Hotel</th>
                <th scope="col">Street</th>
                <th scope="col">Country</th>
                <th scope="col">imgs</th>
                <th scope="col">landmarks</th>
                {/* <th scope="col">price</th>

              </tr>
            </thead>
            <tbody>
            {table.slice(-1).map((hotel, index) => {
                console.log(hotel)
                console.log(index)
                console.log(table[table.length-1])
                console.log(search)
                return (
                  <tr key="">
                    <th scope="row">{hotel.id}</th>
                    <td>{hotel.city}</td>
                    <td>{hotel.hotel}</td>
                    <td>{hotel.street}</td>
                    <td>{hotel.country}</td>
                    <td>{hotel.imgs}</td>
                    <td>{hotel.landmarks}</td>

                     <td>
                      <Button
                        variant="primary"
                        type="button"
                        onClick={() => getLastElement(table)}
                        className="mx-2"
                      >
                        GET
                      </Button>
                      <Button
                        variant="primary"
                        type="button"
                        onClick={() => onDelete(hotel.id)}
                        className="mx-2"
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody> 
          </table> */}


          // const updated_data = () => {
          //   API.get("hotels/"+cityId+"/")
          //     .then((res) => {
          //       setSearch(res.data);
          //     })
          //     .catch(console.error);
          // };
        
          // const getLastElement = () =>{
          //   console.log("ATTTEMPT")
          //   console.log(table[table.length-1])
          //   setSearch(table[table.length-1])
          // }
        
          // const onUpdate = (id) => {
          //   // let item = { city, hotel, street, country, imgs, landmarks, price };
          //   let item = { city, hotel, street, country, imgs, landmarks };
          //   API.patch(`hotels/${id}/`, item).then((res) => refreshHotels());
          // };

          // function selectCity(id) {
          //   let item = table.filter((hotel) => hotel.id === id)[0];
          //   setCity(item.city);
          //   setHotel(item.hotel);
          //   setStreet(item.street);
          //   setCountry(item.country);
          //   setImgs(item.imgs);
          //   setLandmarks(item.landmarks);
          //   setCityId(item.id);
          //   // setPrice(item.price)
          // }