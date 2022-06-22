import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./components/Views/Home/Home";
import About from "./components/Views/About/About";
import Trips from "./components/Views/Trips/Trips";
import Itinerary from "./components/Views/Itinerary/Itinerary";
import Contact from "./components/Views/Contact/Contact";
import SignIn from "./components/Views/SignIn/SignIn";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/about" element={<About/>} />
          <Route exact path="/trips" element={<Trips/>} />
          <Route exact path="/itinerary" element={<Itinerary/>} />
          <Route exact path="/contact" element={<Contact/>} />
          <Route exact path="/sign-in" element={<SignIn/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;