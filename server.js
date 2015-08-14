var WebSocketServer = require("ws").Server,
    Constants = require("./src/common/constants"),
    ServiceLocator = require("./src/common/servicelocator"),
    ws = new WebSocketServer({host: Constants.CONFIG_SERVER_ADDRESS, port: Constants.CONFIG_SERVER_PORT}),
    Game = require("./src/game.js"),
    EventQueue = require("./src/eventqueue.js");

ServiceLocator
    .setEventQueue(new EventQueue())
    .setGame(new Game());

ServiceLocator.getEventQueue().start();

ws.on('connection', function(ws) {
    ServiceLocator.getGame().playerJoined(ws);
});

console.log("Server listening on port " + Constants.CONFIG_SERVER_PORT);