"use strict";

var mongoose = require("mongoose"),
    Schema = mongoose.Schema;

var ProfileSchema = new Schema({
    email: { type: String, trim: true },
    username: { type: String, trim: true },
    password: { type: String, trim: true }
})

module.exports = mongoose.model("Profile", ProfileSchema);
