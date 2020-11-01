import React, { useState, useEffect } from 'react'

// styled components
import { WeatherWrapper, TempToggle } from './Styles'

// components
import CampingMsg from './CampingMsg';
import Campgrounds from './Campgrounds';

const formatTemp = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  }

function Weather({country, locationId}) {
    const [isLoading, setIsLoading] = useState(false);
    const [weather, setWeather] = useState({forecast: "", description: "", icon: ""})
    const [tempData, setTempData] = useState({temperature: "", humidity: null, clouds: null, feelsLike: null});
    const [coord, setCoord] = useState({long: null, lat: null});
    
    // Get weather data and store it
    const getWeather = async () => {
        try {
            setIsLoading(true);
            const API_KEY = "d401eff9123652a10b7094845d6a9117"
            const endpoint = `https://api.openweathermap.org/data/2.5/weather?id=${locationId}&units=metric&appid=${API_KEY}`;
        
            const weatherResponse = await fetch(endpoint);
            const jsonWeather = await weatherResponse.json();
            
            // store weather data
            setWeather({
                forecast: jsonWeather.weather[0].main, 
                description: jsonWeather.weather[0].description, 
                icon: jsonWeather.weather[0].icon + '.png' 
            });
            setTempData({
                ...tempData, 
                temperature: jsonWeather.main.temp + '°C', 
                humidity: jsonWeather.main.humidity, 
                clouds: jsonWeather.clouds.all, 
                feelsLike: jsonWeather.main.feels_like
            });
            setCoord({
                long: jsonWeather.coord.lon, 
                lat: jsonWeather.coord.lat
            });

            setIsLoading(false);
        } catch (err) {
            console.error(err.message);
        }        
    }

    // Change from °C to °F and vice versa
    const tempConverter = (event) => {
        if (tempData.temperature !== null) {
            let newTempVal = tempData.temperature.slice(0, -2);
            
            if (event.target.value === "metric") {
                newTempVal =  (newTempVal - 32) / 1.8;  
                setTempData({...tempData, temperature: formatTemp(newTempVal) + '°C'}); 
            } else {
                newTempVal =  (newTempVal * 1.8) + 32;
                setTempData({...tempData, temperature: formatTemp(newTempVal) + '°F'});
            }
        }
    }

    useEffect(() => {
        getWeather();
    }, []);

    return (
        <>
            {isLoading ? 
                <p style={{color: "white"}}>Loading...</p> : (
                <>
                    <WeatherWrapper  >
                        <CampingMsg feelsLike={tempData.feelsLike} weatherIcon={weather.icon} />
                        
                        {/* Cloud image with weather data */}
                        <svg viewBox='0 27 105 85'>
                            <path d='M 25,60 
                                    a 20,20 1 0,0 0,40 
                                    h 50 
                                    a 20,20 1 0,0 0,-40 
                                    a 10,10 1 0,0 -15,-10 
                                    a 15,15 1 0,0 -35,10  
                                    z' />
                                <text x="48%" y="80%" dominantBaseline="central" textAnchor="middle">Forecast: {weather.description}</text>
                                <text x="48%" y="88%" dominantBaseline="central" textAnchor="middle">Temperature: {tempData.temperature}</text>
                                <text x="48%" y="96%" dominantBaseline="central" textAnchor="middle">Humidity: {tempData.humidity}%</text>
                                <text x="48%" y="104%" dominantBaseline="central" textAnchor="middle">Cloudiness: {tempData.clouds}%</text>
                        </svg> 
                        
                        {/* Celcius & Fahrenheit buttons*/} 
                        <TempToggle>
                            <label className="celsius"><input type="radio" value="metric" name="toggle" defaultChecked onChange={e => tempConverter(e)} /><span>Celsius</span></label>
                            <label className="fahrenheit"><input type="radio" value="imperial" name="toggle" onChange={e => tempConverter(e)} /><span>Fahrenheit</span></label>
                        </TempToggle>
                    </WeatherWrapper>
                    {country === "United States" || country === "US" || country === "Canada" ||country === "CA" ? 
                        <Campgrounds coord={coord}/> :
                        null}
                </>
                )
            }
        </>
    )
}

export default Weather
