"use strict";

const CourseModel = require('../models/course');
const UserModel = require('../models/user');
const ReviewModel = require('../models/review');

module.exports.writeReview = function(req, res) {
    var review = new ReviewModel({
        comment: req.body.comment,
        rating: req.body.rating,
    });
    review.save(function(err) {
        if (err) {
            res.status.send(err);
            return;
        }
    });
    UserModel.findById(req.body.userId, function(err, user){

        if (err) {
            res.status(500).send(err);
            return;
        }
        if (!user) return res.status(404).json({
            error: 'Not Found',
            message: `User not found`
        });

        CourseModel.findById(req.body.course, function(err, course) {
            if (err) {
                console.log("we are here");
                res.status(400).send(err);
                return;
            }
        
        course.reviews.push(review);
        course.save(function(err, course) {
            if (err) {
                res.status(400).send(err);
                return;
            }
            user.writtenReviews.push(review);
            user.save(function(err) {
            if (err) {
                res.status.send(err);
                return;
                }
            });
            res.status(201).json(review).send();
        });
        });
        
        
    });
}

module.exports.updateReview = function(req, res) {
    ReviewModel.findById(req.body.reviewID, function(err, review) {
        review.comment = req.body.comment;
        review.rating = req.body.rating;
        review.save(function(err, review) {
            if (err) {
                res.status(400).send(err);
                return;
            }
            res.status(201).json(review).send();
        });
    });
}

// module.exports.calculateAverageRating = function(req, res) {
//     CourseModel.findById(req.body.courseID, function(err, course) {
//         array.forEach(element => {
            
//         });
//     });
// }

module.exports.list  = (req, res) => {
    ReviewModel.find({}).exec()
        .then(review => res.status(200).json(review))
        .catch(error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
        }));
};