import { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import API from "../../../API";

const AddItinerary = ({ onAdd }) => {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [itineraryId, setItineraryId] = useState(null);
  const [itinerary, setItinerary] = useState([]);

  useEffect(() => {
    refreshItinerary();
  }, []);

  const refreshItinerary = () => {
    API.get("itinerary/")
      .then((res) => {
        setItinerary(res.data);
      })
      .catch(console.error);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let item = { name, date, time };
    API.post("itinerary/", item).then(() => refreshItinerary());
  };

  const onUpdate = (id) => {
    let item = { name, date, time };
    API.patch(`itinerary/${id}/`, item).then((res) => refreshItinerary());
  };

  const onDelete = (id) => {
    API.delete(`itinerary/${id}/`).then((res) => refreshItinerary());
  };

  function selectItinerary(id) {
    let item = itinerary.filter((itin) => itin.id === id)[0];
    setName(item.name);
    setDate(item.date);
    setTime(item.time);
    setItineraryId(item.id);
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4">
          <h3 className="float-left">Add custom entry to itinerary:</h3>
          <Form onSubmit={onSubmit} className="mt-4">
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
                type="text"
                placeholder="Enter Date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicTime">
              <Form.Label>Time</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
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
                onClick={() => onUpdate(itineraryId)}
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
                <th scope="col">Name</th>
                <th scope="col">Date</th>
                <th scope="col">Time</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {itinerary.map((itin, index) => {
                return (
                  <tr key="">
                    <th scope="row">{itin.id}</th>
                    <td>{itin.name}</td>
                    <td>{itin.date}</td>
                    <td>{itin.time}</td>
                    <td>
                      <Button
                        variant="primary"
                        type="button"
                        onClick={() => selectItinerary(itin.id)}
                        className="mx-2"
                      >
                        Edit
                      </Button>
                      <Button
                        variant="primary"
                        type="button"
                        onClick={() => onDelete(itin.id)}
                        className="mx-2"
                      >
                        Delete
                      </Button>
                      <Button
                        variant="primary"
                        type="button"
                        onClick={() => onDelete(itin.id)}
                        className="mx-2"
                      >
                        Add
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

export default AddItinerary;
