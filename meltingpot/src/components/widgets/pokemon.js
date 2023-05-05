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
    <div className="card w-128 bg-base-100 shadow-xl image-full m-auto m-10">
      <div className="card-body">
        <h2 className="card-title">Pokemon</h2>
        <form onSubmit={handleChange}>
          <input
            type="text"
            placeholder="Ex: Bulbasaur"
            className="input input-bordered w-full max-w-xs"
            value={pkmnName}
            onChange={(e) => setPkmnName(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>


            <div className="card w-96 bg-base-100 shadow-xl">
                <figure><img src={data.image} alt={data.name} className="w-40"/></figure>
                <div className="card-body">
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

                        <div className="flex">
                            <h2 className="text-xl font-bold">Types : </h2>
                            {data && data.apiTypes.map((item, i) => (
                                <img className="w-5 m-1" src={item.image}/>
                            ))}
                        </div>
                        
                        {data && data.stats &&
                        <>
                        <table className="text-center border">
                            <thead>
                                <th>HP</th>
                                <th>ATT</th>
                                <th>DEF</th>
                                <th>AT_SPE</th>
                                <th>DEF_SPE</th>
                                <th>SPEED</th>
                            </thead>
                            <tr>
                                <td>{data.stats.HP}</td>
                                <td>{data.stats.attack}</td>
                                <td>{data.stats.defense}</td>
                                <td>{data.stats.special_attack}</td>
                                <td>{data.stats.special_defense}</td>
                                <td>{data.stats.speed}</td>
                            </tr>
                        </table>
                        </>
                        }


                        <table className="border">
                            <thead>
                                <th>Multi</th>
                                <th>Effect</th>
                                <th>Type</th>
                            </thead>
                            {data && data.apiResistances.map((item, i) => (
                                // <p key={i}>{item.name} {item.damage_multiplier}</p>
                                <tr>
                                    <td>{item.damage_multiplier}</td>
                                    <td>{item.damage_relation}</td>
                                    <td>{item.name}</td>
                                </tr>
                            ))}
                        </table>
                </div>
            </div>
      </div>
    </div>
  );
};

export default Pokemon;