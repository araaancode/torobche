const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Otp = require("../models/OTP");
const jwt = require("jsonwebtoken");
const normalizePhone = require("../utils/normalizePhone");
const otpSimulator = require("../services/otpSimulator");

// تولید OTP تصادفی
function generateOtp() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

// ارسال کد OTP
router.post("/send-otp", async (req, res) => {
    try {
        let { phone } = req.body;
        phone = normalizePhone(phone);

        const code = generateOtp();

        await Otp.create({
            phone,
            code,
            expireAt: new Date(Date.now() + 2 * 60 * 1000) // 2 دقیقه اعتبار
        });

        await otpSimulator.sendOtp(phone, code);

        return res.json({ success: true, message: "OTP sent (simulated)" });
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Server Error" });
    }
});

// تایید کد OTP
router.post("/verify-otp", async (req, res) => {
    try {
        let { phone, code } = req.body;
        phone = normalizePhone(phone);

        const otpRecord = await Otp.findOne({ phone }).sort({ createdAt: -1 });

        if (!otpRecord) {
            return res.status(400).json({ message: "OTP not found" });
        }

        if (otpRecord.code !== code) {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        let user = await User.findOne({ phone });

        if (!user) {
            user = await User.create({ phone, isVerified: true });
        }

        await Otp.deleteMany({ phone });

        // تولید توکن JWT
        const token = jwt.sign(
            { id: user._id, phone: user.phone },
            "JWT_SECRET_KEY",
            { expiresIn: "30d" }
        );

        return res.json({
            success: true,
            message: "User verified",
            token,
            user
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;
