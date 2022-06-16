import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        <Navbar />
      </Router>
      <h1>App</h1>
    </>
  );
}

export default App;