var WebSocketServer = require("ws").Server,
    Constants = require("./src/constants"),
    ws = new WebSocketServer({host: Constants.CONFIG_SERVER_ADDRESS, port: 9000}),
    Game = require("./src/game.js"),
    EventQueue = require("./src/eventqueue.js");

var game = new Game();
EventQueue.start();

ws.on('connection', function(ws) {
    game.playerJoined(ws);
});

console.log("Server listening on port 9000");