const Like = require('../models/like.model')

// Like controllers

// like a post
const likePost = async (req, res, next) => {
    try {
        const { id } = req.params
        const { userId } = req.user

        const liked = await Like.findOne({ post: id, user: userId })
        if (liked) {
            return res.json({ message: 'Liked already' })
        }

        const like = new Like({ user: userId, post: id })
        await like.save()

        res.json(like)
    } catch (err) {
        next(err)
    }
}

// unlike a post
const unlikePost = async (req, res, next) => {
    try {
        const { id } = req.params
        const { userId } = req.user

        const liked = await Like.findOne({ post: id, user: userId })
        if (!liked) {
            return res.json({ message: 'Unliked already' })
        }

        const unlike = await Like.findOneAndDelete({ post: id, user: userId })
        res.json(unlike)
    } catch (err) {
        next(err)
    }
}

// get likes
const getLikes = async (req, res, next) => {
    try {
        const {id} = req.params
        
        const likes = await Like.find({post: id})

        const count = await Like.countDocuments({post: id})

        res.json({count, likes})
    } catch (err) {
        next(err)
    }
}

module.exports = {
    likePost,
    unlikePost,
    getLikes
}