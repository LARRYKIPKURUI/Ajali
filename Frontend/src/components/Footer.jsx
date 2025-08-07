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
    // Reduced padding from pt-5 to pt-3 and pb-3 to pb-2
    <footer className="bg-dark text-white pt-3 pb-2 border-top border-danger">
      <div className="container">
        <div className="row gy-3 text-center text-md-start">
          {/* Brand + Hotline */}
          <div className="col-md-4">
            <div className="d-flex align-items-center mb-1">
              <img src={logo} alt="Ajali Logo" style={{ width: "28px" }} className="me-2" />
              <h5 className="text-danger m-0 fw-bold">Ajali!</h5> {/* Changed to h5 */}
            </div>
            <p className="text-white small"> {/* Added "small" class */}
              Empowering Kenyan communities to respond quickly to emergencies. Every second counts when lives are at stake.
            </p>

            {/* Emergency Hotline Box */}
            <div className="bg-danger text-white p-2 rounded mt-2 text-start shadow-sm"> {/* Reduced padding and margin */}
              <strong className="d-block fs-6">Emergency Hotline</strong>
              <span className="fs-5 fw-bold">999</span> {/* Changed to fs-5 */}
              <p className="mb-0 small">Available 24/7</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-md-4">
            <h6 className="mb-2 text-danger fw-bold">Quick Links</h6> {/* Changed to h6 */}
            <ul className="list-unstyled text-muted">
              <li>
                <button onClick={() => navigate("/")} className="btn text-light py-1"> {/* Reduced vertical padding */}
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => handleClick("/report")} className="btn text-white py-1"> {/* Reduced vertical padding */}
                  Report Incident
                </button>
              </li>
              <li>
                <button onClick={() => handleClick("/map")} className="btn text-white py-1"> {/* Reduced vertical padding */}
                  Live Map
                </button>
              </li>
              <li>
                <button onClick={() => handleClick("/profile")} className="btn text-white py-1"> {/* Reduced vertical padding */}
                  Profile
                </button>
              </li>
              <li>
                <button onClick={() => navigate("/about")} className="btn btn-link text-muted py-1"> {/* Reduced vertical padding */}
                  About Us
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info + Socials */}
          <div className="col-md-4">
            <h6 className="mb-2 fw-bold text-danger">Contact Us</h6> {/* Changed to h6 */}
            <p className="text-white small mb-1"> {/* Added "small" class and reduced margin */}
              📞 +254 700 000 000
            </p>
            <p className="text-white small mb-1"> {/* Added "small" class and reduced margin */}
              📧 www.ajali.co.ke
            </p>
            <p className="text-white small mb-2"> {/* Added "small" class and reduced margin */}
              📍 Nairobi, Kenya
            </p>

            <h6 className="fw-semibold text-muted mb-1">Follow Us</h6> {/* Reduced margin */}
            <div className="d-flex gap-2 justify-content-center justify-content-md-start"> {/* Reduced gap */}
              <a href="https://facebook.com/" target="_blank" rel="noreferrer">
                <FaFacebookF className="fs-6 text-danger" /> {/* Reduced icon size */}
              </a>
              <a href="https://twitter.com/" target="_blank" rel="noreferrer">
                <FaTwitter className="fs-6 text-danger" /> {/* Reduced icon size */}
              </a>
              <a href="https://instagram.com/" target="_blank" rel="noreferrer">
                <FaInstagram className="fs-6 text-danger" /> {/* Reduced icon size */}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Line */}
        <hr className="border-secondary my-3" /> {/* Reduced vertical margin */}
        <div className="text-center small text"> {/* Added "small" class */}
          &copy; {new Date().getFullYear()} Ajali! All rights reserved. Built for the safety of Kenyan communities.
        </div>
      </div>
    </footer>
  );
};

export default Footer;