import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from 'chart.js';

// Register chart components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const WeatherDashboard = ({ lat, lon }) => {
    const [weather, setWeather] = useState(null);
    const [forecastData, setForecastData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const apiKey = import.meta.env.VITE_OPEN_WEATHER_API_KEY;
    console.log(apiKey);
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    useEffect(() => {
        setLoading(true);
        const fetchWeather = async () => {
            try {
                const weatherResponse = await axios.get(weatherUrl);
                const forecastResponse = await axios.get(forecastUrl);

                setWeather(weatherResponse.data);
                setForecastData(forecastResponse.data.list);
            } catch (err) {
                setError('Failed to fetch weather data.');
                console.error(err);
            }
            setLoading(false);
        };

        fetchWeather();
    }, [lat, lon, weatherUrl, forecastUrl]);

    // Extract data for the graph
    const graphData = {
        labels: forecastData ? forecastData.map(item => new Date(item.dt * 1000).toLocaleString()) : [],
        datasets: [
            {
                label: 'Temperature (°C)',
                data: forecastData ? forecastData.map(item => item.main.temp) : [],
                borderColor: 'rgba(75,192,192,1)',
                backgroundColor: 'rgba(75,192,192,0.2)',
                fill: true,
            },
            {
                label: 'Rain Probability (%)',
                data: forecastData ? forecastData.map(item => (item.pop || 0) * 100) : [],
                borderColor: 'rgba(255,99,132,1)',
                backgroundColor: 'rgba(255,99,132,0.2)',
                fill: true,
            },
        ],
    };

    if (error) return <div className="error">{error}</div>;

    if (loading) return <div className="error w-100 h-100 d-flex justify-content-center align-items-center">Loading...</div>;

    return (
        <div className="weather-dashboard w-100 h-100">
            {weather && (
                <div className="current-weather text-secondary2">
                    <h3 className='text-white'>Current Weather at {weather.name}</h3>
                    <p><strong>Condition:</strong> {weather.weather[0].description}</p>
                    <p><strong>Temperature:</strong> {weather.main.temp}°C</p>
                    <p><strong>Wind Speed:</strong> {weather.wind.speed} m/s</p>
                </div>
            )}

            {forecastData && (
                <div className="forecast mt-4">
                    <h4 className='text-secondary2'>Weather Forecast</h4>
                    <Line
                        data={graphData}
                        options={{
                            responsive: true,
                            plugins: {
                                legend: {
                                    position: 'top',
                                },
                                tooltip: {
                                    callbacks: {
                                        label: function (context) {
                                            if (context.dataset.label === 'Rain Probability (%)') {
                                                return `${context.dataset.label}: ${context.raw}%`;
                                            }
                                            return `${context.dataset.label}: ${context.raw}°C`;
                                        },
                                    },
                                },
                            },
                            scales: {
                                x: {
                                    title: { display: true, text: 'Time' },
                                },
                                y: {
                                    title: { display: true, text: 'Values' },
                                },
                            },
                        }}
                    />
                </div>
            )}
        </div>
    );
};

export default WeatherDashboard;
