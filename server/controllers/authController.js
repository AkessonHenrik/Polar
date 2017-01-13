"use strict";

var mongoose = require("../models/profile"),
    Profile = mongoose.model("Profile");

exports.authentify = function(data, callback) {
    Profile.findOne({ username: data.username }, function(err, profile) {
        if (err || !profile) {
            callback({ 'Error': 'Invalid Credentials' });
        } else {
            callback(null, profile);
        }
    })
}