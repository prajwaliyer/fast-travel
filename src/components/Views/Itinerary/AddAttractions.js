import { useState, useEffect } from "react";
import { Button, Form, Card, Row, Container, Text } from "react-bootstrap";
import API from "../../../API";

const AddAttractions = ({ onAdd }) => {
  
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [attraction_names, setAttraction_names] = useState({});
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
    let item = { city, country, attraction_names };
    API.post("attractions/", item).then(() => refreshAttractions())
    .then(function(response) {
      console.log(response);
    }).catch(function(error) {
      console.log(error);
    })
  };

  const onUpdate = (id) => {
    let item = { city, country, attraction_names };
    API.patch(`attractions/${id}/`, item).then((res) => refreshAttractions());
  };

  const onDelete = (id) => {
    API.delete(`attractions/${id}/`).then((res) => refreshAttractions());
  };

  function selectAttraction(id) {
    let item = attractions.filter((attraction) => attraction.id === id)[0];
    setCity(item.city);
    setCountry(item.country);
    setAttraction_names(item.attraction_names);
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
                onClick={() => onUpdate(attractionId)}
                className="mx-2"
              >
                Update
              </Button>
            </div>
          </Form>
        </div>
        
        <div className="row justify-content-center align-item-center">
          {attractions.map((attraction, index) => {
            return <div className="row justify-content-center align-item-center">
              <div class="col-11 col-md-6 col-lg-3 mx-0 mb-4 d-flex align-items-stretch">
                <Card style={{ width: '18rem' }} key={index}>
                  <Card.Img variant="top" src={`${attraction.attraction_names[0]['photo']}`} width="200" height="200"/>
                  <Card.Body>
                    <Card.Title><b>{attraction.attraction_names[0]['attraction_name']}</b></Card.Title>
                    <Card.Text>
                      #: {attraction.id} <br />
                      City Name: {attraction.city} <br />
                    </Card.Text>
                    <Button variant="primary">See on Google Maps</Button> 
                    <Button variant="primary" type="button" onClick={() => onDelete(attraction.id)} className="mx-2">
                      -
                    </Button>
                  </Card.Body>
                </Card>
              </div>
              <div class="col-11 col-md-6 col-lg-3 mx-0 mb-4 d-flex align-items-stretch">
                <Card style={{ width: '18rem' }} key={index}>
                  <Card.Img variant="top" src={`${attraction.attraction_names[1]['photo']}`} width="200" height="200"/>
                  <Card.Body>
                    <Card.Title><b>{attraction.attraction_names[1]['attraction_name']}</b></Card.Title>
                    <Card.Text>
                      #: {attraction.id} <br />
                      City Name: {attraction.city} <br />
                    </Card.Text>
                    <Button variant="primary">See on Google Maps</Button> 
                    <Button variant="primary" type="button" onClick={() => onDelete(attraction.id)} className="mx-2">
                      -
                    </Button>
                  </Card.Body>
                </Card>
              </div>
              <div class="col-11 col-md-6 col-lg-3 mx-0 mb-4 d-flex align-items-stretch">
                <Card style={{ width: '18rem' }} key={index}>
                  <Card.Img variant="top" src={`${attraction.attraction_names[2]['photo']}`} width="200" height="200"/>
                  <Card.Body>
                    <Card.Title><b>{attraction.attraction_names[2]['attraction_name']}</b></Card.Title>
                    <Card.Text>
                      #: {attraction.id} <br />
                      City Name: {attraction.city} <br />
                    </Card.Text>
                    <Button variant="primary">See on Google Maps</Button> 
                    <Button variant="primary" type="button" onClick={() => onDelete(attraction.id)} className="mx-2">
                      -
                    </Button>
                  </Card.Body>
                </Card>
              </div>
              <div class="col-11 col-md-6 col-lg-3 mx-0 mb-4 d-flex align-items-stretch">
                <Card style={{ width: '18rem' }} key={index}>
                  <Card.Img variant="top" src={`${attraction.attraction_names[3]['photo']}`} width="200" height="200"/>
                  <Card.Body>
                    <Card.Title><b>{attraction.attraction_names[3]['attraction_name']}</b></Card.Title>
                    <Card.Text>
                      #: {attraction.id} <br />
                      City Name: {attraction.city} <br />
                    </Card.Text>
                    <Button variant="primary">See on Google Maps</Button> 
                    <Button variant="primary" type="button" onClick={() => onDelete(attraction.id)} className="mx-2">
                      -
                    </Button>
                  </Card.Body>
                </Card>
              </div>
              <div class="col-11 col-md-6 col-lg-3 mx-0 mb-4 d-flex align-items-stretch">
                <Card style={{ width: '18rem' }} key={index}>
                  <Card.Img variant="top" src={`${attraction.attraction_names[4]['photo']}`} width="200" height="200"/>
                  <Card.Body>
                    <Card.Title><b>{attraction.attraction_names[4]['attraction_name']}</b></Card.Title>
                    <Card.Text>
                      #: {attraction.id} <br />
                      City Name: {attraction.city} <br />
                    </Card.Text>
                    <Button variant="primary">See on Google Maps</Button> 
                    <Button variant="primary" type="button" onClick={() => onDelete(attraction.id)} className="mx-2">
                      -
                    </Button>
                  </Card.Body>
                </Card>
              </div>
              <div class="col-11 col-md-6 col-lg-3 mx-0 mb-4 d-flex align-items-stretch">
                <Card style={{ width: '18rem' }} key={index}>
                  <Card.Img variant="top" src={`${attraction.attraction_names[5]['photo']}`} width="200" height="200"/>
                  <Card.Body>
                    <Card.Title><b>{attraction.attraction_names[5]['attraction_name']}</b></Card.Title>
                    <Card.Text>
                      #: {attraction.id} <br />
                      City Name: {attraction.city} <br />
                    </Card.Text>
                    <Button variant="primary">See on Google Maps</Button> 
                    <Button variant="primary" type="button" onClick={() => onDelete(attraction.id)} className="mx-2">
                      -
                    </Button>
                  </Card.Body>
                </Card>
              </div>
            </div>
          })}
        </div>

      </div>
    </div>
  );
};

export default AddAttractions;
