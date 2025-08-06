import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { showSuccess, showError, showWarning } from "../utils/alerts";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const LocationPicker = ({ onLocationSelect }) => {
  useMapEvents({
    click(e) {
      onLocationSelect(e.latlng);
    },
  });
  return null;
};

const Report = () => {
  const [formData, setFormData] = useState({
    category: "",
    title: "",
    description: "",
    media: null,
    is_critical: false,
  });

  const [markerPos, setMarkerPos] = useState(null);
  const [mapCenter, setMapCenter] = useState([-1.286389, 36.817223]); // Default to Nairobi
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const userLatLng = { lat: latitude, lng: longitude };
          setMarkerPos(userLatLng);
          setMapCenter([latitude, longitude]);
        },
        (error) => console.error("Geolocation error:", error)
      );
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, files, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else if (name === "media") {
      setFormData({ ...formData, media: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      showWarning(
        "Authentication Required",
        "You must be logged in to report an incident."
      );
      return;
    }

    if (!markerPos) {
      showWarning("Location Missing", "Please select a location on the map.");
      return;
    }

    const form = new FormData();
    form.append("type", formData.category);
    form.append("title", formData.title || "Untitled Incident");
    form.append("description", formData.description);
    form.append("latitude", markerPos.lat);
    form.append("longitude", markerPos.lng);
    form.append("is_critical", formData.is_critical.toString());

    if (formData.media) {
      form.append("file", formData.media);
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("http://localhost:5000/api/incidents", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: form,
      });

      if (res.ok) {
        const data = await res.json();
        showSuccess("Success", "Incident reported successfully!");
        console.log(data);
        setFormData({
          category: "",
          title: "",
          description: "",
          media: null,
          is_critical: false,
        });
        setMarkerPos(null);
      } else {
        const error = await res.json();
        showError("Submission Failed", error.error || "Something went wrong.");
      }
    } catch (err) {
      console.error("Submission error:", err);
      showError("Server Error", "Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="container py-5">
      <div className="card shadow p-4 mx-auto" style={{ maxWidth: "1000px" }}>
        <h2 className="text-center text-danger fw-semibold mb-4">Report an Incident</h2>
        <form onSubmit={handleSubmit}>
          <div className="row g-4">
            {/* Left Column */}
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label">Category</label>
                <select
                  name="category"
                  className="form-select"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">-- Select --</option>
                  <option value="accident">Accident</option>
                  <option value="fire">Fire</option>
                  <option value="medical">Medical Emergency</option>
                  <option value="security">Security Threat</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Title</label>
                <input
                  type="text"
                  name="title"
                  className="form-control"
                  placeholder="Short title for the incident"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Upload Media</label>
                <input
                  type="file"
                  name="media"
                  className="form-control"
                  accept="image/*,video/*"
                  onChange={handleChange}
                />
              </div>

              <div className="form-check mb-3">
                <input
                  type="checkbox"
                  name="is_critical"
                  className="form-check-input"
                  checked={formData.is_critical}
                  onChange={handleChange}
                  id="criticalCheck"
                />
                <label className="form-check-label" htmlFor="criticalCheck">
                  Mark as Urgent/Critical
                </label>
              </div>
            </div>

            {/* Right Column */}
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  name="description"
                  rows="6"
                  className="form-control"
                  placeholder="Describe what happened..."
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Map Full Width */}
            <div className="col-12">
              <label className="form-label">Location</label>
              <MapContainer
                center={mapCenter}
                zoom={13}
                style={{ height: "300px", marginBottom: "1rem" }}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <LocationPicker onLocationSelect={setMarkerPos} />
                {markerPos && <Marker position={markerPos} />}
              </MapContainer>
              {markerPos && (
                <p className="text-muted small">
                  Selected Location: <strong>Lat:</strong>{" "}
                  {markerPos.lat.toFixed(5)}, <strong>Lng:</strong>{" "}
                  {markerPos.lng.toFixed(5)}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="col-12">
              <button
                type="submit"
                className="btn btn-danger text-center fw-bolder w-100 fs-5"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Report"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Report;
