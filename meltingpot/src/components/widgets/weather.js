import React, { useState } from "react";
import axios from "axios";
import { data } from "autoprefixer";

const Weather = () => {
    const [cityName, setData] = useState('');
    const [weather, setWeather] = useState('');
    const [location, setLocation] = useState('');
    const [icon, setIcon] = useState('');

    const handleChange = async (e) => {
        e.preventDefault();
        console.log(cityName)

        try {
            const response = await axios.get(`http://localhost:3008?q=${cityName}`);
            setWeather(response.data.current);
            setIcon(response.data.current.condition);
            setLocation(response.data.location);
            console.log(weather)
          } catch (error) {
              console.error(error);
          }
    }

    return (
        <div className="card w-128 bg-base-100 shadow-xl image-full m-auto m-10">
            <div className="card-body">
                <h2 className="card-title">Weather</h2>
                
                <form onSubmit={handleChange}>
                    <input
                        type="text"
                        placeholder="Type here"
                        className="input w-full max-w-xs"
                        onChange={(e) => setData(e.target.value)}
                    />
                    <button type="submit">Search</button>
                </form>


                <div className="card w-96 bg-base-100 shadow-xl">
                    <h1 className="text-2xl font-bold">{location.name} - {location.country}</h1>
                    <h1 className="text-l">{location.localtime}</h1>
                    <h1 className="text-l">{location.region}</h1>
                    <div className="flex items-center">
                        <img src={icon.icon} alt="img" className="rounded-xl w-16" />
                        <p>{icon.text}</p>
                    </div>

                    <div>
                        <p>Temperature : {weather.temp_c} °C</p>
                        <p>Feels like : {weather.feelslike_c} °C</p>
                        <p>Humidité : {weather.humidity} %</p>
                        <p>Last update : {weather.last_updated}</p>
                    </div>

                    <div>
                        <p>Precipitations : {weather.precip_mm} mm</p>
                        <p>Pressure : {weather.pressure_mb} mb</p>
                    </div>

                    <div>
                        <p>UVs : {weather.uv}</p>
                        <p>Wind : {weather.wind_kph}km/h {weather.wind_degree}°{weather.wind_dir}</p>
                    </div>

                </div>

            </div>
        </div>
    );
}

export default Weather;