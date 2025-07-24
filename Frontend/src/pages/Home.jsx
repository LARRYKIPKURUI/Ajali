import React from 'react';
import './Home.css';
import heroImage from '../assets/alerticon.png'; 
import { Link } from 'react-router-dom';
import About from './About';

const Home = () => {
  return (
    <>
    <section className="home-section">
      <div className="home-container">
        <div className="home-text">
          <h1>Report Emergencies Fast with <span>Ajali!</span></h1>
          <p>Be the hero in your community. Report accidents, fires, and security threats in real-time and help save lives.</p>
          <Link to="/report" className="report-btn">Report Incident</Link>
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