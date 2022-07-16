import { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import API from "../../../API";

const AddContacts = ({ onAdd }) => {
  const [city, setCity] = useState("");
  const [hotel, setHotel] = useState("");
  const [street, setStreet] = useState("");
  const [country, setCountry] = useState("");
  const [imgs, setImgs] = useState("");
  const [landmarks, setLandmarks] = useState("");
  const [price,setPrice]=useState("")
  const [table, setTable] = useState([]);

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
    let item = { city, hotel, street, country, imgs, landmarks, price};
    API.post("hotels/", item).then(() => refreshHotels())
    .then(function(response) {
      console.log(response);
    }).catch(function(error) {
      console.log(error);
    })
  };

  const onUpdate = (id) => {
    let item = { city, hotel, street, country, imgs, landmarks, price };
    API.patch(`hotels/${id}/`, item).then((res) => refreshHotels());
  };

  const onDelete = (id) => {
    API.delete(`hotels/${id}/`).then((res) => refreshHotels());
  };

  function selectCity(id) {
    let item = table.filter((hotel) => hotel.id === id)[0];
    setCity(item.city);
    setHotel(item.hotel);
    setStreet(item.street);
    setCountry(item.country);
    setImgs(item.imgs);
    setLandmarks(item.landmarks);
    setPrice(item.price)
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4">
          <h3 className="float-left">Find places to stay</h3>
          <Form onSubmit={onSubmit} className="mt-4">
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>City: </Form.Label>
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
                type="button"
                onClick={() => onUpdate(cityId)}
                className="mx-2"
              >
                Update
              </Button> */}
            </div>
          </Form>
        </div>
        <div className="col-md-8 m">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">City</th>
                <th scope="col">Hotel</th>
                <th scope="col">Street</th>
                <th scope="col">Country</th>
                <th scope="col">imgs</th>
                <th scope="col">landmarks</th>
                <th scope="col">price</th>

              </tr>
            </thead>
            <tbody>
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
                    <td>{hotel.price}</td>

                    {/* <td><img src={`http://openweathermap.org/img/w/${city.icon}.png`} alt="404" /></td> */}
                     {/* <td>
                      <Button
                        variant="primary"
                        type="button"
                        onClick={() => selectCity(city.id)}
                        className="mx-2"
                      >
                        Edit
                      </Button>
                      <Button
                        variant="primary"
                        type="button"
                        onClick={() => onDelete(city.id)}
                        className="mx-2"
                      >
                        Delete
                      </Button>
                    </td> */}
                  </tr>
                );
              })}
            </tbody> 
          </table>
        </div>
      </div>
    </div>
  );
};

export default AddContacts;
