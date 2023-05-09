const axios = require('axios');
require('dotenv').config()
const express = require('express');
const cors = require("cors");
const app = express();

const port = process.env.FOOD_PORT;
const url = process.env.FOOD_API_URL;
const apiKey = process.env.FOOD_API_KEY;
const config = process.env.FOOD_API_CONFIG;
// const name = 'pasta'

app.use(cors())
app.get('/', async (req, res) => {

    const { q:keyword } = req.query; 

    try {
        const response = await axios.get(`${url}${keyword}${config}${apiKey}`);
        const data = response.data;
        console.log("response maggle", response);
        console.log("responses.data maggle", response.data.results);
        res.json(data)
    } catch (error) {
        res.status(500).json({error: "there is an errooooooooooor"});
    }
});

app.listen(port, () => console.log(`Express app running on port ${ port }!`));
