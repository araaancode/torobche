// pages/AdminBusinessCards.js
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
  PiQrCode,
  PiUserCircle,
  PiTrendUp,
  PiTrendDown,
  PiChartLine,
  PiChartPieSlice,
  PiUsers,
  PiStorefront,
  PiMoney,
  PiGear,
  PiList,
  PiX,
  PiCrown,
  PiShootingStar,
  PiConfetti,
  PiCheckCircle,
  PiClock,
  PiPhone,
  PiEnvelope,
  PiMapPin,
  PiShare,
  PiCopy,
  PiWarning,
  PiInfo
} from 'react-icons/pi';

const AdminBusinessCards = ({ onNavigate }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterTemplate, setFilterTemplate] = useState('all');
  const [selectedCards, setSelectedCards] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const businessCards = [
    {
      id: 1,
      name: 'دکتر علی محمدی',
      title: 'متخصص قلب و عروق',
      company: 'بیمارستان میلاد',
      phone: '021-12345678',
      email: 'ali@example.com',
      website: 'dr-ali.com',
      address: 'تهران، میدان ونک',
      status: 'فعال',
      views: 345,
      downloads: 89,
      shares: 45,
      qrScans: 123,
      created: '۱۴۰۲/۱۰/۱۵',
      lastUpdate: '۲ روز پیش',
      template: 'مدرن پزشکی',
      templateColor: 'from-blue-500 to-cyan-500',
      bgGradient: 'bg-gradient-to-br from-blue-50/80 via-cyan-50/60 to-white',
      avatar: 'A',
      gradient: 'from-blue-500 to-cyan-500',
      growth: '+۲۳٪'
    },
    {
      id: 2,
      name: 'مهندس سارا احمدی',
      title: 'معمار Senior',
      company: 'شرکت معماری نوآور',
      phone: '021-12345679',
      email: 'sara@example.com',
      website: 'sara-arch.com',
      address: 'تهران، سعادت آباد',
      status: 'فعال',
      views: 287,
      downloads: 67,
      shares: 32,
      qrScans: 98,
      created: '۱۴۰۲/۱۰/۱۴',
      lastUpdate: '۱ هفته پیش',
      template: 'مینیمال',
      templateColor: 'from-purple-500 to-pink-500',
      bgGradient: 'bg-gradient-to-br from-purple-50/80 via-pink-50/60 to-white',
      avatar: 'S',
      gradient: 'from-purple-500 to-pink-500',
      growth: '+۱۸٪'
    },
    {
      id: 3,
      name: 'محمد رضایی',
      title: 'مدیر فروش',
      company: 'شرکت تجاری پارس',
      phone: '021-12345680',
      email: 'mohammad@example.com',
      website: 'pars-trade.com',
      address: 'تهران، شهرک غرب',
      status: 'غیرفعال',
      views: 156,
      downloads: 45,
      shares: 18,
      qrScans: 67,
      created: '۱۴۰۲/۱۰/۱۳',
      lastUpdate: '۲ هفته پیش',
      template: 'کلاسیک',
      templateColor: 'from-amber-500 to-orange-500',
      bgGradient: 'bg-gradient-to-br from-amber-50/80 via-orange-50/60 to-white',
      avatar: 'M',
      gradient: 'from-amber-500 to-orange-500',
      growth: '-۸٪'
    },
    {
      id: 4,
      name: 'فاطمه کریمی',
      title: 'طراح گرافیک',
      company: 'استودیو خلاق',
      phone: '021-12345681',
      email: 'fateme@example.com',
      website: 'creative-studio.com',
      address: 'تهران، نیاوران',
      status: 'فعال',
      views: 432,
      downloads: 123,
      shares: 67,
      qrScans: 189,
      created: '۱۴۰۲/۱۰/۱۲',
      lastUpdate: '۳ روز پیش',
      template: 'خلاقانه',
      templateColor: 'from-green-500 to-emerald-500',
      bgGradient: 'bg-gradient-to-br from-green-50/80 via-emerald-50/60 to-white',
      avatar: 'F',
      gradient: 'from-green-500 to-emerald-500',
      growth: '+۳۲٪'
    },
    {
      id: 5,
      name: 'رضا حسینی',
      title: 'توسعه دهنده وب',
      company: 'فناوری اطلاعات پیشرو',
      phone: '021-12345682',
      email: 'reza@example.com',
      website: 'tech-advance.com',
      address: 'تهران، پاسداران',
      status: 'فعال',
      views: 198,
      downloads: 56,
      shares: 23,
      qrScans: 78,
      created: '۱۴۰۲/۱۰/۱۱',
      lastUpdate: '۵ روز پیش',
      template: 'تکنولوژی',
      templateColor: 'from-indigo-500 to-purple-500',
      bgGradient: 'bg-gradient-to-br from-indigo-50/80 via-purple-50/60 to-white',
      avatar: 'R',
      gradient: 'from-indigo-500 to-purple-500',
      growth: '+۱۲٪'
    },
    {
      id: 6,
      name: 'نازنین رضایی',
      title: 'مشاور کسب و کار',
      company: 'مشاوران موفقیت',
      phone: '021-12345683',
      email: 'nazanin@example.com',
      website: 'success-consultants.com',
      address: 'تهران، فرمانیه',
      status: 'فعال',
      views: 321,
      downloads: 89,
      shares: 45,
      qrScans: 134,
      created: '۱۴۰۲/۱۰/۱۰',
      lastUpdate: '۱ روز پیش',
      template: 'حرفه‌ای',
      templateColor: 'from-rose-500 to-pink-500',
      bgGradient: 'bg-gradient-to-br from-rose-50/80 via-pink-50/60 to-white',
      avatar: 'N',
      gradient: 'from-rose-500 to-pink-500',
      growth: '+۲۷٪'
    }
  ];

  const navigationItems = [
    { id: 'overview', name: 'داشبورد', icon: <PiChartPieSlice className="text-xl" />, badge: null },
    { id: 'users', name: 'مدیریت کاربران', icon: <PiUsers className="text-xl" />, badge: '۵' },
    { id: 'menus', name: 'منوها', icon: <PiStorefront className="text-xl" />, badge: '۶' },
    { id: 'business-cards', name: 'کارت ویزیت', icon: <PiUserCircle className="text-xl" />, badge: '۶' },
    { id: 'templates', name: 'قالب‌ها', icon: <PiSparkle className="text-xl" />, badge: null },
    { id: 'qr-codes', name: 'QR کدها', icon: <PiQrCode className="text-xl" />, badge: '۸۹' },
    { id: 'analytics', name: 'آمار و گزارش', icon: <PiChartLine className="text-xl" />, badge: null },
    { id: 'payments', name: 'پرداخت‌ها', icon: <PiMoney className="text-xl" />, badge: 'جدید' },
    { id: 'settings', name: 'تنظیمات', icon: <PiGear className="text-xl" />, badge: null }
  ];

  const cardStats = [
    { 
      label: 'کارت‌های کل', 
      value: '۸۹۰', 
      change: '+۱۵٪', 
      changeValue: '۱۱۶',
      icon: <PiUserCircle className="text-2xl" />, 
      color: 'from-blue-500 to-cyan-500',
      bgGradient: 'bg-gradient-to-br from-blue-50/80 via-cyan-50/60 to-white',
      trend: 'up'
    },
    { 
      label: 'کارت‌های فعال', 
      value: '۷۶۵', 
      change: '+۱۲٪', 
      changeValue: '۸۲',
      icon: <PiCheckCircle className="text-2xl" />, 
      color: 'from-green-500 to-emerald-500',
      bgGradient: 'bg-gradient-to-br from-green-50/80 via-emerald-50/60 to-white',
      trend: 'up'
    },
    { 
      label: 'اسکن QR کد', 
      value: '۱۲,۴۵۶', 
      change: '+۲۸٪', 
      changeValue: '۲,۷۲۳',
      icon: <PiQrCode className="text-2xl" />, 
      color: 'from-purple-500 to-pink-500',
      bgGradient: 'bg-gradient-to-br from-purple-50/80 via-pink-50/60 to-white',
      trend: 'up'
    },
    { 
      label: 'دانلود کل', 
      value: '۳,۲۱۰', 
      change: '+۱۹٪', 
      changeValue: '۵۱۲',
      icon: <PiDownload className="text-2xl" />, 
      color: 'from-orange-500 to-amber-500',
      bgGradient: 'bg-gradient-to-br from-orange-50/80 via-amber-50/60 to-white',
      trend: 'up'
    }
  ];

  const templates = ['همه', 'مدرن پزشکی', 'مینیمال', 'کلاسیک', 'خلاقانه', 'تکنولوژی', 'حرفه‌ای'];

  const filteredCards = businessCards.filter(card => {
    const matchesSearch = card.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         card.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         card.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || card.status === filterStatus;
    const matchesTemplate = filterTemplate === 'all' || card.template === filterTemplate;
    
    return matchesSearch && matchesStatus && matchesTemplate;
  });

  const toggleCardSelection = (cardId) => {
    setSelectedCards(prev =>
      prev.includes(cardId)
        ? prev.filter(id => id !== cardId)
        : [...prev, cardId]
    );
  };

  const selectAllCards = () => {
    setSelectedCards(selectedCards.length === businessCards.length ? [] : businessCards.map(card => card.id));
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
                  item.id === 'business-cards'
                    ? 'bg-gradient-to-r from-blue-50 to-blue-100/50 border border-blue-200 text-blue-700 shadow-sm'
                    : 'text-gray-600 hover:bg-gray-50/80 hover:text-gray-800 border border-transparent'
                }`}
              >
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <div className={`transition-colors duration-200 ${
                    item.id === 'business-cards' ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'
                  }`}>
                    {item.icon}
                  </div>
                  {sidebarOpen && (
                    <span className={`font-medium text-sm transition-all duration-200 ${
                      item.id === 'business-cards' ? 'text-blue-800' : 'text-gray-700'
                    }`}>
                      {item.name}
                    </span>
                  )}
                </div>
                
                {sidebarOpen && item.badge && (
                  <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                    item.id === 'business-cards' 
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
                  <h1 className="text-2xl font-black text-gray-800">مدیریت کارت ویزیت</h1>
                  <p className="text-gray-500 text-sm">مدیریت و نظارت بر کارت‌های ویزیت دیجیتال</p>
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
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 text-white shadow-lg mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-black mb-2">مدیریت کارت ویزیت 📇</h2>
                  <p className="text-purple-100">شما در حال مدیریت {businessCards.length} کارت ویزیت فعال در سیستم هستید.</p>
                </div>
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-xl transition-colors duration-200 flex items-center space-x-2 rtl:space-x-reverse">
                    <PiDownload className="text-lg" />
                    <span>گزارش کارت‌ها</span>
                  </button>
                  <button className="bg-white text-purple-600 hover:bg-purple-50 px-4 py-2 rounded-xl transition-colors duration-200 font-medium">
                    آمار کامل
                  </button>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {cardStats.map((stat, index) => (
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
                    placeholder="جستجوی کارت بر اساس نام، شرکت یا عنوان..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-96 pr-10 pl-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all duration-300"
                  />
                </div>
                
                {/* Filter Dropdowns */}
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <select 
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm text-sm"
                  >
                    <option value="all">همه وضعیت‌ها</option>
                    <option value="فعال">فعال</option>
                    <option value="غیرفعال">غیرفعال</option>
                  </select>
                  
                  <select 
                    value={filterTemplate}
                    onChange={(e) => setFilterTemplate(e.target.value)}
                    className="px-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm text-sm"
                  >
                    <option value="all">همه قالب‌ها</option>
                    {templates.filter(tpl => tpl !== 'همه').map(template => (
                      <option key={template} value={template}>{template}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <button className="flex items-center space-x-2 rtl:space-x-reverse px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl hover:shadow-lg transition-all duration-300 shadow-md hover:scale-105">
                  <PiPlus className="text-lg" />
                  <span className="font-medium">ایجاد کارت جدید</span>
                </button>
                <button className="flex items-center space-x-2 rtl:space-x-reverse px-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl hover:bg-white hover:shadow-md transition-all duration-300 shadow-sm">
                  <PiExport className="text-lg" />
                  <span className="font-medium">خروجی Excel</span>
                </button>
              </div>
            </div>

            {/* Business Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-6">
              {filteredCards.map(card => (
                <div key={card.id} className={`${card.bgGradient} rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/60 backdrop-blur-sm overflow-hidden group hover:scale-105`}>
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 bg-gradient-to-r ${card.gradient} rounded-2xl flex items-center justify-center text-white font-bold shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        {card.avatar}
                      </div>
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <span className={`px-3 py-1 rounded-xl text-xs font-bold ${
                          card.status === 'فعال' ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-red-100 text-red-700 border border-red-200'
                        }`}>
                          {card.status}
                        </span>
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-xl text-xs font-medium border border-gray-200">
                          {card.template}
                        </span>
                      </div>
                    </div>

                    {/* Card Info */}
                    <h3 className="font-black text-gray-800 text-lg mb-1 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300">
                      {card.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-2">{card.title}</p>
                    <p className="text-gray-500 text-xs mb-4 flex items-center space-x-1 rtl:space-x-reverse">
                      <PiMapPin className="text-gray-400" />
                      <span>{card.company}</span>
                    </p>

                    {/* Contact Info */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center space-x-2 rtl:space-x-reverse text-gray-600 text-xs">
                        <PiPhone className="text-gray-400" />
                        <span>{card.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2 rtl:space-x-reverse text-gray-600 text-xs">
                        <PiEnvelope className="text-gray-400" />
                        <span>{card.email}</span>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-4 gap-2 mb-4">
                      <div className="text-center">
                        <div className="text-gray-800 font-black text-sm">{card.views}</div>
                        <div className="text-gray-500 text-xs">بازدید</div>
                      </div>
                      <div className="text-center">
                        <div className="text-gray-800 font-black text-sm">{card.downloads}</div>
                        <div className="text-gray-500 text-xs">دانلود</div>
                      </div>
                      <div className="text-center">
                        <div className="text-gray-800 font-black text-sm">{card.shares}</div>
                        <div className="text-gray-500 text-xs">اشتراک</div>
                      </div>
                      <div className="text-center">
                        <div className="text-gray-800 font-black text-sm">{card.qrScans}</div>
                        <div className="text-gray-500 text-xs">QR اسکن</div>
                      </div>
                    </div>

                    {/* Growth and Actions */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <div className={`flex items-center space-x-1 rtl:space-x-reverse text-sm font-bold ${
                          card.growth.includes('+') ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {card.growth.includes('+') ? <PiTrendUp /> : <PiTrendDown />}
                          <span>{card.growth}</span>
                        </div>
                        <span className="text-gray-500 text-xs">آخرین بروزرسانی: {card.lastUpdate}</span>
                      </div>
                      <div className="flex items-center space-x-2 rtl:space-x-reverse opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button className="w-8 h-8 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center hover:bg-blue-200 hover:scale-110 transition-all duration-300 shadow-sm">
                          <PiEye className="text-xs" />
                        </button>
                        <button className="w-8 h-8 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center hover:bg-green-200 hover:scale-110 transition-all duration-300 shadow-sm">
                          <PiQrCode className="text-xs" />
                        </button>
                        <button className="w-8 h-8 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center hover:bg-orange-200 hover:scale-110 transition-all duration-300 shadow-sm">
                          <PiDownload className="text-xs" />
                        </button>
                        <button className="w-8 h-8 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center hover:bg-red-200 hover:scale-110 transition-all duration-300 shadow-sm">
                          <PiTrash className="text-xs" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6">
              <h3 className="text-xl font-black text-gray-800 mb-4">عملیات سریع</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button className="p-4 bg-purple-50 hover:bg-purple-100 rounded-xl transition-colors duration-200 flex flex-col items-center space-y-2 group border border-purple-200">
                  <div className="w-12 h-12 bg-purple-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <PiPlus className="text-white text-xl" />
                  </div>
                  <span className="font-medium text-purple-700 text-sm">کارت جدید</span>
                </button>

                <button className="p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors duration-200 flex flex-col items-center space-y-2 group border border-blue-200">
                  <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <PiQrCode className="text-white text-xl" />
                  </div>
                  <span className="font-medium text-blue-700 text-sm">مدیریت QR</span>
                </button>

                <button className="p-4 bg-green-50 hover:bg-green-100 rounded-xl transition-colors duration-200 flex flex-col items-center space-y-2 group border border-green-200">
                  <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <PiDownload className="text-white text-xl" />
                  </div>
                  <span className="font-medium text-green-700 text-sm">گزارش دانلود</span>
                </button>

                <button className="p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition-colors duration-200 flex flex-col items-center space-y-2 group border border-orange-200">
                  <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <PiShare className="text-white text-xl" />
                  </div>
                  <span className="font-medium text-orange-700 text-sm">آمار اشتراک</span>
                </button>
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

export default AdminBusinessCards;