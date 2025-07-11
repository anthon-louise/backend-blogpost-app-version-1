const express = require('express')
const router = express.Router()
const postControllers = require('../controllers/post.controller')

// Post routes:

// create a post
router.post('/', postControllers.createPost)

// get all posts
router.get('/', postControllers.getPosts)

// get a post
router.get('/:id', postControllers.getPost)

// update a post
router.put('/:id', postControllers.updatePost) 

// delete a post
router.delete('/:id', postControllers.deletePost) 

module.exports = router 