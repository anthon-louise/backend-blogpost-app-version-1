const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = require('../models/user.model')

// Auth middleware to protect private routes
const auth = async (req, res, next) => {
    const token = req.cookies.token
    if (!token) {
        return res.json({message: 'Not authorized!'})
    }
    try {
        const decoded = await jwt.verify(
            token,
            process.env.SECRET
        )

        if (!mongoose.Types.ObjectId.isValid(decoded.userId)) {
            return res.status(400).json({message: 'User ID not valid!'})
        }

        const user = await User.findById(decoded.userId)
        if (!user) {
            return res.status(404).json({message: 'User not found'})
        }

        req.user=decoded
        
        next()
    } catch (err) {
        next(err)
    }
}

module.exports = auth