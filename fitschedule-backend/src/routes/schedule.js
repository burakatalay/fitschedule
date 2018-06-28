"use strict";

const express = require('express');
const router = express.Router();

const middlewares    = require('../middlewares');
const scheduleController = require('../controllers/schedule');

router.get('/', middlewares.checkAuthentication, scheduleController.listMyCourses); // List my courses in my schedule
router.post('/', middlewares.checkAuthentication, scheduleController.addCourseToSchedule); // Add course to schedule
router.delete('/', middlewares.checkAuthentication, scheduleController.removeCourseFromSchedule); // Remove course from schedule

module.exports = router;