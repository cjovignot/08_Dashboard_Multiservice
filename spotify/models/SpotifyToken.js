const mongoose = require("mongoose");

const SpotifyTokenSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
    unique: true,
  },
  Jwttoken: {
    type: String,
    required: true,
  },
  spotifyAccessToken: {
    type: String,
    required: true,
  },
  spotifyRefreshToken: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("SpotifyToken", SpotifyTokenSchema);
