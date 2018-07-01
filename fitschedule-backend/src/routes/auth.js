"use strict";

const express        = require('express');
const router         = express.Router();

const middlewares    = require('../middlewares');
const AuthController = require('../controllers/auth');


router.post('/login', AuthController.login);
router.post('/register', AuthController.register);
router.get('/whoami', middlewares.checkAuthentication , AuthController.me);
router.get('/name/:id', middlewares.checkAuthentication, AuthController.getFullName);
router.get('/logout', middlewares.checkAuthentication, AuthController.logout);
router.get('/getAllUsers', AuthController.list);  // For debugging purposes, only to be called from backend
module.exports = router;