const express = require('express')
const router = express.Router()
const commentControllers = require('../controllers/comment.controller.js')
const auth = require('../middlewares/auth.js')
const isUser = require('../middlewares/isUser')
const validateParams = require('../middlewares/validatesParam.js')

// Comment routes

// update a comment
router.put('/:id', auth, validateParams, isUser, commentControllers.updateComment)

// delete a comment
router.delete('/:id', auth, validateParams, isUser, commentControllers.deleteComment)

module.exports = router