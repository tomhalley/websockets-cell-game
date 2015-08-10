/**
 * Created by tom on 07/08/15.
 */

var Player = require("./player"),
    Constants = require("./../../src/constants");

module.exports = function() {
    var self = this;

    self.pos_x = null;
    self.pos_y = null;
    self.size = null;

    var socket = new WebSocket("ws://" + Constants.CONFIG_SERVER_ADDRESS + ":" + Constants.CONFIG_SERVER_PORT + "/");

    self.connect = function() {
        return new Player(socket);
    };

    self.updatePlayerPosition = function(player) {

    };

    self.handleMessage = function(event, data) {
        console.log(data.type);
        switch(event)
        {
            case "PLAYER_ACTIVE_PLAYERS":

                break;
            case "PLAYER_STARTING_STATE":
                self.pos_x = data.pos_x;
                self.pos_y = data.pos_y;
                self.size = data.size;
                break;
        }
    };

    socket.onmessage = function(event) {
        var data = JSON.parse(event.data);
        self.handleMessage(event.type, data);
    };

    //socket.onopen = function(event) {
    //    socket.send(JSON.stringify({type: constants.CONNECT, username: username}));
    //};
    //
    //socket.onclose = function() {
    //    alert("You were disconnected from the server");
    //};
    //
    //socket.onmessage = function(event) {
    //    var data = JSON.parse(event.data);
    //
    //    switch(data.type)
    //    {
    //        case constants.CLIENT_LIST:
    //            refreshClientsList(data.body);
    //            break;
    //        case constants.USER_ID:
    //            userId = data.body;
    //            break;
    //        case constants.MESSAGE:
    //            alert(data.body.username + ": " + data.body.message);
    //            break;
    //    }
    //};
    //
    //socket.onerror = function(event) {
    //    console.log(event);
    //};
    //
    //window.onbeforeunload = function() {
    //    socket.onclose = function () {};
    //    socket.close()
    //};
    //
    //$("#send-message").click(function(e) {
    //    console.log("Form submitted");
    //    e.preventDefault();
    //
    //    var targetUserId = $("#chatbox").find('select :selected').val();
    //
    //    console.log(targetUserId);
    //
    //    var message = $("#message").val();
    //
    //    var obj = {
    //        type: constants.MESSAGE,
    //        target: targetUserId,
    //        userId: userId,
    //        message: message
    //    };
    //
    //    socket.send(JSON.stringify(obj));
    //});
};