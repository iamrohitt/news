import React from 'react';
import './About.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';



const About = () => {
  return (
    <div className="about-container">
      <h1>About Us</h1>
      <p>
        Welcome to our website! We are a passionate team dedicated to providing high-quality products and services to our customers.
        Our mission is to create innovative solutions and deliver exceptional value to meet the needs of our clients.
      </p>
      <p>
        At our company, we prioritize customer satisfaction and strive to exceed expectations in every interaction. With our team of
        skilled professionals, we ensure that our products are built with precision and attention to detail.
      </p>
      <p>
        Our commitment to excellence extends beyond our products. We value open communication and collaboration, fostering a positive
        work environment where every team member is empowered to contribute their best.
      </p>
      <p>
        Thank you for visiting our website. We look forward to serving you and providing you with an outstanding experience.
      </p>
      <footer className="footer">
        <a href="https://github.com/your-github-repo" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faGithub} className="github-icon" />
             Visit our GitHub repository
        </a>
    </footer>


    </div>
  );
};

export default About;
