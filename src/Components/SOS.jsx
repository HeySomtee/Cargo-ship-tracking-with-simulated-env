import React, { useEffect, useState } from "react";
import axios from "axios";

function SOS({ vesselId, isSosActivated, setIsSosActivated, vessels, setVessels }) {
//   const [sosState, setSosState] = useState(false);
//   const [loading, setLoading] = useState(true);

  // Fetch the current SOS state when the component mounts
//   useEffect(() => {
//     const fetchSosState = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/sos/${vesselId}`);
//         setSosState(response.data.sos); // Assume the response includes `sos: true/false`
//       } catch (error) {
//         console.error("Error fetching SOS state:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSosState();
//   }, [vesselId]);

  // Handle SOS toggle
  const toggleSOS = async () => {
    try {
      const response = await axios.patch(`${import.meta.env.VITE_API_BASE_URL}/sos/${vesselId}`, {
        sos: !isSosActivated,
      });
      setIsSosActivated(response.data.sos); // Update the local state
      setVessels(response.data.vessels)
      alert(response.data.message || "SOS state updated!");
    } catch (error) {
      console.error("Error toggling SOS:", error);
      alert("Failed to update SOS state. Please try again.");
    }
  };


  return (
    <div className="w-100 h-100 d-flex justify-content-center align-items-center">
      <button
        className="button-86 fs-1 text-center"
        role="button"
        onClick={toggleSOS}
      >
        {isSosActivated ? "DEACTIVATE SOS" : "SEND SOS"}
      </button>
    </div>
  );
}

export default SOS;
