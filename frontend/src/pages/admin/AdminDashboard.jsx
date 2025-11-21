import React, { useState } from 'react';
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
  PiEye,
  PiDownload,
  PiExport,
  PiSparkle
} from 'react-icons/pi';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // آمار کلی
  const stats = [
    { 
      label: 'کاربران کل', 
      value: '۲,۴۵۶', 
      change: '+۱۲٪', 
      icon: <PiUsers className="text-2xl" />, 
      color: 'from-blue-500 to-cyan-500',
      trend: 'up'
    },
    { 
      label: 'منوهای فعال', 
      value: '۱,۲۳۴', 
      change: '+۸٪', 
      icon: <PiCards className="text-2xl" />, 
      color: 'from-green-500 to-emerald-500',
      trend: 'up'
    },
    { 
      label: 'کارت ویزیت', 
      value: '۸۹۰', 
      change: '+۱۵٪', 
      icon: <PiUserCircle className="text-2xl" />, 
      color: 'from-purple-500 to-pink-500',
      trend: 'up'
    },
    { 
      label: 'درآمد ماهانه', 
      value: '۲۴.۵M', 
      change: '+۲۳٪', 
      icon: <PiMoney className="text-2xl" />, 
      color: 'from-orange-500 to-amber-500',
      trend: 'up'
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
      avatar: 'A'
    },
    { 
      id: 2, 
      name: 'سارا احمدی', 
      email: 'sara@example.com', 
      plan: 'رایگان', 
      status: 'فعال', 
      joinDate: '۱۴۰۲/۱۰/۱۴',
      avatar: 'S'
    },
    { 
      id: 3, 
      name: 'محمد رضایی', 
      email: 'mohammad@example.com', 
      plan: 'تجاری', 
      status: 'فعال', 
      joinDate: '۱۴۰۲/۱۰/۱۳',
      avatar: 'M'
    },
    { 
      id: 4, 
      name: 'فاطمه کریمی', 
      email: 'fateme@example.com', 
      plan: 'حرفه‌ای', 
      status: 'غیرفعال', 
      joinDate: '۱۴۰۲/۱۰/۱۲',
      avatar: 'F'
    }
  ];

  // فعالیت‌های اخیر
  const recentActivities = [
    { id: 1, user: 'علی محمدی', action: 'منوی جدید ایجاد کرد', target: 'رستوران برگرلند', time: '۲ دقیقه پیش', type: 'create' },
    { id: 2, user: 'سارا احمدی', action: 'کارت ویزیت آپدیت کرد', target: 'کارت پزشک', time: '۱۵ دقیقه پیش', type: 'update' },
    { id: 3, user: 'سیستم', action: 'پرداخت موفق', target: 'پلن حرفه‌ای - محمد رضایی', time: '۱ ساعت پیش', type: 'payment' },
    { id: 4, user: 'فاطمه کریمی', action: 'قالب جدید دانلود کرد', target: 'مینیمال رستوران', time: '۲ ساعت پیش', type: 'download' }
  ];

  // منوهای محبوب
  const popularMenus = [
    { id: 1, name: 'رستوران برگرلند', views: 1245, orders: 89, revenue: '۴,۵۰۰,۰۰۰' },
    { id: 2, name: 'کافه دنج', views: 987, orders: 67, revenue: '۳,۲۰۰,۰۰۰' },
    { id: 3, name: 'فست فود مدرن', views: 856, orders: 123, revenue: '۵,۸۰۰,۰۰۰' },
    { id: 4, name: 'قنادی شیرین', views: 654, orders: 45, revenue: '۲,۱۰۰,۰۰۰' }
  ];

  const navigationItems = [
    { id: 'overview', name: 'داشبورد', icon: <PiChartPieSlice className="text-lg" /> },
    { id: 'users', name: 'مدیریت کاربران', icon: <PiUsers className="text-lg" /> },
    { id: 'menus', name: 'منوها', icon: <PiCards className="text-lg" /> },
    { id: 'business-cards', name: 'کارت ویزیت', icon: <PiUserCircle className="text-lg" /> },
    { id: 'templates', name: 'قالب‌ها', icon: <PiStorefront className="text-lg" /> },
    { id: 'qr-codes', name: 'QR کدها', icon: <PiQrCode className="text-lg" /> },
    { id: 'analytics', name: 'آمار و گزارش', icon: <PiChartLine className="text-lg" /> },
    { id: 'payments', name: 'پرداخت‌ها', icon: <PiMoney className="text-lg" /> },
    { id: 'settings', name: 'تنظیمات', icon: <PiGear className="text-lg" /> }
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case 'create': return '🆕';
      case 'update': return '✏️';
      case 'payment': return '💳';
      case 'download': return '📥';
      default: return '📝';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'create': return 'text-green-600 bg-green-100';
      case 'update': return 'text-blue-600 bg-blue-100';
      case 'payment': return 'text-purple-600 bg-purple-100';
      case 'download': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

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
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center space-x-3 rtl:space-x-reverse p-3 rounded-2xl mb-2 transition-all duration-200 ${
                activeSection === item.id
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
              <h1 className="text-2xl font-black text-gray-800">داشبورد مدیریت</h1>
            </div>

            <div className="flex items-center space-x-4 rtl:space-x-reverse">
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

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Recent Users */}
            <div className="xl:col-span-2">
              <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-black text-gray-800">کاربران اخیر</h2>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1 rtl:space-x-reverse">
                    <span>مشاهده همه</span>
                    <PiEye className="text-lg" />
                  </button>
                </div>

                <div className="space-y-4">
                  {recentUsers.map(user => (
                    <div key={user.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors duration-200">
                      <div className="flex items-center space-x-3 rtl:space-x-reverse">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center text-white font-bold">
                          {user.avatar}
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800">{user.name}</h4>
                          <p className="text-gray-600 text-sm">{user.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 rtl:space-x-reverse">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          user.plan === 'حرفه‌ای' ? 'bg-blue-100 text-blue-700' :
                          user.plan === 'تجاری' ? 'bg-purple-100 text-purple-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {user.plan}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          user.status === 'فعال' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {user.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Activities */}
            <div className="xl:col-span-1">
              <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-black text-gray-800 mb-6">فعالیت‌های اخیر</h2>

                <div className="space-y-4">
                  {recentActivities.map(activity => (
                    <div key={activity.id} className="flex items-start space-x-3 rtl:space-x-reverse p-3 rounded-2xl hover:bg-gray-50 transition-colors duration-200">
                      <div className={`w-8 h-8 rounded-2xl flex items-center justify-center text-sm ${getActivityColor(activity.type)}`}>
                        {getActivityIcon(activity.type)}
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
                          <span className="text-gray-500 text-xs whitespace-nowrap">{activity.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Popular Menus */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-black text-gray-800">منوهای محبوب</h2>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1 rtl:space-x-reverse">
                  <span>گزارش کامل</span>
                  <PiDownload className="text-lg" />
                </button>
              </div>

              <div className="space-y-4">
                {popularMenus.map(menu => (
                  <div key={menu.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors duration-200">
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                      <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center">
                        <PiStorefront className="text-white text-lg" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800">{menu.name}</h4>
                        <div className="flex items-center space-x-3 rtl:space-x-reverse text-xs text-gray-600 mt-1">
                          <span>بازدید: {menu.views}</span>
                          <span>سفارش: {menu.orders}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-left">
                      <div className="text-green-600 font-bold">{menu.revenue}</div>
                      <div className="text-gray-500 text-xs">تومان</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-black text-gray-800 mb-6">عملیات سریع</h2>

              <div className="grid grid-cols-2 gap-4">
                <button className="p-4 bg-blue-50 rounded-2xl hover:bg-blue-100 transition-colors duration-200 flex flex-col items-center space-y-2">
                  <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center">
                    <PiUsers className="text-white text-xl" />
                  </div>
                  <span className="font-medium text-blue-700 text-sm">مدیریت کاربران</span>
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
                  <span className="font-medium text-purple-700 text-sm">آمار سیستم</span>
                </button>

                <button className="p-4 bg-orange-50 rounded-2xl hover:bg-orange-100 transition-colors duration-200 flex flex-col items-center space-y-2">
                  <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center">
                    <PiGear className="text-white text-xl" />
                  </div>
                  <span className="font-medium text-orange-700 text-sm">تنظیمات</span>
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;