"use strict";

var mongoose = require("../models/user"),
    User = mongoose.model("User");

/**
 * Add new user
 * @param {Object} user: The user
 * @param {Function} callback(err, result): called once finished
 */
exports.addUser = function(data, callback) {
    var user = new User(data);
    user.save(function(err, result) {
        if (err) {
            callback(err);
            return;
        }

        callback(null, result);
    });

};
exports.getUser = function(id, callback) {
    User.findById(id)
        .exec(function(err, user) {
            if (err) {
                callback(err);
                return;
            }

            callback(null, {
                'email': user.email,
                'name': user.name,
                '_id': user._id
            });
        })
}