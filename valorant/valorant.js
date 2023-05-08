const express = require('express');
require('dotenv').config();
const app = express();
const axios = require('axios');
const cors = require('cors');

const port = process.env.VALORANT_PORT;
const url_maps = process.env.VALORANT_API_URL_MAPS;

app.use(cors());

app.get('/:mapID', async (req, res) => {
    console.log("mon map ID",req.params.mapID)

    try{
        const response_maps = await axios.get(`${url_maps}${req.params.mapID}`);
        console.log(response_maps.data)
        const Vdata = response_maps.data.data;
        console.log("ICI VDATA >>>", Vdata);
        const MAPID = Vdata.uuid;
        const MAPNAME = Vdata.displayName;
        const MAPURL = Vdata.displayIcon;
        const MAPCOORD = Vdata.coordinates;
        console.log(response_maps)
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