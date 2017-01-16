"use strict";
var pollController = require('../controllers/pollController');
module.exports = function(router) {
    router.route("/:id")
        .get(function(req, res) {
            pollController.getPoll(req.params.id, (err, result) => {
                if (err) {
                    res.status(404).send(err);
                } else {
                    res.status(200).send(result);
                }
            })
        })
    router.route("/")
        .get(function(req, res) {
            pollController.getPolls((err, result) => {
                if (err) {
                    res.status(404).send(err);
                } else {
                    res.status(200).send(result);
                }
            })
        })
    router.route("/")
        .post(function(req, res) {
            pollController.addPoll(req.body, (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500).send({ 'Error': err });
                    return;
                }
                console.log("Saved");
                console.log(result);
                res.status(200).send(result);
            })
        })
    router.route("/:id")
        .patch(function(req, res) {
            console.log("Received PATCH");
            console.log(req.body);
            pollController.updatePoll(req.params.id, req.body, (err, result) => {
                if (err) {
                    res.status(500).send({ 'Error': err });
                    return;
                } else {
                    console.log("Sending result");
                    res.status(200).send({ 'Msg': 'Participation saved' })
                }
            });
        })
}