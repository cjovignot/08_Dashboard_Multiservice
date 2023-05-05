// components/ZeldaComponent.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const ZeldaComponent = () => {
  const [entry, setEntry] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [monsters, setMonsters] = useState([]);
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:3002/api/v2/entry/${entry}`
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
          "http://localhost:3002/api/v2/category/monsters"
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
    await fetchData();
  };

  return (
    <div className="card w-128 bg-base-100 shadow-xl image-full m-auto m-10">
      <div className="card-body">
        <h2 className="card-title">Zelda</h2>

        <h1>Zelda</h1>
        <form>
          <select
            className="select w-full max-w-xs"
            type="text"
            id="entry"
            value={entry}
            onChange={handleInputChange}
            placeholder="Select monster entry"
          >
            <option value="" disabled>
              Select a monster
            </option>
            {monsters.map((monster, index) => (
              <option key={index} value={monster.id}>
                {monster.name}
              </option>
            ))}
          </select>
        </form>
        {loading && <div>Loading...</div>}
        {error && <div>{error}</div>}
        {data && (
          <div>
            {/* Render the data as needed */}
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default ZeldaComponent;
