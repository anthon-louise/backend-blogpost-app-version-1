const Joi = require('joi')
const Post = require('../models/post.model')
const Comment = require('../models/comment.model')
const User = require('../models/user.model')

// Joi validation:

// post body schema validation
const postBodySchema = Joi.object({
    title: Joi.string().trim().min(3).max(100).required(),
    content: Joi.string().trim().min(1).required()
})

// comment body schema validation
const commentBodySchema = Joi.object({
    content: Joi.string().trim().min(1).required()
})

// Id param schema validation
const idParamSchema = Joi.object({
    id: Joi.string().length(24).hex().required()
})


// Post Controllers:

// create a user's post
const createPost = async (req, res, next) => {
    try {
        const { error, value } = postBodySchema.validate(req.body)
        if (error) {
            return res.status(400).json({ message: error.details[0].message })
        }

        const { title, content } = value

        const post = new Post({ title, content, owner: req.user.userId })
        await post.save()

        res.status(201).json(post)
    } catch (err) {
        next(err)
    }
}

// Get all user's posts
const getPosts = async (req, res, next) => {
    try {
        const {userId} = req.user

        const posts = await Post.find({ owner: userId }).select('title content')
        res.status(200).json(posts)
    } catch (err) {
        next(err)
    }
}

// Get a user's post
const getPost = async (req, res, next) => {
    try {
        const { id } = req.params

        const post = await Post.findOne({ _id: id, owner: req.user.userId }).select('title content')
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
        const { userId } = req.user

        const {error, value} = postBodySchema.validate(req.body)
        if (error) {
            return res.status(400).json({message: error.details[0].message})
        }

        const {title, content} = value

        const post = await Post.findOneAndUpdate(
            { _id: id, owner: userId },
            { title, content },
            { new: true, runValidators: true }
        )
        if (!post) {
            return res.status(400).json({ message: 'No post found' })
        }

        res.status(200).json({post})
    } catch (err) {
        next(err)
    }
}

// delete post
const deletePost = async (req, res, next) => {
    try {
        const { id } = req.params
        const {userId} = req.user
        
        const post = await Post.findOne({ _id: id, owner: userId })
        if (!post) {
            return res.status(400).json({ message: 'No post found' })
        }

        await post.deleteOne()

        res.json(post)
    } catch (err) {
        next(err)
    }
}

// create comment for post
const createComment = async (req, res, next) => {
    try {
        const postId = req.params.id
        const { userId } = req.user

        const post = await Post.findById(postId)
        if (!post) {
            return res.status(404).json({ message: 'Post not found' })
        }

        const {error, value} = commentBodySchema.validate(req.body)
        if (error) {
            return res.status(400).json({message: error.details[0].message})
        }

        const {content} = value

    

        const comment = new Comment({ content, owner: userId, post: postId })
        comment.save()

        res.json(comment)
    } catch (err) {
        next(err)
    }
}

// get comments from post
const getComments = async (req, res, next) => {
    try {
        const postId = req.params.id

        const post = await Post.findById(postId)
        if (!post) {
            return res.status(404).json({ message: 'Post not found' })
        }

        const comments = await Comment.find({ post: postId }).populate('post', 'content')

        res.json(comments)
    } catch (err) {
        next(err)
    }
}

module.exports = {
    createPost,
    getPosts,
    getPost,
    updatePost,
    deletePost,
    createComment,
    getComments,
    idParamSchema
}