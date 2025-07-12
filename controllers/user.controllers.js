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

        const user = new User({ email, password: hashPassword })
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

        const isValid = await bcrypt.compare(password, user.password)
        if (!isValid) {
            return res.status(400).json({ message: 'Invalid password' })
        }

        const token = jwt.sign(
            { userId: user._id },
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

module.exports = { signupUser, loginUser }