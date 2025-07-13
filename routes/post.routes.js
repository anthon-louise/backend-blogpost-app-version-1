const express = require('express')
const router = express.Router()
const postControllers = require('../controllers/post.controller')
const auth = require('../middlewares/auth')
const isUser = require('../middlewares/isUser')

// Post routes:

// create a post
router.post('/', auth, isUser,  postControllers.createPost)

// get all posts
router.get('/', auth, isUser, postControllers.getPosts)

// get a post
router.get('/:id', auth, isUser, postControllers.getPost)

// update a post
router.put('/:id', auth, isUser, postControllers.updatePost) 

// delete a post
router.delete('/:id', auth, isUser,  postControllers.deletePost)

// comment a post
router.post('/:postId/comment', auth, isUser, postControllers.createComment)

// get comments from a post
router.get('/:postId/comment', auth, isUser, postControllers.getComments)

module.exports = router 