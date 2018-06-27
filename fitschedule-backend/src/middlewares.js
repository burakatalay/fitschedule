"use strict";

const jwt    = require('jsonwebtoken');
const config = require ('./config');
const userModel = require('./models/user');

module.exports.allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', '*');
    if ('OPTIONS' == req.method) {
        res.status(200).send(200);
    }
    else {
        next();
    }
};

module.exports.checkInstructor = function(req, res, next) {
    let token = ""
    if(req.headers.authorization) {
        token = req.headers.authorization.substring(4);
    }
    if (!token)
        return res.status(401).send({
            error: 'Unauthorized',
            message: 'No token provided in the request'
        });
    jwt.verify(token, config.JwtSecret, (err, decoded) => {
        if (err) return res.status(401).send({
            error: 'Unauthorized',
            message: 'Failed to authenticate token.'
        });
        req.userId = decoded.id;
        });
        userModel.findOne({_id: req.userId}, function (err, user) {
            if(err) {
                res.sendStatus(500);
                return;
            }
            if(user.isCourseProvider == true) {
                next();
            } else {
                return res.status(401).send({
                    error: 'Unauthorized',
                    message: 'You should not be here'
                });
            }
        });
}

module.exports.checkAuthentication = function(req, res, next) {
    let token = ""
    if(req.headers.authorization) {
        token = req.headers.authorization.substring(4);
    }
    if (!token)
        return res.status(401).send({
            error: 'Unauthorized',
            message: 'No token provided in the request'
        });
    // verifies secret and checks exp
    jwt.verify(token, config.JwtSecret, (err, decoded) => {
        if (err) return res.status(401).send({
            error: 'Unauthorized',
            message: 'Failed to authenticate token.'
        });
        // if everything is good, save to request for use in other routes
        req.userId = decoded.id;
        next();
    });


};

module.exports.errorHandler = function(err, req, res, next) {
    if (res.headersSent) {
        return next(err)
    }
    res.status(500);
    res.render('error', { error: err })
};