const sleep = require('system-sleep');
const server = require('./src/server');
const PORT = process.env.PORT || 3242;
const loggerLib = require('./src/lib/logger');


server.server.listen(PORT, 'localhost'); // set port, listen for requests
server.server.on('listening', function() {
    loggerLib.success('express-test', 'running express server on ' + PORT);
    sleep(3*1000); // sleep for 10 seconds
    process.exit(0);
});
