import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './Map.css';

// Fix default icon path
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const Map = () => {
  const [incidents, setIncidents] = useState([]);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    // Fetch incidents from backend
   fetch('http://localhost:5000/api/incidents')
  .then(async (res) => {
    if (!res.ok) {
      const errorData = await res.json();
      console.error('API Error:', errorData);
      return;
    }
    const data = await res.json();
    setIncidents(data.incidents);
  })
  .catch((err) => console.error('Error fetching incidents:', err));

    // Try to get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([
            position.coords.latitude,
            position.coords.longitude
          ]);
        },
        (err) => console.warn('User location not available:', err)
      );
    }
  }, []);

  return (
    <div className="map-container">
      <MapContainer
        center={userLocation || [-1.286389, 36.817223]} // fallback to Nairobi CBD
        zoom={13}
        style={{ height: '80vh', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* User location pin */}
        {userLocation && (
          <Marker position={userLocation}>
            <Popup>You are here</Popup>
          </Marker>
        )}

        {/* Incident markers */}
        {incidents.map((incident) => (
          <Marker
            key={incident.id}
            position={[incident.latitude, incident.longitude]}
          >
            <Popup>
              <strong>{incident.title}</strong><br />
              Type: {incident.type}<br />
              Status: {incident.status}<br />
              Location: ({incident.latitude}, {incident.longitude})
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;
