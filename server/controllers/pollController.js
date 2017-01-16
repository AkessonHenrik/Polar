"use strict";

var mongoose = require("../models/poll"),
    Poll = mongoose.model("Poll");

/**
 * Add new poll
 * @param {Object} poll: Poll to add
 * @param {Function} callback(err, result): called once finished
 */
exports.addPoll = function(data, callback) {
    var poll = new Poll(data);
    poll.save((err, result) => {
        if (err) {
            callback(err);
            return;
        }
        callback(null, result);
    })
}

exports.getPoll = function(id, callback) {
    Poll.findById(id)
        .exec(function(err, poll) {
            if (err) {
                callback(err);
                return;
            }
            callback(null, poll);
        })
}