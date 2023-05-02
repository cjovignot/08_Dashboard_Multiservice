const express = require('express');
const app = express();
const port = 3006;

app.get('/', (req, res) => res.send('Hello Zelda!'));

app.listen(port, () => console.log(`Express app running on port ${port}!`));