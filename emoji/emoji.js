// const router = express.Router();
const axios = require('axios');
require('dotenv').config()
const express = require('express');
const cors = require("cors");
const app = express();

const port = process.env.EMOJI_PORT;
const url = process.env.EMOJI_API_URL;

app.use(cors())

app.get('/', async (req, res) => {

    const { q:name } = req.query;

    try {
        const response = await axios.get(`${url}${name}`);
        // const response = await axios.get(`${url}happy`);
        console.log(`${url}${name}`);
        const data = response.data;
        res.json(data)
    } catch (error) {
        res.status(500).json({error: "there is an error"});
    }
});

app.listen(port, () => console.log(`Express app running on port ${ port }!`));