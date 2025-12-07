// Profile.jsx
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  PiUser,
  PiEnvelope,
  PiPhone,
  PiMapPin,
  PiCamera,
  PiCheckCircle,
  PiPencil,
  PiShieldCheck,
  PiCreditCard,
  PiBell,
  PiLock,
  PiGlobe,
  PiTrash,
  PiQrCode,
  PiChartLine,
  PiCalendar,
  PiStar,
  PiCrown,
  PiSparkle,
  PiArrowLeft,
  PiBuildings,
  PiBriefcase,
  PiChartBar,
  PiRocket,
  PiGift,
  PiShield,
  PiWallet,
  PiDownload,
  PiShareNetwork,
  PiNotification,
  PiKey,
  PiEye,
  PiEyeSlash,
  PiUsersThree,
  PiCalendarBlank,
  PiClock,
  PiTrendUp,
  PiReceipt,
  PiQuestion,
  PiSignOut,
  PiInstagramLogo,
  PiFacebookLogo,
  PiTwitterLogo,
  PiLinkedinLogo,
  PiYoutubeLogo,
  PiSealCheck,
  PiLeaf,
  PiFire,
  PiCloud,
  PiCpu,
  PiForkKnife,
  PiCards,
  PiSuitcase,
  PiFileText,
  PiHouse,
  PiGear,
  PiBookmark,
  PiHeart,
  PiShoppingBag,
  PiPackage,
  PiList,
  PiGridFour,
  PiUserCircle,
  PiChartPieSlice,
  PiShieldWarning,
  PiBellRinging,
  PiStarHalf,
  PiMoney,
  PiCalendarPlus,
  PiUsers,
  PiClipboardText,
  PiPlus,
  PiMinus,
  PiPizza,
  PiHamburger,
  PiCoffee,
  PiBeerStein,
  PiIceCream,
  PiBowlFoodLight,
  PiArrowRight,
  PiUserCheck,
  PiEye as PiEyeOpen,
  PiX,
  PiCheck,
  PiUploadSimple,
  PiImage,
  PiTag,
  PiCurrencyDollar
} from 'react-icons/pi';
import axios from 'axios';

// URL API
const API_BASE_URL = 'http://localhost:5000';
const API_URL = `${API_BASE_URL}/api`;

// تنظیمات پیش‌فرض Axios برای استفاده از withCredentials
axios.defaults.withCredentials = true;

const Profile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    marketing: false,
    updates: true
  });
  const [security, setSecurity] = useState({
    twoFactor: false,
    loginAlerts: true,
    deviceManagement: true
  });

  // State for menus and foods
  const [userMenus, setUserMenus] = useState([]);
  const [loadingMenus, setLoadingMenus] = useState(true);
  const [menuDialogOpen, setMenuDialogOpen] = useState(false);
  const [foodDialogOpen, setFoodDialogOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [editingFood, setEditingFood] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  // Menu form state
  const [menuForm, setMenuForm] = useState({
    title: '',
    bussinessName: '',
    description: '',
    icon: null,
    coverImage: null
  });

  // Food form state - مطابق با Food Model
  const [foodForm, setFoodForm] = useState({
    title: '', // نام غذا
    description: '', // توضیحات
    price: '', // قیمت
    category: 'غذای اصلی', // دسته‌بندی
    ingredients: [], // مواد اولیه (آرایه)
    images: null, // تصاویر (فایل)
    inStock: true, // وضعیت موجودی
    menu: '' // آیدی منو
  });

  // User data - از API دریافت می‌شود
  const [userData, setUserData] = useState({
    name: 'علی رضایی',
    email: 'ali.rezaei@example.com',
    phone: '۰۹۱۲XXX XXXX',
    location: 'تهران، جردن، برج افرا',
    bio: 'توسعه‌دهنده ارشد فرانت‌اند با ۸+ سال تجربه در زمینه طراحی و توسعه رابط کاربری.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    businessName: 'شرکت نوآوران فناوری',
    businessType: 'استارتاپ فناوری',
    website: 'www.techinnovators.com',
    industry: 'نرم‌افزار و فناوری اطلاعات',
    position: 'مدیر فنی و مؤسس',
    employees: '۲۵-۵۰ نفر',
    founded: '۱۳۹۸',
    plan: 'حرفه‌ای',
    planLevel: 'Pro',
    planExpiry: '۱۴۰۳/۰۲/۱۵',
    planColor: 'from-purple-500 to-pink-500',
    cardsCreated: '۴۲',
    qrScans: '۱,۲۴۷',
    profileViews: '۲,۸۴۱',
    customerRating: '۴.۹',
    responseTime: '۲ ساعت',
    activeProjects: '۱۲',
    menusCount: '۸',
    businessCardsCount: '۲۴',
    jobCardsCount: '۱۲',
    resumesCount: '۵',
    billingCycle: 'ماهانه',
    nextBilling: '۱۴۰۳/۰۱/۳۰',
    paymentMethod: 'کارت بانکی (۶۰۳۷-****-****-۱۲۳۴)',
    social: {
      instagram: '@alirezaei',
      linkedin: '/in/alirezaei',
      twitter: '@alirezaei_tech',
      github: 'github.com/alirezaei'
    }
  });

  const [tempData, setTempData] = useState({});

  // Food categories
  const foodCategories = useMemo(() => [
    { value: 'پیش غذا', label: 'پیش غذا', icon: <PiSparkle className="text-blue-500" /> },
    { value: 'غذای اصلی', label: 'غذای اصلی', icon: <PiFire className="text-red-500" /> },
    { value: 'نوشیدنی', label: 'نوشیدنی', icon: <PiCoffee className="text-amber-500" /> },
    { value: 'دسر', label: 'دسر', icon: <PiIceCream className="text-pink-500" /> },
    { value: 'سالاد', label: 'سالاد', icon: <PiLeaf className="text-green-500" /> },
    { value: 'ساندویچ', label: 'ساندویچ', icon: <PiHamburger className="text-orange-500" /> },
  ], []);

  // سایدبار آیتم‌ها - با برگرداندن اطلاعات شخصی
  const sidebarItems = useMemo(() => [
    // گروه اول: اطلاعات شخصی
    {
      group: 'اطلاعات شخصی',
      items: [
        { id: 'personal', name: 'پروفایل شخصی', icon: <PiUser className="text-lg" /> },
      ]
    },
    // گروه دوم: محتوای کاربر
    {
      group: 'محتوای من',
      items: [
        { id: 'menus', name: 'منوهای غذایی من', icon: <PiForkKnife className="text-lg" />, count: userData.menusCount },
        { id: 'business-cards', name: 'کارت‌های ویزیت من', icon: <PiCards className="text-lg" />, count: userData.businessCardsCount },
        { id: 'job-cards', name: 'کارت‌های مشاغل من', icon: <PiSuitcase className="text-lg" />, count: userData.jobCardsCount },
        { id: 'resumes', name: 'رزومه‌های من', icon: <PiFileText className="text-lg" />, count: userData.resumesCount },
      ]
    }
  ], [userData]);

  // Stats cards
  const stats = useMemo(() => [
    { label: 'کارت‌های ساخته شده', value: userData.cardsCreated, icon: <PiCreditCard className="text-blue-500" />, change: '+۱۲%', color: 'blue' },
    { label: 'اسکن QR کد', value: userData.qrScans, icon: <PiQrCode className="text-green-500" />, change: '+۲۳%', color: 'green' },
    { label: 'بازدید پروفایل', value: userData.profileViews, icon: <PiChartLine className="text-purple-500" />, change: '+۸%', color: 'purple' },
    { label: 'امتیاز کاربران', value: userData.customerRating, icon: <PiStar className="text-yellow-500" />, change: '+۰.۲', color: 'yellow' }
  ], [userData]);

  // محتوای کارت‌های ویزیت
  const userBusinessCards = useMemo(() => [
    {
      id: 1,
      name: 'کارت مدیرعامل',
      template: 'مدیریت حرفه‌ای',
      status: 'فعال',
      views: '۳,۴۵۶',
      created: '۱۴۰۲/۱۱/۱۰',
      downloads: '۱۲۳',
      color: 'from-purple-500 to-pink-500',
      isPremium: true
    },
    {
      id: 2,
      name: 'کارت وکیل',
      template: 'حقوقی کلاسیک',
      status: 'فعال',
      views: '۲,۱۸۹',
      created: '۱۴۰۲/۱۰/۲۸',
      downloads: '۸۷',
      color: 'from-blue-500 to-cyan-500',
      isPremium: true
    }
  ], []);

  // محتوای کارت‌های مشاغل
  const userJobCards = useMemo(() => [
    {
      id: 1,
      position: 'توسعه‌دهنده فرانت‌اند',
      company: 'شرکت نوآوران فناوری',
      status: 'فعال',
      views: '۱,۲۳۴',
      applications: '۴۵',
      created: '۱۴۰۲/۱۱/۲۰',
      color: 'from-blue-500 to-purple-500'
    },
    {
      id: 2,
      position: 'طراح UI/UX',
      company: 'استودیو طراحی مدرن',
      status: 'فعال',
      views: '۸۹۰',
      applications: '۳۲',
      created: '۱۴۰۲/۱۲/۰۱',
      color: 'from-pink-500 to-rose-500'
    }
  ], []);

  // محتوای رزومه‌ها
  const userResumes = useMemo(() => [
    {
      id: 1,
      title: 'رزومه فنی توسعه‌دهنده',
      type: 'مدرن',
      status: 'فعال',
      views: '۱,۵۶۷',
      downloads: '۸۹',
      created: '۱۴۰۲/۱۱/۱۲',
      lastUpdate: '۱۴۰۲/۱۲/۰۵',
      color: 'from-blue-500 to-indigo-500'
    },
    {
      id: 2,
      title: 'رزومه مدیریتی',
      type: 'کلاسیک',
      status: 'فعال',
      views: '۹۸۷',
      downloads: '۴۵',
      created: '۱۴۰۲/۱۰/۲۵',
      lastUpdate: '۱۴۰۲/۱۱/۳۰',
      color: 'from-purple-500 to-violet-500'
    }
  ], []);

  // Fetch user menus from API
  const fetchUserMenus = async () => {
    try {
      setLoadingMenus(true);
      setError(null);

      // دریافت منوها با پاپوله کردن غذاها
      const response = await axios.get(`${API_URL}/menus`, {
        withCredentials: true
      });

      if (response.data.success) {
        const menus = response.data.data || [];

        // برای هر منو، غذاهایش را دریافت کن
        const menusWithFoods = await Promise.all(
          menus.map(async (menu) => {
            try {
              // دریافت غذاهای مربوط به این منو
              const foodsResponse = await axios.get(`${API_URL}/foods`, {
                withCredentials: true,
                params: {
                  menuId: menu._id
                }
              });

              return {
                ...menu,
                foods: foodsResponse.data.success ? foodsResponse.data.data : []
              };
            } catch (foodError) {
              console.error(`Error fetching foods for menu ${menu._id}:`, foodError);
              return {
                ...menu,
                foods: []
              };
            }
          })
        );

        setUserMenus(menusWithFoods);

        // به‌روزرسانی تعداد منوها در userData
        setUserData(prev => ({
          ...prev,
          menusCount: menusWithFoods.length.toString()
        }));

        console.log(`✅ ${menusWithFoods.length} منو دریافت شد`);
      } else {
        throw new Error(response.data.message || 'خطا در دریافت منوها');
      }
    } catch (error) {
      console.error('Error fetching menus:', error);
      setError('خطا در دریافت منوها. لطفاً دوباره تلاش کنید.');

      // Fallback به نمونه داده برای نمایش UI
      const sampleMenus = [
        {
          _id: '1',
          title: 'منوی رستوران ایرانی',
          bussinessName: 'رستوران شاندیز',
          description: 'منوی غذاهای ایرانی با کیفیت عالی',
          icon: `${API_BASE_URL}/uploads/menus/menu-icon-1.jpg`,
          coverImage: `${API_BASE_URL}/uploads/menus/menu-cover-1.jpg`,
          foods: [
            {
              _id: 'food_1',
              title: 'چلوکباب کوبیده',
              description: 'کباب کوبیده ممتاز با برنج ایرانی',
              price: 150000,
              images: [`${API_BASE_URL}/uploads/foods/kebab.jpg`],
              ingredients: ['ایرانی', 'سنتی', 'پرفروش'],
              category: 'غذای اصلی',
              inStock: true
            },
            {
              _id: 'food_2',
              title: 'قرمه سبزی',
              description: 'خورش قرمه سبزی با لوبیا قرمز',
              price: 120000,
              images: [`${API_BASE_URL}/uploads/foods/gheymeh.jpg`],
              ingredients: ['ایرانی', 'سنتی'],
              category: 'غذای اصلی',
              inStock: true
            }
          ]
        }
      ];

      setUserMenus(sampleMenus);
      setUserData(prev => ({
        ...prev,
        menusCount: sampleMenus.length.toString()
      }));
    } finally {
      setLoadingMenus(false);
    }
  };

  useEffect(() => {
    fetchUserMenus();
  }, []);

  // Handle menu creation with API
  const handleCreateMenu = async () => {
    try {
      setUploading(true);
      setError(null);

      const formData = new FormData();
      formData.append('title', menuForm.title);
      formData.append('bussinessName', menuForm.bussinessName || userData.businessName);
      formData.append('description', menuForm.description);
      formData.append('template', 'default');

      if (menuForm.icon) {
        formData.append('icon', menuForm.icon);
      }

      if (menuForm.coverImage) {
        formData.append('coverImage', menuForm.coverImage);
      }

      const response = await axios.post(`${API_URL}/menus`, formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        // Refresh menus list
        await fetchUserMenus();

        // Close dialog and reset form
        setMenuDialogOpen(false);
        resetMenuForm();

        // Navigate to new menu
        navigate(`/menu/${response.data.data._id}`);

        // Show success message
        alert(response.data.message || 'منو با موفقیت ایجاد شد');
      } else {
        throw new Error(response.data.message || 'خطا در ایجاد منو');
      }
    } catch (error) {
      console.error('Error creating menu:', error);
      setError(error.response?.data?.message || error.message || 'خطا در ایجاد منو');
      alert(error.response?.data?.message || error.message || 'خطا در ایجاد منو');
    } finally {
      setUploading(false);
    }
  };

  // Handle food creation with API - مطابق Food Model
  const handleCreateFood = async () => {
    if (!selectedMenu) return;

    try {
      setUploading(true);
      setError(null);

      // ایجاد FormData مطابق Food Model
      const formData = new FormData();

      // فیلدهای اجباری
      formData.append('title', foodForm.title);
      formData.append('description', foodForm.description);
      formData.append('menu', selectedMenu._id);
      formData.append('price', foodForm.price);
      formData.append('inStock', foodForm.inStock.toString());

      // فیلدهای اختیاری
      if (foodForm.category) {
        formData.append('category', foodForm.category);
      }

      // تبدیل ingredients به آرایه JSON
      if (foodForm.ingredients && foodForm.ingredients.length > 0) {
        // اگر می‌خواهید آرایه را به صورت رشته JSON ارسال کنید
        formData.append('ingredients', JSON.stringify(foodForm.ingredients));
      }

      // اضافه کردن تصویر (با نام فیلد images مطابق schema)
      if (foodForm.images) {
        formData.append('images', foodForm.images);
      }

      console.log('📤 ارسال غذا برای ایجاد...', {
        title: foodForm.title,
        menu: selectedMenu._id,
        price: foodForm.price,
        ingredients: foodForm.ingredients
      });

      // ارسال درخواست به API
      const response = await axios.post(`${API_URL}/foods`, formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        // Refresh menus list
        await fetchUserMenus();

        // Close dialog and reset form
        setFoodDialogOpen(false);
        resetFoodForm();
        setSelectedMenu(null);

        // Show success message
        alert('غذا با موفقیت ایجاد و به منو اضافه شد!');

        console.log('✅ غذا ایجاد شد:', {
          foodId: response.data.data._id,
          menuId: selectedMenu._id,
          title: response.data.data.title
        });
      } else {
        throw new Error(response.data.message || 'خطا در ایجاد غذا');
      }
    } catch (error) {
      console.error('❌ Error creating food:', error);

      // نمایش خطای دقیق‌تر
      const errorMessage = error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        'خطا در ایجاد غذا';

      setError(errorMessage);
      alert(`خطا: ${errorMessage}`);

      // نمایش جزئیات خطا برای دیباگ
      if (error.response?.data?.validationErrors) {
        console.log('Validation Errors:', error.response.data.validationErrors);
      }
    } finally {
      setUploading(false);
    }
  };

  // Handle menu deletion with API
  const handleDeleteMenu = async (menuId) => {
    if (!window.confirm('آیا از حذف این منو مطمئن هستید؟ تمام غذاهای این منو نیز حذف خواهند شد.')) {
      return;
    }

    try {
      setError(null);

      const response = await axios.delete(`${API_URL}/menus/${menuId}`, {
        withCredentials: true
      });

      if (response.data.success) {
        // Refresh menus list
        await fetchUserMenus();

        // Show success message
        alert(response.data.message || 'منو با موفقیت حذف شد!');
      } else {
        throw new Error(response.data.message || 'خطا در حذف منو');
      }
    } catch (error) {
      console.error('Error deleting menu:', error);
      setError(error.response?.data?.message || error.message || 'خطا در حذف منو');
      alert(error.response?.data?.message || error.message || 'خطا در حذف منو');
    }
  };

  // Handle food deletion with API
  const handleDeleteFood = async (menuId, foodId) => {
    if (!window.confirm('آیا از حذف این غذا مطمئن هستید؟')) {
      return;
    }

    try {
      setError(null);

      const response = await axios.delete(`${API_URL}/foods/${foodId}`, {
        withCredentials: true
      });

      if (response.data.success) {
        // Refresh menus list
        await fetchUserMenus();

        // Show success message
        alert('غذا با موفقیت حذف شد!');
      } else {
        throw new Error(response.data.message || 'خطا در حذف غذا');
      }
    } catch (error) {
      console.error('Error deleting food:', error);
      setError(error.response?.data?.message || error.message || 'خطا در حذف غذا');
      alert(error.response?.data?.message || error.message || 'خطا در حذف غذا');
    }
  };

  // Form handlers
  const resetMenuForm = () => {
    setMenuForm({
      title: '',
      bussinessName: '',
      description: '',
      icon: null,
      coverImage: null
    });
    setError(null);
  };

  // Reset food form - مطابق Food Model
  const resetFoodForm = () => {
    setFoodForm({
      title: '',
      description: '',
      price: '',
      category: 'غذای اصلی',
      ingredients: [],
      images: null,
      inStock: true,
      menu: ''
    });
    setEditingFood(null);
    setError(null);
  };

  const handleMenuInputChange = (field, value) => {
    setMenuForm(prev => ({ ...prev, [field]: value }));
    setError(null);
  };

  // Handle food input change - مطابق Food Model
  const handleFoodInputChange = (field, value) => {
    setFoodForm(prev => ({ ...prev, [field]: value }));
    setError(null);
  };

  // Handle ingredient input
  const handleIngredientInput = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const ingredient = e.target.value.trim();
      if (ingredient && !foodForm.ingredients.includes(ingredient)) {
        setFoodForm(prev => ({
          ...prev,
          ingredients: [...prev.ingredients, ingredient]
        }));
        e.target.value = '';
      }
    }
  };

  const removeIngredient = (ingredientToRemove) => {
    setFoodForm(prev => ({
      ...prev,
      ingredients: prev.ingredients.filter(ingredient => ingredient !== ingredientToRemove)
    }));
  };

  const handleFileUpload = (field, file, isMenu = true) => {
    if (isMenu) {
      setMenuForm(prev => ({ ...prev, [field]: file }));
    } else {
      // برای غذا، فیلد images را تنظیم می‌کنیم
      setFoodForm(prev => ({ ...prev, images: file }));
    }
    setError(null);
  };

  // Open food dialog for a specific menu - لینک به صفحه جدید
  const openFoodDialog = (menu) => {
    navigate(`/add-food/${menu._id}`);
  };

  // Open edit food dialog - با فیلدهای Food Model
  const openEditFoodDialog = (menu, food) => {
    setSelectedMenu(menu);
    setEditingFood(food);
    setFoodForm({
      title: food.title,
      description: food.description,
      price: food.price.toString(),
      category: food.category || 'غذای اصلی',
      ingredients: food.ingredients || [],
      images: null, // برای ویرایش، تصویر جدید اختیاری است
      inStock: food.inStock !== false,
      menu: food.menu || menu._id
    });
    setFoodDialogOpen(true);
  };

  // Update existing food with API - با فیلدهای Food Model
  const handleUpdateFood = async () => {
    if (!selectedMenu || !editingFood) return;

    try {
      setUploading(true);
      setError(null);

      const formData = new FormData();
      formData.append('title', foodForm.title);
      formData.append('description', foodForm.description);
      formData.append('price', foodForm.price);
      formData.append('category', foodForm.category);
      formData.append('inStock', foodForm.inStock.toString());
      formData.append('menu', foodForm.menu);

      // اضافه کردن ingredients
      if (foodForm.ingredients && foodForm.ingredients.length > 0) {
        formData.append('ingredients', JSON.stringify(foodForm.ingredients));
      }

      // اگر تصویر جدید آپلود شده است
      if (foodForm.images) {
        formData.append('images', foodForm.images);
      }

      const response = await axios.put(`${API_URL}/foods/${editingFood._id}`, formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        // Refresh menus list
        await fetchUserMenus();

        // Close dialog and reset form
        setFoodDialogOpen(false);
        resetFoodForm();
        setSelectedMenu(null);
        setEditingFood(null);

        // Show success message
        alert('غذا با موفقیت ویرایش شد!');
      } else {
        throw new Error(response.data.message || 'خطا در ویرایش غذا');
      }
    } catch (error) {
      console.error('Error updating food:', error);
      setError(error.response?.data?.message || error.message || 'خطا در ویرایش غذا');
      alert(error.response?.data?.message || error.message || 'خطا در ویرایش غذا');
    } finally {
      setUploading(false);
    }
  };

  // Handle edit/save for user data with API
  const handleEdit = useCallback(() => {
    setTempData(userData);
    setIsEditing(true);
  }, [userData]);

  const handleSave = async () => {
    try {
      const response = await axios.put(`${API_URL}/users/profile`, tempData, {
        withCredentials: true
      });

      if (response.data.success) {
        setUserData(tempData);
        setIsEditing(false);
        setTempData({});
        alert('اطلاعات با موفقیت ذخیره شد!');
      }
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('خطا در ذخیره اطلاعات');
    }
  };

  const handleCancel = useCallback(() => {
    setIsEditing(false);
    setTempData({});
  }, []);

  const handleInputChange = useCallback((field, value) => {
    setTempData(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  // Handle sidebar item click
  const handleSidebarClick = (itemId) => {
    setActiveTab(itemId);
  };

  // Toggle notifications
  const toggleNotification = useCallback((key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  }, []);

  // Toggle security settings
  const toggleSecurity = useCallback((key) => {
    setSecurity(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  }, []);

  // Render personal info
  const renderPersonalInfo = () => (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6 p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-500/5 dark:to-purple-500/5 rounded-2xl border border-blue-200/50 dark:border-blue-800/50">
        <div className="relative">
          <div className="w-24 h-24 rounded-2xl overflow-hidden border-4 border-white dark:border-gray-800 shadow-xl">
            <img
              src={userData.avatar}
              alt={userData.name}
              className="w-full h-full object-cover"
            />
          </div>
          <button className="absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full flex items-center justify-center shadow-lg border-2 border-white dark:border-gray-800 hover:scale-110 transition-transform duration-200">
            <PiCamera className="text-lg" />
          </button>
        </div>

        <div className="flex-1 text-right">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-3">
            <div>
              <h2 className="text-2xl font-black text-gray-800 dark:text-white mb-2">
                {isEditing ? (
                  <input
                    type="text"
                    value={tempData.name || userData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm rounded-xl px-3 py-2 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full max-w-md"
                  />
                ) : (
                  userData.name
                )}
              </h2>
              <div className="flex items-center gap-3 flex-wrap">
                <span className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                  <PiSparkle className="text-sm" />
                  کاربر ویژه
                </span>
                <span className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                  <PiCheckCircle className="text-sm" />
                  تایید شده
                </span>
              </div>
            </div>
          </div>

          <p className="text-gray-600 dark:text-gray-400">
            {isEditing ? (
              <textarea
                value={tempData.bio || userData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                className="bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm rounded-xl px-3 py-2 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full resize-none"
                rows="3"
              />
            ) : (
              userData.bio
            )}
          </p>
        </div>
      </div>

      {/* Contact Information Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-white/30 dark:border-gray-700 shadow-lg">
          <h3 className="text-lg font-black text-gray-800 dark:text-white mb-4 flex items-center gap-2">
            <PiEnvelope className="text-blue-500" />
            اطلاعات تماس
          </h3>

          <div className="space-y-4">
            {[
              { icon: <PiEnvelope />, label: 'ایمیل', value: userData.email, field: 'email', color: 'text-blue-500' },
              { icon: <PiPhone />, label: 'تلفن', value: userData.phone, field: 'phone', color: 'text-green-500' },
              { icon: <PiMapPin />, label: 'موقعیت', value: userData.location, field: 'location', color: 'text-purple-500' },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3 p-3 bg-gray-50/80 dark:bg-gray-700/80 rounded-xl">
                <div className={`w-10 h-10 ${item.color.replace('text-', 'bg-')}/20 rounded-xl flex items-center justify-center`}>
                  {item.icon}
                </div>
                <div className="flex-1 text-right">
                  <div className="text-sm text-gray-600 dark:text-gray-400">{item.label}</div>
                  {isEditing ? (
                    <input
                      type={item.label === 'ایمیل' ? 'email' : 'text'}
                      value={tempData[item.field] || item.value}
                      onChange={(e) => handleInputChange(item.field, e.target.value)}
                      className="bg-transparent border-none focus:outline-none w-full text-gray-800 dark:text-white"
                    />
                  ) : (
                    <div className="font-medium text-gray-800 dark:text-white">{item.value}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-white/30 dark:border-gray-700 shadow-lg">
          <h3 className="text-lg font-black text-gray-800 dark:text-white mb-4">آمار سریع</h3>
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="bg-gradient-to-br from-white/50 to-white/30 dark:from-gray-700/50 dark:to-gray-600/30 rounded-xl p-4 border border-white/50 dark:border-gray-600/50 text-center">
                <div className="flex justify-center mb-2">
                  <div className="w-10 h-10 rounded-full bg-white dark:bg-gray-600 flex items-center justify-center">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-2xl font-black text-gray-800 dark:text-white mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
                <div className={`text-xs mt-1 ${stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                  {stat.change}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Render menus with food management - با لینک به صفحه جدید
  const renderMenus = () => (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-2xl font-black text-gray-800 dark:text-white">منوهای غذایی من</h3>
          <p className="text-gray-600 dark:text-gray-400">
            مدیریت منوها و غذاها ({userMenus.length} منو، مجموعاً {userMenus.reduce((total, menu) => total + (menu.foods?.length || 0), 0)} غذا)
          </p>
        </div>
        <button
          onClick={() => setMenuDialogOpen(true)}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
        >
          <PiPlus className="text-lg" />
          ایجاد منو جدید
        </button>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
          <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
            <PiShieldWarning className="text-lg" />
            <span>{error}</span>
          </div>
        </div>
      )}

      {loadingMenus ? (
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-12 border border-white/30 dark:border-gray-700 shadow-lg flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">در حال بارگذاری منوها...</p>
          </div>
        </div>
      ) : userMenus.length === 0 ? (
        <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 dark:from-blue-500/5 dark:to-purple-500/5 rounded-2xl border-2 border-dashed border-blue-300 dark:border-blue-700 flex flex-col items-center justify-center p-12 text-center">
          <div className="w-20 h-20 bg-blue-500/20 dark:bg-blue-500/10 rounded-full flex items-center justify-center mb-6">
            <PiForkKnife className="text-blue-500 text-3xl" />
          </div>
          <h4 className="font-black text-gray-800 dark:text-white text-xl mb-3">هنوز منویی ایجاد نکرده‌اید!</h4>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
            اولین منوی غذایی خود را ایجاد کنید و شروع به اضافه کردن غذاها کنید.
          </p>
          <button
            onClick={() => setMenuDialogOpen(true)}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
          >
            <PiPlus className="text-lg" />
            ایجاد اولین منو
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          {userMenus.map((menu) => (
            <div key={menu._id} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-white/30 dark:border-gray-700 shadow-lg">
              {/* Menu Header */}
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-xl overflow-hidden">
                      <img
                        src={menu.icon || `${API_BASE_URL}/uploads/default/menu-icon.png`}
                        alt={menu.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-right">
                      <h4 className="font-black text-gray-800 dark:text-white text-lg mb-1">{menu.title}</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{menu.bussinessName}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="bg-green-500/20 text-green-600 dark:text-green-400 text-xs px-2 py-1 rounded-full">
                          {menu.status || 'فعال'}
                        </span>
                        <span className="text-gray-500 dark:text-gray-400 text-xs">
                          {menu.foods?.length || 0} غذا
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      to={`/menu/${menu._id}/foods`}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-bold transition-all duration-300 text-sm flex items-center gap-2"
                    >
                      <PiEyeOpen />
                      مشاهده منو
                    </Link>
                    <Link
                      to={`/add-food/${menu._id}`}
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-bold transition-all duration-300 text-sm flex items-center gap-2"
                    >
                      <PiPlus />
                      اضافه کردن غذا
                    </Link>
                    <button
                      onClick={() => handleDeleteMenu(menu._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-bold transition-all duration-300 text-sm flex items-center gap-2"
                    >
                      <PiTrash />
                      حذف منو
                    </button>
                  </div>
                </div>
              </div>

              {/* Menu Foods */}
              <div className="p-6">
                {(!menu.foods || menu.foods.length === 0) ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                      <PiForkKnife className="text-gray-400 text-2xl" />
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">هنوز غذایی به این منو اضافه نکرده‌اید</p>
                    <Link
                      to={`/add-food/${menu._id}`}
                      className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-2 rounded-lg font-bold transition-all duration-300 text-sm flex items-center gap-2 mx-auto"
                    >
                      <PiPlus />
                      اضافه کردن اولین غذا
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* نمایش غذاها بر اساس دسته‌بندی */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between mb-4">
                        <h5 className="font-bold text-gray-800 dark:text-white text-lg">لیست غذاها</h5>
                        <span className="bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs px-2 py-1 rounded-full">
                          {menu.foods.length} غذا
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {menu.foods.map((food, foodIndex) => (
                          <div key={food._id || foodIndex} className="bg-white dark:bg-gray-700 rounded-xl p-4 border border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500 transition-all duration-300 hover:shadow-lg">
                            <div className="flex gap-3">
                              <div className="relative w-16 h-16 flex-shrink-0">
                                <img
                                  src={food.images && food.images.length > 0
                                    ? food.images[0]
                                    : `${API_BASE_URL}/uploads/default/food-image.jpg`}
                                  alt={food.title}
                                  className="w-full h-full object-cover rounded-lg"
                                />
                                {!food.inStock && (
                                  <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                                    <span className="text-white text-xs font-bold">نا موجود</span>
                                  </div>
                                )}
                              </div>

                              <div className="flex-1 text-right">
                                <div className="flex items-start justify-between mb-1">
                                  <div className="flex items-center gap-1">
                                    <button
                                      onClick={() => openEditFoodDialog(menu, food)}
                                      className="text-blue-500 hover:text-blue-600"
                                      title="ویرایش غذا"
                                    >
                                      <PiUserCheck className="text-sm" />
                                    </button>
                                    <button
                                      onClick={() => handleDeleteFood(menu._id, food._id)}
                                      className="text-red-500 hover:text-red-600"
                                      title="حذف غذا"
                                    >
                                      <PiTrash className="text-sm" />
                                    </button>
                                  </div>
                                  <h6 className="font-bold text-gray-800 dark:text-white">{food.title}</h6>
                                </div>

                                <p className="text-gray-600 dark:text-gray-400 text-xs mb-2 line-clamp-2">
                                  {food.description}
                                </p>

                                {food.category && (
                                  <div className="mb-2">
                                    <span className="bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 text-xs px-2 py-0.5 rounded-full">
                                      {food.category}
                                    </span>
                                  </div>
                                )}

                                <div className="flex items-center justify-between">
                                  <div className="flex gap-1 flex-wrap">
                                    {food.ingredients?.slice(0, 2).map((ingredient, idx) => (
                                      <span key={idx} className="bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs px-2 py-0.5 rounded-full">
                                        #{ingredient}
                                      </span>
                                    ))}
                                    {food.ingredients && food.ingredients.length > 2 && (
                                      <span className="text-gray-500 text-xs">
                                        +{food.ingredients.length - 2}
                                      </span>
                                    )}
                                  </div>
                                  <div className="text-left">
                                    <div className="font-bold text-gray-800 dark:text-white">
                                      {food.price?.toLocaleString() || '۰'} تومان
                                    </div>
                                    <div className={`text-xs ${food.inStock ? 'text-green-500' : 'text-red-500'}`}>
                                      {food.inStock ? 'موجود' : 'نا موجود'}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  // بقیه توابع render (businessInfo, subscriptionInfo, businessCards, jobCards, resumes)
  // بدون تغییر باقی می‌مانند...

  // Menu Creation Dialog
  const renderMenuDialog = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-2xl p-6 max-w-2xl w-full border border-white/30 dark:border-gray-700 shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-black text-gray-800 dark:text-white">ایجاد منوی جدید</h3>
          <button
            onClick={() => {
              setMenuDialogOpen(false);
              resetMenuForm();
            }}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <PiX className="text-xl" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Menu Icon Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-800 dark:text-white mb-2">
              آیکون منو
            </label>
            <div className="flex items-center gap-4">
              {menuForm.icon ? (
                <div className="relative">
                  <img
                    src={URL.createObjectURL(menuForm.icon)}
                    alt="Preview"
                    className="w-24 h-24 rounded-xl object-cover"
                  />
                  <button
                    onClick={() => setMenuForm(prev => ({ ...prev, icon: null }))}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center"
                  >
                    <PiX className="text-xs" />
                  </button>
                </div>
              ) : (
                <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600">
                  <PiImage className="text-gray-400 text-2xl" />
                </div>
              )}
              <div>
                <label className="cursor-pointer bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-2 rounded-lg font-bold transition-all duration-300 text-sm flex items-center gap-2">
                  <PiUploadSimple />
                  آپلود آیکون
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => e.target.files[0] && handleFileUpload('icon', e.target.files[0])}
                  />
                </label>
                <p className="text-gray-500 dark:text-gray-400 text-xs mt-2">فرمت‌های مجاز: JPG, PNG, GIF</p>
              </div>
            </div>
          </div>

          {/* Cover Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-800 dark:text-white mb-2">
              تصویر کاور
            </label>
            <div className="flex items-center gap-4">
              {menuForm.coverImage ? (
                <div className="relative">
                  <img
                    src={URL.createObjectURL(menuForm.coverImage)}
                    alt="Preview"
                    className="w-32 h-20 rounded-xl object-cover"
                  />
                  <button
                    onClick={() => setMenuForm(prev => ({ ...prev, coverImage: null }))}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center"
                  >
                    <PiX className="text-xs" />
                  </button>
                </div>
              ) : (
                <div className="w-32 h-20 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600">
                  <PiImage className="text-gray-400 text-2xl" />
                </div>
              )}
              <div>
                <label className="cursor-pointer bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-2 rounded-lg font-bold transition-all duration-300 text-sm flex items-center gap-2">
                  <PiUploadSimple />
                  آپلود کاور
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => e.target.files[0] && handleFileUpload('coverImage', e.target.files[0])}
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Menu Title */}
          <div>
            <label className="block text-sm font-medium text-gray-800 dark:text-white mb-2">
              عنوان منو *
            </label>
            <input
              type="text"
              value={menuForm.title}
              onChange={(e) => handleMenuInputChange('title', e.target.value)}
              className="w-full bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm rounded-xl px-4 py-3 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-white"
              placeholder="مثلاً: منوی رستوران ایرانی"
            />
          </div>

          {/* Business Name */}
          <div>
            <label className="block text-sm font-medium text-gray-800 dark:text-white mb-2">
              نام کسب‌وکار
            </label>
            <input
              type="text"
              value={menuForm.bussinessName}
              onChange={(e) => handleMenuInputChange('bussinessName', e.target.value)}
              className="w-full bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm rounded-xl px-4 py-3 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-white"
              placeholder={userData.businessName}
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-800 dark:text-white mb-2">
              توضیحات
            </label>
            <textarea
              value={menuForm.description}
              onChange={(e) => handleMenuInputChange('description', e.target.value)}
              className="w-full bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm rounded-xl px-4 py-3 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-white resize-none"
              rows="3"
              placeholder="توضیحات مختصر درباره منو..."
            />
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-3">
              <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                <PiShieldWarning className="text-lg" />
                <span className="text-sm">{error}</span>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={handleCreateMenu}
              disabled={!menuForm.title || uploading}
              className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2"
            >
              {uploading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  در حال ایجاد...
                </>
              ) : (
                <>
                  <PiCheck />
                  ایجاد منو
                </>
              )}
            </button>
            <button
              onClick={() => {
                setMenuDialogOpen(false);
                resetMenuForm();
              }}
              className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-xl font-bold transition-all duration-300"
            >
              انصراف
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Food Creation/Edit Dialog (برای ویرایش غذاها)
  const renderFoodDialog = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-2xl p-6 max-w-2xl w-full border border-white/30 dark:border-gray-700 shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-black text-gray-800 dark:text-white">
            {editingFood ? 'ویرایش غذا' : 'اضافه کردن غذا'}
          </h3>
          <button
            onClick={() => {
              setFoodDialogOpen(false);
              resetFoodForm();
            }}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <PiX className="text-xl" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Selected Menu Info */}
          {selectedMenu && (
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg overflow-hidden">
                  <img
                    src={selectedMenu.icon || `${API_BASE_URL}/uploads/default/menu-icon.png`}
                    alt={selectedMenu.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-right">
                  <div className="font-medium text-gray-800 dark:text-white">
                    {selectedMenu.title}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {editingFood ? 'در حال ویرایش غذا' : 'در حال اضافه کردن غذا'}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Food Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-800 dark:text-white mb-2">
              تصویر غذا
            </label>
            <div className="flex items-center gap-4">
              {foodForm.images ? (
                <div className="relative">
                  <img
                    src={typeof foodForm.images === 'string' ? foodForm.images : URL.createObjectURL(foodForm.images)}
                    alt="Preview"
                    className="w-24 h-24 rounded-xl object-cover"
                  />
                  <button
                    onClick={() => setFoodForm(prev => ({ ...prev, images: null }))}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center"
                  >
                    <PiX className="text-xs" />
                  </button>
                </div>
              ) : (
                <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600">
                  <PiImage className="text-gray-400 text-2xl" />
                </div>
              )}
              <div>
                <label className="cursor-pointer bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-2 rounded-lg font-bold transition-all duration-300 text-sm flex items-center gap-2">
                  <PiUploadSimple />
                  آپلود تصویر
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => e.target.files[0] && handleFileUpload('images', e.target.files[0], false)}
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Food Name */}
          <div>
            <label className="block text-sm font-medium text-gray-800 dark:text-white mb-2">
              نام غذا *
            </label>
            <input
              type="text"
              value={foodForm.title}
              onChange={(e) => handleFoodInputChange('title', e.target.value)}
              className="w-full bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm rounded-xl px-4 py-3 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-white"
              placeholder="مثلاً: چلوکباب کوبیده"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-800 dark:text-white mb-2">
              توضیحات *
            </label>
            <textarea
              value={foodForm.description}
              onChange={(e) => handleFoodInputChange('description', e.target.value)}
              className="w-full bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm rounded-xl px-4 py-3 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-white resize-none"
              rows="3"
              placeholder="توضیحات درباره غذا، مواد اولیه، طعم و..."
            />
          </div>

          {/* Price and Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-800 dark:text-white mb-2">
                قیمت (تومان) *
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={foodForm.price}
                  onChange={(e) => handleFoodInputChange('price', e.target.value)}
                  className="w-full bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm rounded-xl px-4 py-3 pl-10 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-white"
                  placeholder="مثلاً: ۱۵۰۰۰۰"
                  min="0"
                />
                <PiCurrencyDollar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-800 dark:text-white mb-2">
                دسته‌بندی
              </label>
              <select
                value={foodForm.category}
                onChange={(e) => handleFoodInputChange('category', e.target.value)}
                className="w-full bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm rounded-xl px-4 py-3 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-white"
              >
                {foodCategories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Ingredients */}
          <div>
            <label className="block text-sm font-medium text-gray-800 dark:text-white mb-2">
              مواد اولیه (کلید Enter یا کاما برای اضافه کردن)
            </label>
            <input
              type="text"
              onKeyDown={handleIngredientInput}
              className="w-full bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm rounded-xl px-4 py-3 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-white"
              placeholder="مثلاً: گوجه‌فرنگی، پیاز، گوشت"
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {foodForm.ingredients.map((ingredient, index) => (
                <div
                  key={index}
                  className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full text-sm flex items-center gap-1"
                >
                  <PiTag className="text-xs" />
                  {ingredient}
                  <button
                    onClick={() => removeIngredient(ingredient)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <PiX className="text-xs" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Availability */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-800 dark:text-white mb-2">
              وضعیت موجودی
            </label>
            <div className="flex flex-wrap gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={foodForm.inStock}
                  onChange={(e) => handleFoodInputChange('inStock', e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-800 dark:text-white">موجود</span>
              </label>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-3">
              <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                <PiShieldWarning className="text-lg" />
                <span className="text-sm">{error}</span>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={editingFood ? handleUpdateFood : handleCreateFood}
              disabled={!foodForm.title || !foodForm.price || !foodForm.description || uploading}
              className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2"
            >
              {uploading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  در حال پردازش...
                </>
              ) : editingFood ? (
                <>
                  <PiCheck />
                  ذخیره تغییرات
                </>
              ) : (
                <>
                  <PiPlus />
                  {selectedMenu ? 'اضافه کردن به منو' : 'ایجاد غذا'}
                </>
              )}
            </button>
            <button
              onClick={() => {
                setFoodDialogOpen(false);
                resetFoodForm();
              }}
              className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-xl font-bold transition-all duration-300"
            >
              انصراف
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section
      className="min-h-screen relative overflow-hidden pt-20 pb-12 md:pt-28 md:pb-16 bg-gradient-to-br from-gray-50/95 via-blue-50/95 to-purple-50/95 dark:from-gray-900/95 dark:via-blue-900/20 dark:to-purple-900/20 backdrop-blur-sm"
      aria-label="پروفایل کاربری"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-8 left-8 w-64 h-64 md:w-80 md:h-80 bg-blue-300 dark:bg-blue-600 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '0s' }} />
        <div className="absolute bottom-8 right-8 w-64 h-64 md:w-80 md:h-80 bg-purple-300 dark:bg-purple-600 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="pt-20 pb-8">
          {/* Header with Back Button */}
          <div className="mb-8">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white font-bold mb-6 transition-colors duration-200 group"
            >
              <PiArrowLeft className="group-hover:-translate-x-1 transition-transform duration-200" />
              بازگشت
            </button>

            <div className="text-center mb-8">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight mb-4">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
                  پروفایل کاربری
                </span>
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
                مدیریت اطلاعات شخصی، تنظیمات حساب و آمار فعالیت‌ها
              </p>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* سایدبار - با اطلاعات شخصی */}
            <div className="lg:w-1/4">
              <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 dark:border-gray-700 p-4 sticky top-28">
                {/* User Profile Summary */}
                <div className="p-4 mb-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-500/5 dark:to-purple-500/5 rounded-2xl border border-blue-200/50 dark:border-blue-800/50">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-xl overflow-hidden border-2 border-white dark:border-gray-800">
                      <img
                        src={userData.avatar}
                        alt={userData.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-right flex-1">
                      <div className="font-black text-gray-800 dark:text-white text-sm">{userData.name}</div>
                      <div className="text-gray-600 dark:text-gray-400 text-xs">{userData.position}</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-2 py-1 rounded-lg text-xs font-bold">
                      {userData.plan}
                    </span>
                    <span className="text-gray-600 dark:text-gray-400 text-xs">
                      {userData.planExpiry}
                    </span>
                  </div>
                </div>

                {/* Sidebar Navigation - اطلاعات شخصی + محتوای من */}
                <nav className="space-y-2">
                  {sidebarItems.map((group, groupIndex) => (
                    <div key={groupIndex} className="mb-6">
                      <div className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 px-2">
                        {group.group}
                      </div>
                      <div className="space-y-1">
                        {group.items.map((item) => (
                          <button
                            key={item.id}
                            onClick={() => handleSidebarClick(item.id)}
                            className={`w-full flex items-center justify-between px-3 py-3 rounded-xl transition-all duration-300 ${activeTab === item.id
                              ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                              : 'text-gray-600 dark:text-gray-400 hover:bg-white/50 dark:hover:bg-gray-700/50'
                              }`}
                          >
                            <div className="flex items-center gap-3">
                              {item.icon}
                              <span className="font-medium">{item.name}</span>
                            </div>
                            {item.count && (
                              <span className={`px-2 py-1 rounded-full text-xs font-bold ${activeTab === item.id
                                ? 'bg-white/30 text-white'
                                : 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                                }`}>
                                {item.count}
                              </span>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </nav>

                {/* Quick Stats */}
                <div className="mt-8 p-4 bg-gray-50/80 dark:bg-gray-700/80 rounded-2xl">
                  <div className="text-sm font-bold text-gray-800 dark:text-white mb-3">آمار سریع</div>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { label: 'منوها', value: userData.menusCount, color: 'text-blue-500' },
                      { label: 'کارت‌ها', value: userData.businessCardsCount, color: 'text-purple-500' },
                      { label: 'مشاغل', value: userData.jobCardsCount, color: 'text-green-500' },
                      { label: 'رزومه', value: userData.resumesCount, color: 'text-orange-500' },
                    ].map((stat, index) => (
                      <div key={index} className="text-center">
                        <div className={`text-xl font-black ${stat.color}`}>{stat.value}</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* محتوای اصلی */}
            <div className="lg:w-3/4">
              <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 dark:border-gray-700 p-6">
                {/* Edit/Save Buttons برای اطلاعات شخصی */}
                {activeTab === 'personal' && (
                  <div className="flex justify-end gap-2 mb-6">
                    {isEditing ? (
                      <>
                        <button
                          onClick={handleSave}
                          className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-4 py-3 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
                        >
                          <PiCheckCircle className="text-lg" />
                          ذخیره تغییرات
                        </button>
                        <button
                          onClick={handleCancel}
                          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-3 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
                        >
                          انصراف
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={handleEdit}
                        className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white px-4 py-3 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
                      >
                        <PiPencil className="text-lg" />
                        ویرایش اطلاعات
                      </button>
                    )}
                  </div>
                )}

                {/* Content */}
                {activeTab === 'personal' && renderPersonalInfo()}
                {activeTab === 'menus' && renderMenus()}
                {/* سایر تب‌ها */}
                {(activeTab === 'business-cards' || activeTab === 'job-cards' || activeTab === 'resumes') && (
                  <div className="text-center py-12">
                    <div className="text-4xl mb-4">🔧</div>
                    <h3 className="text-xl font-black text-gray-800 dark:text-white mb-2">این بخش در دسترس نیست</h3>
                    <p className="text-gray-600 dark:text-gray-400">این بخش به زودی اضافه خواهد شد.</p>
                    <button
                      onClick={() => setActiveTab('personal')}
                      className="mt-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-2 rounded-xl font-bold transition-all duration-300"
                    >
                      بازگشت به پروفایل
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dialogs */}
      {menuDialogOpen && renderMenuDialog()}
      {foodDialogOpen && renderFoodDialog()}

      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 0.2;
            transform: scale(1);
          }
          50% {
            opacity: 0.3;
            transform: scale(1.05);
          }
        }
        .animate-pulse {
          animation: pulse 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Profile;