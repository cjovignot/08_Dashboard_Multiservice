const express = require('express');
const app = express();
const port = 3003;

app.get('/', (req, res) => res.send('Hello SpeedRun!'));

app.listen(port, () => console.log(`Express app running on port ${port}!`));