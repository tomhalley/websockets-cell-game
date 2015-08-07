/**
 * Created by tom on 07/08/15.
 */

var Game = require("./game.js"),
    Constants = require("./constants.js"),
    EventEmitter = require('events').EventEmitter;

var Player = function(conn) {
    var self = this;

    self.pos_x = Constants.DEFAULT_POSITION_X;
    self.pos_y = Constants.DEFAULT_POSITION_Y;
    self.size = Constants.DEFAULT_SIZE;

    var handleMessage = function(message) {
        switch(message.type)
        {
            case Constants.PLAYER_POSITION_CHANGED:
                EventEmitter.emit(Constants.PLAYER_POSITION_CHANGED, self);
                break;
        }
    };

    var sendMessage = function(message) {
        conn.send(JSON.stringify(message));
    };

    self.sendCurrentPlayers = function(players) {
        var player_states = [];
        players.every(function(p) {
            player_states.push(p.getCurrentState());
        });

        sendMessage({
            type: Constants.PLAYER_ACTIVE_PLAYERS,
            data: player_states
        })
    };

    self.sendState = function() {
        sendMessage({
            type: Constants.PLAYER_STARTING_STATE,
            data: self.getCurrentState()
        });
    };

    self.getCurrentState = function() {
        return {
            pos_x: self.pos_x,
            pos_y: self.pos_y,
            size: self.size
        }
    };

    conn.on('message', function(message) {
        message = JSON.parse(message);
        handleMessage(message);
    });

    conn.on('close', function() {
        console.log("Hello World!");
        Game.disconnectPlayer(self);
    });
};

module.exports = Player;