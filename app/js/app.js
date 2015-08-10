/**
 * Created by tom on 10/08/15.
 */

var Server = require("./server");

var stage = new createjs.Stage("canvas");

var server = new Server();
var player = server.connect();
player.addToStage(stage);