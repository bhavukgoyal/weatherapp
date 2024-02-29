import React, { useState, useEffect } from 'react';
import { WiThermometer, WiHumidity, WiStrongWind, WiAlien } from 'react-icons/wi';

const WeatherWidget = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [forecastData, setForecastData] = useState([]); // State to store forecast data
    const [city, setCity] = useState('Mathura');
    const API_KEY = '1982332951290dfcfd586cd0f6577872';

    const fetchWeatherData = async () => {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );
        const data = await response.json();
        setWeatherData(data);

        const forecastResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
        );
        const forecastData = await forecastResponse.json();
        setForecastData(forecastData.list);
    };

    useEffect(() => {
        fetchWeatherData();
    }, [city, API_KEY]);

    const handleCityChange = (e) => {
        setCity(e.target.value);
    };

    return (
        <div className="weather-widget">
            <input type="text" value={city} placeholder="Enter City Name" onChange={handleCityChange} />

            {weatherData ? (
                <div>
                    <h2>{weatherData.name}</h2>
                    <p><WiThermometer /> Temperature: {weatherData.main && weatherData.main.temp}°C</p>
                    <p><WiHumidity /> Humidity: {weatherData.main && weatherData.main.humidity}%</p>
                    <p><WiStrongWind /> Wind Speed: {weatherData.wind && weatherData.wind.speed} m/s</p>
                    <p><WiAlien /> {weatherData.weather && weatherData.weather[0].description}</p>
                </div>
            ) : (
                <p>No Data Available</p>
            )}

            <h3>5-Day Forecast:</h3>
            {forecastData ? (
            <ul>
                {forecastData.map((forecast) => (
                    <li key={forecast.dt}>{forecast.dt_txt} - {forecast.main.temp}°C</li>
                ))}
            </ul>):
            <p>No Data Available</p> }
        </div>
    );
};

export default WeatherWidget;