// pages/AdminAnalytics.js
import React, { useState, useEffect } from 'react';
import {
  PiShield,
  PiBell,
  PiSparkle,
  PiChartLine,
  PiChartPieSlice,
  PiTrendUp,
  PiTrendDown,
  PiDownload,
  PiExport,
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
  PiEye,
  PiCalendar,
  PiDevicephone,
  PiGlobe,
  PiChartBar,
  PiChartDonut,
  PiArrowUpRight,
  PiWarning,
  PiInfo
} from 'react-icons/pi';

const AdminAnalytics = ({ onNavigate }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [timeRange, setTimeRange] = useState('monthly');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const stats = [
    {
      label: 'بازدید کل',
      value: '۴۵,۶۷۸',
      change: '+۲۳٪',
      changeValue: '۸,۵۴۳',
      icon: <PiChartLine className="text-2xl" />,
      color: 'from-blue-500 to-cyan-500',
      bgGradient: 'bg-gradient-to-br from-blue-50/80 via-cyan-50/60 to-white',
      trend: 'up'
    },
    {
      label: 'کاربران جدید',
      value: '۱,۲۳۴',
      change: '+۱۲٪',
      changeValue: '۱۳۲',
      icon: <PiUsers className="text-2xl" />,
      color: 'from-green-500 to-emerald-500',
      bgGradient: 'bg-gradient-to-br from-green-50/80 via-emerald-50/60 to-white',
      trend: 'up'
    },
    {
      label: 'منوهای ایجاد شده',
      value: '۵۶۷',
      change: '+۸٪',
      changeValue: '۴۲',
      icon: <PiStorefront className="text-2xl" />,
      color: 'from-purple-500 to-pink-500',
      bgGradient: 'bg-gradient-to-br from-purple-50/80 via-pink-50/60 to-white',
      trend: 'up'
    },
    {
      label: 'درآمد ماه',
      value: '۳۴.۲M',
      change: '+۱۸٪',
      changeValue: '۵.۲M',
      icon: <PiMoney className="text-2xl" />,
      color: 'from-orange-500 to-amber-500',
      bgGradient: 'bg-gradient-to-br from-orange-50/80 via-amber-50/60 to-white',
      trend: 'up'
    }
  ];

  const topPages = [
    {
      name: 'منوی رستوران برگرلند',
      views: 1245,
      conversion: '۱۲.۳٪',
      bounce: '۲۳.۴٪',
      growth: '+۱۵٪',
      gradient: 'from-orange-500 to-amber-500'
    },
    {
      name: 'کارت ویزیت دکتر محمدی',
      views: 987,
      conversion: '۱۵.۶٪',
      bounce: '۱۸.۹٪',
      growth: '+۲۲٪',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      name: 'پروفایل شرکت نوآور',
      views: 856,
      conversion: '۹.۸٪',
      bounce: '۲۸.۷٪',
      growth: '+۸٪',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      name: 'کاتالوگ محصولات',
      views: 765,
      conversion: '۱۱.۲٪',
      bounce: '۲۱.۵٪',
      growth: '+۱۸٪',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      name: 'منوی کافه دنج',
      views: 654,
      conversion: '۱۴.۱٪',
      bounce: '۱۹.۸٪',
      growth: '+۲۵٪',
      gradient: 'from-indigo-500 to-purple-500'
    }
  ];

  const trafficSources = [
    { source: 'مستقیم', percentage: 45, visits: 20567, color: 'from-blue-500 to-cyan-500', growth: '+۱۲٪' },
    { source: 'جستجوی ارگانیک', percentage: 28, visits: 12789, color: 'from-green-500 to-emerald-500', growth: '+۱۸٪' },
    { source: 'شبکه‌های اجتماعی', percentage: 15, visits: 6845, color: 'from-purple-500 to-pink-500', growth: '+۳۲٪' },
    { source: 'ایمیل', percentage: 8, visits: 3654, color: 'from-orange-500 to-amber-500', growth: '+۵٪' },
    { source: 'سایر', percentage: 4, visits: 1823, color: 'from-gray-500 to-gray-600', growth: '+۳٪' }
  ];

  const deviceStats = [
    { device: 'موبایل', percentage: 62, visits: 28321, icon: <PiDevicephone className="text-lg" />, color: 'from-blue-500 to-cyan-500' },
    { device: 'دسکتاپ', percentage: 28, visits: 12789, icon: <PiGlobe className="text-lg" />, color: 'from-purple-500 to-pink-500' },
    { device: 'تبلت', percentage: 10, visits: 4568, icon: <PiChartBar className="text-lg" />, color: 'from-green-500 to-emerald-500' }
  ];

  const navigationItems = [
    { id: 'overview', name: 'داشبورد', icon: <PiChartPieSlice className="text-xl" />, badge: null },
    { id: 'users', name: 'مدیریت کاربران', icon: <PiUsers className="text-xl" />, badge: '۵' },
    { id: 'menus', name: 'منوها', icon: <PiStorefront className="text-xl" />, badge: '۶' },
    { id: 'business-cards', name: 'کارت ویزیت', icon: <PiUserCircle className="text-xl" />, badge: '۶' },
    { id: 'templates', name: 'قالب‌ها', icon: <PiSparkle className="text-xl" />, badge: '۶' },
    { id: 'qr-codes', name: 'QR کدها', icon: <PiChartLine className="text-xl" />, badge: '۸۹' },
    { id: 'analytics', name: 'آمار و گزارش', icon: <PiChartLine className="text-xl" />, badge: null },
    { id: 'payments', name: 'پرداخت‌ها', icon: <PiMoney className="text-xl" />, badge: 'جدید' },
    { id: 'settings', name: 'تنظیمات', icon: <PiGear className="text-xl" />, badge: null }
  ];

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
                className={`w-full flex items-center justify-between space-x-3 rtl:space-x-reverse p-3 rounded-xl mb-2 transition-all duration-200 group ${item.id === 'analytics'
                    ? 'bg-gradient-to-r from-blue-50 to-blue-100/50 border border-blue-200 text-blue-700 shadow-sm'
                    : 'text-gray-600 hover:bg-gray-50/80 hover:text-gray-800 border border-transparent'
                  }`}
              >
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <div className={`transition-colors duration-200 ${item.id === 'analytics' ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'
                    }`}>
                    {item.icon}
                  </div>
                  {sidebarOpen && (
                    <span className={`font-medium text-sm transition-all duration-200 ${item.id === 'analytics' ? 'text-blue-800' : 'text-gray-700'
                      }`}>
                      {item.name}
                    </span>
                  )}
                </div>

                {sidebarOpen && item.badge && (
                  <span className={`px-2 py-1 rounded-lg text-xs font-medium ${item.id === 'analytics'
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
                  <h1 className="text-2xl font-black text-gray-800">آمار و گزارش</h1>
                  <p className="text-gray-500 text-sm">تحلیل و بررسی عملکرد سیستم</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <select
                    value={timeRange}
                    onChange={(e) => setTimeRange(e.target.value)}
                    className="px-4 py-2 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm text-sm"
                  >
                    <option value="daily">روزانه</option>
                    <option value="weekly">هفتگی</option>
                    <option value="monthly">ماهانه</option>
                    <option value="yearly">سالانه</option>
                  </select>
                </div>
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
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 text-white shadow-lg mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-black mb-2">داشبورد تحلیلی 📊</h2>
                  <p className="text-indigo-100">بررسی جامع عملکرد و آمار سیستم در بازه زمانی انتخابی</p>
                </div>
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-xl transition-colors duration-200 flex items-center space-x-2 rtl:space-x-reverse">
                    <PiDownload className="text-lg" />
                    <span>گزارش کامل</span>
                  </button>
                  <button className="bg-white text-indigo-600 hover:bg-indigo-50 px-4 py-2 rounded-xl transition-colors duration-200 font-medium">
                    خروجی Excel
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
                    <div className={`flex items-center space-x-1 rtl:space-x-reverse text-sm font-bold ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
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

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
              {/* Top Pages */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-black text-gray-800">صفحات برتر</h2>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-2 rtl:space-x-reverse group">
                    <span>مشاهده همه</span>
                    <PiArrowUpRight className="text-lg group-hover:scale-110 transition-transform duration-300" />
                  </button>
                </div>

                <div className="space-y-4">
                  {topPages.map((page, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-white to-gray-50/80 rounded-2xl hover:shadow-lg transition-all duration-300 hover:scale-105 backdrop-blur-sm border border-white/40">
                      <div className="flex items-center space-x-3 rtl:space-x-reverse">
                        <div className={`w-10 h-10 bg-gradient-to-r ${page.gradient} rounded-2xl flex items-center justify-center text-white font-bold shadow-lg`}>
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-800 text-sm">{page.name}</h4>
                          <div className="flex items-center space-x-3 rtl:space-x-reverse text-xs text-gray-600 mt-1">
                            <span>بازدید: {page.views}</span>
                            <span>نرخ تبدیل: {page.conversion}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-left">
                        <div className="flex items-center space-x-2 rtl:space-x-reverse mb-1">
                          <div className="text-red-600 font-bold text-sm">{page.bounce}</div>
                          <div className={`flex items-center space-x-1 rtl:space-x-reverse text-xs font-bold text-green-600`}>
                            <PiTrendUp />
                            <span>{page.growth}</span>
                          </div>
                        </div>
                        <div className="text-gray-500 text-xs">نرخ خروج</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Traffic Sources */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6">
                <h2 className="text-xl font-black text-gray-800 mb-6">منابع ترافیک</h2>

                <div className="space-y-4">
                  {trafficSources.map((source, index) => (
                    <div key={index} className="space-y-3 group hover:bg-white/60 p-3 rounded-2xl transition-all duration-300">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3 rtl:space-x-reverse">
                          <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${source.color}`}></div>
                          <span className="font-medium text-gray-800">{source.source}</span>
                        </div>
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                          <span className="text-gray-600 text-sm font-bold">{source.percentage}٪</span>
                          <div className={`flex items-center space-x-1 rtl:space-x-reverse text-xs font-bold text-green-600`}>
                            <PiTrendUp />
                            <span>{source.growth}</span>
                          </div>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full bg-gradient-to-r ${source.color} transition-all duration-500 group-hover:scale-105`}
                          style={{ width: `${source.percentage}%` }}
                        ></div>
                      </div>
                      <div className="flex items-center justify-between text-gray-500 text-xs">
                        <span>{source.visits.toLocaleString()} بازدید</span>
                        <span>{source.percentage}٪ از کل ترافیک</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Device Analytics & Quick Reports */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Device Analytics */}
              <div className="lg:col-span-2 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6">
                <h2 className="text-xl font-black text-gray-800 mb-6">آمار دستگاه‌ها</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {deviceStats.map((device, index) => (
                    <div key={index} className="bg-gradient-to-br from-white to-gray-50/80 rounded-2xl p-4 border border-white/40 hover:shadow-lg transition-all duration-300 group">
                      <div className="flex items-center justify-between mb-3">
                        <div className={`w-10 h-10 bg-gradient-to-r ${device.color} rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                          {device.icon}
                        </div>
                        <div className="text-left">
                          <div className="text-gray-800 font-black text-lg">{device.percentage}٪</div>
                          <div className="text-gray-500 text-xs">{device.device}</div>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full bg-gradient-to-r ${device.color}`}
                          style={{ width: `${device.percentage}%` }}
                        ></div>
                      </div>
                      <div className="text-gray-500 text-xs mt-2">
                        {device.visits.toLocaleString()} بازدید
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Reports */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6">
                <h2 className="text-xl font-black text-gray-800 mb-6">گزارش‌های سریع</h2>
                <div className="space-y-4">
                  <button className="w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-2xl transition-colors duration-200 flex items-center space-x-3 rtl:space-x-reverse group border border-blue-200">
                    <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <PiUsers className="text-white text-xl" />
                    </div>
                    <div className="text-right flex-1">
                      <div className="font-bold text-blue-700 text-sm">گزارش کاربران</div>
                      <div className="text-blue-600 text-xs">تحلیل رفتار کاربران</div>
                    </div>
                    <PiArrowUpRight className="text-blue-500 group-hover:scale-110 transition-transform duration-300" />
                  </button>

                  <button className="w-full p-4 bg-green-50 hover:bg-green-100 rounded-2xl transition-colors duration-200 flex items-center space-x-3 rtl:space-x-reverse group border border-green-200">
                    <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <PiMoney className="text-white text-xl" />
                    </div>
                    <div className="text-right flex-1">
                      <div className="font-bold text-green-700 text-sm">گزارش مالی</div>
                      <div className="text-green-600 text-xs">درآمد و فروش</div>
                    </div>
                    <PiArrowUpRight className="text-green-500 group-hover:scale-110 transition-transform duration-300" />
                  </button>

                  <button className="w-full p-4 bg-purple-50 hover:bg-purple-100 rounded-2xl transition-colors duration-200 flex items-center space-x-3 rtl:space-x-reverse group border border-purple-200">
                    <div className="w-12 h-12 bg-purple-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <PiChartLine className="text-white text-xl" />
                    </div>
                    <div className="text-right flex-1">
                      <div className="font-bold text-purple-700 text-sm">گزارش ترافیک</div>
                      <div className="text-purple-600 text-xs">منابع و رفتارها</div>
                    </div>
                    <PiArrowUpRight className="text-purple-500 group-hover:scale-110 transition-transform duration-300" />
                  </button>

                  <button className="w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-2xl transition-colors duration-200 flex items-center space-x-3 rtl:space-x-reverse group border border-orange-200">
                    <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <PiDownload className="text-white text-xl" />
                    </div>
                    <div className="text-right flex-1">
                      <div className="font-bold text-orange-700 text-sm">خروجی کامل</div>
                      <div className="text-orange-600 text-xs">Excel & PDF</div>
                    </div>
                    <PiArrowUpRight className="text-orange-500 group-hover:scale-110 transition-transform duration-300" />
                  </button>
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

export default AdminAnalytics;