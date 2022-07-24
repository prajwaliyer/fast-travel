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
  // const [price,setPrice]=useState("")
  const [cityId, setCityId] = useState(null);
  const [search, setSearch] = useState({})
  const [table, setTable] = useState([]);
  const [empty, setEmpty] = useState("Y");

  //FINAL TEXT VARIABLES
  const [fhotels, setFhotels] = useState([]);
  const [fstreets, setFstreets] = useState([])
  const [fcountry, setFcountry] = useState("")
  const [fimgs, setFimgs] = useState([]);
  const [flandmarks, setFlandmarks] = useState([]);

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
      console.log(response);
    }).catch(function(error) {
      console.log(error);
    })
  };
//=================================================================================
  const updated_data = () => {
    API.get("hotels/"+cityId+"/")
      .then((res) => {
        setSearch(res.data);
      })
      .catch(console.error);
  };

  const getLastElement = () =>{
    console.log("ATTTEMPT")
    console.log(table[table.length-1])
    setSearch(table[table.length-1])
  }


//TEXT PRE-PROCESSING
const Split_Data = (response_list) =>{
  console.log(response_list)
  setFhotels(response_list.hotel.split(";"))
  setFstreets(response_list.street.split(";"))
  setFcountry(response_list.country.split(";")[0])
  setFimgs(response_list.imgs.split(";"))
  setFlandmarks(response_list.landmarks.split(";"))

  //PRINTING
  console.log(fhotels)
  console.log(fstreets)
  console.log(fcountry)
  console.log(fimgs)
  console.log(flandmarks)
}

//=================================================================================
  const onUpdate = (id) => {
    // let item = { city, hotel, street, country, imgs, landmarks, price };
    let item = { city, hotel, street, country, imgs, landmarks };
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
    setCityId(item.id);
    // setPrice(item.price)
  }

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
              <Button
                variant="primary"
                type="submit"
                onClick={() => onDelete(cityId)}
                className="mx-2"
              >
                Refresh
              </Button>
            </div>
          </Form>
          <p></p>
          Here's your potential future destination!<p></p>
          <h5>City:</h5> {city}
          <h5>Country:</h5> {country}
        </div>

        <div className="col-md-8 m">
          {/* .then(Split_Data(table)) */}
          {table.slice(-1).map((hotel, index) => {
            Split_Data(hotel)
            console.log(fhotels)
            console.log(fstreets)
            console.log(fcountry)
            console.log(fimgs)
            console.log(flandmarks)
            return (
              <div>
              {fhotels}
              </div>
            )
          })}

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