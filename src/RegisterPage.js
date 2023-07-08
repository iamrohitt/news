import React, { useState } from 'react';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import './RegisterPage.css';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false); // Add 'confirmPasswordVisible' state variable

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible); // Toggle the confirmPassword visibility state
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Confirm Password:', confirmPassword);
    console.log('Username:', username);

    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setUsername('');
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
        <form onSubmit={handleSubmit} className="form">
          <h2
            className="heading"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            Register
          </h2>

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={handleUsernameChange}
            className="input"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
            className="input"
          />

          <div className="password-input-container">
            <input
              type={passwordVisible ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              className="input"
            />
            {passwordVisible ? (
              <BsEyeSlash className="password-input-icon" onClick={handlePasswordVisibility} />
            ) : (
              <BsEye className="password-input-icon" onClick={handlePasswordVisibility} />
            )}
          </div>

          <div className="password-input-container">
            <input
              type={confirmPasswordVisible ? 'text' : 'password'} // Toggle the input type based on confirmPassword visibility state
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              className="input"
            />
            {confirmPasswordVisible ? (
              <BsEyeSlash className="password-input-icon" onClick={handleConfirmPasswordVisibility} />
            ) : (
              <BsEye className="password-input-icon" onClick={handleConfirmPasswordVisibility} />
            )}
          </div>

          <button type="submit" className="button">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
