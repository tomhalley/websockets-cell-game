/**
 * Created by tom on 10/08/15.
 */

var Server = require('./server'),
    Arena = require('./arena'),
    Constants = require('../../src/common/constants');

// Canvas dimensions
$('#canvas')
    .height(Constants.CONFIG_CANVAS_HEIGHT)
    .width(Constants.CONFIG_CANVAS_WIDTH);

var stage = new createjs.Stage('canvas');
createjs.Ticker.setFPS(60);
createjs.Ticker.addEventListener('tick', stage);

Arena.setStage(stage);
var server = new Server();
var player = server.connect();
player.addToStage(stage, Constants.CONFIG_CANVAS_WIDTH / 2, Constants.CONFIG_CANVAS_HEIGHT / 2);