const router = require('express').Router();
const path = require('path');

router.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
})

router.get('/hi', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/landing.html'))
})

module.exports = router;