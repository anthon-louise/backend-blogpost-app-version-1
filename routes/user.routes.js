const express = require('express')
const router = express.Router()
const userControllers = require('../controllers/user.controllers')

// Routes

// signup a user
router.post('/signup', userControllers.signupUser)

// login a user
router.post('/login', userControllers.loginUser)

module.exports = router