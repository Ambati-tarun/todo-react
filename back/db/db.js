const mongoose = require('mongoose');
require('dotenv').config();

async function connectDB() {
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URI);
        console.log("connected to DB ...")
    } catch (error) {
        console.log("error in connnecting to database ", error)
    }
}

module.exports = {
    connectDB
}