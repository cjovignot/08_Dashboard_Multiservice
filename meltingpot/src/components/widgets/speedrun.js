import React, { useState } from 'react';
import axios from 'axios';

const speedrun = () => {

    const [gameTitle, setGameTitle] = useState('');
  

    const handleChange = async (e) => {
        e.preventDefault();
        console.log(gameTitle);

        try {
            const gamesByTitle = await axios.get(`http://localhost:3003?name=${gameTitle}`);
            console.log(gamesByTitle.data);
            response = gamesByTitle;

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="card w-auto bg-base-100 shadow-xl image-full  ml-10 mr-10 mb-10">

            <div className="card-body overflow-scroll max-h-44">
                <h2 className="card-title">⚡ speedrun.com</h2>

                <form className="form_ctnr flexrow" onSubmit={handleChange}>
                    <input
                        type="text"
                        placeholder="Which game ?"
                        className="input w-full max-w-xs"
                        onChange= {(e) => setGameTitle(e.target.value)}
                    ></input>                    
                </form>

                <div className="gameData_ctnr">
                    <div className="gamePicture_ctnr">pic</div>
                    <div className="gameTitle_ctnr">title</div>
                    {/* <div className="btn btn-circle gameFavBtn_ctnr">❤️</div> */}
                </div>

                <div className="top_ctnr">
                    <div className="top1">🥇 Runner name</div>
                    <div className="top1">🥈 Runner name</div>
                    <div className="top1">🥉 Runner name</div>

                </div>

                {/* <div className="fav_ctnr flex-row justify-evenly">
                    <div className="btn favA">game title 1</div>
                    <div className="btn favB">game title 2</div>
                    <div className="btn favC">game title 3</div>
                </div> */}
                
            </div>
        </div>
    );
}

export default speedrun;