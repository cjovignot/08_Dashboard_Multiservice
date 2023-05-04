import React, { useState } from "react";
import axios from "axios";
// import { data } from "autoprefixer";

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
        <div className="flex card w-96 shadow-xl glass text-black rounded-lg">
            <div className="card-body p-3">
                <h2 className="card-title">Weather</h2>
                
                <form onSubmit={handleChange}>
                    <input
                        type="text"
                        placeholder="Type here"
                        className="input glass w-full text-black"
                        onChange={(e) => setData(e.target.value)}
                    />
                    {/* <button type="submit">Search</button> */}
                </form>


                <div className="flex card w-full shadow-xl glass text-black rounded-lg p-4">
                    <div className="flex items-center max-h-20">
                        <img src={icon.icon} alt="img" className="rounded-xl w-28" />
                        <div className="flex-col">
                            <h1 className="text-2xl font-bold">{location.name}</h1>
                            <h1 className="text-2xl font-bold">{location.localtime}</h1>
                        </div>
                    {/* <h1 className="text-l">{location.country} | {location.region}</h1> */}
                        {/* <p>{icon.text}</p> */}
                    </div>

                    <div>
                        <p><b>Temperature :</b> {weather.temp_c} °C</p>
                        <p><b>Feels like :</b> {weather.feelslike_c} °C</p>
                        <p><b>Humidité :</b> {weather.humidity} %</p>
                        <p><b>Last update :</b> {weather.last_updated}</p>
                    </div>

                    <div>
                        <p><b>Precipitations :</b> {weather.precip_mm} mm</p>
                        <p><b>Pressure :</b> {weather.pressure_mb} mb</p>
                    </div>

                    <div>
                        <p><b>UVs :</b> {weather.uv}</p>
                        <p><b>Wind :</b> {weather.wind_kph}km/h {weather.wind_degree}°{weather.wind_dir}</p>
                    </div>

                </div>

            </div>
        </div>
    );
}

export default Weather;