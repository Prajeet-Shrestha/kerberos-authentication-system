const express = require('express');
var cors = require('cors');
const app = express();
app.use(cors());

app.get('/', async (req, res) => {
  res.sendFile('run_me.html', { root: __dirname });
});
app.get('/log', async (req, res) => {
  res.sendFile('log.html', { root: __dirname });
});

const port = 3000;

app.listen(port, () => {
  console.log(`listening on port  ${port} `);
});
