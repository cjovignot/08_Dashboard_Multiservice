import React, { useState } from 'react';
import axios from 'axios';

const speedrun = () => {

    const [gameName, setGameName] = useState('');

    const handleChange = async (e) => {
        e.preventDefault();
        console.log(gameName);

        try {
            const gamesByName = await axios.get(`http://localhost:3003?name=${gameName}`);
            console.log(gamesByName.data.data)
            response = gamesByName.data.data;

        } catch (error) {
            console.error(error);
        }

        try {
            const response = await axios.get(`http://localhost:3003?id=${gameName}`)
        } catch (error) {

        }
    }




    return (
        <div className="card w-128 bg-base-100 shadow-xl image-full m-auto m-10">

            <div className="card-body">
                <h2 className="card-title">⚡ speedrun.com</h2>

            <form onSubmit={handleChange}>
                <input
                    type="text"
                    placeholder="Game name"
                    className="input w-full max-w-xs"
                    onChange= {(e) => setGameName(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>

            <div className="gameData_ctnr">
                <div className="gamePicture">pic</div>
                <div className="gameTitle">title</div>
                <div className="gamePlatform">🕹️ platform</div>
                <div className="btn btn-circle gameFavBtn">❤️</div>
            </div>

            <div className="top_ctnr">
                <div className="top1">🥇 player name</div>
                <div className="top1">🥈 player name</div>
                <div className="top1">🥉 player name</div>

            </div>

            <div className="fav_ctnr flex-row justify-evenly">
                <div className="btn favA">game title 1</div>
                <div className="btn favB">game title 2</div>
                <div className="btn favC">game title 3</div>
            </div>
                
            </div>
        </div>
    );
}

export default speedrun;