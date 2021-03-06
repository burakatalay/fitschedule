"use strict";

const express    = require('express');
const bodyParser = require('body-parser');
const helmet     = require('helmet');

const middlewares = require('./middlewares');

const auth  = require('./routes/auth');
const course = require('./routes/course');
const courseprovider = require('./routes/courseprovider');
const schedule = require('./routes/schedule');
const review = require('./routes/review');

const api = express();


// Adding Basic Middlewares
api.use(helmet());
api.use(bodyParser.json());
api.use(bodyParser.urlencoded({ extended: false }));
api.use(middlewares.allowCrossDomain);


// Basic route
api.get('/', (req, res) => {
    res.json({
        name: 'Fitschedule Backend'
    });
});

// API routes
api.use('/auth'  , auth);
api.use('/courses', course);
api.use('/courseprovider', courseprovider);
api.use('/schedule', schedule);
api.use('/review', review);

module.exports = api;