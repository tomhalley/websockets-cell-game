/**
 * Created by tom on 07/08/15.
 */
var Player = require("./player.js"),
    Constants = require("./constants.js"),
    EventQueue = require("./eventqueue.js");

var Game = function() {
    var self = this;

    var players = [];

    self.generateFood = function() {
        EventQueue.add(Constants.EVENT_FOOD_ADDED, null, {
            x: Math.random() * 200,
            y: Math.random() * 200
        });

        setTimeout(self.generateFood, (Math.random() * (5 - 2) + 2) * 1000);
    };

    self.playerJoined = function(connection) {
        var player = new Player(connection, self);
        player.sendCurrentPlayers(players);
        player.sendState();
        players.push(player);
        EventQueue.add(Constants.EVENT_PLAYER_JOINED, player.id, {
            x: player.pos_x,
            y: player.pos_y
        });
    };

    self.disconnectPlayer = function(player) {
        players.splice(players.indexOf(player), 1);
        EventQueue.add(Constants.EVENT_PLAYER_LEFT, player.id);
    };

    self.updatePlayerPosition = function(player) {
        EventQueue.add(Constants.EVENT_PLAYER_POSITION_CHANGED, player.id, {
            x: player.pos_x,
            y: player.pos_y
        });
    };

    self.generateFood();
};

module.exports = Game;