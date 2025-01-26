import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const RouteLine = ({ mapView }) => {
  // Create a reference for the map container
  const mapRef = useRef(null);
  const mapInstance = useRef(null);  // Use another ref to store the map instance

  useEffect(() => {
    // Initialize the map only if it hasn't been created already
    if (!mapInstance.current) {
      mapInstance.current = L.map(mapRef.current, { zoomControl: false }).setView([50.105616, 0.372734], 3);

      // Add tile layer
      L.tileLayer( mapView, {
        maxZoom: 7,
        // attribution: '© OpenStreetMap contributors',
      }).addTo(mapInstance.current);

      // Coordinates for the polyline
      const coordinates = [
        [50.105616, 0.372734],
        [49.9, 0.1],
        [49.914768, -0.313513],
        [49.923229, -0.550422],
        [49.92333, -0.553245],
        [49.95, -1.3],
        [49.895072, -1.47977],
        [49.838248, -1.665743],
        [49.75639, -1.93365],
        [49.738559, -1.992006],
        [49.616376, -2.39189],
        [49.370363, -3.197043],
        [49.129249, -3.986163],
        [49.115729, -4.030414],
        [49.042365, -4.270518],
        [48.799916, -5.06401],
        [48.6667, -5.5],
        [47.340067, -6.698867],
        [45.668797, -7.954994],
        [44.934776, -8.49576],
        [43.924891, -9.019938],
        [43.689329, -9.142206],
        [43.688493, -9.14264],
        [43.687223, -9.143299],
        [43, -9.5],
        [40.7798, -9.9844],
        [38.5, -9.6],
        [37.781589, -9.452092],
        [36.8, -9.25],
        [36.549727, -8.219465],
        [36.31906, -7.26966],
        [35.95, -5.75],
        [35.968819, -5.354867],
        [35.97289, -5.269383],
        [36, -4.7],
        [36.156455, -3.683043],
        [36.158352, -3.670714],
        [36.220888, -3.264225],
        [36.324512, -2.590675],
        [36.377724, -2.244793],
        [36.473171, -1.62439],
        [36.666667, -0.366667],
        [37.2, 3.1],
        [37.4, 7.5],
        [37.4851, 10.1431],
        [37.489085, 10.372293],
        [37.5, 11],
        [37.454891, 11.172235],
        [37.283186, 11.827836],
        [37.215493, 12.086301],
        [37.212689, 12.097004],
        [37.209117, 12.110644],
        [36.907095, 13.263819],
        [36.4, 15.2],
        [36.086854, 16.726588],
        [35.845726, 17.902084],
        [35.126694, 21.407365],
        [34.8, 23],
        [34.187436, 24.926664],
        [34.011915, 25.478721],
        [33.748752, 26.306431],
        [33.328, 27.6298],
        [33.219565, 27.927542],
        [33.115811, 28.212434],
        [32.863395, 28.905525],
        [32.316071, 30.408377],
        [31.7, 32.1],
        [31.298117, 32.387159],
        [30.945814, 32.306671],
        [30.318359, 32.382202],
        [30.213982, 32.557983],
        [29.7, 32.6],
        [27.9, 33.75],
        [27, 34.5],
        [23.6, 37],
        [20.75, 38.9],
        [16.3, 41.2],
        [15, 42],
        [12.7, 43.3],
        [12.40439, 43.746586],
        [12, 45],
        [13, 51],
        [12.577758, 53.059021],
        [12.2395, 54.7085],
        [11.4317, 58.3951],
        [11.083455, 59.894005],
        [10.866984, 60.825733],
        [10.5802, 62.0601],
        [10.031585, 64.303249],
        [9.934828, 64.698862],
        [9.862937, 64.992809],
        [9.6889, 65.7044],
        [8.881605, 68.858995],
        [8.7613, 69.3291],
        [8.6701, 69.671733],
        [8.582747, 69.999915],
        [8.365148, 70.817426],
        [8.356493, 70.84994],
        [7.8014, 72.9354],
        [6.966807, 75.966807],
        [6.8131, 76.5251],
        [5.8, 80.1],
        [5.9, 81.9],
        [6.1983, 85.9479],
        [6.4664, 90],
        [6.7, 94],
        [7, 97],
        [3.2, 100.6],
      ];  

      // Add the polyline to the map
      const polyline = L.polyline(coordinates, { color: '#ac4bc2' }).addTo(mapInstance.current);

      // Create a custom sci-fi vessel marker with a pulse effect
      const vesselMarker = L.marker(coordinates[0], {
        icon: L.divIcon({
          className: 'vessel-marker',
          iconSize: [20, 20],
        }),
      }).addTo(mapInstance.current);

      // Function to animate the vessel along the route
      let index = 0;
      function moveVessel() {
        index = (index + 1) % coordinates.length; // Loop through coordinates
        vesselMarker.setLatLng(coordinates[index]);
      }

      // Move the vessel every 2 seconds
      setInterval(moveVessel, 2000);

      // Fit map bounds to the polyline
      mapInstance.current.fitBounds(polyline.getBounds());
    }

    // Cleanup on unmount
    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;  // Reset the map reference
      }
    };
  }, [mapView]);

  return (
    <>
      <div ref={mapRef} id="map" className="h-100 w-100" />
    </>
  );
};

export default RouteLine;
