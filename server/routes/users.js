"use strict";
var profileController = require('../controllers/profileController');
module.exports = function(router) {
    router.route("/")
        .post(function(req, res) {
            console.log("Trying to register");
            console.log(req.body);
            profileController.addProfile(
                req.body,
                function(err, result) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(result);
                    }
                    res.status(200).send(result);
                });

        });
    router.route("/:username")
        .get(function(req, res) {
            profileController.getProfile(req.params.username, function(err, result) {
                res.status(200).send(result);
            })
        })
}