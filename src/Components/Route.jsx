import React, {useState} from 'react'
import RouteLine from './RouteLine'

const Route = () => {
    const [mapView, setMapView] = useState('');

    const toggleMapView = () => {
        mapView ? setMapView('') : setMapView('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}')
        console.log(mapView);
    }

    return (
        <div className='Route w-100 h-100'>

            <div className="cardinal">
                <div 
                    style={{zIndex: '1000'}}
                    className="map-toggle p-2 bg-green pointer" 
                    title='toggle map view'
                    onClick={ () => toggleMapView() }
                >

                </div>
                <div className='cardinal-1th '>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <span className='bg-white text-dark p-1' style={{ marginBottom: '45%' }}>N</span>
                            <hr style={{ borderTop: '1px solid white', width: '130%' }} />
                            <span style={{ marginTop: '45%' }}>S</span>
                        </div>
                        <div className='' style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <span className='' style={{ marginRight: '60%' }}>W</span>
                            <hr style={{ borderLeft: '1px solid white', height: '140%' }} />
                            <span style={{ marginLeft: '60%' }}>E</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-100 h-100">
                <RouteLine
                    mapView={mapView}
                    // setMapView={setMapView}
                />
            </div>
        </div>
    )
}

export default Route


{/* <div className='Route w-100 h-100'>
<div className="cardinal">
    <div className='cardinal-1th'>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span style={{ marginBottom: '10px' }}>N</span>
                <hr style={{ borderTop: '1px solid white', width: '100%' }} />
                <span style={{ marginTop: '10px' }}>S</span>
            </div>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', display: 'flex', alignItems: 'center' }}>
                <span style={{ marginRight: '10px' }}>W</span>
                <hr style={{ borderLeft: '1px solid white', height: '100%' }} />
                <span style={{ marginLeft: '10px' }}>E</span>
            </div>
        </div>
    </div>
</div>
</div> */}