// pages/Users.js
import React, { useState, useEffect } from 'react';
import { 
  PiUsers, 
  PiShield, 
  PiBell,
  PiSparkle,
  PiEye,
  PiDownload,
  PiExport,
  PiPlus,
  PiMagnifyingGlass,
  PiFunnel,
  PiDotsThreeVertical,
  PiTrash,
  PiPencil,
  PiUserPlus,
  PiTrendUp,
  PiTrendDown,
  PiChartLine,
  PiChartPieSlice,
  PiStorefront,
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
  PiPhone,
  PiEnvelope,
  PiMapPin,
  PiWarning,
  PiInfo,
  PiCaretDown,
  PiCaretUp,
  PiUser
} from 'react-icons/pi';

const AdminUsers = ({ onNavigate }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPlan, setFilterPlan] = useState('all');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const users = [
    {
      id: 1,
      name: 'علی محمدی',
      email: 'ali@example.com',
      phone: '09123456789',
      plan: 'حرفه‌ای',
      status: 'فعال',
      joinDate: '۱۴۰۲/۱۰/۱۵',
      lastLogin: '۲ ساعت پیش',
      menus: 12,
      cards: 5,
      revenue: '۵,۲۰۰,۰۰۰',
      growth: '+۱۵٪',
      avatar: 'A',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      id: 2,
      name: 'سارا احمدی',
      email: 'sara@example.com',
      phone: '09123456788',
      plan: 'رایگان',
      status: 'فعال',
      joinDate: '۱۴۰۲/۱۰/۱۴',
      lastLogin: '۱ روز پیش',
      menus: 3,
      cards: 1,
      revenue: '۰',
      growth: '۰٪',
      avatar: 'S',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      id: 3,
      name: 'محمد رضایی',
      email: 'mohammad@example.com',
      phone: '09123456787',
      plan: 'تجاری',
      status: 'فعال',
      joinDate: '۱۴۰۲/۱۰/۱۳',
      lastLogin: '۳۰ دقیقه پیش',
      menus: 25,
      cards: 8,
      revenue: '۱۲,۵۰۰,۰۰۰',
      growth: '+۳۲٪',
      avatar: 'M',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      id: 4,
      name: 'فاطمه کریمی',
      email: 'fateme@example.com',
      phone: '09123456786',
      plan: 'حرفه‌ای',
      status: 'غیرفعال',
      joinDate: '۱۴۰۲/۱۰/۱۲',
      lastLogin: '۱ هفته پیش',
      menus: 8,
      cards: 3,
      revenue: '۲,۸۰۰,۰۰۰',
      growth: '-۸٪',
      avatar: 'F',
      gradient: 'from-orange-500 to-amber-500'
    },
    {
      id: 5,
      name: 'رضا حسینی',
      email: 'reza@example.com',
      phone: '09123456785',
      plan: 'رایگان',
      status: 'فعال',
      joinDate: '۱۴۰۲/۱۰/۱۱',
      lastLogin: '۱۲ ساعت پیش',
      menus: 2,
      cards: 0,
      revenue: '۰',
      growth: '۰٪',
      avatar: 'R',
      gradient: 'from-gray-500 to-gray-600'
    }
  ];

  const navigationItems = [
    { id: 'overview', name: 'داشبورد', icon: <PiChartPieSlice className="text-xl" />, badge: null },
    { id: 'users', name: 'مدیریت کاربران', icon: <PiUsers className="text-xl" />, badge: '۵' },
    { id: 'menus', name: 'منوها', icon: <PiStorefront className="text-xl" />, badge: '۴۵' },
    { id: 'business-cards', name: 'کارت ویزیت', icon: <PiUserCircle className="text-xl" />, badge: '۲۳' },
    { id: 'templates', name: 'قالب‌ها', icon: <PiSparkle className="text-xl" />, badge: null },
    { id: 'qr-codes', name: 'QR کدها', icon: <PiQrCode className="text-xl" />, badge: '۸۹' },
    { id: 'analytics', name: 'آمار و گزارش', icon: <PiChartLine className="text-xl" />, badge: null },
    { id: 'payments', name: 'پرداخت‌ها', icon: <PiMoney className="text-xl" />, badge: 'جدید' },
    { id: 'settings', name: 'تنظیمات', icon: <PiGear className="text-xl" />, badge: null }
  ];

  const userStats = [
    { 
      label: 'کاربران کل', 
      value: '۲,۴۵۶', 
      change: '+۱۲٪', 
      changeValue: '۲۶۴',
      icon: <PiUsers className="text-2xl" />, 
      color: 'from-blue-500 to-cyan-500',
      bgGradient: 'bg-gradient-to-br from-blue-50/80 via-cyan-50/60 to-white',
      trend: 'up'
    },
    { 
      label: 'کاربران فعال', 
      value: '۲,۱۲۳', 
      change: '+۸٪', 
      changeValue: '۱۵۷',
      icon: <PiUserCircle className="text-2xl" />, 
      color: 'from-green-500 to-emerald-500',
      bgGradient: 'bg-gradient-to-br from-green-50/80 via-emerald-50/60 to-white',
      trend: 'up'
    },
    { 
      label: 'کاربران غیرفعال', 
      value: '۳۳۳', 
      change: '-۵٪', 
      changeValue: '۱۸',
      icon: <PiWarning className="text-2xl" />, 
      color: 'from-purple-500 to-pink-500',
      bgGradient: 'bg-gradient-to-br from-purple-50/80 via-pink-50/60 to-white',
      trend: 'down'
    },
    { 
      label: 'نرخ فعال', 
      value: '۷۶٪', 
      change: '+۳٪', 
      changeValue: '۲.۳٪',
      icon: <PiChartLine className="text-2xl" />, 
      color: 'from-orange-500 to-amber-500',
      bgGradient: 'bg-gradient-to-br from-orange-50/80 via-amber-50/60 to-white',
      trend: 'up'
    }
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    const matchesPlan = filterPlan === 'all' || user.plan === filterPlan;
    
    return matchesSearch && matchesStatus && matchesPlan;
  });

  const toggleUserSelection = (userId) => {
    setSelectedUsers(prev =>
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const selectAllUsers = () => {
    setSelectedUsers(selectedUsers.length === users.length ? [] : users.map(user => user.id));
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
                  item.id === 'users'
                    ? 'bg-gradient-to-r from-blue-50 to-blue-100/50 border border-blue-200 text-blue-700 shadow-sm'
                    : 'text-gray-600 hover:bg-gray-50/80 hover:text-gray-800 border border-transparent'
                }`}
              >
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <div className={`transition-colors duration-200 ${
                    item.id === 'users' ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'
                  }`}>
                    {item.icon}
                  </div>
                  {sidebarOpen && (
                    <span className={`font-medium text-sm transition-all duration-200 ${
                      item.id === 'users' ? 'text-blue-800' : 'text-gray-700'
                    }`}>
                      {item.name}
                    </span>
                  )}
                </div>
                
                {sidebarOpen && item.badge && (
                  <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                    item.id === 'users' 
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
                  <h1 className="text-2xl font-black text-gray-800">مدیریت کاربران</h1>
                  <p className="text-gray-500 text-sm">مدیریت و نظارت بر کاربران سیستم</p>
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
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white shadow-lg mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-black mb-2">مدیریت کاربران 👥</h2>
                  <p className="text-blue-100">شما در حال مدیریت {users.length} کاربر فعال در سیستم هستید.</p>
                </div>
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-xl transition-colors duration-200 flex items-center space-x-2 rtl:space-x-reverse">
                    <PiDownload className="text-lg" />
                    <span>گزارش کاربران</span>
                  </button>
                  <button className="bg-white text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-xl transition-colors duration-200 font-medium">
                    آمار کامل
                  </button>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {userStats.map((stat, index) => (
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
                    placeholder="جستجوی کاربر بر اساس نام یا ایمیل..."
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
                    value={filterPlan}
                    onChange={(e) => setFilterPlan(e.target.value)}
                    className="px-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm text-sm"
                  >
                    <option value="all">همه پلن‌ها</option>
                    <option value="رایگان">رایگان</option>
                    <option value="حرفه‌ای">حرفه‌ای</option>
                    <option value="تجاری">تجاری</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <button className="flex items-center space-x-2 rtl:space-x-reverse px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl hover:shadow-lg transition-all duration-300 shadow-md hover:scale-105">
                  <PiUserPlus className="text-lg" />
                  <span className="font-medium">افزودن کاربر جدید</span>
                </button>
                <button className="flex items-center space-x-2 rtl:space-x-reverse px-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl hover:bg-white hover:shadow-md transition-all duration-300 shadow-sm">
                  <PiExport className="text-lg" />
                  <span className="font-medium">خروجی Excel</span>
                </button>
              </div>
            </div>

            {/* Users Table */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden mb-6">
              {/* Table Header */}
              <div className="px-6 py-4 border-b border-gray-200/50 bg-gray-50/80">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 rtl:space-x-reverse">
                    <input
                      type="checkbox"
                      checked={selectedUsers.length === users.length}
                      onChange={selectAllUsers}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-gray-600 font-medium">
                      {selectedUsers.length} کاربر از {users.length} انتخاب شده
                    </span>
                  </div>
                  {selectedUsers.length > 0 && (
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                      <button className="text-red-600 hover:text-red-700 flex items-center space-x-2 rtl:space-x-reverse font-medium">
                        <PiTrash className="text-lg" />
                        <span>حذف انتخاب شده‌ها ({selectedUsers.length})</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Table Body */}
              <div className="divide-y divide-gray-200/50">
                {filteredUsers.map(user => (
                  <div key={user.id} className="px-6 py-4 hover:bg-gray-50/80 transition-all duration-300 group">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 rtl:space-x-reverse">
                        <input
                          type="checkbox"
                          checked={selectedUsers.includes(user.id)}
                          onChange={() => toggleUserSelection(user.id)}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <div className={`w-12 h-12 bg-gradient-to-r ${user.gradient} rounded-2xl flex items-center justify-center text-white font-bold shadow-lg group-hover:scale-105 transition-transform duration-300`}>
                          {user.avatar}
                        </div>
                        <div className="text-right">
                          <h4 className="font-bold text-gray-800 text-lg">{user.name}</h4>
                          <p className="text-gray-600 text-sm">{user.email}</p>
                          <p className="text-gray-500 text-xs mt-1 flex items-center space-x-2 rtl:space-x-reverse">
                            <PiClock className="text-xs" />
                            <span>آخرین فعالیت: {user.lastLogin}</span>
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-8 rtl:space-x-reverse">
                        {/* Stats */}
                        <div className="flex items-center space-x-6 rtl:space-x-reverse">
                          <div className="text-center">
                            <div className="text-gray-800 font-black text-lg">{user.menus}</div>
                            <div className="text-gray-500 text-xs">منو</div>
                          </div>
                          <div className="text-center">
                            <div className="text-gray-800 font-black text-lg">{user.cards}</div>
                            <div className="text-gray-500 text-xs">کارت</div>
                          </div>
                          <div className="text-center">
                            <div className={`font-black text-lg ${
                              user.revenue === '۰' ? 'text-gray-500' : 'text-green-600'
                            }`}>
                              {user.revenue}
                            </div>
                            <div className="text-gray-500 text-xs">درآمد</div>
                          </div>
                        </div>

                        {/* Plan & Status */}
                        <div className="flex flex-col items-end space-y-2">
                          <span className={`px-3 py-2 rounded-xl text-sm font-bold ${
                            user.plan === 'حرفه‌ای' ? 'bg-blue-100 text-blue-700 border border-blue-200' :
                            user.plan === 'تجاری' ? 'bg-purple-100 text-purple-700 border border-purple-200' :
                            'bg-gray-100 text-gray-700 border border-gray-200'
                          }`}>
                            {user.plan}
                          </span>
                          <span className={`px-3 py-2 rounded-xl text-sm font-bold ${
                            user.status === 'فعال' ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-red-100 text-red-700 border border-red-200'
                          }`}>
                            {user.status}
                          </span>
                        </div>

                        {/* Growth */}
                        <div className={`flex items-center space-x-1 rtl:space-x-reverse text-sm font-bold ${
                          user.growth.includes('+') ? 'text-green-600' : 
                          user.growth.includes('-') ? 'text-red-600' : 'text-gray-500'
                        }`}>
                          {user.growth.includes('+') ? <PiTrendUp /> : 
                           user.growth.includes('-') ? <PiTrendDown /> : null}
                          <span>{user.growth}</span>
                        </div>

                        {/* Actions */}
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
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 px-6 py-4">
              <div className="text-gray-600 text-sm">
                نمایش ۱-۵ از ۲,۴۵۶ کاربر
              </div>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <button className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-2xl flex items-center justify-center transition-colors duration-200">
                  <PiUser className="text-gray-600" />
                </button>
                <button className="w-10 h-10 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-lg">
                  1
                </button>
                <button className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-2xl flex items-center justify-center transition-colors duration-200">
                  2
                </button>
                <button className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-2xl flex items-center justify-center transition-colors duration-200">
                  3
                </button>
                <button className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-2xl flex items-center justify-center transition-colors duration-200">
                  <PiUser className="text-gray-600" />
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

export default AdminUsers;