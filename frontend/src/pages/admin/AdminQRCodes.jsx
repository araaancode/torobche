// pages/AdminQRCodes.js
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
  PiTrendUp,
  PiTrendDown,
  PiChartLine,
  PiChartPieSlice,
  PiUsers,
  PiStorefront,
  PiUserCircle,
  PiMoney,
  PiGear,
  PiList,
  PiX,
  PiCrown,
  PiShootingStar,
  PiConfetti,
  PiCheckCircle,
  PiClock,
  PiCopy,
  PiShare,
  PiScan,
  PiEyeClosed,
  PiWarning,
  PiInfo,
  PiLink,
  PiImage,
  PiBarcode
} from 'react-icons/pi';

const AdminQRCodes = ({ onNavigate }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedQRCodes, setSelectedQRCodes] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const qrCodes = [
    {
      id: 1,
      name: 'منوی رستوران برگرلند',
      type: 'منو',
      status: 'فعال',
      scans: 1245,
      uniqueScans: 987,
      created: '۱۴۰۲/۱۰/۱۵',
      lastScan: '۲ ساعت پیش',
      url: 'torobche.com/menu/burgerland',
      owner: 'علی محمدی',
      gradient: 'from-orange-500 to-amber-500',
      bgGradient: 'bg-gradient-to-br from-orange-50/80 via-amber-50/60 to-white',
      growth: '+۲۳٪',
      size: '۵۰۰x۵۰۰',
      format: 'PNG'
    },
    {
      id: 2,
      name: 'کارت ویزیت دکتر محمدی',
      type: 'کارت ویزیت',
      status: 'فعال',
      scans: 876,
      uniqueScans: 654,
      created: '۱۴۰۲/۱۰/۱۴',
      lastScan: '۱ روز پیش',
      url: 'torobche.com/card/drmohammadi',
      owner: 'دکتر علی محمدی',
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'bg-gradient-to-br from-blue-50/80 via-cyan-50/60 to-white',
      growth: '+۱۸٪',
      size: '۴۰۰x۴۰۰',
      format: 'SVG'
    },
    {
      id: 3,
      name: 'پروفایل کسب‌وکار پارس',
      type: 'کسب‌وکار',
      status: 'غیرفعال',
      scans: 432,
      uniqueScans: 321,
      created: '۱۴۰۲/۱۰/۱۳',
      lastScan: '۲ هفته پیش',
      url: 'torobche.com/business/pars',
      owner: 'محمد رضایی',
      gradient: 'from-purple-500 to-pink-500',
      bgGradient: 'bg-gradient-to-br from-purple-50/80 via-pink-50/60 to-white',
      growth: '-۸٪',
      size: '۵۰۰x۵۰۰',
      format: 'PNG'
    },
    {
      id: 4,
      name: 'رزومه سارا احمدی',
      type: 'رزومه',
      status: 'فعال',
      scans: 654,
      uniqueScans: 543,
      created: '۱۴۰۲/۱۰/۱۲',
      lastScan: '۳۰ دقیقه پیش',
      url: 'torobche.com/resume/sara',
      owner: 'سارا احمدی',
      gradient: 'from-green-500 to-emerald-500',
      bgGradient: 'bg-gradient-to-br from-green-50/80 via-emerald-50/60 to-white',
      growth: '+۳۲٪',
      size: '۴۵۰x۴۵۰',
      format: 'JPG'
    },
    {
      id: 5,
      name: 'پروژه معماری نوآور',
      type: 'پورتفولیو',
      status: 'فعال',
      scans: 321,
      uniqueScans: 234,
      created: '۱۴۰۲/۱۰/۱۱',
      lastScan: '۵ ساعت پیش',
      url: 'torobche.com/portfolio/architecture',
      owner: 'مهندس سارا احمدی',
      gradient: 'from-indigo-500 to-purple-500',
      bgGradient: 'bg-gradient-to-br from-indigo-50/80 via-purple-50/60 to-white',
      growth: '+۱۵٪',
      size: '۵۰۰x۵۰۰',
      format: 'PNG'
    },
    {
      id: 6,
      name: 'کاتالوگ محصولات',
      type: 'کاتالوگ',
      status: 'فعال',
      scans: 789,
      uniqueScans: 567,
      created: '۱۴۰۲/۱۰/۱۰',
      lastScan: '۱۲ ساعت پیش',
      url: 'torobche.com/catalog/products',
      owner: 'شرکت تجاری پارس',
      gradient: 'from-rose-500 to-pink-500',
      bgGradient: 'bg-gradient-to-br from-rose-50/80 via-pink-50/60 to-white',
      growth: '+۲۷٪',
      size: '۴۰۰x۴۰۰',
      format: 'SVG'
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

  const qrStats = [
    { 
      label: 'QR کدهای کل', 
      value: '۲,۸۹۰', 
      change: '+۲۵٪', 
      changeValue: '۵۷۸',
      icon: <PiQrCode className="text-2xl" />, 
      color: 'from-blue-500 to-cyan-500',
      bgGradient: 'bg-gradient-to-br from-blue-50/80 via-cyan-50/60 to-white',
      trend: 'up'
    },
    { 
      label: 'اسکن‌های کل', 
      value: '۱۲۴,۵۶۷', 
      change: '+۳۲٪', 
      changeValue: '۳۰,۲۳۴',
      icon: <PiScan className="text-2xl" />, 
      color: 'from-green-500 to-emerald-500',
      bgGradient: 'bg-gradient-to-br from-green-50/80 via-emerald-50/60 to-white',
      trend: 'up'
    },
    { 
      label: 'اسکن‌های منحصر به فرد', 
      value: '۸۹,۱۲۳', 
      change: '+۲۸٪', 
      changeValue: '۱۹,۴۵۶',
      icon: <PiEye className="text-2xl" />, 
      color: 'from-purple-500 to-pink-500',
      bgGradient: 'bg-gradient-to-br from-purple-50/80 via-pink-50/60 to-white',
      trend: 'up'
    },
    { 
      label: 'نرخ تبدیل', 
      value: '۷۲٪', 
      change: '+۸٪', 
      changeValue: '۵.۳٪',
      icon: <PiChartLine className="text-2xl" />, 
      color: 'from-orange-500 to-amber-500',
      bgGradient: 'bg-gradient-to-br from-orange-50/80 via-amber-50/60 to-white',
      trend: 'up'
    }
  ];

  const types = ['همه', 'منو', 'کارت ویزیت', 'کسب‌وکار', 'رزومه', 'پورتفولیو', 'کاتالوگ', 'سایر'];

  const filteredQRCodes = qrCodes.filter(qr => {
    const matchesSearch = qr.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         qr.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         qr.url.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || qr.type === filterType;
    const matchesStatus = filterStatus === 'all' || qr.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const toggleQRSelection = (qrId) => {
    setSelectedQRCodes(prev =>
      prev.includes(qrId)
        ? prev.filter(id => id !== qrId)
        : [...prev, qrId]
    );
  };

  const selectAllQRCodes = () => {
    setSelectedQRCodes(selectedQRCodes.length === qrCodes.length ? [] : qrCodes.map(qr => qr.id));
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // You can add a toast notification here
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
                  item.id === 'qr-codes'
                    ? 'bg-gradient-to-r from-blue-50 to-blue-100/50 border border-blue-200 text-blue-700 shadow-sm'
                    : 'text-gray-600 hover:bg-gray-50/80 hover:text-gray-800 border border-transparent'
                }`}
              >
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <div className={`transition-colors duration-200 ${
                    item.id === 'qr-codes' ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'
                  }`}>
                    {item.icon}
                  </div>
                  {sidebarOpen && (
                    <span className={`font-medium text-sm transition-all duration-200 ${
                      item.id === 'qr-codes' ? 'text-blue-800' : 'text-gray-700'
                    }`}>
                      {item.name}
                    </span>
                  )}
                </div>
                
                {sidebarOpen && item.badge && (
                  <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                    item.id === 'qr-codes' 
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
                  <h1 className="text-2xl font-black text-gray-800">مدیریت QR کدها</h1>
                  <p className="text-gray-500 text-sm">مدیریت و نظارت بر کدهای QR دیجیتال</p>
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
            <div className="bg-gradient-to-r from-emerald-600 to-green-600 rounded-2xl p-6 text-white shadow-lg mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-black mb-2">مدیریت QR کدها 📱</h2>
                  <p className="text-emerald-100">شما در حال مدیریت {qrCodes.length} کد QR فعال در سیستم هستید.</p>
                </div>
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-xl transition-colors duration-200 flex items-center space-x-2 rtl:space-x-reverse">
                    <PiDownload className="text-lg" />
                    <span>گزارش اسکن‌ها</span>
                  </button>
                  <button className="bg-white text-emerald-600 hover:bg-emerald-50 px-4 py-2 rounded-xl transition-colors duration-200 font-medium">
                    آمار کامل
                  </button>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {qrStats.map((stat, index) => (
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
                    placeholder="جستجوی QR کد بر اساس نام، صاحب یا آدرس..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-96 pr-10 pl-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all duration-300"
                  />
                </div>
                
                {/* Filter Dropdowns */}
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <select 
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="px-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm text-sm"
                  >
                    <option value="all">همه نوع‌ها</option>
                    {types.filter(type => type !== 'همه').map(type => (
                      <option key={type} value={type}>{type}</option>
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
                <button className="flex items-center space-x-2 rtl:space-x-reverse px-4 py-3 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-2xl hover:shadow-lg transition-all duration-300 shadow-md hover:scale-105">
                  <PiPlus className="text-lg" />
                  <span className="font-medium">ایجاد QR کد جدید</span>
                </button>
                <button className="flex items-center space-x-2 rtl:space-x-reverse px-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl hover:bg-white hover:shadow-md transition-all duration-300 shadow-sm">
                  <PiExport className="text-lg" />
                  <span className="font-medium">خروجی Excel</span>
                </button>
              </div>
            </div>

            {/* QR Codes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-6">
              {filteredQRCodes.map(qr => (
                <div key={qr.id} className={`${qr.bgGradient} rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/60 backdrop-blur-sm overflow-hidden group hover:scale-105`}>
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 bg-gradient-to-r ${qr.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <PiQrCode className="text-white text-xl" />
                      </div>
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <span className={`px-3 py-1 rounded-xl text-xs font-bold ${
                          qr.status === 'فعال' ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-red-100 text-red-700 border border-red-200'
                        }`}>
                          {qr.status}
                        </span>
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-xl text-xs font-medium border border-gray-200">
                          {qr.type}
                        </span>
                      </div>
                    </div>

                    {/* QR Info */}
                    <h3 className="font-black text-gray-800 text-lg mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300">
                      {qr.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 flex items-center space-x-2 rtl:space-x-reverse">
                      <PiUserCircle className="text-gray-400" />
                      <span>{qr.owner}</span>
                    </p>

                    {/* URL */}
                    <div className="flex items-center justify-between bg-white/60 rounded-xl p-3 mb-4 border border-gray-200/50">
                      <div className="flex-1 truncate">
                        <p className="text-gray-700 text-sm truncate">{qr.url}</p>
                      </div>
                      <button 
                        onClick={() => copyToClipboard(qr.url)}
                        className="w-8 h-8 bg-gray-100 text-gray-600 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors duration-200"
                      >
                        <PiCopy className="text-sm" />
                      </button>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-gray-800 font-black text-lg">{qr.scans}</div>
                        <div className="text-gray-500 text-xs">اسکن کل</div>
                      </div>
                      <div className="text-center">
                        <div className="text-gray-800 font-black text-lg">{qr.uniqueScans}</div>
                        <div className="text-gray-500 text-xs">اسکن منحصر</div>
                      </div>
                    </div>

                    {/* Technical Info */}
                    <div className="flex items-center justify-between mb-4 text-xs text-gray-600">
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <PiImage className="text-gray-400" />
                        <span>{qr.size}</span>
                      </div>
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <PiBarcode className="text-gray-400" />
                        <span>{qr.format}</span>
                      </div>
                    </div>

                    {/* Growth and Actions */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 rtl:space-x-reverse">
                        <div className={`flex items-center space-x-1 rtl:space-x-reverse text-sm font-bold ${
                          qr.growth.includes('+') ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {qr.growth.includes('+') ? <PiTrendUp /> : <PiTrendDown />}
                          <span>{qr.growth}</span>
                        </div>
                        <span className="text-gray-500 text-xs">آخرین اسکن: {qr.lastScan}</span>
                      </div>
                      <div className="flex items-center space-x-2 rtl:space-x-reverse opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button className="w-8 h-8 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center hover:bg-blue-200 hover:scale-110 transition-all duration-300 shadow-sm">
                          <PiEye className="text-xs" />
                        </button>
                        <button className="w-8 h-8 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center hover:bg-green-200 hover:scale-110 transition-all duration-300 shadow-sm">
                          <PiDownload className="text-xs" />
                        </button>
                        <button className="w-8 h-8 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center hover:bg-purple-200 hover:scale-110 transition-all duration-300 shadow-sm">
                          <PiShare className="text-xs" />
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

            {/* Bulk Actions */}
            {selectedQRCodes.length > 0 && (
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6 mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 rtl:space-x-reverse">
                    <span className="text-gray-600 font-medium">
                      {selectedQRCodes.length} QR کد انتخاب شده
                    </span>
                  </div>
                  <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <button className="text-green-600 hover:text-green-700 flex items-center space-x-2 rtl:space-x-reverse font-medium">
                      <PiDownload className="text-lg" />
                      <span>دانلود انتخاب شده‌ها</span>
                    </button>
                    <button className="text-red-600 hover:text-red-700 flex items-center space-x-2 rtl:space-x-reverse font-medium">
                      <PiTrash className="text-lg" />
                      <span>حذف انتخاب شده‌ها</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6">
              <h3 className="text-xl font-black text-gray-800 mb-4">عملیات سریع</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button className="p-4 bg-emerald-50 hover:bg-emerald-100 rounded-xl transition-colors duration-200 flex flex-col items-center space-y-2 group border border-emerald-200">
                  <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <PiPlus className="text-white text-xl" />
                  </div>
                  <span className="font-medium text-emerald-700 text-sm">QR کد جدید</span>
                </button>

                <button className="p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors duration-200 flex flex-col items-center space-y-2 group border border-blue-200">
                  <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <PiDownload className="text-white text-xl" />
                  </div>
                  <span className="font-medium text-blue-700 text-sm">گزارش اسکن</span>
                </button>

                <button className="p-4 bg-purple-50 hover:bg-purple-100 rounded-xl transition-colors duration-200 flex flex-col items-center space-y-2 group border border-purple-200">
                  <div className="w-12 h-12 bg-purple-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <PiScan className="text-white text-xl" />
                  </div>
                  <span className="font-medium text-purple-700 text-sm">آنالیز عملکرد</span>
                </button>

                <button className="p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition-colors duration-200 flex flex-col items-center space-y-2 group border border-orange-200">
                  <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <PiChartLine className="text-white text-xl" />
                  </div>
                  <span className="font-medium text-orange-700 text-sm">آمار پیشرفته</span>
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

export default AdminQRCodes;