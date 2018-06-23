"use strict";

const CourseModel = require('../models/course');


const create = (req, res) => {
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

const read   = (req, res) => {
    var coursesMap = {}
    CourseModel.find().exec()
        .then(courses => {
            if (!courses) return res.status(404).json({
                error: 'Not Found',
                message: `Course not found`
            });
            courses.forEach(function(course) {
                coursesMap[course.name] = course;
              });
          
            res.status(200).json(coursesMap)

        })
        .catch(error => res.status(500).json({
            error: 'Internal Server Error',
            message: error.message
        }));

};

const update = (req, res) => {
    if (Object.keys(req.body).length === 0)
    {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'The request body is empty'
        });
    }

    CourseModel.findByIdAndUpdate(req.params.id,req.body,{
        new: true,
        runValidators: true}).exec()
        .then(course => res.status(200).json(course))
        .catch(error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
        }));
};

const remove = (req, res) => {
    CourseModel.findByIdAndRemove(req.params.id).exec()
        .then(() => res.status(200).json({message: `Course with id${req.params.id} was deleted`}))
        .catch(error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
        }));
};

const list  = (req, res) => {
    CourseModel.find({}).exec()
        .then(course => res.status(200).json(course))
        .catch(error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
        }));
};



module.exports = {
    create,
    read,
    update,
    remove,
    list
};