const Comment = require('../models/comment.model')

// Comment controllers:

// update comment
const updateComment = async (req, res, next) => {
    try {
        const { commentId } = req.params
        const { userId } = req.user

        const { content } = req.body
        if (!content) {
            return res.status(400).json({ message: 'Comment content required' })
        }

        const comment = await Comment.findOneAndUpdate(
            { _id: commentId, owner: userId },
            { content },
            { new: true, runValidators: true }
        )
        if (!content) {
            return res.status(404).json({ message: 'Comment not found' })
        }

        res.json(comment)
    } catch (err) {
        next(err)
    }
}

// delete comment
const deleteComment = async (req, res, next) => {
    try {
        const {commentId} = req.params
        const {userId} = req.user

        const comment = await Comment.findOneAndDelete({_id: commentId, owner: userId})
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' })
        }

        res.json(comment)
    } catch (err) {
        next(err)
    }
}

module.exports = {
    updateComment,
    deleteComment
}