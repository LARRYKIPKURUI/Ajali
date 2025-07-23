import React, { useState } from 'react';
import './Report.css';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix leaflet icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
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
    category: '',
    title: '',
    description: '',
    media: null,
    is_critical: false,
  });

  const [markerPos, setMarkerPos] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, files, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
    } else if (name === 'media') {
      setFormData({ ...formData, media: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      alert('You must be logged in to report an incident.');
      return;
    }

    if (!markerPos) {
      alert('Please select a location on the map.');
      return;
    }

    const form = new FormData();
    form.append('type', formData.category);
    form.append('title', formData.title || 'Untitled Incident'); // required
    form.append('description', formData.description);
    form.append('latitude', markerPos.lat);
    form.append('longitude', markerPos.lng);
    form.append('is_critical', formData.is_critical.toString());

    if (formData.media) {
      form.append('file', formData.media); // required by backend
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:5000/api/incidents', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: form,
      });

      if (response.ok) {
        const data = await response.json();
        alert('Incident reported successfully!');
        console.log(data);
        setFormData({
          category: '',
          title: '',
          description: '',
          media: null,
          is_critical: false,
        });
        setMarkerPos(null);
      } else {
        const error = await response.json();
        alert(`Error: ${error.error || 'Something went wrong.'}`);
      }
    } catch (err) {
      console.error('Submission error:', err);
      alert('Server error. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="report-section">
      <div className="report-container">
        <h2>Report an Incident</h2>
        <form className="report-form" onSubmit={handleSubmit}>
          <label>Category</label>
          <select name="category" value={formData.category} onChange={handleChange} required>
            <option value="">-- Select --</option>
            <option value="accident">Accident</option>
            <option value="fire">Fire</option>
            <option value="medical">Medical Emergency</option>
            <option value="security">Security Threat</option>
          </select>

          <label>Title</label>
          <input
            type="text"
            name="title"
            placeholder="Short title for the incident"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <label>Description</label>
          <textarea
            name="description"
            rows="4"
            placeholder="Describe what happened..."
            value={formData.description}
            onChange={handleChange}
            required
          />

          <label>Mark as Urgent/Critical</label>
          <input type="checkbox" name="is_critical" checked={formData.is_critical} onChange={handleChange} />

          <label>Location</label>
          <MapContainer center={[-1.286389, 36.817223]} zoom={13} style={{ height: '300px', marginBottom: '1rem' }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <LocationPicker onLocationSelect={setMarkerPos} />
            {markerPos && <Marker position={markerPos} />}
          </MapContainer>

          <label>Upload Media (optional)</label>
          <input type="file" name="media" accept="image/*,video/*" onChange={handleChange} />

          <button type="submit" className="report-btn" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit Report'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Report;
