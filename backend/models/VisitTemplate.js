const mongoose = require("mongoose")

const visitTemplateSchema = new mongoose.Schema({

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

visitTemplateSchema.index({ title: 'text', description: 'text' });
visitTemplateSchema.index({ user: 1 });
visitTemplateSchema.index({ price: 1 });


const VisitTemplate = mongoose.model('VisitTemplate', visitTemplateSchema)

module.exports = VisitTemplate