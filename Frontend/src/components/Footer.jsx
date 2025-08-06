import logo from "../assets/alerticon.png";
import { useNavigate } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

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
    <footer className="bg-dark text-white  pt-5 pb-3 border-top border-danger mt-5">
      <div className="container">
        <div className="row gy-4 text-center text-md-start">
          {/* Brand + Hotline */}
          <div className="col-md-4">
            <div className="d-flex align-items-center mb-2">
              <img src={logo} alt="Ajali Logo" style={{ width: "32px" }} className="me-2" />
              <h4 className="text-danger m-0 fw-bold">Ajali!</h4>
            </div>
            <p className="text-white">
              Empowering Kenyan communities to respond quickly to emergencies. Every second counts when lives are at stake.
            </p>

            {/* Emergency Hotline Box */}
            <div className="bg-danger text-white p-3 rounded mt-3 text-start shadow-sm">
              <strong className="d-block fs-6">Emergency Hotline</strong>
              <span className="fs-4 fw-bold">999</span>
              <p className="mb-0 small">Available 24/7</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-md-4">
            <h5 className="mb-3 text-danger fw-bold">Quick Links</h5>
            <ul className="list-unstyled text-muted">
              <li>
                <button onClick={() => navigate("/")} className="btn  text-light py-2">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => handleClick("/report")} className="btn text-white py-2">
                  Report Incident
                </button>
              </li>
              <li>
                <button onClick={() => handleClick("/map")} className="btn text-white p-2">
                  Live Map
                </button>
              </li>
              <li>
                <button onClick={() => handleClick("/profile")} className="btn text-white py-2">
                  Profile
                </button>
              </li>
              <li>
                <button onClick={() => navigate("/about")} className="btn btn-link text-muted py-2">
                  About Us
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info + Socials */}
          <div className="col-md-4">
            <h5 className="mb-3 fw-bold text-danger">Contact Us</h5>
            <p className="text-white small mb-">
              📞 +254 700 000 000
            </p>
            <p className="text-white small mb-">
              📧 www.ajali.co.ke
            </p>
            <p className="text-white small mb-">
              📍 Nairobi, Kenya
            </p>

            <h6 className="fw-semibold text-muted mb-2">Follow Us</h6>
            <div className="d-flex gap-3 justify-content-center justify-content-md-start">
              <a href="https://facebook.com/" target="_blank" rel="noreferrer">
                <FaFacebookF className="fs-5 text-danger " />
              </a>
              <a href="https://twitter.com/" target="_blank" rel="noreferrer">
                <FaTwitter className="fs-5 text-danger" />
              </a>
              <a href="https://instagram.com/" target="_blank" rel="noreferrer">
                <FaInstagram className="fs-5 text-danger" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Line */}
        <hr className="border-secondary my-4" />
        <div className="text-center small text">
          &copy; {new Date().getFullYear()} Ajali! All rights reserved. Built for the safety of Kenyan communities.
          {/* <div className="mt-1">
            <span className="me-3">Privacy Policy</span>
            <span className="me-3">Terms of Service</span>
            <span>Support</span>
          </div> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
