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
            <div className="card w-full pokemon_background text-black p-4 rounded-lg">
                <div className="flex">
                    <img src={data.image} alt={data.name} className="w-40"/>
                    <div className="ml-5">
                        <h2 className="card-title text-3xl font-bold">#{data.pokedexId} {data.name}</h2>
                        <p>Generation : {data.apiGeneration}</p>
                        {data.apiPreEvolution === "none" &&
                            <p>Pokemon de Base</p>
                        }
                        {data && data.apiPreEvolution != "none" &&
                            <p>Base : #{data.apiPreEvolution.pokedexIdd} {data.apiPreEvolution.name}</p>
                        }
                        {data && data.apiEvolutions.map((item, i) => (
                            <p key={i}>Evolution sup. : #{item.pokedexId} {item.name}</p>
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
                        <>
                        <table className="text-center border">
                            <thead>
                                <tr>
                                    <th>HP</th>
                                    <th>ATT</th>
                                    <th>DEF</th>
                                    <th>AT_SPE</th>
                                    <th>DEF_SPE</th>
                                    <th>SPEED</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{data.stats.HP}</td>
                                    <td>{data.stats.attack}</td>
                                    <td>{data.stats.defense}</td>
                                    <td>{data.stats.special_attack}</td>
                                    <td>{data.stats.special_defense}</td>
                                    <td>{data.stats.speed}</td>
                                </tr>
                            </tbody>
                        </table>
                        </>
                        }


                        <table className="border">
                            <thead>
                                <tr>
                                    <th>Multi</th>
                                    <th>Effect</th>
                                    <th>Type</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data && data.apiResistances.map((item, i) => (
                                    // <p key={i}>{item.name} {item.damage_multiplier}</p>
                                    <tr>
                                        <td>{item.damage_multiplier}</td>
                                        <td>{item.damage_relation}</td>
                                        <td>{item.name}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                </div>
            </div>
                }
      </div>
    </div>
  );
};

export default Pokemon;