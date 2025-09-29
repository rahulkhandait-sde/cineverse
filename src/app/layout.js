"use client";
import { useState, useEffect } from "react";
import "../App.css"; // global dark mode

export default function RootLayout({ children }) {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  return (
    <>
      {/* Dark mode toggle button */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        style={{
          position: "fixed",
          top: 10,
          right: 10,
          zIndex: 1000,
          padding: "5px 10px",
          cursor: "pointer",
        }}
      >
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>

      {children}
    </>
  );
}
