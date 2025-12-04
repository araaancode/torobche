const express = require('express');
const router = express.Router();
const businessTemplateController = require('../controllers/businessTemplateController');

// Import middleware
const { protect, authorize } = require('../middleware/auth');

// Public routes
router.get('/', businessTemplateController.getBusinessTemplates);
router.get('/type/:businessType', businessTemplateController.getTemplatesByBusinessType);
router.get('/popular', businessTemplateController.getPopularTemplates);
router.get('/:id', businessTemplateController.getBusinessTemplate);
router.get('/:id/preview', businessTemplateController.previewTemplate);

// Protected routes
router.use(protect);

router.post('/:id/rate', businessTemplateController.rateTemplate);
router.get('/:id/stats', businessTemplateController.getTemplateStats);

// Admin and template designer routes
router.post('/', protect, businessTemplateController.createBusinessTemplate);
router.put('/:id', protect, businessTemplateController.updateBusinessTemplate);
router.delete('/:id', protect, businessTemplateController.deleteBusinessTemplate);
router.post('/:id/duplicate', protect, businessTemplateController.duplicateTemplate);

module.exports = router;