const mongoose = require('mongoose');

const empSchema = new mongoose.Schema({
    name:{
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
    phone:{
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const emp = mongoose.model('Employees',empSchema);

module.exports = emp;