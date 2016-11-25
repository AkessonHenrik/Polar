"use strict";

var mongoose = require("../models/profile"),
    Profile = mongoose.model("Profile");

/**
 * Add new profile
 * @param {Object} profile: The profile
 * @param {Function} callback(err, result): called once finished
 */
exports.addProfile = function (data, callback) {
    var profile = new Profile(data);
    profile.save(function (err, result) {
        if (err) {
            callback(err);
            return;
        }

        callback(null, result);
    });
};
exports.getProfile = function (param_username, callback) {
    Profile.find({username: param_username})
        .exec(function(err, profile) {
            if(err) {
                callback(err);
                return;
            }
            callback(null, profile);
        })
}