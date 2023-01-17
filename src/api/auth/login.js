"use strict"
const express = require('express'); //Require express
const router = express.Router(); //bind Routers

const db = require('./../../lib/mysql'); //bind MySQL

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const config = require('./../../../config.json'); //bind config.json

// POST /api/v1/auth/login
router.post('/api/v1/auth/login', (req, res, next) => {
    db.query(
        `SELECT * FROM user WHERE username = ${db.escape(req.body.username)};`,
        (err, result) => {
        // user does not exists
        if (err) {
            throw err;
            return res.status(400).send({
                msg: err
            });
        }
        if (!result.length) {
            return res.status(200).send({
                success: false,
                msg: 'Username or password is incorrect!'
            });
        }
        // check password
        bcrypt.compare(
            req.body.password,
            result[0]['password'],
            (bErr, bResult) => {
            // wrong password
            if (bErr) {
                throw bErr;
                return res.status(401).send({
                    msg: 'Username or password is incorrect!'
                });
            }
            if (bResult) {
                db.query(
                    `SELECT * FROM ban_list WHERE user_id = ${db.escape(result[0]['id'])};`,
                    (err, results_bann) => {
                      // user does not exists
                        if (err) {
                            throw err;
                            return res.status(400).send({
                                success: false,
                                msg: err
                            });
                        }
                        if (!results_bann.length) {
                            const token = jwt.sign({id:result[0].id}, config.jwt,{ expiresIn: '1h' });
                            return res.status(200).send({
                                success: true,
                                msg: 'Logged in!',
                                token,
                                user: result[0]
                            });
                        }
                        return res.status(401).send({
                            success: false,
                            msg: 'You got Banned!',
                            reason: results_bann[0]['ban_reason']
                        });
                    }
                )       
            }
          }
        );
      }
    );
});

module.exports = router;