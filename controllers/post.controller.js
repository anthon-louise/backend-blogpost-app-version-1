const Post = require('../models/post.model')

// Post Controllers:

// create a post
const createPost = async (req, res, next) => {
    try {
        const { title, content } = req.body
        if (!title || !content) {
            return res.status(400).json({ message: 'Title and content required' })
        }

        const post = new Post({ title, content })
        post.save()

        res.json(post)
    } catch (err) {
        next(err)
    }
}

// Get all posts
const getPosts = async (req, res, next) => {
    try {
        const posts = await Post.find()
        res.json(posts)
    } catch (err) {
        next(err)
    }
}

// Get a post
const getPost = async (req, res, next) => {
    try {
        const { id } = req.params

        const post = await Post.findById(id)
        if (!post) {
            return res.status(400).json({ message: 'No post found' })
        }

        res.json(post)
    } catch (err) {
        next(err)
    }
}

// update a post
const updatePost = async (req, res, next) => {
    try {
        const { id } = req.params

        const { title, content } = req.body
        if (!title || !content) {
            return res.status(400).json({ message: 'Title and content required' })
        }

        const post = await Post.findByIdAndUpdate(
            id,
            {title, content},
            {new: true, runValidators: true}
        )
        if (!post) {
            return res.status(400).json({ message: 'No post found' })
        }

        res.json(post)
    } catch (err) {
        next(err)
    }
}

// delete post
const deletePost = async (req, res, next) => {
    try {
        const {id} = req.params

        const post = await Post.findByIdAndDelete(id)
        if (!post) {
            return res.status(400).json({ message: 'No post found' })
        }

        res.json(post)
    } catch (err) {
        next(err)
    }
}

module.exports = {
    createPost,
    getPosts,
    getPost,
    updatePost,
    deletePost
}