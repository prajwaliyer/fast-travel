import { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import API from "../../../API";

const AddTrips = ({ onAdd }) => {
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [temp, setTemp] = useState("");
  const [humidity, setHumidity] = useState("");
  const [main, setMain] = useState("");
  const [icon, setIcon] = useState("");
  const [cityId, setCityId] = useState(null);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    refreshCities();
  }, []);
  
  const refreshCities = () => {
    API.get("weather/")
      .then((res) => {
        setCities(res.data);
        console.log("Custom: GET request sent");
      })
      .catch(console.error);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let item = { city };
    API.post("weather/", item).then(() => refreshCities());
    console.log("Custom: POST request sent");
  };

  const onUpdate = (id) => {
    let item = { city };
    API.patch(`weather/${id}/`, item).then((res) => refreshCities());
    console.log("Custom: PATCH request sent");
  };

  const onDelete = (id) => {
    API.delete(`weather/${id}/`).then((res) => refreshCities());
    console.log("Custom: DELETE request sent");
  };

  function selectCity(id) {
    let item = cities.filter((city) => city.id === id)[0];
    setCity(item.city);
    setCityId(item.id);
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4">
          <h3 className="float-left">Create a new City</h3>
          <Form onSubmit={onSubmit} className="mt-4">
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>City</Form.Label>
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
                Save
              </Button>
              <Button
                variant="primary"
                type="button"
                onClick={() => onUpdate(cityId)}
                className="mx-2"
              >
                Update
              </Button>
            </div>
          </Form>
        </div>
        <div className="col-md-8 m">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">City</th>
                <th scope="col">Country</th>
                <th scope="col">Temperature</th>
                <th scope="col">Humidity</th>
                <th scope="col">Main</th>
                <th scope="col">Icon</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {cities.map((city, index) => {
                return (
                  <tr key="">
                    <th scope="row">{city.id}</th>
                    <td>{city.city}</td>
                    <td>{city.country}</td>
                    <td>{city.temp}</td>
                    <td>{city.humidity}</td>
                    <td>{city.main}</td>
                    <td>{city.icon}</td>
                    <td>
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
                    </td>
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

export default AddTrips;
