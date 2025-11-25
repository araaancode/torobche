module.exports = function normalizePhone(phone) {
    return phone.replace(/[^0-9]/g, "");
};
