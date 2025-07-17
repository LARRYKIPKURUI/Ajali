import React from 'react';
import './Footer.css';
import logo from '../assets/alerticon.png';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Left: Logo and Tagline */}
        <div className="footer-brand">
          <img src={logo} alt="Ajali Logo" />
          <h3>Ajali!</h3>
          <p>Report. Respond. Rescue.</p>
        </div>

        {/* Center: Quick Links */}
        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/report">Report</Link></li>
            <li><Link to="/map">Map</Link></li>
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/login">Login</Link></li>
          </ul>
        </div>

       {/* Right: Contact Info */}
<div className="footer-contact">
  <h4>Contact</h4>
  <p>Email: support@ajali.org</p>
  <p>Emergency Line: 999</p>

  <div className="footer-social">
    <a href="https://wa.me/254703681211" target="_blank" rel="noreferrer">
      <FaWhatsapp className="social-icon" />
    </a>
    <a href="https://twitter.com/" target="_blank" rel="noreferrer">
      <FaTwitter className="social-icon" />
    </a>
    <a href="https://facebook.com/" target="_blank" rel="noreferrer">
      <FaFacebookF className="social-icon" />
    </a>
  </div>
</div>
</div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Ajali! All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;