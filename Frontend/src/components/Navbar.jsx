import React, { useState } from "react";
import './Navbar.css';
import logo from '../assets/alerticon.png';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="navbar">
            <div className="navbar-container">
                <div className="navbar-logo">
                    <img src={logo} alt="Ajali Logo" />
                    <span>Ajali!</span>
                </div>

                <nav className="navbar-links">
                    a<a href = "#Home">Home</a>
                    a<a href = "#report">Report</a>
                    a<a href = "#map">Map</a>
                    a<a href = "#profile">Profile</a>
                </nav>
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
                   <a href="#home">Home</a>
                   <a href="#report">Report</a>
                   <a href="#map">Map</a>
                   <a href="#profile">Profile</a>
                </div>
            )}
        </header>
    );

};
export default Navbar;