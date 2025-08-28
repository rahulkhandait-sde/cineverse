"use client";
import React, { useState } from "react";
import Link from "next/link";
import "./login.css";

function Login() {
  const [form, setForm] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here (e.g., API call)
    console.log(form);
  };

   
  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            name="username"
            value={form.username}
            onChange={handleChange}
            className="login-input"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="login-input"
          />
          <button className="login-button">Login</button>
        </form>
        <div className="login-footer">
          <Link href="/signup" className="login-link">
            Don't have an account? Sign Up
          </Link>
        </div>
      </div>
    </div>
  

  );
}

export default Login;