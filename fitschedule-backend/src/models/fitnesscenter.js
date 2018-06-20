"use strict";

const mongoose = require('mongoose');

// Define the fitnesscenter schema

const FitnessCenterSchema  = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    location: {
        type: Schema.Types.ObjectId,
        required: true
    },
    courses: {
        type: [Schema.Types.ObjectId],
        required: true
    }
});

//FitnessCenterSchema.set('versionKey', false);

// Export the Movie model
module.exports = mongoose.model('FitnessCenter', FitnessCenterSchema);