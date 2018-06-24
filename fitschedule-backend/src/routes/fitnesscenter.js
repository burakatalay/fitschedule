"use strict";

const express  = require('express');
const router   = express.Router();

const middlewares    = require('../middlewares');
const CourseController = require('../controllers/fitnesscenter');


router.get('/', CourseController.list); // List all fitness center
//router.post('/', middlewares.checkAuthentication, CourseController.create); // Create a new fitness center
router.post('/', CourseController.create); // Create a new fitness center
router.get('/:name', CourseController.read); // Read fitness center by Id
router.put('/:id', middlewares.checkAuthentication, CourseController.update); // Update a fitness center by Id
router.delete('/:id', middlewares.checkAuthentication, CourseController.remove); // Delete a fitness center by Id


module.exports = router;