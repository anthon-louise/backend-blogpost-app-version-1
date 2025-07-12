// Error-handler middleware
module.exports = (err, req, res, next) => {
    console.log(err.stack)
    res.status(500).json({ message: 'Server error', error: err.message })
}