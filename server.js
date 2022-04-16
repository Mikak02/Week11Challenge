// Requirements for express
const express = require('express');
// requirements for adding to json
const fs = require('fs');
const path = require('path');
// view engine i found on internet
// app.set('view engine', 'ejs');
const notes = require('./Develop/db/db.json');
const app = express();
// port will be 3001 for local, but can be changed for Heroku
const port = process.env.PORT || 3001;

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
// allows js/css from public
app.use(express.static('./Develop/public'));

// not sure if I'll need this
// app.post('/api/notes', (req, res) => {
//     // set id based on what the next index of the array will be
//     req.body.id = notes.length.toString();
  
//     // add animal to json file and animals array in this function
//     const notes = createNewNotes(req.body, notes);
  
//     res.json(animal);
//   });


// functions
function createNewNotes(body, notesArray) {
    const notes = body;
    notesArray.push(notes);
    fs.writeFileSync(
      path.join(__dirname, '/Develop/db/db.json'),
      JSON.stringify({ notes: notesArray }, null, 2)
    );
    return notes;
  }

// json route
app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/Develop/db/db.json'));
});

// post
app.post('/api/notes', (req, res) => {
    // req.body is where our incoming content will be
    console.log(req.body);
    res.json(req.body);
});

// html calls from modules. not working. don't know why but i blame ejs
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "/Develop/public/index.html"));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/Develop/public/notes.html'));
});

// html calls with ejs viewer that do work
// app.get('/', (req, res) => {
//     res.render('index')
// });

// app.get('/notes', (req, res) => {
//     res.render('notes')
// })

// shows server is working
app.listen(3001, () => {
    console.log(`API server now on port 3001!`);
  });