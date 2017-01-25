"use strict";

var mongoose = require("../models/user"),
    User = mongoose.model("User");
var Poll = require("../models/poll").model("Poll");
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
exports.getPolls = function(id, callback) {
    Poll.find({ 'submitter': id })
        .sort({ created_at: 'desc' })
        .populate("questions", "title answers votes")
        .exec(function(err, polls) {
            if (err) {
                console.log(err);
                callback(err, null);
            }
            console.log(polls);
            callback(null, polls);
        })

}
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