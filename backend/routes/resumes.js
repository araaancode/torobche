const express = require('express');
const router = express.Router();
const {
    createResume,
    getResumeSummary,
    getFullResume,
    getResume,
    updateResume,
    deleteResume,
    getResumeQRCode
} = require('../controllers/resumesController');

// Public routes for resume sharing
router.get('/r/:publicId', getResumeSummary);
router.get('/r/:publicId/full', getFullResume);

// Resume management routes
router.post('/resumes', createResume);
router.get('/resumes/:id', getResume);
router.put('/resumes/:id', updateResume);
router.delete('/resumes/:id', deleteResume);
router.get('/resumes/:id/qr', getResumeQRCode);

module.exports = router;