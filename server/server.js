"use strict";
var express = require("express"),
    app = express(),
    mongoose = require("mongoose"),
    config = require("./config/config.js"),
    bodyParser = require('body-parser');


var cors = require('cors');

// CORS configuration
app.use(cors({ origin: '*' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
console.log(config.db_url);

mongoose.Promise = global.Promise;
console.log("Connecting to database...");
mongoose.connect(config.db_url);

var db = mongoose.connection;
db.on("error", function() {
    console.log("Cannot connect to database")
});
db.once("open", function() {
    console.log("Connected to database")
});


require("./routes/users")(app);
require("./routes/auth")(app);

var registerRouter = express.Router();
var authRouter = express.Router();

require("./routes/users.js")(registerRouter);
require("./routes/auth.js")(authRouter);

app.use("/users", registerRouter);
app.use("/auth", authRouter);

var http = require('http').Server(app);

http.listen(config.server_listen_port, function() {
    console.log("Listening on port " + config.server_listen_port);
})