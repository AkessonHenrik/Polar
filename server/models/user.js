"use strict";

var mongoose = require("mongoose"),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: { type: String, trim: true },
    email: { type: String, trim: true, unique: true },
    password: { type: String, trim: true },
    history: [{ type: Schema.Types.ObjectId, ref: "Participation" }]
})

module.exports = mongoose.model("User", UserSchema);