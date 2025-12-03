const mongoose = require("mongoose")

const foodSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
    },
    menu: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Menu'
    },
    price: { type: Number, required: true, },
    images: [{ type: String }],
    ingredients: [{ type: String }],
    category: { type: String },
    inStock: {
        type: Boolean,
        default: true
    }

}, { timestamps: true })


const Food = mongoose.model('Food', foodSchema)

module.exports = Food