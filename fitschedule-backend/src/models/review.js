"use strict";

const mongoose = require('mongoose');

// Define the review schema

const ReviewSchema  = new mongoose.Schema({
    comment: {
        type: String
    },
    rating: {
        type: Number,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        Ref: 'User'
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        Ref: 'Course'
    }
});

//ReviewSchema.set('versionKey', false);

// Export the Review model
module.exports = mongoose.model('Review', ReviewSchema);