"use strict";

const mongoose = require('mongoose');

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
        Ref: 'CourseProvider',
        required: true
    },
    average_rating: {
        type: String
    },
    reviews: {
        type: [mongoose.Schema.Types.ObjectId],
        Ref: 'Review'
    },
    location: {
        type: { type: String },
        coordinates: [Number]
    },
    timeslot: [{
            start:{
                type: Date,
                required: true
            },
            end:{
                type: Date,
                required: true
            },
            day: {
                type: Number,
                required: true
            }
        }
    ]
});

module.exports = mongoose.model('Course', CourseSchema);