/**
 * Created by tom on 07/08/15.
 */
var Player = require('./player.js'),
    Constants = require('./common/constants.js'),
    ServiceLocator = require('./common/servicelocator');

var Game = function() {
    var self = this;
    var players = [];
    var eventQueue = ServiceLocator.getEventQueue();

    self.start = function() {
        self.generateFood();
    };

    self.generateFood = function() {
        eventQueue.add(Constants.EVENT_FOOD_ADDED, null, {
            x: Math.random() * Constants.CONFIG_CANVAS_WIDTH,
            y: Math.random() * Constants.CONFIG_CANVAS_HEIGHT
        });

        setTimeout(self.generateFood, (Math.random() * (5 - 2) + 2) * 1000);
    };

    self.playerJoined = function(connection) {
        var player = new Player(connection, self);
        player.sendCurrentPlayers(players);
        player.sendState();
        players.push(player);
        eventQueue.add(Constants.EVENT_PLAYER_JOINED, player.id, {
            id: player.id,
            x: player.x,
            y: player.y,
            size: player.size
        });
    };

    self.disconnectPlayer = function(player) {
        players.splice(players.indexOf(player), 1);
        eventQueue.add(Constants.EVENT_PLAYER_LEFT, player.id, {id: player.id});
    };

    self.updatePlayerPosition = function(player) {
        eventQueue.add(Constants.EVENT_PLAYER_POSITION_CHANGED, player.id, {
            id: player.id,
            x: player.x,
            y: player.y
        });
    };
};

module.exports = Game;