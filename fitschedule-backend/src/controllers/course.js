"use strict";

const CourseModel = require('../models/course');
const CourseProviderModel = require('../models/courseprovider');
const UserModel = require('../models/user');
const ScheduleModel = require('../models/schedule');

module.exports.createCourseAsInstructor = function(req, res){
    var course = new CourseModel({
        name: req.body.name,
        instructor: req.body.instructor,
        location: {
            type: "Point",
            coordinates: [req.body.lng, req.body.lat]
          },
        timeslot: req.body.timeslot,
    });
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
        ScheduleModel.findById(user.schedule, function(err, schedule) {
            if (err) {
                res.status(500).send(err);
                return;
            }
        course.courseprovider = user.courseProvider
        course.save(function(err, course) {
            if (err) {
                res.status(500).send(err);
                return;
            }
        });
        schedule.courses.push(course);
        schedule.save(function(err) {
            if (err) {
                res.status(500).send(err);
                return;
                }
            });
            res.status(201).json(course);
        });
    });
};

module.exports.createCourseAsFitnessCenter = function(req, res){
    var course = new CourseModel({
        name: req.body.name,
        instructor: req.body.instructor,
        day: req.body.day,
        location: {
            type: "Point",
            coordinates: [req.body.lng, req.body.lat]
          },
        timeslot: req.body.timeslot,
    });
    CourseProviderModel.findOne({name: req.body.fitnesscentername}, function(err, courseprovider) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        if(!courseprovider) {
            var courseProvider = new CourseProviderModel({
                name: req.body.fitnesscentername
                });
                courseProvider.save(function(err) {
                if (err) {
                    res.status(500).send(err);
                    return;
                    }
                });
            course.courseprovider = courseProvider;
            course.save(function(err, course) {
                if (err) {
                    res.status(500).send(err);
                    return;
                }
                
                res.status(201).json(course);
            });
        } else {
            course.courseprovider = courseprovider;
            course.save(function(err, course) {
                if (err) {
                    res.status(500).send(err);
                    return;
                }      
                res.status(201).json(course);
            });
        }  
    });
};

module.exports.findCoursesByNameAndLocation = function(req, res) {
    const query = {
        name: { $regex: new RegExp(req.query.course, "i") },
        location :
        { $geoWithin :
            { $centerSphere :
                [ [req.query.lng, req.query.lat] , req.query.dist/6378.1 ]
                } 
            }   
    };
    CourseModel.find(query, function(err, courses) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.status(200).json(courses);
    });
};

module.exports.getCourseDetails = function(req, res) {
    CourseModel.findById(req.params.courseID, function(err, course){
        if (err) {
            res.status(500).send(err);
            return
        }
        if (!course) {
            res.status(404).json({
            error: 'Not Found',
            message: `Course not found`
            });
            return;
        }
        res.status(200).json(course);
    });
};

module.exports.deleteCourse = function(req, res) {
    CourseModel.findById(req.params.id, function(err, course) {
        if (err) {
            res.status(500).send(err);
            return
        }
        if (!course) {
            res.status(404).json({
            error: 'Not Found',
            message: `Course not found`
            });
            return;
        }
        ScheduleModel.find({}, function(err, schedules) {
            if (err) {
                res.status(500).send(err);
                return
            }
            if (!schedules) {  // This should not happen unless there is no user registered at all, even so this function will not get called then
                res.status(404).json({
                error: 'Not Found',
                message: `No schedule found`
                });
                return;
            }
            schedules.forEach(schedule => {
                schedule.courses.forEach(courseinschedule => {
                    if(courseinschedule === req.params.id) {
                        schedule.courses.pull(course);
                        schedule.save(function(err) {
                            if (err) {
                                res.status(500).send(err);
                                return;
                            }
                        });
                    }     
                });
            });
           
        });
        course.remove();
        res.status(200).json({
            message: `Course deleted successfully`
        });;  
    });
};

module.exports.list = function(req, res) {
    CourseModel.find({}, function(err,courses) {
        if (err) {
            res.status(500).send(err);
            return
        }
        res.status(200).json(courses);
    });
};