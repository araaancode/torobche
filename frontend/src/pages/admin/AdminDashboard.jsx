import React, { useState, useEffect } from 'react';
import { 
  PiUsers, 
  PiCards, 
  PiChartLine, 
  PiGear, 
  PiShield, 
  PiMoney, 
  PiBell,
  PiQrCode,
  PiStorefront,
  PiUserCircle,
  PiChartPieSlice,
  PiTrendUp,
  PiTrendDown,
  PiEye,
  PiDownload,
  PiExport,
  PiSparkle,
  PiShootingStar,
  PiConfetti,
  PiMagicWand,
  PiCrown,
  PiLightning,
  PiMedal,
  PiCheckCircle,
  PiRocket,
  PiCalendar,
  PiClock,
  PiEnvelope,
  PiPhone,
  PiMapPin,
  PiGraph,
  PiDatabase,
  PiLock,
  PiNotification,
  PiUserPlus,
  PiShoppingCart,
  PiChartBar,
  PiWallet,
  PiList,
  PiX,
  PiUser
} from 'react-icons/pi';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    setIsVisible(true);
    // Simulate loading notifications
    setNotifications([
      { id: 1, type: 'success', message: 'پرداخت جدید دریافت شد', time: '۲ دقیقه پیش', read: false },
      { id: 2, type: 'warning', message: 'کاربر جدید ثبت نام کرد', time: '۵ دقیقه پیش', read: false },
      { id: 3, type: 'info', message: 'سیستم بروزرسانی شد', time: '۱ ساعت پیش', read: true }
    ]);
  }, []);

  // آمار کلی
  const stats = [
    { 
      label: 'کاربران فعال', 
      value: '۲,۴۵۶', 
      change: '+۱۲٪', 
      changeValue: '۲۶۴',
      icon: <PiUsers className="text-2xl" />, 
      color: 'from-blue-500 to-cyan-500',
      bgGradient: 'bg-gradient-to-br from-blue-50/80 via-cyan-50/60 to-white',
      trend: 'up',
      description: 'ماه گذشته'
    },
    { 
      label: 'منوهای فعال', 
      value: '۱,۲۳۴', 
      change: '+۸٪', 
      changeValue: '۹۲',
      icon: <PiCards className="text-2xl" />, 
      color: 'from-green-500 to-emerald-500',
      bgGradient: 'bg-gradient-to-br from-green-50/80 via-emerald-50/60 to-white',
      trend: 'up',
      description: 'هفته جاری'
    },
    { 
      label: 'کارت ویزیت', 
      value: '۸۹۰', 
      change: '+۱۵٪', 
      changeValue: '۱۱۶',
      icon: <PiUserCircle className="text-2xl" />, 
      color: 'from-purple-500 to-pink-500',
      bgGradient: 'bg-gradient-to-br from-purple-50/80 via-pink-50/60 to-white',
      trend: 'up',
      description: 'امروز'
    },
    { 
      label: 'درآمد ماهانه', 
      value: '۲۴.۵M', 
      change: '+۲۳٪', 
      changeValue: '۴.۶M',
      icon: <PiMoney className="text-2xl" />, 
      color: 'from-orange-500 to-amber-500',
      bgGradient: 'bg-gradient-to-br from-orange-50/80 via-amber-50/60 to-white',
      trend: 'up',
      description: 'تومان'
    }
  ];

  // کاربران اخیر
  const recentUsers = [
    { 
      id: 1, 
      name: 'علی محمدی', 
      email: 'ali@example.com', 
      plan: 'حرفه‌ای', 
      status: 'فعال', 
      joinDate: '۱۴۰۲/۱۰/۱۵',
      avatar: 'A',
      revenue: '۲,۵۰۰,۰۰۰',
      lastActive: 'هم اکنون'
    },
    { 
      id: 2, 
      name: 'سارا احمدی', 
      email: 'sara@example.com', 
      plan: 'رایگان', 
      status: 'فعال', 
      joinDate: '۱۴۰۲/۱۰/۱۴',
      avatar: 'S',
      revenue: '۰',
      lastActive: '۵ دقیقه پیش'
    },
    { 
      id: 3, 
      name: 'محمد رضایی', 
      email: 'mohammad@example.com', 
      plan: 'تجاری', 
      status: 'فعال', 
      joinDate: '۱۴۰۲/۱۰/۱۳',
      avatar: 'M',
      revenue: '۵,۸۰۰,۰۰۰',
      lastActive: '۱ ساعت پیش'
    },
    { 
      id: 4, 
      name: 'فاطمه کریمی', 
      email: 'fateme@example.com', 
      plan: 'حرفه‌ای', 
      status: 'غیرفعال', 
      joinDate: '۱۴۰۲/۱۰/۱۲',
      avatar: 'F',
      revenue: '۱,۲۰۰,۰۰۰',
      lastActive: '۲ روز پیش'
    }
  ];

  // فعالیت‌های اخیر
  const recentActivities = [
    { 
      id: 1, 
      user: 'علی محمدی', 
      action: 'منوی جدید ایجاد کرد', 
      target: 'رستوران برگرلند', 
      time: '۲ دقیقه پیش', 
      type: 'create',
      icon: <PiSparkle className="text-sm" />
    },
    { 
      id: 2, 
      user: 'سارا احمدی', 
      action: 'کارت ویزیت آپدیت کرد', 
      target: 'کارت پزشک', 
      time: '۱۵ دقیقه پیش', 
      type: 'update',
      icon: <PiMagicWand className="text-sm" />
    },
    { 
      id: 3, 
      user: 'سیستم', 
      action: 'پرداخت موفق', 
      target: 'پلن حرفه‌ای - محمد رضایی', 
      time: '۱ ساعت پیش', 
      type: 'payment',
      icon: <PiMoney className="text-sm" />
    },
    { 
      id: 4, 
      user: 'فاطمه کریمی', 
      action: 'قالب جدید دانلود کرد', 
      target: 'مینیمال رستوران', 
      time: '۲ ساعت پیش', 
      type: 'download',
      icon: <PiDownload className="text-sm" />
    }
  ];

  // منوهای محبوب
  const popularMenus = [
    { 
      id: 1, 
      name: 'رستوران برگرلند', 
      views: 1245, 
      orders: 89, 
      revenue: '۴,۵۰۰,۰۰۰',
      growth: '+۱۲٪',
      category: 'رستوران'
    },
    { 
      id: 2, 
      name: 'کافه دنج', 
      views: 987, 
      orders: 67, 
      revenue: '۳,۲۰۰,۰۰۰',
      growth: '+۸٪',
      category: 'کافه'
    },
    { 
      id: 3, 
      name: 'فست فود مدرن', 
      views: 856, 
      orders: 123, 
      revenue: '۵,۸۰۰,۰۰۰',
      growth: '+۲۳٪',
      category: 'فست فود'
    },
    { 
      id: 4, 
      name: 'قنادی شیرین', 
      views: 654, 
      orders: 45, 
      revenue: '۲,۱۰۰,۰۰۰',
      growth: '+۵٪',
      category: 'قنادی'
    }
  ];

  // ترافیک و آمار
  const trafficStats = [
    { label: 'بازدید مستقیم', value: '۳۲٪', color: 'from-blue-500 to-cyan-500' },
    { label: 'جستجوی ارگانیک', value: '۲۴٪', color: 'from-green-500 to-emerald-500' },
    { label: 'شبکه‌های اجتماعی', value: '۱۸٪', color: 'from-purple-500 to-pink-500' },
    { label: 'ایمیل', value: '۱۴٪', color: 'from-orange-500 to-amber-500' },
    { label: 'سایر', value: '۱۲٪', color: 'from-gray-500 to-gray-600' }
  ];

  const navigationItems = [
    { id: 'overview', name: 'داشبورد', icon: <PiChartPieSlice className="text-xl" />, badge: null },
    { id: 'users', name: 'مدیریت کاربران', icon: <PiUsers className="text-xl" />, badge: '۱۲' },
    { id: 'menus', name: 'منوها', icon: <PiCards className="text-xl" />, badge: '۴۵' },
    { id: 'business-cards', name: 'کارت ویزیت', icon: <PiUserCircle className="text-xl" />, badge: '۲۳' },
    { id: 'templates', name: 'قالب‌ها', icon: <PiStorefront className="text-xl" />, badge: null },
    { id: 'qr-codes', name: 'QR کدها', icon: <PiQrCode className="text-xl" />, badge: '۸۹' },
    { id: 'analytics', name: 'آمار و گزارش', icon: <PiChartLine className="text-xl" />, badge: null },
    { id: 'payments', name: 'پرداخت‌ها', icon: <PiMoney className="text-xl" />, badge: 'جدید' },
    { id: 'settings', name: 'تنظیمات', icon: <PiGear className="text-xl" />, badge: null }
  ];

  const markNotificationAsRead = (id) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'success': return 'text-green-600 bg-green-100 border-green-200';
      case 'warning': return 'text-amber-600 bg-amber-100 border-amber-200';
      case 'info': return 'text-blue-600 bg-blue-100 border-blue-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
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
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center justify-between space-x-3 rtl:space-x-reverse p-3 rounded-xl mb-2 transition-all duration-200 group ${
                  activeSection === item.id
                    ? 'bg-gradient-to-r from-blue-50 to-blue-100/50 border border-blue-200 text-blue-700 shadow-sm'
                    : 'text-gray-600 hover:bg-gray-50/80 hover:text-gray-800 border border-transparent'
                }`}
              >
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <div className={`transition-colors duration-200 ${
                    activeSection === item.id ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'
                  }`}>
                    {item.icon}
                  </div>
                  {sidebarOpen && (
                    <span className={`font-medium text-sm transition-all duration-200 ${
                      activeSection === item.id ? 'text-blue-800' : 'text-gray-700'
                    }`}>
                      {item.name}
                    </span>
                  )}
                </div>
                
                {sidebarOpen && item.badge && (
                  <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                    activeSection === item.id 
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
                  <PiUser className="text-gray-600 text-sm" />
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
                  <h1 className="text-2xl font-black text-gray-800">داشبورد مدیریت</h1>
                  <p className="text-gray-500 text-sm">خوش آمدید، مدیر سیستم</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                {/* Notifications */}
                <div className="relative group">
                  <button className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-xl flex items-center justify-center transition-colors duration-200 shadow-sm relative">
                    <PiBell className="text-gray-600 text-lg" />
                    {notifications.filter(n => !n.read).length > 0 && (
                      <span className="absolute -top-1 -left-1 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center shadow-lg animate-pulse">
                        {notifications.filter(n => !n.read).length}
                      </span>
                    )}
                  </button>
                  
                  {/* Notifications Dropdown */}
                  <div className="absolute top-12 left-0 w-80 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                    <div className="p-4 border-b border-gray-200/50">
                      <h3 className="font-bold text-gray-800">اعلان‌ها</h3>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {notifications.map(notification => (
                        <div 
                          key={notification.id}
                          className={`p-4 border-b border-gray-100/50 hover:bg-gray-50/80 transition-colors duration-200 cursor-pointer ${
                            notification.read ? 'opacity-60' : ''
                          }`}
                          onClick={() => markNotificationAsRead(notification.id)}
                        >
                          <div className="flex items-start space-x-3 rtl:space-x-reverse">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getNotificationColor(notification.type)}`}>
                              <PiBell className="text-sm" />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm text-gray-800 font-medium">{notification.message}</p>
                              <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                            </div>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-4">
                      <button className="w-full text-center text-blue-600 hover:text-blue-700 text-sm font-medium py-2">
                        مشاهده همه اعلان‌ها
                      </button>
                    </div>
                  </div>
                </div>

                {/* User Profile */}
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
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white shadow-lg mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-black mb-2">سلام، مدیر سیستم! 👋</h2>
                  <p className="text-blue-100">امروز ۱۲۴ فعالیت جدید در سیستم ثبت شده است.</p>
                </div>
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-xl transition-colors duration-200 flex items-center space-x-2 rtl:space-x-reverse">
                    <PiDownload className="text-lg" />
                    <span>گزارش هفتگی</span>
                  </button>
                  <button className="bg-white text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-xl transition-colors duration-200 font-medium">
                    مشاهده آمار
                  </button>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
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
                      {stat.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {/* Recent Users & Activities */}
              <div className="xl:col-span-2 space-y-6">
                {/* Recent Users */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-black text-gray-800">کاربران اخیر</h2>
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-2 rtl:space-x-reverse group">
                      <span>مشاهده همه</span>
                      <PiEye className="text-lg group-hover:scale-110 transition-transform duration-300" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    {recentUsers.map(user => (
                      <div key={user.id} className="flex items-center justify-between p-4 bg-gray-50/80 rounded-xl hover:bg-white hover:shadow-md transition-all duration-300 border border-gray-200/50">
                        <div className="flex items-center space-x-3 rtl:space-x-reverse">
                          <div className={`w-10 h-10 bg-gradient-to-r ${
                            user.plan === 'حرفه‌ای' ? 'from-purple-500 to-pink-500' :
                            user.plan === 'تجاری' ? 'from-blue-500 to-cyan-500' :
                            'from-gray-500 to-gray-600'
                          } rounded-xl flex items-center justify-center text-white font-bold shadow-lg`}>
                            {user.avatar}
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-800">{user.name}</h4>
                            <p className="text-gray-600 text-sm">{user.email}</p>
                            <p className="text-gray-500 text-xs mt-1">{user.lastActive}</p>
                          </div>
                        </div>
                        <div className="text-left">
                          <div className="flex items-center space-x-4 rtl:space-x-reverse mb-2">
                            <span className={`px-3 py-1 rounded-lg text-xs font-medium ${
                              user.plan === 'حرفه‌ای' ? 'bg-purple-100 text-purple-700' :
                              user.plan === 'تجاری' ? 'bg-blue-100 text-blue-700' :
                              'bg-gray-100 text-gray-700'
                            }`}>
                              {user.plan}
                            </span>
                            <span className={`px-3 py-1 rounded-lg text-xs font-medium ${
                              user.status === 'فعال' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                            }`}>
                              {user.status}
                            </span>
                          </div>
                          <div className="text-green-600 font-bold text-sm">{user.revenue} تومان</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Popular Menus */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-black text-gray-800">منوهای محبوب</h2>
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-2 rtl:space-x-reverse group">
                      <span>گزارش کامل</span>
                      <PiDownload className="text-lg group-hover:scale-110 transition-transform duration-300" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    {popularMenus.map(menu => (
                      <div key={menu.id} className="flex items-center justify-between p-4 bg-gray-50/80 rounded-xl hover:bg-white hover:shadow-md transition-all duration-300 border border-gray-200/50">
                        <div className="flex items-center space-x-3 rtl:space-x-reverse">
                          <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl flex items-center justify-center shadow-lg">
                            <PiStorefront className="text-white text-lg" />
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-800">{menu.name}</h4>
                            <div className="flex items-center space-x-4 rtl:space-x-reverse text-xs text-gray-600 mt-1">
                              <span>بازدید: {menu.views}</span>
                              <span>سفارش: {menu.orders}</span>
                              <span className="px-2 py-1 bg-gray-100 rounded-lg text-gray-700">{menu.category}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-left">
                          <div className="text-green-600 font-bold text-lg mb-1">{menu.revenue}</div>
                          <div className="flex items-center space-x-1 rtl:space-x-reverse text-green-600 text-xs">
                            <PiTrendUp />
                            <span>{menu.growth}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recent Activities & Quick Stats */}
              <div className="xl:col-span-1 space-y-6">
                {/* Recent Activities */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6">
                  <h2 className="text-xl font-black text-gray-800 mb-6">فعالیت‌های اخیر</h2>

                  <div className="space-y-4">
                    {recentActivities.map(activity => (
                      <div key={activity.id} className="flex items-start space-x-3 rtl:space-x-reverse p-3 rounded-xl hover:bg-gray-50/80 transition-colors duration-200 group">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                          {activity.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="font-medium text-gray-800 text-sm">
                                <span className="text-blue-600">{activity.user}</span>
                                {' '}{activity.action}
                              </p>
                              <p className="text-gray-600 text-xs mt-1">{activity.target}</p>
                            </div>
                            <span className="text-gray-500 text-xs whitespace-nowrap bg-white px-2 py-1 rounded-lg">
                              {activity.time}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Traffic Stats */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6">
                  <h2 className="text-xl font-black text-gray-800 mb-6">منبع ترافیک</h2>

                  <div className="space-y-3">
                    {trafficStats.map((stat, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">{stat.label}</span>
                        <div className="flex items-center space-x-3 rtl:space-x-reverse">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full bg-gradient-to-r ${stat.color}`}
                              style={{ width: stat.value }}
                            ></div>
                          </div>
                          <span className="text-sm font-bold text-gray-800 w-8">{stat.value}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6">
                  <h2 className="text-xl font-black text-gray-800 mb-6">عملیات سریع</h2>

                  <div className="grid grid-cols-2 gap-3">
                    <button className="p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors duration-200 flex flex-col items-center space-y-2 group border border-blue-200">
                      <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <PiUserPlus className="text-white text-lg" />
                      </div>
                      <span className="font-medium text-blue-700 text-sm">کاربر جدید</span>
                    </button>

                    <button className="p-4 bg-green-50 hover:bg-green-100 rounded-xl transition-colors duration-200 flex flex-col items-center space-y-2 group border border-green-200">
                      <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <PiChartBar className="text-white text-lg" />
                      </div>
                      <span className="font-medium text-green-700 text-sm">گزارش مالی</span>
                    </button>

                    <button className="p-4 bg-purple-50 hover:bg-purple-100 rounded-xl transition-colors duration-200 flex flex-col items-center space-y-2 group border border-purple-200">
                      <div className="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <PiUser className="text-white text-lg" />
                      </div>
                      <span className="font-medium text-purple-700 text-sm">تنظیمات</span>
                    </button>

                    <button className="p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition-colors duration-200 flex flex-col items-center space-y-2 group border border-orange-200">
                      <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <PiWallet className="text-white text-lg" />
                      </div>
                      <span className="font-medium text-orange-700 text-sm">پرداخت‌ها</span>
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

export default AdminDashboard;