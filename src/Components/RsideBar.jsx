import React, { useState, useEffect, useRef } from 'react';
import './css/RsideBar.css';
import Route from './Route';

const RsideBar = () => {
    const [inputValue, setInputValue] = useState('');
    const [cargoData, setCargoData] = useState(null);
    const textRef = useRef(null);
    const caretRef = useRef(null);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    useEffect(() => {
        const fetchCargoData = async () => {
            if (inputValue.length > 0) {
                try {
                    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/get_cargo/${inputValue}`);
                    if (!response.ok) {
                        throw new Error(`Error: ${response.statusText}`);
                    }
                    const data = await response.json();
                    setCargoData(data);
                } catch (error) {
                    console.error('Error fetching cargo data:', error);
                }
            }
        };

        fetchCargoData();
    }, [inputValue]); // Trigger fetch whenever inputValue changes

    useEffect(() => {
        if (textRef.current && caretRef.current) {
            const textWidth = textRef.current.offsetWidth + 10;
            caretRef.current.style.left = `${textWidth}px`;
        }
    }, [inputValue]);

    return (
        <div className="RsideBar text-white h-100 w-100">
            <div className="w-100 h-40 primary-gradient border-bottomc">
                <div className="scale-70 w-100 h-100">
                    <Route />
                </div>
            </div>
            <div className="row w-100 h-5 mx-2 border-bottomc text align-items-center">
                <div className="col-lg-4 text-center d-flex align-items-center">
                    <label htmlFor="trackCargo">Track cargo</label>
                </div>
            </div>
            <div className="w-100 h-50 p-4 text-white" style={{ overflowY: 'auto' }}>
                <div className='row align-items-center justify-space-between mb-4 w-100'>
                    <div className="col-lg-6 text-green"><strong>ENTER CARGO ID</strong></div>

                    <div className="custom-input-wrapper col-lg-6 fs-10">
                        <span ref={textRef} className="custom-input-text">
                            {inputValue}
                        </span>
                        <span ref={caretRef} className="custom-caret"></span>
                        <input
                            placeholder="Enter Cargo ID"
                            type="text"
                            className="custom-input border border-bottom "
                            value={inputValue}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                {cargoData && (
                    <div className="cargo-details fs-6 w-100">
                        <table className=" w-100">
                            <tbody className=''>
                                <tr>
                                    <th><strong>Cargo ID:</strong></th>
                                    <td>{cargoData.cargo.cargo_id}</td>
                                </tr>
                                <tr>
                                    <th><strong>Description:</strong></th>
                                    <td>{cargoData.cargo.description}</td>
                                </tr>
                                <tr>
                                    <th><strong>Weight:</strong></th>
                                    <td>{cargoData.cargo.weight} kg</td>
                                </tr>
                                <tr>
                                    <th><strong>Quantity:</strong></th>
                                    <td>{cargoData.cargo.quantity}</td>
                                </tr>
                                <tr>
                                    <th><strong>Carrier Vessel:</strong></th>
                                    <td>{cargoData.cargo.vessel.name}</td>
                                </tr>
                                <tr>
                                    <th><strong>ETA:</strong></th>
                                    <td>{cargoData.cargo.vessel.eta}</td>
                                </tr>
                            </tbody>
                        </table>


                    </div>
                )}
            </div>
        </div>
    );
};

export default RsideBar;
