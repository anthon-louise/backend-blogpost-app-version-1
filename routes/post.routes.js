const express = require('express')
const router = express.Router()
const postControllers = require('../controllers/post.controller')
const {idParamSchema} = require('../controllers/post.controller')
const auth = require('../middlewares/auth')
const isUser = require('../middlewares/isUser')
const validateParams = require('../middlewares/validatesParam')

// Post routes:

// create a post
router.post('/', auth, isUser,  postControllers.createPost)

// get all posts
router.get('/', auth, isUser, postControllers.getPosts)

// get a post
router.get('/:id', auth, validateParams(idParamSchema), isUser, postControllers.getPost)

// update a post
router.put('/:id', auth, validateParams(idParamSchema), isUser, postControllers.updatePost) 

// delete a post
router.delete('/:id', auth, validateParams(idParamSchema), isUser,  postControllers.deletePost)

// comment a post
router.post('/:id/comment', auth, validateParams(idParamSchema), isUser, postControllers.createComment)

// get comments from a post
router.get('/:id/comment', auth, validateParams(idParamSchema), isUser, postControllers.getComments)

module.exports = router 