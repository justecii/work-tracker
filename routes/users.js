var express = require('express');
var router = express.Router();
var { User, Activity, Goal } = require('../models/user');

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

// Get a day report for user
router.post('/dailyLog', function(req, res, next) {
    Activity.find({ user: req.body.user, day: req.body.day }, function(err, acts) {
        if (err) return console.log(err);
        res.send(acts)
    });
});

module.exports = router;