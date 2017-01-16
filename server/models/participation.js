"use strict";

var mongoose = require("mongoose"),
    Schema = mongoose.Schema;

var ParticipationSchema = new Schema({
    poll: { type: Schema.Types.ObjectId, ref: "Poll" },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    answer_ids: [Number], // Answer id for each question of the poll (i.e 1st answer, 2nd answer ...)
    created_at: { type: Date }
})

ParticipationSchema.pre('save', function(next) {
    if (!this.created_at) {
        this.created_at = new Date();
    }
    next();
});

module.exports = mongoose.model("Participation", ParticipationSchema);