const mongoose = require("mongoose")

const templateSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
    },

    image: {
        type: String,
        required: true,
    },
    colorPallete: [{
        type: String,
        required: true,
    }],


}, { timestamps: true })


const Template = mongoose.model('Template', templateSchema)

module.exports = Template