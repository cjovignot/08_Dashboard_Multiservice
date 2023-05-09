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
    <div className="card w-auto shadow-xl image-full ml-10 mr-10 mb-10 h-44"
    style={{
        backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg/1920px-Good_Food_Display_-_NCI_Visuals_Online.jpg')",
        backgroundPosition: "center",
        backgroundSize: "cover",
    }}>
      <div className="card-body max-h-44 overflow-scroll">
        <form onSubmit={handleSubmit}>
          <div className="flex">
            <input
              type="text"
              placeholder="Ex: Chicken"
              value={keyword}
              onChange={(e) => {
                setKey(e.target.value);
              }}
              className="input input-bordered glass w-full text-black mt-8 placeholder-black"
            />
            {/* <button type="submit" className="btn btn-success ml-3 mt-8"> Search </button> */}
          </div>
        </form>
        <div className="flex-wrap">
          {title &&
            title.map((item, i) => {
              return (
                <div className="test mb-4" key={i}>
                  <div className="flex justify-center">
                    <h2 className="text-xl font-bold absolute mt-16 text-white">{ item.title }</h2>
                  </div>
                  <a className="food_link" href= { item.spoonacularSourceUrl } target="_blank">
                    <div
                      className="rounded-xl h-40"
                      style={{
                          backgroundImage: `url(${item.image})`,
                          backgroundPosition: "center",
                          backgroundSize: "cover",
                      }}>
                    </div>
                  </a>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default getFood;
