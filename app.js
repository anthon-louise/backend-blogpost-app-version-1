const express = require('express')
const cookieParser = require('cookie-parser')
const app = express()
const userRoutes = require('./routes/user.routes')
const postRoutes = require('./routes/post.routes')

app.use(express.json())
app.use(cookieParser())

app.use('/api/user', userRoutes)
app.use('/api/post', postRoutes)

module.exports = app