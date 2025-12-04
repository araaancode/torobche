// routes/visitTemplateRoutes.js
const express = require('express');
const router = express.Router();
const visitTemplateCtrls = require('../controllers/visitTemplates');
const upload = require('../config/multerConfig');

const templateUpload = upload.fields([
    { name: 'logo', maxCount: 1 },
    { name: 'profileImage', maxCount: 1 },
    { name: 'backgroundImage', maxCount: 1 }
]);

router.get('/', visitTemplateCtrls.getAllTemplates);
router.get('/search', visitTemplateCtrls.searchTemplates);
router.get('/user/:userId', visitTemplateCtrls.getUserTemplates);
router.get('/:id', visitTemplateCtrls.getTemplateById);

router.post('/', templateUpload, visitTemplateCtrls.createTemplate);
router.put('/:id', templateUpload, visitTemplateCtrls.updateTemplate);
router.delete('/:id', visitTemplateCtrls.deleteTemplate);
router.patch('/:id/toggle-status', visitTemplateCtrls.toggleTemplateStatus);

module.exports = router;