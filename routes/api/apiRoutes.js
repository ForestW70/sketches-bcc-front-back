const router = require('express').Router();
const songData = require('../../data/sketches')

router.get('/req-albums', (req, res) => {

    res.json(songData);
});


module.exports = router;