"use strict";

var mongoose = require("mongoose"),
    Schema = mongoose.Schema;

var PollSchema = new Schema({
    title: { type: String, trim: true },
    submitter: { type: Schema.Types.ObjectId, ref: "User" },
    questions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
    keywords: [{ type: String, trim: true }],
    public: Boolean,
    created_at: { type: Date },
    updated_at: { type: Date }
})

PollSchema.pre('save', function(next) {
    var now = new Date();
    this.updated_at = now;
    if (!this.created_at) {
        this.created_at = now;
    }
    next();
});

module.exports = mongoose.model("Poll", PollSchema);