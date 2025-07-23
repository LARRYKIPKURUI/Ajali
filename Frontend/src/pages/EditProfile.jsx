import React from 'react';
import './EditProfile.css';

const EditProfile = ({ isOpen, onClose, user, onSave }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Profile</h2>
        <form onSubmit={onSave}>
          <input
            type="text"
            name="phone_number"
            defaultValue={user.phone_number}
            placeholder="Phone Number"
          />
          <input
            type="text"
            name="emergency_contact_name"
            defaultValue={user.emergency_contact_name}
            placeholder="Emergency Contact Name"
          />
          <input
            type="text"
            name="emergency_contact_phone"
            defaultValue={user.emergency_contact_phone}
            placeholder="Emergency Contact Phone"
          />
          <div className="modal-buttons">
            <button type="submit">Save</button>
            <button type="button" onClick={onClose} className="cancel-btn">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
