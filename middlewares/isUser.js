const isUser = async (req, res, next) => {
    try {
        if (req.user && req.user.role === 'user') {
            next()
        } else {
            return res.status(400).json({message: 'Must be a user'})
        }
    } catch (err) {
        next(err)
    }
}

module.exports = isUser