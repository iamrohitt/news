import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/RegisterPage.css"; // Import the external CSS file
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
    username: "",
  });
  const { email, password, username } = inputValue;
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    username: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "", // Clear the error when the input value changes
    });
  };

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-right",
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

    // Validate the form inputs
    let formIsValid = true;
    const newErrors = {};

    if (!email) {
      formIsValid = false;
      newErrors.email = "Email is required";
    }

    if (!password) {
      formIsValid = false;
      newErrors.password = "Password is required";
    }

    if (!username) {
      formIsValid = false;
      newErrors.username = "Username is required";
    }

    if (!formIsValid) {
      setErrors(newErrors);
      return;
    }

    try {
      // Handle form submission
      const { data } = await axios.post(
        "http://localhost:4000/signup",
        {
          ...inputValue,
        },
        { withCredentials: true }
      );

      // Handle success or error response
      const { success, message, token } = data;
      if (success) {
        handleSuccess(message);
        localStorage.setItem("token", token);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        handleError(message);
      }
    } catch (error) {
      console.log(error);
    }

    // Clear the form inputs
    setInputValue({
      email: "",
      password: "",
      username: "",
    });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #74ebd5, #9face6)",
        backdropFilter: "blur(10px)",
      }}
    >
      <div className="container">
        {/* Register form */}
        <form onSubmit={handleSubmit} className="form">
          {/* Register form title */}
          <h2
            className="heading"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            Register
          </h2>

          {/* Username input */}
          <div>
            <input
              type="text"
              name="username"
              value={username}
              placeholder="Enter your username"
              onChange={handleOnChange}
              className="input"
            />
            {errors.username && <div className="error">{errors.username}</div>}
          </div>
          {/* Email input */}
          <div>
            <input
              type="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={handleOnChange}
              className="input"
            />
            {errors.email && <div className="error">{errors.email}</div>}
          </div>

          {/* Password input */}
          <div>
            <input
              type="password"
              name="password"
              value={password}
              placeholder="Enter your password"
              onChange={handleOnChange}
              className="input"
            />
            {errors.password && <div className="error">{errors.password}</div>}
          </div>

          {/* Register button */}
          <button type="submit" className="button">
            Register
          </button>
          <p className="register-message">
            Already have an account?{" "}
            <Link to="/login" className="register-link">
              Login
            </Link>
          </p>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default RegisterPage;
