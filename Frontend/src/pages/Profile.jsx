import React, { useState, useEffect } from 'react';
import './Profile.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await fetch('http://localhost:5000/api/users/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data);
        }
      } catch (err) {
        console.error('Error fetching user:', err);
      }
    };

    fetchUser();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const updatedData = {
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
        body: JSON.stringify(updatedData)
      });

      if (res.ok) {
        const updated = await res.json();
        setUser(updated.user);
        setShowModal(false);
      }
    } catch (err) {
      console.error('Error updating profile:', err);
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <section className="profile-section">
      <div className="profile-container">
        <h2>My Profile</h2>
        <div className="profile-card">
          <p><strong>Name:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone_number}</p>
          <p><strong>Emergency Contact:</strong> {user.emergency_contact_name} - {user.emergency_contact_phone}</p>
        </div>
        <div className="profile-actions">
          <button className="profile-btn" onClick={() => setShowModal(true)}>Edit Profile</button>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3>Edit Profile</h3>
              <form onSubmit={handleSave}>
                <input type="tel" name="phone_number" placeholder="Phone Number" defaultValue={user.phone_number} />
                <input type="text" name="emergency_contact_name" placeholder="Emergency Contact Name" defaultValue={user.emergency_contact_name} />
                <input type="tel" name="emergency_contact_phone" placeholder="Emergency Contact Phone" defaultValue={user.emergency_contact_phone} />
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
