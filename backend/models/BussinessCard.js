// models/BusinessCard.js
const mongoose = require("mongoose");

const businessCardSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "عنوان کارت الزامی است"],
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
        shareableLink: {
            type: String,
            trim: true,
        },
        ownerName: {
            type: String,
            required: [true, "نام صاحب کسب‌وکار الزامی است"],
            trim: true,
        },
        businessType: {
            type: String,
            required: [true, "نوع کسب‌وکار الزامی است"],
            trim: true,
        },
        phone: {
            type: String,
            trim: true,
        },
        address: {
            type: String,
            trim: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        qrCode: {
            type: String,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("BusinessCard", businessCardSchema);
