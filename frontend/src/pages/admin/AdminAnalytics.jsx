// pages/AdminAnalytics.js
import React, { useState } from 'react';
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
  PiMoney
} from 'react-icons/pi';

const AdminAnalytics = ({ onNavigate }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [timeRange, setTimeRange] = useState('monthly');

  const stats = [
    { 
      label: 'بازدید کل', 
      value: '۴۵,۶۷۸', 
      change: '+۲۳٪', 
      icon: <PiChartLine className="text-2xl" />, 
      color: 'from-blue-500 to-cyan-500',
      trend: 'up'
    },
    { 
      label: 'کاربران جدید', 
      value: '۱,۲۳۴', 
      change: '+۱۲٪', 
      icon: <PiUsers className="text-2xl" />, 
      color: 'from-green-500 to-emerald-500',
      trend: 'up'
    },
    { 
      label: 'منوهای ایجاد شده', 
      value: '۵۶۷', 
      change: '+۸٪', 
      icon: <PiStorefront className="text-2xl" />, 
      color: 'from-purple-500 to-pink-500',
      trend: 'up'
    },
    { 
      label: 'درآمد ماه', 
      value: '۳۴.۲M', 
      change: '+۱۸٪', 
      icon: <PiMoney className="text-2xl" />, 
      color: 'from-orange-500 to-amber-500',
      trend: 'up'
    }
  ];

  const topPages = [
    { name: 'منوی رستوران برگرلند', views: 1245, conversion: '۱۲.۳٪', bounce: '۲۳.۴٪' },
    { name: 'کارت ویزیت دکتر محمدی', views: 987, conversion: '۱۵.۶٪', bounce: '۱۸.۹٪' },
    { name: 'پروفایل شرکت نوآور', views: 856, conversion: '۹.۸٪', bounce: '۲۸.۷٪' },
    { name: 'کاتالوگ محصولات', views: 765, conversion: '۱۱.۲٪', bounce: '۲۱.۵٪' },
    { name: 'منوی کافه دنج', views: 654, conversion: '۱۴.۱٪', bounce: '۱۹.۸٪' }
  ];

  const trafficSources = [
    { source: 'مستقیم', percentage: 45, visits: 20567, color: 'bg-blue-500' },
    { source: 'جستجوی ارگانیک', percentage: 28, visits: 12789, color: 'bg-green-500' },
    { source: 'شبکه‌های اجتماعی', percentage: 15, visits: 6845, color: 'bg-purple-500' },
    { source: 'ایمیل', percentage: 8, visits: 3654, color: 'bg-orange-500' },
    { source: 'سایر', percentage: 4, visits: 1823, color: 'bg-gray-500' }
  ];

  const navigationItems = [
    { id: 'overview', name: 'داشبورد', icon: <PiSparkle className="text-lg" /> },
    { id: 'users', name: 'مدیریت کاربران', icon: <PiSparkle className="text-lg" /> },
    { id: 'menus', name: 'منوها', icon: <PiSparkle className="text-lg" /> },
    { id: 'business-cards', name: 'کارت ویزیت', icon: <PiSparkle className="text-lg" /> },
    { id: 'templates', name: 'قالب‌ها', icon: <PiSparkle className="text-lg" /> },
    { id: 'qr-codes', name: 'QR کدها', icon: <PiSparkle className="text-lg" /> },
    { id: 'analytics', name: 'آمار و گزارش', icon: <PiChartLine className="text-lg" /> },
    { id: 'payments', name: 'پرداخت‌ها', icon: <PiSparkle className="text-lg" /> },
    { id: 'settings', name: 'تنظیمات', icon: <PiSparkle className="text-lg" /> }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`bg-white border-l border-gray-200 transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-20'}`}>
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center">
              <PiShield className="text-white text-lg" />
            </div>
            {sidebarOpen && (
              <div>
                <h1 className="text-lg font-black text-gray-800">پنل مدیریت</h1>
                <p className="text-gray-500 text-xs">تربچه</p>
              </div>
            )}
          </div>
        </div>

        <nav className="p-4">
          {navigationItems.map(item => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center space-x-3 rtl:space-x-reverse p-3 rounded-2xl mb-2 transition-all duration-200 ${
                item.id === 'analytics'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {item.icon}
              {sidebarOpen && <span className="font-medium">{item.name}</span>}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="w-10 h-10 bg-gray-100 rounded-2xl flex items-center justify-center hover:bg-gray-200 transition-colors duration-200"
              >
                <PiSparkle className="text-gray-600 text-lg" />
              </button>
              <h1 className="text-2xl font-black text-gray-800">آمار و گزارش</h1>
            </div>

            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <select 
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="bg-white border border-gray-200 rounded-2xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="daily">روزانه</option>
                  <option value="weekly">هفتگی</option>
                  <option value="monthly">ماهانه</option>
                  <option value="yearly">سالانه</option>
                </select>
              </div>
              <button className="w-10 h-10 bg-gray-100 rounded-2xl flex items-center justify-center hover:bg-gray-200 transition-colors duration-200 relative">
                <PiBell className="text-gray-600 text-lg" />
                <span className="absolute -top-1 -left-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                  ۳
                </span>
              </button>
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center text-white font-bold">
                A
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="p-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                    {stat.icon}
                  </div>
                  <div className={`flex items-center space-x-1 rtl:space-x-reverse text-sm font-medium ${
                    stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    <PiTrendUp className={stat.trend === 'up' ? '' : 'transform rotate-180'} />
                    <span>{stat.change}</span>
                  </div>
                </div>
                <div className="text-left">
                  <div className="text-2xl font-black text-gray-800">{stat.value}</div>
                  <div className="text-gray-600 text-sm">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {/* Top Pages */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-black text-gray-800">صفحات برتر</h2>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1 rtl:space-x-reverse">
                  <span>مشاهده همه</span>
                  <PiDownload className="text-lg" />
                </button>
              </div>

              <div className="space-y-4">
                {topPages.map((page, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors duration-200">
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center text-white font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800">{page.name}</h4>
                        <div className="flex items-center space-x-3 rtl:space-x-reverse text-xs text-gray-600 mt-1">
                          <span>بازدید: {page.views}</span>
                          <span>نرخ تبدیل: {page.conversion}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-left">
                      <div className="text-red-600 font-bold text-sm">{page.bounce}</div>
                      <div className="text-gray-500 text-xs">نرخ خروج</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Traffic Sources */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-black text-gray-800 mb-6">منابع ترافیک</h2>

              <div className="space-y-4">
                {trafficSources.map((source, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <div className={`w-3 h-3 rounded-full ${source.color}`}></div>
                        <span className="font-medium text-gray-800">{source.source}</span>
                      </div>
                      <div className="text-gray-600 text-sm">{source.percentage}٪</div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${source.color}`}
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

          {/* Additional Analytics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {/* User Acquisition */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-black text-gray-800 mb-6">اکتساب کاربر</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-2xl">
                  <span className="text-blue-700 font-medium">ثبت‌نام جدید</span>
                  <span className="text-blue-700 font-bold">۱۲۳</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-2xl">
                  <span className="text-green-700 font-medium">کاربران فعال</span>
                  <span className="text-green-700 font-bold">۹۸۷</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-2xl">
                  <span className="text-purple-700 font-medium">نرخ نگهداری</span>
                  <span className="text-purple-700 font-bold">۷۶٪</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-black text-gray-800 mb-6">گزارش‌های سریع</h2>
              <div className="grid grid-cols-2 gap-4">
                <button className="p-4 bg-blue-50 rounded-2xl hover:bg-blue-100 transition-colors duration-200 flex flex-col items-center space-y-2">
                  <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center">
                    <PiUsers className="text-white text-xl" />
                  </div>
                  <span className="font-medium text-blue-700 text-sm">گزارش کاربران</span>
                </button>

                <button className="p-4 bg-green-50 rounded-2xl hover:bg-green-100 transition-colors duration-200 flex flex-col items-center space-y-2">
                  <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center">
                    <PiMoney className="text-white text-xl" />
                  </div>
                  <span className="font-medium text-green-700 text-sm">گزارش مالی</span>
                </button>

                <button className="p-4 bg-purple-50 rounded-2xl hover:bg-purple-100 transition-colors duration-200 flex flex-col items-center space-y-2">
                  <div className="w-12 h-12 bg-purple-500 rounded-2xl flex items-center justify-center">
                    <PiChartLine className="text-white text-xl" />
                  </div>
                  <span className="font-medium text-purple-700 text-sm">گزارش ترافیک</span>
                </button>

                <button className="p-4 bg-orange-50 rounded-2xl hover:bg-orange-100 transition-colors duration-200 flex flex-col items-center space-y-2">
                  <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center">
                    <PiDownload className="text-white text-xl" />
                  </div>
                  <span className="font-medium text-orange-700 text-sm">خروجی Excel</span>
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminAnalytics;