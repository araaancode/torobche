// server/utils/qrGenerator.js
const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');

const generateQRCode = async (resumeId, url) => {
    try {
        const qrCodeData = await QRCode.toDataURL(url);
        return qrCodeData;
    } catch (error) {
        throw new Error('خطا در تولید QR Code');
    }
};