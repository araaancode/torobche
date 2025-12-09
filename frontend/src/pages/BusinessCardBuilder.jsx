import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { businessCardApi } from '../utils/businessCardsApi';
import { templateApi } from '../utils/templatesApi';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowLeft,
    Save,
    CheckCircle,
    Palette,
    Eye,
    Building,
    User,
    Phone,
    MapPin,
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
    List,
    QrCode,
    Link as LinkIcon,
    Globe,
    Mail,
    Smartphone,
    Briefcase
} from 'lucide-react';

const BusinessCardBuilder = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = !!id;

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [step, setStep] = useState(1); // 1: اطلاعات پایه، 2: تماس و آدرس، 3: انتخاب تمپلیت، 4: پیش‌نمایش

    const [templates, setTemplates] = useState([]);
    const [filteredTemplates, setFilteredTemplates] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [viewMode, setViewMode] = useState('grid');

    const [businessCard, setBusinessCard] = useState({
        title: '',
        description: '',
        ownerName: '',
        businessType: '',
        phone: '',
        address: '',
        email: '',
        website: '',
        socialLinks: {
            instagram: '',
            linkedin: '',
            twitter: '',
            telegram: ''
        },
        logo: '',
        coverImage: '',
        qrCode: '',
        template: null,
        shareableLink: '',
        userId: ''
    });

    const [selectedTemplateId, setSelectedTemplateId] = useState(null);
    const [errors, setErrors] = useState({});
    const [generatingQR, setGeneratingQR] = useState(false);

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

                // بارگذاری کارت تجاری در حالت ویرایش
                if (isEditing && id) {
                    const cardRes = await businessCardApi.getById(id);
                    if (cardRes && cardRes.success) {
                        const cardData = cardRes.data;
                        setBusinessCard({
                            title: cardData.title || '',
                            description: cardData.description || '',
                            ownerName: cardData.ownerName || '',
                            businessType: cardData.businessType || '',
                            phone: cardData.phone || '',
                            address: cardData.address || '',
                            email: cardData.email || '',
                            website: cardData.website || '',
                            socialLinks: cardData.socialLinks || {
                                instagram: '',
                                linkedin: '',
                                twitter: '',
                                telegram: ''
                            },
                            logo: cardData.logo ? `http://localhost:5000${cardData.logo}` : '',
                            coverImage: cardData.coverImage ? `http://localhost:5000${cardData.coverImage}` : '',
                            qrCode: cardData.qrCode ? `http://localhost:5000${cardData.qrCode}` : '',
                            template: cardData.template || null,
                            shareableLink: cardData.shareableLink || '',
                            userId: cardData.userId || ''
                        });

                        if (cardData.template) {
                            setSelectedTemplateId(cardData.template._id || cardData.template);
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

        if (searchTerm) {
            result = result.filter(template =>
                template?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                template?.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                template?.category?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

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
            if (!businessCard.title.trim()) newErrors.title = 'عنوان کارت الزامی است';
            if (!businessCard.ownerName.trim()) newErrors.ownerName = 'نام صاحب کسب‌وکار الزامی است';
            if (!businessCard.businessType.trim()) newErrors.businessType = 'نوع کسب‌وکار الزامی است';
        }

        if (stepNumber === 2) {
            if (!businessCard.phone.trim()) newErrors.phone = 'شماره تماس الزامی است';
            else if (!/^[0-9+\-\s()]+$/.test(businessCard.phone)) {
                newErrors.phone = 'شماره تماس معتبر نیست';
            }

            if (businessCard.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(businessCard.email)) {
                newErrors.email = 'ایمیل معتبر نیست';
            }
        }

        if (stepNumber === 3 && !selectedTemplateId) {
            newErrors.template = 'لطفا یک تمپلیت انتخاب کنید';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // رفتن به مرحله بعدی
    const handleNextStep = () => {
        if (!validateStep(step)) return;
        if (step < 4) setStep(step + 1);
    };

    // تولید کد QR
    const generateQRCode = async () => {
        if (!businessCard.shareableLink) {
            alert('ابتکارت تجاری را ذخیره کنید تا کد QR تولید شود');
            return;
        }

        setGeneratingQR(true);
        try {
            const response = await businessCardApi.generateQR(id || businessCard._id);
            if (response && response.success) {
                setBusinessCard(prev => ({
                    ...prev,
                    qrCode: response.data.qrCode
                }));
                alert('✅ کد QR با موفقیت ایجاد شد');
            }
        } catch (error) {
            console.error('خطا در تولید کد QR:', error);
            alert('❌ خطا در تولید کد QR');
        } finally {
            setGeneratingQR(false);
        }
    };

    // ذخیره کارت تجاری
    const handleSaveBusinessCard = async (status = 'draft') => {
        if (!validateStep(step)) return;

        setSaving(true);
        try {
            const cardData = {
                title: businessCard.title,
                description: businessCard.description,
                ownerName: businessCard.ownerName,
                businessType: businessCard.businessType,
                phone: businessCard.phone,
                address: businessCard.address,
                email: businessCard.email,
                website: businessCard.website,
                socialLinks: businessCard.socialLinks,
                logo: businessCard.logo.replace('http://localhost:5000', ''),
                coverImage: businessCard.coverImage.replace('http://localhost:5000', ''),
                template: selectedTemplateId,
                status: status
            };

            let response;
            if (isEditing) {
                response = await businessCardApi.update(id, cardData);
            } else {
                response = await businessCardApi.create(cardData);
            }

            if (response && response.success) {
                const message = status === 'published'
                    ? '🎉 کارت تجاری با موفقیت منتشر شد!'
                    : '✅ تغییرات ذخیره شد';

                alert(message);

                if (response.data && response.data._id) {
                    setBusinessCard(prev => ({
                        ...prev,
                        _id: response.data._id,
                        shareableLink: response.data.shareableLink
                    }));

                    if (status === 'published') {
                        navigate(`/business-cards/${response.data._id}`);
                    }
                }
            } else {
                alert('❌ خطا در ذخیره کارت تجاری');
            }
        } catch (error) {
            console.error('خطا در ذخیره کارت تجاری:', error);
            alert('❌ خطا در ذخیره کارت تجاری');
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
        setBusinessCard(prev => ({ ...prev, [field]: mockUrl }));
    };

    // به‌روزرسانی لینک‌های شبکه‌های اجتماعی
    const updateSocialLink = (platform, value) => {
        setBusinessCard(prev => ({
            ...prev,
            socialLinks: {
                ...prev.socialLinks,
                [platform]: value
            }
        }));
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
                            <Briefcase className="w-12 h-12 text-blue-600 animate-pulse" />
                        </div>
                    </div>
                    <p className="mt-6 text-gray-600 text-lg font-medium">
                        در حال آماده‌سازی ساخت کارت تجاری...
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
                            onClick={() => navigate('/business-cards')}
                            className="flex items-center text-gray-700 hover:text-gray-900 transition-colors group"
                        >
                            <ArrowLeft className="w-5 h-5 ml-2 group-hover:-translate-x-1 transition-transform" />
                            بازگشت به لیست
                        </button>

                        <div className="text-center">
                            <h1 className="text-2xl font-bold text-gray-900">
                                {isEditing ? '✏️ ویرایش کارت تجاری' : '✨ ساخت کارت تجاری جدید'}
                            </h1>
                            <p className="text-gray-600 text-sm mt-1">
                                مرحله {step} از ۴ • {
                                    step === 1 ? 'اطلاعات پایه' :
                                        step === 2 ? 'تماس و آدرس' :
                                            step === 3 ? 'انتخاب تمپلیت' :
                                                'پیش‌نمایش'
                                }
                            </p>
                        </div>

                        <button
                            onClick={() => handleSaveBusinessCard('draft')}
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
                                { number: 1, label: 'اطلاعات پایه', icon: User },
                                { number: 2, label: 'تماس و آدرس', icon: Phone },
                                { number: 3, label: 'انتخاب تمپلیت', icon: Palette },
                                { number: 4, label: 'پیش‌نمایش', icon: Eye }
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
                                animate={{ width: `${(step / 4) * 100}%` }}
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
                                    <User className="w-8 h-8 ml-3 text-blue-600" />
                                    اطلاعات اولیه کارت تجاری
                                </h2>
                                <p className="text-gray-600">
                                    اطلاعات اصلی کسب‌وکار خود را وارد کنید
                                </p>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {/* فرم اطلاعات */}
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-3 text-right">
                                            نام صاحب کسب‌وکار *
                                        </label>
                                        <input
                                            type="text"
                                            value={businessCard.ownerName}
                                            onChange={(e) => setBusinessCard(prev => ({ ...prev, ownerName: e.target.value }))}
                                            className={`w-full px-5 py-4 border-2 rounded-xl focus:ring-2 transition-all duration-300 text-right text-lg placeholder-gray-400
                        ${errors.ownerName ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-blue-500 focus:ring-blue-200'}
                      `}
                                            placeholder="مثال: علی محمدی"
                                            dir="rtl"
                                        />
                                        {errors.ownerName && (
                                            <p className="mt-2 text-sm text-red-600">{errors.ownerName}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-3 text-right">
                                            عنوان کارت تجاری *
                                        </label>
                                        <input
                                            type="text"
                                            value={businessCard.title}
                                            onChange={(e) => setBusinessCard(prev => ({ ...prev, title: e.target.value }))}
                                            className={`w-full px-5 py-4 border-2 rounded-xl focus:ring-2 transition-all duration-300 text-right text-lg placeholder-gray-400
                        ${errors.title ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-blue-500 focus:ring-blue-200'}
                      `}
                                            placeholder="مثال: کارت تجاری شرکت فناوری"
                                            dir="rtl"
                                        />
                                        {errors.title && (
                                            <p className="mt-2 text-sm text-red-600">{errors.title}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-3 text-right">
                                            نوع کسب‌وکار *
                                        </label>
                                        <select
                                            value={businessCard.businessType}
                                            onChange={(e) => setBusinessCard(prev => ({ ...prev, businessType: e.target.value }))}
                                            className={`w-full px-5 py-4 border-2 rounded-xl focus:ring-2 transition-all duration-300 text-right text-lg
                        ${errors.businessType ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-blue-500 focus:ring-blue-200'}
                      `}
                                            dir="rtl"
                                        >
                                            <option value="">انتخاب کنید...</option>
                                            <option value="تجاری">تجاری</option>
                                            <option value="خدماتی">خدماتی</option>
                                            <option value="فروشگاهی">فروشگاهی</option>
                                            <option value="پزشکی">پزشکی</option>
                                            <option value="مهندسی">مهندسی</option>
                                            <option value="آموزشی">آموزشی</option>
                                            <option value="طراحی">طراحی</option>
                                            <option value="مشاوره">مشاوره</option>
                                            <option value="سایر">سایر</option>
                                        </select>
                                        {errors.businessType && (
                                            <p className="mt-2 text-sm text-red-600">{errors.businessType}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-3 text-right">
                                            توضیحات (اختیاری)
                                        </label>
                                        <textarea
                                            value={businessCard.description}
                                            onChange={(e) => setBusinessCard(prev => ({ ...prev, description: e.target.value }))}
                                            className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 text-right placeholder-gray-400 resize-none"
                                            placeholder="توضیحی درباره کسب‌وکار خود بنویسید..."
                                            rows={4}
                                            dir="rtl"
                                        />
                                    </div>
                                </div>

                                {/* آپلود لوگو */}
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-3 text-right">
                                            لوگو کسب‌وکار
                                        </label>
                                        <div className="relative border-3 border-dashed border-gray-200 rounded-2xl p-8 text-center hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 cursor-pointer">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => handleFileUpload(e, 'logo')}
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                            />
                                            <div className="w-48 h-48 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden">
                                                {businessCard.logo ? (
                                                    <img src={businessCard.logo} alt="لوگو" className="w-full h-full object-contain p-4" />
                                                ) : (
                                                    <Building className="w-16 h-16 text-gray-400" />
                                                )}
                                            </div>
                                            <p className="text-gray-600 mb-2">
                                                {businessCard.logo ? 'تغییر لوگو' : 'آپلود لوگو'}
                                            </p>
                                            <p className="text-sm text-gray-500">PNG, JPG, SVG • حداکثر ۲ مگابایت</p>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-3 text-right">
                                            تصویر زمینه
                                        </label>
                                        <div className="relative border-3 border-dashed border-gray-200 rounded-2xl p-8 text-center hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 cursor-pointer">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => handleFileUpload(e, 'coverImage')}
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                            />
                                            <div className="w-full h-40 mx-auto mb-6 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden">
                                                {businessCard.coverImage ? (
                                                    <img src={businessCard.coverImage} alt="تصویر زمینه" className="w-full h-full object-cover" />
                                                ) : (
                                                    <Upload className="w-12 h-12 text-gray-400" />
                                                )}
                                            </div>
                                            <p className="text-gray-600 mb-2">
                                                {businessCard.coverImage ? 'تغییر تصویر' : 'آپلود تصویر زمینه'}
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
                                    ادامه به اطلاعات تماس
                                    <ChevronRight className="w-5 h-5 mr-3 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* Step 2: Contact Information */}
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
                                    <Phone className="w-8 h-8 ml-3 text-green-600" />
                                    اطلاعات تماس و ارتباطی
                                </h2>
                                <p className="text-gray-600">
                                    راه‌های ارتباطی خود را برای مشتریان وارد کنید
                                </p>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {/* اطلاعات تماس اصلی */}
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-3 text-right">
                                            شماره تماس *
                                        </label>
                                        <input
                                            type="tel"
                                            value={businessCard.phone}
                                            onChange={(e) => setBusinessCard(prev => ({ ...prev, phone: e.target.value }))}
                                            className={`w-full px-5 py-4 border-2 rounded-xl focus:ring-2 transition-all duration-300 text-right text-lg placeholder-gray-400
                        ${errors.phone ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-green-500 focus:ring-green-200'}
                      `}
                                            placeholder="مثال: ۰۹۱۲۳۴۵۶۷۸۹"
                                            dir="rtl"
                                        />
                                        {errors.phone && (
                                            <p className="mt-2 text-sm text-red-600">{errors.phone}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-3 text-right">
                                            آدرس ایمیل (اختیاری)
                                        </label>
                                        <input
                                            type="email"
                                            value={businessCard.email}
                                            onChange={(e) => setBusinessCard(prev => ({ ...prev, email: e.target.value }))}
                                            className={`w-full px-5 py-4 border-2 rounded-xl focus:ring-2 transition-all duration-300 text-right text-lg placeholder-gray-400
                        ${errors.email ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-green-500 focus:ring-green-200'}
                      `}
                                            placeholder="مثال: info@example.com"
                                            dir="rtl"
                                        />
                                        {errors.email && (
                                            <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-3 text-right">
                                            آدرس وبسایت (اختیاری)
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="url"
                                                value={businessCard.website}
                                                onChange={(e) => setBusinessCard(prev => ({ ...prev, website: e.target.value }))}
                                                className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300 text-right text-lg placeholder-gray-400 pr-12"
                                                placeholder="مثال: https://example.com"
                                                dir="rtl"
                                            />
                                            <Globe className="absolute right-4 top-4 w-5 h-5 text-gray-400" />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-3 text-right">
                                            آدرس فیزیکی (اختیاری)
                                        </label>
                                        <div className="relative">
                                            <textarea
                                                value={businessCard.address}
                                                onChange={(e) => setBusinessCard(prev => ({ ...prev, address: e.target.value }))}
                                                className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300 text-right placeholder-gray-400 resize-none pr-12"
                                                placeholder="آدرس کامل کسب‌وکار خود را وارد کنید..."
                                                rows={3}
                                                dir="rtl"
                                            />
                                            <MapPin className="absolute right-4 top-4 w-5 h-5 text-gray-400" />
                                        </div>
                                    </div>
                                </div>

                                {/* شبکه‌های اجتماعی */}
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                                            <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-2 rounded-lg ml-3">
                                                🔗
                                            </span>
                                            شبکه‌های اجتماعی
                                        </h3>

                                        {Object.entries({
                                            instagram: { label: 'اینستاگرام', icon: '📸', prefix: 'https://instagram.com/' },
                                            linkedin: { label: 'لینکدین', icon: '💼', prefix: 'https://linkedin.com/in/' },
                                            twitter: { label: 'توییتر', icon: '🐦', prefix: 'https://twitter.com/' },
                                            telegram: { label: 'تلگرام', icon: '✈️', prefix: 'https://t.me/' }
                                        }).map(([platform, { label, icon, prefix }]) => (
                                            <div key={platform} className="mb-4">
                                                <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                                                    <span className="ml-2">{icon}</span>
                                                    {label}
                                                </label>
                                                <div className="relative">
                                                    <input
                                                        type="text"
                                                        value={businessCard.socialLinks[platform]}
                                                        onChange={(e) => updateSocialLink(platform, e.target.value)}
                                                        className="w-full px-5 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300 text-right pr-12"
                                                        placeholder={`آیدی ${label}`}
                                                        dir="rtl"
                                                    />
                                                    <div className="absolute left-3 top-3 px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded-md">
                                                        {prefix}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
                                        <h4 className="font-bold text-gray-900 mb-3">💡 نکته</h4>
                                        <p className="text-gray-600 text-sm">
                                            لینک شبکه‌های اجتماعی به صورت خودکار تکمیل می‌شوند. فقط آیدی خود را وارد کنید.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* دکمه‌های ناوبری */}
                            <div className="mt-10 pt-8 border-t border-gray-100 flex justify-between">
                                <button
                                    onClick={() => setStep(1)}
                                    className="px-6 py-3.5 border-2 border-gray-200 rounded-xl text-gray-700 hover:border-gray-300 hover:bg-gray-50 transition-all duration-300 font-medium flex items-center group"
                                >
                                    <ChevronLeft className="w-5 h-5 mr-3 group-hover:-translate-x-1 transition-transform" />
                                    بازگشت
                                </button>
                                <button
                                    onClick={handleNextStep}
                                    className="px-8 py-3.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center group"
                                >
                                    ادامه به انتخاب تمپلیت
                                    <ChevronRight className="w-5 h-5 mr-3 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* Step 3: Template Selection */}
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
                                    <Palette className="w-8 h-8 ml-3 text-purple-600" />
                                    انتخاب قالب طراحی
                                </h2>
                                <p className="text-gray-600">
                                    قالب دلخواه خود را برای کارت تجاری انتخاب کنید
                                </p>
                            </div>

                            {/* فیلتر و جستجو */}
                            <div className="mb-8 bg-gray-50 rounded-2xl p-6">
                                <div className="flex flex-col md:flex-row md:items-center gap-4">
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

                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => setViewMode('grid')}
                                            className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-purple-100 text-purple-600' : 'text-gray-400 hover:text-gray-600'
                                                }`}
                                        >
                                            <Grid className="w-5 h-5" />
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
                                            <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                                                <img
                                                    src={template.image}
                                                    alt={template.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                />

                                                {isSelected && (
                                                    <div className="absolute top-4 left-4 w-10 h-10 bg-purple-500 text-white rounded-full flex items-center justify-center shadow-lg">
                                                        <CheckCircle className="w-5 h-5" />
                                                    </div>
                                                )}

                                                <div className="absolute top-4 right-4">
                                                    <span className="bg-gray-900/70 text-white px-3 py-1 rounded-full text-sm">
                                                        {template.category}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="p-6">
                                                <h3 className="font-bold text-gray-900 text-xl mb-3">{template.title}</h3>
                                                <p className="text-gray-600 mb-4">{template.description}</p>

                                                {template.features?.length > 0 && (
                                                    <div className="mb-4">
                                                        <ul className="space-y-2">
                                                            {template.features.slice(0, 3).map((feature, idx) => (
                                                                <li key={idx} className="flex items-center text-sm text-gray-600">
                                                                    <CheckCircle className="w-4 h-4 text-green-500 ml-2 flex-shrink-0" />
                                                                    {feature}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}

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
                                            : 'هنوز تمپلیتی وجود ندارد.'}
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
                                    onClick={() => setStep(2)}
                                    className="px-6 py-3.5 border-2 border-gray-200 rounded-xl text-gray-700 hover:border-gray-300 hover:bg-gray-50 transition-all duration-300 font-medium flex items-center group"
                                >
                                    <ChevronLeft className="w-5 h-5 mr-3 group-hover:-translate-x-1 transition-transform" />
                                    بازگشت
                                </button>
                                <div className="flex space-x-4">
                                    <button
                                        onClick={() => handleSaveBusinessCard('draft')}
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

                    {/* Step 4: Preview */}
                    {step === 4 && (
                        <motion.div
                            key="step4"
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
                                    قبل از انتشار، کارت تجاری خود را بررسی کنید
                                </p>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                {/* پیش‌نمایش کارت تجاری */}
                                <div className="lg:col-span-2">
                                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100 shadow-lg">
                                        {/* شبیه‌سازی کارت تجاری */}
                                        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200 max-w-2xl mx-auto">
                                            {/* هدر */}
                                            <div className="relative h-48 bg-gradient-to-r from-blue-600 to-purple-600">
                                                {businessCard.coverImage && (
                                                    <img
                                                        src={businessCard.coverImage}
                                                        alt="تصویر زمینه"
                                                        className="w-full h-full object-cover opacity-80"
                                                    />
                                                )}
                                                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/70 to-purple-600/70"></div>

                                                {/* لوگو */}
                                                {businessCard.logo && (
                                                    <div className="absolute -bottom-12 right-8 w-24 h-24 bg-white rounded-2xl p-3 shadow-2xl">
                                                        <img
                                                            src={businessCard.logo}
                                                            alt="لوگو"
                                                            className="w-full h-full object-contain"
                                                        />
                                                    </div>
                                                )}
                                            </div>

                                            {/* محتوای کارت */}
                                            <div className="p-8 pt-16">
                                                <div className="mb-6">
                                                    <h3 className="text-3xl font-bold text-gray-900">{businessCard.ownerName}</h3>
                                                    <p className="text-xl text-blue-600 font-medium mt-2">{businessCard.title}</p>
                                                    <p className="text-gray-500 mt-1">{businessCard.businessType}</p>
                                                </div>

                                                {businessCard.description && (
                                                    <div className="mb-6 p-4 bg-gray-50 rounded-xl">
                                                        <p className="text-gray-600">{businessCard.description}</p>
                                                    </div>
                                                )}

                                                {/* اطلاعات تماس */}
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                                    {businessCard.phone && (
                                                        <div className="flex items-center">
                                                            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center ml-4">
                                                                <Phone className="w-6 h-6 text-green-600" />
                                                            </div>
                                                            <div>
                                                                <p className="text-sm text-gray-500">تلفن</p>
                                                                <p className="font-medium text-gray-900">{businessCard.phone}</p>
                                                            </div>
                                                        </div>
                                                    )}

                                                    {businessCard.email && (
                                                        <div className="flex items-center">
                                                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center ml-4">
                                                                <Mail className="w-6 h-6 text-blue-600" />
                                                            </div>
                                                            <div>
                                                                <p className="text-sm text-gray-500">ایمیل</p>
                                                                <p className="font-medium text-gray-900">{businessCard.email}</p>
                                                            </div>
                                                        </div>
                                                    )}

                                                    {businessCard.address && (
                                                        <div className="flex items-center">
                                                            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center ml-4">
                                                                <MapPin className="w-6 h-6 text-purple-600" />
                                                            </div>
                                                            <div>
                                                                <p className="text-sm text-gray-500">آدرس</p>
                                                                <p className="font-medium text-gray-900">{businessCard.address}</p>
                                                            </div>
                                                        </div>
                                                    )}

                                                    {businessCard.website && (
                                                        <div className="flex items-center">
                                                            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center ml-4">
                                                                <Globe className="w-6 h-6 text-orange-600" />
                                                            </div>
                                                            <div>
                                                                <p className="text-sm text-gray-500">وبسایت</p>
                                                                <a href={businessCard.website} className="font-medium text-blue-600 hover:underline">
                                                                    {businessCard.website.replace('https://', '')}
                                                                </a>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* شبکه‌های اجتماعی */}
                                                {Object.values(businessCard.socialLinks).some(link => link) && (
                                                    <div className="border-t border-gray-100 pt-6">
                                                        <h4 className="font-bold text-gray-900 mb-4">شبکه‌های اجتماعی</h4>
                                                        <div className="flex flex-wrap gap-3">
                                                            {Object.entries(businessCard.socialLinks).map(([platform, link]) => (
                                                                link && (
                                                                    <a
                                                                        key={platform}
                                                                        href={`https://${platform}.com/${link}`}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 font-medium transition-colors"
                                                                    >
                                                                        {platform === 'instagram' ? 'اینستاگرام' :
                                                                            platform === 'linkedin' ? 'لینکدین' :
                                                                                platform === 'twitter' ? 'توییتر' :
                                                                                    'تلگرام'}
                                                                    </a>
                                                                )
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            {/* کد QR */}
                                            {businessCard.qrCode && (
                                                <div className="border-t border-gray-100 p-6">
                                                    <div className="flex items-center justify-center">
                                                        <div className="text-center">
                                                            <div className="w-32 h-32 mx-auto mb-4 p-4 bg-white border border-gray-200 rounded-xl">
                                                                <img
                                                                    src={businessCard.qrCode}
                                                                    alt="کد QR"
                                                                    className="w-full h-full object-contain"
                                                                />
                                                            </div>
                                                            <p className="text-sm text-gray-500">
                                                                اسکن کنید برای ذخیره اطلاعات
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* اطلاعات تمپلیت */}
                                        {selectedTemplate && (
                                            <div className="mt-8 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200">
                                                <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                                                    <Palette className="w-6 h-6 ml-2 text-purple-600" />
                                                    قالب طراحی انتخاب شده
                                                </h4>
                                                <div className="flex items-center">
                                                    <div className="w-20 h-20 rounded-xl overflow-hidden ml-4 flex-shrink-0">
                                                        <img
                                                            src={selectedTemplate.image}
                                                            alt={selectedTemplate.title}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                    <div>
                                                        <h5 className="font-bold text-gray-900">{selectedTemplate.title}</h5>
                                                        <p className="text-gray-600 text-sm">{selectedTemplate.description}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* خلاصه و دکمه‌ها */}
                                <div>
                                    <div className="sticky top-8">
                                        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 border border-gray-200 shadow-lg">
                                            <h4 className="text-2xl font-bold text-gray-900 mb-6">خلاصه</h4>

                                            <div className="space-y-6">
                                                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                                                    <span className="text-gray-600">قالب:</span>
                                                    <span className="font-bold text-gray-900">
                                                        {selectedTemplate ? selectedTemplate.title : 'انتخاب نشده'}
                                                    </span>
                                                </div>

                                                <div className="pt-4">
                                                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                                                        <p className="text-sm text-blue-800">
                                                            ⓘ بعد از انتشار، می‌توانید کارت تجاری را به اشتراک بگذارید و کد QR ایجاد کنید.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* دکمه‌های عملی */}
                                            <div className="mt-8 space-y-4">
                                                <button
                                                    onClick={() => handleSaveBusinessCard('draft')}
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
                                                    onClick={() => handleSaveBusinessCard('published')}
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
                                                            🚀 انتشار کارت تجاری
                                                        </>
                                                    )}
                                                </button>

                                                {isEditing && businessCard._id && (
                                                    <button
                                                        onClick={generateQRCode}
                                                        disabled={generatingQR}
                                                        className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center"
                                                    >
                                                        {generatingQR ? (
                                                            <>
                                                                <Loader2 className="w-5 h-5 ml-3 animate-spin" />
                                                                در حال تولید...
                                                            </>
                                                        ) : (
                                                            <>
                                                                <QrCode className="w-5 h-5 ml-3" />
                                                                تولید کد QR
                                                            </>
                                                        )}
                                                    </button>
                                                )}

                                                {businessCard.shareableLink && (
                                                    <button
                                                        onClick={() => navigator.clipboard.writeText(businessCard.shareableLink)}
                                                        className="w-full py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center"
                                                    >
                                                        <LinkIcon className="w-5 h-5 ml-3" />
                                                        کپی لینک اشتراک‌گذاری
                                                    </button>
                                                )}
                                            </div>
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

export default BusinessCardBuilder;