const express = require('express');
require('dotenv').config();

const cors = require('cors');

const app = express();
const port = process.env.PORT_PKMN;
const pkmnUrl = process.env.PKMN_URL;

const axios = require('axios');
const router = express.Router();

app.use(cors());

app.get('/:name', async (req, res) => {
    const { name } = req.params;
    try {
      const response = await axios.get(`${pkmnUrl}${name}`);
      const data = response.data;
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  });

module.exports = app;

app.listen(port, () => console.log(`Express app running on port ${port}!`));