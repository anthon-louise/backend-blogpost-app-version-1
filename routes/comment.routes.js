const express = require('express')
const router = express.Router()
const commentControllers = require('../controllers/comment.controller.js')
const auth = require('../middlewares/auth.js')
const isUser = require('../middlewares/isUser')

// Comment routes

// update a comment
router.put('/:commentId', auth, isUser, commentControllers.updateComment)

// delete a comment
router.delete('/:commentId', auth, isUser, commentControllers.deleteComment)

module.exports = router