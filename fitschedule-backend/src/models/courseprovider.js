"use strict";

const mongoose = require('mongoose');

// Define the course schema

const CourseProviderSchema  = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

//CourseSchema.set('versionKey', false);

// Export the Course model
module.exports = mongoose.model('CourseProvider', CourseProviderSchema);