const loggerLib = require('../lib/logger'); //require Logger

const mysql = require('mysql'); //require mysql

const config = require('./../../config.json');

var conn;
if (config.local)
{
    conn = mysql.createConnection({
        host: 'localhost', // hostname
        user: 'root', // user
        password: '', // password
        database: config.mysql.database // database
    });
    loggerLib.info('MySQL', 'Running in local mode');
} else {
    conn = mysql.createConnection({
        host: config.mysql.hostname, // hostname
        user: config.mysql.username, // user
        password: config.mysql.password, // password
        database: config.mysql.database // database
    });
}

conn.connect(function(err) {
    if (err) throw err;
    loggerLib.success('MySQL', 'Connected with MySQL DB!');
});


module.exports = conn;
