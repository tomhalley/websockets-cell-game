/**
 * Created by tom on 07/08/15.
 */
var Player = require("./player.js");

var players = [];

module.exports = {
    playerJoined: function(connection) {
        var player = new Player(connection);
        player.sendCurrentPlayers(players);
        players.push(player);
        player.sendState();
    },
    disconnectPlayer: function(player) {
        players.splice(players.indexOf(player), 1);
    },
    updatePlayerPosition: function(player) {

    }
};