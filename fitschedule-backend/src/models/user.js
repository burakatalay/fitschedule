"use strict";

const mongoose = require('mongoose');

// Define the user schema

const UserSchema  = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    schedule: {
        type: mongoose.Schema.Types.ObjectId,
        Ref: 'Schedule'
    },
    isCourseProvider: {
        type: Boolean,
        required: true
    }
});

//UserSchema.set('versionKey', false);

// Export the User model
module.exports = mongoose.model('User', UserSchema);