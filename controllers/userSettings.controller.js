const UserSetting = require('../models/userSettings.model')

// Controllers:

// get the settings of a user
const getUserSettings = async (req, res, next) => {
    try {
        const userSetting = await UserSetting.findOne({ owner: req.user.userId }).populate('owner', 'email')
        res.json(userSetting)
    } catch (err) {
        next(err)
    }
}

// update the settings of a user
const updateUserSettings = async (req, res, next) => {
    try {
        const body = req.body
        if (!body) {
            return res.status(400).json({message: 'Body required'})
        }
        
        const userSetting = await UserSetting.findOneAndUpdate(
            {owner: req.user.userId},
            body,
            {new: true, runValidators: true}
        )
        if (!userSetting) {
            return res.status(400).json({message: 'Settings not found'})
        }

        res.json(userSetting)
    } catch (err) {
        next(err)
    }
}

module.exports = {
    getUserSettings,
    updateUserSettings
}