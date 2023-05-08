const express = require('express');
require('dotenv').config();
const app = express();
const axios = require('axios');
const cors = require('cors');

const port = process.env.VALORANT_PORT;
const url_maps = process.env.VALORANT_API_URL_MAPS;

app.use(cors());

app.get('/', async (req, res) => {
    const { name: mapID } = req.query;
    console.log(req.query)

    try{
        const response_maps = await axios.get(`${url_maps}${mapID}`);
        console.log(response_maps.data)
        const Vdata = response_maps.data;
        console.log(Vdata);
        const MAPID = Vdata.uuid;
        const MAPNAME = Vdata.displayName;
        const MAPURL = Vdata.displayIcon;
        const MAPCOORD = Vdata.coordinates;

        res.json({
            "MAPID": MAPID,
            "MAPNAME": MAPNAME,
            "MAPURL": MAPURL,
            "MAPCOORD": MAPCOORD,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({error: "ERROR !"});
    }
});
app.listen(port, () => console.log(`Express app running on port ${port}!`));