/**
 * Web socket handler
 */

"use strict";

var config = require("./config/config");
var connected_clients = [];


module.exports = {
    update: function(shortcode, new_data) {
        console.log("update");
        connected_clients.forEach(client => {
            if (client.shortcode === shortcode) {
                client.socket.emit("update", new_data);
            }
        })
    },
    socket: function(socketio) {

        // connection event
        socketio.on("connection", function(socket) {
            socket.on("subscribe", function(data) {
                connected_clients.push({ 'shortcode': data.shortcode, 'socket': socket });
                console.log("Socket: " + socket + " , subsribed to " + data.shortcode);
            })
        });
    }
};