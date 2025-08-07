import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/alerticon.png";
import { jwtDecode } from "jwt-decode";
import { showSuccess, showError } from "../utils/alerts"; 

// The component now accepts setIsLoggedIn as a prop
const Login = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.access_token;

        localStorage.setItem("token", token);
        
        // This is the key change: update the isLoggedIn state in the parent component
        if (setIsLoggedIn) {
          setIsLoggedIn(true);
        }

        const decoded = jwtDecode(token);
        const isAdmin = decoded.is_admin;

        localStorage.setItem("isAdmin", isAdmin);

        
        showSuccess("Login successful!", "You have been logged in.");
        navigate(isAdmin ? "/admin" : "/profile");
      } else {
        const error = await response.json();
        
        showError("Login failed", error.error || "Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      
      showError("Server error", "Please try again later.");
    }
  };

  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center bg-white px-3">
      <form
        className="bg-white shadow p-4 rounded-4 w-100"
        style={{ maxWidth: "400px" }}
        onSubmit={handleSubmit}
      >
        {/* Logo and Heading */}
        <div className="text-center mb-4">
          <img src={logo} alt="Ajali logo" width={50} className="mb-2" />
          <h2 className="text-danger fw-semibold m-0">Welcome Back</h2>
        </div>

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="form-control mb-3"
          value={formData.email}
          onChange={handleChange}
          required
        />

        {/* Password */}
        <div className="position-relative mb-3">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            className="form-control pe-5"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: "absolute",
              top: "50%",
              right: "10px",
              transform: "translateY(-50%)",
              cursor: "pointer",
              fontSize: "1.1rem",
            }}
          >
            {showPassword ? "🙈" : "👁"}
          </span>
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-danger w-100 fw-semibold">
          Log In
        </button>

        {/* Link to Signup */}
        <p className="mt-3 text-center small">
          Don't have an account?{" "}
          <Link to="/signup" className="text-danger text-decoration-none">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
