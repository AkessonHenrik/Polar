"use strict";
var express = require("express"),
    app = express(),
    mongoose = require("mongoose"),
    config = require("./config/config.js"),
    bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
console.log(config.db_url);

mongoose.Promise = global.Promise;
console.log("Connecting to database...");
mongoose.connect(config.db_url);

var db = mongoose.connection;
db.on("error", function () {
    console.log("Cannot connect to database")
});
db.once("open", function () {
    console.log("Connected to database")
});


require("./routes/users")(app);

var registerRouter = express.Router();

require("./routes/users.js")(registerRouter);

app.use("/users", registerRouter);
var http = require('http').Server(app);

http.listen(config.server_listen_port, function () {
    console.log("Listening on port " + config.server_listen_port);
})