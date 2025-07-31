import React from 'react';
import './About.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faBookOpen, faShieldAlt, faPhone } from '@fortawesome/free-solid-svg-icons';

const About = () => {
  return (
    <section className="about-section" id="about-section">
      <div className="about-container">
        {/* Top Two Columns */}
        <div className="about-top">
          <div className="about-bullets">
            <div className="bullet-item">
              <FontAwesomeIcon icon={faUsers} className="bullet-icon" />
              <h3>Empowering Communities</h3>
              <p>We bring people together to respond and recover faster in emergencies.</p>
            </div>

            <div className="bullet-item">
              <FontAwesomeIcon icon={faBookOpen} className="bullet-icon" />
              <h3>Educating for Impact</h3>
              <p>Knowledge saves lives. We train, inform and engage with clarity.</p>
            </div>

            <div className="bullet-item">
              <FontAwesomeIcon icon={faShieldAlt} className="bullet-icon" />
              <h3>Ensuring Safety</h3>
              <p>From alerts to response, we prioritize safety and reliability.</p>
            </div>
          </div>

          <div className="about-difference">
            <h2>Making a Difference</h2>
            <p>
              Every report matters. Every second counts. Through technology and
              community, we’re bridging gaps in emergency response and saving lives
              together. This is more than an app—it’s a movement for impact.
            </p>
          </div>
        </div>

        {/* Emergency Hotlines BELOW Making a Difference */}
        <div className="hotline-buttons">
          <a href="tel:999" className="report-btn hotline-link">
            <FontAwesomeIcon icon={faPhone} className="hotline-icon" />
            Emergency Services (999)
          </a>

          <a href="tel:1199" className="report-btn hotline-link">
            <FontAwesomeIcon icon={faPhone} className="hotline-icon" />
            Kenya Red Cross (1199)
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;