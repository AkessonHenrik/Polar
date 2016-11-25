"use strict";
var profileController = require('../controllers/profileController');
var bodyParser = require('body-parser');
module.exports = function (router) {
    router.route("/:email/:username/:password")
        .post(function (req, res) {
            profileController.addProfile({ 
                "email": req.params.email, 
                "username": req.params.username, 
                "password": req.params.password 
            }, function (err, result) {
                console.log(err);
            });

            res.status(200).send("Got your request");
        });
    router.route("/:username")
        .get(function(req, res) {
            profileController.getProfile(req.params.username, function(err, result) {
                res.status(200).send(result);
            })
        })
}