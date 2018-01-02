var express = require('express');
var router = express.Router();
var { User, Activity } = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

// Get the activities for a user
router.post('/actLog', function(req, res, next) {
    console.log("This is the request = " + req.body.user)
    Activity.find({ user: req.body.user }, function(err, acts) {
        if (err) return console.log(err);
        res.send(acts)
    });
});

module.exports = router;