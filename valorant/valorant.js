const express = require('express');
const app = express();
const port = 3004;

app.get('/', (req, res) => res.send('Hello Valorant!'));

app.listen(port, () => console.log(`Express app running on port ${port}!`));