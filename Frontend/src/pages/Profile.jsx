import React from 'react';
import './Profile.css';

const Profile = () => {
  // Dummy user data 
  const user = {
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    phone: '+254 712 345678',
    location: 'Nairobi, Kenya',
  };

  return (
    <section className="profile-section">
      <div className="profile-container">
        <h2>My Profile</h2>
        <div className="profile-card">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>Location:</strong> {user.location}</p>
        </div>
        <div className="profile-actions">
          <button className="profile-btn">Edit Profile</button>
          <button className="profile-btn logout">Log Out</button>
        </div>
      </div>
    </section>
  );
};

export default Profile;