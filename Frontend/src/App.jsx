import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar'
import Home from './pages/Home';
import Report from './pages/Report';
import Map from './pages/Map';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Footer from './components/Footer'
import AdminDashboard from './pages/AdminDashboard';


 const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/report" element={<Report />} />
        <Route path="/map" element={<Map />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<AdminDashboard />} />

      </Routes>

        <Footer />

    </Router>
  );
};

export default App;
