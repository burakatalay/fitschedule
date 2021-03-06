"use strict";

const mongoose = require('mongoose');

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
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    schedule: {
        type: mongoose.Schema.Types.ObjectId,
        Ref: 'Schedule'
    },
    isCourseProvider: {
        type: Boolean,
        required: true,
    },
    courseProvider: {
        type: mongoose.Schema.Types.ObjectId,
        Ref: 'CourseProvider',
        required: function() {
            return this.isCourseProvider == true;
        }
    }
});

module.exports = mongoose.model('User', UserSchema);