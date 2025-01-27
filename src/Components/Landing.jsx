import React, { useState } from 'react'
import './css/Landing.css'
import AdminAuth from './AdminAuth';

const Landing = () => {
  const [isUserLogin, setIsUserLogin] = useState(false)
  return (
    <div className='bg-black'>
      <div className="Landing-1 bg-black d-flex align-items-center justify-content-center">
        <div className="admin-check d-flex justify-content-center">
          <AdminAuth isUserLogin={isUserLogin} />
        </div>

        <div className="object"></div>
        <div className='hero-text text-white text-center'>
          <h6>Welcome to the Cargo Ship Tracking System</h6>
          <h1 className='fs-1'>Efficient Maritime Operations Management</h1> <br />
          <h6 className='pointer' onClick={() => setIsUserLogin(!isUserLogin)} >Get user access to the system →</h6>
        </div>
      </div>
      <div className='Landing-2 bg-dark2'>

        <div className="h-100 w-100">
          <div className="row h-40 w-100 p-0">
            <div className='col-lg-5 border-rightc p-4'>
              <div className="col-6">
                Track vessels in real time and manage critical information with ease. Our system ensures operational efficiency and transparency.
              </div>
            </div>
            <div className='row col-lg-7 h-100'>
              <div className="col-lg-6 d-flex align-items-end p-4">
                <div className="col-lg-8">
                  <h6>Monitor Vessel Movements With Satellite Tech</h6>
                  <span className="text-secondary">Stay updated with live vessel locations and key details for effective decision-making.</span>
                </div>
              </div>
              <div className="col-lg-6 bg-2 h-100"></div>
            </div>
          </div>

          <div className="row h-60 w-100 p-0 border-topc">

            <div className='col-lg-7 row border-rightc'>
              <div className="row col-12 h-60">
                <div className="col-6 d-flex align-items-end p-4">
                  <div className="">
                    <h6>Integrated SOS Feature</h6>
                    <span className="text-secondary">Ensure safety with our SOS functionality, designed for swift emergency communication.</span>
                  </div>
                </div>
                <div className="col-lg-6 bg-3 h-100"></div>
              </div>

              <div className="col-12 row border-topc">
                <div className="col-6 border-rightc d-flex align-items-end p-4">
                  <div className="">
                    <h6>Weather Monitoring</h6>
                    <span className="text-secondary">Access real-time weather updates to plan routes and ensure safe navigation.</span>
                  </div>
                </div>
                <div className="col-6 d-flex align-items-end p-4">
                  <div className=" ">
                    <h6>Route Visualization</h6>
                    <span className="text-secondary">View vessel routes and track progress with detailed map-based visuals.</span>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-lg-5 bg-6 d-flex align-items-end p-4'>
              <div className="col-lg-8 ">
                <h6>See the Maritime World Through Satellite Lens</h6>
                <span className="text-secondary">Harness the power of satellite lens technology for real-time tracking and monitoring of vessel movements across the globe.</span>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Landing
