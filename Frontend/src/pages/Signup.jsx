import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Signup.css';
import logo from '../assets/alerticon.png';

const Signup = () => {
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
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST' ,
        headers: {
          'Content-Type': 'application/json',
        },
        body:JSON.stringify({
          username:formData.username,
          email:formData.email,
          phone_number:formData.phone_number,
          password:formData.password,
        }),
      });

      if (response.ok) {
        const data= await response.json();
        alert('signup successfull!');
        console.log('Reponse:', data);
      } else {
        const error = await response.json();
        alert(`Signup failed: ${error.message || 'Something went wrong'}`);
      }
    }catch (error) {
      console.error('Signup error:', error);
      alert('Server error. Please try again later');
    };
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