const router = require("express").Router();

const {
    notes
} = require('Note-Taker\db\db.json');
const {
    createNote,
    deleteNote
} = require('Note-Taker\lib\noteFunctions.js');

//GET
router.get('api/notes', (req, res) => {
    let saved = notes;
    res.json(saved);
})

//POST
router.post('/notes', (req, res) => {
    req.body.id = notes.length.toString();
    let note = createNote(req.body, notes);
    res.json(note);
})

//DELETE
router.delete('api/notes/:id', (req, res) => {
    deleteNote(notes, req.params.id);
    res.json(notes);
})


module.exports = router;