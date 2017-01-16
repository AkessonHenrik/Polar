"use strict";

var mongoose = require("mongoose"),
    Schema = mongoose.Schema;

var QuestionSchema = new Schema({
    title: { type: String, trim: true },
    answers: [{ type: String, trim: true }],
    votes: [Number]
})

module.exports = mongoose.model("Question", QuestionSchema);