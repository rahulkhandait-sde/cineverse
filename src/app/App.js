import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./login/page";
import Signup from "./signup/page";
import Home from "../app/movies/pages/Home";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;