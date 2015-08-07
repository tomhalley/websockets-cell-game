/**
 * Created by tom on 07/08/15.
 */
var Player = require("./player.js");

var Game = function() {
    var self = this;

    var players = [];

    self.playerJoined = function(connection) {
        var player = new Player(connection, self);
        player.sendCurrentPlayers(players);
        players.push(player);
        player.sendState();
    };

    self.disconnectPlayer = function(player) {
        players.splice(players.indexOf(player), 1);
    };

    self.updatePlayerPosition = function(player) {

    }
};

module.exports = Game;