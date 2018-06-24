"use strict";

const express  = require('express');
const router   = express.Router();

const middlewares    = require('../middlewares');
const CourseController = require('../controllers/course');


router.get('/', CourseController.list); // List all courses
router.post('/', middlewares.checkAuthentication, CourseController.create); // Create a new course
router.get('/:id', CourseController.read); // Read all courses by Name
router.put('/:id', middlewares.checkAuthentication, CourseController.update); // Update a course by Id
router.delete('/:id', middlewares.checkAuthentication, CourseController.remove); // Delete a course by Id


module.exports = router;