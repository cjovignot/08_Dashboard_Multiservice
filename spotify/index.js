const express = require("express");
const dotenv = require("dotenv");
const axios = require("axios");
const querystring = require("querystring");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const SpotifyToken = require("./models/SpotifyToken");
const authMiddleware = require("./authMiddleware");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(cors());
const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const redirectUri = process.env.SPOTIFY_REDIRECT_URI;
const port = process.env.SPOTIFY_PORT;
const authorizationUrl = process.env.SPOTIFY_AUTH_URL;
const spotifyTokenUrl = process.env.SPOTIFY_TOKEN_URL;
const spotifyApiUrl = "https://api.spotify.com/v1";

const scope = [
  "user-read-private",
  "user-read-email",
  "playlist-read-private",
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-read-currently-playing",
  "app-remote-control",
  "streaming",
  "user-library-modify",
  "user-library-read",
  "user-read-playback-position",
  "user-top-read",
  "user-read-recently-played",
].join(" ");
const router = express.Router();

router.get("/", function (req, res, next) {
  res.send("Welcome to my Spotify service!");
});

router.get("/login", (req, res) => {
  //   const { user_id } = req.user;
  const jwtToken = req.headers.authorization.split(" ")[1];
  const authUrl = `${authorizationUrl}?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&scope=${encodeURIComponent(scope)}&state=${encodeURIComponent(
    jwtToken
  )}&show_dialog=true`;
  console.log(authUrl);
  res.redirect(authUrl);
});

router.get("/callback", async (req, res) => {
  const { code } = req.query;
  try {
    const response = await axios.post(
      spotifyTokenUrl,
      querystring.stringify({
        grant_type: "authorization_code",
        code,
        redirect_uri: redirectUri,
        client_id: clientId,
        client_secret: clientSecret,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const { access_token, refresh_token } = response.data;
    const jwtToken = req.query.state;

    await SpotifyToken.findOneAndUpdate(
      { Jwttoken: jwtToken },
      {
        spotifyAccessToken: access_token,
        spotifyRefreshToken: refresh_token,
      }
    );
    res.redirect(`http://localhost:3000?connected=true`);
  } catch (err) {
    console.error(err);
    res.redirect("/#/error/invalid token");
  }
});

router.get("/token-status", authMiddleware, async (req, res) => {
  const { user_id } = req.user;

  try {
    const user = await SpotifyToken.findOne({ user_id });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.spotifyAccessToken || !user.spotifyRefreshToken) {
      return res.status(404).json({ message: "Tokens not available" });
    }

    res.status(200).json({ message: "Tokens available" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error checking token status" });
  }
});

async function refreshAccessToken(user_id) {
  try {
    const user = await SpotifyToken.findOne({ user_id });

    if (!user) {
      return { success: false, message: "User not found" };
    }

    const response = await axios.post(
      spotifyTokenUrl,
      querystring.stringify({
        grant_type: "refresh_token",
        refresh_token: user.spotifyRefreshToken,
        client_id: clientId,
        client_secret: clientSecret,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const { access_token } = response.data;

    await SpotifyToken.findOneAndUpdate(
      { user_id },
      { spotifyAccessToken: access_token }
    );

    return { success: true, access_token };
  } catch (err) {
    console.error(err);
    return { success: false, message: "Error refreshing access token" };
  }
}

router.get("/playlists", authMiddleware, async (req, res) => {
  const { user_id } = req.user;

  try {
    const user = await SpotifyToken.findOne({ user_id });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const fetchPlaylists = async (accessToken) => {
      const response = await axios.get(`${spotifyApiUrl}/me/playlists`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response;
    };

    let response;

    try {
      response = await fetchPlaylists(user.spotifyAccessToken);
    } catch (error) {
      if (error.response.status === 401) {
        // Access token expired, refresh the token and retry fetching playlists
        const refreshResult = await refreshAccessToken(user_id);
        if (refreshResult.success) {
          response = await fetchPlaylists(refreshResult.access_token);
        } else {
          return res.status(500).json({ message: refreshResult.message });
        }
      } else {
        throw error;
      }
    }

    res.status(200).json(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching playlists" });
  }
});

router.get("/refresh_token", authMiddleware, async (req, res) => {
  const { user_id } = req.user;

  try {
    const user = await SpotifyToken.findOne({ user_id });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const response = await axios.post(
      spotifyTokenUrl,
      querystring.stringify({
        grant_type: "refresh_token",
        refresh_token: user.spotifyRefreshToken,
        client_id: clientId,
        client_secret: clientSecret,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const { access_token } = response.data;

    await SpotifyToken.findOneAndUpdate(
      { user_id },
      { spotifyAccessToken: access_token }
    );

    res.status(200).json({ access_token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error refreshing access token" });
  }
});

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB:", err));
app.use("/", router);
app.listen(port, () => console.log(`Spotify service running on port ${port}!`));
