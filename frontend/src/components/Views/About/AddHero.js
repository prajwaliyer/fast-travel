import { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import API from "../../../API";

const AddHero = ({ onAdd }) => {
  const [name, setName] = useState("");
  const [alias, setAlias] = useState("");
  const [heroId, setHeroId] = useState(null);
  const [heroes, setHeroes] = useState([]);

  useEffect(() => {
    refreshHeroes();
  }, []);

  const refreshHeroes = () => {
    API.get("/")
      .then((res) => {
        setHeroes(res.data);
        console.log("Custom: GET request sent");
      })
      .catch(console.error);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let item = { name, alias };
    API.post("/", item).then(() => refreshHeroes());
    console.log("Custom: POST request sent");
  };

  const onUpdate = (id) => {
    let item = { name, alias };
    API.patch(`/${id}/`, item).then((res) => refreshHeroes());
    console.log("Custom: PATCH request sent");
  };

  const onDelete = (id) => {
    API.delete(`/${id}/`).then((res) => refreshHeroes());
    console.log("Custom: DELETE request sent");
  };

  function selectHero(id) {
    let item = heroes.filter((hero) => hero.id === id)[0];
    setName(item.name);
    setAlias(item.alias);
    setHeroId(item.id);
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4">
          <h3 className="float-left">Create a new Hero</h3>
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

            <Form.Group className="mb-3" controlId="formBasicAlias">
              <Form.Label>Alias</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Alias"
                value={alias}
                onChange={(e) => setAlias(e.target.value)}
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
                onClick={() => onUpdate(heroId)}
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
                <th scope="col">Hero Name</th>
                <th scope="col">Alias</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {heroes.map((hero, index) => {
                return (
                  <tr key="">
                    <th scope="row">{hero.id}</th>
                    <td>{hero.name}</td>
                    <td>{hero.alias}</td>
                    <td>
                      <Button
                        variant="primary"
                        type="button"
                        onClick={() => selectHero(hero.id)}
                        className="mx-2"
                      >
                        Edit
                      </Button>
                      <Button
                        variant="primary"
                        type="button"
                        onClick={() => onDelete(hero.id)}
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

export default AddHero;
