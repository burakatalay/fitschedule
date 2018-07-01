"use strict";

const express = require('express');
const router = express.Router();

const middlewares    = require('../middlewares');
const ReviewController = require('../controllers/review');

router.get('/', ReviewController.list); // Only for use in backend, for debugging purposes
router.get('/:id', ReviewController.getReview); // Return review with id
router.get('/getmyreview/course/:id', ReviewController.getMyReviewByCourseId); // Return a review that is written by a user
router.post('/', middlewares.checkAuthentication, ReviewController.writeReview); // Create a new review


module.exports = router;