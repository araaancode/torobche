const express = require('express');
const router = express.Router();
const businessCardController = require('../controllers/businessCardController');

// Import middleware
const { protect, authorize } = require('../middleware/auth');

// Public routes
router.get('/', businessCardController.getBusinessCards);
router.get('/type/:businessType', businessCardController.getBusinessCardsByType);
router.get('/search/nearby', businessCardController.getNearbyBusinessCards);
router.get('/types/list', businessCardController.getBusinessTypes);
router.get('/:id', businessCardController.getBusinessCard);
router.get('/:id/qr-code', businessCardController.getQRCode);
router.get('/short/:shortUrl', businessCardController.getBusinessCardByShortUrl);
router.get('/code/:uniqueCode', businessCardController.getBusinessCardByUniqueCode);
router.get('/template/:templateId', businessCardController.getBusinessCardsByTemplate);

// Protected routes (require authentication)
router.use(protect);

router.post('/', businessCardController.createBusinessCard);
router.post('/from-template/:templateId', businessCardController.createBusinessCardFromTemplate);
router.get('/user/my-cards', businessCardController.getMyBusinessCards);
router.put('/:id', businessCardController.updateBusinessCard);
router.delete('/:id', businessCardController.deleteBusinessCard);
router.post('/:id/duplicate', businessCardController.duplicateBusinessCard);

// QR Code related routes
router.post('/:id/generate-qr', businessCardController.generateQRCode);
router.put('/:id/qr-settings', businessCardController.updateQRSettings);
router.get('/:id/qr-analytics', businessCardController.getQRAnalytics);

// Admin only routes
router.use(authorize('admin'));

// Additional admin routes can be added here

module.exports = router;