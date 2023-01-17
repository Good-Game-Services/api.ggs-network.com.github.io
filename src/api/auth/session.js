"use strict"
const express = require('express'); //Require express
const router = express.Router(); //bind Routers

const db = require('./../../lib/mysql'); //bind MySQL

const jwt = require('jsonwebtoken');

const config = require('../../config'); //bind config.json

// POST /api/v1/auth/check-session
router.post('/api/v1/auth/check-session', (req, res, next) => {
    const theToken = req.body.token;
    const decoded = jwt.verify(theToken, config.jwt);
  
    db.query('SELECT * FROM user where id=?', decoded.id, function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results[0], message: 'Fetch Successfully.' });
    });
});

module.exports = router;