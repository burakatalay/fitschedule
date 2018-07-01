"use strict";

const mongoose = require('mongoose');


const ScheduleSchema  = new mongoose.Schema({
    courses: {
        type: [mongoose.Schema.Types.ObjectId],
        Ref: 'Course'
    }
});

module.exports = mongoose.model('Schedule', ScheduleSchema);