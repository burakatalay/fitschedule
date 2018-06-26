"use strict";

/* 
This routes file was added for testing purposes, if needed could be removed or modified in the future for additional capabilities
*/



const express = require('express');
const router = express.Router();

const courseProviderController = require('../controllers/courseprovider');

router.get('/', courseProviderController.list); // List all courseproviders

module.exports = router;