const express = require('express');
const router = express.Router();
const {
    getAllTemplates,
    getTemplate,
    createTemplate,
    updateTemplate,
    deleteTemplate
} = require('../controllers/resumeTemplatesController');

// Public routes
router.get('/', getAllTemplates);
router.get('/:id', getTemplate);

// Admin routes (in real app, add auth middleware)
router.post('/', createTemplate);
router.put('/:id', updateTemplate);
router.delete('/:id', deleteTemplate);

module.exports = router;