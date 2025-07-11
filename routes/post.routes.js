const express = require('express')
const router = express.Router()
const postControllers = require('../controllers/post.controller')
const auth = require('../middlewares/auth')

// Post routes:

// create a post
router.post('/', auth, postControllers.createPost)

// get all posts
router.get('/', auth, postControllers.getPosts)

// get a post
router.get('/:id', auth, postControllers.getPost)

// update a post
router.put('/:id', auth, postControllers.updatePost) 

// delete a post
router.delete('/:id', auth,  postControllers.deletePost) 

module.exports = router 