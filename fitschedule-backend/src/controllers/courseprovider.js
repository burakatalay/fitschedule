"use strict";

/* 
This controller was added for testing purposes, if needed could be removed or modified in the future for additional capabilities
*/

const CourseProviderModel = require('../models/courseprovider');

module.exports.getDetails = function(req, res) {
    console.log('[CourseProviderController] Received request to get course-provider with id', req.params.id);
    CourseProviderModel.findById(req.params.id, function(err, courseprovider){
        if (err) {
            res.status(500).send(err);
            return;
        }
        if (!courseprovider) return res.status(404).json({
            error: 'Not Found',
            message: `Course Provider not found`
        });
        res.status(201).json(courseprovider);
    });
}
module.exports.list  = (req, res) => {
    CourseProviderModel.find({}).exec()
        .then(courseprovider => res.status(200).json(courseprovider))
        .catch(error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
        }));
};