// pages/AdminPayments.js
import React, { useState, useEffect } from 'react';
import { 
  PiShield, 
  PiBell,
  PiSparkle,
  PiMoney,
  PiTrendUp,
  PiTrendDown,
  PiDownload,
  PiExport,
  PiEye,
  PiCheckCircle,
  PiClock,
  PiWarning,
  PiReceipt,
  PiCreditCard,
  PiBank,
  PiQrCode,
  PiUserCircle,
  PiStorefront,
  PiGear,
  PiList,
  PiX,
  PiCrown,
  PiShootingStar,
  PiConfetti,
  PiChartLine,
  PiChartPieSlice,
  PiUsers,
  PiArrowUpRight,
  PiCopy,
  PiCalendar,
  PiInfo
} from 'react-icons/pi';

const AdminPayments = ({ onNavigate }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterMethod, setFilterMethod] = useState('all');
  const [selectedPayments, setSelectedPayments] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const payments = [
    {
      id: 1,
      user: 'علی محمدی',
      email: 'ali@example.com',
      amount: '۱,۲۰۰,۰۰۰',
      plan: 'حرفه‌ای',
      status: 'موفق',
      method: 'درگاه بانکی',
      date: '۱۴۰۲/۱۰/۱۵',
      time: '۱۴:۳۰',
      transactionId: 'TX-789456123',
      gateway: 'زرین پال',
      gradient: 'from-green-500 to-emerald-500',
      bgGradient: 'bg-gradient-to-br from-green-50/80 via-emerald-50/60 to-white'
    },
    {
      id: 2,
      user: 'سارا احمدی',
      email: 'sara@example.com',
      amount: '۹۰۰,۰۰۰',
      plan: 'تجاری',
      status: 'موفق',
      method: 'کارت به کارت',
      date: '۱۴۰۲/۱۰/۱۴',
      time: '۱۰:۱۵',
      transactionId: 'TX-789456124',
      gateway: 'ملت',
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'bg-gradient-to-br from-blue-50/80 via-cyan-50/60 to-white'
    },
    {
      id: 3,
      user: 'محمد رضایی',
      email: 'mohammad@example.com',
      amount: '۷۵۰,۰۰۰',
      plan: 'شخصی',
      status: 'در انتظار',
      method: 'درگاه بانکی',
      date: '۱۴۰۲/۱۰/۱۳',
      time: '۱۶:۴۵',
      transactionId: 'TX-789456125',
      gateway: 'سامان',
      gradient: 'from-amber-500 to-orange-500',
      bgGradient: 'bg-gradient-to-br from-amber-50/80 via-orange-50/60 to-white'
    },
    {
      id: 4,
      user: 'فاطمه کریمی',
      email: 'fateme@example.com',
      amount: '۶۰۰,۰۰۰',
      plan: 'اقتصادی',
      status: 'ناموفق',
      method: 'کیف پول',
      date: '۱۴۰۲/۱۰/۱۲',
      time: '۰۹:۲۰',
      transactionId: 'TX-789456126',
      gateway: 'پی‌پینگ',
      gradient: 'from-red-500 to-rose-500',
      bgGradient: 'bg-gradient-to-br from-red-50/80 via-rose-50/60 to-white'
    },
    {
      id: 5,
      user: 'رضا حسینی',
      email: 'reza@example.com',
      amount: '۱,۵۰۰,۰۰۰',
      plan: 'پیشرفته',
      status: 'موفق',
      method: 'درگاه بانکی',
      date: '۱۴۰۲/۱۰/۱۱',
      time: '۱۱:۳۰',
      transactionId: 'TX-789456127',
      gateway: 'پارسیان',
      gradient: 'from-purple-500 to-pink-500',
      bgGradient: 'bg-gradient-to-br from-purple-50/80 via-pink-50/60 to-white'
    },
    {
      id: 6,
      user: 'نازنین رضایی',
      email: 'nazanin@example.com',
      amount: '۸۵۰,۰۰۰',
      plan: 'حرفه‌ای',
      status: 'موفق',
      method: 'کارت به کارت',
      date: '۱۴۰۲/۱۰/۱۰',
      time: '۱۳:۱۵',
      transactionId: 'TX-789456128',
      gateway: 'ملی',
      gradient: 'from-indigo-500 to-purple-500',
      bgGradient: 'bg-gradient-to-br from-indigo-50/80 via-purple-50/60 to-white'
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

  const paymentStats = [
    { 
      label: 'درآمد کل', 
      value: '۴۵.۸M', 
      change: '+۲۳٪', 
      changeValue: '۸.۶M',
      icon: <PiMoney className="text-2xl" />, 
      color: 'from-green-500 to-emerald-500',
      bgGradient: 'bg-gradient-to-br from-green-50/80 via-emerald-50/60 to-white',
      trend: 'up'
    },
    { 
      label: 'پرداخت‌های موفق', 
      value: '۱,۲۳۴', 
      change: '+۱۸٪', 
      changeValue: '۱۸۸',
      icon: <PiCheckCircle className="text-2xl" />, 
      color: 'from-blue-500 to-cyan-500',
      bgGradient: 'bg-gradient-to-br from-blue-50/80 via-cyan-50/60 to-white',
      trend: 'up'
    },
    { 
      label: 'پرداخت‌های ناموفق', 
      value: '۴۵', 
      change: '-۵٪', 
      changeValue: '۲',
      icon: <PiWarning className="text-2xl" />, 
      color: 'from-red-500 to-rose-500',
      bgGradient: 'bg-gradient-to-br from-red-50/80 via-rose-50/60 to-white',
      trend: 'down'
    },
    { 
      label: 'میانگین پرداخت', 
      value: '۸۷۰K', 
      change: '+۱۲٪', 
      changeValue: '۹۳K',
      icon: <PiReceipt className="text-2xl" />, 
      color: 'from-purple-500 to-pink-500',
      bgGradient: 'bg-gradient-to-br from-purple-50/80 via-pink-50/60 to-white',
      trend: 'up'
    }
  ];

  const paymentMethods = [
    { name: 'درگاه بانکی', count: 856, percentage: 68, color: 'from-blue-500 to-cyan-500' },
    { name: 'کارت به کارت', count: 234, percentage: 19, color: 'from-green-500 to-emerald-500' },
    { name: 'کیف پول', count: 123, percentage: 10, color: 'from-purple-500 to-pink-500' },
    { name: 'سایر', count: 45, percentage: 3, color: 'from-gray-500 to-gray-600' }
  ];

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = payment.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.transactionId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || payment.status === filterStatus;
    const matchesMethod = filterMethod === 'all' || payment.method === filterMethod;
    
    return matchesSearch && matchesStatus && matchesMethod;
  });

  const togglePaymentSelection = (paymentId) => {
    setSelectedPayments(prev =>
      prev.includes(paymentId)
        ? prev.filter(id => id !== paymentId)
        : [...prev, paymentId]
    );
  };

  const selectAllPayments = () => {
    setSelectedPayments(selectedPayments.length === payments.length ? [] : payments.map(payment => payment.id));
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // You can add a toast notification here
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'موفق': return 'bg-green-100 text-green-700 border-green-200';
      case 'در انتظار': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'ناموفق': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getMethodIcon = (method) => {
    switch (method) {
      case 'درگاه بانکی': return <PiBank className="text-sm" />;
      case 'کارت به کارت': return <PiCreditCard className="text-sm" />;
      case 'کیف پول': return <PiMoney className="text-sm" />;
      default: return <PiReceipt className="text-sm" />;
    }
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
                  item.id === 'payments'
                    ? 'bg-gradient-to-r from-blue-50 to-blue-100/50 border border-blue-200 text-blue-700 shadow-sm'
                    : 'text-gray-600 hover:bg-gray-50/80 hover:text-gray-800 border border-transparent'
                }`}
              >
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <div className={`transition-colors duration-200 ${
                    item.id === 'payments' ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'
                  }`}>
                    {item.icon}
                  </div>
                  {sidebarOpen && (
                    <span className={`font-medium text-sm transition-all duration-200 ${
                      item.id === 'payments' ? 'text-blue-800' : 'text-gray-700'
                    }`}>
                      {item.name}
                    </span>
                  )}
                </div>
                
                {sidebarOpen && item.badge && (
                  <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                    item.id === 'payments' 
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
                  <h1 className="text-2xl font-black text-gray-800">مدیریت پرداخت‌ها</h1>
                  <p className="text-gray-500 text-sm">مدیریت و نظارت بر تراکنش‌های مالی</p>
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
                  <h2 className="text-2xl font-black mb-2">مدیریت مالی 💰</h2>
                  <p className="text-emerald-100">شما در حال مدیریت {payments.length} تراکنش مالی در سیستم هستید.</p>
                </div>
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-xl transition-colors duration-200 flex items-center space-x-2 rtl:space-x-reverse">
                    <PiDownload className="text-lg" />
                    <span>گزارش مالی</span>
                  </button>
                  <button className="bg-white text-emerald-600 hover:bg-emerald-50 px-4 py-2 rounded-xl transition-colors duration-200 font-medium">
                    آمار کامل
                  </button>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {paymentStats.map((stat, index) => (
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
                  <PiSparkle className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
                  <input
                    type="text"
                    placeholder="جستجوی پرداخت بر اساس کاربر، ایمیل یا شناسه تراکنش..."
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
                    <option value="موفق">موفق</option>
                    <option value="در انتظار">در انتظار</option>
                    <option value="ناموفق">ناموفق</option>
                  </select>
                  
                  <select 
                    value={filterMethod}
                    onChange={(e) => setFilterMethod(e.target.value)}
                    className="px-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm text-sm"
                  >
                    <option value="all">همه روش‌ها</option>
                    <option value="درگاه بانکی">درگاه بانکی</option>
                    <option value="کارت به کارت">کارت به کارت</option>
                    <option value="کیف پول">کیف پول</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <button className="flex items-center space-x-2 rtl:space-x-reverse px-4 py-3 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-2xl hover:shadow-lg transition-all duration-300 shadow-md hover:scale-105">
                  <PiDownload className="text-lg" />
                  <span className="font-medium">گزارش مالی</span>
                </button>
                <button className="flex items-center space-x-2 rtl:space-x-reverse px-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl hover:bg-white hover:shadow-md transition-all duration-300 shadow-sm">
                  <PiExport className="text-lg" />
                  <span className="font-medium">خروجی Excel</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
              {/* Payments List */}
              <div className="xl:col-span-2">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden">
                  {/* Table Header */}
                  <div className="px-6 py-4 border-b border-gray-200/50 bg-gray-50/80">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 rtl:space-x-reverse">
                        <input
                          type="checkbox"
                          checked={selectedPayments.length === payments.length}
                          onChange={selectAllPayments}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="text-gray-600 font-medium">
                          {selectedPayments.length} پرداخت از {payments.length} انتخاب شده
                        </span>
                      </div>
                      {selectedPayments.length > 0 && (
                        <div className="flex items-center space-x-3 rtl:space-x-reverse">
                          <button className="text-red-600 hover:text-red-700 flex items-center space-x-2 rtl:space-x-reverse font-medium">
                            <PiWarning className="text-lg" />
                            <span>رد انتخاب شده‌ها</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Payments List */}
                  <div className="divide-y divide-gray-200/50">
                    {filteredPayments.map(payment => (
                      <div key={payment.id} className="px-6 py-4 hover:bg-gray-50/80 transition-all duration-300 group">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 rtl:space-x-reverse">
                            <input
                              type="checkbox"
                              checked={selectedPayments.includes(payment.id)}
                              onChange={() => togglePaymentSelection(payment.id)}
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <div className={`w-12 h-12 bg-gradient-to-r ${payment.gradient} rounded-2xl flex items-center justify-center text-white font-bold shadow-lg group-hover:scale-105 transition-transform duration-300`}>
                              {getMethodIcon(payment.method)}
                            </div>
                            <div className="text-right">
                              <h4 className="font-bold text-gray-800">{payment.user}</h4>
                              <p className="text-gray-600 text-sm">{payment.email}</p>
                              <p className="text-gray-500 text-xs mt-1 flex items-center space-x-2 rtl:space-x-reverse">
                                <PiCalendar className="text-xs" />
                                <span>{payment.date} - {payment.time}</span>
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center space-x-6 rtl:space-x-reverse">
                            {/* Amount */}
                            <div className="text-left">
                              <div className="text-green-600 font-black text-lg">{payment.amount}</div>
                              <div className="text-gray-500 text-xs">تومان</div>
                            </div>

                            {/* Plan & Status */}
                            <div className="flex flex-col items-end space-y-2">
                              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-xl text-sm font-bold border border-blue-200">
                                {payment.plan}
                              </span>
                              <span className={`px-3 py-1 rounded-xl text-sm font-bold border ${getStatusColor(payment.status)}`}>
                                {payment.status}
                              </span>
                            </div>

                            {/* Transaction Info */}
                            <div className="text-left">
                              <div className="flex items-center space-x-2 rtl:space-x-reverse text-gray-600 text-sm">
                                <span>{payment.method}</span>
                                <button 
                                  onClick={() => copyToClipboard(payment.transactionId)}
                                  className="w-6 h-6 bg-gray-100 text-gray-500 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors duration-200"
                                >
                                  <PiCopy className="text-xs" />
                                </button>
                              </div>
                              <div className="text-gray-500 text-xs">{payment.gateway}</div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center space-x-2 rtl:space-x-reverse opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <button className="w-8 h-8 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center hover:bg-blue-200 hover:scale-110 transition-all duration-300 shadow-sm">
                                <PiEye className="text-xs" />
                              </button>
                              <button className="w-8 h-8 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center hover:bg-green-200 hover:scale-110 transition-all duration-300 shadow-sm">
                                <PiCheckCircle className="text-xs" />
                              </button>
                              <button className="w-8 h-8 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center hover:bg-red-200 hover:scale-110 transition-all duration-300 shadow-sm">
                                <PiWarning className="text-xs" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Payment Methods & Quick Actions */}
              <div className="space-y-6">
                {/* Payment Methods */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6">
                  <h3 className="text-xl font-black text-gray-800 mb-4">روش‌های پرداخت</h3>
                  <div className="space-y-4">
                    {paymentMethods.map((method, index) => (
                      <div key={index} className="space-y-2 group hover:bg-white/60 p-3 rounded-2xl transition-all duration-300">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3 rtl:space-x-reverse">
                            <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${method.color}`}></div>
                            <span className="font-medium text-gray-800">{method.name}</span>
                          </div>
                          <div className="text-gray-600 text-sm font-bold">{method.percentage}٪</div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full bg-gradient-to-r ${method.color} transition-all duration-500 group-hover:scale-105`}
                            style={{ width: `${method.percentage}%` }}
                          ></div>
                        </div>
                        <div className="flex items-center justify-between text-gray-500 text-xs">
                          <span>{method.count} تراکنش</span>
                          <span>{method.percentage}٪ از کل</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6">
                  <h3 className="text-xl font-black text-gray-800 mb-4">عملیات سریع</h3>
                  <div className="space-y-3">
                    <button className="w-full p-4 bg-emerald-50 hover:bg-emerald-100 rounded-2xl transition-colors duration-200 flex items-center space-x-3 rtl:space-x-reverse group border border-emerald-200">
                      <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <PiDownload className="text-white text-xl" />
                      </div>
                      <div className="text-right flex-1">
                        <div className="font-bold text-emerald-700 text-sm">گزارش مالی</div>
                        <div className="text-emerald-600 text-xs">خروجی کامل مالی</div>
                      </div>
                      <PiArrowUpRight className="text-emerald-500 group-hover:scale-110 transition-transform duration-300" />
                    </button>

                    <button className="w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-2xl transition-colors duration-200 flex items-center space-x-3 rtl:space-x-reverse group border border-blue-200">
                      <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <PiReceipt className="text-white text-xl" />
                      </div>
                      <div className="text-right flex-1">
                        <div className="font-bold text-blue-700 text-sm">صورتحساب‌ها</div>
                        <div className="text-blue-600 text-xs">مدیریت فاکتورها</div>
                      </div>
                      <PiArrowUpRight className="text-blue-500 group-hover:scale-110 transition-transform duration-300" />
                    </button>

                    <button className="w-full p-4 bg-purple-50 hover:bg-purple-100 rounded-2xl transition-colors duration-200 flex items-center space-x-3 rtl:space-x-reverse group border border-purple-200">
                      <div className="w-12 h-12 bg-purple-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <PiChartLine className="text-white text-xl" />
                      </div>
                      <div className="text-right flex-1">
                        <div className="font-bold text-purple-700 text-sm">آمار پرداخت</div>
                        <div className="text-purple-600 text-xs">تحلیل عملکرد</div>
                      </div>
                      <PiArrowUpRight className="text-purple-500 group-hover:scale-110 transition-transform duration-300" />
                    </button>
                  </div>
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

export default AdminPayments;