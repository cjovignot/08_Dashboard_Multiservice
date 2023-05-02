const express = require('express');
const app = express();
const port = 3008;

app.get('/', (req, res) => res.send('Hello Weather!'));

app.listen(port, () => console.log(`Express app running on port ${port}!`));