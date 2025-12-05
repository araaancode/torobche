const express = require('express');
const router = express.Router();
const resumeController = require('../controllers/resumeController');
const { protect, authorize } = require('../middleware/auth');
const multer = require('multer');
const path = require('path');

// Configure multer for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/resumes/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    },
    fileFilter: function (req, file, cb) {
        const filetypes = /jpeg|jpg|png|gif/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error('فقط فایل‌های تصویری مجاز هستند (jpeg, jpg, png, gif)'));
    }
});

// ==================== PUBLIC ROUTES ====================

// Search public resumes
router.get('/search/public', resumeController.searchResumes);

// Get popular resumes
router.get('/popular', resumeController.getPopularResumes);

// Get resume by short URL
router.get('/short/:shortUrl', resumeController.getResumeByShortUrl);

// Get resume by unique code
router.get('/code/:uniqueCode', resumeController.getResumeByUniqueCode);

// Get QR Code image
router.get('/:id/qr-code', resumeController.getQRCode);

// Get QR Code with text
router.get('/:id/qr-code-with-text', resumeController.getQRCodeWithText);

// Download resume as PDF
router.get('/:id/pdf', resumeController.downloadPDF);

// Export resume as JSON
router.get('/:id/json', resumeController.exportJSON);

// Export resume as vCard
router.get('/:id/vcard', resumeController.exportVCard);

// Get single resume (public if public)
router.get('/:id', resumeController.getResume);

// Get all resumes (filtered)
router.get('/', resumeController.getResumes);

// ==================== PROTECTED ROUTES ====================

// Apply authentication middleware
router.use(protect);

// ==================== USER ROUTES ====================

// Create new resume
router.post('/', resumeController.createResume);

// Get user's resumes
router.get('/user/my-resumes', resumeController.getMyResumes);

// Get user's default resume
router.get('/user/default', resumeController.getDefaultResume);

// Get resume statistics
router.get('/stats/overall', resumeController.getResumeStats);

// ==================== RESUME-SPECIFIC ROUTES ====================

// Update resume
router.put('/:id', resumeController.updateResume);

// Delete resume
router.delete('/:id', resumeController.deleteResume);

// Set as default resume
router.put('/:id/set-default', resumeController.setAsDefault);

// Duplicate resume
router.post('/:id/duplicate', resumeController.duplicateResume);

// Generate QR Code
router.post('/:id/generate-qr', resumeController.generateQRCode);

// Update QR Code settings
router.put('/:id/qr-settings', resumeController.updateQRSettings);

// Get QR Code analytics
router.get('/:id/qr-analytics', resumeController.getQRAnalytics);

// Update privacy settings
router.put('/:id/privacy', resumeController.updatePrivacySettings);

// Update resume settings
router.put('/:id/settings', resumeController.updateSettings);

// Upload profile image
router.post('/:id/upload-image', upload.single('profileImage'), resumeController.uploadProfileImage);

// Get change log
router.get('/:id/changelog', resumeController.getChangeLog);

// Restore to previous version
router.post('/:id/restore/:version', resumeController.restoreVersion);

// ==================== ADMIN ROUTES ====================

router.use(authorize('admin'));

// Verify resume
router.put('/:id/verify', resumeController.verifyResume);

module.exports = router;