// routes/templates.js
const express = require('express');
const router = express.Router();
const upload = require('../config/multerConfig');
const visitTemplatesCtrls = require("../controllers/visitTemplates");

router.get('/', visitTemplatesCtrls.getVisitTemplates);
router.get('/:id', visitTemplatesCtrls.getVisitTemplate);
router.post('/', upload.single('image'), visitTemplatesCtrls.createVisitTemplate);
router.put('/:id/update', visitTemplatesCtrls.updateVisitTemplate);
router.put('/:id/update-image', upload.single('image'), visitTemplatesCtrls.updateVisitTemplateImage);
router.put('/:id/update-colors', visitTemplatesCtrls.updateVisitTemplateColors);
router.delete('/:id', visitTemplatesCtrls.deleteVisitTemplate);

module.exports = router;