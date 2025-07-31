import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Signup.css';
import logo from '../assets/alerticon.png';
import { jwtDecode } from 'jwt-decode';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebase';
import { showSuccess, showError } from '../utils/alerts';
import { FaEye, FaEyeSlash, FaGoogle } from 'react-icons/fa';

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone_number: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const toggleShowPassword = () => setShowPassword(!showPassword);
  const toggleShowConfirm = () => setShowConfirm(!showConfirm);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGoogleSignup = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const token = await user.getIdToken();

      localStorage.setItem('token', token);
      localStorage.setItem('userName', user.displayName);

      showSuccess('Signup Successful!', 'Redirecting to report...');
      navigate('/report');
    } catch (error) {
      console.error('Google Sign-Up Error:', error);
      showError('Google Sign-Up Failed', error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      showError('Password Mismatch', 'Passwords must match.');
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
        showSuccess('Signup Successful!', 'Logging you in...');

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

          localStorage.setItem('token', token);
          const decoded = jwtDecode(token);
          localStorage.setItem('isAdmin', decoded.is_admin);

          navigate(decoded.is_admin ? '/admin' : '/profile');
        } else {
          showError('Login Failed', 'Signup worked but login failed. Please log in manually.');
          navigate('/login');
        }
      } else {
        const error = await response.json();
        showError('Signup Failed', error.message || 'Something went wrong');
      }
    } catch (error) {
      console.error('Signup error:', error);
      showError('Server Error', 'Please try again later');
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="signup-logo">
          <img src={logo} alt="Ajali logo" />
          <h2>Create Account</h2>
        </div>

        <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="tel" name="phone_number" placeholder="Phone Number" value={formData.phone_number} onChange={handleChange} required />

        <div className="password-field">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <span onClick={toggleShowPassword} className="toggle-eye">
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <div className="password-field">
          <input
            type={showConfirm ? 'text' : 'password'}
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <span onClick={toggleShowConfirm} className="toggle-eye">
            {showConfirm ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <button type="submit">Sign Up</button>

        <button type="button" className="google-signup" onClick={handleGoogleSignup}>
          <FaGoogle className="google-icon" />
          Sign up with Google
        </button>

        <p className="switch-link">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;