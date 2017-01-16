"use strict";

var mongoose = require("mongoose"),
    Schema = mongoose.Schema;

var QuestionSchema = new Schema({
    title: { type: String, trim: true },
    answers: [{ type: String, trim: true }],
    votes: [Number]
})
QuestionSchema.pre('save', function(next) {
    if (this.votes.length === 0) {
        this.answers.forEach(a => {
            this.votes.push(0);
        })
    }
    next();
});
module.exports = mongoose.model("Question", QuestionSchema);