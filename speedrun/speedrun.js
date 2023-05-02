require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.SPEEDRUN_PORT;
const url = process.env.SPEEDRUN_API_URL;
const axios = require('axios');
const router = express.Router();

app.get('/', async (req, res) => {
    try {
        const response = await axios.get(url);
        const data = response.data;
        res.json(data);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({error: "ERROR !!"});
    }
});

app.listen(port, () => console.log(`Express app running on port ${port}!`));