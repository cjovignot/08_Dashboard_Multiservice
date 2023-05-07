import React, { useState } from "react";
import axios from "axios";

const Pokemon = () => {
  const [pkmnName, setPkmnName] = useState('');
  const [data, setData] = useState('');
  
  const handleChange = async (e) => {
      e.preventDefault();
      console.log(pkmnName);
      
      try {
          const response = await axios.get(`http://localhost:3002/${pkmnName}`);
          console.log(response.data);
          console.log(response.data.stats)
          setData(response.data);
        } catch (error) {
            console.error(error);
        }
    };
    
  return (
    <div className="card w-auto image-full ml-10 mr-10 mb-10 h-44"
    style={{
        backgroundImage: "url('https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExYjk0MzJlOWQ2ODRlOTkxODg0NzUzZGZkMGM1NDBkYzQxNWMyYTM0ZiZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/NS7gPxeumewkWDOIxi/giphy.gif')",
        backgroundPosition: "center",
        backgroundSize: "cover",
    }}>
      <div className="card-body max-h-44 overflow-scroll">
        <form onSubmit={handleChange}>
          <input
            type="text"
            placeholder="Ex: Bulbizarre"
            className="input input-bordered glass w-full text-black mt-8 placeholder-black"
            value={pkmnName}
            onChange={(e) => setPkmnName(e.target.value)}
          />
        </form>


        {data &&
            <div className="flex  flex-wrap card w-full pokemon_background text-black p-4 rounded-lg">
                <div className="flex  flex-wrap">
                    <img src={data.image} alt={data.name} className="w-40"/>
                    <div className="ml-5 mt-5">
                        <h2 className="card-title text-2xl font-bold">#{data.pokedexId} {data.name}</h2>
                        <p>Generation : {data.apiGeneration}</p>
                        {data.apiPreEvolution === "none" &&
                            <p><b>Pokemon de Base</b></p>
                        }
                        {data && data.apiPreEvolution != "none" &&
                            <p><b>Base :</b> #{data.apiPreEvolution.pokedexIdd} {data.apiPreEvolution.name}</p>
                        }
                        {data && data.apiEvolutions.map((item, i) => (
                            <p key={i}><b>Stage sup. :</b> #{item.pokedexId} {item.name}</p>
                        ))}
                    </div>
                </div>
                <div className="card-body -mt-5">
                        <div className="flex">
                            <h2 className="text-xl font-bold">Types : </h2>
                            {data && data.apiTypes.map((item, i) => (
                                <img className="w-5 m-1 mb-5" src={item.image}/>
                            ))}
                        </div>
                        
                        {data && data.stats &&
                            <div className="flex-col text-orange-500 border p-2 rounded-lg w-auto">
                                <div className="flex text-l font-bold">HP : <div className="ml-2 text-white">{data.stats.HP}</div></div>
                                <div className="flex text-l font-bold">ATT : <div className="ml-2 text-white">{data.stats.attack}</div></div>
                                <div className="flex text-l font-bold">DEF : <div className="ml-2 text-white">{data.stats.defense}</div></div>
                                <div className="flex text-l font-bold">AT_SPE : <div className="ml-2 text-white">{data.stats.special_attack}</div></div>
                                <div className="flex text-l font-bold">DEF_SPE : <div className="ml-2 text-white">{data.stats.special_defense}</div></div>
                                <div className="flex text-l font-bold">SPEED : <div className="ml-2 text-white">{data.stats.speed}</div></div>
                            </div>
                        }

                        {data && data.apiResistances.map((item, i) => (
                            <div className="flex flex-wrap text-orange-500 border p-2 rounded-lg glass">
                                <div className="flex flex-wrap text-l font-bold">{item.name}
                                    <div className="ml-2 text-white">{item.damage_relation}</div>
                                    <div className="ml-2 text-white">{item.damage_multiplier}</div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        }
      </div>
    </div>
  );
};

export default Pokemon;