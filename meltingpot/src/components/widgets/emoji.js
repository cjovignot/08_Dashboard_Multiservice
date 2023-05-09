import { useState } from "react";
import axios from "axios";

const getEmoji = () => {
  const [name, setName] = useState([]);
  const [emoji, setEmoji] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:3005?q=${name}`);
      setEmoji(response.data.results);
      console.log("response.results ==>", response.data);
      return response

    } catch (error) {
      console.log("c lerreuuuuur", error);
    } 
  };

  return (
    <div className="card w-auto shadow-xl image-full ml-10 mr-10 mb-10 h-44"
    style={{
        backgroundImage: "url('https://abilitynet.org.uk/sites/abilitynet.org.uk/files/admin/Emojis.png')",
        backgroundPosition: "center",
        backgroundSize: "cover",
    }}>
      <div className="card-body max-h-44 overflow-scroll">
        <form onSubmit={ handleSubmit }>
          <input
            type="text"
            placeholder="Ex: Happy"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            className="input input-bordered glass w-full text-black mt-8 placeholder-black"
          />
          {/* <button type="submit"> Search </button> */}
        </form>
        <div className="flex flex-wrap w-full">
          { emoji && emoji.map((item, i) => {
            return <div className="text-2xl m-2" key={i}> {item.emoji} </div>;
          })}
        </div>
      </div>
    </div>
  );
};

export default getEmoji;
