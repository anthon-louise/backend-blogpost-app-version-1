const jwt = require('jsonwebtoken')

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
        req.user=decoded
        next()
    } catch (err) {
        next(err)
    }
}

module.exports = auth