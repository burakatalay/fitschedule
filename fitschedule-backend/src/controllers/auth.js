
"use strict";

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const config = require('../config');
const UserModel = require('../models/user');
const ScheduleModel = require('../models/schedule');
const CourseProviderModel = require('../models/courseprovider');

module.exports.login = function(req, res){
    if(!req.body.email){
        res.status(400).send('email required');
        return;
    }
    if(!req.body.password){
        res.status(400).send('password required');
        return;
    }
    UserModel.findOne({email: req.body.email}, function(err, user){
        if (err) {
            res.status(500).send(err);
            return
        }
        if (!user) {
            res.status(404).json({
            error: 'Not Found',
            message: `User not found`
            });
            return;
        }
        const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);
        if (!isPasswordValid) {
            res.status(401).send({token: null}, 'Invalid Credentials');
            return;
        } 
        const token = jwt.sign({id: user._id, email: user.email}, config.JwtSecret, {
            expiresIn: 86400 // expires in 24 hours
        });
        res.status(200).json({token: token});
    });
};

module.exports.register = function(req, res){

    if(!req.body.firstname){
        res.status(400).send('First name required');
        return;
    }
    if(!req.body.surname){
        res.status(400).send('Last name required');
        return;
    }
    if(!req.body.email){
        res.status(400).send('email required');
        return;
    }
    if(!req.body.password){
        res.status(400).send('password required');
        return;
    }

    var user = new UserModel();

    user.firstname = req.body.firstname;
    user.lastname = req.body.surname;
    user.email = req.body.email;
    user.password = bcrypt.hashSync(req.body.password, 8);
    user.isCourseProvider = req.body.isCourseProvider;

    var schedule = new ScheduleModel({
        courses: []
    });

    if(user.isCourseProvider) {
        var courseProvider = new CourseProviderModel({
            name: req.body.firstname + " " + req.body.surname
        });
        courseProvider.save(function(err) {
            if (err) {
                res.status(500).send(err);
                return;
            }
        });
        user.courseProvider = courseProvider
    }
    
    schedule.save(function(err) {
        if (err) {
            res.status(500).send(err);
            return;
        }   
        user.schedule = schedule._id; 
        user.save(function(err) {
            if (err) {
                res.status(500).send(err);
                return;
            }
            
            const token = jwt.sign({id: user._id, email: user.email}, config.JwtSecret, {
                expiresIn: 86400 // expires in 24 hours
            });
            
            res.status(201).json({token: token}); 
        });    
        
    });
    
};

module.exports.me = function(req, res) {

    UserModel.findById(req.userId, function(err, user){

        if (err) {
            res.status(500).send(err);
            return
        }
        if (!user) {
            res.status(404).json({
            error: 'Not Found',
            message: `User not found`
            });
            return;
        }
        return res.status(200).json(user);
    });
};

module.exports.logout = function(req, res) {
    res.status(200).send({token: null});
};

module.exports.list = function(req, res) {
    UserModel.find({}, function(err,users) {
        if (err) {
            res.status(500).send(err);
            return
        }
        res.status(200).json(users);
    });
};

module.exports.getFullName = function(req, res) {
    UserModel.findById(req.params.id, function(err, user){
        if (err) {
            res.status(500).send(err);
            return;
        }
        if (!user) {
            res.status(404).json({
            error: 'Not Found',
            message: `User not found`
            });
            return;
        }
        res.status(200).json(user.firstname + ' ' + user.lastname);
    });
};


