const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/Users");
const SpotifyToken = require("../models/SpotifyToken"); // Add this line
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashPassword,
    });

    await newUser.save();

    // Create an empty SpotifyToken entry for the new user
    const newSpotifyToken = new SpotifyToken({
      user_id: newUser._id, // Set user_id field
      Jwttoken: "",
      spotifyAccessToken: "",
      spotifyRefreshToken: "",
    });

    await newSpotifyToken.save();

    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
