const ScheduleModel = require('../models/schedule');
const UserModel = require('../models/user');
const CourseModel = require('../models/course');

module.exports.addCourseToSchedule = function(req, res) {
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
        ScheduleModel.findOne({_id: user.schedule}, function(err, schedule) {
            if (err) {
                res.status(500).send(err);
                return;
            }
            CourseModel.findOne({_id: req.body.course}, function(err, course) {
                if (err) {
                    res.status(500).send(err);
                    return;
                }
                schedule.courses.push(course);
                schedule.save(function(err) {
                    if (err) {
                        res.status(500).send(err);
                        return;
                        }
                    });
            });
        });
       res.status(200).json(user.schedule);
    });
};

module.exports.removeCourseFromSchedule = function(req, res) {
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
        ScheduleModel.findOne({_id: user.schedule}, function(err, schedule) {
            if (err) {
                res.status(500).send(err);
                return;
            }
            if (!schedule) { // This should never happen, a schedule object is created for each user when users are being created
                res.status(404).json({
                error: 'Not Found',
                message: `Schedule not found`
                });
                return;
            }
            CourseModel.findOne({_id: req.params.courseId}, function(err, course) {
                if (err) {
                    res.status(500).send(err);
                    return;
                }
                if (!course) {
                    res.status(404).json({
                    error: 'Not Found',
                    message: `Course not found`
                    });
                    return;
                }
                schedule.courses.pull(course);
                schedule.save(function(err) {
                    if (err) {
                        res.status(500).send(err);
                        return;
                        }
                    });
                res.status(200).json(user.schedule);
            });
        });
    });
};

module.exports.listMyCourses = function(req, res) {
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
        ScheduleModel.findOne({_id: user.schedule}, function(err, schedule) {
            if (err) {
                res.status(500).send(err);
                return;
            }
            res.status(200).json(schedule.courses);
        });
    });
}