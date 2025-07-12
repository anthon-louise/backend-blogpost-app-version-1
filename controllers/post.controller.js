const Post = require('../models/post.model')
const Comment = require('../models/comment.model')

// Post Controllers:

// create a user's post
const createPost = async (req, res, next) => {
    try {
        const { title, content } = req.body
        if (!title || !content) {
            return res.status(400).json({ message: 'Title and content required' })
        }

        const post = new Post({ title, content, owner: req.user.userId })
        post.save()

        res.json(post)
    } catch (err) {
        next(err)
    }
}

// Get all user's posts
const getPosts = async (req, res, next) => {
    try {
        const posts = await Post.find({ owner: req.user.userId })
        res.json(posts)
    } catch (err) {
        next(err)
    }
}

// Get a user's post
const getPost = async (req, res, next) => {
    try {
        const { id } = req.params

        const post = await Post.findOne({ _id: id, owner: req.user.userId })
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

        const post = await Post.findOneAndUpdate(
            { _id: id, owner: req.user.userId },
            { title, content },
            { new: true, runValidators: true }
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
        const { id } = req.params

        const post = await Post.findOne({ _id: id, owner: req.user.userId })
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
        const { postId } = req.params
        const { userId } = req.user

        const post = await Post.findById(postId)
        if (!post) {
            return res.status(404).json({ message: 'Post not found' })
        }

        const { content } = req.body
        if (!content) {
            return res.status(400).json({ message: 'Comment content required' })
        }

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
        const { postId } = req.params

        const post = await Post.findById(postId)
        if (!post) {
            return res.status(404).json({ message: 'Post not found' })
        }

        const comments = await Comment.find({ post: postId }).populate('owner', 'email').populate('post', 'title content')

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
    getComments
}