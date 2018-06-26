const ScheduleModel = require('../models/schedule');


module.exports.list  = (req, res) => {
    ScheduleModel.find({}).exec()
        .then(schedule => res.status(200).json(schedule))
        .catch(error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
        }));
};