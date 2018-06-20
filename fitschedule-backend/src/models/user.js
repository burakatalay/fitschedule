"use strict";

const mongoose = require('mongoose');

// Define the user schema

const UserSchema  = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    schedule: {
        type: Schema.Types.ObjectId,
        required: true
    }
});

//UserSchema.set('versionKey', false);

// Export the Movie model
module.exports = mongoose.model('User', UserSchema);