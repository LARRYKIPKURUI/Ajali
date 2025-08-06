import React from "react";

const EditProfile = ({ isOpen, onClose, user, onSave }) => {
  if (!isOpen) return null;

  return (
    <div
      className="modal d-flex align-items-center justify-content-center show fade"
      style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.6)" }}
      tabIndex="-1"
    >
      <div className="modal-dialog">
        <div className="modal-content p-4 rounded-3">
          <h5 className="modal-title mb-3">Edit Profile</h5>
          <form onSubmit={onSave}>
            <div className="mb-3">
              <input
                type="text"
                name="phone_number"
                defaultValue={user.phone_number}
                placeholder="Phone Number"
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                name="emergency_contact_name"
                defaultValue={user.emergency_contact_name}
                placeholder="Emergency Contact Name"
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                name="emergency_contact_phone"
                defaultValue={user.emergency_contact_phone}
                placeholder="Emergency Contact Phone"
                className="form-control"
              />
            </div>
            <div className="d-flex justify-content-between mt-4">
              <button type="submit" className="btn btn-primary">
                Save
              </button>
              <button
                type="button"
                onClick={onClose}
                className="btn btn-danger"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
