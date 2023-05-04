const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
const registerRoute = require("./Auth/register");
const loginRoute = require("./Auth/login");

const port = 3009;

app.get("/", (req, res) => res.send("Hello Users!"));
app.listen(port, () => console.log(`Express app running on port ${port}!`));

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/register", registerRoute);
app.use("/login", loginRoute);

app.get("/user/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;
    const user = await User.findById(user_id);

    if (user) {
      res.status(200).json({ Jwttoken: user.Jwttoken });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1);
  }
};

connectToMongoDB();
