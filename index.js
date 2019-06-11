"use strict"
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const http = require('http');
const morgan = require('morgan');

const appConfig = require('./config/appConfig');
const app = express();
const handler = require('./app/middleware/appErrorHandler');
const loggerIp = require('./app/middleware/routeLogger');

app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(cookieParser());
app.use(loggerIp.logIp);
app.use(handler.globalErrorHandler)

const modelspath = './app/models';
const routespath = './app/routes';

app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    next();
});

fs.readdirSync(modelspath).forEach((file) => {
    if (~file.indexOf('.js')) {
        console.log(modelspath + '/' + file)
        require(modelspath + '/' + file);
    }
});

fs.readdirSync(routespath).forEach((file) => {
    if (~file.indexOf('.js')) {
        console.log(routespath + '/' + file)
        let route = require(routespath + '/' + file);
        route.setRouter(app);
    }
})

// console.log('gng to call not found handler')
app.use(handler.globalNotFoundHandler)

const server = http.createServer(app);

server.listen(appConfig.port);
server.on('error', onError);
server.on('listening', onListening);

const socketLib = require('./app/libs/socketLib');
const socketServer = socketLib.setServer(server);

function onError(error) {
    console.log('server on error')

    if (error.syscall !== 'listen') {
        throw error;
    }
    switch (error.code) {
        case 'EACCES':
            // logger.error(error.code + ':elavated privileges required', 'serverOnErrorHandler', 10);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            // logger.error(error.code + ':port is already in use.', 'serverOnErrorHandler', 10);
            process.exit(1);
            break;
        default:
            // logger.error(error.code + ':some unknown error occured', 'serverOnErrorHandler', 10);
            throw error;
    }
}

function onListening() {
    var addr = server.address()
    var bind = typeof addr === 'string'
        ? 'pipe' + addr
        : 'port' + addr.port;
    ('Listening on ' + bind);
    console.log('server on Listening')
    let db = mongoose.connect(appConfig.db.uri, 
        {useNewUrlParser:true})
        .then(()=>console.log*'MongoDb Connected')
        .catch(err=>console.log(err));
}

process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
    // application specific logging, throwing an error, or other logic here
});

/**
 * database connection settings
 */
mongoose.connection.on('error', function (err) {
    console.log('database connection error');
    console.log(err)
    // logger.error(err,
    // 'mongoose connection on error handler', 10)
    //process.exit(1)
}); // end mongoose connection error

mongoose.connection.on('open', function (err) {
    if (err) {
        console.log("database error");
        console.log(err);
        // logger.error(err, 'mongoose connection open handler', 10)
    } else {
        console.log("database connection open success");
        // logger.info("database connection open",
        // 'database connection open handler', 10)
    }
    //process.exit(1)
}); // enr mongoose connection open handler

module.exports = app;