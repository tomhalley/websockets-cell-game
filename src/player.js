/**
 * Created by tom on 07/08/15.
 */

var Constants = require("./constants.js"),
    EventQueue = require("./eventqueue.js");

var Player = function(conn, game) {
    var self = this;

    self.id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });

    self.x = Constants.DEFAULT_POSITION_X;
    self.y = Constants.DEFAULT_POSITION_Y;
    self.size = Constants.DEFAULT_SIZE;
    self.color = '#'+(Math.random()*0xFFFFFF<<0).toString(16);

    var handleMessage = function(message) {
        switch(message.type)
        {
            case Constants.EVENT_PLAYER_POSITION_CHANGED:
                self.x = message.x;
                self.y = message.y;
                game.updatePlayerPosition(self);
                break;
        }
    };

    var sendMessage = function(message) {
        conn.send(JSON.stringify(message));
    };

    var handleHeartbeat = function(data) {
        if(data.playerId !== self.id) {
            sendMessage(data);
        }
    };

    self.sendCurrentPlayers = function(players) {
        var player_states = [];
        players.every(function(p) {
            player_states.push(p.getCurrentState());
        });

        sendMessage({
            type: Constants.PLAYER_ACTIVE_PLAYERS,
            data: player_states
        });
    };

    self.sendState = function() {
        sendMessage({
            type: Constants.PLAYER_STARTING_STATE,
            data: self.getCurrentState()
        });
    };

    self.getCurrentState = function() {
        return {
            id: self.id,
            x: self.x,
            y: self.y,
            size: self.size,
            color: self.color
        }
    };

    conn.on('message', function(message) {
        message = JSON.parse(message);
        handleMessage(message);
    });

    conn.on('close', function() {
        game.disconnectPlayer(self);
        EventQueue.removeListener("tick", handleHeartbeat);
    });

    EventQueue.on("tick", handleHeartbeat);
};

module.exports = Player;