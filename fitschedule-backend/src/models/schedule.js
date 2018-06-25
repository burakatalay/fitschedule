"use strict";

const mongoose = require('mongoose');

// Define the schedule schema

const ScheduleSchema  = new mongoose.Schema({
    // owner: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     Ref: 'User'
    // },
    courses: {
        type: [mongoose.Schema.Types.ObjectId],
        Ref: 'Course'
    }
});

//ScheduleSchema.set('versionKey', false);

// Export the Schedule model
module.exports = mongoose.model('Schedule', ScheduleSchema);