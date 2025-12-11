const express = require('express');
const router = express.Router();
const ResumeTemplateController = require('../controllers/resumeTemplateController');

// همه مسیرها با پیشوند /resume-templates شروع می‌شوند
router.post('/', ResumeTemplateController.createTemplate);
router.get('/', ResumeTemplateController.getAllTemplates);
router.get('/:id', ResumeTemplateController.getTemplateById);
router.put('/:id', ResumeTemplateController.updateTemplate);

module.exports = router;