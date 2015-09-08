/**
 * Created by tom on 07/08/15.
 */

var Player = require('./player'),
    Constants = require('./../../src/common/constants'),
    Arena = require('./arena');

var Server = function() {
    var self = this;

    var food = [];

    var socket = new WebSocket('ws://' + Constants.CONFIG_SERVER_ADDRESS + ':' + Constants.CONFIG_SERVER_PORT + '/');

    self.connect = function() {
        return new Player(self);
    };

    self.updatePlayerPosition = function(x, y) {
        self.sendMessage(Constants.EVENT_PLAYER_POSITION_CHANGED, {x:x, y:y});
    };

    self.sendMessage = function(event, data) {
        data.type = event;
        socket.send(JSON.stringify(data));
    };

    self.handleMessage = function(data) {
        if(data === undefined) {
            return;
        }

        switch(data.type)
        {
            case Constants.PLAYER_ACTIVE_PLAYERS:
                var players = data.data;
                players.every(function(player) {
                    Arena.addPlayer(player);
                });
                break;
            case Constants.PLAYER_STARTING_STATE:

                break;
            case Constants.EVENT_FOOD_ADDED:
                data = data.data;
                Arena.addFood(data.x, data.y);
                break;
            case Constants.EVENT_PLAYER_POSITION_CHANGED:
                data = data.data;
                Arena.updatePlayerPosition(data);
                break;
            case Constants.EVENT_PLAYER_JOINED:
                data = data.data;
                Arena.addPlayer(data);
                break;
            case Constants.EVENT_PLAYER_LEFT:
                data = data.data;
                Arena.removePlayer(data.id);
                break;
        }
    };

    socket.onmessage = function(event) {
        var data = JSON.parse(event.data);
        if(data instanceof Array) {
            for(var i = 0; i < data.length; i++) {
                self.handleMessage(data[i]);
            }
        } else {
            self.handleMessage(data);
        }
    };
};

module.exports = Server;