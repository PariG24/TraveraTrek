import React, { useRef, useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { locations } from '@/data/locations';

// Fix for default marker icon
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png',
});

// Custom yellow icon for current location
const yellowHumanIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-yellow.png',
  iconRetinaUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-yellow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png',
  shadowSize: [41, 41]
});

const TrackUserLocation = ({ position }: { position: [number, number] | null }) => {
  const map = useMap();
  const initialZoom = useRef(true);
  const userZoomLevel = useRef<number | null>(null);

  useEffect(() => {
    if (position) {
      console.log('User Location:', position);
      if (initialZoom.current) {
        map.setView(position, 18, { animate: true });
        userZoomLevel.current = map.getZoom();
        initialZoom.current = false;
      } else {
        const zoomLevel = userZoomLevel.current || map.getZoom();
        map.panTo(position, { animate: true, duration: 1.5, easeLinearity: 0.25 });
      }
    }
  }, [position, map]);

  return null;
};

const WorldMap = () => {
  const mapRef = useRef<L.Map | null>(null);
  const [currentLocation, setCurrentLocation] = useState<[number, number] | null>(null);
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const newLocation: [number, number] = [latitude, longitude];
          console.log('New user coordinates:', newLocation);
          setCurrentLocation(newLocation);
          setMapReady(true);
        },
        (error) => {
          console.error('Error getting location:', error);
        },
        { enableHighAccuracy: true, maximumAge: 1000, timeout: 5000 }
      );

      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, []);

  const handleMarkerClick = (coordinates: [number, number]) => {
    if (mapRef.current) {
      mapRef.current.flyTo(coordinates, 18, { animate: true }); // Fly to the clicked marker
    }
  };

  return (
    <MapContainer center={currentLocation || [0, 0]} zoom={2} style={{ height: '100vh', width: '100%' }} ref={mapRef}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {mapReady && currentLocation && <TrackUserLocation position={currentLocation} />}
      {currentLocation && (
        <Marker position={currentLocation} icon={yellowHumanIcon} eventHandlers={{ click: () => handleMarkerClick(currentLocation) }}>
          <Popup>
            <div>
              <h3>You're Currently Here</h3>
            </div>
          </Popup>
        </Marker>
      )}
      {locations.map((location, index) => (
        <Marker key={index} position={location.coordinates} eventHandlers={{ click: () => handleMarkerClick(location.coordinates) }}>
          <Popup>
            <div>
              <h3>{location.name}</h3>
              <p>{location.address}</p>
              <a href={location.instagramLink} target="_blank" rel="noopener noreferrer">Instagram</a>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default WorldMap; //test
