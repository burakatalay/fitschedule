"use strict";

const FitnessCenterModel = require('../models/fitnesscenter');


const create = (req, res) => {
    console.log("post")
    if (Object.keys(req.body).length === 0) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body is empty'
    });

    FitnessCenterModel.create(req.body)
        .then(fitnesscenter => res.status(201).json(fitnesscenter))
        .catch(fitnesscenter => res.status(500).json({
            error: 'Internal server error',
            message: fitnesscenter.message
        }));
};

const read   = (req, res) => {
    console.log("get")
    FitnessCenterModel.findById(req.params.id).exec()
        .then(fitnesscenter => {

            if (!fitnesscenter) return res.status(404).json({
                error: 'Not Found',
                message: `Fitness center not found`
            });

            res.status(200).json(fitnesscenter)

        })
        .catch(error => res.status(500).json({
            error: 'Internal Server Error',
            message: error.message
        }));

};

const update = (req, res) => {
    console.log("put")
    if (Object.keys(req.body).length === 0)
    {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'The request body is empty'
        });
    }

    FitnessCenterModel.findByIdAndUpdate(req.params.id,req.body,{
        new: true,
        runValidators: true}).exec()
        .then(fitnesscenter => res.status(200).json(fitnesscenter))
        .catch(error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
        }));
};

const remove = (req, res) => {
    console.log("delete")
    FitnessCenterModel.findByIdAndRemove(req.params.id).exec()
        .then(() => res.status(200).json({message: `Fitness center with id${req.params.id} was deleted`}))
        .catch(error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
        }));
};

const list  = (req, res) => {
    FitnessCenterModel.find({}).exec()
        .then(fitnesscenter => res.status(200).json(fitnesscenter))
        .catch(error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
        }));
};



module.exports = {
    create,
    read,
    update,
    remove,
    list
};