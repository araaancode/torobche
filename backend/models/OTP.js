const mongoose = require("mongoose");

const OtpSchema = new mongoose.Schema(
    {
        phone: {
            type: String,
            required: true,
        },
        code: {
            type: String,
            required: true,
        },
        expireAt: {
            type: Date,
            required: true,
            index: { expires: 0 } // TTL index for automatic document deletion
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Otp", OtpSchema);
