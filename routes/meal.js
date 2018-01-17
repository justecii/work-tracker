var express = require('express');
var router = express.Router();
var { User, Activity, Goal, Meal } = require('../models/user');

router.post('/new', function(req, res, next) {
    console.log(req.body)
    Meal.create({
        title: req.body.title,
        mealType: req.body.mealType,
        calories: req.body.calories,
        time: req.body.time,
        user: req.body.user
    }, function(err, result) {
        if (err) console.log(err);
    })
})

module.exports = router;