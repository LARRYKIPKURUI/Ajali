import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faBookOpen,
  faShieldAlt,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";

const About = () => {
  return (
    <section className="py-5 bg-light" id="about-section">
      <div className="container">
        <div className="row g-4 align-items-start">
          {/* Bullet Points */}
          <div className="col-md-6 d-flex flex-column gap-4">
            <div className="d-flex flex-column">
              <FontAwesomeIcon
                icon={faUsers}
                className="text-danger fs-2 mb-2"
              />
              <h3 className="fs-5 fw-semibold text-dark mb-1">
                Empowering Communities
              </h3>
              <p className="text-muted small mb-0">
                We bring people together to respond and recover faster in
                emergencies.
              </p>
            </div>

            <div className="d-flex flex-column">
              <FontAwesomeIcon
                icon={faBookOpen}
                className="text-danger fs-2 mb-2"
              />
              <h3 className="fs-5 fw-semibold text-dark mb-1">
                Educating for Impact
              </h3>
              <p className="text-muted small mb-0">
                Knowledge saves lives. We train, inform and engage with clarity.
              </p>
            </div>

            <div className="d-flex flex-column">
              <FontAwesomeIcon
                icon={faShieldAlt}
                className="text-danger fs-2 mb-2"
              />
              <h3 className="fs-5 fw-semibold text-dark mb-1">
                Ensuring Safety
              </h3>
              <p className="text-muted small mb-0">
                From alerts to response, we prioritize safety and reliability.
              </p>
            </div>
          </div>

          {/* Making a Difference */}
          <div className="col-md-6">
            <h2 className="fs-4 fw-bold  mb-3">Making a Difference</h2>
            <p className="text-secondary lh-base">
              Every report matters. Every second counts. Through technology and
              community, we’re bridging gaps in emergency response and saving
              lives together. This is more than an app it’s a movement for
              impact.
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
