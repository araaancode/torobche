const express = require('express');
const router = express.Router();
const {
    getBusinessCards,
    getBusinessCard,
    createBusinessCard,
    updateBusinessCard,
    deleteBusinessCard,
    generateQRCode,
    getBusinessCardByShareLink
} = require('../controllers/bussinessCards');

// Public route (no authentication required)
router.get('/share/:link', getBusinessCardByShareLink);

// Protected routes (require authentication)

router.route('/')
    .get(getBusinessCards)
    .post(createBusinessCard);

router.route('/:id')
    .get(getBusinessCard)
    .put(updateBusinessCard)
    .delete(deleteBusinessCard);

router.post('/:id/generate-qr', generateQRCode);

module.exports = router;