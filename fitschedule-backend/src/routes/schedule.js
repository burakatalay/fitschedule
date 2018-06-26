"use strict";

const express = require('express');
const router = express.Router();

const middlewares    = require('../middlewares');
const scheduleController = require('../controllers/schedule');

router.post('/', middlewares.checkAuthentication, scheduleController.addCourse); // Add course to schedule
router.get('/', middlewares.checkAuthentication, scheduleController.list); // List my courses in my schedule

module.exports = router;