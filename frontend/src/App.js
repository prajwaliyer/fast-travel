import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router } from 'react-router-dom';
import Hero from "./Hero/Hero";

function App() {
  return (
    <>
      <Router>
        <Navbar />
      </Router>
      <Hero />
    </>
  );
}

export default App;