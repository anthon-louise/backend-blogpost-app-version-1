const User = require('../models/user.model')

const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({role: 'user'})
        res.json(users)
    } catch (err) {
        next(err)
    }
}

module.exports = {
    getAllUsers
}