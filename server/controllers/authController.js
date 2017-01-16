"use strict";

var mongoose = require("../models/user"),
    Profile = mongoose.model("User");

exports.authentify = function(data, callback) {
    User.findOne({ email: data.email }, function(err, user) {
        if (err || !user) {
            callback({ 'Error': 'Invalid Credentials' });
        } else {
            callback(null, {
                'email': user.email,
                'name': user.name,
                '_id': user._id
            });
        }
    })
}