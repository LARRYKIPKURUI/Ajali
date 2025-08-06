import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/alerticon.png";
import { jwtDecode } from "jwt-decode";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase";
import { showSuccess, showError } from "../utils/alerts";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone_number: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const toggleShowPassword = () => setShowPassword(!showPassword);
  const toggleShowConfirm = () => setShowConfirm(!showConfirm);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGoogleSignup = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const token = await user.getIdToken();

      localStorage.setItem("token", token);
      localStorage.setItem("userName", user.displayName);

      showSuccess("Signup Successful!", "Redirecting to report...");
      navigate("/report");
    } catch (error) {
      console.error("Google Sign-Up Error:", error);
      showError("Google Sign-Up Failed", error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      showError("Password Mismatch", "Passwords must match.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          phone_number: formData.phone_number,
          password: formData.password,
        }),
      });

      if (response.ok) {
        showSuccess("Signup Successful!", "Logging you in...");

        const loginResponse = await fetch(
          "http://localhost:5000/api/auth/login",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: formData.email,
              password: formData.password,
            }),
          }
        );

        if (loginResponse.ok) {
          const loginData = await loginResponse.json();
          const token = loginData.access_token;

          localStorage.setItem("token", token);
          const decoded = jwtDecode(token);
          localStorage.setItem("isAdmin", decoded.is_admin);

          navigate(decoded.is_admin ? "/admin" : "/profile");
        } else {
          showError(
            "Login Failed",
            "Signup worked but login failed. Please log in manually."
          );
          navigate("/login");
        }
      } else {
        const error = await response.json();
        showError("Signup Failed", error.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Signup error:", error);
      showError("Server Error", "Please try again later");
    }
  };

  return (
    <div className="signup-container d-flex justify-content-center align-items-center min-vh-100">
      <form
        className="signup-form p-4 shadow rounded w-100"
        style={{ maxWidth: "400px" }}
        onSubmit={handleSubmit}
      >
        <div className="signup-logo text-center mb-4">
          <img src={logo} alt="Ajali logo" width={40} className="mb-2" />
          <h2 className="text-danger">Create Account</h2>
        </div>

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
          className="form-control mb-3"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="form-control mb-3"
        />
        <input
          type="tel"
          name="phone_number"
          placeholder="Phone Number"
          value={formData.phone_number}
          onChange={handleChange}
          required
          className="form-control mb-3"
        />

        <div className="mb-3 position-relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="form-control pr-5"
          />
          <span
            onClick={toggleShowPassword}
            className="position-absolute top-50 end-0 translate-middle-y pe-3 text-muted"
            style={{ cursor: "pointer" }}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <div className="mb-3 position-relative">
          <input
            type={showConfirm ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="form-control pr-5"
          />
          <span
            onClick={toggleShowConfirm}
            className="position-absolute top-50 end-0 translate-middle-y pe-3 text-muted"
            style={{ cursor: "pointer" }}
          >
            {showConfirm ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <button type="submit" className="btn btn-danger w-100 mb-3">
          Sign Up
        </button>

        <button
          type="button"
          className="btn btn-light border d-flex align-items-center justify-content-center gap-2 w-100 google-signup mb-2"
          onClick={handleGoogleSignup}
        >
          <FaGoogle className="google-icon" />
          Sign up with Google
        </button>

        <p className="switch-link text-center mt-3">
          Already have an account?{" "}
          <Link to="/login" className="text-danger">
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
