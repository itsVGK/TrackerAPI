"use strict"
const socketio = require('socket.io');
const events = require('events');
const eventEmitter = new events.EventEmitter();

let setServer = (server) => {

    let io = socketio.listen(server);
    let myIo = io.of('');
    myIo.on('connection', (socket) => {

        socket.emit('start', 'hi starting server');

        socket.on('updateChange',(data, issueId) => {
            console.log('change received for ', data)
            for(let id in data){
                console.log('emitting for',data[id])
                myIo.emit(data[id], issueId);
            }
        })
    })
}

module.exports = {
    setServer: setServer
}