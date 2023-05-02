const express = require('express');
const app = express();
const port = 3005;

app.get('/', (req, res) => res.send('Hello Tronald Rump!'));

app.listen(port, () => console.log(`Express app running on port ${port}!`));