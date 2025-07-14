const Joi = require('joi')

const idParamSchema = Joi.object({
    id: Joi.string().length(24).hex().required()
})

// Id params validation
const validateParams = (req, res, next) => {
    const { error } = idParamSchema.validate(req.params)
    if (error) {
        return res.status(400).json({ message: error.details[0].message })
    }
    next()
}

module.exports = validateParams