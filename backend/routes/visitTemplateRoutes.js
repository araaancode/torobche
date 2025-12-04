// routes/visitTemplateRoutes.js
const express = require('express');
const router = express.Router();
const visitTemplateController = require('../controllers/visitTemplateController');
const { upload } = require('../config/multerConfig');

// آپلود فایل‌های قالب
const templateUpload = upload.fields([
    { name: 'logo', maxCount: 1 },
    { name: 'profileImage', maxCount: 1 },
    { name: 'backgroundImage', maxCount: 1 }
]);

// مسیرهای عمومی
router.get('/', visitTemplateController.getAllTemplates);
router.get('/search', visitTemplateController.searchTemplates);
router.get('/user/:userId', visitTemplateController.getUserTemplates);
router.get('/:id', visitTemplateController.getTemplateById);

// مسیرهای احراز هویت شده
router.post('/', templateUpload, visitTemplateController.createTemplate);
router.put('/:id', templateUpload, visitTemplateController.updateTemplate);
router.delete('/:id', visitTemplateController.deleteTemplate);
router.patch('/:id/toggle-status', visitTemplateController.toggleTemplateStatus);

module.exports = router;