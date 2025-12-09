// // routes/menuRoutes.js
// const express = require('express');
// const router = express.Router();
// const upload = require('../config/multerConfig');
// const visitCardsCtrls = require("../controllers/visitCards");

// router.get('/', visitCardsCtrls.getVisitCards);
// router.get('/:id', visitCardsCtrls.getVisitCard);
// router.post('/', upload.fields([
//     { name: 'icon', maxCount: 1 },
//     { name: 'coverImage', maxCount: 1 }
// ]), visitCardsCtrls.createVisitCard);

// // router.put('/:id/update', visitCardsCtrls.updateMenu);
// // router.put('/:id/update-cover-image', upload.single('coverImage'), visitCardsCtrls.updateMenuCoverImage);
// // router.put('/:id/update-icon', upload.single('icon'), visitCardsCtrls.updateMenuIcon);
// // router.delete('/:id', visitCardsCtrls.deleteMenu);

// module.exports = router;


const express = require('express');
const router = express.Router();
const upload = require('../config/multerConfig');
const visitCardCtrls = require("../controllers/visitCards");
// const { protect, authorize } = require('../middleware/auth');

// ==================== مسیرهای عمومی (نیاز به لاگین ندارند) ====================

// جستجوی پزشکان برای عموم
router.get('/search', visitCardCtrls.searchDoctors);

// دریافت یک کارت ویزیت خاص (عمومی)
router.get('/:id', visitCardCtrls.getVisitCard);

// ==================== مسیرهای خصوصی (نیاز به احراز هویت) ====================

// همه مسیرهای زیر نیاز به احراز هویت دارند
// router.use(protect);

// ایجاد کارت ویزیت جدید
router.post('/',
    upload.fields([
        { name: 'icon', maxCount: 1 },
        { name: 'coverImage', maxCount: 1 }
    ]),
    visitCardCtrls.createVisitCard
);

// دریافت همه کارت ویزیت‌های کاربر
router.get('/', visitCardCtrls.getVisitCards);

// دریافت آمار کاربر
router.get('/user/stats', visitCardCtrls.getStats);

// به‌روزرسانی کارت ویزیت
router.put('/:id',
    upload.fields([
        { name: 'icon', maxCount: 1 },
        { name: 'coverImage', maxCount: 1 }
    ]),
    visitCardCtrls.updateVisitCard
);

// حذف کارت ویزیت
router.delete('/:id', visitCardCtrls.deleteVisitCard);

// انتشار کارت ویزیت
router.post('/:id/publish', visitCardCtrls.publishVisitCard);

// ==================== مسیرهای ادمین (نیاز به دسترسی ادمین) ====================

// // دریافت همه کارت ویزیت‌ها (برای ادمین)
// router.get('/admin/all',
//     authorize('admin'),
//     async (req, res, next) => {
//         req.query.all = true; // Flag برای کنترلر
//         next();
//     },
//     visitCardCtrls.getVisitCards
// );

// // تغییر وضعیت کارت ویزیت (برای ادمین)
// router.put('/admin/:id/status',
//     authorize('admin'),
//     async (req, res, next) => {
//         // اضافه کردن flag برای کنترلر
//         req.isAdmin = true;
//         next();
//     },
//     visitCardCtrls.updateVisitCard
// );

module.exports = router;