const express = require('express');
const router = express.Router();
const UserController = require('../controller/userController');
const User = require('../model/User');

router.post('/signup',UserController.signup);
router.post('/login',UserController.login);
router.get('/user',UserController.user);
router.get('/user/:id',UserController.userById);
router.put('/user/:id',UserController.userById);

module.exports = router;