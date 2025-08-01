import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';
import logo from '../assets/alerticon.png';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInitial, setUserInitial] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('userName');
    setIsLoggedIn(!!token);

    if (userName) {
      setUserInitial(userName.charAt(0).toUpperCase());
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    setIsLoggedIn(false);
    navigate('/');
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
            <NavLink to="/" className={({ isActive }) => `logout-btn ${isActive ? 'active' : ''}`}>Home</NavLink>
            <NavLink to="/about" className={({ isActive }) => `logout-btn ${isActive ? 'active' : ''}`}>About</NavLink>

            {isLoggedIn && (
              <>
                <NavLink to="/report" className={({ isActive }) => `logout-btn ${isActive ? 'active' : ''}`}>Report</NavLink>
                <NavLink to="/map" className={({ isActive }) => `logout-btn ${isActive ? 'active' : ''}`}>Map</NavLink>
                <NavLink to="/profile" className={({ isActive }) => `logout-btn ${isActive ? 'active' : ''}`}>Profile</NavLink>
              </>
            )}
          </div>

          <div className="auth-links">
            {isLoggedIn ? (
              <>
                <div className="user-circle">{userInitial}</div>
                <button onClick={handleLogout} className="logout-btn">Logout</button>
              </>
            ) : (
              <>
                <NavLink to="/login" className={({ isActive }) => `logout-btn ${isActive ? 'active' : ''}`}>Login</NavLink>
                <NavLink to="/signup" className={({ isActive }) => `logout-btn ${isActive ? 'active' : ''}`}>Signup</NavLink>
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
          <NavLink to="/" className={({ isActive }) => `logout-btn ${isActive ? 'active' : ''}`} onClick={() => setIsMenuOpen(false)}>Home</NavLink>
          <NavLink to="/about" className={({ isActive }) => `logout-btn ${isActive ? 'active' : ''}`} onClick={() => setIsMenuOpen(false)}>About</NavLink>

          {isLoggedIn && (
            <>
              <NavLink to="/report" className={({ isActive }) => `logout-btn ${isActive ? 'active' : ''}`} onClick={() => setIsMenuOpen(false)}>Report</NavLink>
              <NavLink to="/map" className={({ isActive }) => `logout-btn ${isActive ? 'active' : ''}`} onClick={() => setIsMenuOpen(false)}>Map</NavLink>
              <NavLink to="/profile" className={({ isActive }) => `logout-btn ${isActive ? 'active' : ''}`} onClick={() => setIsMenuOpen(false)}>Profile</NavLink>
              <button onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="logout-btn">Logout</button>
            </>
          )}

          {!isLoggedIn && (
            <>
              <NavLink to="/login" className={({ isActive }) => `logout-btn ${isActive ? 'active' : ''}`} onClick={() => setIsMenuOpen(false)}>Login</NavLink>
              <NavLink to="/signup" className={({ isActive }) => `logout-btn ${isActive ? 'active' : ''}`} onClick={() => setIsMenuOpen(false)}>Signup</NavLink>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;