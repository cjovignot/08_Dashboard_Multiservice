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
        <div className="card w-auto image-full ml-10 mr-10 mb-10"
        style={{
            backgroundImage: "url('https://gifdb.com/images/file/sick-of-this-windy-weather-haax9j0nybc9wrba.gif')",
            backgroundPosition: "top",
            backgroundSize: "cover",
        }}>



            {/* Put this part before </body> tag */}
            <input type="checkbox" id="my-modal-4" className="modal-toggle" />
            <label htmlFor="my-modal-4" className="modal cursor-pointer relative rounded-2xl">
            {/* <label className="modal-box" htmlFor=""> */}
                <form onSubmit={handleChange}>
                    <input
                        type="text"
                        placeholder="Type here"
                        className="input w-full text-black glass"
                        onChange={(e) => setData(e.target.value)}
                    />
                    {/* <button type="submit">Search</button> */}
                </form>
            {/* </label> */}
            </label>






            <div className="card-body max-h-44 overflow-scroll">
                <div className="flex justify-between items-center">
                    <img src="https://www.pngall.com/wp-content/uploads/11/Weather-PNG-Images.png" className="w-28"></img>
                    {/* MODAL BUTTON */}
                    <label htmlFor="my-modal-4" className="btn w-auto">Select a city</label>
                </div>

                {weather &&
                <div className="card w-full glass text-black p-4 rounded-lg">
                    <div className="flex items-center">
                        <img src={icon.icon} alt="img" className="rounded-xl w-32" />
                        <div>
                            <h1 className="text-2xl font-bold">{location.name} - {location.country}</h1>
                            <h1 className="text-l">{location.localtime}</h1>
                            <h1 className="text-l">{location.region}</h1>
                        </div>
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
                }

            </div>
        </div>
    );
}

export default Weather;