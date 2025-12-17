// server/routes/resumeRoutes.js
const express = require('express');
const router = express.Router();
const resumeController = require('../controllers/resumeController');

router.post('/', resumeController.createResume);

router.get('/', resumeController.getAllResumes);

router.get('/search', resumeController.searchResumes);

router.get('/:id', resumeController.getResumeById);

router.get('/:id/stats', resumeController.getResumeStats);

router.get('/:id/pdf', resumeController.generatePDF);

router.put('/:id', resumeController.updateResume);

router.delete('/:id', resumeController.deleteResume);

module.exports = router;