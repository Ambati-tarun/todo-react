const mongoose = require("mongoose");
const { boolean } = require("zod");

const userSchema = mongoose.Schema({
    username : {
        type : String,
        required : true ,
        unique : false
    },
    mail : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true,
        minLenght : 4
    }
})


const taskSchema = mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true

    },
    task : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    isCompleted : {
        type : Boolean,
        required : true

    },
    delete : {
        type : Boolean,
        required : true
    }
})

const User  =  mongoose.model('User' , userSchema);
const Task = mongoose.model('Task' , taskSchema);

module.exports = {
    User, 
    Task
}