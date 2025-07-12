const express = require('express')
const router = express.Router()
const commentControllers = require('../controllers/comment.controller.js')
const auth = require('../middlewares/auth.js')

// Comment routes

// update a comment
router.put('/:commentId', auth, commentControllers.updateComment)

// delete a comment
router.delete('/:commentId', auth, commentControllers.deleteComment)

module.exports = router