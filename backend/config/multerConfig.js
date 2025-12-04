// config/multerConfig.js
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const menuUploadsDir = 'uploads/menus';
if (!fs.existsSync(menuUploadsDir)) {
    fs.mkdirSync(menuUploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, menuUploadsDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        const name = path.basename(file.originalname, ext).replace(/\s+/g, '-');
        cb(null, name + '-' + uniqueSuffix + ext);
    }
});

const fileFilter = function (req, file, cb) {
    const allowedMimes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (allowedMimes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB per file
    }
});

// Export just the upload instance
module.exports = upload;