import React from "react";
import logo from "../assets/alerticon.png";
import { useNavigate } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  const handleClick = (path) => {
    if (isLoggedIn) {
      navigate(path);
    } else {
      navigate("/signup");
    }
  };

  return (
    <footer className="bg-dark text-light pt-4 border-top border-danger">
      <div className="container">
        <div className="row text-center text-md-start gy-4">
          {/* Brand */}
          <div className="col-md-4">
            <img
              src={logo}
              alt="Ajali Logo"
              className="mb-2"
              style={{ width: "40px" }}
            />
            <h3 className="text-danger m-0">Ajali!</h3>
            <p className="text-muted small">Report. Respond. Rescue.</p>
          </div>

          {/* Links */}
          <div className="col-md-4">
            <h5 className="mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <button
                  className="btn btn-link text-secondary p-0"
                  onClick={() => handleClick("/report")}
                >
                  Report
                </button>
              </li>
              <li>
                <button
                  className="btn btn-link text-secondary p-0"
                  onClick={() => handleClick("/map")}
                >
                  Map
                </button>
              </li>
              <li>
                <button
                  className="btn btn-link text-secondary p-0"
                  onClick={() => handleClick("/profile")}
                >
                  Profile
                </button>
              </li>
              <li>
                <button
                  className="btn btn-link text-secondary p-0"
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
              </li>
            </ul>
          </div>

          {/* Contact + Social */}
          <div className="col-md-4">
            <h5 className="mb-3">Contact</h5>
            <p className="text-muted small mb-1">Email: support@ajali.org</p>
            <p className="text-muted small mb-2">Emergency Line: 999</p>

            <div className="d-flex gap-3 justify-content-center justify-content-md-start">
              <a
                href="https://wa.me/254703681211"
                target="_blank"
                rel="noreferrer"
              >
                <FaWhatsapp className="fs-5 text-danger" />
              </a>
              <a href="https://twitter.com/" target="_blank" rel="noreferrer">
                <FaTwitter className="fs-5 text-danger" />
              </a>
              <a href="https://facebook.com/" target="_blank" rel="noreferrer">
                <FaFacebookF className="fs-5 text-danger" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="text-center border-top border-secondary pt-3 mt-4 small text-muted">
          &copy; {new Date().getFullYear()} Ajali! All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
