"use strict";

const CourseModel = require('../models/course');
const UserModel = require('../models/user');
const ReviewModel = require('../models/review');

module.exports.getMyReviewByCourseId = function (req, res) {
    CourseModel.findById(req.params.id, function (err, course) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        if (!course) return res.status(404).json({
            error: 'Not Found',
            message: `Course not found`
        });
        course.reviews.forEach(review => {
            ReviewModel.findById(review, function (err, review) {
                if (err) {
                    res.status(500).send(err);
                    return;
                }
                if (!review) return res.status(500);
                if (review.created_by === req.userId) {
                    return res.status(201).json(review);
                }
            });
        });
        res.status(201).json({});
    });
};

module.exports.getReview = function (req, res) {
    console.log('[ReviewController] Received request to get review with id', req.params.id);
    ReviewModel.findById(req.params.id, function (err, review) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        if (!review) return res.status(404).json({
            error: 'Not Found',
            message: `Review not found`
        });
        res.status(201).json(review);
    });
};

module.exports.writeReview = function (req, res) {
    var review = new ReviewModel({
        comment: req.body.comment,
        rating: req.body.rating,
        created_at: new Date(),
        created_by: req.userId
    });
    console.log('[ReviewController] Saving new review', review);
    review.save(function (err) {
        if (err) {
            console.log('[ReviewController] Error saving new review', review);
            res.status.send(err);
            return;
        }
    });

    CourseModel.findById(req.body.course, function (err, course) {
        if (err) {
            console.log("Course not found");
            res.status(400).send(err);
            return;
        }
        course.reviews.push(review);
        course.save(function (err, course) {
            if (err) {
                res.status(400).send(err);
                return;
            }
            res.status(201).json(review);
        });
    });
};

module.exports.updateReview = function (req, res) {
    ReviewModel.findById(req.body.reviewID, function (err, review) {
        review.comment = req.body.comment;
        review.rating = req.body.rating;
        review.save(function (err, review) {
            if (err) {
                res.status(400).send(err);
                return;
            }
            res.status(201).json(review).send();
        });
    });
};

// module.exports.calculateAverageRating = function(req, res) {
//     CourseModel.findById(req.body.courseID, function(err, course) {
//         array.forEach(element => {

//         });
//     });
// }

module.exports.list = (req, res) => {
    ReviewModel.find({}).exec()
        .then(review => res.status(200).json(review))
        .catch(error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
        }));
};