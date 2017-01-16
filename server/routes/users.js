"use strict";
var userController = require('../controllers/userController');
module.exports = function(router) {
    router.route("/")
        .post(function(req, res) {
            console.log("Trying to register");
            console.log(req.body);
            userController.addUser(
                req.body,
                function(err, result) {
                    if (err) {
                        console.log(err);
                        res.status(500).send({ 'Error': err });
                        return;
                    }
                    console.log("Saved");
                    console.log(result);

                    res.status(200).send(result);
                });

        });
    router.route("/:id")
        .get(function(req, res) {
            userController.getUser(req.params.username, function(err, result) {
                res.status(200).send(result);
            })
        })
}