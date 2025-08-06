import  { useState } from 'react';
// import { Navigate } from 'react-router-dom';
// import { isLoggedIn, isAdmin } from '../utils/auth';

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
  const [editReport, setEditReport] = useState(null);

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
      ? reports
      : reports.filter((report) => report.status === filter);

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Pending':
        return 'badge bg-warning text-dark';
      case 'Resolved':
        return 'badge bg-success';
      case 'In Progress':
        return 'badge bg-info text-dark';
      default:
        return 'badge bg-secondary';
    }
  };

  return (
    <div className="container py-4">
      <h2 className="text-center text-danger mb-4">Admin Dashboard</h2>

      <div className="mb-3 d-flex align-items-center gap-2">
        <label htmlFor="status-filter" className="form-label m-0">Filter by Status:</label>
        <select
          id="status-filter"
          className="form-select w-auto"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Resolved">Resolved</option>
          <option value="In Progress">In Progress</option>
        </select>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-hover shadow-sm">
          <thead className="table-danger">
            <tr>
              <th>ID</th>
              <th>Type</th>
              <th>Location</th>
              <th>Reporter</th>
              <th>Date</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
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
                    <span className={getStatusBadgeClass(report.status)}>
                      {report.status}
                    </span>
                  </td>
                  <td className="text-center">
                    <button
                      onClick={() => handleEdit(report)}
                      className="btn btn-sm btn-primary me-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(report.id)}
                      className="btn btn-sm btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center text-muted">
                  No reports match the selected status.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editReport && (
        <div className="modal d-block" tabIndex="-1" role="dialog" style={{ background: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Report #{editReport.id}</h5>
                <button type="button" className="btn-close" onClick={() => setEditReport(null)}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Type:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={editReport.type}
                    onChange={(e) =>
                      setEditReport({ ...editReport, type: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Location:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={editReport.location}
                    onChange={(e) =>
                      setEditReport({ ...editReport, location: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Status:</label>
                  <select
                    className="form-select"
                    value={editReport.status}
                    onChange={(e) =>
                      setEditReport({ ...editReport, status: e.target.value })
                    }
                  >
                    <option value="Pending">Pending</option>
                    <option value="Resolved">Resolved</option>
                    <option value="In Progress">In Progress</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button onClick={handleSave} className="btn btn-success">
                  Save
                </button>
                <button onClick={() => setEditReport(null)} className="btn btn-secondary">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
