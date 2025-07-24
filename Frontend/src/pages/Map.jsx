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

  const placeholderIncidents = [
    {
      id: 1,
      title: 'Traffic Accident',
      location: 'Uhuru Highway, Nairobi',
      time: '5 minutes ago',
      severity: 'High',
      reports: 12,
      icon: '🔺',
    },
    {
      id: 2,
      title: 'Medical Emergency',
      location: 'Kenyatta Avenue, Nairobi',
      time: '15 minutes ago',
      severity: 'Critical',
      reports: 8,
      icon: '🚑',
    },
    {
      id: 3,
      title: 'Road Closure',
      location: 'Mombasa Road, Nairobi',
      time: '30 minutes ago',
      severity: 'Medium',
      reports: 5,
      icon: '⚠️',
    },
  ];

  useEffect(() => {
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
  }, []);

  return (
    <section className="live-map-section">
      <h2 className="section-title">Live Incident Map</h2>
      <p className="section-subtitle">
        Track real-time incidents in your area and stay informed about local emergencies.
      </p>

      <div className="map-layout">
        {/* LEFT: Interactive Map */}
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
          </MapContainer>
        </div>

        {/* RIGHT: Recent Incidents */}
        <div className="incident-list">
          <h3>Recent Incidents</h3>
          {placeholderIncidents.map((incident) => (
            <div className="incident-card" key={incident.id}>
              <div className="incident-icon">{incident.icon}</div>
              <div className="incident-info">
                <strong>{incident.title}</strong>
                <p>{incident.location}</p>
                <span className="incident-meta">{incident.time}</span>
              </div>
              <div className="incident-tags">
                <span className={`severity-badge ${incident.severity.toLowerCase()}`}>
                  {incident.severity}
                </span>
                <span className="reports">{incident.reports} reports</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Map;
