var express = require('express');
var router = express.Router();
var { User, Activity, Goal, Meal } = require('../models/user');

router.post('/new', function(req, res, next) {
    console.log(req.body)
    console.log(req.body.sugar + "THIS IS SUGAR")
    Meal.create({
        title: req.body.title,
        mealType: req.body.mealType,
        calories: req.body.calories,
        protein: req.body.protein,
        fat: req.body.fat,
        carbs: req.body.carbs,
        sugar: req.body.sugar,
        time: req.body.time,
        day: req.body.day,
        user: req.body.user
    }, function(err, result) {
        if (err) console.log(err);
    });
});

router.post('/calLog', function(req, res, next) {
    Meal.find({ user: req.body.user }, function(err, meals) {
        if (err) return console.log(err);
        res.send(meals)
    });
});

// Get a day report for the user
router.post('/dailyLog', function(req, res, next) {
    Meal.find({ user: req.body.user, day: req.body.day }, function(err, meals) {
        if (err) return console.log(err);
        res.send(meals)
    });
});

module.exports = router;