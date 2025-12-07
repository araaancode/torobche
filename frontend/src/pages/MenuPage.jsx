// MenuPage.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { QRCodeSVG } from 'qrcode.react'; // تغییر این خط
import {
    PiForkKnife,
    PiPlus,
    PiArrowRight,
    PiUserCircle,
    PiArrowLeft,
    PiBowlFoodLight,
    PiCheckCircle,
    PiSparkle,
    PiHeart,
    PiHeartFill,
    PiMapPin,
    PiPhone,
    PiEnvelope,
    PiCalendarCheck,
    PiClock,
    PiUsers,
    PiInstagramLogo,
    PiFacebookLogo,
    PiWhatsappLogo,
    PiQrCode,
    PiTrendUp,
    PiStar,
    PiShoppingCart,
    PiCamera,
    PiUserBold,
    PiDownload,
    PiShare,
    PiSealCheck,
    PiFire,
    PiCoffee,
    PiIceCream,
    PiPizza,
    PiLeaf,
    PiHamburger,
    PiCurrencyDollar,
    PiTrash,
    PiPencil,
    PiEye,
    PiGlobe,
    PiBuilding,
    PiInfo,
    PiWarningCircle,
    PiSpinner
} from 'react-icons/pi';

// URL API
const API_BASE_URL = 'http://localhost:5000';
const API_URL = `${API_BASE_URL}/api`;

// تنظیمات پیش‌فرض Axios
axios.defaults.withCredentials = true;

const MenuPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('menu');
    const [isFavorite, setIsFavorite] = useState(false);
    const [menuData, setMenuData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [shareDialogOpen, setShareDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [deleting, setDeleting] = useState(false);

    // Fetch menu data from API
    const fetchMenuData = async () => {
        try {
            setLoading(true);
            setError(null);

            // Fetch menu details
            const menuResponse = await axios.get(`${API_URL}/menus/${id}`, {
                withCredentials: true
            });

            if (menuResponse.data.success) {
                const menu = menuResponse.data.data;

                // Fetch foods for this menu
                const foodsResponse = await axios.get(`${API_URL}/foods`, {
                    withCredentials: true,
                    params: { menuId: id }
                });

                // Organize foods by category
                const foodsByCategory = {};
                if (foodsResponse.data.success) {
                    foodsResponse.data.data.forEach(food => {
                        const category = food.category || 'سایر';
                        if (!foodsByCategory[category]) {
                            foodsByCategory[category] = [];
                        }
                        foodsByCategory[category].push(food);
                    });
                }

                // Create category items
                const categoryItems = Object.keys(foodsByCategory).map(category => ({
                    name: category,
                    icon: getCategoryIcon(category),
                    items: foodsByCategory[category]
                }));

                setMenuData({
                    ...menu,
                    foods: foodsResponse.data.success ? foodsResponse.data.data : [],
                    categoryItems
                });

                // Check if menu is favorite
                const favorites = JSON.parse(localStorage.getItem('favoriteMenus') || '[]');
                setIsFavorite(favorites.includes(menu._id));
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

    // Get icon for food category
    const getCategoryIcon = (category) => {
        switch (category) {
            case 'پیش غذا':
            case 'appetizer':
                return <PiSparkle className="text-blue-500" />;
            case 'غذای اصلی':
            case 'main':
                return <PiFire className="text-red-500" />;
            case 'نوشیدنی':
            case 'drink':
                return <PiCoffee className="text-amber-500" />;
            case 'دسر':
            case 'dessert':
                return <PiIceCream className="text-pink-500" />;
            case 'سالاد':
            case 'salad':
                return <PiLeaf className="text-green-500" />;
            case 'ساندویچ':
            case 'sandwich':
                return <PiHamburger className="text-orange-500" />;
            default:
                return <PiForkKnife className="text-purple-500" />;
        }
    };

    useEffect(() => {
        if (id) {
            fetchMenuData();
        }
    }, [id]);

    const handleGoToProfile = () => {
        navigate('/profile', { state: { tab: 'menus' } });
    };

    const handleToggleFavorite = () => {
        const favorites = JSON.parse(localStorage.getItem('favoriteMenus') || '[]');
        const menuId = menuData?._id;

        if (isFavorite) {
            const newFavorites = favorites.filter(fav => fav !== menuId);
            localStorage.setItem('favoriteMenus', JSON.stringify(newFavorites));
        } else {
            favorites.push(menuId);
            localStorage.setItem('favoriteMenus', JSON.stringify(favorites));
        }

        setIsFavorite(!isFavorite);
    };

    const handleShare = async () => {
        const shareUrl = `${window.location.origin}/menu/${id}`;

        if (navigator.share) {
            try {
                await navigator.share({
                    title: menuData?.title || 'منو رستوران',
                    text: menuData?.description || '',
                    url: shareUrl,
                });
            } catch (error) {
                console.log('Error sharing:', error);
                setShareDialogOpen(true);
            }
        } else {
            setShareDialogOpen(true);
        }
    };

    const handleCopyUrl = () => {
        const shareUrl = `${window.location.origin}/menu/${id}`;
        navigator.clipboard.writeText(shareUrl);

        // Show success message
        const shareBtn = document.querySelector('[data-share-btn]');
        if (shareBtn) {
            const originalText = shareBtn.textContent;
            shareBtn.textContent = 'کپی شد!';
            setTimeout(() => {
                shareBtn.textContent = originalText;
            }, 2000);
        }
    };

    const handleDownloadQR = () => {
        const shareUrl = `${window.location.origin}/menu/${id}`;
        const svg = document.getElementById('menu-qr-code');
        if (svg) {
            const svgData = new XMLSerializer().serializeToString(svg);
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = new Image();

            img.onload = () => {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);

                const pngFile = canvas.toDataURL('image/png');
                const downloadLink = document.createElement('a');
                downloadLink.download = `menu-qr-${menuData?.title || 'menu'}.png`;
                downloadLink.href = pngFile;
                downloadLink.click();
            };

            img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
        }
    };

    const handleEditMenu = () => {
        navigate(`/profile?tab=menus&edit=${id}`);
    };

    const handleDeleteMenu = async () => {
        if (!window.confirm('آیا از حذف این منو مطمئن هستید؟ تمام غذاهای این منو نیز حذف خواهند شد.')) {
            return;
        }

        try {
            setDeleting(true);
            const response = await axios.delete(`${API_URL}/menus/${id}`, {
                withCredentials: true
            });

            if (response.data.success) {
                alert('منو با موفقیت حذف شد!');
                navigate('/profile?tab=menus');
            } else {
                throw new Error('خطا در حذف منو');
            }
        } catch (error) {
            console.error('Error deleting menu:', error);
            alert('خطا در حذف منو');
        } finally {
            setDeleting(false);
            setDeleteDialogOpen(false);
        }
    };

    const handleAddFood = () => {
        navigate(`/add-food/${id}`);
    };

    const renderNoMenu = () => (
        <div className="min-h-screen relative overflow-hidden pt-20 pb-12 md:pt-28 md:pb-16 bg-gradient-to-br from-gray-50/95 via-blue-50/95 to-purple-50/95 dark:from-gray-900/95 dark:via-blue-900/20 dark:to-purple-900/20 backdrop-blur-sm">
            <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
                <div className="absolute top-8 left-8 w-64 h-64 md:w-80 md:h-80 bg-blue-300 dark:bg-blue-600 rounded-full blur-3xl opacity-20" />
                <div className="absolute bottom-8 right-8 w-64 h-64 md:w-80 md:h-80 bg-purple-300 dark:bg-purple-600 rounded-full blur-3xl opacity-20" />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="pt-20 pb-8">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-2xl border border-white/30 dark:border-gray-700 text-center">
                            <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl">
                                <PiForkKnife className="text-white text-4xl md:text-5xl" />
                            </div>

                            <h1 className="text-2xl md:text-3xl font-black text-gray-800 dark:text-white mb-4">
                                منو پیدا نشد!
                            </h1>

                            <p className="text-gray-600 dark:text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
                                ممکن است این منو حذف شده باشد یا آدرس اشتباه باشد.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                <button
                                    onClick={handleGoToProfile}
                                    className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-3 text-lg"
                                >
                                    <PiUserCircle className="text-xl" />
                                    <span>رفتن به پروفایل</span>
                                </button>

                                <Link
                                    to="/profile?tab=menus"
                                    className="w-full sm:w-auto bg-white/90 dark:bg-gray-800/90 text-gray-800 dark:text-white px-8 py-4 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl border border-gray-200 dark:border-gray-700 flex items-center justify-center gap-3 text-lg"
                                >
                                    <PiPlus className="text-xl" />
                                    <span>ایجاد منو جدید</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    if (loading) {
        return (
            <div className="min-h-screen relative overflow-hidden pt-20 pb-12 md:pt-28 md:pb-16 bg-gradient-to-br from-gray-50/95 via-blue-50/95 to-purple-50/95 dark:from-gray-900/95 dark:via-blue-900/20 dark:to-purple-900/20 backdrop-blur-sm">
                <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
                    <div className="absolute top-8 left-8 w-64 h-64 md:w-80 md:h-80 bg-blue-300 dark:bg-blue-600 rounded-full blur-3xl opacity-20" />
                    <div className="absolute bottom-8 right-8 w-64 h-64 md:w-80 md:h-80 bg-purple-300 dark:bg-purple-600 rounded-full blur-3xl opacity-20" />
                </div>

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="pt-20 pb-8">
                        <div className="max-w-6xl mx-auto">
                            <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/30 dark:border-gray-700 flex items-center justify-center h-96">
                                <div className="text-center">
                                    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                                    <p className="text-gray-600 dark:text-gray-400">در حال بارگذاری منو...</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error || !menuData) {
        return renderNoMenu();
    }

    const tabs = [
        { id: 'menu', name: 'منو غذاها', icon: <PiForkKnife className="text-lg" /> },
        { id: 'info', name: 'اطلاعات کسب‌وکار', icon: <PiBuilding className="text-lg" /> },
        { id: 'qr', name: 'QR کد منو', icon: <PiQrCode className="text-lg" /> }
    ];

    const stats = [
        { label: 'تعداد غذاها', value: menuData?.foods?.length || 0, icon: <PiForkKnife className="text-blue-500" /> },
        { label: 'امتیاز', value: '۴.۵', icon: <PiStar className="text-yellow-500" /> },
        { label: 'بازدید', value: '۲۵۴', icon: <PiTrendUp className="text-green-500" /> },
        { label: 'اشتراک‌گذاری', value: '۴۷', icon: <PiShare className="text-purple-500" /> }
    ];

    const renderMenuItems = () => (
        <div className="space-y-8">
            {menuData?.categoryItems?.length > 0 ? (
                menuData.categoryItems.map((category, catIndex) => (
                    <div key={catIndex} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-white/30 dark:border-gray-700 shadow-lg">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl">
                                {category.icon}
                            </div>
                            <div>
                                <h3 className="text-xl font-black text-gray-800 dark:text-white">{category.name}</h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">{category.items?.length || 0} آیتم</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {category.items?.map((item, itemIndex) => (
                                <div key={item._id || itemIndex} className="group relative bg-white dark:bg-gray-700 rounded-xl p-4 border border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500 transition-all duration-300 hover:shadow-xl">
                                    <div className="flex gap-4">
                                        <div className="relative w-24 h-24 flex-shrink-0">
                                            <img
                                                src={item.images?.[0] || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'}
                                                alt={item.title}
                                                className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80';
                                                }}
                                            />
                                            {!item.inStock && (
                                                <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                                                    <span className="text-white text-xs font-bold">ناموجود</span>
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex-1 text-right">
                                            <div className="flex items-start justify-between mb-2">
                                                <div className="flex items-center gap-1 text-amber-500">
                                                    <PiStar className="fill-current" />
                                                    <span className="font-bold text-sm">۴.۵</span>
                                                </div>
                                                <h4 className="font-black text-gray-800 dark:text-white text-lg">{item.title}</h4>
                                            </div>

                                            <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">{item.description}</p>

                                            {item.ingredients && item.ingredients.length > 0 && (
                                                <div className="flex gap-1 mb-3 flex-wrap">
                                                    {item.ingredients.slice(0, 2).map((ingredient, idx) => (
                                                        <span key={idx} className="bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs px-2 py-0.5 rounded-full">
                                                            #{ingredient}
                                                        </span>
                                                    ))}
                                                    {item.ingredients.length > 2 && (
                                                        <span className="text-gray-500 text-xs">+{item.ingredients.length - 2}</span>
                                                    )}
                                                </div>
                                            )}

                                            <div className="flex items-center justify-between">
                                                <div className="text-left">
                                                    <div className="flex items-center gap-1">
                                                        <PiCurrencyDollar className="text-gray-400" />
                                                        <div className="text-lg font-black text-gray-800 dark:text-white">
                                                            {item.price?.toLocaleString() || '۰'}
                                                        </div>
                                                    </div>
                                                    <div className="text-gray-500 dark:text-gray-400 text-xs">تومان</div>
                                                </div>
                                                <div className={`text-xs ${item.inStock ? 'text-green-500' : 'text-red-500'}`}>
                                                    {item.inStock ? 'موجود' : 'ناموجود'}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))
            ) : (
                <div className="text-center py-12">
                    <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                        <PiForkKnife className="text-gray-400 text-3xl" />
                    </div>
                    <h3 className="text-xl font-black text-gray-800 dark:text-white mb-2">هنوز غذایی اضافه نکرده‌اید!</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">اولین غذای خود را به این منو اضافه کنید.</p>
                    <button
                        onClick={handleAddFood}
                        className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-3 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2 mx-auto"
                    >
                        <PiPlus />
                        اضافه کردن غذا
                    </button>
                </div>
            )}
        </div>
    );

    const renderBusinessInfo = () => (
        <div className="space-y-6">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-white/30 dark:border-gray-700 shadow-lg">
                <h3 className="text-lg font-black text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                    <PiBuilding className="text-blue-500" />
                    اطلاعات کسب‌وکار
                </h3>

                <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-gray-50/80 dark:bg-gray-700/80 rounded-xl">
                        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                            <PiForkKnife className="text-blue-500 text-lg" />
                        </div>
                        <div className="flex-1 text-right">
                            <div className="text-sm text-gray-600 dark:text-gray-400">نام منو</div>
                            <div className="font-medium text-gray-800 dark:text-white">{menuData?.title}</div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-gray-50/80 dark:bg-gray-700/80 rounded-xl">
                        <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
                            <PiBuilding className="text-green-500 text-lg" />
                        </div>
                        <div className="flex-1 text-right">
                            <div className="text-sm text-gray-600 dark:text-gray-400">نام کسب‌وکار</div>
                            <div className="font-medium text-gray-800 dark:text-white">{menuData?.bussinessName || '---'}</div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-gray-50/80 dark:bg-gray-700/80 rounded-xl">
                        <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
                            <PiInfo className="text-purple-500 text-lg" />
                        </div>
                        <div className="flex-1 text-right">
                            <div className="text-sm text-gray-600 dark:text-gray-400">توضیحات</div>
                            <div className="font-medium text-gray-800 dark:text-white">{menuData?.description || '---'}</div>
                        </div>
                    </div>

                    <div className="p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-500/5 dark:to-purple-500/5 rounded-xl border border-blue-200/50 dark:border-blue-800/50">
                        <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">آمار منو</div>
                        <div className="grid grid-cols-2 gap-3">
                            {stats.map((stat, index) => (
                                <div key={index} className="bg-white/50 dark:bg-gray-700/50 rounded-lg p-3 text-center">
                                    <div className="text-2xl font-black text-gray-800 dark:text-white">{stat.value}</div>
                                    <div className="text-xs text-gray-600 dark:text-gray-400">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-white/30 dark:border-gray-700 shadow-lg">
                    <h3 className="text-lg font-black text-gray-800 dark:text-white mb-4">مدیریت منو</h3>
                    <div className="space-y-3">
                        <button
                            onClick={handleEditMenu}
                            className="w-full flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-xl transition-all duration-200 group"
                        >
                            <PiPencil className="text-blue-500 group-hover:scale-110 transition-transform" />
                            <span className="font-medium text-gray-800 dark:text-white">ویرایش اطلاعات منو</span>
                        </button>
                        <button
                            onClick={handleAddFood}
                            className="w-full flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30 rounded-xl transition-all duration-200 group"
                        >
                            <PiPlus className="text-green-500 group-hover:scale-110 transition-transform" />
                            <span className="font-medium text-gray-800 dark:text-white">اضافه کردن غذا</span>
                        </button>
                        <button
                            onClick={() => setDeleteDialogOpen(true)}
                            className="w-full flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-xl transition-all duration-200 group"
                        >
                            <PiTrash className="text-red-500 group-hover:scale-110 transition-transform" />
                            <span className="font-medium text-gray-800 dark:text-white">حذف منو</span>
                        </button>
                    </div>
                </div>

                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-white/30 dark:border-gray-700 shadow-lg">
                    <h3 className="text-lg font-black text-gray-800 dark:text-white mb-4">اشتراک گذاری</h3>
                    <div className="grid grid-cols-2 gap-3">
                        <button
                            onClick={handleShare}
                            data-share-btn
                            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-3 rounded-lg font-bold transition-all duration-300 flex items-center justify-center gap-2"
                        >
                            <PiShare />
                            اشتراک گذاری
                        </button>
                        <button
                            onClick={() => setActiveTab('qr')}
                            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-3 rounded-lg font-bold transition-all duration-300 flex items-center justify-center gap-2"
                        >
                            <PiQrCode />
                            QR کد
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderQRCode = () => {
        const shareUrl = `${window.location.origin}/menu/${id}`;

        return (
            <div className="space-y-6">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white shadow-xl">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2">
                            <PiQrCode className="text-2xl" />
                            <h3 className="text-xl font-black">QR کد منو</h3>
                        </div>
                        <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold">
                            فعال
                        </span>
                    </div>

                    <div className="flex flex-col items-center justify-center p-6">
                        <div className="bg-white p-6 rounded-2xl shadow-2xl mb-6">
                            <QRCodeSVG
                                id="menu-qr-code"
                                value={shareUrl}
                                size={200}
                                level="H"
                                includeMargin={true}
                                fgColor="#000000"
                                bgColor="#ffffff"
                            />
                        </div>

                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-6 w-full max-w-md">
                            <div className="text-sm text-blue-100 mb-2">لینک منو:</div>
                            <div className="text-white font-mono text-sm break-all">
                                {shareUrl}
                            </div>
                        </div>

                        <p className="text-blue-100 text-center mb-6">
                            مشتریان می‌توانند این QR کد را اسکن کنند تا به این منو دسترسی داشته باشند
                        </p>

                        <div className="flex flex-col sm:flex-row gap-3">
                            <button
                                onClick={handleDownloadQR}
                                className="bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                            >
                                <PiDownload />
                                دانلود QR کد
                            </button>
                            <button
                                onClick={handleShare}
                                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-6 py-3 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                            >
                                <PiShare />
                                اشتراک گذاری لینک
                            </button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-white/30 dark:border-gray-700 shadow-lg">
                        <h3 className="text-lg font-black text-gray-800 dark:text-white mb-4">آمار منو</h3>
                        <div className="space-y-4">
                            {stats.map((stat, index) => (
                                <div key={index} className="flex items-center justify-between p-3 bg-gray-50/80 dark:bg-gray-700/80 rounded-xl">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-white dark:bg-gray-600 rounded-lg flex items-center justify-center">
                                            {stat.icon}
                                        </div>
                                        <div className="text-right">
                                            <div className="font-medium text-gray-800 dark:text-white">{stat.label}</div>
                                            <div className="text-2xl font-black text-gray-800 dark:text-white">{stat.value}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-white/30 dark:border-gray-700 shadow-lg">
                        <h3 className="text-lg font-black text-gray-800 dark:text-white mb-4">راهنمای استفاده</h3>
                        <div className="space-y-3">
                            <div className="flex items-start gap-3">
                                <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <span className="text-blue-600 dark:text-blue-400 text-sm font-bold">۱</span>
                                </div>
                                <div className="text-right">
                                    <div className="font-medium text-gray-800 dark:text-white">دانلود QR کد</div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">برای نمایش در رستوران</div>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <span className="text-green-600 dark:text-green-400 text-sm font-bold">۲</span>
                                </div>
                                <div className="text-right">
                                    <div className="font-medium text-gray-800 dark:text-white">اشتراک گذاری</div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">در شبکه‌های اجتماعی</div>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-6 h-6 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <span className="text-purple-600 dark:text-purple-400 text-sm font-bold">۳</span>
                                </div>
                                <div className="text-right">
                                    <div className="font-medium text-gray-800 dark:text-white">چاپ منو</div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">برای مشتریان حضوری</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <section
            className="min-h-screen relative overflow-hidden pt-20 pb-12 md:pt-28 md:pb-16 bg-gradient-to-br from-gray-50/95 via-blue-50/95 to-purple-50/95 dark:from-gray-900/95 dark:via-blue-900/20 dark:to-purple-900/20 backdrop-blur-sm"
            aria-label="منوی رستوران"
        >
            <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
                <div className="absolute top-8 left-8 w-64 h-64 md:w-80 md:h-80 bg-blue-300 dark:bg-blue-600 rounded-full blur-3xl opacity-20" />
                <div className="absolute bottom-8 right-8 w-64 h-64 md:w-80 md:h-80 bg-purple-300 dark:bg-purple-600 rounded-full blur-3xl opacity-20" />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="pt-20 pb-8">
                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-4">
                            <button
                                onClick={() => navigate(-1)}
                                className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white font-bold transition-colors duration-200 group"
                            >
                                <PiArrowLeft className="group-hover:-translate-x-1 transition-transform duration-200" />
                                بازگشت
                            </button>

                            <button
                                onClick={handleToggleFavorite}
                                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all duration-300 ${isFavorite
                                    ? 'bg-gradient-to-r from-red-500 to-pink-600 text-white shadow-lg'
                                    : 'bg-white/90 dark:bg-gray-800/90 text-gray-800 dark:text-white border border-gray-200 dark:border-gray-700'
                                    }`}
                            >
                                {isFavorite ? <PiHeartFill className="text-lg" /> : <PiHeart className="text-lg" />}
                                {isFavorite ? 'حذف از علاقه‌مندی' : 'افزودن به علاقه‌مندی'}
                            </button>
                        </div>

                        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                            <div className="relative">
                                <div className="w-24 h-24 rounded-2xl overflow-hidden border-4 border-white dark:border-gray-800 shadow-xl">
                                    <img
                                        src={menuData?.icon || `${API_BASE_URL}/uploads/default/menu-icon.png`}
                                        alt={menuData?.title}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = 'https://via.placeholder.com/100?text=Menu';
                                        }}
                                    />
                                </div>
                                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-2 border-white flex items-center justify-center shadow-lg">
                                    <PiCheckCircle className="text-white text-xs" />
                                </div>
                            </div>

                            <div className="flex-1 text-right">
                                <h1 className="text-3xl font-black text-gray-800 dark:text-white mb-2">
                                    {menuData?.title || 'منو'}
                                </h1>
                                <p className="text-gray-600 dark:text-gray-400 mb-3">
                                    {menuData?.bussinessName || 'کسب‌وکار شما'}
                                </p>
                                <div className="flex items-center gap-3 flex-wrap">
                                    <span className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                                        <PiCheckCircle className="text-sm" />
                                        {menuData?.status || 'فعال'}
                                    </span>
                                    <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                                        <PiSparkle className="text-sm" />
                                        {menuData?.foods?.length || 0} غذا
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    onClick={handleAddFood}
                                    className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-3 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
                                >
                                    <PiPlus />
                                    اضافه کردن غذا
                                </button>
                                <button
                                    onClick={() => navigate('/profile?tab=menus')}
                                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
                                >
                                    <PiUserCircle />
                                    مدیریت منو
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="max-w-6xl mx-auto">
                        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl p-2 shadow-xl border border-white/30 dark:border-gray-700 mb-6">
                            <div className="flex flex-wrap gap-2">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${activeTab === tab.id
                                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                                            : 'text-gray-600 dark:text-gray-400 hover:bg-white/50 dark:hover:bg-gray-700/50'
                                            }`}
                                    >
                                        {tab.icon}
                                        {tab.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/30 dark:border-gray-700">
                            {activeTab === 'menu' && renderMenuItems()}
                            {activeTab === 'info' && renderBusinessInfo()}
                            {activeTab === 'qr' && renderQRCode()}
                        </div>
                    </div>
                </div>
            </div>

            {/* Share Dialog */}
            {shareDialogOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-2xl p-6 max-w-md w-full border border-white/30 dark:border-gray-700 shadow-2xl">
                        <h3 className="text-xl font-black text-gray-800 dark:text-white mb-4">اشتراک گذاری منو</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">لینک این منو را با دیگران به اشتراک بگذارید:</p>

                        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-3 mb-6">
                            <div className="text-gray-800 dark:text-gray-300 break-all text-sm">
                                {`${window.location.origin}/menu/${id}`}
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={handleCopyUrl}
                                className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-3 rounded-xl font-bold transition-all duration-300"
                            >
                                کپی لینک
                            </button>
                            <button
                                onClick={() => setShareDialogOpen(false)}
                                className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-xl font-bold transition-all duration-300"
                            >
                                بستن
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Dialog */}
            {deleteDialogOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-2xl p-6 max-w-md w-full border border-white/30 dark:border-gray-700 shadow-2xl">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                                <PiWarningCircle className="text-red-500 text-2xl" />
                            </div>
                            <div className="text-right">
                                <h3 className="text-xl font-black text-gray-800 dark:text-white">حذف منو</h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">آیا از حذف این منو مطمئن هستید؟</p>
                            </div>
                        </div>

                        <div className="bg-red-50 dark:bg-red-900/10 rounded-xl p-4 mb-6">
                            <div className="flex items-start gap-2">
                                <PiWarningCircle className="text-red-500 mt-0.5 flex-shrink-0" />
                                <p className="text-red-600 dark:text-red-400 text-sm">
                                    توجه: تمام غذاهای این منو نیز حذف خواهند شد و این عمل قابل بازگشت نیست!
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={handleDeleteMenu}
                                disabled={deleting}
                                className="flex-1 bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2"
                            >
                                {deleting ? (
                                    <>
                                        <PiSpinner className="animate-spin" />
                                        در حال حذف...
                                    </>
                                ) : (
                                    <>
                                        <PiTrash />
                                        حذف منو
                                    </>
                                )}
                            </button>
                            <button
                                onClick={() => setDeleteDialogOpen(false)}
                                disabled={deleting}
                                className="px-6 py-3 bg-gray-500 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-bold transition-all duration-300"
                            >
                                انصراف
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default MenuPage;