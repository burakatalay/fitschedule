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
    }
});

// Export the Review model
module.exports = mongoose.model('Review', ReviewSchema);