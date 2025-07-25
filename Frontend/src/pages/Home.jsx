import React from 'react';
import './Home.css';
import heroImage from '../assets/alerticon.png'; 
import { useNavigate } from 'react-router-dom';
import About from './About';

const Home = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    /* global google */
    google.accounts.id.initialize({
      client_id: "horizontal-oath-467019-h4",
      callback: (response) => {
        const credential = response.credential;

        // Optional: Send token to backend for verification
        localStorage.setItem('google_token', credential);
        navigate('/report');
      },
    });

    google.accounts.id.prompt(); // triggers the popup
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