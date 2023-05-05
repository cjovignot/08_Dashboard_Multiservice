const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
app.use(cors());
const PORT = 3006;

// Route to forward requests to the Zelda API
app.use("/api/v2/entry/:entry", async (req, res) => {
  try {
    const zeldaApiUrl = "https://botw-compendium.herokuapp.com/api/v2/entry";
    const response = await axios.get(`${zeldaApiUrl}/${req.params.entry}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).send("Error forwarding request to Zelda API");
  }
});

// New route to forward requests to the Zelda API for categories
app.use("/api/v2/category/monsters", async (req, res) => {
  try {
    const zeldaApiUrl =
      "https://botw-compendium.herokuapp.com/api/v2/category/monsters";
    const response = await axios.get(`${zeldaApiUrl}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).send("Error forwarding request to Zelda API");
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
