"use strict";

var mongoose = require("mongoose"),
    Schema = mongoose.Schema;

var PollSchema = new Schema({
    title: { type: String, trim: true },
    submitter: { type: Schema.Types.ObjectId, ref: "User" },
    questions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
    keywords: [{ type: String, trim: true }],
    ongoing: Boolean,
    shortcode: String,
    created_at: { type: Date },
    updated_at: { type: Date }
})

PollSchema.pre('save', function(next) {
    var now = new Date();
    this.updated_at = now;
    if (!this.created_at) {
        this.created_at = now;
    }
    if (!this.shortcode) {
        this.shortcode = "";
        var possible = "abcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 6; i++)
            this.shortcode += possible.charAt(Math.floor(Math.random() * possible.length));

        this.shortcode;
    }
    next();
});

module.exports = mongoose.model("Poll", PollSchema);