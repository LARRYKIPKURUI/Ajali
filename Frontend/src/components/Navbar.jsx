import React, { useEffect, useState } from "react";
import {NavLink, useNavigate} from 'react-router-dom'
import './Navbar.css';
import logo from '../assets/alerticon.png';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    },[]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate('/login');
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
            <NavLink to="/" className={({ isActive }) => isActive ? 'active-link' : ''}>Home</NavLink>
            <NavLink to="/report" className={({ isActive }) => isActive ? 'active-link' : ''}>Report</NavLink>
            <NavLink to="/map" className={({ isActive }) => isActive ? 'active-link' : ''}>Map</NavLink>
            {isLoggedIn && (
              <NavLink to="/profile" className={({ isActive }) => isActive ? 'active-link' : ''}>Profile</NavLink>
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
                <button className={`navbar-toggle ${isMenuOpen ? 'open' : ''}`}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </button>
            </div>
            {isMenuOpen && (
                <div className="navbar-mobile">
                   <a href="#home" onClick={() => setIsMenuOpen(false)}>Home</a>
                   <a href="#report"  onClick={() => setIsMenuOpen(false)}>Report</a>
                   <a href="#map"  onClick={() => setIsMenuOpen(false)}>Map</a>
                   <a href="#profile"  onClick={() => setIsMenuOpen(false)}>Profile</a>
                </div>
            )}
        </header>
    );

};
export default Navbar;