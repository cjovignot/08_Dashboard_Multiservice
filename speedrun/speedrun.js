const express = require('express');
require('dotenv').config();
const app = express();
const axios = require('axios');
const cors = require('cors');

const port = process.env.SPEEDRUN_PORT;
const url_games = process.env.SPEEDRUN_API_URL_GAMES;
const url_cats = process.env.SPEEDRUN_API_URL_CATS;
const url_records = process.env.SPEEDRUN_API_URL_RECORDS;
const url_runners = process.env.SPEEDRUN_API_URL_RUNNERS;

app.use(cors());

app.get('/', async (req, res) => {
    const { name: gameName } = req.query;
    try {
        const response_games = await axios.get(`${url_games}${gameName}`);
        const GAMEID = response_games.data.data[0].id;
        const GAMENAME = response_games.data.data[0].names.international;
        const GAMECOVER = response_games.data.data[0].assets["cover-tiny"].uri;
        const BG = response_games.data.data[0].assets["background"].uri;
        
        const response_cat = await axios.get(`${url_cats}${GAMEID}/categories?miscellaneous=no`);
        const CATID = response_cat.data.data[0].id;
        const CATNAME = response_cat.data.data[0].name;
        
        const response_records = await axios.get(`${url_records}${CATID}/records`);
        const RECORDS = response_records.data.data[0].runs;
        console.log(RECORDS)
        
        // 1st PLACE DATA
        const RUNNERID_GOLD = RECORDS[0].run.players[0].id;
        const RUNNERTIME_GOLD = RECORDS[0].run.times.primary_t;
        const response_runner_gold = await axios.get(`${url_runners}${RUNNERID_GOLD}`);
        console.log(response_runner_gold);
        const RUNNERNAME_GOLD = response_runner_gold.data.data.names.international;

        // 2nd PLACE DATA
        const RUNNERID_SILVER = RECORDS[1].run.players[0].id;
        const RUNNERTIME_SILVER = RECORDS[1].run.times.primary_t;
        const response_runner_silver = await axios.get(`${url_runners}${RUNNERID_SILVER}`);
        console.log(response_runner_silver);
        const RUNNERNAME_SILVER = response_runner_silver.data.data.names.international;

        // 3rd PLACE DATA
        const RUNNERID_BRONZE = RECORDS[2].run.players[0].id;
        const RUNNERTIME_BRONZE = RECORDS[2].run.times.primary_t;
        const response_runner_bronze = await axios.get(`${url_runners}${RUNNERID_BRONZE}`);
        console.log(response_runner_bronze);
        const RUNNERNAME_BRONZE = response_runner_bronze.data.data.names.international;


        res.json({
            "-message" : "📥 JSON imported successfully !",
            "Background": BG,
            "GAMEID": GAMEID,
            "GAMENAME": GAMENAME,
            "GAMECOVER": GAMECOVER,
            "CATID": CATID,
            "CATNAME": CATNAME,
            "1-RUNNER_GOLD":{
                "RUNNERID_GOLD": RUNNERID_GOLD,
                "RUNNERNAME_GOLD": RUNNERNAME_GOLD,
                "RUNNERTIME_GOLD": RUNNERTIME_GOLD,
            },
            "2-RUNNER_SILVER":{
                "RUNNERID_SILVER": RUNNERID_SILVER,
                "RUNNERNAME_SILVER": RUNNERNAME_SILVER,
                "RUNNERTIME_SILVER": RUNNERTIME_SILVER,
            },
            "3-RUNNER_BRONZE":{
                "RUNNERID_BRONZE": RUNNERID_BRONZE, 
                "RUNNERNAME_BRONZE": RUNNERNAME_BRONZE,
                "RUNNERTIME_BRONZE": RUNNERTIME_BRONZE  ,
            },
            // RECORDS
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({error: "ERROR !"});
    }
});

app.listen(port, () => console.log(`Express app running on port ${port}!`));

