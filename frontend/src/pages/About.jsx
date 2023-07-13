import React from "react";
import "../css/About.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

const AboutPage = () => {
  return (
    <div className="about-container">
      <h1>About Us</h1>
      <p>
        Disaster News Portal is a web application designed to provide timely
        updates and news regarding disasters happening around Nepal. It aims to
        keep users informed about ongoing disasters, their impact, and relief
        efforts. This page provides an overview of the project structure and
        instructions for setting up and running the application.
      </p>
      <p>
        <b>Features</b>
        <div className="details">
          <div>
            <strong>Timely updates:</strong> The portal fetches and displays the
            latest news and updates related to disasters from reliable sources.{" "}
          </div>
          <div>
            <strong>Disaster details:</strong> Users can view detailed
            information about specific disasters, including their causes,
            locations, and impact.{" "}
          </div>

          <div>
            <strong>Relief efforts:</strong> The portal highlights ongoing
            relief efforts and provides information on how users can contribute
            or support the affected areas.
          </div>

          <div>
            <strong>User registration and authentication:</strong> Users can
            create accounts, log in, and personalize their experience on the
            portal.
          </div>
        </div>
      </p>
      <p>
        Our commitment to excellence extends beyond our products. We value open
        communication and collaboration, fostering a positive work environment
        where every team member is empowered to contribute their best.
      </p>
      <p>
        Thank you for visiting our website. We look forward to serving you and
        providing you with an outstanding experience.
      </p>
      <footer className="footer">
        <a
          href="https://github.com/iamrohitt/news"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faGithub} className="github-icon" />
          Visit our GitHub repository
        </a>
      </footer>
    </div>
  );
};

export default AboutPage;
