const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')
const likeController = require('../controllers/like.controller')
const isUser = require('../middlewares/isUser')
const validateParams = require('../middlewares/validatesParam')

// Like routes

// like a post
router.post('/:id', auth, validateParams, isUser,  likeController.likePost)

// unlike a post
router.delete('/:id', auth, validateParams, isUser, likeController.unlikePost)

// get likes and count
router.get('/:id', auth, validateParams, isUser, likeController.getLikes)

module.exports = router