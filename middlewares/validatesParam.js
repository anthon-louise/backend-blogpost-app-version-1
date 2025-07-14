// Id params validation
const validateParams = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.params)
        if (error) {
            return res.status(400).json({ message: error.details[0].message })
        }
        next()
    }
}

module.exports = validateParams