import { useState, useEffect } from "react";
import { Button, Form, Card } from "react-bootstrap";
import API from "../../../API";

const AddAttractions = ({ onAdd }) => {
  
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [attraction_name, setAttraction_name] = useState("");
  const [rating, setRating] = useState("");
  const [google_url, setGoogle_url] = useState("");
  const [photo, setPhoto] = useState("");
  const [place_id, setPlace_id] = useState("");
  const [attractionId, setAttractionId] = useState(null);
  const [attractions, setAttractions] = useState([]);

  useEffect(() => {
    refreshAttractions();
  }, []);
  
  const refreshAttractions = () => {
    API.get("attractions/")
      .then((res) => {
        setAttractions(res.data);
      })
      .catch(console.error);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let item = { name, country, attraction_name, rating, google_url, photo, place_id };
    API.post("attractions/", item).then(() => refreshAttractions())
    .then(function(response) {
      console.log(response);
    }).catch(function(error) {
      console.log(error);
    })
  };

  const onUpdate = (id) => {
    let item = { name, country, attraction_name, rating, google_url, photo, place_id };
    API.patch(`attractions/${id}/`, item).then((res) => refreshAttractions());
  };

  const onDelete = (id) => {
    API.delete(`attractions/${id}/`).then((res) => refreshAttractions());
  };

  function selectAttraction(id) {
    let item = attractions.filter((attraction) => attraction.id === id)[0];
    setName(item.name);
    setCountry(item.country);
    setAttraction_name(item.lon);
    setRating(item.lat);
    setGoogle_url(item.radius);
    setPhoto(item.rate);
    setPlace_id(item.xid);
    setAttractionId(item.id);
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4">
          <h3 className="float-left">Create a new Attraction</h3>
          <Form onSubmit={onSubmit} className="mt-4">
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Attraction</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter City"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
                onClick={() => onUpdate(attractionId)}
                className="mx-2"
              >
                Update
              </Button>
            </div>
          </Form>
        </div>

        <div display="inline">
          {attractions.map((attraction, index) => {
            return (
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={`${attraction.photo}`} width="200" height="200"/>
                <Card.Body>
                  <Card.Title>{attraction.attraction_name}</Card.Title>
                  <Card.Text>
                    #: {attraction.id} <br />
                    City Name: {attraction.name} <br />
                    Country: {attraction.country} <br />
                    Attraction Name: {attraction.attraction_name} <br />
                    Rating: {attraction.rating} <br />
                    Google URL: {attraction.google_url} <br />
                    Photo: {attraction.photo} <br />
                    Place ID: {attraction.place_id} <br />
                  </Card.Text>
                  <Button variant="primary">See on Google Maps</Button>
                </Card.Body>
              </Card>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default AddAttractions;
