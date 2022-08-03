import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./components/Views/Home/Home";
import About from "./components/Views/About/About";
import Trips from "./components/Views/Trips/Trips";
import Itinerary from "./components/Views/Itinerary/Itinerary";
import Contact from "./components/Views/Contact/Contact";
import Itinerary2 from './components/Views/Itinerary2/Itinerary2';
import 'bootstrap/dist/css/bootstrap.min.css';

// AUTH STUFF
import Login from "./components/Views/SignIn/Login";
import Signup from "./components/Views/SignIn/SignUp";
import Activate from './components/Views/SignIn/Activate';
import ResetPassword from './components/Views/SignIn/ResetPassword';
import ResetPasswordConfirm from './components/Views/SignIn/ResetPasswordConfirm';
import Layout from './hocs/Layout';
import Console from './components/Views/SignIn/Console';
import {Provider} from 'react-redux';
import store from './store';


function App() {
  return (
    <>
    <Provider store={store}>
      <Router>
        <Layout>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/about" element={<About/>} />
          <Route exact path="/trips" element={<Trips/>} />
          <Route exact path="/itinerary" element={<Itinerary/>} />
          <Route exact path="/contact" element={<Contact/>} />
          <Route exact path="/itinerary2" element={<Itinerary2/>} />

          {/*LOGIN AUTHENTICATION*/}
          <Route exact path='/login' element={<Login/>} />
          <Route exact path='/signup' element={<Signup/>} />
          <Route exact path='/reset-password' element={<ResetPassword/>} />
          <Route exact path='/password/reset/confirm/:uid/:token' element={<ResetPasswordConfirm/>} />
          <Route exact path='/activate/:uid/:token' element={<Activate/>} />
          <Route exact path='/console' element={<Console/>} />

        </Routes>
        </Layout>
      </Router>
    </Provider>
    </>
  );
}

export default App;