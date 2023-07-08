import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from './Navbar';
import Home from './Home';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import About from './About';

const App = () => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Router>
        <div>
          <Navbar/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/about" element={<About />} /> {/* Add this line */}
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;
