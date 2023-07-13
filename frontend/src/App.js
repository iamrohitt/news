import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Logout from './pages/Logout';
import Predict from './pages/Predict';
import AboutPage from './pages/About';
import ForgetPassword from './pages/ForgetPassword';
import PasswordReset from './pages/PasswordReset';
import ProfilePage from './pages/Profile';

const App = () => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/" element={<LoginPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/signup" element={<RegisterPage />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/predict" element={<Predict />} />
            <Route path="/forget-password" element={<ForgetPassword />} />
            <Route path="/password-reset/:id/:token" element={<PasswordReset />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;
