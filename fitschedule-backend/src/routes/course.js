"use strict";

const express = require('express');
const router = express.Router();

const middlewares    = require('../middlewares');
const CourseController = require('../controllers/course');


router.get('/getAllCourses', CourseController.list); // Only for use in backend, for debugging purposes, will be removed
router.get('/getCourseDetails/:courseID', middlewares.checkAuthentication, CourseController.getCourseDetails); // Get details of course from course ID
router.post('/', middlewares.checkInstructor, CourseController.createCourseAsInstructor); // Create a new course
router.post('/createcourseasfitnesscenter', CourseController.createCourseAsFitnessCenter); // Create a new course
router.get('/', CourseController.findCoursesByNameAndLocation); // List all courses that adhere to the query params, name and distance from user


module.exports = router;