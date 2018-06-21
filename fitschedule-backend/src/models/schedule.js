"use strict";

const mongoose = require('mongoose');

// Define the schedule schema

const ScheduleSchema  = new mongoose.Schema({
    owner: {
        type: Schema.Types.ObjectId,
        required: true,
        unique: true
    },
    course: {
        type: [Schema.Types.ObjectId],
        required: true
    }
});

//ScheduleSchema.set('versionKey', false);

// Export the Movie model
module.exports = mongoose.model('Schedule', ScheduleSchema);