const express = require('express')
const router = express.Router()
const userControllers = require('../controllers/user.controllers')

// Routes

// signup a user
router.post('/signup', userControllers.signupUser)

module.exports = router