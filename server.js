const express = require('express');
const path = require('path');
const fs = require('fs');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// GET method for fetching data
app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db', 'utf8', (err, data) => {
      if (err) {
        console.log(err);
        res.json(err);
      } else {
        //console.log(data);
        res.send(data);
      }
    })
  });

// POST method
app.post('/notes', (req, res) => {
    fs.readFile('./db/db', 'utf8', (err, data) => {
      if (err) {
        console.log(err);
        res.json(err);
      } else {
        var newNote = req.body;
        var parsedNote = JSON.parse(data); 
        parsedNote.push(newNote);
  
        fs.writeFile('./db/db.json', JSON.stringify(parsedNote), (err) => {
          if (err) {
            console.log(err);
            res.json(err);
          } else {
            res.status(200);
            document.location.reload();
          }
        })
      }
    })
  });
  


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}!`);
});
