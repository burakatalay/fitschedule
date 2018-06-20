"use strict";

const mongoose = require('mongoose');

// Define the timeslot schema

const TimeSlotSchema  = new mongoose.Schema({
    start_time: {
        type: Date,
        required: true
    },
    end_time: {
        type: Date,
        required: true
    }
});

//TimeSlotSchema.set('versionKey', false);

// Export the Movie model
module.exports = mongoose.model('TimeSlot', TimeSlotSchema);