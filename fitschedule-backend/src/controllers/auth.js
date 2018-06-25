
"use strict";

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const config = require('../config');
const UserModel = require('../models/user');
const ScheduleModel = require('../models/schedule');
const CourseModel = require('../models/course');

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
            res.status(401).send('Invalid Credentials');
            return;
        }
        const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);
        if (!isPasswordValid) {
            console.log(req.body.password);
            return res.status(401).send({token: null});
        }
        

        const token = jwt.sign({id: user._id, email: user.email}, config.JwtSecret, {
            expiresIn: 86400 // expires in 24 hours
        });

        res.status(200).json({token: token});
    });

};


module.exports.register = function(req, res){

    if(!req.body.email){
        res.status(400).send('email required');
        return;
    }
    if(!req.body.password){
        res.status(400).send('password required');
        return;
    }
    if(!req.body.firstname){
        res.status(400).send('password required');
        return;
    }
    if(!req.body.surname){
        res.status(400).send('password required');
        return;
    }
    
    
    var user = new UserModel();

    user.firstname = req.body.firstname;
    user.lastname = req.body.surname;
    user.email = req.body.email;
    user.password = bcrypt.hashSync(req.body.password, 8);
    if(req.body.isCourseProvider == true) {
        user.type = "instructor"
    } else {
        user.type = "regular"
    }
    var schedule = new ScheduleModel({
        courses: []
    });
    schedule.save(function(err) {
        if (err) {
            res.status.send(err);
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

module.exports.me = (req, res) => {
    UserModel.findById(req.userId).exec()
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

module.exports.logout = (req, res) => {
    res.status(200).send({token: null});
};

module.exports.createCourse = (req, res) => {
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


