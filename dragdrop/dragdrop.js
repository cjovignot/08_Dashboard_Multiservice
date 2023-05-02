const express = require('express');
const app = express();
const port = 3010;

app.get('/', (req, res) => res.send('Hello Drag & Drop!'));

app.listen(port, () => console.log(`Express app running on port ${port}!`));