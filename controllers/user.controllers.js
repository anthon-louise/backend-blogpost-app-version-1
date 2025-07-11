const express = require('express')
const bcrypt = require('bcrypt')
const User = require('../models/user.model')

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

        res.json({ message: 'Signup successfully!' })
    } catch (err) {
        next(err)
    }
}

module.exports = { signupUser }