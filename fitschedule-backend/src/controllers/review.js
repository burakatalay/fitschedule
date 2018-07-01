"use strict";

const CourseModel = require('../models/course');
const ReviewModel = require('../models/review');

module.exports.getMyReviewByCourseId = function (req, res) {
    CourseModel.findById(req.params.id, function (err, course) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        if (!course) {
            res.status(404).json({
            error: 'Not Found',
            message: `Course not found`
            });
            return;
        }
        course.reviews.forEach(review => {
            ReviewModel.findById(review, function (err, review) {
                if (err) {
                    res.status(500).send(err);
                    return;
                }
                if (!review) {
                    res.status(404).json({
                    error: 'Not Found',
                    message: `Review not found`
                    });
                    return;
                }
                if (review.created_by === req.userId) {
                    return res.status(200).json(review);
                }
            });
        });
        res.status(200).json({});
    });
};

module.exports.getReview = function (req, res) {
    ReviewModel.findById(req.params.id, function (err, review) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        if (!review) {
            res.status(404).json({
            error: 'Not Found',
            message: `Review not found`
            });
            return;
        }
        res.status(200).json(review);
    });
};

module.exports.writeReview = function (req, res) {
    var review = new ReviewModel({
        comment: req.body.comment,
        created_at: new Date(),
        created_by: req.userId
    });
    review.save(function (err) {
        if (err) {
            res.status(400).send(err);
            return;
        }
    });
    CourseModel.findById(req.body.course, function (err, course) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        if (!course) {
            res.status(404).json({
            error: 'Not Found',
            message: `Course not found`
            });
            return;
        }
        course.reviews.push(review);
        course.save(function (err, course) {
            if (err) {
                res.status(500).send(err);
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

module.exports.list = function(req, res) {
    ReviewModel.find({}, function(err,reviews) {
        if (err) {
            res.status(500).send(err);
            return
        }
        res.status(200).json(reviews);
    });
};