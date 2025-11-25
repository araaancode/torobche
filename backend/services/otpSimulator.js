module.exports.sendOtp = async (phone, code) => {
    console.log(`OTP for ${phone}: ${code}`);
    return { success: true, message: "OTP simulated and printed in console" };
};
