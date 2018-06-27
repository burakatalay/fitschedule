"use strict";

const express = require('express');
const router = express.Router();

const middlewares    = require('../middlewares');
const CourseController = require('../controllers/course');


router.get('/', CourseController.list); // List all courses
router.get('/getCourseDetails/:courseID', middlewares.checkAuthentication, CourseController.getCourseDetails); // Get details of course from course ID
router.post('/', /*middlewares.checkAuthentication,*/ middlewares.checkInstructor, CourseController.createCourseAsInstructor); // Create a new course
router.post('/createcourseasfitnesscenter', CourseController.createCourseAsFitnessCenter); // Create a new course
router.post('/getcoursesbyname', middlewares.checkAuthentication, CourseController.findCoursesByNameAndLocation); // List all courses
//router.get('/:id', CourseController.read); // Read all courses by Name
//router.put('/:id', middlewares.checkAuthentication, CourseController.update); // Update a course by Id
//router.delete('/:id', middlewares.checkAuthentication, CourseController.remove); // Delete a course by Id


module.exports = router;