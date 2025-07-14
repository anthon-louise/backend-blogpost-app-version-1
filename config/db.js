const mongoose = require('mongoose')

// Database connection 
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('Mongodb connected')
    } catch (err) {
        console.log('MongoDB error:', err)
    }
}


module.exports = connectDB