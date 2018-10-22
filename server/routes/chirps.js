const express = require('express');
const chirpStore = require('../chirpstore');

let router = express.Router();

router.get('/:id?', (req, res) => {
    let id = req.params.id;
    if (id) {
        res.send(chirpStore.GetChirp(id));
    }
    else {
        res.send(chirpStore.GetChirps());
    }
});

router.post('/', (req, res) => {
    let chirp = req.body;
    chirpStore.CreateChirp(chirp);
    res.send('Chirp added!');
});

router.put('/:id', (req, res) => {
    let id = req.params.id;
    let editedChirp = req.body;
    chirpStore.UpdateChirp(id, editedChirp);
    res.send('Chirp edited successfully!')
});

router.delete('/:id', (req, res) => {
    let id = req.params.id;
    chirpStore.DeleteChirp(id);
    res.send('Chirp deleted!');
});

module.exports = router;