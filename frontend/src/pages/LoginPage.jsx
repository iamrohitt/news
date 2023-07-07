import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "../css/LoginPage.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputValue;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleError = (err) =>
    toast.error(err, {
      // position: "bottom-left",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      // position: "bottom-left",
    });

  useEffect(() => {
    // Check if user is already logged in or has an active session
    // You can use your preferred method to check for authentication status, e.g., checking for a saved token in local storage

    // Example: Check if a token exists in local storage
    const token = localStorage.getItem("token");
    if (token) {
      // User is already authenticated, redirect to another route
      navigate("/", { state: { token } });
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/login",
        {
          ...inputValue,
        },
        { withCredentials: true }
      );
      console.log(data);
      const { success, message, token } = data;
      console.log(success, message);
      if (success) {
        handleSuccess(message);
        localStorage.setItem("token", token); // Store the token in localStorage
        setTimeout(() => {
          console.log(localStorage.getItem("token")); // Log the token after a delay
          navigate("/", { state: { token } }); // Pass the token as state when navigating
        }, 2000);
      } else {
        handleError(message);
      }
    } catch (error) {
      console.log(error);
    }
    setInputValue({
      ...inputValue,
      email: "",
      password: "",
    });
  };

  return (
    <div className="login-page">
      <form onSubmit={handleSubmit} className="login-form">
        <h2 className="login-form-title">Login</h2>

        <div>
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Enter your email"
            onChange={handleOnChange}
            className="login-input"
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleOnChange}
            placeholder="Password"
            className="login-input"
          />
        </div>

        <button type="submit" className="login-button">
          Login
        </button>

        <span>
          Already have an account? <Link to={"/signup"}>Signup</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
};

export default LoginPage;
