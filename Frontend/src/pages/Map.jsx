import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix Leaflet icon paths
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const Map = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserLocation([pos.coords.latitude, pos.coords.longitude]);
        },
        (err) => {
          console.warn("User location not available:", err);
        }
      );
    }

    // Fetch incidents
    const fetchIncidents = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/incidents");
        const data = await res.json();
        setIncidents(data.incidents || data);
      } catch (err) {
        console.error("Failed to fetch incidents:", err);
      }
    };

    fetchIncidents();
  }, []);

  return (
    <section className="container py-5">
      <h2 className="text-center fs-2 mb-1">Live Incident Map</h2>
      <p className="text-center text-muted mb-4">
        Track real-time incidents in your area and stay informed about local
        emergencies.
      </p>

      <div className="row g-4">
        {/* LEFT: Map */}
        <div className="col-lg-8">
          <div
            className="bg-light rounded shadow-sm"
            style={{ minHeight: "400px", overflow: "hidden" }}
          >
            <MapContainer
              center={userLocation || [-1.286389, 36.817223]}
              zoom={13}
              style={{ height: "100%", minHeight: "400px" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
              />

              {userLocation && (
                <Marker position={userLocation}>
                  <Popup>You are here</Popup>
                </Marker>
              )}

              {incidents.map((incident) => (
                <Marker
                  key={incident.id}
                  position={[incident.latitude, incident.longitude]}
                >
                  <Popup>
                    <strong>{incident.title}</strong>
                    <br />
                    {incident.description}
                    <br />
                    <em>
                      Reported: {new Date(incident.created_at).toLocaleString()}
                    </em>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>

        {/* RIGHT: Incident List */}
        <div className="col-lg-4">
          <h4 className="mb-3">Recent Incidents</h4>
          {incidents.length > 0 ? (
            incidents.map((incident) => (
              <div
                className="d-flex align-items-center p-3 border rounded mb-3 bg-white shadow-sm"
                key={incident.id}
                style={{ transition: "transform 0.2s ease-in-out" }}
              >
                <div className="fs-3 me-3">🚨</div>
                <div className="flex-grow-1">
                  <strong>{incident.title}</strong>
                  <p className="mb-1 small text-muted">
                    {incident.description}
                  </p>
                  <span className="text-secondary small">
                    {new Date(incident.created_at).toLocaleTimeString()}
                  </span>
                </div>
                <div className="text-end ms-3">
                  <span
                    className={`badge mb-1 ${
                      incident.type?.toLowerCase() === "high"
                        ? "bg-danger"
                        : incident.type?.toLowerCase() === "medium"
                        ? "bg-warning text-dark"
                        : "bg-purple text-white"
                    }`}
                    style={{ fontSize: "0.75rem" }}
                  >
                    {incident.type}
                  </span>
                  <br />
                  <span className="small text-muted">
                    User ID: {incident.user_id}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-muted">No incidents reported yet.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Map;
