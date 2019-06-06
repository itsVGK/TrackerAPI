const socketio = require('socket.io');
const events = require('events');
const eventEmitter = new events.EventEmitter();

let setServer = (server) => {

    let io = socketio.listen(server);
    let myIo = io.of('/chat');
    myIo.on('connection', (socket) => {

        socket.emit('verifyUser', '');

        socket.on('set-user', (authToken) => {

        })
    })
}

module.exports = {
    setServer: setServer
}