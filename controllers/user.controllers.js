const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user.model')
const UserSetting = require('../models/userSettings.model')

// Controllers:

// signup a user
const signupUser = async (req, res, next) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password required' })
        }

        const existingEmail = await User.findOne({ email })
        if (existingEmail) {
            return res.status(400).json({ message: 'Email already exists' })
        }

        const hashPassword = await bcrypt.hash(password, 10)

        const user = new User({ email, password: hashPassword, role: 'user' })
        user.save()

        const userSetting = new UserSetting({ owner: user._id })
        userSetting.save()

        res.json({ message: 'Signup successfully!' })
    } catch (err) {
        next(err)
    }
}


// login as a user
const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password required' })
        }

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: 'User does not exist' })
        }

        if (user.role === 'admin') {
            return res.status(400).json({ message: 'Must be a user' })
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
            maxAge: 360000
        })

        res.json({ message: 'Login successfully' })
    } catch (err) {
        next(err)
    }
}

// signup as an admin
const signupAdmin = async (req, res, next) => {
    try {
        const { email, password, adminpass } = req.body
        if (adminpass !== process.env.ADMINPASS) {
            return res.status(400).json({ message: 'Invalid Admin Password' })
        }


        const existingEmail = await User.findOne({ email })
        if (existingEmail) {
            return res.status(400).json({ message: 'Email already exists' })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const admin = new User({ email, password: hashedPassword, role: 'admin' })
        admin.save()

        res.json({ message: 'Signup as admin success' })
    } catch (err) {
        next(err)
    }
}

const loginAdmin = async (req, res, next) => {
    try {
        const { email, password } = req.body

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
            maxAge: 360000
        })

        res.json({ message: 'Login success' })
    } catch (err) {
        next(err)
    }
}

module.exports = { signupUser, loginUser, signupAdmin, loginAdmin }