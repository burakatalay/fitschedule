"use strict";

/* 
This controller was added for testing purposes, if needed could be removed or modified in the future for additional capabilities
*/

const CourseProviderModel = require('../models/courseprovider');


module.exports.list  = (req, res) => {
    CourseProviderModel.find({}).exec()
        .then(courseprovider => res.status(200).json(courseprovider))
        .catch(error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
        }));
};