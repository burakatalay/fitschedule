"use strict";

const mongoose = require('mongoose');

// Define the course schema

const CourseSchema  = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    instructor: {
        type: String,
        required: true
    },
    average_rating: {
        type: String
    },
    reviews: {
        type: [mongoose.Schema.Types.ObjectId]
    }
});

//CourseSchema.set('versionKey', false);

// Export the Movie model
module.exports = mongoose.model('Course', CourseSchema);