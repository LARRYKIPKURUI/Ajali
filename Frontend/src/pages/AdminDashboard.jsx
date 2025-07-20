// src/pages/AdminDashboard.jsx
import React, { useState } from 'react';
import './AdminDashboard.css';
import { Navigate } from 'react-router-dom';
import { isLoggedIn, isAdmin} from '../utils/auth'

const initialReports = [
  {
    id: 1,
    type: 'Fire',
    location: 'Nairobi CBD',
    reporter: 'James James',
    date: '2025-07-17',
    status: 'Pending'
  },
  {
    id: 2,
    type: 'Accident',
    location: 'Thika Road',
    reporter: 'Hibby kuresh',
    date: '2025-07-16',
    status: 'Resolved'
  },
  {
    id: 3,
    type: 'Security Threat',
    location: 'Westlands',
    reporter: 'Nasra Gurxaan',
    date: '2025-07-15',
    status: 'In Progress'
  },
];

const AdminDashboard = () => {
    const [reports, setReports] = useState(initialReports);
    const [filter, setFilter] = useState("All");
    const [editReport, setEditReport] = useState (null);

    const handleDelete = (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this report!");
        if (confirmDelete) {
            setReports(reports.filter((report) => report.id !== id));

        }
    };


    const handleEdit = (report) => {
        setEditReport(report);
    };

    const handleSave = () => {
    setReports((prev) =>
      prev.map((r) => (r.id === editReport.id ? editReport : r))
    );
    setEditReport(null);
  };


    const filteredReports = 
    filter === "All"
    ? reports: reports.filter((report) => report.status === filter);

  return (
    <div className="admin-dashboard">
     <label htmlFor="status-filter">Filter by Status:</label>
        <select
          id="status-filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Resolved">Resolved</option>
          <option value="In Progress">In Progress</option>
        </select>

      <table className="report-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Type</th>
            <th>Location</th>
            <th>Reporter</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredReports.length > 0 ? (
            filteredReports.map((report) => (
              <tr key={report.id}>
                <td>{report.id}</td>
                <td>{report.type}</td>
                <td>{report.location}</td>
                <td>{report.reporter}</td>
                <td>{report.date}</td>
                <td>
                  <span className={`status ${report.status.toLowerCase().replace(" ", "-")}`}>
                    {report.status}
                  </span>
                </td>
                <td className="action-buttons">
                  <button onClick={() => handleEdit(report)} className="edit-btn">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(report.id)} className="delete-btn">
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No reports match the selected status.</td>
            </tr>
          )}
        </tbody>
      </table>

    {editReport && (
        <div className="modal-backdrop">
          <div className="modal">
            <h3>Edit Report #{editReport.id}</h3>
            <label>Type:</label>
            <input
              type="text"
              value={editReport.type}
              onChange={(e) => setEditReport({ ...editReport, type: e.target.value })}
            />
            <label>Location:</label>
            <input
              type="text"
              value={editReport.location}
              onChange={(e) => setEditReport({ ...editReport, location: e.target.value })}
            />
            <label>Status:</label>
            <select
              value={editReport.status}
              onChange={(e) => setEditReport({ ...editReport, status: e.target.value })}
            >
              <option value="Pending">Pending</option>
              <option value="Resolved">Resolved</option>
              <option value="In Progress">In Progress</option>
            </select>
            <div className="modal-buttons">
              <button onClick={handleSave} className="save-btn">Save</button>
              <button onClick={() => setEditReport(null)} className="cancel-btn">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;