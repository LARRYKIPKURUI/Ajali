import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Signup.css';
import logo from '../assets/alerticon.png';
import { jwtDecode } from 'jwt-decode';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone_number: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          phone_number: formData.phone_number,
          password: formData.password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        alert('Signup successful! Logging you in...');

        // Login immediately after signup
        const loginResponse = await fetch('http://localhost:5000/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        });

        if (loginResponse.ok) {
          const loginData = await loginResponse.json();
          const token = loginData.access_token;

          // Save token
          localStorage.setItem('token', token);

          // Decode token to check role
          const decoded = jwtDecode(token);
          const isAdmin = decoded.is_admin;

          localStorage.setItem('isAdmin', isAdmin);

          // Redirect to profile or admin dashboard
          navigate(isAdmin ? '/admin' : '/profile');
        } else {
          alert('Signup succeeded but login failed. Please log in manually.');
          navigate('/login');
        }

      } else {
        const error = await response.json();
        alert(`Signup failed: ${error.message || 'Something went wrong'}`);
      }
    } catch (error) {
      console.error('Signup error:', error);
      alert('Server error. Please try again later');
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="signup-logo">
          <img src={logo} alt="Ajali logo" />
          <h2>Create Account</h2>
        </div>

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="tel"
          name="phone_number"
          placeholder="Phone Number"
          value={formData.phone_number}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />

        <button type="submit">Sign Up</button>

        <p className="switch-link">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
