import heroImage from "../assets/alerticon.png";
import { useNavigate } from "react-router-dom";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase";
import About from "./About";

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

  return (
    <>
      <section className="bg-light py-5 min-vh-100 d-flex align-items-center">
        <div className="container">
          <div className="row align-items-center">
            {/* Text Column */}
            <div className="col-md-6 mb-4 mb-md-0 text-center text-md-start">
              <h1 className="display-5 fw-bold text-danger">
                Report Emergencies Fast with{" "}
                <span className="text-dark">Ajali!</span>
              </h1>
              <p className="lead text-muted my-3">
                Be the hero in your community. Report accidents, fires, and
                security threats in real-time and help save lives.
              </p>
              <button
                className="btn btn-danger btn-lg fw-semibold px-4 py-2 mt-2"
                onClick={handleGoogleLogin}
              >
                Report Incident
              </button>
            </div>

            {/* Image Column */}
            <div className="col-md-6 text-center">
              <img
                src={heroImage}
                alt="Emergency illustration"
                className="img-fluid rounded-4"
                style={{ maxWidth: "240px" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <About />
    </>
  );
};

export default Home;
