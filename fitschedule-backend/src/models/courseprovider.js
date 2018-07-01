"use strict";

const mongoose = require('mongoose');

const CourseProviderSchema  = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('CourseProvider', CourseProviderSchema);