const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')
const likeController = require('../controllers/like.controller')

// Like routes

// like a post
router.post('/:postId', auth, likeController.likePost)

// unlike a post
router.delete('/:postId', auth, likeController.unlikePost)

// get likes and count
router.get('/:postId', auth, likeController.getLikes)

module.exports = router