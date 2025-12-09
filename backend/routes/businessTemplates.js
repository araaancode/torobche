// routes/templates.js
const express = require('express');
const router = express.Router();
const upload = require('../config/multerConfig');
const businessTemplatesCtrls = require("../controllers/bussinessTemplates");

router.get('/', businessTemplatesCtrls.getBusinessTemplates);
router.get('/:id', businessTemplatesCtrls.getBusinessTemplate);
router.post('/', upload.single('image'), businessTemplatesCtrls.createBusinessTemplate);
// router.put('/:id/update', businessTemplatesCtrls.updateVisitTemplate);
// router.put('/:id/update-image', upload.single('image'), businessTemplatesCtrls.updateVisitTemplateImage);
// router.put('/:id/update-colors', businessTemplatesCtrls.updateVisitTemplateColors);
// router.delete('/:id', businessTemplatesCtrls.deleteVisitTemplate);

module.exports = router;