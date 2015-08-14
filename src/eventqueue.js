/**
 * Created by tom on 11/08/15.
 */

var EventEmitter = require("events").EventEmitter;

var EventQueue = function() {
    var self = this,
        queue = [];

    self.start = function() {
        self.loop();
    };

    self.loop = function() {
        if(queue.length > 0) {
            self.emit("tick", queue);
            queue.length = 0;
        }

        setTimeout(self.loop, 1000 / 60);
    };

    self.add = function(eventType, playerId, data) {
        queue.push({
            type: eventType,
            playerId: playerId,
            data: data
        });
    };
};

EventQueue.prototype.__proto__ = EventEmitter.prototype;

module.exports = EventQueue;