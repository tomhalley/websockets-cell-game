var WebSocketServer = require("ws").Server,
    ws = new WebSocketServer({host: "10.11.12.101", port: 9000}),
    Game = require("./src/game.js");

var game = new Game();

ws.on('connection', function(ws) {
    game.playerJoined(ws);
});

console.log("Server listening on port 9000");