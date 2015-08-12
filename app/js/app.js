/**
 * Created by tom on 10/08/15.
 */

var Server = require("./server"),
    Arena = require("./arena");

var stage = new createjs.Stage("canvas");
createjs.Ticker.setFPS(60);
var dimensions = {
    width: $("#canvas").width(),
    height: $("#canvas").height()
};

Arena.setStage(stage);
var server = new Server();
var player = server.connect();
player.addToStage(stage, dimensions.width / 2, dimensions.height / 2);