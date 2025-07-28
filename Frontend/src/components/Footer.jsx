import React from 'react';
import './Footer.css';
import logo from '../assets/alerticon.png';
import { useNavigate } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');

  const handleClick = (path) => {
    if (isLoggedIn) {
      navigate(path);
    } else {
      navigate('/signup');
    }
  };

  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-brand">
          <img src={logo} alt="Ajali Logo" />
          <h3>Ajali!</h3>
          <p>Report. Respond. Rescue.</p>
        </div>

        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#!" onClick={() => handleClick('/report')}>Report</a></li>
            <li><a href="#!" onClick={() => handleClick('/map')}>Map</a></li>
            <li><a href="#!" onClick={() => handleClick('/profile')}>Profile</a></li>
            <li><a href="#!" onClick={() => navigate('/login')}>Login</a></li>
          </ul>
        </div>

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