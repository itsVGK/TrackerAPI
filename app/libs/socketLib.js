const socketio = require('socket.io');
const events = require('events');
const eventEmitter = new events.EventEmitter();

let setServer = (server) => {

    let io = socketio.listen(server);
    let myIo = io.of('');
    myIo.on('connection', (socket) => {

        socket.emit('start', 'hi starting server');

        socket.on('updateChange', (data, issueId) => {
            for(let id in data){
                myIo.emit(data[id], issueId);
            }
        })
    })
}

module.exports = {
    setServer: setServer
}