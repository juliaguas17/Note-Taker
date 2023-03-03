const express = require('express');
const path = require('path');
const fs = require('fs');

const PORT = process.env.PORT || 3001;

const app = express();

const apiRoutes = require('Note-Taker\routes\apiRoutes');
const htmlRoutes = require('Note-Taker\routes\htmlRoutes');

app.use(express.urlencoded({
    extended: true
}));

app.use(express.static('public'));
app.use(express.json());
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);


app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf-8', (err, data) => {
      if (err) {
        console.log(err);
        res.json(err);
      } else {
        res.send(data);
      }
    })
  });
  
  app.post('/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf-8', (err, data) => {
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
  
  app.delete('/api/notes/:id', (req, data) => {
    const idToDelete = parseInt(req.params.id);
    let dataArray = data;
    const deleteIndex = dataArray.indexOf(idToDelete);
    if (deleteIndex > -1) {
      dataArray.splice(deleteIndex, 1);
      res.send(`Deleted data row with id ${idToDelete} from the db array.`);
      document.location.reload();
    } else {
      res.sent(`Data row with id ${idToDelete} is not found in the db array.`);
    }
  });

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}!`);
});
