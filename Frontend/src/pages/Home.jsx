import heroImage from "../assets/alerticon.png";
import { useNavigate } from "react-router-dom";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase";

const Home = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const token = await user.getIdToken();

      localStorage.setItem("token", token);
      localStorage.setItem("userName", user.displayName);

      navigate("/report");
    } catch (error) {
      console.error("Google Sign-In Error:", error);
    }
  };

  const handleEmergencyCall = () => {
    window.location.href = "tel:999";
  };

  return (
    <div style={{ backgroundColor: "#ffeaea" }}>
      <section className="d-flex align-items-center justify-content-center py-5 text-center">
        <div className="px-3">
          {/* Alert Icon */}
          <img
            src={heroImage}
            alt="Alert Icon"
            className="mb-4"
            style={{ width: "80px", height: "80px" }}
          />

          {/* Title */}
          <h1 className="fw-bold text-danger" style={{ fontSize: "3rem" }}>
            Ajali!
          </h1>

          {/* Subtitle */}
          <h5
            className="fw-bolder text-dark mb-3"
            style={{ fontSize: "1.25rem" }}
          >
            Every Second Counts
          </h5>

          {/* Paragraph */}
          <p
            className="text-semibold fs-6 mb-4 mx-auto"
            style={{ maxWidth: "500px" }}
          >
            Report accidents and emergencies instantly. Help save lives in your
            community with real-time incident reporting and emergency response
            coordination.
          </p>

          {/* Buttons */}
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <button
              className="btn btn-danger px-4 py-2 fw-semibold rounded-pill"
              onClick={handleGoogleLogin}
            >
              Report Incident
            </button>

            <button
              className="btn text-danger bg-white px-4 py-2 fw-bold rounded-pill"
              onClick={handleEmergencyCall}
            >
              Emergency Call
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
