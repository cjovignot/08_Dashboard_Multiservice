const express = require('express');
const app = express();
const port = 3002;

app.get('/', (req, res) => res.send('Hello Pokemon!'));

app.listen(port, () => console.log(`Express app running on port ${port}!`));