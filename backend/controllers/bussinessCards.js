const BusinessCard = require('../models/BussinessCard');
const asyncHandler = require('express-async-handler');

// @desc    Get all business cards for a user
// @route   GET /api/business-cards
// @access  Private
const getBusinessCards = asyncHandler(async (req, res) => {
    // Assuming user is authenticated and req.user.id exists
    const businessCards = await BusinessCard.find({ userId: req.user.id });

    res.status(200).json({
        success: true,
        count: businessCards.length,
        data: businessCards
    });
});

// @desc    Get single business card
// @route   GET /api/business-cards/:id
// @access  Private
const getBusinessCard = asyncHandler(async (req, res) => {
    const businessCard = await BusinessCard.findOne({
        _id: req.params.id,
        userId: req.user.id
    });

    if (!businessCard) {
        res.status(404);
        throw new Error('Business card not found or access denied');
    }

    res.status(200).json({
        success: true,
        data: businessCard
    });
});

// @desc    Create new business card
// @route   POST /api/business-cards
// @access  Private
const createBusinessCard = asyncHandler(async (req, res) => {
    const {
        title,
        description,
        ownerName,
        businessType,
        phone,
        address
    } = req.body;

    // Check required fields
    if (!title || !ownerName || !businessType) {
        res.status(400);
        throw new Error('عنوان، نام صاحب کسب‌وکار و نوع کسب‌وکار الزامی هستند');
    }

    // Create shareable link (you can customize this logic)
    const shareableLink = `/card/${Date.now().toString(36)}`;

    const businessCard = await BusinessCard.create({
        title,
        description,
        ownerName,
        businessType,
        phone,
        address,
        shareableLink,
        userId: "6934915a7e555af244da3840"
    });

    res.status(201).json({
        success: true,
        data: businessCard,
        message: 'کارت ویزیت با موفقیت ایجاد شد'
    });
});

// @desc    Update business card
// @route   PUT /api/business-cards/:id
// @access  Private
const updateBusinessCard = asyncHandler(async (req, res) => {
    let businessCard = await BusinessCard.findOne({
        _id: req.params.id,
        userId: req.user.id
    });

    if (!businessCard) {
        res.status(404);
        throw new Error('Business card not found or access denied');
    }

    // Update fields
    const updatableFields = [
        'title',
        'description',
        'ownerName',
        'businessType',
        'phone',
        'address'
    ];

    updatableFields.forEach(field => {
        if (req.body[field] !== undefined) {
            businessCard[field] = req.body[field];
        }
    });

    const updatedBusinessCard = await businessCard.save();

    res.status(200).json({
        success: true,
        data: updatedBusinessCard,
        message: 'کارت ویزیت با موفقیت به‌روزرسانی شد'
    });
});

// @desc    Delete business card
// @route   DELETE /api/business-cards/:id
// @access  Private
const deleteBusinessCard = asyncHandler(async (req, res) => {
    const businessCard = await BusinessCard.findOne({
        _id: req.params.id,
        userId: req.user.id
    });

    if (!businessCard) {
        res.status(404);
        throw new Error('Business card not found or access denied');
    }

    await businessCard.deleteOne();

    res.status(200).json({
        success: true,
        data: {},
        message: 'کارت ویزیت با موفقیت حذف شد'
    });
});

// @desc    Generate QR code for business card
// @route   POST /api/business-cards/:id/generate-qr
// @access  Private
const generateQRCode = asyncHandler(async (req, res) => {
    const businessCard = await BusinessCard.findOne({
        _id: req.params.id,
        userId: req.user.id
    });

    if (!businessCard) {
        res.status(404);
        throw new Error('Business card not found or access denied');
    }

    // Generate QR code logic here
    // You can use a library like 'qrcode'
    // For example:
    // const qrCodeData = await qrCode.toDataURL(businessCard.shareableLink);

    // For now, we'll simulate it
    const qrCodeData = `data:image/png;base64,simulated_qr_code_for_${businessCard.shareableLink}`;

    businessCard.qrCode = qrCodeData;
    await businessCard.save();

    res.status(200).json({
        success: true,
        data: businessCard,
        message: 'QR Code با موفقیت ایجاد شد'
    });
});

// @desc    Get business card by shareable link (public access)
// @route   GET /api/business-cards/share/:link
// @access  Public
const getBusinessCardByShareLink = asyncHandler(async (req, res) => {
    const businessCard = await BusinessCard.findOne({
        shareableLink: `/card/${req.params.link}`
    });

    if (!businessCard) {
        res.status(404);
        throw new Error('Business card not found');
    }

    res.status(200).json({
        success: true,
        data: businessCard
    });
});

module.exports = {
    getBusinessCards,
    getBusinessCard,
    createBusinessCard,
    updateBusinessCard,
    deleteBusinessCard,
    generateQRCode,
    getBusinessCardByShareLink
};