import React, { useState, useEffect } from 'react';
import './Profile.css';
import { auth } from '../firebase';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const firebaseUser = auth.currentUser;

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await fetch('http://localhost:5000/api/users/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setUserData(data);
        }
      } catch (err) {
        console.error('Error fetching profile data:', err);
      }
    };

    fetchUserDetails();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const updatedInfo = {
      phone_number: e.target.phone_number.value,
      emergency_contact_name: e.target.emergency_contact_name.value,
      emergency_contact_phone: e.target.emergency_contact_phone.value
    };

    try {
      const res = await fetch('http://localhost:5000/api/users/profile', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(updatedInfo)
      });

      if (res.ok) {
        const updated = await res.json();
        setUserData(updated.user);
        setShowModal(false);
      }
    } catch (err) {
      console.error('Error updating profile:', err);
    }
  };

  if (!firebaseUser || !userData) return <p>Loading...</p>;

  return (
    <section className="profile-section">
      <div className="profile-container">
        <h2>My Profile</h2>
        <div className="profile-card">
          <p><strong>Name:</strong> {firebaseUser.displayName}</p>
          <p><strong>Email:</strong> {firebaseUser.email}</p>
          <p><strong>Phone:</strong> {userData.phone_number}</p>
          <p><strong>Emergency Contact:</strong> {userData.emergency_contact_name} - {userData.emergency_contact_phone}</p>
        </div>

        <div className="profile-actions">
          <button className="profile-btn" onClick={() => setShowModal(true)}>Edit Profile</button>
        </div>

        {showModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3>Edit Profile</h3>
              <form onSubmit={handleSave}>
                <input type="tel" name="phone_number" placeholder="Phone Number" defaultValue={userData.phone_number} />
                <input type="text" name="emergency_contact_name" placeholder="Emergency Contact Name" defaultValue={userData.emergency_contact_name} />
                <input type="tel" name="emergency_contact_phone" placeholder="Emergency Contact Phone" defaultValue={userData.emergency_contact_phone} />
                <div className="modal-buttons">
                  <button type="submit">Save</button>
                  <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Profile;