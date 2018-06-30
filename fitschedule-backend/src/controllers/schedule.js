const ScheduleModel = require('../models/schedule');
const UserModel = require('../models/user');
const CourseModel = require('../models/course');

module.exports.addCourseToSchedule = function(req, res) {
    UserModel.findById(req.userId, function(err, user){
        if (err) {
            res.status(500).send(err);
            return
        }
        if (!user) return res.status(404).json({
            error: 'Not Found',
            message: `User not found`
        });
        //console.log(user);
        //console.log(user.schedule);
        ScheduleModel.findOne({_id: user.schedule}, function(err, schedule) {
            if (err) {
                res.status(400).send(err);
                return;
            }
            //console.log(schedule);
            CourseModel.findOne({_id: req.body.course}, function(err, course) {
                if (err) {
                    res.status(400).send(err);
                    return;
                }
                console.log(course);
                schedule.courses.push(course);
                schedule.save(function(err) {
                    if (err) {
                        res.status.send(err);
                        return;
                        }
                    });
                //console.log(schedule.courses);
            });
            
        });

        return res.status(200).json(user.schedule);
    
    });
};

module.exports.removeCourseFromSchedule = function(req, res) {
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
        console.log(user.schedule);
        ScheduleModel.findOne({_id: user.schedule}, function(err, schedule) {
            if (err) {
                res.status(400).send(err);
                return;
            }
            console.log(schedule);
            CourseModel.findOne({_id: req.params.courseId}, function(err, course) {
                if (err) {
                    res.status(400).send(err);
                    return;
                }
                console.log(course);
                schedule.courses.pull(course);
                schedule.save(function(err) {
                    if (err) {
                        console.log(err);
                        res.status(400).send(err);
                        return;
                        }
                    });
                console.log(schedule.courses);
                return res.status(200).json(user.schedule);
            });
            
        });

        
    
    });
};

module.exports.listMyCourses = function(req, res) {
    UserModel.findById(req.userId, function(err, user){
        console.log(req.userId);
        if (err) {
            res.status(500).send(err);
            return
        }
        if (!user) return res.status(404).json({
            error: 'Not Found',
            message: `User not found`
        });
        console.log(user);
        ScheduleModel.findOne({_id: user.schedule}, function(err, schedule) {
            if (err) {
                res.status(400).send(err);
                return;
            }
            return res.status(200).json(schedule.courses);
        });
    });
}