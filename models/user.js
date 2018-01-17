var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var Schema = mongoose.Schema;

var userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 99
    },
    email: { // TODO: Need to add email validation
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        maxlength: 99
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 99
    },
    activities: [{ type: Schema.ObjectId, ref: 'Activity' }],
    goals: [{ type: Schema.ObjectId, ref: 'Goal' }]
});

// Override 'toJSON' to prevent the password from being returned with the user
userSchema.set('toJSON', {
    transform: function(doc, ret, options) {
        var returnJson = {
            id: ret._id,
            email: ret.email,
            name: ret.name
        };
        return returnJson;
    }
});

userSchema.methods.authenticated = function(password, callback) {
    bcrypt.compare(password, this.password, function(err, res) {
        if (err) {
            callback(err);
        } else {
            callback(null, res ? this : false);
        }
    });
}

// Mongoose's version of a beforeCreate hook
userSchema.pre('save', function(next) {
    var hash = bcrypt.hashSync(this.password, 10);
    // store the hash as the user's password
    this.password = hash;
    next();
});

var activitySchema = new mongoose.Schema({
    day: {
        type: Date,
        required: true
    },
    start: {
        type: String,
        required: true
    },
    finish: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    subCategory: {
        type: String
    },
    notes: {
        type: String
    },
    location: {
        type: String
    },
    user: [{ type: Schema.ObjectId, ref: 'User' }],

});

var goalSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    subCategory: {
        type: String
    },
    length: {
        type: Number,
        required: true
    },
    user: [{ type: Schema.ObjectId, ref: 'User' }]
})

var mealSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    mealType: {
        type: String,
        required: true
    },
    calories: {
        type: Number,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    user: [{ type: Schema.ObjectId, ref: 'User' }]
})

var User = mongoose.model('User', userSchema);
var Activity = mongoose.model('Activity', activitySchema);
var Goal = mongoose.model('Goal', goalSchema);
var Meal = mongoose.model('Meal', mealSchema);

module.exports = {
    User: User,
    Activity: Activity,
    Goal: Goal,
    Meal: Meal
};