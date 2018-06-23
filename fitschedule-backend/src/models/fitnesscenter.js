"use strict";

const mongoose = require('mongoose');

// Define the fitnesscenter schema

const FitnessCenterSchema  = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    /*
    location: [
    {
        lat:{   
            type: Number,
            required: true
        },
        lon:{   
            type: Number,
            required: true
        }
    }
    ],
    */
   location: [
    {
        type:[Number],
        index: '2d'
    }
    ],
    courses: {
        type: [mongoose.Schema.Types.ObjectId],
        required: true
    }
});

//FitnessCenterSchema.set('versionKey', false);

// Export the Movie model
module.exports = mongoose.model('FitnessCenter', FitnessCenterSchema);