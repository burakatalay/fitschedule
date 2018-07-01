"use strict";

/* 
This controller was added for testing purposes, if needed could be removed or modified in the future for additional capabilities
*/

const CourseProviderModel = require('../models/courseprovider');

module.exports.getDetails = function(req, res) {
    CourseProviderModel.findById(req.params.id, function(err, courseprovider){
        if (err) {
            res.status(500).send(err);
            return;
        }
        if (!courseprovider) {
            res.status(404).json({
            error: 'Not Found',
            message: `Courseprovider not found`
            });
            return;
        }
        res.status(200).json(courseprovider);
    });
};

module.exports.list = function(req, res) {
    CourseProviderModel.find({}, function(err,courseproviders) {
        if (err) {
            res.status(500).send(err);
            return
        }
        res.status(200).json(courseproviders);
    });
};