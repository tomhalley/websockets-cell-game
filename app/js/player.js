/**
 * Created by tom on 07/08/15.
 */

var Player = function() {
    var self = this;

    self.pos_x = 0;
    self.pos_y = 0;
    self.size = 10;

    self.init = function() {

    };

    self.updatePosition = function() {
        Server.updatePlayerPosition(self);
    };

    self.addToStage = function(stage) {

        var circle = new createjs.Shape();
        circle.graphics.beginFill("DeepSkyBlue").drawCircle(0,0,50);
        circle.x = self.pos_x;
        circle.y = self.pos_y;
        stage.addChild(circle);

        stage.update();
    };
};

var player = new Player();