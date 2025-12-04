const Food = require('../models/Food');
const Menu = require('../models/Menu');
const mongoose = require('mongoose');
const fs = require('fs').promises;
const path = require('path');

// تابع کمکی برای حذف فایل‌های قدیمی
const deleteOldFile = async (filePath) => {
    if (filePath && filePath.startsWith('/')) {
        try {
            const fullPath = path.join(process.cwd(), filePath.substring(1));
            await fs.unlink(fullPath);
            console.log(`✅ فایل حذف شد: ${filePath}`);
        } catch (error) {
            if (error.code !== 'ENOENT') {
                console.error(`❌ خطا در حذف فایل ${filePath}:`, error.message);
            }
        }
    }
};

// تابع برای فرمت‌دهی پاسخ غذا با URL کامل
const formatFoodResponse = (food, req) => {
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const foodObj = food.toObject ? food.toObject() : food;

    // تبدیل مسیرهای تصویر به URL کامل
    const imagesWithUrls = foodObj.images ? foodObj.images.map(img =>
        img.startsWith('http') ? img : `${baseUrl}${img}`
    ) : [];

    return {
        ...foodObj,
        images: imagesWithUrls,
        menu: foodObj.menu || null
    };
};

// لاگ کردن اطلاعات فایل‌های آپلود شده برای دیباگ
const logUploadedFiles = (req) => {
    console.log('🔍 دیباگ اطلاعات آپلود:');
    console.log('- Headers:', req.headers['content-type']);
    console.log('- Has files:', !!req.files);

    if (req.files) {
        if (Array.isArray(req.files)) {
            console.log('- Files type: Array');
            console.log('- Files count:', req.files.length);
            req.files.forEach((file, index) => {
                console.log(`  File ${index + 1}:`, {
                    fieldname: file.fieldname,
                    filename: file.filename,
                    originalname: file.originalname,
                    mimetype: file.mimetype
                });
            });
        } else if (typeof req.files === 'object') {
            console.log('- Files type: Object');
            console.log('- File keys:', Object.keys(req.files));
            Object.keys(req.files).forEach(key => {
                console.log(`  Field "${key}":`, {
                    count: req.files[key].length,
                    files: req.files[key].map(f => f.filename)
                });
            });
        }
    } else {
        console.log('- No files found in request');
    }
};

// ================== متدهای کنترلر ==================

// دریافت همه غذاها
exports.getFoods = async (req, res) => {
    try {
        const { menuId, category, inStock, search } = req.query;

        // ساخت کوئری
        const query = {};

        if (menuId && mongoose.Types.ObjectId.isValid(menuId)) {
            query.menu = menuId;
        }

        if (category) {
            query.category = category;
        }

        if (inStock !== undefined) {
            query.inStock = inStock === 'true';
        }

        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        const foods = await Food.find(query)
            .populate('menu', 'title bussinessName')
            .sort({ createdAt: -1 });

        // تبدیل مسیرهای فایل به URL
        const foodsWithUrls = foods.map(food => formatFoodResponse(food, req));

        res.status(200).json({
            success: true,
            count: foods.length,
            data: foodsWithUrls
        });
    } catch (error) {
        console.error('❌ خطا در دریافت لیست غذاها:', error);
        res.status(500).json({
            success: false,
            message: 'خطا در دریافت لیست غذاها',
            error: error.message
        });
    }
};

// دریافت یک غذا با ID
exports.getFood = async (req, res) => {
    try {
        const { id } = req.params;

        // اعتبارسنجی فرمت ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: 'شناسه غذا نامعتبر است'
            });
        }

        const food = await Food.findById(id).populate('menu', 'title bussinessName icon');

        if (!food) {
            return res.status(404).json({
                success: false,
                message: 'غذا یافت نشد'
            });
        }

        res.status(200).json({
            success: true,
            data: formatFoodResponse(food, req)
        });
    } catch (error) {
        console.error('❌ خطا در دریافت غذا:', error);
        res.status(500).json({
            success: false,
            message: 'خطا در دریافت غذا',
            error: error.message
        });
    }
};

// ایجاد غذای جدید
exports.createFood = async (req, res) => {
    console.log('🚀 شروع ایجاد غذا...');
    console.log('📝 Body data:', req.body);

    // لاگ اطلاعات آپلود شده
    logUploadedFiles(req);

    try {
        const {
            title,
            description,
            menu,
            price,
            ingredients,
            category,
            inStock
        } = req.body;

        // اعتبارسنجی فیلدهای اجباری
        if (!title || !description || !menu || !price) {
            console.log('❌ فیلدهای اجباری پر نشده اند');

            // پاک‌سازی فایل‌های آپلود شده
            if (req.files) {
                console.log('🧹 در حال پاک‌سازی فایل‌های آپلود شده به دلیل خطای اعتبارسنجی...');
                await cleanupUploadedFiles(req.files);
            }

            return res.status(400).json({
                success: false,
                message: 'لطفا فیلدهای اجباری را پر کنید (عنوان، توضیحات، منو، قیمت)',
                requiredFields: {
                    title: !title ? 'الزامی' : 'پر شده',
                    description: !description ? 'الزامی' : 'پر شده',
                    menu: !menu ? 'الزامی' : 'پر شده',
                    price: !price ? 'الزامی' : 'پر شده'
                }
            });
        }

        // اعتبارسنجی وجود منو
        if (!mongoose.Types.ObjectId.isValid(menu)) {
            console.log('❌ شناسه منو نامعتبر است:', menu);

            if (req.files) {
                await cleanupUploadedFiles(req.files);
            }

            return res.status(400).json({
                success: false,
                message: 'شناسه منو نامعتبر است'
            });
        }

        const menuExists = await Menu.findById(menu);
        if (!menuExists) {
            console.log('❌ منو یافت نشد:', menu);

            if (req.files) {
                await cleanupUploadedFiles(req.files);
            }

            return res.status(404).json({
                success: false,
                message: 'منو یافت نشد'
            });
        }

        console.log('✅ منو پیدا شد:', menuExists.title);

        // پردازش مواد اولیه
        let ingredientsArray = [];
        if (ingredients) {
            ingredientsArray = Array.isArray(ingredients)
                ? ingredients
                : ingredients.split(',').map(item => item.trim()).filter(item => item);
        }

        // پردازش تصاویر آپلود شده
        let imagesPaths = [];

        if (req.files) {
            console.log('🖼️ پردازش تصاویر آپلود شده...');

            // حالت ۱: اگر فایل‌ها به صورت آرایه باشند (upload.array)
            if (Array.isArray(req.files)) {
                console.log('📦 فایل‌ها به صورت آرایه دریافت شدند');
                for (const file of req.files) {
                    const filePath = `/uploads/foods/${file.filename}`;
                    imagesPaths.push(filePath);
                    console.log(`   ➕ اضافه شد: ${filePath}`);
                }
            }
            // حالت ۲: اگر فایل‌ها به صورت آبجکت باشند (upload.fields)
            else if (typeof req.files === 'object') {
                console.log('📦 فایل‌ها به صورت آبجکت دریافت شدند');

                // بررسی کلیدهای مختلف
                Object.keys(req.files).forEach(fieldName => {
                    const files = req.files[fieldName];
                    console.log(`   فیلد "${fieldName}" دارای ${files.length} فایل`);

                    files.forEach(file => {
                        const filePath = `/uploads/foods/${file.filename}`;
                        imagesPaths.push(filePath);
                        console.log(`     ➕ اضافه شد: ${filePath}`);
                    });
                });

                // اگر از کلید خاصی استفاده می‌کنید (مثلاً 'images')
                if (req.files['images']) {
                    console.log('✅ فایل‌ها از فیلد "images" دریافت شدند');
                }
            }
        } else {
            console.log('⚠️ هیچ فایلی آپلود نشده است');
        }

        console.log(`📊 تعداد تصاویر پردازش شده: ${imagesPaths.length}`);
        console.log('📁 مسیرهای تصویر:', imagesPaths);

        // آماده کردن داده غذا
        const foodData = {
            title,
            description,
            menu,
            price: parseFloat(price),
            images: imagesPaths,
            ingredients: ingredientsArray,
            category: category || null,
            inStock: inStock !== undefined ? (inStock === 'true' || inStock === true) : true
        };

        console.log('💾 داده غذا برای ذخیره:', {
            ...foodData,
            imagesCount: foodData.images.length
        });

        // ایجاد غذا در دیتابیس
        const food = await Food.create(foodData);
        console.log('✅ غذا در دیتابیس ایجاد شد. ID:', food._id);

        // دریافت اطلاعات کامل منو
        await food.populate('menu', 'title bussinessName');

        res.status(201).json({
            success: true,
            message: 'غذا با موفقیت ایجاد شد',
            data: formatFoodResponse(food, req),
            debug: {
                imagesUploaded: imagesPaths.length,
                imagesSaved: food.images.length
            }
        });

    } catch (error) {
        console.error('❌ خطا در ایجاد غذا:', error);

        // پاک‌سازی فایل‌های آپلود شده در صورت خطا
        if (req.files) {
            console.log('🧹 در حال پاک‌سازی فایل‌های آپلود شده به دلیل خطا...');
            await cleanupUploadedFiles(req.files);
        }

        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                message: 'خطا در اعتبارسنجی داده‌ها',
                error: error.message,
                validationErrors: error.errors
            });
        }

        res.status(500).json({
            success: false,
            message: 'خطا در ایجاد غذا',
            error: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
};

// تابع کمکی برای پاک‌سازی فایل‌های آپلود شده
async function cleanupUploadedFiles(files) {
    try {
        let allFiles = [];

        if (Array.isArray(files)) {
            allFiles = files;
        } else if (typeof files === 'object') {
            Object.keys(files).forEach(key => {
                allFiles = [...allFiles, ...files[key]];
            });
        }

        console.log(`🧹 پاک‌سازی ${allFiles.length} فایل...`);

        for (const file of allFiles) {
            await deleteOldFile(`/uploads/foods/${file.filename}`);
        }

        console.log('✅ پاک‌سازی فایل‌ها کامل شد');
    } catch (cleanupError) {
        console.error('❌ خطا در پاک‌سازی فایل‌ها:', cleanupError);
    }
}

// به‌روزرسانی اطلاعات غذا
exports.updateFood = async (req, res) => {
    console.log('✏️ به‌روزرسانی غذا...');

    try {
        const { id } = req.params;
        const {
            title,
            description,
            menu,
            price,
            ingredients,
            category,
            inStock
        } = req.body;

        // اعتبارسنجی فرمت ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: 'شناسه غذا نامعتبر است'
            });
        }

        // بررسی وجود غذا
        const existingFood = await Food.findById(id);
        if (!existingFood) {
            return res.status(404).json({
                success: false,
                message: 'غذا یافت نشد'
            });
        }

        // اعتبارسنجی منو اگر ارائه شده باشد
        if (menu && !mongoose.Types.ObjectId.isValid(menu)) {
            return res.status(400).json({
                success: false,
                message: 'شناسه منو نامعتبر است'
            });
        }

        if (menu) {
            const menuExists = await Menu.findById(menu);
            if (!menuExists) {
                return res.status(404).json({
                    success: false,
                    message: 'منو یافت نشد'
                });
            }
        }

        // آماده کردن داده‌های به‌روزرسانی
        const updateData = {};
        if (title !== undefined) updateData.title = title;
        if (description !== undefined) updateData.description = description;
        if (menu !== undefined) updateData.menu = menu;
        if (price !== undefined) updateData.price = parseFloat(price);
        if (category !== undefined) updateData.category = category;
        if (inStock !== undefined) updateData.inStock = inStock === 'true' || inStock === true;

        // پردازش مواد اولیه
        if (ingredients !== undefined) {
            updateData.ingredients = Array.isArray(ingredients)
                ? ingredients
                : ingredients.split(',').map(item => item.trim()).filter(item => item);
        }

        console.log('📝 داده‌های به‌روزرسانی:', updateData);

        // پیدا کردن و به‌روزرسانی غذا
        const food = await Food.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        ).populate('menu', 'title bussinessName');

        res.status(200).json({
            success: true,
            message: 'غذا با موفقیت به‌روزرسانی شد',
            data: formatFoodResponse(food, req)
        });
    } catch (error) {
        console.error('❌ خطا در به‌روزرسانی غذا:', error);

        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                message: 'خطا در اعتبارسنجی داده‌ها',
                error: error.message
            });
        }

        res.status(500).json({
            success: false,
            message: 'خطا در به‌روزرسانی غذا',
            error: error.message
        });
    }
};

// به‌روزرسانی تصویر غذا
// controllers/foods.js - متد updateFoodImage
// controllers/foods.js - متد updateFoodImage
// controllers/foods.js - متد updateFoodImage
exports.updateFoodImage = async (req, res) => {
    console.log('🔄 ========== UPDATE FOOD IMAGE ==========');

    try {
        const { id } = req.params;

        // دیباگ کامل
        console.log('📊 Request Info:');
        console.log('- Food ID:', id);
        console.log('- Body fields:', Object.keys(req.body));
        console.log('- Files count:', req.files ? req.files.length : 0);

        if (req.files && req.files.length > 0) {
            console.log('📁 Uploaded files:');
            req.files.forEach((file, index) => {
                console.log(`  [${index}] ${file.fieldname}: ${file.originalname} (${file.mimetype})`);
            });
        }

        // اعتبارسنجی ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: 'شناسه غذا نامعتبر است'
            });
        }

        // بررسی وجود فایل
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'لطفا حداقل یک فایل تصویر آپلود کنید',
                help: 'در FormData از کلیدهایی مثل "image"، "images"، "file" یا "photo" استفاده کنید'
            });
        }

        // پیدا کردن غذا
        const food = await Food.findById(id);
        if (!food) {
            // پاک‌سازی فایل‌های آپلود شده
            if (req.files) {
                req.files.forEach(async (file) => {
                    await deleteOldFile(`/uploads/foods/${file.filename}`);
                });
            }

            return res.status(404).json({
                success: false,
                message: 'غذا یافت نشد'
            });
        }

        console.log(`✅ Food found: ${food.title} (${food.images.length} current images)`);

        // پردازش فایل‌های آپلود شده
        const newImagePaths = [];

        req.files.forEach(file => {
            const imagePath = `/uploads/foods/${file.filename}`;
            newImagePaths.push(imagePath);
            console.log(`➕ Adding image: ${imagePath} (from field: "${file.fieldname}")`);
        });

        // اضافه کردن تصاویر جدید به لیست موجود
        const updatedImages = [...food.images, ...newImagePaths];

        // محدود کردن تعداد تصاویر (اختیاری)
        const MAX_IMAGES = 20;
        if (updatedImages.length > MAX_IMAGES) {
            // حذف قدیمی‌ترین تصاویر اگر تعداد از حد مجاز بیشتر شد
            const imagesToKeep = updatedImages.slice(-MAX_IMAGES);
            const imagesToDelete = updatedImages.slice(0, updatedImages.length - MAX_IMAGES);

            // حذف فایل‌های قدیمی از سرور
            imagesToDelete.forEach(async (oldImagePath) => {
                await deleteOldFile(oldImagePath);
            });

            food.images = imagesToKeep;
            console.log(`✂️ Trimmed images from ${updatedImages.length} to ${MAX_IMAGES}`);
        } else {
            food.images = updatedImages;
        }

        // ذخیره تغییرات
        await food.save();

        // دریافت اطلاعات کامل
        await food.populate('menu', 'title bussinessName');

        // آماده کردن پاسخ
        const responseData = formatFoodResponse(food, req);

        console.log(`✅ Successfully updated. Total images: ${food.images.length}`);
        console.log('🔄 =====================================');

        res.status(200).json({
            success: true,
            message: 'تصاویر با موفقیت اضافه شدند',
            data: responseData,
            addedImages: newImagePaths.length,
            totalImages: food.images.length,
            uploadedFields: req.files.map(f => f.fieldname)
        });

    } catch (error) {
        console.error('❌ Error in updateFoodImage:', error);

        // پاک‌سازی فایل‌های آپلود شده در صورت خطا
        if (req.files) {
            req.files.forEach(async (file) => {
                await deleteOldFile(`/uploads/foods/${file.filename}`);
            });
        }

        res.status(500).json({
            success: false,
            message: 'خطا در به‌روزرسانی تصاویر غذا',
            error: error.message
        });
    }
};

// حذف غذا
exports.deleteFood = async (req, res) => {
    console.log('🗑️ حذف غذا...');

    try {
        const { id } = req.params;

        // اعتبارسنجی فرمت ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: 'شناسه غذا نامعتبر است'
            });
        }

        // پیدا کردن غذا
        const food = await Food.findById(id);

        if (!food) {
            return res.status(404).json({
                success: false,
                message: 'غذا یافت نشد'
            });
        }

        // ذخیره اطلاعات غذا برای پاسخ
        const foodInfo = {
            id: food._id,
            title: food.title,
            menu: food.menu,
            imagesCount: food.images.length
        };

        console.log(`🧹 حذف ${food.images.length} تصویر وابسته...`);

        // حذف فایل‌های تصویر وابسته
        const deletePromises = food.images.map(img => deleteOldFile(img));
        await Promise.all(deletePromises);

        // حذف غذا از دیتابیس
        await Food.findByIdAndDelete(id);

        console.log('✅ غذا حذف شد');

        res.status(200).json({
            success: true,
            message: 'غذا با موفقیت حذف شد',
            data: foodInfo
        });
    } catch (error) {
        console.error('❌ خطا در حذف غذا:', error);
        res.status(500).json({
            success: false,
            message: 'خطا در حذف غذا',
            error: error.message
        });
    }
};

// اضافه کردن غذا به منو
// اضافه کردن غذا به منو (ورژن جدید با آپدیت دوطرفه)
exports.addFoodToMenu = async (req, res) => {
    console.log('➕ ========== ADD FOOD TO MENU ==========');

    try {
        const { menuId, foodId } = req.params;

        // دیباگ
        console.log('📊 Request Info:');
        console.log('- Menu ID:', menuId);
        console.log('- Food ID:', foodId);

        // اعتبارسنجی شناسه‌ها
        if (!mongoose.Types.ObjectId.isValid(menuId) || !mongoose.Types.ObjectId.isValid(foodId)) {
            return res.status(400).json({
                success: false,
                message: 'شناسه‌های منو یا غذا نامعتبر هستند',
                menuIdValid: mongoose.Types.ObjectId.isValid(menuId),
                foodIdValid: mongoose.Types.ObjectId.isValid(foodId)
            });
        }

        console.log('🔍 جستجوی منو و غذا...');

        // جستجوی همزمان منو و غذا
        const [menu, food] = await Promise.all([
            Menu.findById(menuId),
            Food.findById(foodId)
        ]);

        // بررسی وجود منو و غذا
        if (!menu) {
            console.log('❌ منو یافت نشد:', menuId);
            return res.status(404).json({
                success: false,
                message: 'منو یافت نشد'
            });
        }

        if (!food) {
            console.log('❌ غذا یافت نشد:', foodId);
            return res.status(404).json({
                success: false,
                message: 'غذا یافت نشد'
            });
        }

        console.log(`✅ منو پیدا شد: ${menu.title}`);
        console.log(`✅ غذا پیدا شد: ${food.title}`);

        // بررسی آیا غذا قبلاً در این منو اضافه شده است
        const foodAlreadyInMenu = menu.foods.some(foodRef =>
            foodRef.toString() === foodId
        );

        if (foodAlreadyInMenu) {
            console.log('⚠️ غذا قبلاً در این منو اضافه شده است');
            return res.status(400).json({
                success: false,
                message: 'این غذا قبلاً در منو اضافه شده است',
                alreadyAdded: true
            });
        }

        // بررسی آیا غذا در حال حاضر در منوی دیگری است
        if (food.menu && food.menu.toString() !== menuId) {
            console.log(`⚠️ غذا در منوی دیگری است (${food.menu})`);

            // گزینه ۱: انتقال غذا از منوی قدیمی
            const oldMenu = await Menu.findById(food.menu);
            if (oldMenu) {
                // حذف غذا از منوی قدیمی
                oldMenu.foods = oldMenu.foods.filter(
                    foodRef => foodRef.toString() !== foodId
                );
                await oldMenu.save();
                console.log(`✅ غذا از منوی قبلی حذف شد: ${oldMenu.title}`);
            }
        }

        // شروع تراکنش برای آپدیت دوطرفه
        console.log('💾 شروع به‌روزرسانی دوطرفه...');

        // ۱. اضافه کردن غذا به آر foods منو
        menu.foods.push(foodId);

        // ۲. آپدیت فیلد menu در غذا
        food.menu = menuId;

        // ذخیره تغییرات به صورت همزمان
        await Promise.all([
            menu.save(),
            food.save()
        ]);

        console.log(`✅ غذا به منو اضافه شد: ${food.title} → ${menu.title}`);
        console.log(`📊 منو اکنون ${menu.foods.length} غذا دارد`);

        // دریافت اطلاعات کامل برای پاسخ
        const [updatedMenu, updatedFood] = await Promise.all([
            Menu.findById(menuId)
                .populate('foods', 'title price images')
                .populate('template', 'title'),
            Food.findById(foodId)
                .populate('menu', 'title bussinessName')
        ]);

        // فرمت پاسخ
        const response = {
            success: true,
            message: 'غذا با موفقیت به منو اضافه شد',
            data: {
                menu: {
                    id: updatedMenu._id,
                    title: updatedMenu.title,
                    businessName: updatedMenu.bussinessName,
                    foodCount: updatedMenu.foods.length,
                    foods: updatedMenu.foods.map(f => ({
                        id: f._id,
                        title: f.title,
                        price: f.price,
                        image: f.images && f.images.length > 0
                            ? `${req.protocol}://${req.get('host')}${f.images[0]}`
                            : null
                    }))
                },
                food: {
                    id: updatedFood._id,
                    title: updatedFood.title,
                    price: updatedFood.price,
                    menu: {
                        id: updatedFood.menu._id,
                        title: updatedFood.menu.title,
                        businessName: updatedFood.menu.bussinessName
                    }
                }
            },
            stats: {
                totalFoodsInMenu: updatedMenu.foods.length,
                addedAt: new Date().toISOString()
            }
        };

        console.log('🎉 عملیات با موفقیت انجام شد');
        console.log('➕ =====================================');

        res.status(200).json(response);

    } catch (error) {
        console.error('❌ خطا در اضافه کردن غذا به منو:', error);

        res.status(500).json({
            success: false,
            message: 'خطا در اضافه کردن غذا به منو',
            error: error.message,
            errorType: error.name
        });
    }
};

// حذف غذا از منو
exports.removeFoodFromMenu = async (req, res) => {
    console.log('➖ ========== REMOVE FOOD FROM MENU ==========');

    try {
        const { menuId, foodId } = req.params;

        console.log('📊 Request Info:');
        console.log('- Menu ID:', menuId);
        console.log('- Food ID:', foodId);

        // اعتبارسنجی شناسه‌ها
        if (!mongoose.Types.ObjectId.isValid(menuId) || !mongoose.Types.ObjectId.isValid(foodId)) {
            return res.status(400).json({
                success: false,
                message: 'شناسه‌های منو یا غذا نامعتبر هستند'
            });
        }

        // جستجوی منو
        const menu = await Menu.findById(menuId);
        if (!menu) {
            return res.status(404).json({
                success: false,
                message: 'منو یافت نشد'
            });
        }

        // جستجوی غذا
        const food = await Food.findById(foodId);
        if (!food) {
            return res.status(404).json({
                success: false,
                message: 'غذا یافت نشد'
            });
        }

        // بررسی آیا غذا در منو وجود دارد
        const foodIndex = menu.foods.findIndex(
            foodRef => foodRef.toString() === foodId
        );

        if (foodIndex === -1) {
            return res.status(400).json({
                success: false,
                message: 'این غذا در منو وجود ندارد'
            });
        }

        console.log(`✅ غذا پیدا شد در منو: ${food.title} در ${menu.title}`);

        // ۱. حذف غذا از آرایه foods منو
        menu.foods.splice(foodIndex, 1);

        // ۲. حذف ارجاع منو از غذا (اختیاری - بستگی به منطق کسب‌وکار دارد)
        // اگر می‌خواهید غذا بدون منو باشد:
        // food.menu = null;
        // اگر می‌خواهید غذا همچنان ارجاع داشته باشد اما در منو نباشد:
        // هیچ کاری نکنید

        // ذخیره تغییرات
        await Promise.all([
            menu.save(),
            // food.save() // اگر food.menu را null کردید، این را فعال کنید
        ]);

        console.log(`✅ غذا از منو حذف شد`);
        console.log(`📊 منو اکنون ${menu.foods.length} غذا دارد`);

        // دریافت اطلاعات به‌روز شده
        const updatedMenu = await Menu.findById(menuId)
            .populate('foods', 'title price');

        res.status(200).json({
            success: true,
            message: 'غذا با موفقیت از منو حذف شد',
            data: {
                menu: {
                    id: updatedMenu._id,
                    title: updatedMenu.title,
                    foodCount: updatedMenu.foods.length,
                    foods: updatedMenu.foods.map(f => ({
                        id: f._id,
                        title: f.title,
                        price: f.price
                    }))
                },
                removedFood: {
                    id: food._id,
                    title: food.title,
                    price: food.price
                }
            }
        });

        console.log('➖ =====================================');

    } catch (error) {
        console.error('❌ خطا در حذف غذا از منو:', error);

        res.status(500).json({
            success: false,
            message: 'خطا در حذف غذا از منو',
            error: error.message
        });
    }
};


// حذف تصویر خاص غذا
exports.deleteFoodImage = async (req, res) => {
    console.log('🗑️ حذف تصویر خاص غذا...');

    try {
        const { id, imageIndex } = req.params;

        // اعتبارسنجی فرمت ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: 'شناسه غذا نامعتبر است'
            });
        }

        // پارس کردن اندیس تصویر
        const index = parseInt(imageIndex);
        if (isNaN(index) || index < 0) {
            return res.status(400).json({
                success: false,
                message: 'اندیس تصویر نامعتبر است'
            });
        }

        // پیدا کردن غذا
        const food = await Food.findById(id);

        if (!food) {
            return res.status(404).json({
                success: false,
                message: 'غذا یافت نشد'
            });
        }

        // بررسی وجود تصویر در اندیس مشخص شده
        if (index >= food.images.length) {
            return res.status(400).json({
                success: false,
                message: 'تصویر در این اندیس وجود ندارد',
                availableIndices: Array.from({ length: food.images.length }, (_, i) => i)
            });
        }

        // گرفتن تصویر برای حذف
        const imageToDelete = food.images[index];

        console.log(`حذف تصویر اندیس ${index}: ${imageToDelete}`);

        // حذف فایل تصویر
        await deleteOldFile(imageToDelete);

        // حذف تصویر از آرایه
        food.images.splice(index, 1);
        await food.save();

        await food.populate('menu', 'title bussinessName');

        res.status(200).json({
            success: true,
            message: 'تصویر غذا با موفقیت حذف شد',
            data: formatFoodResponse(food, req)
        });
    } catch (error) {
        console.error('❌ خطا در حذف تصویر غذا:', error);
        res.status(500).json({
            success: false,
            message: 'خطا در حذف تصویر غذا',
            error: error.message
        });
    }
};