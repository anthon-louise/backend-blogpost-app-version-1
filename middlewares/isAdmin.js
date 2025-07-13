const isAdmin = async (req, res, next) => {
    try {
        if (req.user && req.user.role === 'admin') {
            next()
        } else {
            res.status(400).json({message: 'Must be admin'})
        }
    } catch (err) {
        next(err)
    }
}

module.exports = isAdmin