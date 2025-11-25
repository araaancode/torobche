const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        // required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        // required: true,
        trim: true
    },

    isVerified: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true })


const User = mongoose.model('User', userSchema)

module.exports = User