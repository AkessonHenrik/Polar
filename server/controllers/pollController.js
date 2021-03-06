"use strict";

var mongoose = require("../models/poll"),
    Poll = mongoose.model("Poll");
var Question = require("../models/question").model("Question");
var Participation = require("../models/participation").model("Participation");
var socket = require("../socket");
/**
 * Add new poll
 * @param {Object} poll: Poll to add
 * @param {Function} callback(err, result): called once finished
 */
exports.addPoll = function(data, callback) {
    console.log(data);
    var dataToAdd = {
        title: data.title,
        submitter: data.submitter,
        questions: [],
        keywords: data.keywords,
        ongoing: false
    }
    data.questions.forEach(question => {
        var q = new Question(question);
        q.save();
        dataToAdd.questions.push(q);
    })
    var poll = new Poll(dataToAdd);
    poll.save((err, result) => {
        if (err) {
            callback(err);
            return;
        }
        callback(null, result);
    })
}

exports.getPoll = function(shortcode, callback) {
    Poll.find({ 'shortcode': shortcode })
        .populate("submitter", "name")
        .populate("questions", "title answers votes")
        .exec(function(err, poll) {
            if (err) {
                callback(err);
                return;
            }
            callback(null, poll);
        })
}
exports.getPolls = function(callback) {
    Poll.find({})
        .populate("submitter", "name")
        .populate("questions", "title answers votes")
        .exec(function(err, polls) {
            if (err) {
                callback(err);
                return;
            }
            callback(null, polls);
        })
}

exports.updatePoll = function(pollId, data, callback) {
    var answers = data.selectedAnswers;
    if (data.polar_id) {
        var participation = new Participation({
            'poll': pollId,
            'user': data.polar_id
        });
        participation.save();
    }

    Poll.findById(pollId)
        .populate('questions')
        .exec((err, poll) => {
            if (err) {
                callback(err);
                return;
            }
            var new_data = poll.questions.map(question => { return question.votes });
            console.log("NEWDATA");
            console.log(new_data);
            for (var i = 0; i < answers.length; i++) {
                poll.questions[i].votes[answers[i]]++;
                new_data[i] = poll.questions[i].votes;
            }
            console.log("NEW DATA AFTER");
            console.log(new_data);
            poll.questions.forEach(q => {
                q.markModified('votes');
                q.save((err, result) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(result);
                    }
                });
            })
            poll.questions.forEach(q => {
                console.log(q.votes);
            })
            console.log(socket.update);
            socket.update(poll.shortcode, new_data);
            callback(null);
        })
}