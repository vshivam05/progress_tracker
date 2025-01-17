import React, { useState } from "react";
import axios from "axios";
import config from "../config";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import "./Login.css"; // Import CSS file

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestBody = { email, password };

    try {
      const response = await axios.post(`${config.endpoint}/users/login`, requestBody);
      console.log(response.data.message || "Logged In successful!");
      console.log(response.data.token);
      
      localStorage.setItem("email", email);
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message || "Login failed!");
        alert(error.response.data.message || "Login failed!");
      } else {
        console.log("An error occurred: " + error.message);
        alert("An error occurred: " + error.message);
      }
    }
  };

  return (
    <>
      <Header />
      <div className="login-container">
        <h1 className="login-heading">Welcome to To-do app</h1>
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="email"
            value={email}
            placeholder="email ID"
            onChange={(e) => setEmail(e.target.value)}
            className="login-input"
            required
          />
          <input
            type="password"
            value={password}
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
            required
          />
          <button type="submit" className="login-button">
            Sign in to continue
          </button>
        </form>
        <p className="login-footer">
          Don't have an account? <Link to="/">Register</Link>
        </p>
      </div>
    </>
  );
}

export default Login;
