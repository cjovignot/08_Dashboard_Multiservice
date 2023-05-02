const express = require('express');
const app = express();
const port = 3001;

app.get('/', (req, res) => res.send('Hello Spotify!'));

app.listen(port, () => console.log(`Express app running on port ${port}!`));