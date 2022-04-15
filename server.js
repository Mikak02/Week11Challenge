// Requirements for express
const express = require('express');
const app = express();
// view engine
app.set('view engine', 'ejs');

// why can't this be found!!!! i blame nodemon
const notes = require('./Develop/db/db');


// port will be 3001 for local, but can be changed for Heroku
const port = process.env.PORT || 3001;

// allows js/css from public
// app.use(express.static('./public'));

// testing route
app.get('/api/notes', (req, res) => {
    res.json(notes);
});

// post
app.post('/api/notes', (req, res) => {
    // req.body is where our incoming content will be
    console.log(req.body);
    res.json(req.body);
});


// shows server is working
app.listen(3001, () => {
    console.log(`API server now on port 3001!`);
  });