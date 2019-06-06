const socketio = require('socket.io');
const events = require('events');
const eventEmitter = new events.EventEmitter();

let setServer = (server) => {

    let io = socketio.listen(server);
    let myIo = io.of('');
    myIo.on('connection', (socket) => {

        socket.emit('start', 'hi starting server');

        socket.on('updateChange', (data) => {
            console.log(data)
            socket.emit('getNote', data);
        })
    })
}

module.exports = {
    setServer: setServer
}