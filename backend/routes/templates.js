const express = require('express');
const router = express.Router();
const { upload } = require('../config/multerConfig');
const templatesCtrls = require("../controllers/templates");

// اعمال میدلور مالتر برای روترهایی که نیاز به آپلود عکس دارند
router.get('/', templatesCtrls.getTemplates); // دریافت همه قالب‌ها
router.get('/:id', templatesCtrls.getTemplate); // دریافت یک قالب
router.post('/', upload.single('image'), templatesCtrls.createTemplate); // ایجاد قالب جدید با عکس
router.put('/:id/update', templatesCtrls.updateTemplate); // بروزرسانی اطلاعات قالب
router.put('/:id/update-image', upload.single('image'), templatesCtrls.updateTemplateImage); // بروزرسانی عکس قالب
router.put('/:id/update-colors', templatesCtrls.updateTemplateColors); // بروزرسانی رنگ‌های قالب
router.delete('/:id', templatesCtrls.deleteTemplate); // حذف قالب

module.exports = router;