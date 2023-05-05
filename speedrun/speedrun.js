const express = require('express');
require('dotenv').config();
const app = express();
const axios = require('axios');
const cors = require('cors');

const port = process.env.SPEEDRUN_PORT;
const url_games = process.env.SPEEDRUN_API_URL_GAMES;
const url_cats = process.env.SPEEDRUN_API_URL_CATS;
const url_records = process.env.SPEEDRUN_API_URL_RECORDS;
const url__runners = process.env.SPEEDRUN_API_URL_RUNNERS;

app.use(cors());

app.get('/', async (req, res) => {
    const { name: gameName } = req.query
    try {
        const response_games = await axios.get(`${url_games}${gameName}`);
        // console.log(response_games.data)
        const GAMEID = response_games.data.data[0].id;
        const GAMENAME = response_games.data.data[0].names.international;
        const GAMEPIC = response_games.data.data[0].assets["cover-tiny"].uri;
        
        const response_cat = await axios.get(`${url_cats}${GAMEID}/categories?miscellaneous=no`);
        const CATID = response_cat.data.data[0].id;
        //console.log(CATID)
        
        const response_records = await axios.get(`${url_records}${CATID}/records`);
        const tmp = response_records.data.data[0].runs;
        // const RUNNERID = tmp.
        console.log(tmp);

        // const response_runners = await axios.get(`${url_runners}${RUNNERID}`)

        res.json({
            "-message" : "📥 JSON imported successfully !",
            "gameID": GAMEID,
            "catID": CATID,
            "gameName": GAMENAME,
            "gamePic": GAMEPIC,
            tmp
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({error: "ERROR !"});
    }
});

app.listen(port, () => console.log(`Express app running on port ${port}!`));

