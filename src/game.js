/**
 * Created by tom on 07/08/15.
 */
var Player = require("./player.js"),
    Constants = require("./constants.js"),
    EventQueue = require("./eventqueue.js");

var Game = function() {
    var self = this;

    var players = [];

    var food = [];

    self.generateFood = function() {
        EventQueue.add(Constants.EVENT_FOOD_ADDED, null, {
            x: Math.random() * 704,
            y: Math.random() * 984
        });

        setTimeout(self.generateFood, (Math.random() * (5 - 2) + 2) * 1000);
    };

    self.playerJoined = function(connection) {
        var player = new Player(connection, self);
        player.sendCurrentPlayers(players);
        player.sendState();
        players.push(player);
        EventQueue.add(Constants.EVENT_PLAYER_JOINED, player.id, {
            id: player.id,
            x: player.x,
            y: player.y,
            size: player.size
        });
    };

    self.disconnectPlayer = function(player) {
        players.splice(players.indexOf(player), 1);
        EventQueue.add(Constants.EVENT_PLAYER_LEFT, player.id, {id: player.id});
    };

    self.updatePlayerPosition = function(player) {
        EventQueue.add(Constants.EVENT_PLAYER_POSITION_CHANGED, player.id, {
            id: player.id,
            x: player.x,
            y: player.y
        });
    };

    //self.generateFood();
};

module.exports = Game;