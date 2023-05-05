const express = require('express');
require('dotenv').config();

const cors = require('cors');

const app = express();
const port = process.env.PORT_WEATHER;
const weatherUrl = process.env.WEATHER_URL;
const apiKey = process.env.API_KEY;

const axios = require('axios');
const router = express.Router();

app.use(cors());

app.get('/', async (req, res) => {
    const { q: cityName } = req.query;
    const headers = {'key': apiKey}
    try {
        const response = await axios.get(`${weatherUrl}${cityName}`, { headers });
        console.log(`${weatherUrl}${cityName}`)
        const data = response.data;
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
});

module.exports = app;

app.listen(port, () => console.log(`Express app running on port ${port}!`));