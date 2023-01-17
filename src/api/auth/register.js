"use strict"
const express = require('express'); //Require express
const router = express.Router(); //bind Routers

const db = require('./../../lib/mysql'); //bind MySQL

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const config = require('./../../../config.json'); //bind config.json

// POST /api/auth/register
router.post('/api/auth/register', (req, res, next) => {
    db.query(
        `SELECT * FROM user WHERE LOWER(email) = LOWER(${db.escape(
        req.body.email
        )});`,
            (err, result) => {
            if (result.length) {
                return res.status(409).send({
                    success: false,
                    msg: 'This user is already in use!'
                });
            } else {
                // username is available
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    return res.status(500).send({
                        msg: err
                    });
                } else {
                    // has hashed pw => add to database
                    db.query(
                        `INSERT INTO user (firstName, lastName, username, email, password) VALUES ('${req.body.firstName}', '${req.body.lastName}', '${req.body.username}', '${req.body.email}', ${db.escape(
                        req.body.email
                    )}, ${db.escape(hash)})`,
                    (err, result) => {
                        if (err) {
                            throw err;
                            return res.status(400).send({
                                msg: err
                            });
                        }
                        return res.status(200).send({
                            success: true,
                            msg: 'The user has been registerd with us!'
                        });
                    });
                }
            });
        }
      }
    );
});

module.exports = router;