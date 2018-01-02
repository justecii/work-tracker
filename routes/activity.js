var express = require('express');
var router = express.Router();
var {User, Activity} = require('../models/user');


router.post('/new', function(req, res, next) {
    console.log(req.body)
    Activity.create({
        day: req.body.day,
        start: req.body.start,
        finish: req.body.finish,
        duration: req.body.duration,
        category: req.body.category,
        subCategory: req.body.subCategory,
        notes: req.body.notes,
        location: req.body.location,
        user: req.body.user
    }, function (err, result) {
        if (err) {
            res.send(err.message)
        }
        User.update({ _id: req.body.user }, { $push: { activities: result._id } }, function (err, user) {
            if (err) console.log(err);
        })
    })
})

module.exports = router;