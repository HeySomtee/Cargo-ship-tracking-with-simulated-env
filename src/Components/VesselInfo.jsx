import React, { useState, useEffect } from 'react';
import './css/VesselInfo.css';
import Menu from './Menu';

const VesselInfo = () => {
  const [vessels, setVessels] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [vesselId, setVesselId] = useState(null);
  const [isSosActivated, setIsSosActivated] = useState(false);

  useEffect(() => {
    // Fetch vessels data from the API
    const fetchVessels = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/get_all_vessels`);
        const data = await response.json();
        setVessels(data.vessels);
      } catch (error) {
        console.error('Error fetching vessel data:', error);
      }
    };

    fetchVessels();
  }, []);

  const handleMenuTrigger = (vessel_id, is_sos_activated) => {
    setIsMenuOpen(!isMenuOpen);
    setVesselId(vessel_id);
    setIsSosActivated(is_sos_activated);
  };

  return (
    <div className="VesselInfo w-100 h-100 fs-8 primary-gradient">
      <Menu
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        vesselId={vesselId}
        isSosActivated={isSosActivated}
        setIsSosActivated={setIsSosActivated}
        vessels={vessels}
        setVessels={setVessels}
      />
      <div className="w-130">
        <table className="borderless fs-10">
          <thead>
            <tr>
              <th>Vessel</th>
              <th>Imo Number</th>
              <th>Position (Lat, Lon)</th>
              <th>Speed </th>
              <th>Destination (Lat, Lon) </th>
              <th>Type</th>
              <th>Distance</th> {/* TODO : Use Searoute.py to calculate distance */}
              <th>ETA</th>
              <th>Cargo</th>
              {/* <th>Voyage</th>  */}
            </tr>
          </thead>
          <tbody>
            {vessels.map((vessel, index) => (
              <tr key={index} className={vessel.sos ? 'sos-row' : ''} onClick={() => handleMenuTrigger(vessel.id, vessel.sos)}>
                <td>{vessel.name}</td>
                <td>{vessel.imo_number}</td>
                <td className='text-green'>
                  {vessel.position.lat.toFixed(5)}, {vessel.position.lon.toFixed(5)}
                </td>
                <td>{vessel.speed}</td>
                <td className='text-green'>
                  {vessel.destination.lat.toFixed(5)}, {vessel.destination.lon.toFixed(5)}
                </td>
                <td>{vessel.type}</td>
                <td>{vessel.distance}</td>
                <td>{vessel.eta}</td>
                <td>{vessel.cargo}</td>
                {/* <td>{vessel.on_voyage ? 'Yes' : 'No'}</td>  */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VesselInfo;
