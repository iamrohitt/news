import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {
  // State variables to store email and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // React Router navigate hook for programmatic navigation
  const navigate = useNavigate();

  // Event handler for email input change
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // Event handler for password input change
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // Event handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform login logic here, such as sending data to a server
    console.log('Email:', email);
    console.log('Password:', password);
    // Reset form fields
    setEmail('');
    setPassword('');
  };

  // Event handler for "Register Now" button click
  const handleRegisterNowClick = () => {
    // Use the navigate function to redirect to the register page
    navigate('/register');
  };

  return (
    <div>
      {/* Login form container */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          background: 'linear-gradient(to bottom right, #74ebd5, #9face6)',
          backdropFilter: 'blur(10px)',
        }}
      >
        {/* Login form title */}
        <h2>Login</h2>

        {/* Login form */}
        <form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            padding: '20px',
            borderRadius: '10px',
            justifyContent: 'center',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
          }}
        >
          {/* Email input */}
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Email"
            style={{
              padding: '8px',
              borderRadius: '5px',
              border: 'none',
              background: 'rgba(255, 255, 255, 0.5)',
              backdropFilter: 'blur(5px)',
            }}
          />

          {/* Password input */}
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Password"
            style={{
              padding: '8px',
              borderRadius: '5px',
              border: 'none',
              background: 'rgba(255, 255, 255, 0.5)',
              backdropFilter: 'blur(5px)',
            }}
          />

          {/* Login button */}
          <button
  type="submit"
  style={{
    padding: '8px 16px',
    borderRadius: '5px',
    border: 'none',
    background: 'linear-gradient(to bottom right, #74ebd5, #9face6)',
    color: 'white',
    cursor: 'pointer',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
    marginTop: '10px', // Add margin-top to match the second button
    "&:hover": { // Add hover effect to match the second button
      background: "linear-gradient(to bottom right, #74ebd5, #9face6)",
    },
  }}
>
  Login
</button>

        </form>

        {/* "Don't have an account? Register now" */}
        <p style={{ marginTop: '10px', color: 'white' }}>
          Don't have an account?{' '}
          <Link to="/register" style={{ color: 'white', textDecoration: 'underline' }}>
            Register now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
