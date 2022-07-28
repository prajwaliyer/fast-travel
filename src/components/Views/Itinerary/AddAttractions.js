import { useState, useEffect, useRef } from "react";
import { Button, Form, Card, Row, Container, Text, Modal } from "react-bootstrap";
import API from "../../../API";

const AddAttractions = ({ onAdd }) => {
  
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [attraction_names, setAttraction_names] = useState({});
  const [attractionId, setAttractionId] = useState(null);
  const [attractions, setAttractions] = useState([]);

  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const num = useRef(0);

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

  function selectItinerary(id) {
    let item = attractions.filter((attraction) => attraction.id === id)[0];
    setName(item.attraction_names[num.current]['attraction_name']);
  }

  const addToItinerary = (e) => {
    e.preventDefault();
    let item = { name, date, time };
    API.post("itinerary/", item)
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

    setName(item.city);
  }

  return (
    <div className="container mt-5">
      <div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add to Itinerary</Modal.Title>
          </Modal.Header>
          <Form onSubmit={addToItinerary} className="mt-4">
            <Modal.Body>
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicDate">
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Enter Date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicTime">
                <Form.Label>Time</Form.Label>
                <Form.Control
                  type="time"
                  placeholder="Enter Time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <div className="float-right">
              <Button
                variant="primary"
                type="submit"
                onClick={() => { handleClose(); addToItinerary() }}
                className="mx-2"
              >
                Save
              </Button>
            </div>
          </Modal.Footer>
          </Form>
          
        </Modal>
      </div>
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
                    <Button variant="primary" type="button" onClick={() => { num.current = 0; selectItinerary(attraction.id); handleShow() }} className="mx-2">
                      +
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
                    <Button variant="primary" type="button" onClick={() => { num.current = 1; selectItinerary(attraction.id); handleShow() }} className="mx-2">
                      +
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
                    <Button variant="primary" type="button" onClick={() => { num.current = 2; selectItinerary(attraction.id); handleShow() }} className="mx-2">
                      +
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
                    <Button variant="primary" type="button" onClick={() => { num.current = 3; selectItinerary(attraction.id); handleShow() }} className="mx-2">
                      +
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
                    <Button variant="primary" type="button" onClick={() => { num.current = 4; selectItinerary(attraction.id); handleShow() }} className="mx-2">
                      +
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
                    <Button variant="primary" type="button" onClick={() => { num.current = 5; selectItinerary(attraction.id); handleShow() }} className="mx-2">
                      +
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
