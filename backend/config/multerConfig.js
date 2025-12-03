const multer = require('multer');
const path = require('path');
const fs = require('fs');

// ایجاد دایرکتوری آپلود اگر وجود ندارد
const uploadDir = 'uploads/templates/';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// کانفیگ storage برای عکس‌های آپلود شده
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        // ایجاد نام فایل منحصر به فرد: timestamp + عدد تصادفی + پسوند اصلی
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        const originalName = path.basename(file.originalname, ext).replace(/\s+/g, '-');
        cb(null, originalName + '-' + uniqueSuffix + ext);
    }
});

// فیلتر فایل برای پذیرش فقط عکس‌ها
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp|svg/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb(new Error('فقط فایل‌های تصویری مجاز هستند (jpeg, jpg, png, gif, webp, svg)!'), false);
    }
};

// مقداردهی اولیه مالتر با کانفیگ
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // محدودیت ۵ مگابایت
    }
});

module.exports = { upload };