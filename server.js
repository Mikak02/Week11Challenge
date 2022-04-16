// Requirements for express
const express = require('express');
const fs = require('fs');
const path = require('path');
const uuid = require('uuid');
const app = express();
// port will be 3001 for local, but can be changed for Heroku
const port = process.env.PORT || 3001;

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
// allows js/css from public
app.use(express.static('./Develop/public'));


// json route
app.get('/api/notes', (req, res) => {
    const data = fs.readFileSync('./Develop/db/db.json');
    res.json(JSON.parse(data));
});

// post to json
app.post('/api/notes', (req, res) => {
  const notes = JSON.parse(fs.readFileSync('./Develop/db/db.json'));
  const saveNote = req.body;
  saveNote.id = uuid;
  notes.push(saveNote);
  fs.writeFileSync('./Develop/db/db.json', JSON.stringify(notes));
    res.json(notes);
});

// delete from json using uuid. doesn't work
app.delete('/api/notes:id', (req, res) => {
  const notes = JSON.parse(fs.readFileSync('./Develop/db/db.json'));
  const deleteNote = notes.filter((rmvNote) => rmvNote.id !== req.params.id);
  fs.writeFileSync('./Develop/db/db.json', JSON.stringify(deleteNote));
  res.json(deleteNote);
})

// html calls from modules
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "/Develop/public/index.html"));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/Develop/public/notes.html'));
});

// shows server is working
app.listen(3001, () => {
    console.log(`API server now on port 3001!`);
  });