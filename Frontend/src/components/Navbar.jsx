import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';
import logo from '../assets/alerticon.png';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin');
    setIsLoggedIn(false);
    navigate('/login');
  };

  const handleAboutClick = () => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const section = document.getElementById("about-section");
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      }, 200);
    } else {
      const section = document.getElementById("about-section");
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <img src={logo} alt="Ajali Logo" />
          <span>Ajali!</span>
        </div>

        <div className="navbar-links">
          <div className="center-links">
<a
  href="/"
  className="nav-link"
  onClick={(e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }}
>
  Home
</a>            <button onClick={handleAboutClick} className="nav-button">About</button>
            {isLoggedIn && (
              <>
                <NavLink to="/report" className={({ isActive }) => isActive ? 'active-link' : ''}>Report</NavLink>
                <NavLink to="/map" className={({ isActive }) => isActive ? 'active-link' : ''}>Map</NavLink>
                <NavLink to="/profile" className={({ isActive }) => isActive ? 'active-link' : ''}>Profile</NavLink>
              </>
            )}
          </div>

          <div className="auth-links">
            {isLoggedIn ? (
              <button onClick={handleLogout} className="logout-btn">Logout</button>
            ) : (
              <>
                <NavLink to="/login" className={({ isActive }) => isActive ? 'active-link' : ''}>Login</NavLink>
                <NavLink to="/signup" className={({ isActive }) => isActive ? 'active-link' : ''}>Signup</NavLink>
              </>
            )}
          </div>
        </div>

        <button
          className={`navbar-toggle ${isMenuOpen ? 'open' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
      </div>

      {isMenuOpen && (
        <div className="navbar-mobile">
          <NavLink to="/" onClick={() => setIsMenuOpen(false)}>Home</NavLink>
          <button onClick={() => {
            handleAboutClick();
            setIsMenuOpen(false);
          }}>About</button>
          {isLoggedIn && (
            <>
              <NavLink to="/report" onClick={() => setIsMenuOpen(false)}>Report</NavLink>
              <NavLink to="/map" onClick={() => setIsMenuOpen(false)}>Map</NavLink>
              <NavLink to="/profile" onClick={() => setIsMenuOpen(false)}>Profile</NavLink>
              <button onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="logout-btn">Logout</button>
            </>
          )}
          {!isLoggedIn && (
            <>
              <NavLink to="/login" onClick={() => setIsMenuOpen(false)}>Login</NavLink>
              <NavLink to="/signup" onClick={() => setIsMenuOpen(false)}>Signup</NavLink>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
