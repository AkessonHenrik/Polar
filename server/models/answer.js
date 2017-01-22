"use strict";

var mongoose = require("mongoose"),
    Schema = mongoose.Schema;

var AnswerSchema = new Schema({
    value: { type: String, trim: true }
})
module.exports = mongoose.model("Answer", AnswerSchema);