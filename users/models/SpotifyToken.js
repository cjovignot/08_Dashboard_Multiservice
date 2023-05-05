const mongoose = require("mongoose");

const SpotifyTokenSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: false,
    unique: true,
  },
  Jwttoken: {
    type: String,
    required: false,
  },
  spotifyAccessToken: {
    type: String,
    required: false,
  },
  spotifyRefreshToken: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("SpotifyToken", SpotifyTokenSchema);
