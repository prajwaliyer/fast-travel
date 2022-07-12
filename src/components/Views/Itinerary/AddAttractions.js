import { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
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
        <div className="col-md-8 m">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">City Name</th>
                <th scope="col">Country</th>
                <th scope="col">Attraction Name</th>
                <th scope="col">Rating</th>
                <th scope="col">Google URL</th>
                <th scope="col">Photo</th>
                <th scope="col">Place ID</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {attractions.map((attraction, index) => {
                return (
                  <tr key="">
                    <th scope="row">{attraction.id}</th>
                    <td>{attraction.name}</td>
                    <td>{attraction.country}</td>
                    <td>{attraction.attraction_name}</td>
                    <td>{attraction.rating}</td>
                    <td>{attraction.google_url}</td>
                    <td><img src={`${attraction.photo}`} width="20" height="20" alt="404" /></td>
                    <td>{attraction.place_id}</td>
                    <td>
                      <Button
                        variant="primary"
                        type="button"
                        onClick={() => selectAttraction(attraction.id)}
                        className="mx-2"
                      >
                        Edit
                      </Button>
                      <Button
                        variant="primary"
                        type="button"
                        onClick={() => onDelete(attraction.id)}
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

export default AddAttractions;
