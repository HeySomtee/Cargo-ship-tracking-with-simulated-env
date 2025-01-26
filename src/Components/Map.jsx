import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet'; // Import Leaflet
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS
import './css/Map.css'; // Import custom CSS for pulsating effect


// const vessels = [
//   { position: [12.8797, 123.7741], name: 'Vessel A' }, // Philippines (Pacific Ocean)
//   { position: [1.3521, 103.8198], name: 'Vessel B' }, // Singapore (Indian Ocean)
//   { position: [37.7749, -122.4194], name: 'Vessel C' }, // Off California (Pacific Ocean)
//   { position: [-34.6037, -58.3816], name: 'Vessel D' }, // Off Argentina (Atlantic Ocean)
//   { position: [35.6895, 139.6917], name: 'Vessel E' }, // Near Japan (Pacific Ocean)
//   { position: [-15.6000, -5.6000], name: 'Vessel F' }, // Mid-Atlantic Ocean
//   { position: [-32.0000, 115.7500], name: 'Vessel G' }, // Near Perth, Australia (Indian Ocean)
//   { position: [60.0000, -45.0000], name: 'Vessel H' }, // Near Greenland (North Atlantic Ocean)
// ];

const Map = () => {
  const mapRef = useRef(null); // To store the map instance
  const [vessels, setVessels] = useState([]); // State to store vessel data

  useEffect(() => {
    // Fetch vessel data from Flask API
    const fetchVessels = async () => {
      try {
        console.log(import.meta.env.VITE_API_BASE_URL);
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/get_vessel_positions`);
        const data = await response.json();
        setVessels(data.vessels);
      } catch (error) {
        console.error('Error fetching vessel positions:', error);
      }
    };

    fetchVessels();
  }, []);

  useEffect(() => {
    if (mapRef.current) return;

    // Initialize the map
    mapRef.current = L.map('map', {
      zoomControl: false,
      center: [0, 0], // Set initial center
      zoom: 1, // Set zoom level
    });

    // Add satellite tile layer
    L.tileLayer('https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {}).addTo(mapRef.current);
  }, []);

  useEffect(() => {
    if (!mapRef.current || vessels.length === 0) return;

    // Add markers for each vessel
    vessels.forEach((vessel) => {
      const markerDiv = L.divIcon({
        className: 'pulsating-marker', // Add the CSS class for the pulsating marker
        html: '<div class="pulsating-circle"></div><div class="dot"></div>',
        iconSize: [30, 30], // Adjust size for proper placement
        iconAnchor: [15, 15], // Center the marker
      });

      L.marker([vessel.position.lat, vessel.position.lon], { icon: markerDiv })
        .addTo(mapRef.current)
        .bindPopup(`<strong>${vessel.name}</strong><br>Position: ${vessel.position.lat}, ${vessel.position.lon}`);
    });
  }, [vessels]);

  return (
    <div
      id="map"
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      <div
        className="text-white font-bold fs-4"
        style={{ position: 'absolute', top: '10px', right: '50px', zIndex: '1000' }}
      >
        Satellite view
      </div>
    </div>
  );
};

export default Map;
