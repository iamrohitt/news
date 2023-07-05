import React, { useState } from 'react';
import './RegisterPage.css'; // Import the external CSS file

const RegisterPage = () => {
  // State variables to store email, password, and confirmPassword
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Event handler for email input change
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // Event handler for password input change
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // Event handler for confirm password input change
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  // Event handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform registration logic here, such as sending data to a server
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Confirm Password:', confirmPassword);

    // Reset form fields
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(to bottom right, #74ebd5, #9face6)',
        backdropFilter: 'blur(10px)'
      }}
    >
      <div className="container">
        {/* Register form title */}
        <h2 className="heading">Register</h2>

        {/* Register form */}
        <form onSubmit={handleSubmit} className="form">
          {/* Email input */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
            className="input"
          />

          {/* Password input */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            className="input"
          />

          {/* Confirm password input */}
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            className="input"
          />

          {/* Register button */}
          <button type="submit" className="button">Register</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
