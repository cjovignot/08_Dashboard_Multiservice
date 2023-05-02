const express = require('express');
const app = express();
const port = 3007;

app.get('/', (req, res) => res.send('Hello Tasty'));

app.listen(port, () => console.log(`Express app running on port ${port}!`));