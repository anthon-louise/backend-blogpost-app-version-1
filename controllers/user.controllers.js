const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Joi = require('joi')
const User = require('../models/user.model')
const UserSetting = require('../models/userSettings.model')


// Joi validation:

// user signup validation
const userSignupSchema = Joi.object({
    email: Joi.string().trim().lowercase().email().required(),
    password: Joi.string().min(8).required()
})

// admin signup validation
const adminSignupSchema = Joi.object({
    email: Joi.string().trim().lowercase().email().required(),
    password: Joi.string().min(8).required(),
    adminpass: Joi.string().required()
})

// login schema validation
const loginSchema = Joi.object({
    email: Joi.string().trim().lowercase().email().required(),
    password: Joi.string().required()
})


// Controllers:

// signup a user
const signupUser = async (req, res, next) => {
    try {
        const { error, value } = userSignupSchema.validate(req.body)
        if (error) {
            return res.status(400).json({ message: error.details[0].message })
        }

        const { email, password } = value

        const existingEmail = await User.findOne({ email })
        if (existingEmail) {
            return res.status(409).json({ message: 'Email already exists' })
        }

        const hashPassword = await bcrypt.hash(password, 10)

        const user = new User({ email, password: hashPassword, role: 'user' })
        await user.save()

        const userSetting = new UserSetting({ owner: user._id })
        await userSetting.save()

        res.json({ message: 'Signup successfully!' })
    } catch (err) {
        next(err)
    }
}

// login as a user
const loginUser = async (req, res, next) => {
    try {
        const { error, value } = loginSchema.validate(req.body)
        if (error) {
            return res.status(400).json({ message: error.details[0].message })
        }

        const { email, password } = value

        const user = await User.findOne({ email })
        if (!user || user.role !== 'user') {
            return res.status(400).json({ message: 'Invalid user' })
        }

        const isValid = await bcrypt.compare(password, user.password)
        if (!isValid) {
            return res.status(400).json({ message: 'Invalid password' })
        }

        const token = jwt.sign(
            { userId: user._id, role: 'user' },
            process.env.SECRET,
            { expiresIn: '1h' }
        )

        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            maxAge: 3600000
        })

        res.status(201).json({ message: 'Login successfully' })
    } catch (err) {
        next(err)
    }
}

// signup as an admin
const signupAdmin = async (req, res, next) => {
    try {
        const {error, value} = adminSignupSchema.validate(req.body)
        if (error) {
            return res.status(400).json({message: error.details[0].message})
        }

        const {email, password, adminpass} = value

        if (adminpass !== process.env.ADMINPASS) {
            return res.status(400).json({ message: 'Invalid Admin Password' })
        }

        const existingEmail = await User.findOne({ email })
        if (existingEmail) {
            return res.status(400).json({ message: 'Email already exists' })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const admin = new User({ email, password: hashedPassword, role: 'admin' })
        await admin.save()

        res.status(201).json({ message: 'Signup as admin success' })
    } catch (err) {
        next(err)
    }
}

// login as an admin
const loginAdmin = async (req, res, next) => {
    try {
        const {error, value} = loginSchema.validate(req.body)
        if (error) {
            return res.status(400).json({message: error.details[0].message})
        }

        const {email, password} = value

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: 'User does not exist' })
        }

        const isValid = await bcrypt.compare(password, user.password)
        if (!isValid) {
            return res.status(400).json({ message: 'Invalid password' })
        }

        const token = jwt.sign(
            { userId: user._id, role: 'admin' },
            process.env.SECRET,
            { expiresIn: '1h' }
        )

        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'strict',
            secure: false,
            maxAge: 3600000
        })

        res.status(200).json({ message: 'Login success' })
    } catch (err) {
        next(err)
    }
}

module.exports = { signupUser, loginUser, signupAdmin, loginAdmin }