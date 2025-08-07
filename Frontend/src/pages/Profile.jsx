import { useState, useEffect } from "react";
import { showSuccess, showError } from "../utils/alerts";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editFormData, setEditFormData] = useState({});

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await fetch("http://localhost:5000/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok) {
          const data = await res.json();
          setUserData(data);
          // Initialize modal form data with fetched user data
          setEditFormData(data);
        } else {
          console.error("Failed to fetch profile data:", res.statusText);
          showError("Profile Error", "Failed to load user profile. Please try again.");
        }
      } catch (err) {
        console.error("Error fetching profile data:", err);
        showError("Network Error", "Could not connect to the server.");
      }
    };

    fetchUserDetails();
  }, []);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch("http://localhost:5000/api/users/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editFormData),
      });

      if (res.ok) {
        const updated = await res.json();
        setUserData(updated.user); // Update the main profile view with the 'user' object from the backend
        setShowModal(false);
        showSuccess("Success!", "Profile updated successfully.");
      } else {
        const error = await res.json();
        console.error("Failed to update profile:", error.error);
        showError("Update Failed", error.error || "Could not save changes.");
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      showError("Network Error", "Failed to connect to the server for update.");
    }
  };
  
  if (!userData) {
    return <p className="text-center mt-5">Loading...</p>;
  }

  return (
    <section className="py-5 bg-light min-vh-100">
      <div className="container">
        <div className="card shadow-lg mx-auto" style={{ maxWidth: "600px" }}>
          <div className="card-body">
            <h2 className="text-center text-danger mb-4">My Profile</h2>
            {/* Displaying username from the backend response */}
            <p>
              <strong>Username:</strong> {userData.username}
            </p>
            <p> 
              <strong>Email:</strong> {userData.email}
            </p>
            <p>
              <strong>Phone:</strong> {userData.phone_number}
            </p>
            <p>
              <strong>Emergency Contact Name:</strong> {userData.emergency_contact_name} 
            </p>
            <p>
              <strong>Emergency Contact Phone:</strong> {userData.emergency_contact_phone}
            </p>
            <div className="d-flex justify-content-end mt-4">
              <button
                className="btn btn-primary"
                onClick={() => setShowModal(true)}
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          role="dialog"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <form onSubmit={handleSave}>
                <div className="modal-header">
                  <h5 className="modal-title">Edit Profile</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label htmlFor="phone_number" className="form-label">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone_number"
                      value={editFormData.phone_number || ''}
                      onChange={handleEditChange}
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="emergency_contact_name"
                      className="form-label"
                    >
                      Emergency Contact Name
                    </label>
                    <input
                      type="text"
                      name="emergency_contact_name"
                      value={editFormData.emergency_contact_name || ''}
                      onChange={handleEditChange}
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="emergency_contact_phone"
                      className="form-label"
                    >
                      Emergency Contact Phone
                    </label>
                    <input
                      type="tel"
                      name="emergency_contact_phone"
                      value={editFormData.emergency_contact_phone || ''}
                      onChange={handleEditChange}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="submit" className="btn btn-success">
                    Save
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Profile;
