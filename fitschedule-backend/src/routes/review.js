"use strict";

const express = require('express');
const router = express.Router();

const middlewares    = require('../middlewares');
const ReviewController = require('../controllers/review');

router.get('/', ReviewController.list); // Only for use in backend, for debugging purposes, will be removed
//router.get('/:courseID', middlewares.checkAuthentication, CourseController.getCourseDetails); // Get details of course from course ID
router.put('/', /*middlewares.checkAuthentication,*/ ReviewController.writeReview); // Create a new review
router.post('/', ReviewController.updateReview); // Update a review
//router.get('/', CourseController.findCoursesByNameAndLocation); // List all courses that adhere to the query params, name and distance from user


module.exports = router;