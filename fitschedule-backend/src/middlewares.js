"use strict";

const jwt    = require('jsonwebtoken');
const config = require ('./config');

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

module.exports.checkInstructor = (req, res, next) => {
    const isInstructor = req.body.isInstructor

    if (!isInstructor)
        return res.status(401).send({
            error: 'Unauthorized',
            message: 'No token provided in the request'
        });

    next();
};

module.exports.checkAuthentication = function(req, res, next) {
    const token = req.headers['x-access-token'];
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