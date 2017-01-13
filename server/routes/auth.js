"use strict";
var authRouter = require('../controllers/authController');
module.exports = function(router) {
    router.route("/")
        .post(function(req, res) {
            console.log("Trying to authentify:");
            console.log(req.body);
            authRouter.authentify(
                req.body,
                function(err, result) {
                    if (err) {
                        console.log("ERROR");
                        console.log(err);
                        res.status(401).send(err);
                    } else {
                        console.log(result);
                        res.status(200).send(result);
                    }
                }
            )
        })
}