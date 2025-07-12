const mongoose = require('mongoose')

// User settings schema
const userSettingsSchema = new mongoose.Schema({
    colorTheme: {
        type: String,
        enum: ['light', 'dark'],
        default: 'light'
    },
    lang: {
        type: String,
        enum: ['eng', 'fil'],
        default: 'eng'
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

module.exports = mongoose.model('UserSetting', userSettingsSchema)