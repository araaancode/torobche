import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { visitCardApi, templateApi } from '../utils/visitCardsApi'; // You'll need to create these API functions
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowLeft,
    Save,
    CheckCircle,
    Palette,
    Eye,
    User,
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
    Phone,
    MapPin,
    Building,
    BriefcaseMedical,
    QrCode,
    Download
} from 'lucide-react';

const VisitCardsBuilder = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = !!id;

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [step, setStep] = useState(1); // 1: اطلاعات پایه، 2: انتخاب قالب، 3: اطلاعات دکتر، 4: پیش‌نمایش

    const [templates, setTemplates] = useState([]);
    const [filteredTemplates, setFilteredTemplates] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [viewMode, setViewMode] = useState('grid');

    const [visitCard, setVisitCard] = useState({
        title: '',
        template: '',
        user: '',
        doctorInfo: {
            name: '',
            specialty: '',
            phoneNumbers: [''],
            address: '',
            city: ''
        },
        image: '',
        isActive: true
    });

    const [selectedTemplateId, setSelectedTemplateId] = useState(null);
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [errors, setErrors] = useState({});
    const [phoneNumbers, setPhoneNumbers] = useState(['']);

    // بارگذاری داده‌ها
    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);

                // بارگذاری قالب‌های ویزیت
                const templatesRes = await templateApi.getAllVisitTemplates();
                if (templatesRes && templatesRes.success) {
                    const templatesData = templatesRes.data || [];
                    setTemplates(templatesData);
                    setFilteredTemplates(templatesData);
                }

                // بارگذاری کارت در حالت ویرایش
                if (isEditing && id) {
                    const cardRes = await visitCardApi.getById(id);
                    if (cardRes && cardRes.success) {
                        const cardData = cardRes.data;
                        const doctorInfo = cardData.doctorInfo || {};

                        setVisitCard({
                            title: cardData.title || '',
                            template: cardData.template?._id || '',
                            user: cardData.user || '',
                            doctorInfo: {
                                name: doctorInfo.name || '',
                                specialty: doctorInfo.specialty || '',
                                phoneNumbers: doctorInfo.phoneNumbers || [''],
                                address: doctorInfo.address || '',
                                city: doctorInfo.city || ''
                            },
                            image: cardData.image ? `http://localhost:5000${cardData.image}` : '',
                            isActive: cardData.isActive !== undefined ? cardData.isActive : true
                        });

                        if (cardData.template) {
                            setSelectedTemplateId(cardData.template._id || cardData.template);
                            setSelectedTemplate(cardData.template);
                        }

                        if (doctorInfo.phoneNumbers) {
                            setPhoneNumbers(doctorInfo.phoneNumbers);
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

    // فیلتر کردن قالب‌ها
    useEffect(() => {
        let result = templates;

        if (searchTerm) {
            result = result.filter(template =>
                template?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                template?.doctorName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                template?.specialty?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredTemplates(result);
    }, [searchTerm, templates]);

    // اعتبارسنجی فرم
    const validateStep = (stepNumber) => {
        const newErrors = {};

        if (stepNumber === 1) {
            if (!visitCard.title.trim()) newErrors.title = 'عنوان کارت ویزیت الزامی است';
            if (!visitCard.user) newErrors.user = 'انتخاب کاربر الزامی است';
        }

        if (stepNumber === 2 && !selectedTemplateId) {
            newErrors.template = 'لطفا یک قالب انتخاب کنید';
        }

        if (stepNumber === 3) {
            if (!visitCard.doctorInfo.name.trim()) newErrors.doctorName = 'نام دکتر الزامی است';
            if (!visitCard.doctorInfo.specialty.trim()) newErrors.specialty = 'تخصص دکتر الزامی است';
            if (!visitCard.doctorInfo.address.trim()) newErrors.address = 'آدرس الزامی است';
            if (!visitCard.doctorInfo.city.trim()) newErrors.city = 'شهر الزامی است';
            if (phoneNumbers.some(num => !num.trim())) newErrors.phoneNumbers = 'شماره تلفن‌ها الزامی هستند';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // رفتن به مرحله بعدی
    const handleNextStep = () => {
        if (!validateStep(step)) return;
        if (step < 4) setStep(step + 1);
    };

    // ذخیره کارت ویزیت
    const handleSaveCard = async (status = 'draft') => {
        if (!validateStep(step)) return;

        setSaving(true);
        try {
            const cardData = {
                title: visitCard.title,
                template: selectedTemplateId,
                user: visitCard.user,
                doctorInfo: {
                    name: visitCard.doctorInfo.name,
                    specialty: visitCard.doctorInfo.specialty,
                    phoneNumbers: phoneNumbers.filter(num => num.trim()),
                    address: visitCard.doctorInfo.address,
                    city: visitCard.doctorInfo.city
                },
                image: visitCard.image.replace('http://localhost:5000', ''),
                isActive: visitCard.isActive,
                status: status
            };

            let response;
            if (isEditing) {
                response = await visitCardApi.update(id, cardData);
            } else {
                response = await visitCardApi.create(cardData);
            }

            if (response && response.success) {
                if (status === 'published') {
                    alert('🎉 کارت ویزیت با موفقیت ایجاد شد!');
                    navigate('/visit-cards');
                } else {
                    alert('✅ تغییرات ذخیره شد');
                    if (!isEditing) {
                        navigate('/visit-cards');
                    }
                }
            } else {
                alert('❌ خطا در ذخیره کارت ویزیت');
            }
        } catch (error) {
            console.error('خطا در ذخیره کارت ویزیت:', error);
            alert('❌ خطا در ذخیره کارت ویزیت');
        } finally {
            setSaving(false);
        }
    };

    // آپلود تصویر
    const handleImageUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // شبیه‌سازی آپلود
        const mockUrl = URL.createObjectURL(file);
        setVisitCard(prev => ({ ...prev, image: mockUrl }));
    };

    // اضافه کردن شماره تلفن
    const addPhoneNumber = () => {
        setPhoneNumbers([...phoneNumbers, '']);
    };

    // حذف شماره تلفن
    const removePhoneNumber = (index) => {
        const newPhoneNumbers = phoneNumbers.filter((_, i) => i !== index);
        setPhoneNumbers(newPhoneNumbers);
    };

    // تغییر شماره تلفن
    const handlePhoneNumberChange = (index, value) => {
        const newPhoneNumbers = [...phoneNumbers];
        newPhoneNumbers[index] = value;
        setPhoneNumbers(newPhoneNumbers);
        setVisitCard(prev => ({
            ...prev,
            doctorInfo: {
                ...prev.doctorInfo,
                phoneNumbers: newPhoneNumbers
            }
        }));
    };

    // هنگام انتخاب قالب
    const handleTemplateSelect = (templateId) => {
        setSelectedTemplateId(templateId);
        const template = templates.find(t => t._id === templateId);
        setSelectedTemplate(template);

        // پر کردن خودکار اطلاعات دکتر از قالب
        if (template && step === 2) {
            setVisitCard(prev => ({
                ...prev,
                doctorInfo: {
                    name: template.doctorName || prev.doctorInfo.name,
                    specialty: template.specialty || prev.doctorInfo.specialty,
                    phoneNumbers: template.phoneNumbers || prev.doctorInfo.phoneNumbers,
                    address: template.address || prev.doctorInfo.address,
                    city: template.city || prev.doctorInfo.city
                }
            }));

            if (template.phoneNumbers) {
                setPhoneNumbers(template.phoneNumbers);
            }
        }
    };

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
                            onClick={() => navigate('/visit-cards')}
                            className="flex items-center text-gray-700 hover:text-gray-900 transition-colors group"
                        >
                            <ArrowLeft className="w-5 h-5 ml-2 group-hover:-translate-x-1 transition-transform" />
                            بازگشت به لیست
                        </button>

                        <div className="text-center">
                            <h1 className="text-2xl font-bold text-gray-900">
                                {isEditing ? '✏️ ویرایش کارت ویزیت' : '✨ ساخت کارت ویزیت جدید'}
                            </h1>
                            <p className="text-gray-600 text-sm mt-1">
                                مرحله {step} از ۴ • {step === 1 ? 'اطلاعات پایه' : step === 2 ? 'انتخاب قالب' : step === 3 ? 'اطلاعات دکتر' : 'پیش‌نمایش'}
                            </p>
                        </div>

                        <button
                            onClick={() => handleSaveCard('draft')}
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
                                { number: 1, label: 'اطلاعات پایه', icon: FileText },
                                { number: 2, label: 'انتخاب قالب', icon: Palette },
                                { number: 3, label: 'اطلاعات دکتر', icon: User },
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
                                    <FileText className="w-8 h-8 ml-3 text-blue-600" />
                                    اطلاعات اولیه کارت ویزیت
                                </h2>
                                <p className="text-gray-600">
                                    ابتدا اطلاعات اصلی کارت ویزیت را وارد کنید
                                </p>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-3 text-right">
                                            عنوان کارت ویزیت *
                                        </label>
                                        <input
                                            type="text"
                                            value={visitCard.title}
                                            onChange={(e) => setVisitCard(prev => ({ ...prev, title: e.target.value }))}
                                            className={`w-full px-5 py-4 border-2 rounded-xl focus:ring-2 transition-all duration-300 text-right text-lg placeholder-gray-400
                        ${errors.title ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-blue-500 focus:ring-blue-200'}
                      `}
                                            placeholder="مثال: کارت ویزیت دکتر احمدی"
                                            dir="rtl"
                                        />
                                        {errors.title && (
                                            <p className="mt-2 text-sm text-red-600">{errors.title}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-3 text-right">
                                            انتخاب کاربر (مالک) *
                                        </label>
                                        <select
                                            value={visitCard.user}
                                            onChange={(e) => setVisitCard(prev => ({ ...prev, user: e.target.value }))}
                                            className={`w-full px-5 py-4 border-2 rounded-xl focus:ring-2 transition-all duration-300 text-right text-lg
                        ${errors.user ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-blue-500 focus:ring-blue-200'}
                      `}
                                            dir="rtl"
                                        >
                                            <option value="">انتخاب کاربر...</option>
                                            {/* Users will be loaded from API */}
                                            <option value="user1">کاربر ۱</option>
                                            <option value="user2">کاربر ۲</option>
                                        </select>
                                        {errors.user && (
                                            <p className="mt-2 text-sm text-red-600">{errors.user}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-3 text-right">
                                            آپلود تصویر دکتر (اختیاری)
                                        </label>
                                        <div className="relative border-3 border-dashed border-gray-200 rounded-2xl p-8 text-center hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 cursor-pointer">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageUpload}
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                            />
                                            <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden">
                                                {visitCard.image ? (
                                                    <img src={visitCard.image} alt="تصویر دکتر" className="w-full h-full object-cover" />
                                                ) : (
                                                    <Camera className="w-12 h-12 text-gray-400" />
                                                )}
                                            </div>
                                            <p className="text-gray-600 mb-2">
                                                {visitCard.image ? 'تغییر تصویر' : 'آپلود تصویر دکتر'}
                                            </p>
                                            <p className="text-sm text-gray-500">PNG, JPG • حداکثر ۲ مگابایت</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
                                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                                        <Sparkles className="w-6 h-6 ml-2 text-blue-600" />
                                        نکات مهم
                                    </h3>
                                    <ul className="space-y-4">
                                        <li className="flex items-start">
                                            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center ml-3 flex-shrink-0">
                                                <span className="text-blue-600">1</span>
                                            </div>
                                            <p className="text-gray-700">عنوان کارت باید واضح و مرتبط با دکتر باشد</p>
                                        </li>
                                        <li className="flex items-start">
                                            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center ml-3 flex-shrink-0">
                                                <span className="text-blue-600">2</span>
                                            </div>
                                            <p className="text-gray-700">کاربر انتخاب شده مالک این کارت ویزیت خواهد بود</p>
                                        </li>
                                        <li className="flex items-start">
                                            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center ml-3 flex-shrink-0">
                                                <span className="text-blue-600">3</span>
                                            </div>
                                            <p className="text-gray-700">تصویر دکتر در کارت ویزیت نمایش داده می‌شود</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            {/* دکمه ادامه */}
                            <div className="mt-10 pt-8 border-t border-gray-100 flex justify-end">
                                <button
                                    onClick={handleNextStep}
                                    className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center group"
                                >
                                    ادامه به انتخاب قالب
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
                                    <div className="flex-1">
                                        <div className="relative">
                                            <input
                                                type="text"
                                                placeholder="جستجو در قالب‌ها (عنوان، نام دکتر، تخصص)..."
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                                className="w-full px-5 py-3 pr-12 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300 text-right"
                                                dir="rtl"
                                            />
                                            <Search className="absolute right-4 top-3.5 w-5 h-5 text-gray-400" />
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

                            {/* قالب انتخاب شده */}
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
                                            {selectedTemplate.doctorName && (
                                                <p className="text-gray-500 mt-1">
                                                    <User className="w-4 h-4 inline ml-1" />
                                                    {selectedTemplate.doctorName} - {selectedTemplate.specialty}
                                                </p>
                                            )}
                                        </div>
                                        <button
                                            onClick={() => {
                                                setSelectedTemplateId(null);
                                                setSelectedTemplate(null);
                                            }}
                                            className="px-4 py-2 text-sm text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                                        >
                                            تغییر انتخاب
                                        </button>
                                    </div>
                                </motion.div>
                            )}

                            {/* لیست قالب‌ها */}
                            {viewMode === 'grid' ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {filteredTemplates.map(template => {
                                        const isSelected = selectedTemplateId === template._id;
                                        return (
                                            <motion.div
                                                key={template._id}
                                                whileHover={{ y: -5 }}
                                                whileTap={{ scale: 0.98 }}
                                                onClick={() => handleTemplateSelect(template._id)}
                                                className={`relative rounded-2xl overflow-hidden border-2 cursor-pointer transition-all duration-300 group
                          ${isSelected
                                                        ? 'border-purple-500 ring-2 ring-purple-200 shadow-xl'
                                                        : 'border-gray-200 hover:border-gray-300 shadow-lg hover:shadow-xl'
                                                    }`}
                                            >
                                                {/* تصویر قالب */}
                                                <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                                                    {template.image ? (
                                                        <img
                                                            src={template.image}
                                                            alt={template.title}
                                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center">
                                                            <Palette className="w-16 h-16 text-gray-400" />
                                                        </div>
                                                    )}

                                                    {/* نشانگر انتخاب */}
                                                    {isSelected && (
                                                        <div className="absolute top-4 left-4 w-10 h-10 bg-purple-500 text-white rounded-full flex items-center justify-center shadow-lg">
                                                            <CheckCircle className="w-5 h-5" />
                                                        </div>
                                                    )}

                                                    {/* اطلاعات سریع */}
                                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                                                        <h4 className="text-white font-bold text-lg">{template.title}</h4>
                                                        {template.doctorName && (
                                                            <p className="text-white/90 text-sm">
                                                                {template.doctorName} • {template.specialty}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* اطلاعات قالب */}
                                                <div className="p-6">
                                                    <h3 className="font-bold text-gray-900 text-xl mb-3">{template.title}</h3>

                                                    {template.doctorName && (
                                                        <div className="mb-3">
                                                            <div className="flex items-center text-gray-600 mb-1">
                                                                <User className="w-4 h-4 ml-2" />
                                                                <span className="font-medium">دکتر:</span>
                                                                <span className="mr-2">{template.doctorName}</span>
                                                            </div>
                                                            <div className="flex items-center text-gray-600">
                                                                <BriefcaseMedical className="w-4 h-4 ml-2" />
                                                                <span className="font-medium">تخصص:</span>
                                                                <span className="mr-2">{template.specialty}</span>
                                                            </div>
                                                        </div>
                                                    )}

                                                    {template.description && (
                                                        <p className="text-gray-600 mb-4 text-sm">{template.description}</p>
                                                    )}

                                                    {/* اطلاعات تماس */}
                                                    {(template.phoneNumbers?.length > 0 || template.address) && (
                                                        <div className="mb-4 space-y-2">
                                                            {template.phoneNumbers?.length > 0 && (
                                                                <div className="flex items-center text-gray-500 text-sm">
                                                                    <Phone className="w-3 h-3 ml-2" />
                                                                    <span>{template.phoneNumbers[0]}</span>
                                                                    {template.phoneNumbers.length > 1 && (
                                                                        <span className="mr-2">+{template.phoneNumbers.length - 1}</span>
                                                                    )}
                                                                </div>
                                                            )}
                                                            {template.address && (
                                                                <div className="flex items-center text-gray-500 text-sm">
                                                                    <MapPin className="w-3 h-3 ml-2" />
                                                                    <span>{template.address}</span>
                                                                </div>
                                                            )}
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
                                                onClick={() => handleTemplateSelect(template._id)}
                                                className={`flex items-center p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300
                          ${isSelected
                                                        ? 'border-purple-500 bg-purple-50 shadow-md'
                                                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                                    }`}
                                            >
                                                <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 ml-6 bg-gray-100">
                                                    {template.image ? (
                                                        <img
                                                            src={template.image}
                                                            alt={template.title}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center">
                                                            <Palette className="w-10 h-10 text-gray-400" />
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="flex-1">
                                                    <div className="flex justify-between items-start mb-2">
                                                        <h3 className="font-bold text-gray-900 text-xl">{template.title}</h3>
                                                        <div className={`px-3 py-1 rounded-full text-sm ${isSelected ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-600'}`}>
                                                            {isSelected ? 'انتخاب شده' : 'آماده انتخاب'}
                                                        </div>
                                                    </div>

                                                    {template.doctorName && (
                                                        <div className="mb-3">
                                                            <div className="flex items-center">
                                                                <div className="flex items-center text-gray-700 ml-6">
                                                                    <User className="w-4 h-4 ml-1" />
                                                                    <span>{template.doctorName}</span>
                                                                </div>
                                                                <div className="flex items-center text-gray-700">
                                                                    <BriefcaseMedical className="w-4 h-4 ml-1" />
                                                                    <span>{template.specialty}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}

                                                    {template.description && (
                                                        <p className="text-gray-600 mb-3 text-sm">{template.description}</p>
                                                    )}

                                                    <div className="flex items-center space-x-4">
                                                        {template.phoneNumbers?.[0] && (
                                                            <div className="flex items-center text-gray-500 text-sm">
                                                                <Phone className="w-3 h-3 ml-1" />
                                                                <span>{template.phoneNumbers[0]}</span>
                                                            </div>
                                                        )}
                                                        {template.address && (
                                                            <div className="flex items-center text-gray-500 text-sm">
                                                                <MapPin className="w-3 h-3 ml-1" />
                                                                <span>{template.city} - {template.address}</span>
                                                            </div>
                                                        )}
                                                    </div>
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
                                        قالبی یافت نشد
                                    </h3>
                                    <p className="text-gray-600 max-w-md mx-auto mb-8">
                                        {searchTerm
                                            ? 'هیچ قالبی با این مشخصات پیدا نشد. لطفا جستجوی دیگری امتحان کنید.'
                                            : 'هنوز قالبی وجود ندارد. لطفا ابتدا قالب‌ها را ایجاد کنید.'}
                                    </p>
                                    {searchTerm && (
                                        <button
                                            onClick={() => setSearchTerm('')}
                                            className="px-6 py-3 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-colors"
                                        >
                                            حذف جستجو
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
                                        onClick={() => handleSaveCard('draft')}
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
                                        ادامه به اطلاعات دکتر
                                        <ChevronRight className="w-5 h-5 mr-3 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Step 3: Doctor Information */}
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
                                    <User className="w-8 h-8 ml-3 text-green-600" />
                                    اطلاعات دکتر
                                </h2>
                                <p className="text-gray-600">
                                    اطلاعات دکتر را تکمیل کنید. این اطلاعات روی کارت ویزیت نمایش داده می‌شوند.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {/* فرم اطلاعات دکتر */}
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-3 text-right">
                                            نام و نام خانوادگی دکتر *
                                        </label>
                                        <input
                                            type="text"
                                            value={visitCard.doctorInfo.name}
                                            onChange={(e) => setVisitCard(prev => ({
                                                ...prev,
                                                doctorInfo: { ...prev.doctorInfo, name: e.target.value }
                                            }))}
                                            className={`w-full px-5 py-4 border-2 rounded-xl focus:ring-2 transition-all duration-300 text-right text-lg placeholder-gray-400
                        ${errors.doctorName ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-green-500 focus:ring-green-200'}
                      `}
                                            placeholder="مثال: دکتر علی احمدی"
                                            dir="rtl"
                                        />
                                        {errors.doctorName && (
                                            <p className="mt-2 text-sm text-red-600">{errors.doctorName}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-3 text-right">
                                            تخصص دکتر *
                                        </label>
                                        <input
                                            type="text"
                                            value={visitCard.doctorInfo.specialty}
                                            onChange={(e) => setVisitCard(prev => ({
                                                ...prev,
                                                doctorInfo: { ...prev.doctorInfo, specialty: e.target.value }
                                            }))}
                                            className={`w-full px-5 py-4 border-2 rounded-xl focus:ring-2 transition-all duration-300 text-right text-lg placeholder-gray-400
                        ${errors.specialty ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-green-500 focus:ring-green-200'}
                      `}
                                            placeholder="مثال: متخصص قلب و عروق"
                                            dir="rtl"
                                        />
                                        {errors.specialty && (
                                            <p className="mt-2 text-sm text-red-600">{errors.specialty}</p>
                                        )}
                                    </div>

                                    {/* شماره تلفن‌ها */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-3 text-right">
                                            شماره تلفن‌ها *
                                        </label>
                                        {phoneNumbers.map((phone, index) => (
                                            <div key={index} className="flex items-center mb-3">
                                                <input
                                                    type="text"
                                                    value={phone}
                                                    onChange={(e) => handlePhoneNumberChange(index, e.target.value)}
                                                    className={`flex-1 px-5 py-3 border-2 rounded-xl focus:ring-2 transition-all duration-300 text-left placeholder-gray-400
                            ${errors.phoneNumbers ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-green-500 focus:ring-green-200'}
                          `}
                                                    placeholder="مثال: ۰۹۱۲۱۲۳۴۵۶۷"
                                                    dir="ltr"
                                                />
                                                {phoneNumbers.length > 1 && (
                                                    <button
                                                        type="button"
                                                        onClick={() => removePhoneNumber(index)}
                                                        className="mr-3 p-3 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                                                    >
                                                        حذف
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                        {errors.phoneNumbers && (
                                            <p className="mt-2 text-sm text-red-600">{errors.phoneNumbers}</p>
                                        )}
                                        <button
                                            type="button"
                                            onClick={addPhoneNumber}
                                            className="mt-2 px-4 py-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors flex items-center"
                                        >
                                            <Phone className="w-4 h-4 ml-2" />
                                            افزودن شماره تلفن دیگر
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-3 text-right">
                                            آدرس مطب *
                                        </label>
                                        <textarea
                                            value={visitCard.doctorInfo.address}
                                            onChange={(e) => setVisitCard(prev => ({
                                                ...prev,
                                                doctorInfo: { ...prev.doctorInfo, address: e.target.value }
                                            }))}
                                            className={`w-full px-5 py-4 border-2 rounded-xl focus:ring-2 transition-all duration-300 text-right placeholder-gray-400 resize-none
                        ${errors.address ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-green-500 focus:ring-green-200'}
                      `}
                                            placeholder="آدرس کامل مطب"
                                            rows={3}
                                            dir="rtl"
                                        />
                                        {errors.address && (
                                            <p className="mt-2 text-sm text-red-600">{errors.address}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-3 text-right">
                                            شهر *
                                        </label>
                                        <input
                                            type="text"
                                            value={visitCard.doctorInfo.city}
                                            onChange={(e) => setVisitCard(prev => ({
                                                ...prev,
                                                doctorInfo: { ...prev.doctorInfo, city: e.target.value }
                                            }))}
                                            className={`w-full px-5 py-4 border-2 rounded-xl focus:ring-2 transition-all duration-300 text-right text-lg placeholder-gray-400
                        ${errors.city ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-green-500 focus:ring-green-200'}
                      `}
                                            placeholder="مثال: تهران"
                                            dir="rtl"
                                        />
                                        {errors.city && (
                                            <p className="mt-2 text-sm text-red-600">{errors.city}</p>
                                        )}
                                    </div>

                                    {/* وضعیت فعال/غیرفعال */}
                                    <div className="mt-8 p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border border-gray-200">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h4 className="font-bold text-gray-900 mb-1">وضعیت کارت ویزیت</h4>
                                                <p className="text-gray-600 text-sm">
                                                    {visitCard.isActive ? 'کارت فعال و قابل نمایش است' : 'کارت غیرفعال و مخفی است'}
                                                </p>
                                            </div>
                                            <div className="flex items-center">
                                                <span className={`mr-3 font-medium ${visitCard.isActive ? 'text-green-600' : 'text-gray-500'}`}>
                                                    {visitCard.isActive ? 'فعال' : 'غیرفعال'}
                                                </span>
                                                <div className="relative">
                                                    <input
                                                        type="checkbox"
                                                        id="isActive"
                                                        checked={visitCard.isActive}
                                                        onChange={(e) => setVisitCard(prev => ({ ...prev, isActive: e.target.checked }))}
                                                        className="sr-only"
                                                    />
                                                    <label
                                                        htmlFor="isActive"
                                                        className={`block w-14 h-8 rounded-full cursor-pointer transition-colors duration-300 ${visitCard.isActive ? 'bg-green-500' : 'bg-gray-300'
                                                            }`}
                                                    >
                                                        <div className={`absolute top-1 w-6 h-6 rounded-full bg-white transition-transform duration-300 ${visitCard.isActive ? 'left-7' : 'left-1'
                                                            }`}></div>
                                                    </label>
                                                </div>
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
                                        onClick={() => handleSaveCard('draft')}
                                        disabled={saving}
                                        className="px-6 py-3.5 border-2 border-gray-200 rounded-xl text-gray-700 hover:border-gray-300 hover:bg-gray-50 disabled:opacity-50 transition-all duration-300 font-medium"
                                    >
                                        {saving ? 'در حال ذخیره...' : 'ذخیره پیش‌نویس'}
                                    </button>
                                    <button
                                        onClick={handleNextStep}
                                        className="px-8 py-3.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center group"
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
                                    <Eye className="w-8 h-8 ml-3 text-indigo-600" />
                                    پیش‌نمایش نهایی
                                </h2>
                                <p className="text-gray-600">
                                    قبل از انتشار، کارت ویزیت خود را بررسی کنید.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                {/* پیش‌نمایش کارت ویزیت */}
                                <div className="lg:col-span-2">
                                    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 border border-indigo-100 shadow-lg">
                                        <div className="flex flex-col lg:flex-row gap-8">
                                            {/* تصویر دکتر */}
                                            <div className="lg:w-1/3">
                                                <div className="bg-white rounded-2xl p-6 shadow-lg">
                                                    <div className="aspect-square rounded-xl overflow-hidden mb-6 bg-gradient-to-br from-gray-100 to-gray-200">
                                                        {visitCard.image ? (
                                                            <img
                                                                src={visitCard.image}
                                                                alt="تصویر دکتر"
                                                                className="w-full h-full object-cover"
                                                            />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center">
                                                                <User className="w-24 h-24 text-gray-400" />
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="text-center">
                                                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                                            {visitCard.doctorInfo.name || 'نام دکتر'}
                                                        </h3>
                                                        <p className="text-lg text-gray-600 mb-4">
                                                            {visitCard.doctorInfo.specialty || 'تخصص دکتر'}
                                                        </p>
                                                        <div className="flex justify-center">
                                                            <div className={`px-4 py-2 rounded-full ${visitCard.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                                                                {visitCard.isActive ? '✅ فعال' : '⏸️ غیرفعال'}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* اطلاعات تماس */}
                                            <div className="lg:w-2/3">
                                                <div className="mb-6">
                                                    <h4 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                                                        <Building className="w-6 h-6 ml-2 text-indigo-600" />
                                                        اطلاعات تماس
                                                    </h4>

                                                    <div className="space-y-4">
                                                        {/* شماره تلفن‌ها */}
                                                        <div>
                                                            <div className="flex items-center text-gray-700 mb-3">
                                                                <Phone className="w-5 h-5 ml-2 text-indigo-500" />
                                                                <span className="font-bold">شماره تماس:</span>
                                                            </div>
                                                            <div className="space-y-2 mr-7">
                                                                {phoneNumbers.filter(num => num.trim()).map((phone, index) => (
                                                                    <div key={index} className="text-lg text-gray-800">
                                                                        📞 {phone}
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>

                                                        {/* آدرس */}
                                                        <div>
                                                            <div className="flex items-center text-gray-700 mb-3">
                                                                <MapPin className="w-5 h-5 ml-2 text-indigo-500" />
                                                                <span className="font-bold">آدرس مطب:</span>
                                                            </div>
                                                            <div className="text-lg text-gray-800 mr-7">
                                                                🏥 {visitCard.doctorInfo.address}
                                                                <br />
                                                                🌆 {visitCard.doctorInfo.city}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* اطلاعات قالب */}
                                                {selectedTemplate && (
                                                    <div className="bg-white/80 rounded-2xl p-6 border border-indigo-200">
                                                        <h5 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                                                            <Palette className="w-5 h-5 ml-2 text-purple-600" />
                                                            قالب استفاده شده
                                                        </h5>
                                                        <div className="flex items-center">
                                                            <div className="w-16 h-16 rounded-xl overflow-hidden ml-4 bg-gray-100">
                                                                {selectedTemplate.image ? (
                                                                    <img
                                                                        src={selectedTemplate.image}
                                                                        alt={selectedTemplate.title}
                                                                        className="w-full h-full object-cover"
                                                                    />
                                                                ) : (
                                                                    <Palette className="w-8 h-8 m-4 text-gray-400" />
                                                                )}
                                                            </div>
                                                            <div>
                                                                <h6 className="font-bold text-gray-900">{selectedTemplate.title}</h6>
                                                                <p className="text-gray-600 text-sm mt-1">
                                                                    طراحی حرفه‌ای کارت ویزیت
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}

                                                {/* QR Code */}
                                                <div className="mt-6">
                                                    <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl p-6 text-white">
                                                        <div className="flex items-center justify-between">
                                                            <div>
                                                                <h5 className="text-lg font-bold mb-2">QR Code کارت ویزیت</h5>
                                                                <p className="text-white/90 text-sm">
                                                                    با اسکن این کد، اطلاعات دکتر مستقیماً ذخیره می‌شود
                                                                </p>
                                                            </div>
                                                            <div className="w-20 h-20 bg-white rounded-xl p-2">
                                                                {/* QR Code placeholder */}
                                                                <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center">
                                                                    <QrCode className="w-10 h-10 text-gray-600" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* خلاصه و دکمه‌ها */}
                                <div>
                                    <div className="sticky top-8">
                                        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 border border-gray-200 shadow-lg">
                                            <h4 className="text-2xl font-bold text-gray-900 mb-6">خلاصه کارت ویزیت</h4>

                                            <div className="space-y-6">
                                                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                                                    <span className="text-gray-600">عنوان:</span>
                                                    <span className="font-bold text-gray-900">{visitCard.title}</span>
                                                </div>

                                                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                                                    <span className="text-gray-600">قالب طراحی:</span>
                                                    <span className="font-bold text-gray-900">
                                                        {selectedTemplate ? selectedTemplate.title : 'انتخاب نشده'}
                                                    </span>
                                                </div>

                                                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                                                    <span className="text-gray-600">وضعیت:</span>
                                                    <span className={`font-bold ${visitCard.isActive ? 'text-green-600' : 'text-gray-600'}`}>
                                                        {visitCard.isActive ? 'فعال' : 'غیرفعال'}
                                                    </span>
                                                </div>

                                                <div className="pt-6">
                                                    <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-4 mb-6 border border-indigo-100">
                                                        <p className="text-sm text-indigo-800">
                                                            ⓘ این کارت ویزیت به صورت آنلاین قابل اشتراک‌گذاری است.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* دکمه‌های عملی */}
                                            <div className="mt-8 space-y-4">
                                                <button
                                                    onClick={() => handleSaveCard('draft')}
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
                                                    onClick={() => handleSaveCard('published')}
                                                    disabled={saving}
                                                    className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none flex items-center justify-center group"
                                                >
                                                    {saving ? (
                                                        <>
                                                            <Loader2 className="w-5 h-5 ml-3 animate-spin" />
                                                            در حال انتشار...
                                                        </>
                                                    ) : (
                                                        <>
                                                            🚀 ایجاد کارت ویزیت
                                                            <ChevronRight className="w-5 h-5 mr-3 group-hover:translate-x-1 transition-transform" />
                                                        </>
                                                    )}
                                                </button>

                                                <button
                                                    onClick={() => {
                                                        // شبیه‌سازی دانلود
                                                        alert('📄 در حال آماده‌سازی برای چاپ...');
                                                    }}
                                                    className="w-full py-3.5 border-2 border-gray-300 rounded-xl text-gray-700 hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 font-medium flex items-center justify-center"
                                                >
                                                    <Download className="w-5 h-5 ml-3" />
                                                    دانلود برای چاپ
                                                </button>
                                            </div>

                                            <p className="text-center text-sm text-gray-500 mt-6">
                                                بعد از انتشار، کارت ویزیت در پنل شما قابل مدیریت است.
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

export default VisitCardsBuilder;