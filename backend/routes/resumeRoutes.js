const express = require('express');
const router = express.Router();
const ResumeController = require('../controllers/resumeController');

// همه مسیرها با پیشوند /resumes شروع می‌شوند
router.post('/', ResumeController.createResume);
router.get('/', ResumeController.getAllResumes);
router.get('/:id', ResumeController.getResumeById);
router.put('/:id', ResumeController.updateResume);
router.get('/:id/qrcode', ResumeController.generateQRCode);

module.exports = router;