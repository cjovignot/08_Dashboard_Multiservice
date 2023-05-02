const express = require('express');
const app = express();
const port = 3009;

app.get('/', (req, res) => res.send('Hello Users!'));

app.listen(port, () => console.log(`Express app running on port ${port}!`));