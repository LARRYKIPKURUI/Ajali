import React, { useState, useEffect } from "react";
import { auth } from "../firebase";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const firebaseUser = auth.currentUser;

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await fetch("http://localhost:5000/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setUserData(data);
        }
      } catch (err) {
        console.error("Error fetching profile data:", err);
      }
    };

    fetchUserDetails();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const updatedInfo = {
      phone_number: e.target.phone_number.value,
      emergency_contact_name: e.target.emergency_contact_name.value,
      emergency_contact_phone: e.target.emergency_contact_phone.value,
    };

    try {
      const res = await fetch("http://localhost:5000/api/users/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedInfo),
      });

      if (res.ok) {
        const updated = await res.json();
        setUserData(updated.user);
        setShowModal(false);
      }
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  if (!firebaseUser || !userData)
    return <p className="text-center mt-5">Loading...</p>;

  return (
    <section className="py-5 bg-light min-vh-100">
      <div className="container">
        <div className="card shadow-lg mx-auto" style={{ maxWidth: "600px" }}>
          <div className="card-body">
            <h2 className="text-center text-danger mb-4">My Profile</h2>
            <p>
              <strong>Name:</strong> {firebaseUser.displayName}
            </p>
            <p>
              <strong>Email:</strong> {firebaseUser.email}
            </p>
            <p>
              <strong>Phone:</strong> {userData.phone_number}
            </p>
            <p>
              <strong>Emergency Contact:</strong>{" "}
              {userData.emergency_contact_name} -{" "}
              {userData.emergency_contact_phone}
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
                      defaultValue={userData.phone_number}
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
                      defaultValue={userData.emergency_contact_name}
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
                      defaultValue={userData.emergency_contact_phone}
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
