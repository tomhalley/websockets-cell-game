/**
 * Created by tom on 11/08/15.
 */

var Arena = function() {
    var self = this;

    var stage,
        food = [],
        players = {};

    self.setStage = function(stageIn) {
        stage = stageIn;
    };

    self.addFood = function(x, y) {
        food.push({x: x, y: y});

        var color  = '#'+(Math.random()*0xFFFFFF<<0).toString(16);

        var shape = new createjs.Shape();
        shape.graphics.beginFill(color).drawCircle(0,0,5);
        shape.x = x;
        shape.y = y;
        stage.addChild(shape);
        stage.update();
    };

    self.removeFood = function() {

    };

    self.addPlayer = function(player) {
        var shape = new createjs.Shape();

        shape.graphics.beginFill('DeepSkyBlue').drawCircle(0,0, player.size);
        shape.x = player.x;
        shape.y = player.y;
        stage.addChild(shape);
        stage.update();

        player.shape = shape;
        players[player.id] = player;
    };

    self.removePlayer = function(id) {
        stage.removeChild(players[id].shape);
    };

    self.updatePlayerPosition = function(player) {
        createjs.Tween.get(players[player.id].shape)
            .to({x: player.x, y: player.y});
    };
};

module.exports = new Arena();