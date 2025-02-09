import React, { useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { locations } from '@/data/locations';

// Fix for default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png',
});

const WorldMap = () => {
  const mapRef = useRef<L.Map | null>(null);

  const center: [number, number] = [0, 0]; // Default center
  const zoom = 2; // Default zoom level

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.whenReady(() => {
        console.log('Map is ready');
      });
    }
  }, []);

  const handleMarkerClick = (coordinates: [number, number]) => {
    if (mapRef.current) {
      console.log('Zooming to:', coordinates);
      mapRef.current.setView(coordinates, 10); // Zoom level 10 when a marker is clicked
    } else {
      console.log('Map reference is null');
    }
  };

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      style={{ height: '100vh', width: '100%' }}
      ref={mapRef}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {locations.map((location) => (
        <Marker
          key={location.id}
          position={location.coordinates}
          eventHandlers={{
            click: () => handleMarkerClick(location.coordinates),
          }}
        >
          <Popup>
            <strong>{location.name}</strong><br />
            {location.address}<br />
            <a href={location.instagramLink} target="_blank" rel="noopener noreferrer">
              <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">View on Instagram</button>
            </a>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default WorldMap;