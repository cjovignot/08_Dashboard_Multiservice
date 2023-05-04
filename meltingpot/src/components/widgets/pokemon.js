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
    <div className="flex card shadow-xl m-auto m-10 glass">
      <div className="flex card-body">
        <div className="flex justify-end">
            <img className="w-80 -m-2" src="https://pngfre.com/wp-content/uploads/pokemon-png-from-pngfre-45.png"/>
        </div>
        <form onSubmit={handleChange}>
          <input
            type="text"
            placeholder="Ex: Bulbasaur"
            className="input glass w-full text-black"
            value={pkmnName}
            onChange={(e) => setPkmnName(e.target.value)}
          />
          {/* <button type="submit" onClick={handleChange}>Search</button> */}
        </form>


            <div className="flex card w-96 shadow-xl glass text-black rounded-lg">
                <div className="flex pl-3">
                    {data &&
                        <img src={data.image} alt={data.name} className="w-32 mt-4"/>
                    }
                    <div className="flex-col pl-5 pt-5">
                        
                        {data &&
                            <h2 className="card-title text-xl font-bold mb-2">#{data.pokedexId} {data.name}</h2>
                        }

                        {data &&
                            <p><b>Generation :</b> {data.apiGeneration}</p>
                        }
                                                
                        {data && data.apiPreEvolution === "none" &&
                            <p><b>Pokemon de Base</b></p>
                        }
                        {data && data.apiPreEvolution != "none" &&
                            <p><b>Base :</b> #{data.apiPreEvolution.pokedexIdd} {data.apiPreEvolution.name}</p>
                        }
                        {data && data.apiEvolutions.map((item, i) => (
                            <p key={i}><b>Evolution sup. :</b> #{item.pokedexId} {item.name}</p>
                        ))}
                    </div>
                </div>

                <div className="card-body p-3">

                    {data &&
                        <div className="flex">
                                <h2 className="text-xl font-bold">Types : </h2>
                            {data && data.apiTypes.map((item, i) => (
                                <img className="w-5 m-1" src={item.image}/>
                                ))}
                        </div>
                    }


                    {data &&
                        <div tabIndex={0} className="collapse collapse-arrow">
                            <div id="pokemon_collapse" className="collapse-title font-medium">
                                {data && data.stats &&
                                    <>
                                    <table className="text-center w-80">
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
                            </div>
                            <div className="collapse-content">
                                <table className="border border-black w-full text-center">
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
      </div>
    </div>
  );
};

export default Pokemon;