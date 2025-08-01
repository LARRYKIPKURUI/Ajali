import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import logo from '../assets/alerticon.png';
import { jwtDecode } from 'jwt-decode';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.access_token;

        localStorage.setItem('token', token);
        const decoded = jwtDecode(token);
        const isAdmin = decoded.is_admin;

        localStorage.setItem('isAdmin', isAdmin);

        alert('Login successful!');
        navigate(isAdmin ? '/admin' : '/profile');
      } else {
        const error = await response.json();
        alert(`Login failed: ${error.error || 'Please try again.'}`);
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Server error. Please try again later.');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="login-logo">
          <img src={logo} alt="Ajali logo" />
          <h2>Welcome Back</h2>
        </div>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <div className="password-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <span onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? '🙈' : '👁'}
          </span>
        </div>

        <button type="submit">Log In</button>

        <p className="switch-link">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;