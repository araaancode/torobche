// middleware/validate.js
const { check, validationResult } = require('express-validator');

const validateBusinessCard = [
    check('title')
        .notEmpty()
        .withMessage('عنوان کارت الزامی است')
        .trim()
        .escape(),

    check('ownerName')
        .notEmpty()
        .withMessage('نام صاحب کسب‌وکار الزامی است')
        .trim()
        .escape(),

    check('businessType')
        .notEmpty()
        .withMessage('نوع کسب‌وکار الزامی است')
        .trim()
        .escape(),

    check('phone')
        .optional()
        .isMobilePhone('fa-IR') // For Iranian phone numbers, adjust as needed
        .withMessage('شماره تلفن معتبر نیست'),

    check('shareableLink')
        .optional()
        .isURL()
        .withMessage('لینک قابل اشتراک باید یک URL معتبر باشد'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }
        next();
    }
];

module.exports = {
    validateBusinessCard
};