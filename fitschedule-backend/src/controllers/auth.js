"use strict";

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const config = require('../config');
const UserModel = require('../models/user');
const ScheduleModel = require('../models/schedule');
const CourseModel = require('../models/course');

const login = (req, res) => {
    if (!Object.prototype.hasOwnProperty.call(req.body, 'password')) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body must contain a password property'
    });

    if (!Object.prototype.hasOwnProperty.call(req.body, 'username')) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body must contain a username property'
    });

    UserModel.findOne({username: req.body.username}).exec()
        .then(user => {
            // check if the password is valid
            const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);
            if (!isPasswordValid) return res.status(401).send({token: null});

            // if user is found and password is valid
            // create a token
            const token = jwt.sign({id: user._id, username: user.username}, config.JwtSecret, {
                expiresIn: 86400 // expires in 24 hours
            });

            res.status(200).json({token: token});

        })
        .catch(error => res.status(404).json({
            error: 'User Not Found',
            message: error.message
        }));

};


const register = (req, res) => {
    if (!Object.prototype.hasOwnProperty.call(req.body, 'password')) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body must contain a password property'
    });

    if (!Object.prototype.hasOwnProperty.call(req.body, 'username')) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body must contain a username property'
    });
    const schedule = Object.assign({courses: []});
    const user = Object.assign(req.body, {password: bcrypt.hashSync(req.body.password, 8)});

    ScheduleModel.create(schedule)
        .then(schedule => {
            console.log('[AuthController] Success creating new schedule', schedule);
            user.schedule = schedule.id;
            UserModel.create(user)
                .then(user => {
                    console.log('[AuthController] Success creating new user', user);
                    // if user is registered without errors
                    // create a token
                    const token = jwt.sign({id: user._id, username: user.username}, config.JwtSecret, {
                        expiresIn: 86400 // expires in 24 hours
                    });

                    res.status(200).json({token: token});


                })
                .catch(error => {
                    if (error.code == 11000) {
                        console.log('[AuthController] Error creating already existing user', error);
                        res.status(400).json({
                            error: 'User exists',
                            message: error.message
                        })
                    }
                    else {
                        console.log('[AuthController] Error creating new user', error);
                        res.status(500).json({
                            error: 'Internal server error',
                            message: error.message
                        })
                    }
                });
        })
        .catch(error => {
            console.log('[AuthController] Error creating new schedule', error);
        });
};


const me = (req, res) => {
    UserModel.findById(req.userId).select('username').exec()
        .then(user => {

            if (!user) return res.status(404).json({
                error: 'Not Found',
                message: `User not found`
            });

            res.status(200).json(user)
        })
        .catch(error => res.status(500).json({
            error: 'Internal Server Error',
            message: error.message
        }));
};

const logout = (req, res) => {
    res.status(200).send({token: null});
};

const createCourse = (req, res) => {
    if (Object.keys(req.body).length === 0) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body is empty'
    });

    CourseModel.create(req.body)
        .then(course => res.status(201).json(course))
        .catch(error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
        }));
};


module.exports = {
    login,
    register,
    logout,
    me,
    createCourse
};