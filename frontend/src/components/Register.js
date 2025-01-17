import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../config";
import Header from "./Header";
import "./Register.css"; 

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestBody = {
      email,
      password,
      confirmPassword,
    };

    try {
      const response = await axios.post(`${config.endpoint}/users/register`, requestBody);
      console.log(response.data.message || "Registration successful!");
      navigate("/login");
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message || "Registration failed!");
        alert(error.response.data.message || "Registration failed!");
      } else {
        console.log("An error occurred: " + error.message);
        alert("An error occurred: " + error.message);
      }
    }
  };

  return (
    <>
      <Header />
      <div className="register-container">
        <h1 className="register-heading">Welcome to To-do app</h1>
        <form onSubmit={handleSubmit} className="register-form">
          <input
            type="email"
            value={email}
            placeholder="email ID"
            onChange={(e) => setEmail(e.target.value)}
            className="register-input"
            required
          />
          <input
            type="password"
            value={password}
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
            className="register-input"
            required
          />
          <input
            type="password"
            value={confirmPassword}
            placeholder="confirm password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="register-input"
            required
          />
          <button type="submit" className="register-button">
            Sign Up
          </button>
        </form>
        <p className="register-footer">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </>
  );
}

export default Register;
 