import React, { useState, useEffect } from 'react';
import './css/Menu.css';
import SOS from './SOS';
import Route from './Route';
import WeatherDashboard from './WeatherDashboard';
import ChatRoom from './ChatInterface';

const Menu = ({ 
    isMenuOpen, 
    vesselId, 
    setIsMenuOpen, 
    isSosActivated, 
    setIsSosActivated,  
    vessels,
    setVessels 
}) => {
    const [activeMenu, setActiveMenu] = useState('personnel');
    const [personnel, setPersonnel] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (vesselId && activeMenu === 'personnel') {
            fetchPersonnelData(vesselId);
        }
    }, [vesselId, activeMenu]);

    const fetchPersonnelData = async (vesselId) => {
        setLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/get_vessel/${vesselId}`);
            const data = await response.json();
            if (data && data.personnel) {
                // Mask the last 3 digits of employee code
                const maskedPersonnel = data.personnel.map((p) => ({
                    ...p,
                    employee_code: `${p.employee_code.slice(0, -3)}***`,
                }));
                setPersonnel(maskedPersonnel);
            }
        } catch (error) {
            console.error('Error fetching personnel data:', error);
        }
        setLoading(false);
    };
    const handleMenuClick = (menu) => {
        setActiveMenu(menu);
    };

    return (
        <div className="menu-warper" style={{ display: isMenuOpen ? 'flex' : 'none' }}>
            <div className="menu-container h-70">
                <div className="w-100 py-2 full-width bg-black text-white text-end px-4 borderc pointer" style={{ borderRadius: '15px 15px 0 0' }}>
                    <span className='pointer' onClick={() => setIsMenuOpen(false)}>X</span>
                </div>
                <div className="content-container h-100">
                    <div className="menu bg-black border-leftc border-bottomc">
                        <ul className="menu-list">
                            <li
                                className={`menu-item ${activeMenu === 'personnel' ? 'active' : ''}`}
                                onClick={() => handleMenuClick('personnel')}
                            >
                                Vessel Personnel
                            </li>
                            <li
                                className={`menu-item ${activeMenu === 'sos' ? 'active' : ''}`}
                                onClick={() => handleMenuClick('sos')}
                            >
                                SOS Signal
                            </li>
                            <li
                                className={`menu-item ${activeMenu === 'route' ? 'active' : ''}`}
                                onClick={() => handleMenuClick('route')}
                            >
                                Route
                            </li>
                            <li
                                className={`menu-item ${activeMenu === 'weather' ? 'active' : ''}`}
                                onClick={() => handleMenuClick('weather')}
                            >
                                Weather
                            </li>
                            <li
                                className={`menu-item ${activeMenu === 'chat' ? 'active' : ''}`}
                                onClick={() => handleMenuClick('chat')}
                            >
                                Chat Room
                            </li>
                        </ul>
                    </div>

                    <div className="personnel-d h-100 text-white menu-content border-bottomc border-leftc border-rightc primary-gradient">
                        {activeMenu === 'personnel' &&
                            <div className="">
                                {personnel.map((p, index) => (
                                    <div className="" key={index}>
                                        <ul className='list-unstyled mb-5'>
                                            <li className='text-green'>
                                                <span className='text-secondary2 me-2'>&#10148; Name:</span> {p.name}
                                            </li>
                                            <li className='text-green'>
                                                <span className='text-secondary2 me-2'>&#10148; Role:</span> {p.role}
                                            </li>
                                            <li className='text-green'>
                                                <span className='text-secondary2 me-2'>&#10148; Age:</span> {p.age}
                                            </li>
                                            <li className='text-green'>
                                                <span className='text-secondary2 me-2'>&#10148; Nationality:</span> {p.nationality}
                                            </li>
                                            <li className='text-green'>
                                                <span className='text-secondary2 me-2'>&#10148; Employee Code:</span> {p.employee_code}
                                            </li>
                                        </ul>

                                    </div>
                                ))}
                            </div>
                        }


                        {activeMenu === 'sos' && 
                            <SOS 
                                vesselId={vesselId} 
                                isSosActivated={isSosActivated} 
                                setIsSosActivated={setIsSosActivated}
                                vessels={vessels}
                                setVessels={setVessels} 
                            />
                        }
                        {activeMenu === 'route' && 
                            <div className="h-100">
                                <Route  />
                            </div>
                        }
                        {activeMenu === 'weather' && 
                            <WeatherDashboard lat={36.7783} lon={-122.4194} />
                        }
                        {activeMenu === 'chat' && 
                            <ChatRoom vesselId={vesselId} />
                        }
                    </div>
                </div>
            </div>
        </div>
    );

};

export default Menu;
