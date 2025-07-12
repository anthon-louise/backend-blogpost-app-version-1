const mongoose = require('mongoose')
const Comment = require('../models/comment.model')

// Post schema
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

postSchema.pre('deleteOne', {document: true, query: false}, async function(next) {
    const postId = this._id
    await Comment.deleteMany({post: postId})
    next()
})

module.exports = mongoose.model('Post', postSchema)