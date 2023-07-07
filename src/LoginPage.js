import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
    setEmail('');
    setPassword('');
  };

  const handleRegisterNowClick = () => {
    navigate('/register');
  };

  return (
    <div className="login-page">
      <form onSubmit={handleSubmit} className="login-form">
        <h2 className="login-form-title">Login</h2>

        <input
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Email"
          className="login-input"
        />

        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Password"
          className="login-input"
        />

        <button type="submit" className="login-button">
          Login
        </button>

        <p className="register-message">
          Don't have an account?{' '}
          <Link to="/register" className="register-link">
            Register now
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
