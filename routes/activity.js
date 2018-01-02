var express = require('express');
var router = express.Router();
var {User, Activity} = require('../models/user');


router.post('/new', function(req, res, next) {
    console.log("We've been hit")
})

module.exports = router;