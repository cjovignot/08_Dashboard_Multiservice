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
    <div className="card w-128 bg-base-100 shadow-xl image-full m-auto m-10">
      <div className="card-body">
        <h2 className="card-title"> Emoji </h2>
        <form onSubmit={ handleSubmit }>
          <input
            type="text"
            placeholder="keyword"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            className="input text-black w-full max-w-xs"
          />
          <button type="submit"> Search </button>
        </form>
        <div className="flex-wrap">
          { emoji && emoji.map((item, i) => {
            return <div className="w-10" key={i}> {item.emoji} </div>;
          })}
        </div>
      </div>
    </div>
  );
};

export default getEmoji;
