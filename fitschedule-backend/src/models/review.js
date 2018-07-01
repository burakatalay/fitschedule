"use strict";

const mongoose = require('mongoose');

const ReviewSchema  = new mongoose.Schema({
    comment: {
        type: String
    },
    rating: {
        type: Number
    },
    created_at: {
        type: Date,
        required: true
    },
    created_by: {
        type: mongoose.Schema.ObjectId,
        Ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('Review', ReviewSchema);