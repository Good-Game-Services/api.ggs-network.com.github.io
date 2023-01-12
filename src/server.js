const loggerLib = require('./lib/logger'); //require Logger
const config = require('./../config.json');
const PORT = process.env.PORT || 3242;

//require default
const path = require('path');
const bodyParser = require('body-parser');
const sessions = require('express-session');

const express = require('express'); //require webserver
//const cloudflare = require('cloudflare-express'); //require cloudlfare reverse proxy middleware

//const ws = require('ws'); //reqiore ws

//const wsServer = new ws.Server({ noServer: true });
//wsServer.on('connection', socket => {
//    socket.on('message', message => console.log(message)); // Set up a headless websocket server that prints any events that come in.
//});

const app = express(); //set webserver
app.use(bodyParser.urlencoded({extended : true})); // parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse requests of content-type - application/json

//app.use(cloudflare.restore({update_on_start:true})); //set cloudlfare reverse proxy middleware

app.use((req, res, next) => {
    loggerLib.log('cloudflare-proxy', 'remote transfare to ip: ' + req.cf_ip)
    next(); // this will invoke next middleware function
});

const http = require('http'); //set dedicated server
const server = http.createServer(app); //set server


function main() {
    server.listen(PORT, 'localhost'); // set port, listen for requests
    server.on('listening', function() {
        loggerLib.success('express', 'runing express server on ' + PORT);
    });
    //server.on('upgrade', (request, socket, head) => {
    //    wsServer.handleUpgrade(request, socket, head, socket => {
    //        wsServer.emit('connection', socket, request);
    //        loggerLib.success('express - ws', 'transfer')
    //    });
    //});
}

module.exports = {
    main: main
}