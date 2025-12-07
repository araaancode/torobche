import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { menuApi, templateApi } from '../utils/api';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowLeft,
    Save,
    CheckCircle,
    Palette,
    Eye,
    Building,
    FileText,
    Camera,
    Upload,
    ChevronRight,
    ChevronLeft,
    Loader2,
    Sparkles,
    Search,
    Filter,
    Grid,
    List
} from 'lucide-react';

const MenuBuilder = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = !!id;

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [step, setStep] = useState(1); // 1: اطلاعات پایه، 2: انتخاب تمپلیت، 3: پیش‌نمایش

    const [templates, setTemplates] = useState([]);
    const [filteredTemplates, setFilteredTemplates] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [viewMode, setViewMode] = useState('grid'); // grid یا list

    const [menu, setMenu] = useState({
        title: '',
        bussinessName: '',
        description: '',
        icon: '',
        coverImage: '',
        qrcode: '',
        template: [], // فقط تمپلیت انتخاب شده
        foods: [] // غذاها بعداً اضافه می‌شوند
    });

    const [selectedTemplateId, setSelectedTemplateId] = useState(null);
    const [errors, setErrors] = useState({});

    // بارگذاری داده‌ها
    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);

                // بارگذاری تمپلیت‌ها
                const templatesRes = await templateApi.getAll();
                if (templatesRes && templatesRes.success) {
                    const templatesData = templatesRes.data || [];
                    setTemplates(templatesData);
                    setFilteredTemplates(templatesData);
                }

                // بارگذاری منو در حالت ویرایش
                if (isEditing && id) {
                    const menuRes = await menuApi.getById(id);
                    if (menuRes && menuRes.success) {
                        const menuData = menuRes.data;
                        setMenu({
                            title: menuData.title || '',
                            bussinessName: menuData.bussinessName || '',
                            description: menuData.description || '',
                            icon: menuData.icon ? `http://localhost:5000${menuData.icon}` : '',
                            coverImage: menuData.coverImage ? `http://localhost:5000${menuData.coverImage}` : '',
                            qrcode: menuData.qrcode ? `http://localhost:5000${menuData.qrcode}` : '',
                            template: menuData.template || [],
                            foods: menuData.foods || []
                        });

                        // تنظیم تمپلیت انتخاب شده
                        if (menuData.template && menuData.template.length > 0) {
                            const firstTemplate = menuData.template[0];
                            setSelectedTemplateId(firstTemplate._id || firstTemplate);
                        }
                    }
                }
            } catch (error) {
                console.error('خطا در بارگذاری داده‌ها:', error);
                alert('❌ خطا در بارگذاری داده‌ها');
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [id, isEditing]);

    // فیلتر کردن تمپلیت‌ها
    useEffect(() => {
        let result = templates;

        // فیلتر بر اساس جستجو
        if (searchTerm) {
            result = result.filter(template =>
                template?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                template?.description?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // فیلتر بر اساس دسته‌بندی
        if (selectedCategory !== 'all') {
            result = result.filter(template =>
                template.category === selectedCategory
            );
        }

        setFilteredTemplates(result);
    }, [searchTerm, selectedCategory, templates]);

    // اعتبارسنجی فرم
    const validateStep = (stepNumber) => {
        const newErrors = {};

        if (stepNumber === 1) {
            if (!menu.bussinessName.trim()) newErrors.bussinessName = 'نام کسب‌وکار الزامی است';
            if (!menu.title.trim()) newErrors.title = 'عنوان منو الزامی است';
        }

        if (stepNumber === 2 && !selectedTemplateId) {
            newErrors.template = 'لطفا یک تمپلیت انتخاب کنید';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // رفتن به مرحله بعدی
    const handleNextStep = () => {
        if (!validateStep(step)) return;
        if (step < 3) setStep(step + 1);
    };

    // ذخیره منو
    const handleSaveMenu = async (status = 'draft') => {
        if (!validateStep(step)) return;

        setSaving(true);
        try {
            const menuData = {
                title: menu.title,
                bussinessName: menu.bussinessName,
                description: menu.description,
                icon: menu.icon.replace('http://localhost:5000', ''),
                coverImage: menu.coverImage.replace('http://localhost:5000', ''),
                qrcode: menu.qrcode.replace('http://localhost:5000', ''),
                template: selectedTemplateId ? [selectedTemplateId] : [],
                foods: [], // غذاها بعداً اضافه می‌شوند
                status: status
            };

            let response;
            if (isEditing) {
                response = await menuApi.update(id, menuData);
            } else {
                response = await menuApi.create(menuData);
            }

            if (response && response.success) {
                if (status === 'published') {
                    alert('🎉 منو با موفقیت ایجاد شد! حالا می‌توانید غذاها را اضافه کنید.');
                    navigate(`/menu/${response.data._id}/foods`);
                } else {
                    alert('✅ تغییرات ذخیره شد');
                    if (!isEditing) {
                        navigate(`/menu/${response.data._id}/foods`);
                    }
                }
            } else {
                alert('❌ خطا در ذخیره منو');
            }
        } catch (error) {
            console.error('خطا در ذخیره منو:', error);
            alert('❌ خطا در ذخیره منو');
        } finally {
            setSaving(false);
        }
    };

    // آپلود فایل
    const handleFileUpload = async (e, field) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // شبیه‌سازی آپلود
        const mockUrl = URL.createObjectURL(file);
        setMenu(prev => ({ ...prev, [field]: mockUrl }));
    };

    // گرفتن دسته‌بندی‌های منحصربه‌فرد
    const getUniqueCategories = () => {
        const categories = ['all', ...new Set(templates.map(t => t.category).filter(Boolean))];
        return categories;
    };

    // تمپلیت انتخاب شده
    const selectedTemplate = templates.find(t => t._id === selectedTemplateId);

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="relative">
                        <div className="w-24 h-24 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Sparkles className="w-12 h-12 text-blue-600 animate-pulse" />
                        </div>
                    </div>
                    <p className="mt-6 text-gray-600 text-lg font-medium">
                        در حال آماده‌سازی...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
            {/* Header */}
            <motion.header
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <button
                            onClick={() => navigate('/')}
                            className="flex items-center text-gray-700 hover:text-gray-900 transition-colors group"
                        >
                            <ArrowLeft className="w-5 h-5 ml-2 group-hover:-translate-x-1 transition-transform" />
                            بازگشت به لیست
                        </button>

                        <div className="text-center">
                            <h1 className="text-2xl font-bold text-gray-900">
                                {isEditing ? '✏️ ویرایش منو' : '✨ ساخت منوی جدید'}
                            </h1>
                            <p className="text-gray-600 text-sm mt-1">
                                مرحله {step} از ۳ • {step === 1 ? 'اطلاعات پایه' : step === 2 ? 'انتخاب تمپلیت' : 'پیش‌نمایش'}
                            </p>
                        </div>

                        <button
                            onClick={() => handleSaveMenu('draft')}
                            disabled={saving}
                            className="px-4 py-2 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-lg hover:from-gray-700 hover:to-gray-800 disabled:opacity-50 transition-all duration-300 flex items-center"
                        >
                            {saving ? (
                                <Loader2 className="w-4 h-4 ml-2 animate-spin" />
                            ) : (
                                <Save className="w-4 h-4 ml-2" />
                            )}
                            ذخیره پیش‌نویس
                        </button>
                    </div>

                    {/* Progress Steps */}
                    <div className="mt-6">
                        <div className="flex justify-between mb-2">
                            {[
                                { number: 1, label: 'اطلاعات پایه', icon: Building },
                                { number: 2, label: 'انتخاب تمپلیت', icon: Palette },
                                { number: 3, label: 'پیش‌نمایش', icon: Eye }
                            ].map((stepItem) => (
                                <div key={stepItem.number} className="flex flex-col items-center">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 transition-all duration-300
                    ${step > stepItem.number ? 'bg-green-500 text-white shadow-md' :
                                            step === stepItem.number ? 'bg-blue-600 text-white shadow-lg scale-110' :
                                                'bg-gray-100 text-gray-400'}
                  `}>
                                        {step > stepItem.number ? (
                                            <CheckCircle className="w-5 h-5" />
                                        ) : (
                                            <stepItem.icon className="w-5 h-5" />
                                        )}
                                    </div>
                                    <span className={`text-sm font-medium transition-colors
                    ${step >= stepItem.number ? 'text-gray-900' : 'text-gray-400'}
                  `}>
                                        {stepItem.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-gradient-to-r from-blue-600 to-blue-700 rounded-full"
                                initial={{ width: '0%' }}
                                animate={{ width: `${(step / 3) * 100}%` }}
                                transition={{ duration: 0.5 }}
                            />
                        </div>
                    </div>
                </div>
            </motion.header>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <AnimatePresence mode="wait">
                    {/* Step 1: Basic Information */}
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
                        >
                            <div className="mb-8">
                                <h2 className="text-3xl font-bold text-gray-900 mb-3 flex items-center">
                                    <Building className="w-8 h-8 ml-3 text-blue-600" />
                                    اطلاعات اولیه منو
                                </h2>
                                <p className="text-gray-600">
                                    ابتدا اطلاعات اصلی منوی خود را وارد کنید
                                </p>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {/* فرم اطلاعات */}
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-3 text-right">
                                            نام رستوران/کافه *
                                        </label>
                                        <input
                                            type="text"
                                            value={menu.bussinessName}
                                            onChange={(e) => setMenu(prev => ({ ...prev, bussinessName: e.target.value }))}
                                            className={`w-full px-5 py-4 border-2 rounded-xl focus:ring-2 transition-all duration-300 text-right text-lg placeholder-gray-400
                        ${errors.bussinessName ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-blue-500 focus:ring-blue-200'}
                      `}
                                            placeholder="مثال: رستوران ایرانی تهران"
                                            dir="rtl"
                                        />
                                        {errors.bussinessName && (
                                            <p className="mt-2 text-sm text-red-600">{errors.bussinessName}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-3 text-right">
                                            عنوان منو *
                                        </label>
                                        <input
                                            type="text"
                                            value={menu.title}
                                            onChange={(e) => setMenu(prev => ({ ...prev, title: e.target.value }))}
                                            className={`w-full px-5 py-4 border-2 rounded-xl focus:ring-2 transition-all duration-300 text-right text-lg placeholder-gray-400
                        ${errors.title ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-blue-500 focus:ring-blue-200'}
                      `}
                                            placeholder="مثال: منوی اصلی فصلی"
                                            dir="rtl"
                                        />
                                        {errors.title && (
                                            <p className="mt-2 text-sm text-red-600">{errors.title}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-3 text-right">
                                            توضیحات منو (اختیاری)
                                        </label>
                                        <textarea
                                            value={menu.description}
                                            onChange={(e) => setMenu(prev => ({ ...prev, description: e.target.value }))}
                                            className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 text-right placeholder-gray-400 resize-none"
                                            placeholder="توضیحی درباره منوی خود بنویسید..."
                                            rows={4}
                                            dir="rtl"
                                        />
                                    </div>
                                </div>

                                {/* آپلود فایل‌ها */}
                                <div className="space-y-6">
                                    {/* آیکون */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-3 text-right">
                                            آیکون رستوران
                                        </label>
                                        <div className="relative border-3 border-dashed border-gray-200 rounded-2xl p-8 text-center hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 cursor-pointer">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => handleFileUpload(e, 'icon')}
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                            />
                                            <div className="w-32 h-32 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden">
                                                {menu.icon ? (
                                                    <img src={menu.icon} alt="آیکون" className="w-full h-full object-cover" />
                                                ) : (
                                                    <Camera className="w-12 h-12 text-gray-400" />
                                                )}
                                            </div>
                                            <p className="text-gray-600 mb-2">
                                                {menu.icon ? 'تغییر آیکون' : 'آپلود آیکون'}
                                            </p>
                                            <p className="text-sm text-gray-500">PNG, JPG • حداکثر ۲ مگابایت</p>
                                        </div>
                                    </div>

                                    {/* کاور */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-3 text-right">
                                            تصویر کاور منو
                                        </label>
                                        <div className="relative border-3 border-dashed border-gray-200 rounded-2xl p-8 text-center hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 cursor-pointer">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => handleFileUpload(e, 'coverImage')}
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                            />
                                            <div className="w-full h-48 mx-auto mb-6 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden">
                                                {menu.coverImage ? (
                                                    <img src={menu.coverImage} alt="کاور" className="w-full h-full object-cover" />
                                                ) : (
                                                    <Upload className="w-16 h-16 text-gray-400" />
                                                )}
                                            </div>
                                            <p className="text-gray-600 mb-2">
                                                {menu.coverImage ? 'تغییر کاور' : 'آپلود کاور'}
                                            </p>
                                            <p className="text-sm text-gray-500">PNG, JPG • حداکثر ۵ مگابایت</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* دکمه ادامه */}
                            <div className="mt-10 pt-8 border-t border-gray-100 flex justify-end">
                                <button
                                    onClick={handleNextStep}
                                    className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center group"
                                >
                                    ادامه به انتخاب تمپلیت
                                    <ChevronRight className="w-5 h-5 mr-3 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* Step 2: Template Selection */}
                    {step === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
                        >
                            <div className="mb-8">
                                <h2 className="text-3xl font-bold text-gray-900 mb-3 flex items-center">
                                    <Palette className="w-8 h-8 ml-3 text-purple-600" />
                                    انتخاب قالب طراحی
                                </h2>
                                <p className="text-gray-600">
                                    قالب دلخواه خود را برای منو انتخاب کنید. غذاها بعداً اضافه خواهند شد.
                                </p>
                            </div>

                            {/* فیلتر و جستجو */}
                            <div className="mb-8 bg-gray-50 rounded-2xl p-6">
                                <div className="flex flex-col md:flex-row md:items-center gap-4">
                                    {/* جستجو */}
                                    <div className="flex-1">
                                        <div className="relative">
                                            <input
                                                type="text"
                                                placeholder="جستجو در تمپلیت‌ها..."
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                                className="w-full px-5 py-3 pr-12 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300 text-right"
                                                dir="rtl"
                                            />
                                            <Search className="absolute right-4 top-3.5 w-5 h-5 text-gray-400" />
                                        </div>
                                    </div>

                                    {/* دسته‌بندی‌ها */}
                                    <div className="flex items-center gap-2">
                                        <Filter className="w-5 h-5 text-gray-400" />
                                        <div className="flex flex-wrap gap-2">
                                            {getUniqueCategories().map(category => (
                                                <button
                                                    key={category}
                                                    onClick={() => setSelectedCategory(category)}
                                                    className={`px-4 py-2 rounded-lg transition-all duration-300 ${selectedCategory === category
                                                            ? 'bg-purple-600 text-white shadow-md'
                                                            : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                                                        }`}
                                                >
                                                    {category === 'all' ? 'همه' : category}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* حالت نمایش */}
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => setViewMode('grid')}
                                            className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-purple-100 text-purple-600' : 'text-gray-400 hover:text-gray-600'
                                                }`}
                                        >
                                            <Grid className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={() => setViewMode('list')}
                                            className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-purple-100 text-purple-600' : 'text-gray-400 hover:text-gray-600'
                                                }`}
                                        >
                                            <List className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* نمایش خطا */}
                            {errors.template && (
                                <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-xl">
                                    <p className="text-red-600 text-center">
                                        ⚠️ {errors.template}
                                    </p>
                                </div>
                            )}

                            {/* تمپلیت انتخاب شده */}
                            {selectedTemplate && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mb-8 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border-2 border-purple-200"
                                >
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                                                ✅ قالب انتخاب شده
                                            </h3>
                                            <p className="text-gray-600">{selectedTemplate.title}</p>
                                        </div>
                                        <button
                                            onClick={() => setSelectedTemplateId(null)}
                                            className="px-4 py-2 text-sm text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                                        >
                                            تغییر انتخاب
                                        </button>
                                    </div>
                                </motion.div>
                            )}

                            {/* لیست تمپلیت‌ها */}
                            {viewMode === 'grid' ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {filteredTemplates.map(template => {
                                        const isSelected = selectedTemplateId === template._id;
                                        return (
                                            <motion.div
                                                key={template._id}
                                                whileHover={{ y: -5 }}
                                                whileTap={{ scale: 0.98 }}
                                                onClick={() => setSelectedTemplateId(template._id)}
                                                className={`relative rounded-2xl overflow-hidden border-2 cursor-pointer transition-all duration-300 group
                          ${isSelected
                                                        ? 'border-purple-500 ring-2 ring-purple-200 shadow-xl'
                                                        : 'border-gray-200 hover:border-gray-300 shadow-lg hover:shadow-xl'
                                                    }`}
                                            >
                                                {/* تصویر تمپلیت */}
                                                <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                                                    <img
                                                        src={template.image}
                                                        alt={template.title}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                    />

                                                    {/* نشانگر انتخاب */}
                                                    {isSelected && (
                                                        <div className="absolute top-4 left-4 w-10 h-10 bg-purple-500 text-white rounded-full flex items-center justify-center shadow-lg">
                                                            <CheckCircle className="w-5 h-5" />
                                                        </div>
                                                    )}

                                                    {/* قیمت */}
                                                    <div className="absolute bottom-4 right-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full shadow-lg">
                                                        <span className="font-bold">{template.price?.toLocaleString()} تومان</span>
                                                    </div>
                                                </div>

                                                {/* اطلاعات تمپلیت */}
                                                <div className="p-6">
                                                    <h3 className="font-bold text-gray-900 text-xl mb-3">{template.title}</h3>
                                                    <p className="text-gray-600 mb-4">{template.description}</p>

                                                    {/* رنگ‌ها */}
                                                    {template.colorPallete?.length > 0 && (
                                                        <div className="mb-4">
                                                            <div className="flex items-center mb-2">
                                                                <span className="text-sm text-gray-500 ml-3">پالت رنگ:</span>
                                                            </div>
                                                            <div className="flex space-x-2">
                                                                {template.colorPallete.slice(0, 6).map((color, idx) => (
                                                                    <div
                                                                        key={idx}
                                                                        className="w-8 h-8 rounded-lg border border-gray-200 shadow-sm"
                                                                        style={{ backgroundColor: color }}
                                                                        title={color}
                                                                    />
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}

                                                    {/* دکمه انتخاب */}
                                                    <div className={`px-4 py-2 rounded-lg text-center font-medium transition-colors mt-4
                            ${isSelected
                                                            ? 'bg-purple-50 text-purple-700'
                                                            : 'bg-gray-50 text-gray-700 group-hover:bg-gray-100'
                                                        }`}
                                                    >
                                                        {isSelected ? 'انتخاب شده' : 'انتخاب این قالب'}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            ) : (
                                // حالت لیستی
                                <div className="space-y-4">
                                    {filteredTemplates.map(template => {
                                        const isSelected = selectedTemplateId === template._id;
                                        return (
                                            <motion.div
                                                key={template._id}
                                                whileHover={{ x: 5 }}
                                                onClick={() => setSelectedTemplateId(template._id)}
                                                className={`flex items-center p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300
                          ${isSelected
                                                        ? 'border-purple-500 bg-purple-50 shadow-md'
                                                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                                    }`}
                                            >
                                                <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 ml-6">
                                                    <img
                                                        src={template.image}
                                                        alt={template.title}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>

                                                <div className="flex-1">
                                                    <div className="flex justify-between items-start mb-2">
                                                        <h3 className="font-bold text-gray-900 text-xl">{template.title}</h3>
                                                        <div className="text-lg font-bold text-purple-600">
                                                            {template.price?.toLocaleString()} تومان
                                                        </div>
                                                    </div>
                                                    <p className="text-gray-600 mb-3">{template.description}</p>

                                                    {/* رنگ‌ها */}
                                                    {template.colorPallete?.length > 0 && (
                                                        <div className="flex items-center space-x-2">
                                                            <span className="text-sm text-gray-500">رنگ‌ها:</span>
                                                            <div className="flex space-x-1">
                                                                {template.colorPallete.slice(0, 4).map((color, idx) => (
                                                                    <div
                                                                        key={idx}
                                                                        className="w-6 h-6 rounded border border-gray-200"
                                                                        style={{ backgroundColor: color }}
                                                                    />
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* نشانگر انتخاب */}
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ml-6
                          ${isSelected ? 'bg-purple-500' : 'border-2 border-gray-300'}
                        `}>
                                                    {isSelected && (
                                                        <CheckCircle className="w-5 h-5 text-white" />
                                                    )}
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            )}

                            {/* پیام خالی */}
                            {filteredTemplates.length === 0 && (
                                <div className="text-center py-16">
                                    <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
                                        <Palette className="w-16 h-16 text-gray-400" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                        تمپلیتی یافت نشد
                                    </h3>
                                    <p className="text-gray-600 max-w-md mx-auto mb-8">
                                        {searchTerm
                                            ? 'هیچ تمپلیتی با این مشخصات پیدا نشد. لطفا جستجوی دیگری امتحان کنید.'
                                            : 'هنوز تمپلیتی وجود ندارد. لطفا بعداً مراجعه کنید.'}
                                    </p>
                                    {searchTerm && (
                                        <button
                                            onClick={() => setSearchTerm('')}
                                            className="px-6 py-3 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-colors"
                                        >
                                            حذف فیلتر
                                        </button>
                                    )}
                                </div>
                            )}

                            {/* دکمه‌های ناوبری */}
                            <div className="mt-10 pt-8 border-t border-gray-100 flex justify-between">
                                <button
                                    onClick={() => setStep(1)}
                                    className="px-6 py-3.5 border-2 border-gray-200 rounded-xl text-gray-700 hover:border-gray-300 hover:bg-gray-50 transition-all duration-300 font-medium flex items-center group"
                                >
                                    <ChevronLeft className="w-5 h-5 mr-3 group-hover:-translate-x-1 transition-transform" />
                                    بازگشت
                                </button>
                                <div className="flex space-x-4">
                                    <button
                                        onClick={() => handleSaveMenu('draft')}
                                        disabled={saving}
                                        className="px-6 py-3.5 border-2 border-gray-200 rounded-xl text-gray-700 hover:border-gray-300 hover:bg-gray-50 disabled:opacity-50 transition-all duration-300 font-medium"
                                    >
                                        {saving ? 'در حال ذخیره...' : 'ذخیره پیش‌نویس'}
                                    </button>
                                    <button
                                        onClick={handleNextStep}
                                        disabled={!selectedTemplateId}
                                        className="px-8 py-3.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center group"
                                    >
                                        مشاهده پیش‌نمایش
                                        <ChevronRight className="w-5 h-5 mr-3 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Step 3: Preview */}
                    {step === 3 && (
                        <motion.div
                            key="step3"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
                        >
                            <div className="mb-8">
                                <h2 className="text-3xl font-bold text-gray-900 mb-3 flex items-center">
                                    <Eye className="w-8 h-8 ml-3 text-green-600" />
                                    پیش‌نمایش نهایی
                                </h2>
                                <p className="text-gray-600">
                                    قبل از انتشار، منوی خود را بررسی کنید. غذاها بعداً اضافه خواهند شد.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                {/* پیش‌نمایش منو */}
                                <div className="lg:col-span-2">
                                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100 shadow-lg">
                                        {/* هدر */}
                                        <div className="flex items-center mb-8">
                                            {menu.icon && (
                                                <div className="w-20 h-20 rounded-2xl bg-white p-3 shadow-lg ml-6">
                                                    <img
                                                        src={menu.icon}
                                                        alt="آیکون"
                                                        className="w-full h-full rounded-xl object-cover"
                                                    />
                                                </div>
                                            )}
                                            <div>
                                                <h3 className="text-3xl font-bold text-gray-900">{menu.bussinessName}</h3>
                                                <p className="text-gray-600 text-xl mt-2">{menu.title}</p>
                                                {menu.description && (
                                                    <p className="text-gray-500 mt-4 max-w-2xl">{menu.description}</p>
                                                )}
                                            </div>
                                        </div>

                                        {/* تصویر کاور */}
                                        {menu.coverImage && (
                                            <div className="mb-8 rounded-2xl overflow-hidden shadow-lg">
                                                <img
                                                    src={menu.coverImage}
                                                    alt="کاور"
                                                    className="w-full h-64 object-cover"
                                                />
                                            </div>
                                        )}

                                        {/* تمپلیت انتخاب شده */}
                                        {selectedTemplate && (
                                            <div className="mb-8">
                                                <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                                                    <Palette className="w-6 h-6 ml-2 text-purple-600" />
                                                    قالب طراحی انتخاب شده
                                                </h4>
                                                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                                    <div className="flex items-start">
                                                        <div className="w-32 h-32 rounded-xl overflow-hidden ml-6 flex-shrink-0">
                                                            <img
                                                                src={selectedTemplate.image}
                                                                alt={selectedTemplate.title}
                                                                className="w-full h-full object-cover"
                                                            />
                                                        </div>
                                                        <div className="flex-1">
                                                            <h5 className="text-2xl font-bold text-gray-900 mb-3">{selectedTemplate.title}</h5>
                                                            <p className="text-gray-600 mb-4">{selectedTemplate.description}</p>

                                                            <div className="flex justify-between items-center">
                                                                <div>
                                                                    <span className="text-sm text-gray-500">قیمت:</span>
                                                                    <div className="text-2xl font-bold text-purple-600">
                                                                        {selectedTemplate.price?.toLocaleString()} تومان
                                                                    </div>
                                                                </div>

                                                                {selectedTemplate.colorPallete?.length > 0 && (
                                                                    <div>
                                                                        <span className="text-sm text-gray-500 block mb-2">رنگ‌بندی:</span>
                                                                        <div className="flex space-x-2">
                                                                            {selectedTemplate.colorPallete.map((color, idx) => (
                                                                                <div
                                                                                    key={idx}
                                                                                    className="w-8 h-8 rounded border border-gray-200"
                                                                                    style={{ backgroundColor: color }}
                                                                                />
                                                                            ))}
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* یادآوری غذاها */}
                                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
                                            <div className="flex items-center">
                                                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center ml-4">
                                                    <span className="text-2xl">🍽️</span>
                                                </div>
                                                <div>
                                                    <h4 className="text-xl font-bold text-gray-900 mb-2">مرحله بعد: افزودن غذاها</h4>
                                                    <p className="text-gray-600">
                                                        بعد از انتشار منو، می‌توانید غذاها، دسته‌بندی‌ها و قیمت‌ها را اضافه کنید.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* خلاصه و دکمه‌ها */}
                                <div>
                                    <div className="sticky top-8">
                                        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 border border-gray-200 shadow-lg">
                                            <h4 className="text-2xl font-bold text-gray-900 mb-6">خلاصه سفارش</h4>

                                            <div className="space-y-6">
                                                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                                                    <span className="text-gray-600">قالب طراحی:</span>
                                                    <span className="font-bold text-gray-900">
                                                        {selectedTemplate ? selectedTemplate.title : 'انتخاب نشده'}
                                                    </span>
                                                </div>

                                                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                                                    <span className="text-gray-600">قیمت قالب:</span>
                                                    <span className="text-2xl font-bold text-purple-600">
                                                        {selectedTemplate ? selectedTemplate.price?.toLocaleString() : '۰'} تومان
                                                    </span>
                                                </div>

                                                <div className="pt-6">
                                                    <div className="flex items-center mb-4">
                                                        <div className="w-4 h-4 rounded-full bg-yellow-500 ml-3"></div>
                                                        <span className="font-medium text-gray-900">وضعیت: پیش‌نویس</span>
                                                    </div>

                                                    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
                                                        <p className="text-sm text-yellow-800">
                                                            ⓘ غذاها بعد از انتشار منو قابل اضافه کردن هستند.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* دکمه‌های عملی */}
                                            <div className="mt-8 space-y-4">
                                                <button
                                                    onClick={() => handleSaveMenu('draft')}
                                                    disabled={saving}
                                                    className="w-full py-4 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl hover:from-gray-700 hover:to-gray-800 disabled:opacity-50 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none flex items-center justify-center"
                                                >
                                                    {saving ? (
                                                        <>
                                                            <Loader2 className="w-5 h-5 ml-3 animate-spin" />
                                                            در حال ذخیره...
                                                        </>
                                                    ) : (
                                                        '💾 ذخیره پیش‌نویس'
                                                    )}
                                                </button>

                                                <button
                                                    onClick={() => handleSaveMenu('published')}
                                                    disabled={saving || !selectedTemplateId}
                                                    className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none flex items-center justify-center group"
                                                >
                                                    {saving ? (
                                                        <>
                                                            <Loader2 className="w-5 h-5 ml-3 animate-spin" />
                                                            در حال انتشار...
                                                        </>
                                                    ) : (
                                                        <>
                                                            🚀 ایجاد منو و ادامه
                                                            <ChevronRight className="w-5 h-5 mr-3 group-hover:translate-x-1 transition-transform" />
                                                        </>
                                                    )}
                                                </button>
                                            </div>

                                            <p className="text-center text-sm text-gray-500 mt-6">
                                                بعد از انتشار، به صفحه افزودن غذاها هدایت خواهید شد.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default MenuBuilder;