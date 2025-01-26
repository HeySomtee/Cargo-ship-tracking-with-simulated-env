import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import SideBar from "./Components/SideBar";
import Map from "./Components/Map";
import RsideBar from "./Components/RsideBar";
import VesselInfo from "./Components/VesselInfo";
import Landing from "./Components/Landing";

function MainAppLayout() {
  return (
    <div style={{ height: "100dvh" }} className="d-flex p-2 bg-black">
      <div className="h-100 w-75" style={{ borderRadius: "10px 0 10px 0" }}>
        <div className="map-area w-100 h-60 bg-dark">
          <Map />
        </div>
        <div className="console bg-dark w-100 h-40 border-topc">
          <VesselInfo />
        </div>
      </div>
      <div className="Rside-bar h-100 w-25 bg-black border-leftc">
        <RsideBar />
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<MainAppLayout />} />
      </Routes>
    </Router>
  );
}

export default App;
