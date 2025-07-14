const Joi = require('joi')
const Comment = require('../models/comment.model')

// Comment body schema validation
const commentBodySchema = Joi.object({
    content: Joi.string().trim().min(1).required()
})

// Comment controllers:

// update comment
const updateComment = async (req, res, next) => {
    try {
        const { id } = req.params
        const { userId } = req.user

        const {error, value} = commentBodySchema.validate(req.body)
        if (error) {
            res.status(400).json({message: error.details[0].message})
        }

        const {content} = value

        const comment = await Comment.findOneAndUpdate(
            { _id: id, owner: userId },
            { content },
            { new: true, runValidators: true }
        )
        if (!comment) {
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
        const {id} = req.params
        const {userId} = req.user

        const comment = await Comment.findOneAndDelete({_id: id, owner: userId})
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