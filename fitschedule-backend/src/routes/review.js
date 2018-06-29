"use strict";

const express = require('express');
const router = express.Router();

const middlewares    = require('../middlewares');
const ReviewController = require('../controllers/review');

router.get('/', ReviewController.list); // Only for use in backend, for debugging purposes, will be removed
router.get('/:id', ReviewController.getReview); // Return review with id
router.put('/', middlewares.checkAuthentication, ReviewController.writeReview); // Create a new review
router.post('/', ReviewController.updateReview); // Update a review


module.exports = router;