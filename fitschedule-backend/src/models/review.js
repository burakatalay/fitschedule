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
        type: Schema.Types.ObjectId,
        required: true
    },
    course: {
        type: Schema.Types.ObjectId,
        required: true
    }
});

//ReviewSchema.set('versionKey', false);

// Export the Movie model
module.exports = mongoose.model('Review', ReviewSchema);