// utils/sendOTP.js
const request = require("request");

/**
 * Send OTP to phone number using ippanel.com
 * @param {string} phone - Phone number (e.g., "09123456789")
 * @param {string|number} code - 6-digit OTP code
 * @returns {Promise<boolean>} - Returns true if SMS sent successfully
 */
const sendOTP = (phone, code) => {
    return new Promise((resolve, reject) => {
        // Ensure phone number is in correct format
        const formattedPhone = phone.startsWith('0') ? `98${phone.slice(1)}` : phone;

        request.post(
            {
                url: "http://ippanel.com/api/select",
                body: {
                    op: "pattern",
                    user: "araaancode",
                    pass: "36247602i@Aran",
                    fromNum: "3000505",
                    toNum: formattedPhone,
                    patternCode: "v696kiixlx49cpv",
                    inputData: [{ "verification-code": code.toString() }],
                },
                json: true,
            },
            function (error, response, body) {
                if (!error && response.statusCode === 200) {
                    console.log(`OTP ${code} sent successfully to ${phone}`);
                    console.log('SMS Provider Response:', body);
                    resolve(true);
                } else {
                    console.error('Error sending OTP:', error || body);
                    resolve(false); // Return false instead of rejecting to handle gracefully
                }
            }
        );
    });
};

/**
 * Send SMS with custom message
 * @param {string} phone - Phone number
 * @param {string} message - Message to send
 * @returns {Promise<boolean>} - Success status
 */
const sendSMS = (phone, message) => {
    return new Promise((resolve, reject) => {
        const formattedPhone = phone.startsWith('0') ? `98${phone.slice(1)}` : phone;

        request.post(
            {
                url: "http://ippanel.com/api/select",
                body: {
                    op: "send",
                    user: "araaancode",
                    pass: "36247602i@Aran",
                    fromNum: "3000505",
                    toNum: [formattedPhone],
                    message,
                },
                json: true,
            },
            function (error, response, body) {
                if (!error && response.statusCode === 200) {
                    console.log(`SMS sent to ${phone}`);
                    resolve(true);
                } else {
                    console.error('Error sending SMS:', error || body);
                    resolve(false);
                }
            }
        );
    });
};

module.exports = {
    sendOTP,
    sendSMS
};