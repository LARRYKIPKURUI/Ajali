import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './Map.css';

// Fix Leaflet icon paths
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
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
          console.warn('User location not available:', err);
        }
      );
    }

    // Fetch incidents from backend
    const fetchIncidents = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/incidents');
        const data = await res.json();
        // if the backend returns { incidents: [...] }
        setIncidents(data.incidents || data);
      } catch (err) {
        console.error('Failed to fetch incidents:', err);
      }
    };

    fetchIncidents();
  }, []);

  return (
    <section className="live-map-section">
      <h2 className="section-title">Live Incident Map</h2>
      <p className="section-subtitle">
        Track real-time incidents in your area and stay informed about local emergencies.
      </p>

      <div className="map-layout">
        {/* LEFT: MAP */}
        <div className="map-card">
          <MapContainer
            center={userLocation || [-1.286389, 36.817223]}
            zoom={13}
            style={{ height: '100%', borderRadius: '12px' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; OpenStreetMap contributors'
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
                  <em>Reported: {new Date(incident.created_at).toLocaleString()}</em>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* RIGHT: Recent Incidents */}
        <div className="incident-list">
          <h3>Recent Incidents</h3>
          {incidents.length > 0 ? (
            incidents.map((incident) => (
              <div className="incident-card" key={incident.id}>
                <div className="incident-icon">🚨</div>
                <div className="incident-info">
                  <strong>{incident.title}</strong>
                  <p>{incident.description}</p>
                  <span className="incident-meta">
                    {new Date(incident.created_at).toLocaleTimeString()}
                  </span>
                </div>
                <div className="incident-tags">
                  <span className={`severity-badge ${incident.type?.toLowerCase()}`}>
                    {incident.type}
                  </span>
                  <span className="reports">User ID: {incident.user_id}</span>
                </div>
              </div>
            ))
          ) : (
            <p>No incidents reported yet.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Map;