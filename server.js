var WebSocketServer = require("ws").Server,
    ws = new WebSocketServer({host: "10.11.12.101", port: 9000}),
    Game = require("./src/game.js");
//
//var clientConnect = function(connection, username) {
//    console.log("connection opened from %s", username);
//
//    var userId = Math.round(Math.random() * 1000000000);
//
//    clients[userId] = connection;
//    clients[userId].username = username;
//
//    return userId;
//};
//
//var sendMessage = function(userId, body, type) {
//    var obj = {
//        type: type,
//        body: body
//    };
//
//    var message = JSON.stringify(obj);
//
//    if(!userId) {
//        for(var client in clients) {
//            clients[client].send(message);
//        }
//    } else {
//        clients[userId].send(message);
//    }
//};

ws.on('connection', function connection(ws) {
    Game.playerJoined(ws);
});

console.log("Server listening on port 9000");