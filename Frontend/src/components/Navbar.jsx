import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/alerticon.png";

const Navbar = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar navbar-expand-md navbar-light bg-light border-bottom shadow-sm sticky-top">
      <div className="container">
        {/* Brand */}
        <Link
          to="/"
          className="navbar-brand d-flex align-items-center text-danger fw-bold"
        >
          <img src={logo} alt="Logo" height="32" width="32" className="me-2" />
          Ajali!
        </Link>

        {/* Toggler */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-controls="navbarNav"
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Links */}
        <div
          className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}
          id="navbarNav"
        >
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <Link to="/report" className="nav-link text-danger fw-medium">
                Report Incident
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/alerts" className="nav-link text-danger fw-medium">
                Alerts
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-link text-danger fw-medium">
                About
              </Link>
            </li>
          </ul>

          {/* Right Auth Section */}
          <ul className="navbar-nav ms-auto">
            {user ? (
              <>
                <li className="nav-item me-2">
                  <span
                    className="btn btn-danger rounded-circle fw-bold text-white"
                    style={{ width: "32px", height: "32px" }}
                  >
                    {user.username.charAt(0).toUpperCase()}
                  </span>
                </li>
                <li className="nav-item">
                  <button
                    onClick={onLogout}
                    className="btn btn-outline-danger btn-sm"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item me-2">
                  <Link to="/login" className="btn btn-outline-danger btn-sm">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/signup"
                    className="btn btn-danger btn-sm text-white"
                  >
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
