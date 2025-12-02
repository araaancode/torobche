const mongoose = require("mongoose")

const menuSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    template: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Template'
    }],

    category: {
        type: String,
        required: true,
    },
    icon: {
        type: String,
        required: true,
    },
    bussinessName: {
        type: String,
        required: true,
    },

}, { timestamps: true })


const Menu = mongoose.model('Menu', menuSchema)

module.exports = Menu