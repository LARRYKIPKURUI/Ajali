import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/alerticon.png";

const Navbar = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const getLinkClass = (path) => {
    const isActive = location.pathname === path;
    return `nav-link fw-semibold mx-2 ${
      isActive ? "text-danger isActive" : "text-secondary"
    }`;
  };

  return (
    <nav className="navbar navbar-expand-md navbar-light bg-light border-bottom shadow-sm sticky-top">
      <div className="container">
        {/* Brand */}
        <Link
          to="/"
          className="navbar-brand d-flex align-items-center text-danger fw-bold"
        >
          <img
            src={logo}
            alt="Logo"
            height="45"
            width="45"
            className="me-2 fs-5"
          />
          <span className="fs-4 fw-bolder">Ajali!</span>
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
            <li className="nav-item fs-5">
              <Link to="/" className={getLinkClass("/")}>
                Home
              </Link>
            </li>
            <li className="nav-item fs-5">
              <Link to="/about" className={getLinkClass("/about")}>
                About
              </Link>
            </li>
            <li className="nav-item fs-5">
              <Link to="/report" className={getLinkClass("/report")}>
                Report
              </Link>
            </li>
            <li className="nav-item fs-5">
              <Link to="/map" className={getLinkClass("/map")}>
                Map
              </Link>
            </li>
            <li className="nav-item fs-5">
              <Link to="/profile" className={getLinkClass("/profile")}>
                Profile
              </Link>
            </li>
          </ul>

          {/* Right Auth Section */}
          <ul className="navbar-nav ms-auto">
            {/* Conditional rendering based on the user prop */}
            {user ? (
              <>
                <li className="nav-item me-2">
                  <span
                    className="btn btn-danger rounded-circle fw-bold text-white"
                    style={{ width: "32px", height: "32px" }}
                  >
                    {/* Display the first letter of the username */}
                    {user.username.charAt(0).toUpperCase()}
                  </span>
                </li>
                <li className="nav-item">
                  <button
                    onClick={onLogout}
                    className="btn btn-danger text-white fw-semibold"
                  >
                    Log Out
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link
                  to="/login"
                  className="btn btn-danger text-white fw-semibold"
                >
                  Sign In / Sign Up
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
