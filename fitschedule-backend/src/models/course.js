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
    courseprovider: {
        type: mongoose.Schema.Types.ObjectId,
        Ref: 'CourseProvider'
    },
    average_rating: {
        type: String
    },
    reviews: {
        type: [mongoose.Schema.Types.ObjectId],
        Ref: 'Review'
    },
    location: { 
        type: [Number], 
        index: { type: '2dsphere', sparse: true},
        required: true
    },
    // timeslot: {
    //     startTime: Date,
    //     endTime: Date
    // }
    
});

//CourseSchema.set('versionKey', false);

// Export the Course model
module.exports = mongoose.model('Course', CourseSchema);