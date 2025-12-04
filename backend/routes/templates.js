// routes/templates.js
const express = require('express');
const router = express.Router();
const upload = require('../config/multerConfig'); // Now it's the upload instance
const templatesCtrls = require("../controllers/templates");

router.get('/', templatesCtrls.getTemplates);
router.get('/:id', templatesCtrls.getTemplate);
router.post('/', upload.single('image'), templatesCtrls.createTemplate);
router.put('/:id/update', templatesCtrls.updateTemplate);
router.put('/:id/update-image', upload.single('image'), templatesCtrls.updateTemplateImage);
router.put('/:id/update-colors', templatesCtrls.updateTemplateColors);
router.delete('/:id', templatesCtrls.deleteTemplate);

module.exports = router;