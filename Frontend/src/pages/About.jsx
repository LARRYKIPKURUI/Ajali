import React from 'react';
import './About.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faBookOpen, faShieldAlt } from '@fortawesome/free-solid-svg-icons';

const About = () => {
  return (
    <section className="about-section">
      <div className="about-container">
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
    </section>
  );
};

export default About;