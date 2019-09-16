const express = require('express');
// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

// Conveniently handles routes with different endpoints
const router = express.Router();

//import user model
const User = require('../models/user');

const UserController = require('../controllers/user');

//Import check Auth MiddleWare
const checkAuth = require('../authenticators/check-auth');

// localhost:3000/user/signup
router.post('/signup', UserController.user_signup); // post

// create a token
// localhost:3000/user/login
router.post('/login', UserController.user_login);

// localhost:3000/user/5d75802fa50af037b063668d
router.delete('/:userId', checkAuth, UserController.user_delete); // delete

module.exports = router;