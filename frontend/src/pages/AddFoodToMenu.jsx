// AddFood.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import {
    PiArrowLeft,
    PiCheck,
    PiUploadSimple,
    PiImage,
    PiTag,
    PiCurrencyDollar,
    PiForkKnife,
    PiFire,
    PiCoffee,
    PiIceCream,
    PiLeaf,
    PiHamburger,
    PiSparkle,
    PiPlus,
    PiMinus,
    PiX,
    PiShieldWarning,
    PiClock,
    PiCalendar,
    PiInfo,
    PiTrash,
    PiSpinner,
    PiCheckCircle,
    PiArrowRight,
    PiHouse,
    PiList,
    PiUser,
    PiStar
} from 'react-icons/pi';

// URL API
const API_BASE_URL = 'http://localhost:5000';
const API_URL = `${API_BASE_URL}/api`;

// تنظیمات پیش‌فرض Axios برای استفاده از withCredentials
axios.defaults.withCredentials = true;

const AddFood = () => {
    const { menuId } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [menu, setMenu] = useState(null);
    const [ingredientInput, setIngredientInput] = useState('');

    // Food form state - مطابق با Food Model
    const [foodForm, setFoodForm] = useState({
        title: '',
        description: '',
        price: '',
        category: 'غذای اصلی',
        ingredients: [],
        images: null,
        inStock: true,
        menu: menuId
    });

    // Food categories
    const foodCategories = [
        { value: 'پیش غذا', label: 'پیش غذا', icon: <PiSparkle className="text-blue-500" />, color: 'bg-blue-100 text-blue-600' },
        { value: 'غذای اصلی', label: 'غذای اصلی', icon: <PiFire className="text-red-500" />, color: 'bg-red-100 text-red-600' },
        { value: 'نوشیدنی', label: 'نوشیدنی', icon: <PiCoffee className="text-amber-500" />, color: 'bg-amber-100 text-amber-600' },
        { value: 'دسر', label: 'دسر', icon: <PiIceCream className="text-pink-500" />, color: 'bg-pink-100 text-pink-600' },
        { value: 'سالاد', label: 'سالاد', icon: <PiLeaf className="text-green-500" />, color: 'bg-green-100 text-green-600' },
        { value: 'ساندویچ', label: 'ساندویچ', icon: <PiHamburger className="text-orange-500" />, color: 'bg-orange-100 text-orange-600' },
    ];

    // Fetch menu details
    const fetchMenuDetails = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await axios.get(`${API_URL}/menus/${menuId}`, {
                withCredentials: true
            });

            if (response.data.success) {
                setMenu(response.data.data);
                // Set menu id in form
                setFoodForm(prev => ({ ...prev, menu: menuId }));
            } else {
                throw new Error('منو پیدا نشد');
            }
        } catch (error) {
            console.error('Error fetching menu:', error);
            setError('خطا در دریافت اطلاعات منو');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (menuId) {
            fetchMenuDetails();
        }
    }, [menuId]);

    // Handle form input changes
    const handleInputChange = (field, value) => {
        setFoodForm(prev => ({ ...prev, [field]: value }));
        setError(null);
    };

    // Handle ingredient input change
    const handleIngredientInputChange = (e) => {
        setIngredientInput(e.target.value);
    };

    // Add ingredient
    const addIngredient = () => {
        const ingredient = ingredientInput.trim();
        if (ingredient && !foodForm.ingredients.includes(ingredient)) {
            setFoodForm(prev => ({
                ...prev,
                ingredients: [...prev.ingredients, ingredient]
            }));
            setIngredientInput('');
        }
    };

    // Handle ingredient input key press
    const handleIngredientKeyPress = (e) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            addIngredient();
        }
    };

    // Remove ingredient
    const removeIngredient = (ingredientToRemove) => {
        setFoodForm(prev => ({
            ...prev,
            ingredients: prev.ingredients.filter(ingredient => ingredient !== ingredientToRemove)
        }));
    };

    // Handle image upload
    const handleImageUpload = (file) => {
        if (file) {
            // بررسی نوع فایل
            if (!file.type.startsWith('image/')) {
                setError('لطفاً فقط فایل تصویر انتخاب کنید');
                return;
            }

            // بررسی حجم فایل (حداکثر 5MB)
            if (file.size > 5 * 1024 * 1024) {
                setError('حجم تصویر نباید بیشتر از 5 مگابایت باشد');
                return;
            }

            setFoodForm(prev => ({ ...prev, images: file }));
            setError(null);
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        if (!foodForm.title.trim()) {
            setError('لطفاً نام غذا را وارد کنید');
            return;
        }

        if (!foodForm.description.trim()) {
            setError('لطفاً توضیحات غذا را وارد کنید');
            return;
        }

        if (!foodForm.price || parseFloat(foodForm.price) <= 0) {
            setError('لطفاً قیمت معتبر وارد کنید');
            return;
        }

        if (!foodForm.menu) {
            setError('خطا: منو مشخص نشده است');
            return;
        }

        try {
            setUploading(true);
            setError(null);
            setSuccess(null);

            // Create FormData
            const formData = new FormData();

            // اضافه کردن فیلدهای اجباری مطابق Food Model
            formData.append('title', foodForm.title);
            formData.append('description', foodForm.description);
            formData.append('menu', foodForm.menu);
            formData.append('price', foodForm.price);
            formData.append('inStock', foodForm.inStock.toString());

            // اضافه کردن فیلدهای اختیاری
            if (foodForm.category) {
                formData.append('category', foodForm.category);
            }

            // اضافه کردن مواد اولیه
            if (foodForm.ingredients.length > 0) {
                // ارسال به صورت آرایه JSON
                formData.append('ingredients', JSON.stringify(foodForm.ingredients));
            }

            // اضافه کردن تصویر
            if (foodForm.images) {
                // نام فیلد مطابق schema باید 'images' باشد (آرایه)
                formData.append('images', foodForm.images);
            }

            console.log('📤 ارسال داده‌های غذا:', {
                title: foodForm.title,
                menu: foodForm.menu,
                price: foodForm.price,
                category: foodForm.category,
                ingredients: foodForm.ingredients,
                hasImage: !!foodForm.images
            });

            // ارسال درخواست به API
            const response = await axios.post(`${API_URL}/foods`, formData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.data.success) {
                setSuccess('غذا با موفقیت به منو اضافه شد!');

                // نمایش جزئیات موفقیت
                console.log('✅ غذا ایجاد شد:', {
                    foodId: response.data.data._id,
                    title: response.data.data.title,
                    menuId: response.data.data.menu
                });

                // Reset form after successful submission
                setFoodForm({
                    title: '',
                    description: '',
                    price: '',
                    category: 'غذای اصلی',
                    ingredients: [],
                    images: null,
                    inStock: true,
                    menu: menuId
                });
                setIngredientInput('');

                // Redirect after 2 seconds
                setTimeout(() => {
                    navigate(`/menu/${menuId}/foods`);
                }, 2000);
            } else {
                throw new Error(response.data.message || 'خطا در اضافه کردن غذا');
            }
        } catch (error) {
            console.error('❌ Error adding food:', error);

            // نمایش خطای دقیق‌تر
            let errorMessage = 'خطا در اضافه کردن غذا';

            if (error.response) {
                // خطای سرور
                errorMessage = error.response.data?.message ||
                    error.response.data?.error ||
                    error.response.statusText;

                // نمایش خطاهای اعتبارسنجی
                if (error.response.data?.validationErrors) {
                    console.log('Validation Errors:', error.response.data.validationErrors);
                    errorMessage = 'خطا در اعتبارسنجی داده‌ها: ' +
                        Object.values(error.response.data.validationErrors).join(', ');
                }
            } else if (error.request) {
                // خطای شبکه
                errorMessage = 'خطا در ارتباط با سرور. لطفاً اتصال اینترنت خود را بررسی کنید.';
            } else {
                // خطای دیگر
                errorMessage = error.message || 'خطای ناشناخته';
            }

            setError(errorMessage);
        } finally {
            setUploading(false);
        }
    };

    // Handle cancel
    const handleCancel = () => {
        navigate(`/menu/${menuId}`);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600 dark:text-gray-400">در حال بارگذاری اطلاعات منو...</p>
                </div>
            </div>
        );
    }

    if (error && !menu) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20 flex items-center justify-center">
                <div className="text-center max-w-md mx-4">
                    <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                        <PiShieldWarning className="text-red-500 text-3xl" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">خطا در بارگذاری</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">{error}</p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <button
                            onClick={() => navigate('/profile?tab=menus')}
                            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-bold transition-all duration-300"
                        >
                            بازگشت به پروفایل
                        </button>
                        <button
                            onClick={fetchMenuDetails}
                            className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-xl font-bold transition-all duration-300"
                        >
                            تلاش مجدد
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20">
            {/* Header */}
            <header className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => navigate(-1)}
                                className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white font-bold transition-colors duration-200 group"
                            >
                                <PiArrowLeft className="group-hover:-translate-x-1 transition-transform duration-200" />
                                بازگشت
                            </button>

                            {menu && (
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                                        <img
                                            src={menu.icon || `${API_BASE_URL}/uploads/default/menu-icon.png`}
                                            alt={menu.title}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = 'https://via.placeholder.com/40?text=Menu';
                                            }}
                                        />
                                    </div>
                                    <div className="text-right">
                                        <h1 className="font-bold text-gray-800 dark:text-white">افزودن غذا</h1>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">به: {menu.title}</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="flex items-center gap-3">
                            <Link
                                to={`/menu/${menuId}`}
                                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-2 rounded-xl font-bold transition-all duration-300 text-sm flex items-center gap-2"
                            >
                                <PiList />
                                مشاهده منو
                            </Link>
                            <Link
                                to="/profile?tab=menus"
                                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-xl font-bold transition-all duration-300 text-sm flex items-center gap-2"
                            >
                                <PiUser />
                                پروفایل
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    {/* Success Message */}
                    {success && (
                        <div className="mb-6 bg-gradient-to-r from-green-500/20 to-emerald-500/20 dark:from-green-500/10 dark:to-emerald-500/10 border border-green-200 dark:border-green-800 rounded-2xl p-6">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                                    <PiCheckCircle className="text-green-600 dark:text-green-400 text-2xl" />
                                </div>
                                <div className="text-right flex-1">
                                    <h3 className="font-bold text-green-800 dark:text-green-300 text-lg">موفقیت‌آمیز!</h3>
                                    <p className="text-green-600 dark:text-green-400 text-sm mt-1">{success}</p>
                                    <div className="flex items-center gap-2 mt-3 text-green-500 dark:text-green-300 text-sm">
                                        <PiSpinner className="animate-spin" />
                                        <span>در حال انتقال به صفحه منو...</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Error Message */}
                    {error && (
                        <div className="mb-6 bg-gradient-to-r from-red-500/20 to-rose-500/20 dark:from-red-500/10 dark:to-rose-500/10 border border-red-200 dark:border-red-800 rounded-2xl p-6">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                                    <PiShieldWarning className="text-red-600 dark:text-red-400 text-2xl" />
                                </div>
                                <div className="text-right flex-1">
                                    <h3 className="font-bold text-red-800 dark:text-red-300 text-lg">خطا!</h3>
                                    <p className="text-red-600 dark:text-red-400 text-sm mt-1">{error}</p>
                                </div>
                                <button
                                    onClick={() => setError(null)}
                                    className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 p-1"
                                >
                                    <PiX className="text-xl" />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Form Card */}
                    <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 dark:border-gray-700 overflow-hidden">
                        <div className="p-8">
                            <div className="text-center mb-8">
                                <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                                    <PiForkKnife className="text-white text-4xl" />
                                </div>
                                <h2 className="text-3xl font-black text-gray-800 dark:text-white mb-2">
                                    افزودن غذای جدید
                                </h2>
                                <p className="text-gray-600 dark:text-gray-400">
                                    اطلاعات غذای جدید را وارد کنید و به منوی "{menu?.title}" اضافه کنید
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-8">
                                {/* Food Image Upload */}
                                <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-500/5 dark:to-purple-500/5 rounded-2xl p-6 border border-blue-200/50 dark:border-blue-800/50">
                                    <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                                        <PiImage className="text-blue-500 text-xl" />
                                        تصویر غذا
                                        <span className="text-sm text-gray-500 dark:text-gray-400 font-normal">(اختیاری)</span>
                                    </h3>

                                    <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-blue-300 dark:border-blue-700 rounded-xl hover:border-blue-400 dark:hover:border-blue-600 transition-all duration-300 cursor-pointer group">
                                        {foodForm.images ? (
                                            <div className="relative w-full max-w-md">
                                                <img
                                                    src={URL.createObjectURL(foodForm.images)}
                                                    alt="Preview"
                                                    className="w-full h-64 object-cover rounded-xl shadow-lg"
                                                />
                                                <div className="absolute bottom-4 right-4 left-4 flex justify-between items-center">
                                                    <button
                                                        type="button"
                                                        onClick={() => handleImageUpload(null)}
                                                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-bold transition-all duration-300 text-sm flex items-center gap-2"
                                                    >
                                                        <PiTrash className="text-sm" />
                                                        حذف تصویر
                                                    </button>
                                                    <span className="text-white bg-black/50 px-3 py-1 rounded-lg text-sm">
                                                        {foodForm.images.name}
                                                    </span>
                                                </div>
                                            </div>
                                        ) : (
                                            <>
                                                <div className="w-24 h-24 bg-blue-500/20 dark:bg-blue-500/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                                    <PiImage className="text-blue-500 text-4xl" />
                                                </div>
                                                <p className="text-gray-600 dark:text-gray-400 mb-2 text-center">
                                                    تصویر غذا را اینجا رها کنید یا کلیک کنید
                                                </p>
                                                <p className="text-gray-500 dark:text-gray-500 text-sm mb-4 text-center">
                                                    فرمت‌های مجاز: JPG, PNG, GIF • حداکثر 5MB
                                                </p>
                                                <label className="cursor-pointer bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2">
                                                    <PiUploadSimple className="text-lg" />
                                                    انتخاب تصویر
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        className="hidden"
                                                        onChange={(e) => handleImageUpload(e.target.files[0])}
                                                    />
                                                </label>
                                            </>
                                        )}
                                    </div>
                                </div>

                                {/* Food Name */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-bold text-gray-800 dark:text-white">
                                        نام غذا *
                                    </label>
                                    <input
                                        type="text"
                                        value={foodForm.title}
                                        onChange={(e) => handleInputChange('title', e.target.value)}
                                        className="w-full bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm rounded-xl px-4 py-4 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-white text-lg"
                                        placeholder="مثلاً: چلوکباب کوبیده"
                                        required
                                        disabled={uploading}
                                    />
                                    <p className="text-gray-500 dark:text-gray-400 text-xs">
                                        نام جذاب و واضح برای غذا انتخاب کنید
                                    </p>
                                </div>

                                {/* Description */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-bold text-gray-800 dark:text-white">
                                        توضیحات *
                                    </label>
                                    <textarea
                                        value={foodForm.description}
                                        onChange={(e) => handleInputChange('description', e.target.value)}
                                        className="w-full bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm rounded-xl px-4 py-4 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-white resize-none"
                                        rows="4"
                                        placeholder="توضیحات کامل درباره غذا، مواد اولیه، طعم و ویژگی‌های خاص..."
                                        required
                                        disabled={uploading}
                                    />
                                    <p className="text-gray-500 dark:text-gray-400 text-xs">
                                        توضیحات کامل به مشتریان در انتخاب کمک می‌کند
                                    </p>
                                </div>

                                {/* Price and Category */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="block text-sm font-bold text-gray-800 dark:text-white">
                                            قیمت (تومان) *
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="number"
                                                value={foodForm.price}
                                                onChange={(e) => handleInputChange('price', e.target.value)}
                                                className="w-full bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm rounded-xl px-4 py-4 pl-12 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-white text-lg"
                                                placeholder="150000"
                                                min="0"
                                                step="1000"
                                                required
                                                disabled={uploading}
                                            />
                                            <PiCurrencyDollar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                                            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                                                <span className="text-gray-500 dark:text-gray-400">تومان</span>
                                            </div>
                                        </div>
                                        <p className="text-gray-500 dark:text-gray-400 text-xs">
                                            قیمت را به تومان وارد کنید
                                        </p>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-sm font-bold text-gray-800 dark:text-white">
                                            دسته‌بندی
                                        </label>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                            {foodCategories.map((category) => (
                                                <button
                                                    key={category.value}
                                                    type="button"
                                                    onClick={() => handleInputChange('category', category.value)}
                                                    disabled={uploading}
                                                    className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all duration-300 ${foodForm.category === category.value
                                                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 shadow-md'
                                                        : 'border-gray-300 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-sm'
                                                        } ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                >
                                                    <div className="mb-2 text-xl">{category.icon}</div>
                                                    <span className={`text-xs font-medium ${foodForm.category === category.value ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'}`}>
                                                        {category.label}
                                                    </span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Ingredients */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-bold text-gray-800 dark:text-white">
                                        مواد اولیه
                                        <span className="text-sm text-gray-500 dark:text-gray-400 font-normal mr-2">(اختیاری)</span>
                                    </label>
                                    <div className="bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm rounded-xl border border-gray-300 dark:border-gray-600 p-4">
                                        <div className="flex gap-2 mb-3">
                                            <input
                                                type="text"
                                                value={ingredientInput}
                                                onChange={handleIngredientInputChange}
                                                onKeyPress={handleIngredientKeyPress}
                                                placeholder="مواد اولیه را وارد کنید..."
                                                className="flex-1 bg-transparent border-none focus:outline-none text-gray-800 dark:text-white"
                                                disabled={uploading}
                                            />
                                            <button
                                                type="button"
                                                onClick={addIngredient}
                                                disabled={uploading || !ingredientInput.trim()}
                                                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg font-bold transition-all duration-300 text-sm flex items-center gap-2"
                                            >
                                                <PiPlus />
                                                افزودن
                                            </button>
                                        </div>

                                        {foodForm.ingredients.length > 0 ? (
                                            <div className="flex flex-wrap gap-2">
                                                {foodForm.ingredients.map((ingredient, index) => (
                                                    <div
                                                        key={index}
                                                        className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-2 rounded-lg flex items-center gap-2 group"
                                                    >
                                                        <PiTag className="text-sm" />
                                                        <span className="text-sm">{ingredient}</span>
                                                        <button
                                                            type="button"
                                                            onClick={() => removeIngredient(ingredient)}
                                                            disabled={uploading}
                                                            className="text-white/80 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                                        >
                                                            <PiX className="text-xs" />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="text-gray-500 dark:text-gray-400 text-sm text-center py-4">
                                                هنوز ماده اولیه‌ای اضافه نکرده‌اید
                                            </p>
                                        )}

                                        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-xs mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                                            <PiInfo />
                                            <span>برای افزودن هر ماده اولیه، آن را تایپ کرده و دکمه "افزودن" را بزنید یا Enter را فشار دهید</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Availability */}
                                <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 dark:from-green-500/5 dark:to-emerald-500/5 rounded-2xl p-6 border border-green-200/50 dark:border-green-800/50">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-14 h-14 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                                                <PiClock className="text-green-600 dark:text-green-400 text-2xl" />
                                            </div>
                                            <div className="text-right">
                                                <h3 className="font-bold text-gray-800 dark:text-white text-lg">وضعیت موجودی</h3>
                                                <p className="text-gray-600 dark:text-gray-400 text-sm">
                                                    آیا این غذا در منو موجود است؟
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4">
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={foodForm.inStock}
                                                    onChange={(e) => handleInputChange('inStock', e.target.checked)}
                                                    className="sr-only peer"
                                                    disabled={uploading}
                                                />
                                                <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                                                <span className="mr-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                                                    {foodForm.inStock ? 'موجود' : 'ناموجود'}
                                                </span>
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                {/* Form Actions */}
                                <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-gray-200 dark:border-gray-700">
                                    <button
                                        type="submit"
                                        disabled={uploading}
                                        className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-4 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-3 text-lg"
                                    >
                                        {uploading ? (
                                            <>
                                                <PiSpinner className="animate-spin text-xl" />
                                                در حال افزودن غذا...
                                            </>
                                        ) : (
                                            <>
                                                <PiPlus className="text-xl" />
                                                افزودن غذا به منو
                                            </>
                                        )}
                                    </button>

                                    <button
                                        type="button"
                                        onClick={handleCancel}
                                        disabled={uploading}
                                        className="px-8 py-4 bg-gray-500 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2"
                                    >
                                        <PiX />
                                        انصراف
                                    </button>
                                </div>
                            </form>

                            {/* Form Tips */}
                            <div className="mt-8 p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-500/5 dark:to-purple-500/5 rounded-2xl border border-blue-200/50 dark:border-blue-800/50">
                                <h4 className="font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                                    <PiInfo className="text-blue-500 text-xl" />
                                    نکات مهم برای افزودن غذا
                                </h4>
                                <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                                    <li className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></div>
                                        <span>فیلدهای دارای علامت * <span className="text-red-500">*</span> اجباری هستند</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></div>
                                        <span>تصویر با کیفیت بالا باعث جذب بیشتر مشتریان می‌شود</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></div>
                                        <span>توضیحات کامل و دقیق کمک می‌کند تا مشتریان بهتر انتخاب کنند</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></div>
                                        <span>می‌توانید بعداً اطلاعات غذا را در پنل کاربری ویرایش کنید</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></div>
                                        <span>در صورت عدم موجودی، غذا در منو نمایش داده می‌شود اما غیرفعال خواهد بود</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Menu Info Card */}
                    {menu && (
                        <div className="mt-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 dark:from-purple-500/5 dark:to-pink-500/5 rounded-2xl border border-purple-200/50 dark:border-purple-800/50 p-6">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 rounded-xl overflow-hidden border border-white/30 dark:border-gray-700">
                                        <img
                                            src={menu.icon || `${API_BASE_URL}/uploads/default/menu-icon.png`}
                                            alt={menu.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="text-right">
                                        <h3 className="font-bold text-gray-800 dark:text-white">در حال افزودن غذا به:</h3>
                                        <h2 className="text-xl font-black text-gray-800 dark:text-white mt-1">{menu.title}</h2>
                                        <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{menu.description}</p>
                                        <div className="flex items-center gap-2 mt-2">
                                            <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-lg text-xs font-bold">
                                                {menu.bussinessName}
                                            </span>
                                            <span className="text-gray-500 dark:text-gray-400 text-xs">
                                                {menu.foods?.length || 0} غذا
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <Link
                                    to={`/menu/${menuId}`}
                                    className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white px-6 py-3 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                                >
                                    <PiArrowRight className="text-lg" />
                                    مشاهده کامل منو
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            {/* Footer */}
            <footer className="mt-12 py-6 border-t border-gray-200 dark:border-gray-700">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="text-center md:text-right">
                            <p className="text-gray-600 dark:text-gray-400 text-sm">
                                © {new Date().getFullYear()} تمامی حقوق محفوظ است
                            </p>
                        </div>
                        <div className="flex items-center justify-center gap-4">
                            <Link
                                to="/profile?tab=menus"
                                className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white text-sm transition-colors duration-200"
                            >
                                منوهای من
                            </Link>
                            <Link
                                to="/"
                                className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white text-sm transition-colors duration-200 flex items-center gap-1"
                            >
                                <PiHouse />
                                صفحه اصلی
                            </Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default AddFood;