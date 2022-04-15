const express = require('express');
const { get } = require('express/lib/response');
const app = express();
const port = process.env.PORT || 3001
const { notes } = require('./db/db');

app.use(express.static('public'));
app.get('/', (req, res) => {
    res.send('Hello there!')
})



app.listen(3001, () => {
    console.log(`API server now on port 3001!`);
  });