const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')
const isAdmin = require('../middlewares/isAdmin')
const adminController = require('../controllers/admin.controller')

router.get('/', auth, isAdmin, adminController.getAllUsers)

module.exports = router