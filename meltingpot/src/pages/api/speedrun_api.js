import axios from "axios";

export default axios.create({
    baseURL: "https://www.speedrun.com/api/v1/games",
});