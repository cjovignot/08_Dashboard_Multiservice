import React, { useState } from 'react';
import axios from 'axios';

const speedrun = () => {
    // Game Data
    const [gameSearch, setGameSearch] = useState('');
    const [gameCover, setGameCover] = useState('');
    const [gameName, setGameName] = useState('');
    const [catName, setCatName] = useState('');
    const [BG, setBackground] = useState('');
    // 1st Place Data
    const [runnerNameGold, setRunnerNameGold] = useState('');
    const [runnerTimeGold, setRunnerTimeGold] = useState('');
    // const timeGoldMinutes = Math.floor(runnerTimeGold/60);
    // const timeGoldSeconds = (runnerTimeGold - timeGoldMinutes * 60);
    // 2nd Place Data
    const [runnerNameSilver, setRunnerNameSilver] = useState('');
    const [runnerTimeSilver, setRunnerTimeSilver] = useState('');
    // const timeSilverMinutes = Math.floor(runnerTimeSilver/60);
    // const timeSilverSeconds = (runnerTimeSilver - timeSilverMinutes * 60);
    // 3rd Place Data
    const [runnerNameBronze, setRunnerNameBronze] = useState('');
    const [runnerTimeBronze, setRunnerTimeBronze] = useState('');
    // const timeBronzeMinutes = Math.floor(runnerTimeBronze/60);
    // const timeBronzeSeconds = (runnerTimeBronze - timeBronzeMinutes * 60);

    const handleChange = async (e) => {
        e.preventDefault();
        console.log(gameSearch);

        try {
            const response = await axios.get(`http://localhost:3003?name=${gameSearch}`);
            setGameCover(response.data.GAMECOVER);
            setGameName(response.data.GAMENAME);
            setCatName(response.data.CATNAME);
            setRunnerNameGold(response.data["1-RUNNER_GOLD"].RUNNERNAME_GOLD);
            setRunnerTimeGold(response.data["1-RUNNER_GOLD"].RUNNERTIME_GOLD);
            setRunnerNameSilver(response.data["2-RUNNER_SILVER"].RUNNERNAME_SILVER);
            setRunnerTimeSilver(response.data["2-RUNNER_SILVER"].RUNNERTIME_SILVER);
            setRunnerNameBronze(response.data["3-RUNNER_BRONZE"].RUNNERNAME_BRONZE);
            setRunnerTimeBronze(response.data["3-RUNNER_BRONZE"].RUNNERTIME_BRONZE);
            setBackground(response.data.Background);

        } catch (error) {
            console.error(error);
        }
    }

    function toTimeString(totalSeconds) {
        const totalMs = totalSeconds * 1000;
        const result = new Date(totalMs).toISOString().slice(11, 19);
      
        return result;
      }

    return (
        <div className="card w-auto shadow-xl image-full ml-10 mr-10 mb-10 h-44" 
        
        style={{
        backgroundImage: `url("${BG}")`,
        backgroundSize: "cover"      
        }}>



            <div className="card-body max-h-44 overflow-scroll">
                <h2 className="card-title">⚡ speedrun.com</h2>

                <form className="form_ctnr flexrow" onSubmit={handleChange}>
                    <input
                        type="text"
                        placeholder="Which game ?"
                        className="input w-full max-w-xs"
                        onChange= {(e) => setGameSearch(e.target.value)}
                    ></input>                    
                </form>

                <div className="gameData_ctnr flex-column items-center">
                    <div className="gameCover_ctnr"><img src={gameCover}></img></div>
                    <div className="gameTitle_ctnr text-xl font-bold">{gameName} - {catName}</div>
                </div>

                <div className="top_ctnr justify-center">

                    {/* <div className="top1">🥇 {runnerNameGold}  🕒 {timeGoldMinutes}m {timeGoldSeconds}s</div>
                    <div className="top1">🥈 {runnerNameSilver}  🕒 {timeSilverMinutes}m {timeSilverSeconds}s</div>
                    <div className="top1">🥉 {runnerNameBronze}  🕒 {timeBronzeMinutes}m {timeBronzeSeconds}s</div> */}
                    <div className="top1">🥇 {runnerNameGold}  🕒 {toTimeString(runnerTimeGold)}</div>
                    <div className="top1">🥈 {runnerNameSilver}  🕒 {toTimeString(runnerTimeSilver)}</div>
                    <div className="top1">🥉 {runnerNameBronze}  🕒 {toTimeString(runnerTimeBronze)}</div>

                </div>                
            </div>
        </div>
    );
}

export default speedrun;