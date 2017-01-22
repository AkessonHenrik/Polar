"use strict";

var mongoose = require("mongoose"),
    Schema = mongoose.Schema;

var QuestionSchema = new Schema({
        title: { type: String, trim: true },
        answers: [{ 'value': { type: String, trim: true } }],
        votes: [Number]
    })
    /*QuestionSchema.pre('save', function(next) {
        console.log(this.answers.length)
        if (this.votes.length === 0) {
            for (var j = 0; j < this.answers.length; j++) {
                this.votes.push(0);
            }
        }
        next();
    });*/
module.exports = mongoose.model("Question", QuestionSchema);