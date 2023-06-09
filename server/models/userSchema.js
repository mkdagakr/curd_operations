const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    avatar:{
        type: String,
        required: true
    },
    department:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    username:{
        type: String,
        required: true,
        unique: true
    },
    phone:{
        type: Number,
        required: true
    },
    password:{
        type: String,
        required: true
    }
})

const user = mongoose.model('Users',userSchema);

module.exports = user;