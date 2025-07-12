const express = require('express')
const router = express.Router()
const userSettingController = require('../controllers/userSettings.controller')
const auth = require('../middlewares/auth')

// User settings routes:

// get the settings of a user
router.get('/', auth, userSettingController.getUserSettings)

// update the settings of a user
router.put('/', auth, userSettingController.updateUserSettings)

module.exports = router