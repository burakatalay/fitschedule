"use strict";

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const config = require('../config');
const UserModel = require('../models/user');
const CourseModel = require('../models/course');

module.exports.createCourse = function(req, res){

    var course = new CourseModel({
        name: req.body.name,
        instructor: req.body.instructor,
        location: {
            type: "Point",
            coordinates: [req.body.lng, req.body.lat]
          },
        //courseprovider: req.body.courseprovider,
        timeslot: req.body.timeslot
    });
    course.save(function(err, course) {
        if (err) {
            res.status(400).send(err);
            return;
        }
        res.status(201).json(course);
    });
}

module.exports.findCoursesByNameAndLocation = function(req, res) {

    const query = {
        name: req.body.course,
        location :
        { $geoWithin :
            { $centerSphere :
                [ [req.body.lng, req.body.lat] , req.body.dist/6378.1 ]
                } 
            }   
    };
    console.log(query);
    CourseModel.find(query, function(err, courses) {
        if (err) {
            res.status(400).send(err);
            return;
        }
        res.json(courses);
    });

}

module.exports.list  = (req, res) => {
    CourseModel.find({}).exec()
        .then(course => res.status(200).json(course))
        .catch(error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
        }));
};