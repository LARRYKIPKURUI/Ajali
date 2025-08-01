import React from 'react';
import './Home.css';
import heroImage from '../assets/alerticon.png'; 
import { useNavigate } from 'react-router-dom';
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from '../firebase'; 
import About from './About';

const Home = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const token = await user.getIdToken();

      localStorage.setItem('token', token);
      localStorage.setItem('userName', user.displayName);

      navigate('/report');
    } catch (error) {
      console.error("Google Sign-In Error:", error);
    }
  };

  return (
    <>
      <section className="home-section">
        <div className="home-container">
          <div className="home-text">
            <h1>Report Emergencies Fast with <span>Ajali!</span></h1>
            <p>Be the hero in your community. Report accidents, fires, and security threats in real-time and help save lives.</p>
            <button className="report-btn" onClick={handleGoogleLogin}>
              Report Incident
            </button>
          </div>
          <div className="home-image">
            <img src={heroImage} alt="Emergency illustration" />
          </div>
        </div>
      </section>
      <About />
    </>
  );
};

export default Home;