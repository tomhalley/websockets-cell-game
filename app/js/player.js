/**
 * Created by tom on 07/08/15.
 */

var Player = function() {
    var self = this;

    self.pos_x = 0;
    self.pos_y = 0;
    self.size = 10;

    self.updatePosition = function() {
        Server.updatePlayerPosition(self);
    }
};

var player = new Player();