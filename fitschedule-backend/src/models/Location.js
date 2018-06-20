"use strict";

const mongoose = require('mongoose');

// Define the location schema

const LocationSchema  = new mongoose.Schema({
    latitude: {
        type: Number,
        required: true,
        unique: true
    },
    longitude: {
        type: Number,
        required: true,
        unique: true
    }
});

LocationSchema.set('versionKey', false);

// Export the Movie model
module.exports = mongoose.model('Location', LocationSchema);