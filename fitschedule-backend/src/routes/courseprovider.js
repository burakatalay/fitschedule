"use strict";

const express = require('express');
const router = express.Router();

const middlewares    = require('../middlewares');
const courseProviderController = require('../controllers/courseprovider');

router.get('/getAllProvider', middlewares.checkAuthentication, courseProviderController.list); // Only to be called from the backend
router.get('/', courseProviderController.getDetails); // Get details of the courseprovider based on ID

module.exports = router;