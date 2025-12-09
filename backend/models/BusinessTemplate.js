const mongoose = require("mongoose")

const businessTemplateSchema = new mongoose.Schema({

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

}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

businessTemplateSchema.index({ title: 'text', description: 'text' });
businessTemplateSchema.index({ user: 1 });
businessTemplateSchema.index({ price: 1 });


const BusinessTemplate = mongoose.model('BusinessTemplate', businessTemplateSchema)

module.exports = BusinessTemplate