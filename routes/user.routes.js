const express = require('express')
const router = express.Router()
const userControllers = require('../controllers/user.controllers')

// User routes:

// signup a user
router.post('/signup', userControllers.signupUser)

// login a user
router.post('/login', userControllers.loginUser)

// singup an admin
router.post('/admin/signup', userControllers.signupAdmin)

// login an admin
router.post('/admin/login', userControllers.loginAdmin)

module.exports = router