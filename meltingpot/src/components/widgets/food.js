import { useState } from "react";
import axios from "axios";
import Link from "next/link";

const getFood = () => {
  const [keyword, setKey] = useState([]);
  const [title, setTitle] = useState([]);
  //   const [image, setImage] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:3007?q=${keyword}`);
      setTitle(response.data.results);
      console.log("response.results ==>", response.data);
      return response;
    } catch (error) {
      console.log("c lerreuuuuur", error);
    }
  };

  return (
    <div className="card w-128 bg-base-100 shadow-xl image-full m-auto m-10">
      <div className="card-body">
        <h2 className="card-title"> Food </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="keyword"
            value={keyword}
            onChange={(e) => {
              setKey(e.target.value);
            }}
            className="input text-black w-full max-w-xs"
          />
          <button type="submit"> Search </button>
        </form>
        <div className="flex-wrap">
          {title &&
            title.map((item, i) => {
              return (
                <div className="test" key={i}>
                  { item.title }
                  <img src={item.image}
                  width={500}
                  height={500}
                  alt="Picture of the recep"></img>
                  <Link href= { item.spoonacularSourceUrl }> Click to see full recipe </Link>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default getFood;
