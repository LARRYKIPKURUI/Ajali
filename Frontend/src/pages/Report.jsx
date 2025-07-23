import React, { useState } from 'react';
import './Report.css';

const Report = () => {
  const [formData, setFormData] = useState({
    category: '',
    description: '',
    location: '',
    media: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'media') {
      setFormData({ ...formData, media: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Placeholder – will connect to backend later
  };
  const [markerPos, setMarkerPos] = useState(null);

  return (
    <section className="report-section">
      <div className="report-container">
        <h2>Report an Incident</h2>
        <form className="report-form" onSubmit={handleSubmit}>
          <label htmlFor="category">Incident Category</label>
          <select name="category" value={formData.category} onChange={handleChange} required>
            <option value="">Select a category</option>
            <option value="accident">Accident</option>
            <option value="fire">Fire</option>
            <option value="medical">Medical Emergency</option>
            <option value="security">Security Threat</option>
          </select>

          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            rows="4"
            placeholder="Describe what happened..."
            value={formData.description}
            onChange={handleChange}
            required
          />

          <label htmlFor="location">Location</label>
          <input
            type="text"
            name="location"
            placeholder="e.g. Moi Avenue, Nairobi"
            value={formData.location}
            onChange={handleChange}
            required
          />

          <label htmlFor="media">Upload Image/Video (optional)</label>
          <input
            type="file"
            name="media"
            accept="image/,video/"
            onChange={handleChange}
          />

          <button type="submit" className="report-btn">Submit Report</button>
        </form>
      </div>
    </section>
  );
};

export default Report;