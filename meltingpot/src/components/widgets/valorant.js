import React, { useState } from "react";
import axios from "axios";

const Valorant = () => {

    const [mapID, setMapID] = useState('');
    const [mapName, setMapName] = useState('');
    const [mapCoord, setMapCoord] = useState('');
    const [mapURL, setMapURL] = useState('');

    const handleChange = async (event) => {
        const ID = event.target.value;
        console.log(ID)

        try {
            const response = await axios.get(`http://localhost:3004/${ID}`);
            console.log( "*****", response)
            setMapName(response.data.MAPNAME);
            setMapCoord(response.data.MAPCOORD);
            setMapURL(response.data.MAPURL);

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="card w-auto shadow-xl image-full ml-10 mr-10 mb-10 h-44">
              <div className="card-body max-h-44 overflow-scroll">
        {/* <div className="flex w-full mt-8"> */}
                <h2 className="card-title">VALORANT : 🗺️ Strategize </h2>

                <div className="Main_ctnr">
               
                <button button className="Ascend-btn btn btn-outline btn-error" value="7eaecc1b-4337-bbf6-6ab9-04b8f06b3319" onClick={handleChange}>ASCEND</button>
                <button button className="Bind-btn btn btn-outline btn-error" value="d960549e-485c-e861-8d71-aa9d1aed12a2" onClick={handleChange}>BIND</button>
                <button button className="Breeze-btn btn btn-outline btn-error" value="2fb9a4fd-47b8-4e7d-a969-74b4046ebd53" onClick={handleChange}>BREEZE</button>
                <button button className="Fracture-btn btn btn-outline btn-error" value="b529448b-4d60-346e-e89e-00a4c527a405" onClick={handleChange}>FRACTURE</button>
                <button button className="Haven-btn btn btn-outline btn-error" value="2bee0dc9-4ffe-519b-1cbd-7fbe763a6047" onClick={handleChange}>HAVEN</button>
                <button button className="Icebox-btn btn btn-outline btn-error" value="e2ad5c54-4114-a870-9641-8ea21279579a" onClick={handleChange}>ICEBOX</button>
                <button button className="Lotus-btn btn btn-outline btn-error" value="2fe4ed3a-450a-948b-6d6b-e89a78e680a9" onClick={handleChange}>LOTUS</button>
                <button button className="Pearlbtn btn btn-outline btn-error" value="fd267378-4d1d-484f-ff52-77821ed10dc2" onClick={handleChange}>ICEBOX</button>
                <button button className="Split-btn btn btn-outline btn-error" value="d960549e-485c-e861-8d71-aa9d1aed12a2" onClick={handleChange}>SPLIT</button>

                <div><img src={mapURL}></img></div>
                <div>{mapCoord}</div>
                <div className="mapName">{mapName}</div>
                </div>
                {/* </div> */}
            </div>
        </div>
    );
} 


export default Valorant;