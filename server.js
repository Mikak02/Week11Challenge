// Requirements for express
const express = require('express');
const app = express();
const path = require('path');

// why can't this be found!!!! i blame nodemon
const { notes } =require('./Develop/db/db.json')

// port will be 3001 for local, but can be changed for Heroku
const port = process.env.PORT || 3001;

// allows js/css from public
app.use(express.static('./public'));


// testing localhost
app.get('/', (req, res) => {
    res.send('Hello')
})

// trying to create route
app.get('notes', (req, res) => {
    res.json(db)
})


// 
app.listen(3001, () => {
    console.log(`API server now on port 3001!`);
  });