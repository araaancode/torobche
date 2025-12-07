// controllers/menus.js
const Menu = require('../models/Menu');
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
const formatMenuResponse = (menu, req) => {
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

// Get all menus
exports.getMenus = async (req, res) => {
    try {
        const menus = await Menu.find()
            .populate('template', 'title description')
            .sort({ createdAt: -1 });

        // Convert file paths to URLs
        const menusWithUrls = menus.map(menu => formatMenuResponse(menu, req));

        res.status(200).json({
            success: true,
            count: menus.length,
            data: menusWithUrls
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'خطا در دریافت لیست منوها',
            error: error.message
        });
    }
};

// Get single menu by ID
exports.getMenu = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate ID format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: 'شناسه منو نامعتبر است'
            });
        }

        const menu = await Menu.findById(id).populate('template', 'title description');

        if (!menu) {
            return res.status(404).json({
                success: false,
                message: 'منو یافت نشد'
            });
        }

        res.status(200).json({
            success: true,
            data: formatMenuResponse(menu, req)
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'خطا در دریافت منو',
            error: error.message
        });
    }
};

// Create new menu (Multer middleware should be in routes)
// در controllers/menus.js - تابع createMenu
exports.createMenu = async (req, res) => {
    try {
        const { title, template, bussinessName, description } = req.body;

        // Validate required fields
        if (!title || !template || !bussinessName) {
            return res.status(400).json({
                success: false,
                message: 'لطفا تمام فیلدهای اجباری را پر کنید'
            });
        }

        // Prepare menu data (فایل‌ها اختیاری هستند)
        const menuData = {
            title,
            template: Array.isArray(template) ? template : [template],
            bussinessName,
            description: description || ''
        };

        // Add icon if uploaded
        if (req.files && req.files['icon']) {
            menuData.icon = `/uploads/menus/${req.files['icon'][0].filename}`;
        } else {
            menuData.icon = '/uploads/default/menu-icon.png'; // مسیر پیش‌فرض
        }

        // Add cover image if uploaded
        if (req.files && req.files['coverImage']) {
            menuData.coverImage = `/uploads/menus/${req.files['coverImage'][0].filename}`;
        } else {
            menuData.coverImage = '/uploads/default/menu-cover.jpg'; // مسیر پیش‌فرض
        }

        // Create menu
        const menu = await Menu.create(menuData);

        // Generate QR code (اختیاری)
        const qrData = JSON.stringify({
            menuId: menu._id,
            title: menu.title,
            business: menu.bussinessName,
            url: `${req.protocol}://${req.get('host')}/menu/${menu._id}`,
            createdAt: new Date().toISOString()
        });

        const qrFilename = `menu-${menu._id}-${Date.now()}.png`;
        const qrPath = await generateQRCode(qrData, qrFilename);

        // Update menu with QR code path
        menu.qrcode = qrPath;
        await menu.save();

        res.status(201).json({
            success: true,
            message: 'منو با موفقیت ایجاد شد',
            data: formatMenuResponse(menu, req)
        });

    } catch (error) {
        // Cleanup uploaded files if error occurs
        if (req.files) {
            try {
                for (const field in req.files) {
                    for (const file of req.files[field]) {
                        await deleteOldFile(`/uploads/menus/${file.filename}`);
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

        console.error('خطا در ایجاد منو:', error);
        res.status(500).json({
            success: false,
            message: 'خطا در ایجاد منو',
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
                message: 'شناسه منو نامعتبر است'
            });
        }

        // Check if menu exists
        const existingMenu = await Menu.findById(id);
        if (!existingMenu) {
            return res.status(404).json({
                success: false,
                message: 'منو یافت نشد'
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
        const menu = await Menu.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        ).populate('template', 'title description');

        res.status(200).json({
            success: true,
            message: 'منو با موفقیت به‌روزرسانی شد',
            data: formatMenuResponse(menu, req)
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
            message: 'خطا در به‌روزرسانی منو',
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
                message: 'شناسه منو نامعتبر است'
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
        const menu = await Menu.findById(id);

        if (!menu) {
            // Delete the uploaded file if menu not found
            await deleteOldFile(`/uploads/menus/${req.file.filename}`);
            return res.status(404).json({
                success: false,
                message: 'منو یافت نشد'
            });
        }

        // Delete old icon file
        await deleteOldFile(menu.icon);

        // Update menu with new icon path
        menu.icon = `/uploads/menus/${req.file.filename}`;
        await menu.save();

        res.status(200).json({
            success: true,
            message: 'آیکون منو با موفقیت به‌روزرسانی شد',
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
                message: 'شناسه منو نامعتبر است'
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
        const menu = await Menu.findById(id);

        if (!menu) {
            // Delete the uploaded file if menu not found
            await deleteOldFile(`/uploads/menus/${req.file.filename}`);
            return res.status(404).json({
                success: false,
                message: 'منو یافت نشد'
            });
        }

        // Delete old cover image file
        await deleteOldFile(menu.coverImage);

        // Update menu with new cover image path
        menu.coverImage = `/uploads/menus/${req.file.filename}`;
        await menu.save();

        res.status(200).json({
            success: true,
            message: 'تصویر کاور منو با موفقیت به‌روزرسانی شد',
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
                message: 'شناسه منو نامعتبر است'
            });
        }

        // Find the menu
        const menu = await Menu.findById(id);

        if (!menu) {
            return res.status(404).json({
                success: false,
                message: 'منو یافت نشد'
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
        await Menu.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: 'منو با موفقیت حذف شد',
            data: menuInfo
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'خطا در حذف منو',
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
                message: 'شناسه منو نامعتبر است'
            });
        }

        const menu = await Menu.findById(id).select('title bussinessName qrcode');

        if (!menu) {
            return res.status(404).json({
                success: false,
                message: 'منو یافت نشد'
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