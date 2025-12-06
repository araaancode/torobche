// models/VisitCard.js
const mongoose = require("mongoose");

const visitCardSchema = new mongoose.Schema({
    template: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'VisitTemplate',
        required: true
    },

    title: {
        type: String,
        required: true,
        trim: true
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    doctorInfo: {
        name: String,
        specialty: String,
        phoneNumbers: [String],
        address: String,
        city: String
    },

    image: String,


    viewCount: {
        type: Number,
        default: 0
    },

    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }

});

const VisitCard = mongoose.model('VisitCard', visitCardSchema);

module.exports = VisitCard;