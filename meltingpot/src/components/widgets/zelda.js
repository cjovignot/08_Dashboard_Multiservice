// components/ZeldaComponent.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const ZeldaComponent = () => {
  const [entry, setEntry] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [monsters, setMonsters] = useState([]);
  const fetchData = async (entryId) => {
    if (!entryId) return;
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:3006/api/v2/entry/${entryId}`
      );
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError("Error fetching data");
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3006/api/v2/category/monsters"
        );
        setMonsters(response.data.data);
        console.log("monster list", response.data.data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching data");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = async (e) => {
    setEntry(e.target.value);
    fetchData(e.target.value);
  };

  return (
    <div
      className="card w-auto shadow-xl image-full ml-10 mr-10 mb-10 h-44"
      // https://cdn.wallpapersafari.com/60/38/pMJZzn.jpg
      style={{
        backgroundImage:
          "url('https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExZTFhYmUzYmU1YmM2NTZhMjljOTI1YjBmZDZkNmM1N2JlZjg5NmNjYiZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/rMnd7B3BMASboHgVep/giphy.gif')",
      }}
    >
      {" "}
      <div className="card-body max-h-44 overflow-scroll">
        <div className="flex w-full mt-8">
          <img src="https://www.pngmart.com/files/4/The-Legend-of-Zelda-Logo-PNG-Clipart.png" className="w-20 mr-4"></img>

          <form className="w-full">
            <select
              className="input glass w-full text-black"
              type="text"
              id="entry"
              value={entry}
              onChange={handleInputChange}
              placeholder="Select monster entry"
            >
              <option className="text-black" value="" disabled>
                Select a monster
              </option>
              {monsters.map((monster, index) => (
                <option className="text-black" key={index} value={monster.id}>
                  {monster.name}
                </option>
              ))}
            </select>
          </form>
        </div>
        {loading && <div>Loading...</div>}

        {data && (
          <div>
            <h3>
              <b>Name:</b> {data.data.name}
            </h3>
            <p>
              {" "}
              <b>Description:</b> {data.data.description}
            </p>
            <h3>
              <img src={data.data.image}></img>
            </h3>
            <h4>
              <b>Common Locations:</b>
            </h4>
            <ul>
              {data.data.common_locations?.map((location, index) => (
                <li key={index}>{location}</li>
              ))}
            </ul>
            <h4>
              <b>Drops:</b>
            </h4>
            {data.data.drops?.length > 0 ? (
              <ul>
                {data.data.drops.map((drop, index) => (
                  <li key={index}>{drop}</li>
                ))}
              </ul>
            ) : (
              <p>No drops available</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ZeldaComponent;
