const router = require('express').Router();
const path = require('path');
const songData = require('../data/sketches')

router.get('/', (req, res) => {
    res.redirect('/disco');
})

router.get('/disco', (req, res) => {
    const data = songData
    
    res.render('disco', { data });
})

module.exports = router;