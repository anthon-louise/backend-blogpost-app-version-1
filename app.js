const express = require('express')
const cookieParser = require('cookie-parser')
const app = express()
const userRoutes = require('./routes/user.routes')

app.use(express.json())
app.use(cookieParser())

app.use('/api/user', userRoutes)

module.exports = app