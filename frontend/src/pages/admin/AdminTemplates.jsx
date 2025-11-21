// pages/AdminTemplates.js
import React, { useState, useEffect } from 'react';
import { 
  PiShield, 
  PiBell,
  PiSparkle,
  PiPlus,
  PiMagnifyingGlass,
  PiFunnel,
  PiEye,
  PiPencil,
  PiTrash,
  PiExport,
  PiDownload,
  PiStorefront,
  PiTrendUp,
  PiTrendDown,
  PiChartLine,
  PiChartPieSlice,
  PiUsers,
  PiUserCircle,
  PiQrCode,
  PiMoney,
  PiGear,
  PiList,
  PiX,
  PiCrown,
  PiShootingStar,
  PiConfetti,
  PiCheckCircle,
  PiClock,
  PiStar,
  PiShoppingCart,
  PiHeart,
  PiWarning,
  PiInfo,
  PiMagicWand,
  PiPaintBrush,
  PiRocket,
  PiMedal,
  PiLightning,
  PiShieldCheck
} from 'react-icons/pi';

const AdminTemplates = ({ onNavigate }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedTemplates, setSelectedTemplates] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const templates = [
    {
      id: 1,
      name: 'رستوران لوکس',
      category: 'رستوران',
      status: 'فعال',
      price: '۱,۲۰۰,۰۰۰',
      oldPrice: '۱,۵۰۰,۰۰۰',
      sales: 89,
      rating: 4.9,
      reviews: 127,
      downloads: 234,
      created: '۱۴۰۲/۱۰/۱۵',
      lastUpdate: '۳ روز پیش',
      features: ['سفارش آنلاین', 'مدیریت موجودی', 'گزارش‌گیری'],
      gradient: 'from-orange-500 to-red-500',
      bgGradient: 'bg-gradient-to-br from-orange-50/80 via-red-50/60 to-white',
      popular: true,
      badge: 'پرطرفدار',
      growth: '+۲۳٪'
    },
    {
      id: 2,
      name: 'کارت پزشکی',
      category: 'پزشکی',
      status: 'فعال',
      price: '۹۰۰,۰۰۰',
      oldPrice: '۱,۲۰۰,۰۰۰',
      sales: 64,
      rating: 4.7,
      reviews: 89,
      downloads: 187,
      created: '۱۴۰۲/۱۰/۱۴',
      lastUpdate: '۱ هفته پیش',
      features: ['نوبت‌گیری', 'نمایش تخصص', 'مسیریابی'],
      gradient: 'from-green-500 to-teal-500',
      bgGradient: 'bg-gradient-to-br from-green-50/80 via-teal-50/60 to-white',
      popular: false,
      badge: 'جدید',
      growth: '+۱۸٪'
    },
    {
      id: 3,
      name: 'رزومه حرفه‌ای',
      category: 'شخصی',
      status: 'فعال',
      price: '۷۵۰,۰۰۰',
      oldPrice: '۹۰۰,۰۰۰',
      sales: 112,
      rating: 4.8,
      reviews: 156,
      downloads: 298,
      created: '۱۴۰۲/۱۰/۱۳',
      lastUpdate: '۲ روز پیش',
      features: ['اشتراک آسان', 'نمایش مهارت', 'پورتفولیو'],
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'bg-gradient-to-br from-blue-50/80 via-cyan-50/60 to-white',
      popular: true,
      badge: 'پرطرفدار',
      growth: '+۳۲٪'
    },
    {
      id: 4,
      name: 'کسب‌وکار پیشرفته',
      category: 'کسب‌وکار',
      status: 'غیرفعال',
      price: '۶۰۰,۰۰۰',
      oldPrice: '۸۰۰,۰۰۰',
      sales: 45,
      rating: 4.6,
      reviews: 78,
      downloads: 123,
      created: '۱۴۰۲/۱۰/۱۲',
      lastUpdate: '۲ هفته پیش',
      features: ['ذخیره مخاطب', 'شبکه اجتماعی', 'آنالیز'],
      gradient: 'from-purple-500 to-pink-500',
      bgGradient: 'bg-gradient-to-br from-purple-50/80 via-pink-50/60 to-white',
      popular: false,
      badge: 'اقتصادی',
      growth: '+۸٪'
    },
    {
      id: 5,
      name: 'کافی شاپ مدرن',
      category: 'کافه',
      status: 'فعال',
      price: '۸۵۰,۰۰۰',
      oldPrice: '۱,۱۰۰,۰۰۰',
      sales: 76,
      rating: 4.5,
      reviews: 94,
      downloads: 201,
      created: '۱۴۰۲/۱۰/۱۱',
      lastUpdate: '۵ روز پیش',
      features: ['منوی تعاملی', 'سیستم رزرو', 'نظرسنجی'],
      gradient: 'from-amber-500 to-orange-500',
      bgGradient: 'bg-gradient-to-br from-amber-50/80 via-orange-50/60 to-white',
      popular: true,
      badge: 'جدید',
      growth: '+۲۷٪'
    },
    {
      id: 6,
      name: 'فروشگاه آنلاین',
      category: 'فروشگاهی',
      status: 'فعال',
      price: '۱,۵۰۰,۰۰۰',
      oldPrice: '۲,۰۰۰,۰۰۰',
      sales: 34,
      rating: 4.4,
      reviews: 67,
      downloads: 145,
      created: '۱۴۰۲/۱۰/۱۰',
      lastUpdate: '۴ روز پیش',
      features: ['درگاه پرداخت', 'مدیریت محصول', 'پیگیری سفارش'],
      gradient: 'from-indigo-500 to-purple-500',
      bgGradient: 'bg-gradient-to-br from-indigo-50/80 via-purple-50/60 to-white',
      popular: false,
      badge: 'پیشرفته',
      growth: '+۱۵٪'
    }
  ];

  const navigationItems = [
    { id: 'overview', name: 'داشبورد', icon: <PiChartPieSlice className="text-xl" />, badge: null },
    { id: 'users', name: 'مدیریت کاربران', icon: <PiUsers className="text-xl" />, badge: '۵' },
    { id: 'menus', name: 'منوها', icon: <PiStorefront className="text-xl" />, badge: '۶' },
    { id: 'business-cards', name: 'کارت ویزیت', icon: <PiUserCircle className="text-xl" />, badge: '۶' },
    { id: 'templates', name: 'قالب‌ها', icon: <PiSparkle className="text-xl" />, badge: '۶' },
    { id: 'qr-codes', name: 'QR کدها', icon: <PiQrCode className="text-xl" />, badge: '۸۹' },
    { id: 'analytics', name: 'آمار و گزارش', icon: <PiChartLine className="text-xl" />, badge: null },
    { id: 'payments', name: 'پرداخت‌ها', icon: <PiMoney className="text-xl" />, badge: 'جدید' },
    { id: 'settings', name: 'تنظیمات', icon: <PiGear className="text-xl" />, badge: null }
  ];

  const templateStats = [
    { 
      label: 'قالب‌های کل', 
      value: '۱۲۴', 
      change: '+۱۸٪', 
      changeValue: '۱۹',
      icon: <PiSparkle className="text-2xl" />, 
      color: 'from-blue-500 to-cyan-500',
      bgGradient: 'bg-gradient-to-br from-blue-50/80 via-cyan-50/60 to-white',
      trend: 'up'
    },
    { 
      label: 'قالب‌های فعال', 
      value: '۱۰۸', 
      change: '+۱۲٪', 
      changeValue: '۱۲',
      icon: <PiCheckCircle className="text-2xl" />, 
      color: 'from-green-500 to-emerald-500',
      bgGradient: 'bg-gradient-to-br from-green-50/80 via-emerald-50/60 to-white',
      trend: 'up'
    },
    { 
      label: 'فروش کل', 
      value: '۲,۸۹۰', 
      change: '+۲۵٪', 
      changeValue: '۵۷۸',
      icon: <PiShoppingCart className="text-2xl" />, 
      color: 'from-purple-500 to-pink-500',
      bgGradient: 'bg-gradient-to-br from-purple-50/80 via-pink-50/60 to-white',
      trend: 'up'
    },
    { 
      label: 'میانگین امتیاز', 
      value: '۴.۸/۵', 
      change: '+۰.۲', 
      changeValue: '۰.۲',
      icon: <PiStar className="text-2xl" />, 
      color: 'from-orange-500 to-amber-500',
      bgGradient: 'bg-gradient-to-br from-orange-50/80 via-amber-50/60 to-white',
      trend: 'up'
    }
  ];

  const categories = ['همه', 'رستوران', 'پزشکی', 'شخصی', 'کسب‌وکار', 'کافه', 'فروشگاهی', 'سایر'];

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || template.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || template.status === filterStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const toggleTemplateSelection = (templateId) => {
    setSelectedTemplates(prev =>
      prev.includes(templateId)
        ? prev.filter(id => id !== templateId)
        : [...prev, templateId]
    );
  };

  const selectAllTemplates = () => {
    setSelectedTemplates(selectedTemplates.length === templates.length ? [] : templates.map(template => template.id));
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className={index < Math.floor(rating) ? "text-amber-400" : "text-gray-300"}>
        <PiStar className="text-sm" />
      </span>
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-purple-50/20 relative overflow-hidden">
      
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float-slow"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float-slower"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-pulse"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25px 25px, #666 1px, transparent 0)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-20 opacity-10 animate-float">
        <PiSparkle className="text-5xl text-blue-500" />
      </div>
      <div className="absolute bottom-32 right-32 opacity-10 animate-float-delayed">
        <PiShootingStar className="text-4xl text-purple-500" />
      </div>

      <div className="flex relative z-10">
        {/* Sidebar */}
        <div className={`bg-white/95 backdrop-blur-xl border-l border-gray-200/50 shadow-2xl transition-all duration-300 ${sidebarOpen ? 'w-80' : 'w-20'}`}>
          {/* Sidebar Header */}
          <div className="p-6 border-b border-gray-200/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <PiShield className="text-white text-xl" />
                </div>
                {sidebarOpen && (
                  <div>
                    <h1 className="text-xl font-black text-gray-800">پنل مدیریت</h1>
                    <p className="text-gray-500 text-sm font-medium">تربچه</p>
                  </div>
                )}
              </div>
              {sidebarOpen && (
                <button 
                  onClick={() => setSidebarOpen(false)}
                  className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors duration-200"
                >
                  <PiX className="text-gray-600 text-sm" />
                </button>
              )}
            </div>
          </div>

          {/* Navigation */}
          <nav className="p-4">
            {navigationItems.map(item => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center justify-between space-x-3 rtl:space-x-reverse p-3 rounded-xl mb-2 transition-all duration-200 group ${
                  item.id === 'templates'
                    ? 'bg-gradient-to-r from-blue-50 to-blue-100/50 border border-blue-200 text-blue-700 shadow-sm'
                    : 'text-gray-600 hover:bg-gray-50/80 hover:text-gray-800 border border-transparent'
                }`}
              >
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <div className={`transition-colors duration-200 ${
                    item.id === 'templates' ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'
                  }`}>
                    {item.icon}
                  </div>
                  {sidebarOpen && (
                    <span className={`font-medium text-sm transition-all duration-200 ${
                      item.id === 'templates' ? 'text-blue-800' : 'text-gray-700'
                    }`}>
                      {item.name}
                    </span>
                  )}
                </div>
                
                {sidebarOpen && item.badge && (
                  <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                    item.id === 'templates' 
                      ? 'bg-blue-100 text-blue-700' 
                      : item.badge === 'جدید' 
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-600'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>

          {/* Sidebar Footer */}
          {sidebarOpen && (
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200/50 bg-white/80">
              <div className="flex items-center space-x-3 rtl:space-x-reverse p-3 bg-gradient-to-r from-gray-50 to-gray-100/50 rounded-xl border border-gray-200/50">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-white font-bold shadow-lg">
                  A
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-800 text-sm">مدیر سیستم</h4>
                  <p className="text-gray-500 text-xs">admin@torobche.ir</p>
                </div>
                <button className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-lg flex items-center justify-center transition-colors duration-200">
                  <PiGear className="text-gray-600 text-sm" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto min-h-screen">
          {/* Top Bar */}
          <header className="bg-white/95 backdrop-blur-xl border-b border-gray-200/50 px-6 py-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                {!sidebarOpen && (
                  <button
                    onClick={() => setSidebarOpen(true)}
                    className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-xl flex items-center justify-center transition-colors duration-200 shadow-sm"
                  >
                    <PiList className="text-gray-600 text-lg" />
                  </button>
                )}
                <div>
                  <h1 className="text-2xl font-black text-gray-800">مدیریت قالب‌ها</h1>
                  <p className="text-gray-500 text-sm">مدیریت و نظارت بر قالب‌های دیجیتال</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <button className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-xl flex items-center justify-center transition-colors duration-200 shadow-sm relative">
                  <PiBell className="text-gray-600 text-lg" />
                  <span className="absolute -top-1 -left-1 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center shadow-lg animate-pulse">
                    ۳
                  </span>
                </button>
                <div className="flex items-center space-x-3 rtl:space-x-reverse bg-gray-100/80 hover:bg-gray-200/80 rounded-xl px-3 py-2 transition-colors duration-200 cursor-pointer shadow-sm">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-white font-bold text-sm">
                    A
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-gray-800">مدیر سیستم</p>
                    <p className="text-xs text-gray-500">مدیر ارشد</p>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content Area */}
          <main className="p-6">
            {/* Welcome Banner */}
            <div className="bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl p-6 text-white shadow-lg mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-black mb-2">گالری قالب‌ها 🎨</h2>
                  <p className="text-cyan-100">شما در حال مدیریت {templates.length} قالب حرفه‌ای در سیستم هستید.</p>
                </div>
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-xl transition-colors duration-200 flex items-center space-x-2 rtl:space-x-reverse">
                    <PiDownload className="text-lg" />
                    <span>گزارش قالب‌ها</span>
                  </button>
                  <button className="bg-white text-cyan-600 hover:bg-cyan-50 px-4 py-2 rounded-xl transition-colors duration-200 font-medium">
                    آمار کامل
                  </button>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {templateStats.map((stat, index) => (
                <div key={index} className={`${stat.bgGradient} rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/60 backdrop-blur-sm`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                      {stat.icon}
                    </div>
                    <div className={`flex items-center space-x-1 rtl:space-x-reverse text-sm font-bold ${
                      stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.trend === 'up' ? <PiTrendUp /> : <PiTrendDown />}
                      <span>{stat.change}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-black text-gray-800 mb-1">{stat.value}</div>
                    <div className="text-gray-600 text-sm font-medium mb-2">{stat.label}</div>
                    <div className="text-xs text-gray-500">
                      <span className={stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}>
                        {stat.changeValue}
                      </span>{' '}
                      نسبت به ماه گذشته
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Header Actions */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <div className="relative">
                  <PiMagnifyingGlass className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
                  <input
                    type="text"
                    placeholder="جستجوی قالب بر اساس نام یا دسته‌بندی..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-96 pr-10 pl-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all duration-300"
                  />
                </div>
                
                {/* Filter Dropdowns */}
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <select 
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="px-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm text-sm"
                  >
                    <option value="all">همه دسته‌بندی‌ها</option>
                    {categories.filter(cat => cat !== 'همه').map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                  
                  <select 
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm text-sm"
                  >
                    <option value="all">همه وضعیت‌ها</option>
                    <option value="فعال">فعال</option>
                    <option value="غیرفعال">غیرفعال</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <button className="flex items-center space-x-2 rtl:space-x-reverse px-4 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-2xl hover:shadow-lg transition-all duration-300 shadow-md hover:scale-105">
                  <PiPlus className="text-lg" />
                  <span className="font-medium">ایجاد قالب جدید</span>
                </button>
                <button className="flex items-center space-x-2 rtl:space-x-reverse px-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl hover:bg-white hover:shadow-md transition-all duration-300 shadow-sm">
                  <PiExport className="text-lg" />
                  <span className="font-medium">خروجی Excel</span>
                </button>
              </div>
            </div>

            {/* Templates Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-6">
              {filteredTemplates.map(template => (
                <div key={template.id} className={`${template.bgGradient} rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/60 backdrop-blur-sm overflow-hidden group hover:scale-105`}>
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 bg-gradient-to-r ${template.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <PiSparkle className="text-white text-xl" />
                      </div>
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <span className={`px-3 py-1 rounded-xl text-xs font-bold ${
                          template.status === 'فعال' ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-red-100 text-red-700 border border-red-200'
                        }`}>
                          {template.status}
                        </span>
                        <span className={`px-3 py-1 rounded-xl text-xs font-bold ${
                          template.popular 
                            ? 'bg-gradient-to-r from-amber-400 to-orange-400 text-white' 
                            : 'bg-gray-100 text-gray-700 border border-gray-200'
                        }`}>
                          {template.popular && <PiStar className="inline ml-1 text-xs" />}
                          {template.badge}
                        </span>
                      </div>
                    </div>

                    {/* Template Info */}
                    <h3 className="font-black text-gray-800 text-lg mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300">
                      {template.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 flex items-center space-x-2 rtl:space-x-reverse">
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium">
                        {template.category}
                      </span>
                      <span className="text-gray-500 text-xs">ایجاد: {template.created}</span>
                    </p>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {template.features.map((feature, index) => (
                        <span key={index} className="px-2 py-1 bg-white/60 text-gray-700 rounded-lg text-xs font-medium border border-white/80">
                          {feature}
                        </span>
                      ))}
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-4 gap-2 mb-4">
                      <div className="text-center">
                        <div className="text-gray-800 font-black text-sm">{template.sales}</div>
                        <div className="text-gray-500 text-xs">فروش</div>
                      </div>
                      <div className="text-center">
                        <div className="text-gray-800 font-black text-sm">{template.downloads}</div>
                        <div className="text-gray-500 text-xs">دانلود</div>
                      </div>
                      <div className="text-center">
                        <div className="text-gray-800 font-black text-sm">{template.reviews}</div>
                        <div className="text-gray-500 text-xs">نظر</div>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center space-x-1">
                          {renderStars(template.rating)}
                        </div>
                        <div className="text-gray-500 text-xs">امتیاز</div>
                      </div>
                    </div>

                    {/* Price and Actions */}
                    <div className="flex items-center justify-between">
                      <div className="text-left">
                        <div className="flex items-center space-x-2 rtl:space-x-reverse mb-1">
                          <div className="text-green-600 font-black text-lg">{template.price}</div>
                          {template.oldPrice && (
                            <div className="text-gray-400 text-sm line-through">{template.oldPrice}</div>
                          )}
                          <div className={`flex items-center space-x-1 rtl:space-x-reverse text-sm font-bold ${
                            template.growth.includes('+') ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {template.growth.includes('+') ? <PiTrendUp /> : <PiTrendDown />}
                            <span>{template.growth}</span>
                          </div>
                        </div>
                        <div className="text-gray-500 text-xs">تومان</div>
                      </div>
                      <div className="flex items-center space-x-2 rtl:space-x-reverse opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button className="w-10 h-10 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center hover:bg-blue-200 hover:scale-110 transition-all duration-300 shadow-sm">
                          <PiEye className="text-sm" />
                        </button>
                        <button className="w-10 h-10 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center hover:bg-green-200 hover:scale-110 transition-all duration-300 shadow-sm">
                          <PiPencil className="text-sm" />
                        </button>
                        <button className="w-10 h-10 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center hover:bg-red-200 hover:scale-110 transition-all duration-300 shadow-sm">
                          <PiTrash className="text-sm" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Custom Design CTA */}
            <div className="bg-gradient-to-r from-gray-900 via-purple-900 to-blue-900 rounded-2xl p-8 text-white shadow-2xl mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                  <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl flex items-center justify-center shadow-lg">
                    <PiPaintBrush className="text-white text-2xl" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black mb-2">طراحی سفارشی نیاز دارید؟</h3>
                    <p className="text-gray-300 text-sm">
                      تیم طراحی حرفه‌ای ما آماده ایجاد قالب کاملاً سفارشی متناسب با برند شماست
                    </p>
                  </div>
                </div>
                
                <button className="bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-gray-900 px-6 py-3 rounded-2xl font-bold transition-all duration-300 hover:scale-105 shadow-lg flex items-center space-x-2 rtl:space-x-reverse">
                  <PiRocket className="text-lg" />
                  <span>درخواست طراحی سفارشی</span>
                </button>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-4 mt-6 text-gray-400">
                <div className="flex items-center gap-2 bg-white/5 px-3 py-2 rounded-xl text-xs">
                  <PiShieldCheck className="text-sm" />
                  <span>ضمانت بازگشت وجه ۳۰ روزه</span>
                </div>
                <div className="flex items-center gap-2 bg-white/5 px-3 py-2 rounded-xl text-xs">
                  <PiMedal className="text-sm" />
                  <span>طراحی توسط متخصصان</span>
                </div>
                <div className="flex items-center gap-2 bg-white/5 px-3 py-2 rounded-xl text-xs">
                  <PiLightning className="text-sm" />
                  <span>تحویل ۳-۵ روز کاری</span>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-10px) scale(1.05); }
        }
        @keyframes float-slower {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-5deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        .animate-float-slower {
          animation: float-slower 10s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 7s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default AdminTemplates;