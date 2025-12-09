// // // controllers/visitCard.js
// // const VisitCard = require('../models/VisitCard');
// // const QRCode = require('qrcode');
// // const mongoose = require('mongoose');
// // const fs = require('fs').promises;
// // const path = require('path');

// // // ================== 1. HELPER FUNCTIONS ==================

// // // Generate QR code
// // const generateQRCode = async (data, filename) => {
// //     try {
// //         const qrDir = 'uploads/qrcodes';

// //         // Create directory if it doesn't exist
// //         await fs.mkdir(qrDir, { recursive: true });

// //         const qrPath = path.join(qrDir, filename);
// //         const fullQrPath = path.join(process.cwd(), qrPath);

// //         await QRCode.toFile(fullQrPath, data, {
// //             color: {
// //                 dark: '#000000',
// //                 light: '#FFFFFF'
// //             },
// //             width: 300,
// //             margin: 1
// //         });

// //         // Return relative path for database storage
// //         return `/${qrPath.replace(/\\/g, '/')}`;
// //     } catch (error) {
// //         throw new Error(`خطا در تولید QR کد: ${error.message}`);
// //     }
// // };

// // // Delete old file
// // const deleteOldFile = async (filePath) => {
// //     if (filePath && filePath.startsWith('/')) {
// //         try {
// //             // Remove leading slash and delete
// //             const fullPath = path.join(process.cwd(), filePath.substring(1));
// //             await fs.unlink(fullPath);
// //         } catch (error) {
// //             // Silent fail if file doesn't exist
// //             if (error.code !== 'ENOENT') {
// //                 console.error(`خطا در حذف فایل: ${filePath}`, error);
// //             }
// //         }
// //     }
// // };

// // // Format visitCard response with full URLs
// // const formatVisitCardResponse = (visitCard, req) => {
// //     const baseUrl = `${req.protocol}://${req.get('host')}`;
// //     const visitCardObj = visitCard.toObject ? visitCard.toObject() : visitCard;

// //     return {
// //         ...visitCardObj,
// //         icon: visitCardObj.icon ? `${baseUrl}${visitCardObj.icon}` : null,
// //         coverImage: visitCardObj.coverImage ? `${baseUrl}${visitCardObj.coverImage}` : null,
// //         qrcode: visitCardObj.qrcode ? `${baseUrl}${visitCardObj.qrcode}` : null
// //     };
// // };

// // // ================== 2. CONTROLLER METHODS ==================

// // // Get all Visit Cards
// // exports.getVisitCards = async (req, res) => {
// //     try {
// //         const visitCards = await VisitCard.find()


// //         // Convert file paths to URLs
// //         const visitCardsWithUrls = visitCards.map(v => formatVisitCardResponse(v, req));

// //         res.status(200).json({
// //             success: true,
// //             count: visitCards.length,
// //             data: visitCardsWithUrls
// //         });
// //     } catch (error) {
// //         res.status(500).json({
// //             success: false,
// //             message: 'خطا در دریافت لیست کارت ویزیتها',
// //             error: error.message
// //         });
// //     }
// // };

// // // Get single Visit Card by ID
// // exports.getVisitCard = async (req, res) => {
// //     try {
// //         const { id } = req.params;

// //         // Validate ID format
// //         if (!mongoose.Types.ObjectId.isValid(id)) {
// //             return res.status(400).json({
// //                 success: false,
// //                 message: 'شناسه کارت ویزیت نامعتبر است'
// //             });
// //         }

// //         const visitCard = await VisitCard.findById(id).populate('template', 'title description');

// //         if (!visitCard) {
// //             return res.status(404).json({
// //                 success: false,
// //                 message: 'کارت ویزیت یافت نشد'
// //             });
// //         }

// //         res.status(200).json({
// //             success: true,
// //             data: formatVisitCardResponse(visitCard, req)
// //         });
// //     } catch (error) {
// //         res.status(500).json({
// //             success: false,
// //             message: 'خطا در دریافت کارت ویزیت',
// //             error: error.message
// //         });
// //     }
// // };

// // // Create new VisitCard (Multer middleware should be in routes)
// // exports.createVisitCard = async (req, res) => {
// //     try {
// //         const { title, template, bussinessName, description, specialities } = req.body;

// //         // Validate required fields
// //         if (!title || !template || !bussinessName || !specialities) {
// //             return res.status(400).json({
// //                 success: false,
// //                 message: 'لطفا تمام فیلدهای اجباری را پر کنید'
// //             });
// //         }

// //         // Parse specialities if it's a string
// //         let parsedSpecialities = specialities;
// //         if (typeof specialities === 'string') {
// //             try {
// //                 parsedSpecialities = JSON.parse(specialities);
// //             } catch (e) {
// //                 // اگر JSON نباشد، آن را به آرایه تبدیل کن
// //                 parsedSpecialities = specialities.split(',').map(item => item.trim());
// //             }
// //         }

// //         // Prepare visit Card data
// //         const visitCardData = {
// //             title,
// //             template: Array.isArray(template) ? template : [template],
// //             bussinessName,
// //             specialities: parsedSpecialities,
// //             description: description || '',
// //             createdBy: "6934915a7e555af244da3840" // این خط را اضافه کنید
// //         };

// //         // // Validate createdBy exists
// //         // if (!req.user || !req.user._id) {
// //         //     return res.status(401).json({
// //         //         success: false,
// //         //         message: 'لطفا ابتدا وارد شوید'
// //         //     });
// //         // }

// //         // Add icon if uploaded
// //         if (req.files && req.files['icon']) {
// //             visitCardData.icon = `/uploads/visitcards/${req.files['icon'][0].filename}`;
// //         } else {
// //             visitCardData.icon = '/uploads/default/visitCard-icon.png';
// //         }

// //         // Add cover image if uploaded
// //         if (req.files && req.files['coverImage']) {
// //             visitCardData.coverImage = `/uploads/visitcards/${req.files['coverImage'][0].filename}`;
// //         } else {
// //             visitCardData.coverImage = '/uploads/default/visitCard-cover.jpg';
// //         }

// //         // Create visit Card
// //         const visitCard = await VisitCard.create(visitCardData);

// //         // Generate QR code
// //         const qrData = JSON.stringify({
// //             visitCardId: visitCard._id,
// //             title: visitCard.title,
// //             business: visitCard.bussinessName,
// //             url: `${req.protocol}://${req.get('host')}/visit-cards/${visitCard._id}`,
// //             createdAt: new Date().toISOString()
// //         });

// //         const qrFilename = `visitCard-${visitCard._id}-${Date.now()}.png`;
// //         const qrPath = await generateQRCode(qrData, qrFilename);

// //         // Update visitCard with QR code path
// //         visitCard.qrcode = qrPath;
// //         await visitCard.save();

// //         // Populate createdBy user info
// //         await visitCard.populate('createdBy', 'name email');

// //         res.status(201).json({
// //             success: true,
// //             message: 'کارت ویزیت با موفقیت ایجاد شد',
// //             data: formatVisitCardResponse(visitCard, req)
// //         });

// //     } catch (error) {
// //         // Cleanup uploaded files if error occurs
// //         if (req.files) {
// //             try {
// //                 for (const field in req.files) {
// //                     for (const file of req.files[field]) {
// //                         await deleteOldFile(`/uploads/visitCards/${file.filename}`);
// //                     }
// //                 }
// //             } catch (cleanupError) {
// //                 console.error('خطا در پاک‌سازی فایل‌ها:', cleanupError);
// //             }
// //         }

// //         // Handle specific errors
// //         if (error.name === 'ValidationError') {
// //             return res.status(400).json({
// //                 success: false,
// //                 message: 'خطا در اعتبارسنجی داده‌ها',
// //                 error: error.message
// //             });
// //         }

// //         console.error('خطا در ایجاد کارت ویزیت:', error);
// //         res.status(500).json({
// //             success: false,
// //             message: 'خطا در ایجاد کارت ویزیت',
// //             error: error.message
// //         });
// //     }
// // };

// // Update menu details (excluding icon and cover image)
// exports.updateMenu = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { title, template, category, bussinessName } = req.body;

//         // Validate ID format
//         if (!mongoose.Types.ObjectId.isValid(id)) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'شناسه کارت ویزیت نامعتبر است'
//             });
//         }

//         // Check if menu exists
//         const existingMenu = await VisitCard.findById(id);
//         if (!existingMenu) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'کارت ویزیت یافت نشد'
//             });
//         }

//         // Prepare update data
//         const updateData = {};
//         if (title !== undefined) updateData.title = title;
//         if (template !== undefined) {
//             updateData.template = Array.isArray(template) ? template : [template];
//         }
//         if (category !== undefined) updateData.category = category;
//         if (bussinessName !== undefined) updateData.bussinessName = bussinessName;

//         // Find and update menu
//         const menu = await VisitCard.findByIdAndUpdate(
//             id,
//             updateData,
//             { new: true, runValidators: true }
//         ).populate('template', 'title description');

//         res.status(200).json({
//             success: true,
//             message: 'کارت ویزیت با موفقیت به‌روزرسانی شد',
//             data: formatVisitCardResponse(menu, req)
//         });
//     } catch (error) {
//         if (error.name === 'ValidationError') {
//             return res.status(400).json({
//                 success: false,
//                 message: 'خطا در اعتبارسنجی داده‌ها',
//                 error: error.message
//             });
//         }

//         res.status(500).json({
//             success: false,
//             message: 'خطا در به‌روزرسانی کارت ویزیت',
//             error: error.message
//         });
//     }
// };

// // Update menu icon only
// exports.updateMenuIcon = async (req, res) => {
//     try {
//         const { id } = req.params;

//         // Validate ID format
//         if (!mongoose.Types.ObjectId.isValid(id)) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'شناسه کارت ویزیت نامعتبر است'
//             });
//         }

//         // Check if file was uploaded
//         if (!req.file) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'لطفا فایل تصویر را آپلود کنید'
//             });
//         }

//         // Find the menu
//         const menu = await VisitCard.findById(id);

//         if (!menu) {
//             // Delete the uploaded file if menu not found
//             await deleteOldFile(`/uploads/menus/${req.file.filename}`);
//             return res.status(404).json({
//                 success: false,
//                 message: 'کارت ویزیت یافت نشد'
//             });
//         }

//         // Delete old icon file
//         await deleteOldFile(menu.icon);

//         // Update menu with new icon path
//         menu.icon = `/uploads/menus/${req.file.filename}`;
//         await menu.save();

//         res.status(200).json({
//             success: true,
//             message: 'آیکون کارت ویزیت با موفقیت به‌روزرسانی شد',
//             data: {
//                 icon: `${req.protocol}://${req.get('host')}${menu.icon}`,
//                 menuId: menu._id,
//                 title: menu.title
//             }
//         });
//     } catch (error) {
//         // Cleanup uploaded file if error occurs
//         if (req.file) {
//             await deleteOldFile(`/uploads/menus/${req.file.filename}`);
//         }

//         res.status(500).json({
//             success: false,
//             message: 'خطا در به‌روزرسانی آیکون',
//             error: error.message
//         });
//     }
// };

// // Update menu cover image only
// exports.updateMenuCoverImage = async (req, res) => {
//     try {
//         const { id } = req.params;

//         // Validate ID format
//         if (!mongoose.Types.ObjectId.isValid(id)) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'شناسه کارت ویزیت نامعتبر است'
//             });
//         }

//         // Check if file was uploaded
//         if (!req.file) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'لطفا فایل تصویر را آپلود کنید'
//             });
//         }

//         // Find the menu
//         const menu = await VisitCard.findById(id);

//         if (!menu) {
//             // Delete the uploaded file if menu not found
//             await deleteOldFile(`/uploads/menus/${req.file.filename}`);
//             return res.status(404).json({
//                 success: false,
//                 message: 'کارت ویزیت یافت نشد'
//             });
//         }

//         // Delete old cover image file
//         await deleteOldFile(menu.coverImage);

//         // Update menu with new cover image path
//         menu.coverImage = `/uploads/menus/${req.file.filename}`;
//         await menu.save();

//         res.status(200).json({
//             success: true,
//             message: 'تصویر کاور کارت ویزیت با موفقیت به‌روزرسانی شد',
//             data: {
//                 coverImage: `${req.protocol}://${req.get('host')}${menu.coverImage}`,
//                 menuId: menu._id,
//                 title: menu.title
//             }
//         });
//     } catch (error) {
//         // Cleanup uploaded file if error occurs
//         if (req.file) {
//             await deleteOldFile(`/uploads/menus/${req.file.filename}`);
//         }

//         res.status(500).json({
//             success: false,
//             message: 'خطا در به‌روزرسانی تصویر کاور',
//             error: error.message
//         });
//     }
// };

// // Delete menu and associated files
// exports.deleteMenu = async (req, res) => {
//     try {
//         const { id } = req.params;

//         // Validate ID format
//         if (!mongoose.Types.ObjectId.isValid(id)) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'شناسه کارت ویزیت نامعتبر است'
//             });
//         }

//         // Find the menu
//         const menu = await VisitCard.findById(id);

//         if (!menu) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'کارت ویزیت یافت نشد'
//             });
//         }

//         // Store menu info for response
//         const menuInfo = {
//             id: menu._id,
//             title: menu.title,
//             business: menu.bussinessName
//         };

//         // Delete associated files
//         const deletePromises = [
//             deleteOldFile(menu.icon),
//             deleteOldFile(menu.coverImage),
//             deleteOldFile(menu.qrcode)
//         ];

//         await Promise.all(deletePromises);

//         // Delete the menu from database
//         await VisitCard.findByIdAndDelete(id);

//         res.status(200).json({
//             success: true,
//             message: 'کارت ویزیت با موفقیت حذف شد',
//             data: menuInfo
//         });
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: 'خطا در حذف کارت ویزیت',
//             error: error.message
//         });
//     }
// };

// // Get menu QR code
// exports.getMenuQRCode = async (req, res) => {
//     try {
//         const { id } = req.params;

//         if (!mongoose.Types.ObjectId.isValid(id)) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'شناسه کارت ویزیت نامعتبر است'
//             });
//         }

//         const menu = await VisitCard.findById(id).select('title bussinessName qrcode');

//         if (!menu) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'کارت ویزیت یافت نشد'
//             });
//         }

//         if (!menu.qrcode) {
//             // Generate QR code if doesn't exist
//             const qrData = JSON.stringify({
//                 menuId: menu._id,
//                 title: menu.title,
//                 business: menu.bussinessName,
//                 url: `${req.protocol}://${req.get('host')}/menu/${menu._id}`
//             });

//             const qrFilename = `menu-${menu._id}-${Date.now()}.png`;
//             const qrPath = await generateQRCode(qrData, qrFilename);

//             menu.qrcode = qrPath;
//             await menu.save();
//         }

//         res.status(200).json({
//             success: true,
//             data: {
//                 qrCodeUrl: `${req.protocol}://${req.get('host')}${menu.qrcode}`,
//                 menuId: menu._id,
//                 title: menu.title
//             }
//         });
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: 'خطا در دریافت QR کد',
//             error: error.message
//         });
//     }
// };



// controllers/visitCard.js
const VisitCard = require('../models/VisitCard');
const QRCode = require('qrcode');
const mongoose = require('mongoose');
const fs = require('fs').promises;
const path = require('path');

// ================== 1. HELPER FUNCTIONS ==================

const generateQRCode = async (data, filename) => {
    try {
        const qrDir = 'uploads/qrcodes';
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

        return `/${qrPath.replace(/\\/g, '/')}`;
    } catch (error) {
        throw new Error(`خطا در تولید QR کد: ${error.message}`);
    }
};

const deleteOldFile = async (filePath) => {
    if (filePath && filePath.startsWith('/')) {
        try {
            const fullPath = path.join(process.cwd(), filePath.substring(1));
            await fs.unlink(fullPath);
        } catch (error) {
            if (error.code !== 'ENOENT') {
                console.error(`خطا در حذف فایل: ${filePath}`, error);
            }
        }
    }
};

const formatVisitCardResponse = (visitCard, req) => {
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const visitCardObj = visitCard.toObject ? visitCard.toObject() : visitCard;

    return {
        ...visitCardObj,
        icon: visitCardObj.icon ? `${baseUrl}${visitCardObj.icon}` : null,
        coverImage: visitCardObj.coverImage ? `${baseUrl}${visitCardObj.coverImage}` : null,
        qrcode: visitCardObj.qrcode ? `${baseUrl}${visitCardObj.qrcode}` : null
    };
};

// ================== 2. CONTROLLER METHODS ==================

// دریافت همه کارت ویزیت‌ها
exports.getVisitCards = async (req, res) => {
    try {
        const {
            page = 1,
            limit = 10,
            specialty,
            search,
            status,
            sort = '-createdAt'
        } = req.query;

        const query = {};

        // فیلتر بر اساس تخصص
        if (specialty) {
            query.specialty = new RegExp(specialty, 'i');
        }

        // جستجو
        if (search) {
            query.$or = [
                { doctorName: new RegExp(search, 'i') },
                { bussinessName: new RegExp(search, 'i') },
                { specialty: new RegExp(search, 'i') }
            ];
        }

        // فیلتر وضعیت
        if (status) {
            query.status = status;
        }

        // اگر کاربر لاگین کرده، فقط کارت‌های خودش را می‌بیند
        if (req.user && req.user.role !== 'admin') {
            query.createdBy = req.user._id;
        }

        const options = {
            page: parseInt(page),
            limit: parseInt(limit),
            sort,
            populate: 'template createdBy'
        };

        const visitCards = await VisitCard.paginate(query, options);

        const visitCardsWithUrls = {
            ...visitCards,
            docs: visitCards.docs.map(v => formatVisitCardResponse(v, req))
        };

        res.status(200).json({
            success: true,
            ...visitCardsWithUrls
        });
    } catch (error) {
        console.error('خطا در دریافت لیست کارت ویزیت‌ها:', error);
        res.status(500).json({
            success: false,
            message: 'خطا در دریافت لیست کارت ویزیت‌ها',
            error: error.message
        });
    }
};

// دریافت یک کارت ویزیت
exports.getVisitCard = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: 'شناسه کارت ویزیت نامعتبر است'
            });
        }

        const visitCard = await VisitCard.findById(id)
            .populate('template', 'title description image colorPallete')
            .populate('createdBy', 'name email');

        if (!visitCard) {
            return res.status(404).json({
                success: false,
                message: 'کارت ویزیت یافت نشد'
            });
        }

        // افزایش تعداد بازدید
        await visitCard.incrementView();

        res.status(200).json({
            success: true,
            data: formatVisitCardResponse(visitCard, req)
        });
    } catch (error) {
        console.error('خطا در دریافت کارت ویزیت:', error);
        res.status(500).json({
            success: false,
            message: 'خطا در دریافت کارت ویزیت',
            error: error.message
        });
    }
};

// ایجاد کارت ویزیت جدید
// controllers/visitCard.js - تابع createVisitCard
exports.createVisitCard = async (req, res) => {
    try {
        const {
            title,
            bussinessName,
            description,
            doctorName,
            medicalDegree,
            specialty,
            subSpecialty,
            medicalCouncilNumber,
            phone,
            email,
            website,
            address,
            clinicName,
            clinicPhone,
            specialities,
            template,
            status = 'draft'
        } = req.body;

        // اعتبارسنجی فیلدهای اجباری
        if (!doctorName || !medicalDegree || !specialty || !phone) {
            return res.status(400).json({
                success: false,
                message: 'لطفا فیلدهای اجباری را پر کنید: نام پزشک، مدرک پزشکی، تخصص و تلفن'
            });
        }

        // پارس کردن آرایه‌ها
        let parsedSpecialities = [];
        if (specialities) {
            try {
                parsedSpecialities = JSON.parse(specialities);
            } catch (e) {
                // اگر JSON نباشد، رشته را به آرایه تبدیل کن
                parsedSpecialities = typeof specialities === 'string'
                    ? specialities.split(',').map(item => item.trim())
                    : Array.isArray(specialities) ? specialities : [];
            }
        }

        let parsedTemplate = [];
        if (template) {
            try {
                parsedTemplate = JSON.parse(template);
            } catch (e) {
                parsedTemplate = typeof template === 'string'
                    ? template.split(',').map(item => item.trim())
                    : Array.isArray(template) ? template : [];
            }
        }

        // آماده کردن داده‌ها
        const visitCardData = {
            title: title || `${doctorName} - ${specialty}`,
            bussinessName: bussinessName || clinicName || doctorName,
            description: description || '',
            doctorName,
            medicalDegree,
            specialty,
            subSpecialty: subSpecialty || '',
            medicalCouncilNumber: medicalCouncilNumber || '',
            phone,
            email: email || '',
            website: website || '',
            address: address || '',
            clinicName: clinicName || '',
            clinicPhone: clinicPhone || '',
            specialities: parsedSpecialities,
            template: parsedTemplate,
            status,
            // استفاده از ID پیش‌فرض معتبر
            createdBy: new mongoose.Types.ObjectId('6934915a7e555af244da3840')
        };

        // مدیریت فایل‌ها
        if (req.files && req.files['icon']) {
            visitCardData.icon = `/uploads/visitcards/${req.files['icon'][0].filename}`;
        }

        if (req.files && req.files['coverImage']) {
            visitCardData.coverImage = `/uploads/visitcards/${req.files['coverImage'][0].filename}`;
        }

        console.log('داده‌های ارسالی برای ایجاد کارت ویزیت:', visitCardData);

        // ایجاد کارت ویزیت
        const visitCard = await VisitCard.create(visitCardData);

        // تولید QR Code
        if (status === 'published') {
            const qrData = JSON.stringify({
                visitCardId: visitCard._id,
                doctorName: visitCard.doctorName,
                specialty: visitCard.specialty,
                phone: visitCard.phone,
                url: `${req.protocol}://${req.get('host')}/visit-cards/${visitCard._id}`,
                createdAt: new Date().toISOString()
            });

            const qrFilename = `visitcard-${visitCard._id}.png`;
            const qrPath = await generateQRCode(qrData, qrFilename);

            visitCard.qrcode = qrPath;
            await visitCard.save();
        }

        // پاسخ موفقیت‌آمیز
        const populatedVisitCard = await VisitCard.findById(visitCard._id)
            .populate('template', 'title description image price colorPallete')
            .lean();

        res.status(201).json({
            success: true,
            message: 'کارت ویزیت با موفقیت ایجاد شد',
            data: formatVisitCardResponse(populatedVisitCard, req)
        });

    } catch (error) {
        console.error('خطا در ایجاد کارت ویزیت:', error);

        // پاک‌سازی فایل‌های آپلود شده در صورت خطا
        if (req.files) {
            try {
                for (const field in req.files) {
                    for (const file of req.files[field]) {
                        await deleteOldFile(`/uploads/visitcards/${file.filename}`);
                    }
                }
            } catch (cleanupError) {
                console.error('خطا در پاک‌سازی فایل‌ها:', cleanupError);
            }
        }

        // هندل کردن خطاهای خاص
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                success: false,
                message: 'خطا در اعتبارسنجی داده‌ها',
                errors: messages
            });
        }

        if (error.name === 'CastError') {
            return res.status(400).json({
                success: false,
                message: 'خطا در نوع داده‌ها: ' + error.message
            });
        }

        res.status(500).json({
            success: false,
            message: 'خطا در ایجاد کارت ویزیت',
            error: error.message
        });
    }
};

// به‌روزرسانی کارت ویزیت
exports.updateVisitCard = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: 'شناسه کارت ویزیت نامعتبر است'
            });
        }

        // پیدا کردن کارت ویزیت
        let visitCard = await VisitCard.findById(id);
        if (!visitCard) {
            return res.status(404).json({
                success: false,
                message: 'کارت ویزیت یافت نشد'
            });
        }

        // بررسی دسترسی
        if (req.user && visitCard.createdBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'شما اجازه ویرایش این کارت ویزیت را ندارید'
            });
        }

        const {
            title,
            bussinessName,
            description,
            doctorName,
            medicalDegree,
            specialty,
            subSpecialty,
            medicalCouncilNumber,
            phone,
            email,
            website,
            address,
            clinicName,
            clinicPhone,
            specialities,
            services,
            education,
            experience,
            workingHours,
            template,
            status
        } = req.body;

        // آماده کردن داده‌های به‌روزرسانی
        const updateData = {};

        if (title !== undefined) updateData.title = title;
        if (bussinessName !== undefined) updateData.bussinessName = bussinessName;
        if (description !== undefined) updateData.description = description;
        if (doctorName !== undefined) updateData.doctorName = doctorName;
        if (medicalDegree !== undefined) updateData.medicalDegree = medicalDegree;
        if (specialty !== undefined) updateData.specialty = specialty;
        if (subSpecialty !== undefined) updateData.subSpecialty = subSpecialty;
        if (medicalCouncilNumber !== undefined) updateData.medicalCouncilNumber = medicalCouncilNumber;
        if (phone !== undefined) updateData.phone = phone;
        if (email !== undefined) updateData.email = email;
        if (website !== undefined) updateData.website = website;
        if (address !== undefined) updateData.address = address;
        if (clinicName !== undefined) updateData.clinicName = clinicName;
        if (clinicPhone !== undefined) updateData.clinicPhone = clinicPhone;
        if (status !== undefined) updateData.status = status;

        // مدیریت آرایه‌ها
        if (specialities !== undefined) {
            if (typeof specialities === 'string') {
                try {
                    updateData.specialities = JSON.parse(specialities);
                } catch (e) {
                    updateData.specialities = specialities.split(',').map(item => item.trim());
                }
            } else if (Array.isArray(specialities)) {
                updateData.specialities = specialities;
            }
        }

        if (services !== undefined) {
            if (typeof services === 'string') {
                try {
                    updateData.services = JSON.parse(services);
                } catch (e) {
                    updateData.services = services.split(',').map(item => item.trim());
                }
            } else if (Array.isArray(services)) {
                updateData.services = services;
            }
        }

        if (education !== undefined) {
            if (typeof education === 'string') {
                try {
                    updateData.education = JSON.parse(education);
                } catch (e) {
                    console.log('آموزش JSON نیست');
                }
            } else if (Array.isArray(education)) {
                updateData.education = education;
            }
        }

        if (experience !== undefined) {
            if (typeof experience === 'string') {
                try {
                    updateData.experience = JSON.parse(experience);
                } catch (e) {
                    console.log('تجربه JSON نیست');
                }
            } else if (Array.isArray(experience)) {
                updateData.experience = experience;
            }
        }

        if (workingHours !== undefined) {
            if (typeof workingHours === 'string') {
                try {
                    updateData.workingHours = JSON.parse(workingHours);
                } catch (e) {
                    console.log('ساعت کاری JSON نیست');
                }
            } else if (typeof workingHours === 'object') {
                updateData.workingHours = workingHours;
            }
        }

        if (template !== undefined) {
            if (typeof template === 'string') {
                try {
                    updateData.template = JSON.parse(template);
                } catch (e) {
                    updateData.template = template.split(',').map(item => item.trim());
                }
            } else if (Array.isArray(template)) {
                updateData.template = template;
            }
        }

        // مدیریت فایل‌ها
        if (req.files && req.files['icon']) {
            // حذف فایل قدیمی
            await deleteOldFile(visitCard.icon);
            updateData.icon = `/uploads/visitcards/${req.files['icon'][0].filename}`;
        }

        if (req.files && req.files['coverImage']) {
            // حذف فایل قدیمی
            await deleteOldFile(visitCard.coverImage);
            updateData.coverImage = `/uploads/visitcards/${req.files['coverImage'][0].filename}`;
        }

        // تولید QR Code جدید اگر منتشر می‌شود
        if (status === 'published' && visitCard.status !== 'published') {
            const qrData = JSON.stringify({
                visitCardId: visitCard._id,
                doctorName: updateData.doctorName || visitCard.doctorName,
                specialty: updateData.specialty || visitCard.specialty,
                phone: updateData.phone || visitCard.phone,
                url: `${req.protocol}://${req.get('host')}/visit-cards/${visitCard._id}`,
                updatedAt: new Date().toISOString()
            });

            const qrFilename = `visitcard-${visitCard._id}-${Date.now()}.png`;
            const qrPath = await generateQRCode(qrData, qrFilename);
            updateData.qrcode = qrPath;
            updateData.publishedAt = new Date();
        }

        // به‌روزرسانی
        visitCard = await VisitCard.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        ).populate('template createdBy');

        res.status(200).json({
            success: true,
            message: 'کارت ویزیت با موفقیت به‌روزرسانی شد',
            data: formatVisitCardResponse(visitCard, req)
        });

    } catch (error) {
        console.error('خطا در به‌روزرسانی کارت ویزیت:', error);

        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                success: false,
                message: 'خطا در اعتبارسنجی داده‌ها',
                errors: messages
            });
        }

        res.status(500).json({
            success: false,
            message: 'خطا در به‌روزرسانی کارت ویزیت',
            error: error.message
        });
    }
};

// حذف کارت ویزیت
exports.deleteVisitCard = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: 'شناسه کارت ویزیت نامعتبر است'
            });
        }

        const visitCard = await VisitCard.findById(id);
        if (!visitCard) {
            return res.status(404).json({
                success: false,
                message: 'کارت ویزیت یافت نشد'
            });
        }

        // بررسی دسترسی
        if (req.user && visitCard.createdBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'شما اجازه حذف این کارت ویزیت را ندارید'
            });
        }

        // حذف فایل‌های مرتبط
        await deleteOldFile(visitCard.icon);
        await deleteOldFile(visitCard.coverImage);
        await deleteOldFile(visitCard.qrcode);

        await VisitCard.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: 'کارت ویزیت با موفقیت حذف شد'
        });

    } catch (error) {
        console.error('خطا در حذف کارت ویزیت:', error);
        res.status(500).json({
            success: false,
            message: 'خطا در حذف کارت ویزیت',
            error: error.message
        });
    }
};

// انتشار کارت ویزیت
exports.publishVisitCard = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: 'شناسه کارت ویزیت نامعتبر است'
            });
        }

        const visitCard = await VisitCard.findById(id);
        if (!visitCard) {
            return res.status(404).json({
                success: false,
                message: 'کارت ویزیت یافت نشد'
            });
        }

        // بررسی دسترسی
        if (req.user && visitCard.createdBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'شما اجازه انتشار این کارت ویزیت را ندارید'
            });
        }

        // تولید QR Code
        const qrData = JSON.stringify({
            visitCardId: visitCard._id,
            doctorName: visitCard.doctorName,
            specialty: visitCard.specialty,
            phone: visitCard.phone,
            url: `${req.protocol}://${req.get('host')}/visit-cards/${visitCard._id}`,
            publishedAt: new Date().toISOString()
        });

        const qrFilename = `visitcard-${visitCard._id}-${Date.now()}.png`;
        const qrPath = await generateQRCode(qrData, qrFilename);

        visitCard.status = 'published';
        visitCard.qrcode = qrPath;
        visitCard.publishedAt = new Date();
        await visitCard.save();

        res.status(200).json({
            success: true,
            message: 'کارت ویزیت با موفقیت منتشر شد',
            data: formatVisitCardResponse(visitCard, req)
        });

    } catch (error) {
        console.error('خطا در انتشار کارت ویزیت:', error);
        res.status(500).json({
            success: false,
            message: 'خطا در انتشار کارت ویزیت',
            error: error.message
        });
    }
};

// آمار کارت ویزیت‌ها
exports.getStats = async (req, res) => {
    try {
        const userId = req.user ? req.user._id : '6934915a7e555af244da3840';

        const stats = await VisitCard.aggregate([
            {
                $match: { createdBy: mongoose.Types.ObjectId(userId) }
            },
            {
                $group: {
                    _id: '$status',
                    count: { $sum: 1 },
                    totalViews: { $sum: '$views' }
                }
            },
            {
                $group: {
                    _id: null,
                    total: { $sum: '$count' },
                    totalViews: { $sum: '$totalViews' },
                    stats: { $push: { status: '$_id', count: '$count' } }
                }
            }
        ]);

        const result = stats[0] || { total: 0, totalViews: 0, stats: [] };

        res.status(200).json({
            success: true,
            data: result
        });
    } catch (error) {
        console.error('خطا در دریافت آمار:', error);
        res.status(500).json({
            success: false,
            message: 'خطا در دریافت آمار',
            error: error.message
        });
    }
};

// جستجوی پزشکان
exports.searchDoctors = async (req, res) => {
    try {
        const { query, specialty, city } = req.query;

        const searchQuery = { status: 'published' };

        if (query) {
            searchQuery.$or = [
                { doctorName: new RegExp(query, 'i') },
                { specialty: new RegExp(query, 'i') },
                { medicalDegree: new RegExp(query, 'i') },
                { clinicName: new RegExp(query, 'i') }
            ];
        }

        if (specialty) {
            searchQuery.specialty = new RegExp(specialty, 'i');
        }

        if (city) {
            searchQuery.address = new RegExp(city, 'i');
        }

        const doctors = await VisitCard.find(searchQuery)
            .select('doctorName specialty medicalDegree phone email clinicName address icon')
            .limit(20);

        const doctorsWithUrls = doctors.map(doctor => {
            const doctorObj = doctor.toObject();
            const baseUrl = `${req.protocol}://${req.get('host')}`;

            return {
                ...doctorObj,
                icon: doctorObj.icon ? `${baseUrl}${doctorObj.icon}` : null
            };
        });

        res.status(200).json({
            success: true,
            count: doctors.length,
            data: doctorsWithUrls
        });

    } catch (error) {
        console.error('خطا در جستجوی پزشکان:', error);
        res.status(500).json({
            success: false,
            message: 'خطا در جستجوی پزشکان',
            error: error.message
        });
    }
};