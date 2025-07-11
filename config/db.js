const mongoose = require('mongoose')

// Database connection 
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('Mongodb connected')
    } catch (err) {
        next(err)
    }
}


module.exports = connectDB