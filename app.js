const express = require('express')
const cookieParser = require('cookie-parser')
const app = express()
const userRoutes = require('./routes/user.routes')
const postRoutes = require('./routes/post.routes')
const userSettingRoutes = require('./routes/userSetting.routes')

app.use(express.json())
app.use(cookieParser())

app.use('/api/user', userRoutes)
app.use('/api/post', postRoutes)
app.use('/api/settings', userSettingRoutes)

module.exports = app