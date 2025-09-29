import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./login/page";
import Signup from "./signup/page";
import Home from "../app/movies/pages/Home";
import "./App.css";

function App() {
  const [darkMode, setDarkMode] = useState(true); // default dark mode

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  return (
    <Router>
      {/* Optional toggle button for testing */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        style={{
          position: "fixed",
          top: 10,
          right: 10,
          zIndex: 1000,
          padding: "5px 10px",
        }}
      >
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
