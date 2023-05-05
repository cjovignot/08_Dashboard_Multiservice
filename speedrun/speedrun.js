const express = require('express');
require('dotenv').config();
const app = express();
const axios = require('axios');
const port = process.env.SPEEDRUN_PORT;
const cors = require('cors');
const url = process.env.SPEEDRUN_API_URL_GAMEID;
const url_cat = process.env.SPEEDRUN_API_URL_CATID
const url_records = process.env.SPEEDRUN_API_URL_RECORDS


app.use(cors());

app.get('/', async (req, res) => {
    const { name: gameName } = req.query
    try {
        const response = await axios.get(`${url}${gameName}`);
        // console.log(response);
        const data = response.data;
        const GAMEID = data.data[0].id;
        const response_cat = await axios.get(`${url_cat}${GAMEID}/categories?miscellaneous=no`);
        const CATID = response_cat.data.data[0].id
        //console.log(CATID)
        const response_records = await axios.get(`${url_records}${CATID}/records`);
        const tmp = response_records.data.data[0].runs;
        console.log(tmp);
        res.json({
            "message" : "succed",
            "gameID": GAMEID,
            "catID": CATID,
            tmp
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({error: "ERROR !"});
    }

});

app.listen(port, () => console.log(`Express app running on port ${port}!`));

