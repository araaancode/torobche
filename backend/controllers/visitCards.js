// controllers/visitCard.js
const VisitCard = require('../models/VisitCard');
const QRCode = require('qrcode');
const mongoose = require('mongoose');
const fs = require('fs').promises;
const path = require('path');

// ================== 1. HELPER FUNCTIONS ==================

// Generate QR code
const generateQRCode = async (data, filename) => {
    try {
        const qrDir = 'uploads/qrcodes';

        // Create directory if it doesn't exist
        await fs.mkdir(qrDir, { recursive: true });

        const qrPath = path.join(qrDir, filename);
        const fullQrPath = path.join(process.cwd(), qrPath);

        await QRCode.toFile(fullQrPath, data, {
            color: {
                dark: '#000000',
                light: '#FFFFFF'
            },
            width: 300,
            margin: 1
        });

        // Return relative path for database storage
        return `/${qrPath.replace(/\\/g, '/')}`;
    } catch (error) {
        throw new Error(`خطا در تولید QR کد: ${error.message}`);
    }
};

// Delete old file
const deleteOldFile = async (filePath) => {
    if (filePath && filePath.startsWith('/')) {
        try {
            // Remove leading slash and delete
            const fullPath = path.join(process.cwd(), filePath.substring(1));
            await fs.unlink(fullPath);
        } catch (error) {
            // Silent fail if file doesn't exist
            if (error.code !== 'ENOENT') {
                console.error(`خطا در حذف فایل: ${filePath}`, error);
            }
        }
    }
};

// Format menu response with full URLs
const formatVisitCardResponse = (menu, req) => {
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const menuObj = menu.toObject ? menu.toObject() : menu;

    return {
        ...menuObj,
        icon: menuObj.icon ? `${baseUrl}${menuObj.icon}` : null,
        coverImage: menuObj.coverImage ? `${baseUrl}${menuObj.coverImage}` : null,
        qrcode: menuObj.qrcode ? `${baseUrl}${menuObj.qrcode}` : null
    };
};

// ================== 2. CONTROLLER METHODS ==================

// Get all Visit Cards
exports.getVisitCards = async (req, res) => {
    try {
        const visitCards = await VisitCard.find()


        // Convert file paths to URLs
        const visitCardsWithUrls = visitCards.map(v => formatVisitCardResponse(v, req));

        res.status(200).json({
            success: true,
            count: visitCards.length,
            data: visitCardsWithUrls
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'خطا در دریافت لیست کارت ویزیتها',
            error: error.message
        });
    }
};

// Get single Visit Card by ID
exports.getVisitCard = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate ID format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: 'شناسه کارت ویزیت نامعتبر است'
            });
        }

        const visitCard = await VisitCard.findById(id).populate('template', 'title description');

        if (!visitCard) {
            return res.status(404).json({
                success: false,
                message: 'کارت ویزیت یافت نشد'
            });
        }

        res.status(200).json({
            success: true,
            data: formatVisitCardResponse(visitCard, req)
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'خطا در دریافت کارت ویزیت',
            error: error.message
        });
    }
};

// Create new VisitCard (Multer middleware should be in routes)
exports.createVisitCard = async (req, res) => {
    try {
        const { title, template, bussinessName, description, specialities } = req.body;

        // Validate required fields
        if (!title || !template || !bussinessName || !specialities) {
            return res.status(400).json({
                success: false,
                message: 'لطفا تمام فیلدهای اجباری را پر کنید'
            });
        }

        // Parse specialities if it's a string
        let parsedSpecialities = specialities;
        if (typeof specialities === 'string') {
            try {
                parsedSpecialities = JSON.parse(specialities);
            } catch (e) {
                // اگر JSON نباشد، آن را به آرایه تبدیل کن
                parsedSpecialities = specialities.split(',').map(item => item.trim());
            }
        }

        // Prepare visit Card data
        const visitCardData = {
            title,
            template: Array.isArray(template) ? template : [template],
            bussinessName,
            specialities: parsedSpecialities,
            description: description || '',
            createdBy: "6934915a7e555af244da3840" // این خط را اضافه کنید
        };

        // // Validate createdBy exists
        // if (!req.user || !req.user._id) {
        //     return res.status(401).json({
        //         success: false,
        //         message: 'لطفا ابتدا وارد شوید'
        //     });
        // }

        // Add icon if uploaded
        if (req.files && req.files['icon']) {
            visitCardData.icon = `/uploads/visitcards/${req.files['icon'][0].filename}`;
        } else {
            visitCardData.icon = '/uploads/default/visitCard-icon.png';
        }

        // Add cover image if uploaded
        if (req.files && req.files['coverImage']) {
            visitCardData.coverImage = `/uploads/visitcards/${req.files['coverImage'][0].filename}`;
        } else {
            visitCardData.coverImage = '/uploads/default/visitCard-cover.jpg';
        }

        // Create visit Card
        const visitCard = await VisitCard.create(visitCardData);

        // Generate QR code
        const qrData = JSON.stringify({
            visitCardId: visitCard._id,
            title: visitCard.title,
            business: visitCard.bussinessName,
            url: `${req.protocol}://${req.get('host')}/visit-cards/${visitCard._id}`,
            createdAt: new Date().toISOString()
        });

        const qrFilename = `visitCard-${visitCard._id}-${Date.now()}.png`;
        const qrPath = await generateQRCode(qrData, qrFilename);

        // Update visitCard with QR code path
        visitCard.qrcode = qrPath;
        await visitCard.save();

        // Populate createdBy user info
        await visitCard.populate('createdBy', 'name email');

        res.status(201).json({
            success: true,
            message: 'کارت ویزیت با موفقیت ایجاد شد',
            data: formatVisitCardResponse(visitCard, req)
        });

    } catch (error) {
        // Cleanup uploaded files if error occurs
        if (req.files) {
            try {
                for (const field in req.files) {
                    for (const file of req.files[field]) {
                        await deleteOldFile(`/uploads/visitCards/${file.filename}`);
                    }
                }
            } catch (cleanupError) {
                console.error('خطا در پاک‌سازی فایل‌ها:', cleanupError);
            }
        }

        // Handle specific errors
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                message: 'خطا در اعتبارسنجی داده‌ها',
                error: error.message
            });
        }

        console.error('خطا در ایجاد کارت ویزیت:', error);
        res.status(500).json({
            success: false,
            message: 'خطا در ایجاد کارت ویزیت',
            error: error.message
        });
    }
};

// Update menu details (excluding icon and cover image)
exports.updateMenu = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, template, category, bussinessName } = req.body;

        // Validate ID format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: 'شناسه کارت ویزیت نامعتبر است'
            });
        }

        // Check if menu exists
        const existingMenu = await VisitCard.findById(id);
        if (!existingMenu) {
            return res.status(404).json({
                success: false,
                message: 'کارت ویزیت یافت نشد'
            });
        }

        // Prepare update data
        const updateData = {};
        if (title !== undefined) updateData.title = title;
        if (template !== undefined) {
            updateData.template = Array.isArray(template) ? template : [template];
        }
        if (category !== undefined) updateData.category = category;
        if (bussinessName !== undefined) updateData.bussinessName = bussinessName;

        // Find and update menu
        const menu = await VisitCard.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        ).populate('template', 'title description');

        res.status(200).json({
            success: true,
            message: 'کارت ویزیت با موفقیت به‌روزرسانی شد',
            data: formatVisitCardResponse(menu, req)
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                message: 'خطا در اعتبارسنجی داده‌ها',
                error: error.message
            });
        }

        res.status(500).json({
            success: false,
            message: 'خطا در به‌روزرسانی کارت ویزیت',
            error: error.message
        });
    }
};

// Update menu icon only
exports.updateMenuIcon = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate ID format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: 'شناسه کارت ویزیت نامعتبر است'
            });
        }

        // Check if file was uploaded
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'لطفا فایل تصویر را آپلود کنید'
            });
        }

        // Find the menu
        const menu = await VisitCard.findById(id);

        if (!menu) {
            // Delete the uploaded file if menu not found
            await deleteOldFile(`/uploads/menus/${req.file.filename}`);
            return res.status(404).json({
                success: false,
                message: 'کارت ویزیت یافت نشد'
            });
        }

        // Delete old icon file
        await deleteOldFile(menu.icon);

        // Update menu with new icon path
        menu.icon = `/uploads/menus/${req.file.filename}`;
        await menu.save();

        res.status(200).json({
            success: true,
            message: 'آیکون کارت ویزیت با موفقیت به‌روزرسانی شد',
            data: {
                icon: `${req.protocol}://${req.get('host')}${menu.icon}`,
                menuId: menu._id,
                title: menu.title
            }
        });
    } catch (error) {
        // Cleanup uploaded file if error occurs
        if (req.file) {
            await deleteOldFile(`/uploads/menus/${req.file.filename}`);
        }

        res.status(500).json({
            success: false,
            message: 'خطا در به‌روزرسانی آیکون',
            error: error.message
        });
    }
};

// Update menu cover image only
exports.updateMenuCoverImage = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate ID format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: 'شناسه کارت ویزیت نامعتبر است'
            });
        }

        // Check if file was uploaded
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'لطفا فایل تصویر را آپلود کنید'
            });
        }

        // Find the menu
        const menu = await VisitCard.findById(id);

        if (!menu) {
            // Delete the uploaded file if menu not found
            await deleteOldFile(`/uploads/menus/${req.file.filename}`);
            return res.status(404).json({
                success: false,
                message: 'کارت ویزیت یافت نشد'
            });
        }

        // Delete old cover image file
        await deleteOldFile(menu.coverImage);

        // Update menu with new cover image path
        menu.coverImage = `/uploads/menus/${req.file.filename}`;
        await menu.save();

        res.status(200).json({
            success: true,
            message: 'تصویر کاور کارت ویزیت با موفقیت به‌روزرسانی شد',
            data: {
                coverImage: `${req.protocol}://${req.get('host')}${menu.coverImage}`,
                menuId: menu._id,
                title: menu.title
            }
        });
    } catch (error) {
        // Cleanup uploaded file if error occurs
        if (req.file) {
            await deleteOldFile(`/uploads/menus/${req.file.filename}`);
        }

        res.status(500).json({
            success: false,
            message: 'خطا در به‌روزرسانی تصویر کاور',
            error: error.message
        });
    }
};

// Delete menu and associated files
exports.deleteMenu = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate ID format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: 'شناسه کارت ویزیت نامعتبر است'
            });
        }

        // Find the menu
        const menu = await VisitCard.findById(id);

        if (!menu) {
            return res.status(404).json({
                success: false,
                message: 'کارت ویزیت یافت نشد'
            });
        }

        // Store menu info for response
        const menuInfo = {
            id: menu._id,
            title: menu.title,
            business: menu.bussinessName
        };

        // Delete associated files
        const deletePromises = [
            deleteOldFile(menu.icon),
            deleteOldFile(menu.coverImage),
            deleteOldFile(menu.qrcode)
        ];

        await Promise.all(deletePromises);

        // Delete the menu from database
        await VisitCard.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: 'کارت ویزیت با موفقیت حذف شد',
            data: menuInfo
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'خطا در حذف کارت ویزیت',
            error: error.message
        });
    }
};

// Get menu QR code
exports.getMenuQRCode = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: 'شناسه کارت ویزیت نامعتبر است'
            });
        }

        const menu = await VisitCard.findById(id).select('title bussinessName qrcode');

        if (!menu) {
            return res.status(404).json({
                success: false,
                message: 'کارت ویزیت یافت نشد'
            });
        }

        if (!menu.qrcode) {
            // Generate QR code if doesn't exist
            const qrData = JSON.stringify({
                menuId: menu._id,
                title: menu.title,
                business: menu.bussinessName,
                url: `${req.protocol}://${req.get('host')}/menu/${menu._id}`
            });

            const qrFilename = `menu-${menu._id}-${Date.now()}.png`;
            const qrPath = await generateQRCode(qrData, qrFilename);

            menu.qrcode = qrPath;
            await menu.save();
        }

        res.status(200).json({
            success: true,
            data: {
                qrCodeUrl: `${req.protocol}://${req.get('host')}${menu.qrcode}`,
                menuId: menu._id,
                title: menu.title
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'خطا در دریافت QR کد',
            error: error.message
        });
    }
};