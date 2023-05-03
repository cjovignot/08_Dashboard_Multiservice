import React from 'react';

const speedrun = () => {

    return (
        <div className="card w-128 bg-base-100 shadow-xl image-full m-auto m-10">

            <div className="card-body">
                <h2 className="card-title">⚡ speedrun.com</h2>

            <div className="search_ctnr"></div>

            <div className="gameData_ctnr">
                <div className="gamePicture">pic</div>
                <div className="gameTitle">title</div>
                <div className="gamePlatform">🕹️ platform</div>
                <div className="btn btn-circle gameFavBtn">❤️</div>
            </div>

            <div className="top_ctnr">les TOP 3 ici</div>

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