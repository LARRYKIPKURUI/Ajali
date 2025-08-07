import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStopwatch,
  faUsers,
  faShieldAlt,
  faHeart,
  faPhone,
  faLightbulb, 
  faHandshake, 
} from "@fortawesome/free-solid-svg-icons";

const About = () => {
  return (
    <section className="py-5 bg-white" id="about-section">
      <div className="container">
        {/* Heading and Mission */}
        <div className="text-center mb-5">
          <h2 className="fw-bold">How Ajali! Helps Save Lives</h2>
          <p className="text-muted fs-6 mx-auto" style={{ maxWidth: "600px" }}>
            Our mission is to create a safer Kenya by enabling rapid emergency
            response and community-driven incident reporting.
          </p>
        </div>

        <div className="row g-4 align-items-start">
          {/* Left Side: Feature Bullets */}
          <div className="col-md-6 d-flex flex-column gap-4">
            <div className="d-flex gap-3">
              <FontAwesomeIcon
                icon={faStopwatch}
                className="text-danger fs-3 mt-1"
              />
              <div>
                <h5 className="fw-semibold mb-1">Instant Reporting</h5>
                <p className="text-muted mb-0 small">
                  Report accidents and emergencies with just a few taps. Our
                  streamlined interface ensures help is notified immediately.
                </p>
              </div>
            </div>

            <div className="d-flex gap-3">
              <FontAwesomeIcon
                icon={faUsers}
                className="text-danger fs-3 mt-1"
              />
              <div>
                <h5 className="fw-semibold mb-1">Community Network</h5>
                <p className="text-muted mb-0 small">
                  Connect with nearby users and first responders. Build a
                  network of people who care about community safety.
                </p>
              </div>
            </div>

            <div className="d-flex gap-3">
              <FontAwesomeIcon
                icon={faShieldAlt}
                className="text-danger fs-3 mt-1"
              />
              <div>
                <h5 className="fw-semibold mb-1">Verified Information</h5>
                <p className="text-muted mb-0 small">
                  All incidents are verified and tracked to ensure accurate
                  information reaches the right authorities.
                </p>
              </div>
            </div>
          </div>

          {/* Right Side: Making a Difference */}
          <div className="col-md-6 ">
            <div
              className="bg-danger bg-opacity-10 p-4 rounded text-center h-100 d-flex flex-column justify-content-center"
            >
              <FontAwesomeIcon icon={faHeart} className="text-danger fs-2 mb-3" />
              <h5 className="fw-bold mb-2">Making a Difference</h5>
              <p className="text-muted small mb-0">
                Every report helps build a safer community. Join thousands of
                Kenyans who are already making a difference.
              </p>
            </div>
          </div>
        </div>

        {/* New Section: Our Vision */}
        <div className="row g-4 mt-5">
          <div className="col-md-6 order-md-2">
            <div className="d-flex gap-3 align-items-center">
                <FontAwesomeIcon icon={faLightbulb} className="text-danger fs-3" />
                <h3 className="fw-bold text-danger">Our Vision</h3>
            </div>
            <p className="text-muted mt-2">
              Our vision is to empower every Kenyan to be a first responder in their community. We believe that by providing a simple and effective tool for incident reporting, we can drastically reduce emergency response times and save more lives. Ajali! is more than an app; it's a movement to build a more resilient and caring society.
            </p>
          </div>
          <div className="col-md-6 order-md-1">
             <div className="d-flex gap-3 align-items-center">
                <FontAwesomeIcon icon={faHandshake} className="text-danger fs-3" />
                <h3 className="fw-bold text-danger">Community & Trust</h3>
            </div>
            <p className="text-muted mt-2">
              The power of Ajali! lies in its users. We've built a platform based on trust and a collective commitment to safety. By joining, you become part of a nationwide network. Whether you're reporting an incident or simply being aware of your surroundings, your actions contribute to a collective safety net that protects us all.
            </p>
          </div>
        </div>

        {/* Emergency Hotlines */}
        <div className="d-flex flex-wrap justify-content-center gap-4 mt-5">
          <a
            href="tel:999"
            className="btn btn-outline-danger d-flex align-items-center gap-2"
          >
            <FontAwesomeIcon icon={faPhone} className="fs-5" />
            Emergency Services (999)
          </a>

          <a
            href="tel:1199"
            className="btn btn-outline-danger d-flex align-items-center gap-2"
          >
            <FontAwesomeIcon icon={faPhone} className="fs-5" />
            Kenya Red Cross (1199)
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;
