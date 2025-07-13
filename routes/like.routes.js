const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')
const likeController = require('../controllers/like.controller')
const isUser = require('../middlewares/isUser')

// Like routes

// like a post
router.post('/:postId', auth, isUser,  likeController.likePost)

// unlike a post
router.delete('/:postId', auth, isUser, likeController.unlikePost)

// get likes and count
router.get('/:postId', auth, isUser, likeController.getLikes)

module.exports = router