/**
 * Created by tom on 14/08/15.
 */
var ServiceLocator = function() {
    var self = this;

    var game;
    var eventQueue;

    self.setGame = function(gameIn) {
        game = gameIn;
        return self;
    };

    self.getGame = function() {
        return game;
    };

    self.setEventQueue = function(eventQueueIn) {
        eventQueue = eventQueueIn;
        return self;
    };

    self.getEventQueue = function() {
        return eventQueue;
    };
};

module.exports = new ServiceLocator();