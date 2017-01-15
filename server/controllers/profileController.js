"use strict";

var mongoose = require("../models/profile"),
    Profile = mongoose.model("Profile");

/**
 * Add new profile
 * @param {Object} profile: The profile
 * @param {Function} callback(err, result): called once finished
 */
exports.addProfile = function(data, callback) {
    var profile = new Profile(data);
    profile.save(function(err, result) {
        if (err) {
            callback(err);
            return;
        }

        callback(null, result);
    });
};
exports.getProfile = function(id, callback) {
    Profile.findById(id)
        .exec(function(err, profile) {
            if (err) {
                callback(err);
                return;
            }

            callback(null, {
                'email': profile.email,
                'username': profile.username,
                '_id': profile._id
            });
        })
}