/**
 * Created by tom on 07/08/15.
 */

var Constants = require("./../../src/constants");

var Player = function(server) {
    var self = this;

    self.x = 0;
    self.y = 0;
    self.size = 25;

    self.shape = null;
    self.stage = null;

    self.addToStage = function(stage, x, y) {
        self.stage = stage;

        self.shape = new createjs.Shape();
        self.shape.graphics.beginFill("DeepSkyBlue").drawCircle(0,0, Constants.DEFAULT_SIZE);
        self.shape.x = x;
        self.shape.y = y;
        self.stage.addChild(self.shape);
        self.stage.update();
    };

    self.movePlayer = function() {
        var diffX = self.stage.mouseX - self.shape.x;
        var diffY = self.stage.mouseY - self.shape.y;

        self.x = self.shape.x += diffX / self.size;
        self.y = self.shape.y += diffY / self.size;

        server.updatePlayerPosition(self.x, self.y);

        self.stage.update();
    };

    createjs.Ticker.addEventListener("tick", self.movePlayer);
};

module.exports = Player;