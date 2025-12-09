import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowLeft,
    Save,
    CheckCircle,
    Palette,
    Eye,
    User,
    Mail,
    Phone,
    MapPin,
    Stethoscope,
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
    Building,
    Award,
    DollarSign,
    Star,
    Image as ImageIcon
} from 'lucide-react';

// ایمپورت API
import { visitCardApi, templateApi } from '../utils/visitCardsApi';

const VisitCardBuilder = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = !!id;

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [step, setStep] = useState(1);

    const [templates, setTemplates] = useState([]);
    const [filteredTemplates, setFilteredTemplates] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [viewMode, setViewMode] = useState('grid');

    const [visitCard, setVisitCard] = useState({
        title: '',
        bussinessName: '',
        description: '',
        icon: null,
        coverImage: null,
        qrcode: '',
        template: [],
        specialities: [],
        doctorName: '',
        medicalDegree: '',
        specialty: '',
        subSpecialty: '',
        medicalCouncilNumber: '',
        phone: '',
        email: '',
        website: '',
        address: '',
        clinicName: '',
        clinicPhone: '',
        status: 'draft'
    });

    const [selectedTemplateId, setSelectedTemplateId] = useState(null);
    const [errors, setErrors] = useState({});
    const [newSpeciality, setNewSpeciality] = useState('');
    const [iconFile, setIconFile] = useState(null);
    const [coverImageFile, setCoverImageFile] = useState(null);
    const [imagePreviews, setImagePreviews] = useState({
        icon: null,
        coverImage: null
    });

    // بارگذاری داده‌ها
    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);

                // بارگذاری تمپلیت‌ها
                const templatesRes = await templateApi.getAll();
                console.log('تمپلیت‌های دریافت شده:', templatesRes);

                if (templatesRes && templatesRes.success) {
                    const templatesData = templatesRes.data || [];
                    setTemplates(templatesData);
                    setFilteredTemplates(templatesData);
                }

                // بارگذاری کارت ویزیت در حالت ویرایش
                if (isEditing && id) {
                    console.log('در حال بارگذاری کارت ویزیت برای ویرایش:', id);
                    const visitCardRes = await visitCardApi.getById(id);
                    console.log('کارت ویزیت دریافت شده:', visitCardRes);

                    if (visitCardRes && visitCardRes.success) {
                        const data = visitCardRes.data;
                        setVisitCard({
                            title: data.title || '',
                            bussinessName: data.bussinessName || '',
                            description: data.description || '',
                            icon: data.icon || null,
                            coverImage: data.coverImage || null,
                            qrcode: data.qrcode || '',
                            template: data.template || [],
                            specialities: data.specialities || [],
                            doctorName: data.doctorName || '',
                            medicalDegree: data.medicalDegree || '',
                            specialty: data.specialty || '',
                            subSpecialty: data.subSpecialty || '',
                            medicalCouncilNumber: data.medicalCouncilNumber || '',
                            phone: data.phone || '',
                            email: data.email || '',
                            website: data.website || '',
                            address: data.address || '',
                            clinicName: data.clinicName || '',
                            clinicPhone: data.clinicPhone || '',
                            status: data.status || 'draft'
                        });

                        // تنظیم پیش‌نمایش تصاویر
                        if (data.icon) {
                            setImagePreviews(prev => ({ ...prev, icon: data.icon }));
                        }
                        if (data.coverImage) {
                            setImagePreviews(prev => ({ ...prev, coverImage: data.coverImage }));
                        }

                        // تنظیم تمپلیت انتخاب شده
                        if (data.template && data.template.length > 0) {
                            const firstTemplate = data.template[0];
                            const templateId = firstTemplate._id || firstTemplate;
                            console.log('تمپلیت انتخاب شده:', templateId);
                            setSelectedTemplateId(templateId);
                        }
                    } else {
                        alert(visitCardRes?.message || 'کارت ویزیت یافت نشد');
                        navigate('/visit-cards');
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
    }, [id, isEditing, navigate]);

    // فیلتر تمپلیت‌ها
    useEffect(() => {
        let result = templates;

        if (searchTerm) {
            result = result.filter(template =>
                template?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                template?.description?.toLowerCase().includes(searchTerm.toLowerCase())
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
            if (!visitCard.doctorName.trim()) newErrors.doctorName = 'نام پزشک الزامی است';
            if (!visitCard.medicalDegree.trim()) newErrors.medicalDegree = 'مدرک پزشکی الزامی است';
            if (!visitCard.specialty.trim()) newErrors.specialty = 'تخصص الزامی است';
            if (!visitCard.phone.trim()) newErrors.phone = 'تلفن تماس الزامی است';
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

    // آپلود فایل
    const handleFileUpload = async (e, field) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // بررسی حجم فایل (حداکثر 5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert('حجم فایل نباید بیشتر از 5 مگابایت باشد');
            return;
        }

        // بررسی نوع فایل
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
        if (!allowedTypes.includes(file.type)) {
            alert('فقط فایل‌های تصویر (JPEG, JPG, PNG, WebP) مجاز هستند');
            return;
        }

        const mockUrl = URL.createObjectURL(file);

        if (field === 'icon') {
            setVisitCard(prev => ({ ...prev, icon: mockUrl }));
            setImagePreviews(prev => ({ ...prev, icon: mockUrl }));
            setIconFile(file);
        } else if (field === 'coverImage') {
            setVisitCard(prev => ({ ...prev, coverImage: mockUrl }));
            setImagePreviews(prev => ({ ...prev, coverImage: mockUrl }));
            setCoverImageFile(file);
        }
    };

    // اضافه کردن تخصص
    const addSpeciality = () => {
        if (newSpeciality.trim()) {
            setVisitCard(prev => ({
                ...prev,
                specialities: [...prev.specialities, newSpeciality.trim()]
            }));
            setNewSpeciality('');
        }
    };

    // حذف تخصص
    const removeSpeciality = (index) => {
        setVisitCard(prev => ({
            ...prev,
            specialities: prev.specialities.filter((_, i) => i !== index)
        }));
    };

    // ذخیره کارت ویزیت
    const handleSaveVisitCard = async (status = 'draft') => {
        if (!validateStep(step)) return;

        setSaving(true);
        try {
            // آماده کردن داده‌ها
            const visitCardData = {
                title: visitCard.title || `${visitCard.doctorName} - ${visitCard.specialty}`,
                bussinessName: visitCard.bussinessName || visitCard.clinicName || visitCard.doctorName,
                description: visitCard.description || '',
                specialities: visitCard.specialities,
                template: selectedTemplateId ? [selectedTemplateId] : [],
                doctorName: visitCard.doctorName,
                medicalDegree: visitCard.medicalDegree,
                specialty: visitCard.specialty,
                subSpecialty: visitCard.subSpecialty || '',
                medicalCouncilNumber: visitCard.medicalCouncilNumber || '',
                phone: visitCard.phone,
                email: visitCard.email || '',
                website: visitCard.website || '',
                address: visitCard.address || '',
                clinicName: visitCard.clinicName || '',
                clinicPhone: visitCard.clinicPhone || '',
                status: status
            };

            console.log('داده‌های ارسالی:', visitCardData);

            // اضافه کردن فایل‌ها
            if (iconFile) {
                visitCardData.icon = iconFile;
            }

            if (coverImageFile) {
                visitCardData.coverImage = coverImageFile;
            }

            let response;
            if (isEditing) {
                console.log('در حال به‌روزرسانی کارت ویزیت:', id);
                response = await visitCardApi.update(id, visitCardData);
            } else {
                console.log('در حال ایجاد کارت ویزیت جدید');
                response = await visitCardApi.create(visitCardData);
            }

            console.log('پاسخ از سرور:', response);

            if (response && response.success) {
                const message = status === 'published'
                    ? '🎉 کارت ویزیت با موفقیت ایجاد و منتشر شد!'
                    : '✅ کارت ویزیت با موفقیت ذخیره شد';

                alert(message);

                // اگر منتشر شده، به صفحه نمایش هدایت شود
                if (status === 'published') {
                    navigate(`/visit-cards/${response.data._id}/view`);
                } else {
                    // اگر در حالت ویرایش بودیم، در همان صفحه بمانیم
                    if (!isEditing) {
                        navigate(`/visit-cards/${response.data._id}/edit`);
                    } else {
                        // رفرش صفحه
                        window.location.reload();
                    }
                }
            } else {
                alert(response?.message || '❌ خطا در ذخیره کارت ویزیت');
            }
        } catch (error) {
            console.error('خطا در ذخیره کارت ویزیت:', error);
            alert('❌ خطا در ارتباط با سرور');
        } finally {
            setSaving(false);
        }
    };

    // گرفتن دسته‌بندی‌های منحصربه‌فرد
    const getUniqueCategories = () => {
        const categories = ['all', ...new Set(templates.map(t => t.category).filter(Boolean))];
        return categories;
    };

    // تمپلیت انتخاب شده
    const selectedTemplate = templates.find(t => t._id === selectedTemplateId);

    // تابع برای فرمت کردن قیمت
    const formatPrice = (price) => {
        return new Intl.NumberFormat('fa-IR').format(price) + ' تومان';
    };

    // تابع برای دریافت URL کامل تصویر
    const getImageUrl = (imagePath) => {
        if (!imagePath) return null;
        if (imagePath.startsWith('http')) return imagePath;
        return `http://localhost:5000/${imagePath}`;
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="relative">
                        <div className="w-24 h-24 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Stethoscope className="w-12 h-12 text-teal-600 animate-pulse" />
                        </div>
                    </div>
                    <p className="mt-6 text-gray-600 text-lg font-medium">
                        در حال آماده‌سازی کارت ویزیت پزشکی...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
            {/* Header */}
            <motion.header
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <button
                            onClick={() => navigate('/visit-cards')}
                            className="flex items-center text-gray-700 hover:text-gray-900 transition-colors group"
                        >
                            <ArrowLeft className="w-5 h-5 ml-2 group-hover:-translate-x-1 transition-transform" />
                            بازگشت به لیست
                        </button>

                        <div className="text-center">
                            <h1 className="text-2xl font-bold text-gray-900 flex items-center justify-center">
                                <Stethoscope className="w-6 h-6 ml-2 text-teal-600" />
                                {isEditing ? '✏️ ویرایش کارت ویزیت پزشکی' : '✨ ساخت کارت ویزیت پزشکی'}
                            </h1>
                            <p className="text-gray-600 text-sm mt-1">
                                مرحله {step} از ۳ • {step === 1 ? 'اطلاعات پزشک' : step === 2 ? 'انتخاب تمپلیت' : 'پیش‌نمایش'}
                            </p>
                        </div>

                        <button
                            onClick={() => handleSaveVisitCard('draft')}
                            disabled={saving}
                            className="px-4 py-2 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-lg hover:from-teal-700 hover:to-teal-800 disabled:opacity-50 transition-all duration-300 flex items-center"
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
                                { number: 1, label: 'اطلاعات پزشک', icon: User },
                                { number: 2, label: 'انتخاب تمپلیت', icon: Palette },
                                { number: 3, label: 'پیش‌نمایش', icon: Eye }
                            ].map((stepItem) => (
                                <div key={stepItem.number} className="flex flex-col items-center">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 transition-all duration-300
                    ${step > stepItem.number ? 'bg-green-500 text-white shadow-md' :
                                            step === stepItem.number ? 'bg-teal-600 text-white shadow-lg scale-110' :
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
                                className="h-full bg-gradient-to-r from-teal-600 to-teal-700 rounded-full"
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
                    {/* Step 1: Doctor Information */}
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
                                    <User className="w-8 h-8 ml-3 text-teal-600" />
                                    اطلاعات پزشک
                                </h2>
                                <p className="text-gray-600">
                                    اطلاعات هویتی و تخصصی خود را وارد کنید
                                </p>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {/* ستون اول */}
                                <div className="space-y-6">
                                    {/* اطلاعات شخصی */}
                                    <div className="bg-blue-50 rounded-2xl p-6">
                                        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                                            <User className="w-5 h-5 ml-2" />
                                            اطلاعات هویتی
                                        </h3>

                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    نام و نام خانوادگی پزشک *
                                                </label>
                                                <input
                                                    type="text"
                                                    value={visitCard.doctorName}
                                                    onChange={(e) => setVisitCard(prev => ({ ...prev, doctorName: e.target.value }))}
                                                    className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 transition-all duration-300 text-right
                                                        ${errors.doctorName ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-teal-500 focus:ring-teal-200'}
                                                    `}
                                                    placeholder="دکتر ..."
                                                    dir="rtl"
                                                />
                                                {errors.doctorName && (
                                                    <p className="mt-1 text-sm text-red-600">{errors.doctorName}</p>
                                                )}
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    مدرک پزشکی *
                                                </label>
                                                <input
                                                    type="text"
                                                    value={visitCard.medicalDegree}
                                                    onChange={(e) => setVisitCard(prev => ({ ...prev, medicalDegree: e.target.value }))}
                                                    className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 transition-all duration-300 text-right
                                                        ${errors.medicalDegree ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-teal-500 focus:ring-teal-200'}
                                                    `}
                                                    placeholder="مثال: متخصص قلب و عروق"
                                                    dir="rtl"
                                                />
                                                {errors.medicalDegree && (
                                                    <p className="mt-1 text-sm text-red-600">{errors.medicalDegree}</p>
                                                )}
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        تخصص اصلی *
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={visitCard.specialty}
                                                        onChange={(e) => setVisitCard(prev => ({ ...prev, specialty: e.target.value }))}
                                                        className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 transition-all duration-300 text-right
                                                            ${errors.specialty ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-teal-500 focus:ring-teal-200'}
                                                        `}
                                                        placeholder="تخصص"
                                                        dir="rtl"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        فوق تخصص
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={visitCard.subSpecialty}
                                                        onChange={(e) => setVisitCard(prev => ({ ...prev, subSpecialty: e.target.value }))}
                                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all duration-300 text-right"
                                                        placeholder="فوق تخصص"
                                                        dir="rtl"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    شماره نظام پزشکی
                                                </label>
                                                <input
                                                    type="text"
                                                    value={visitCard.medicalCouncilNumber}
                                                    onChange={(e) => setVisitCard(prev => ({ ...prev, medicalCouncilNumber: e.target.value }))}
                                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all duration-300 text-right"
                                                    placeholder="مثال: ۱۲۳۴۵۶"
                                                    dir="rtl"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* اطلاعات تماس */}
                                    <div className="bg-green-50 rounded-2xl p-6">
                                        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                                            <Phone className="w-5 h-5 ml-2" />
                                            اطلاعات تماس
                                        </h3>

                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    تلفن همراه *
                                                </label>
                                                <input
                                                    type="tel"
                                                    value={visitCard.phone}
                                                    onChange={(e) => setVisitCard(prev => ({ ...prev, phone: e.target.value }))}
                                                    className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 transition-all duration-300 text-right
                                                        ${errors.phone ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-teal-500 focus:ring-teal-200'}
                                                    `}
                                                    placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                                                    dir="rtl"
                                                />
                                                {errors.phone && (
                                                    <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                                                )}
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    ایمیل
                                                </label>
                                                <input
                                                    type="email"
                                                    value={visitCard.email}
                                                    onChange={(e) => setVisitCard(prev => ({ ...prev, email: e.target.value }))}
                                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all duration-300 text-right"
                                                    placeholder="example@domain.com"
                                                    dir="rtl"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    وبسایت
                                                </label>
                                                <input
                                                    type="url"
                                                    value={visitCard.website}
                                                    onChange={(e) => setVisitCard(prev => ({ ...prev, website: e.target.value }))}
                                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all duration-300 text-right"
                                                    placeholder="https://example.com"
                                                    dir="rtl"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* ستون دوم */}
                                <div className="space-y-6">
                                    {/* اطلاعات مطب/کلینیک */}
                                    <div className="bg-purple-50 rounded-2xl p-6">
                                        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                                            <MapPin className="w-5 h-5 ml-2" />
                                            اطلاعات مطب/کلینیک
                                        </h3>

                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    نام مرکز درمانی
                                                </label>
                                                <input
                                                    type="text"
                                                    value={visitCard.clinicName}
                                                    onChange={(e) => setVisitCard(prev => ({ ...prev, clinicName: e.target.value }))}
                                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all duration-300 text-right"
                                                    placeholder="مثال: کلینیک تخصصی قلب"
                                                    dir="rtl"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    آدرس
                                                </label>
                                                <textarea
                                                    value={visitCard.address}
                                                    onChange={(e) => setVisitCard(prev => ({ ...prev, address: e.target.value }))}
                                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all duration-300 text-right resize-none"
                                                    placeholder="آدرس کامل مطب"
                                                    rows={3}
                                                    dir="rtl"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    تلفن مطب
                                                </label>
                                                <input
                                                    type="tel"
                                                    value={visitCard.clinicPhone}
                                                    onChange={(e) => setVisitCard(prev => ({ ...prev, clinicPhone: e.target.value }))}
                                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all duration-300 text-right"
                                                    placeholder="۰۲۱۱۲۳۴۵۶۷۸"
                                                    dir="rtl"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* تخصص‌ها */}
                                    <div className="bg-yellow-50 rounded-2xl p-6">
                                        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                                            <Award className="w-5 h-5 ml-2" />
                                            تخصص‌ها
                                        </h3>

                                        <div className="space-y-4">
                                            <div>
                                                <div className="flex gap-2 mb-3">
                                                    <input
                                                        type="text"
                                                        value={newSpeciality}
                                                        onChange={(e) => setNewSpeciality(e.target.value)}
                                                        onKeyPress={(e) => e.key === 'Enter' && addSpeciality()}
                                                        className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all duration-300 text-right"
                                                        placeholder="اضافه کردن تخصص جدید"
                                                        dir="rtl"
                                                    />
                                                    <button
                                                        onClick={addSpeciality}
                                                        className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                                                    >
                                                        +
                                                    </button>
                                                </div>

                                                <div className="flex flex-wrap gap-2">
                                                    {visitCard.specialities.map((speciality, index) => (
                                                        <div
                                                            key={index}
                                                            className="bg-white border border-teal-200 text-teal-700 px-3 py-1 rounded-lg flex items-center"
                                                        >
                                                            <span>{speciality}</span>
                                                            <button
                                                                onClick={() => removeSpeciality(index)}
                                                                className="mr-2 text-red-500 hover:text-red-700"
                                                            >
                                                                ×
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* آپلود تصاویر */}
                                    <div className="bg-gray-50 rounded-2xl p-6">
                                        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                                            <Camera className="w-5 h-5 ml-2" />
                                            تصاویر
                                        </h3>

                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    عکس پروفایل
                                                </label>
                                                <div className="relative border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-teal-400 hover:bg-teal-50 transition-all duration-300 cursor-pointer">
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={(e) => handleFileUpload(e, 'icon')}
                                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                    />
                                                    <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden">
                                                        {imagePreviews.icon ? (
                                                            <img
                                                                src={getImageUrl(imagePreviews.icon)}
                                                                alt="پروفایل"
                                                                className="w-full h-full object-cover"
                                                                onError={(e) => {
                                                                    e.target.src = 'https://via.placeholder.com/150?text=تصویر+موجود+نیست';
                                                                }}
                                                            />
                                                        ) : (
                                                            <Camera className="w-12 h-12 text-gray-400" />
                                                        )}
                                                    </div>
                                                    <p className="text-gray-600">
                                                        {imagePreviews.icon ? 'تغییر عکس پروفایل' : 'آپلود عکس پروفایل'}
                                                    </p>
                                                    <p className="text-sm text-gray-500 mt-2">JPEG, PNG, WebP • حداکثر 5MB</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* دکمه ادامه */}
                            <div className="mt-10 pt-8 border-t border-gray-100 flex justify-end">
                                <button
                                    onClick={handleNextStep}
                                    className="px-8 py-4 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-xl hover:from-teal-700 hover:to-teal-800 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center group"
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
                                    قالب دلخواه خود را برای کارت ویزیت انتخاب کنید
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
                                    className="mb-8 p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl border-2 border-purple-200"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            {selectedTemplate.image && (
                                                <div className="w-16 h-16 rounded-xl overflow-hidden ml-4">
                                                    <img
                                                        src={getImageUrl(selectedTemplate.image)}
                                                        alt={selectedTemplate.title}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            )}
                                            <div>
                                                <h3 className="text-xl font-bold text-gray-900 mb-1">
                                                    ✅ قالب انتخاب شده
                                                </h3>
                                                <p className="text-gray-600">{selectedTemplate.title}</p>
                                                <div className="flex items-center mt-2">
                                                    <DollarSign className="w-4 h-4 ml-1 text-green-600" />
                                                    <span className="text-green-700 font-bold">
                                                        {formatPrice(selectedTemplate.price)}
                                                    </span>
                                                </div>
                                            </div>
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
                                        const imageUrl = getImageUrl(template.image);

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
                                                    {imageUrl ? (
                                                        <img
                                                            src={imageUrl}
                                                            alt={template.title}
                                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                            onError={(e) => {
                                                                e.target.src = 'https://via.placeholder.com/400x250?text=تصویر+قالب';
                                                            }}
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center">
                                                            <ImageIcon className="w-12 h-12 text-gray-400" />
                                                        </div>
                                                    )}

                                                    {/* نشانگر انتخاب */}
                                                    {isSelected && (
                                                        <div className="absolute top-4 left-4 w-10 h-10 bg-purple-500 text-white rounded-full flex items-center justify-center shadow-lg">
                                                            <CheckCircle className="w-5 h-5" />
                                                        </div>
                                                    )}

                                                    {/* قیمت */}
                                                    <div className="absolute bottom-4 right-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full shadow-lg">
                                                        <span className="font-bold">{formatPrice(template.price)}</span>
                                                    </div>
                                                </div>

                                                {/* اطلاعات تمپلیت */}
                                                <div className="p-6">
                                                    <div className="flex justify-between items-start mb-3">
                                                        <h3 className="font-bold text-gray-900 text-xl">{template.title}</h3>
                                                        {template.category && (
                                                            <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                                                {template.category}
                                                            </span>
                                                        )}
                                                    </div>

                                                    <p className="text-gray-600 mb-4 line-clamp-2">{template.description}</p>

                                                    {/* رنگ‌ها */}
                                                    {template.colorPallete && template.colorPallete.length > 0 && (
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
                                        const imageUrl = getImageUrl(template.image);

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
                                                    {imageUrl ? (
                                                        <img
                                                            src={imageUrl}
                                                            alt={template.title}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                                                            <ImageIcon className="w-8 h-8 text-gray-400" />
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="flex-1">
                                                    <div className="flex justify-between items-start mb-2">
                                                        <h3 className="font-bold text-gray-900 text-xl">{template.title}</h3>
                                                        <div className="text-lg font-bold text-purple-600">
                                                            {formatPrice(template.price)}
                                                        </div>
                                                    </div>
                                                    <p className="text-gray-600 mb-3">{template.description}</p>

                                                    {/* رنگ‌ها */}
                                                    {template.colorPallete && template.colorPallete.length > 0 && (
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
                                        onClick={() => handleSaveVisitCard('draft')}
                                        disabled={saving}
                                        className="px-6 py-3.5 border-2 border-gray-200 rounded-xl text-gray-700 hover:border-gray-300 hover:bg-gray-50 disabled:opacity-50 transition-all duration-300 font-medium"
                                    >
                                        {saving ? 'در حال ذخیره...' : 'ذخیره پیش‌نویس'}
                                    </button>
                                    <button
                                        onClick={handleNextStep}
                                        disabled={!selectedTemplateId}
                                        className="px-8 py-3.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center group"
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
                                    کارت ویزیت خود را بررسی و در صورت تایید منتشر کنید
                                </p>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                {/* پیش‌نمایش کارت ویزیت */}
                                <div className="lg:col-span-2">
                                    <div className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-2xl p-8 border border-blue-100 shadow-lg">
                                        {/* هدر */}
                                        <div className="flex items-center mb-8">
                                            {imagePreviews.icon && (
                                                <div className="w-24 h-24 rounded-full bg-white p-2 shadow-xl ml-6">
                                                    <img
                                                        src={getImageUrl(imagePreviews.icon)}
                                                        alt="پزشک"
                                                        className="w-full h-full rounded-full object-cover border-4 border-white"
                                                        onError={(e) => {
                                                            e.target.src = 'https://via.placeholder.com/150?text=تصویر+پزشک';
                                                        }}
                                                    />
                                                </div>
                                            )}
                                            <div>
                                                <h3 className="text-3xl font-bold text-gray-900">{visitCard.doctorName}</h3>
                                                <div className="flex items-center mt-2">
                                                    <Stethoscope className="w-5 h-5 ml-2 text-teal-600" />
                                                    <p className="text-xl text-teal-700">{visitCard.medicalDegree}</p>
                                                </div>
                                                <p className="text-gray-600 text-lg mt-2">
                                                    تخصص: <span className="font-bold">{visitCard.specialty}</span>
                                                    {visitCard.subSpecialty && (
                                                        <span className="mr-3"> - {visitCard.subSpecialty}</span>
                                                    )}
                                                </p>
                                            </div>
                                        </div>

                                        {/* اطلاعات تماس */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                            {visitCard.phone && (
                                                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                                                    <div className="flex items-center mb-2">
                                                        <Phone className="w-5 h-5 ml-2 text-blue-600" />
                                                        <span className="text-gray-500">تلفن:</span>
                                                    </div>
                                                    <p className="text-lg font-medium text-gray-900">{visitCard.phone}</p>
                                                </div>
                                            )}

                                            {visitCard.email && (
                                                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                                                    <div className="flex items-center mb-2">
                                                        <Mail className="w-5 h-5 ml-2 text-blue-600" />
                                                        <span className="text-gray-500">ایمیل:</span>
                                                    </div>
                                                    <p className="text-lg font-medium text-gray-900">{visitCard.email}</p>
                                                </div>
                                            )}

                                            {visitCard.clinicName && (
                                                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                                                    <div className="flex items-center mb-2">
                                                        <Building className="w-5 h-5 ml-2 text-blue-600" />
                                                        <span className="text-gray-500">مرکز درمانی:</span>
                                                    </div>
                                                    <p className="text-lg font-medium text-gray-900">{visitCard.clinicName}</p>
                                                </div>
                                            )}

                                            {visitCard.address && (
                                                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                                                    <div className="flex items-center mb-2">
                                                        <MapPin className="w-5 h-5 ml-2 text-blue-600" />
                                                        <span className="text-gray-500">آدرس:</span>
                                                    </div>
                                                    <p className="text-lg font-medium text-gray-900">{visitCard.address}</p>
                                                </div>
                                            )}
                                        </div>

                                        {/* تخصص‌ها */}
                                        {visitCard.specialities.length > 0 && (
                                            <div className="mb-8">
                                                <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                                                    <Award className="w-6 h-6 ml-2 text-teal-600" />
                                                    تخصص‌ها
                                                </h4>
                                                <div className="flex flex-wrap gap-3">
                                                    {visitCard.specialities.map((speciality, index) => (
                                                        <span
                                                            key={index}
                                                            className="bg-gradient-to-r from-teal-500 to-teal-600 text-white px-4 py-2 rounded-full shadow-sm"
                                                        >
                                                            {speciality}
                                                        </span>
                                                    ))}
                                                </div>
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
                                                        {selectedTemplate.image && (
                                                            <div className="w-32 h-32 rounded-xl overflow-hidden ml-6 flex-shrink-0">
                                                                <img
                                                                    src={getImageUrl(selectedTemplate.image)}
                                                                    alt={selectedTemplate.title}
                                                                    className="w-full h-full object-cover"
                                                                />
                                                            </div>
                                                        )}
                                                        <div className="flex-1">
                                                            <h5 className="text-2xl font-bold text-gray-900 mb-3">{selectedTemplate.title}</h5>
                                                            <p className="text-gray-600 mb-4">{selectedTemplate.description}</p>

                                                            <div className="flex justify-between items-center">
                                                                <div>
                                                                    <span className="text-sm text-gray-500">قیمت:</span>
                                                                    <div className="text-2xl font-bold text-purple-600">
                                                                        {formatPrice(selectedTemplate.price)}
                                                                    </div>
                                                                </div>

                                                                {selectedTemplate.colorPallete && selectedTemplate.colorPallete.length > 0 && (
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

                                        {/* QR Code Preview */}
                                        <div className="bg-gradient-to-r from-teal-500 to-blue-500 rounded-2xl p-6 text-white">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h4 className="text-2xl font-bold mb-2">QR Code کارت ویزیت</h4>
                                                    <p className="opacity-90">
                                                        با اسکن این کد، اطلاعات پزشک قابل مشاهده است
                                                    </p>
                                                </div>
                                                <div className="w-32 h-32 bg-white rounded-xl p-3 flex items-center justify-center">
                                                    <QrCode className="w-20 h-20 text-gray-800" />
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
                                                        {selectedTemplate ? formatPrice(selectedTemplate.price) : '۰ تومان'}
                                                    </span>
                                                </div>

                                                <div className="pt-6">
                                                    <div className="flex items-center mb-4">
                                                        <div className={`w-4 h-4 rounded-full ml-3 ${visitCard.status === 'published' ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                                                        <span className="font-medium text-gray-900">
                                                            وضعیت: {visitCard.status === 'published' ? 'منتشر شده' : 'پیش‌نویس'}
                                                        </span>
                                                    </div>

                                                    <div className="bg-teal-50 border border-teal-200 rounded-xl p-4 mb-6">
                                                        <p className="text-sm text-teal-800">
                                                            ⓘ بعد از انتشار، QR Code فعال می‌شود
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* دکمه‌های عملی */}
                                            <div className="mt-8 space-y-4">
                                                <button
                                                    onClick={() => handleSaveVisitCard('draft')}
                                                    disabled={saving}
                                                    className="w-full py-4 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-xl hover:from-teal-700 hover:to-teal-800 disabled:opacity-50 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none flex items-center justify-center"
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
                                                    onClick={() => handleSaveVisitCard('published')}
                                                    disabled={saving}
                                                    className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none flex items-center justify-center group"
                                                >
                                                    {saving ? (
                                                        <>
                                                            <Loader2 className="w-5 h-5 ml-3 animate-spin" />
                                                            در حال انتشار...
                                                        </>
                                                    ) : (
                                                        <>
                                                            🚀 انتشار کارت ویزیت
                                                            <ChevronRight className="w-5 h-5 mr-3 group-hover:translate-x-1 transition-transform" />
                                                        </>
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

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
                                        onClick={() => handleSaveVisitCard('draft')}
                                        disabled={saving}
                                        className="px-6 py-3.5 border-2 border-gray-200 rounded-xl text-gray-700 hover:border-gray-300 hover:bg-gray-50 disabled:opacity-50 transition-all duration-300 font-medium"
                                    >
                                        {saving ? 'در حال ذخیره...' : 'ذخیره پیش‌نویس'}
                                    </button>
                                    <button
                                        onClick={() => handleSaveVisitCard('published')}
                                        disabled={saving}
                                        className="px-8 py-3.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center group"
                                    >
                                        {saving ? (
                                            <>
                                                <Loader2 className="w-5 h-5 ml-3 animate-spin" />
                                                در حال انتشار...
                                            </>
                                        ) : (
                                            '🚀 انتشار کارت ویزیت'
                                        )}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default VisitCardBuilder;