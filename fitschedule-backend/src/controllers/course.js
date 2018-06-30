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
        if (!user) return res.status(404).json({
            error: 'Not Found',
            message: `User not found`
        });
        console.log(user);
        ScheduleModel.findById(user.schedule, function(err, schedule) {
            if (err) {
                res.status(400).send(err);
                return;
            }
        console.log(schedule);
        
        course.courseprovider = user.courseProvider
        course.save(function(err, course) {
            if (err) {
                res.status(400).send(err);
                return;
            }
            res.status(201).json(course);
        });
        schedule.courses.push(course);
        schedule.save(function(err) {
            if (err) {
                res.status.send(err);
                return;
                }
            });
            console.log(schedule);
        });
    });
}

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
            res.status(400).send(err);
            return;
        }
        if(!courseprovider) {
            var courseProvider = new CourseProviderModel({
                name: req.body.fitnesscentername
                });
                courseProvider.save(function(err) {
                if (err) {
                    res.status.send(err);
                    return;
                    }
                });
            course.courseprovider = courseProvider;
            course.save(function(err, course) {
                if (err) {
                    res.status(400).send(err);
                    return;
                }
                
                res.status(201).json(course);
            });
        } else {
            course.courseprovider = courseprovider;
            course.save(function(err, course) {
                if (err) {
                    res.status(400).send(err);
                    return;
                }
                
                res.status(201).json(course);
            });
        }  
    });
   
}

module.exports.updateCourseDetails = function(req, res) {
    CourseModel.findById(req.body.id, function(err, course){
        if (err) {
            res.status(400).send(err);
            return
        }
        console.log(course);
        console.log(req.body);
        console.log(course.timeslot.start);
        course.timeslot = req.body.timeslot;
        course.save(function(err, course) {
            if (err) {
                res.status(400).send(err);
                return;
            }
            res.status(201).json(course);
        });
    });

    // UserModel.findById(req.userId, function(err, user) {
    //     if (err) {
    //         res.status(400).send(err);
    //         return
    //     }
    //     console.log(course.courseprovider);
    //     console.log(user.courseprovider);
    //     if(course.courseprovider == user.courseprovider) {
    //         console.log(course);
    //         console.log(req.body);
    //         course.timeslot = req.body.timeslot;
    //         course.save(function(err, course) {
    //         if (err) {
    //             res.status(400).send(err);
    //             return;
    //         }
    //         res.status(201).json(course);
    //         });
    //     } else {
    //         return res.status(401).send({
    //             error: 'Unauthorized',
    //             message: 'This is not your course'
    //         });
    //     }
    // });
}

module.exports.findCoursesByNameAndLocation = function(req, res) {

    const query = {
        name: req.query.course,
        location :
        { $geoWithin :
            { $centerSphere :
                [ [req.query.lng, req.query.lat] , req.query.dist/6378.1 ]
                } 
            }   
    };
    CourseModel.find(query, function(err, courses) {
        if (err) {
            res.status(400).send(err);
            return;
        }
        console.log(courses);
        res.json(courses);
    });

}

module.exports.getCourseDetails = function(req, res) {
    CourseModel.findById(req.params.courseID, function(err, course){
        if (err) {
            res.status(500).send(err);
            return
        }
        if (!course) return res.status(404).json({
            error: 'Not Found',
            message: `Course not found`
        });
        res.status(201).json(course);
    });
}

module.exports.deleteCourse = function(req, res) {
    CourseModel.findByIdAndRemove(req.params.id, function(err, course) {
        if (err) {
            res.status(500).send(err);
            return
        }
        if (!course) return res.status(404).json({
            error: 'Not Found',
            message: `Course not found`
        });
        res.status(201).json({
            message: `Course deleted`
        });
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