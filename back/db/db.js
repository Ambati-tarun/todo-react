const mongoose = require('mongoose');

async function connectDB() {
    try {
        const connection = await mongoose.connect('mongodb+srv://admin:091722@cluster0.kmlkdqc.mongodb.net/to');
        console.log("connected to DB ...")
    } catch (error) {
        console.log("error in connnecting to database ", error)
    }
}

module.exports = {
    connectDB
}