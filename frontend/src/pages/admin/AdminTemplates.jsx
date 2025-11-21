// pages/AdminTemplates.js
import React, { useState } from 'react';
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
  PiStar,
  PiHeart,
  PiDownload,
  PiTrendUp,
  PiChartLine,
  PiUsers,
  PiCrown,
  PiMagicWand,
  PiShootingStar,
  PiCheckCircle,
  PiLightning,
  PiMedal,
  PiConfetti,
  PiCaretUp,
  PiCaretDown,
  PiUserCircle,
  PiQrCode
} from 'react-icons/pi';

const AdminTemplates = ({ onNavigate }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeFilter, setActiveFilter] = useState('all');

  const templates = [
    {
      id: 1,
      name: 'مینیمال رستوران',
      category: 'رستوران',
      type: 'رایگان',
      price: '۰',
      downloads: 1245,
      rating: 4.8,
      likes: 289,
      created: '۱۴۰۲/۱۰/۱۵',
      preview: '/api/placeholder/300/200',
      featured: true,
      color: 'from-blue-600 to-cyan-500',
      gradient: 'bg-gradient-to-br from-blue-600 to-cyan-500',
      bgGradient: 'bg-gradient-to-br from-blue-50/80 via-cyan-50/60 to-white',
      growth: '+۱۵٪',
      revenue: '۲,۴۵۰,۰۰۰',
      priority: 'high'
    },
    {
      id: 2,
      name: 'مدرن پزشکی',
      category: 'پزشکی',
      type: 'پرمیوم',
      price: '۱۲۹,۰۰۰',
      downloads: 876,
      rating: 4.9,
      likes: 345,
      created: '۱۴۰۲/۱۰/۱۴',
      preview: '/api/placeholder/300/200',
      featured: true,
      color: 'from-emerald-600 to-green-500',
      gradient: 'bg-gradient-to-br from-emerald-600 to-green-500',
      bgGradient: 'bg-gradient-to-br from-emerald-50/80 via-green-50/60 to-white',
      growth: '+۲۳٪',
      revenue: '۸,۷۶۰,۰۰۰',
      priority: 'high'
    },
    {
      id: 3,
      name: 'خلاقانه کسب و کار',
      category: 'کسب و کار',
      type: 'پرمیوم',
      price: '۹۹,۰۰۰',
      downloads: 654,
      rating: 4.7,
      likes: 198,
      created: '۱۴۰۲/۱۰/۱۳',
      preview: '/api/placeholder/300/200',
      featured: false,
      color: 'from-violet-600 to-purple-500',
      gradient: 'bg-gradient-to-br from-violet-600 to-purple-500',
      bgGradient: 'bg-gradient-to-br from-violet-50/80 via-purple-50/60 to-white',
      growth: '+۱۲٪',
      revenue: '۵,۲۳۲,۰۰۰',
      priority: 'medium'
    },
    {
      id: 4,
      name: 'کلاسیک شرکتی',
      category: 'شرکتی',
      type: 'رایگان',
      price: '۰',
      downloads: 987,
      rating: 4.6,
      likes: 234,
      created: '۱۴۰۲/۱۰/۱۲',
      preview: '/api/placeholder/300/200',
      featured: false,
      color: 'from-amber-600 to-orange-500',
      gradient: 'bg-gradient-to-br from-amber-600 to-orange-500',
      bgGradient: 'bg-gradient-to-br from-amber-50/80 via-orange-50/60 to-white',
      growth: '+۸٪',
      revenue: '۱,۲۳۴,۰۰۰',
      priority: 'medium'
    },
    {
      id: 5,
      name: 'شیک کافی شاپ',
      category: 'کافه',
      type: 'پرمیوم',
      price: '۷۹,۰۰۰',
      downloads: 543,
      rating: 4.8,
      likes: 167,
      created: '۱۴۰۲/۱۰/۱۱',
      preview: '/api/placeholder/300/200',
      featured: true,
      color: 'from-rose-600 to-pink-500',
      gradient: 'bg-gradient-to-br from-rose-600 to-pink-500',
      bgGradient: 'bg-gradient-to-br from-rose-50/80 via-pink-50/60 to-white',
      growth: '+۱۸٪',
      revenue: '۳,۲۵۸,۰۰۰',
      priority: 'high'
    },
    {
      id: 6,
      name: 'ساده شخصی',
      category: 'شخصی',
      type: 'رایگان',
      price: '۰',
      downloads: 765,
      rating: 4.5,
      likes: 156,
      created: '۱۴۰۲/۱۰/۱۰',
      preview: '/api/placeholder/300/200',
      featured: false,
      color: 'from-teal-600 to-cyan-500',
      gradient: 'bg-gradient-to-br from-teal-600 to-cyan-500',
      bgGradient: 'bg-gradient-to-br from-teal-50/80 via-cyan-50/60 to-white',
      growth: '+۵٪',
      revenue: '۹۸۷,۰۰۰',
      priority: 'low'
    }
  ];

  const categories = [
    { id: 'all', name: 'همه قالب‌ها', count: templates.length, color: 'from-gray-600 to-gray-500' },
    { id: 'restaurant', name: 'رستوران', count: 12, color: 'from-blue-600 to-cyan-500' },
    { id: 'medical', name: 'پزشکی', count: 8, color: 'from-emerald-600 to-green-500' },
    { id: 'business', name: 'کسب و کار', count: 15, color: 'from-violet-600 to-purple-500' },
    { id: 'corporate', name: 'شرکتی', count: 9, color: 'from-amber-600 to-orange-500' },
    { id: 'cafe', name: 'کافه', count: 6, color: 'from-rose-600 to-pink-500' },
    { id: 'personal', name: 'شخصی', count: 11, color: 'from-teal-600 to-cyan-500' }
  ];

  const filters = [
    { id: 'all', name: 'همه قالب‌ها', count: templates.length },
    { id: 'featured', name: 'ویژه', count: templates.filter(t => t.featured).length },
    { id: 'premium', name: 'پرمیوم', count: templates.filter(t => t.type === 'پرمیوم').length },
    { id: 'free', name: 'رایگان', count: templates.filter(t => t.type === 'رایگان').length }
  ];

  const navigationItems = [
    { id: 'overview', name: 'داشبورد', icon: <PiChartLine className="text-xl" />, color: 'from-blue-600 to-cyan-500' },
    { id: 'users', name: 'مدیریت کاربران', icon: <PiUsers className="text-xl" />, color: 'from-emerald-600 to-green-500' },
    { id: 'menus', name: 'منوها', icon: <PiCrown className="text-xl" />, color: 'from-violet-600 to-purple-500' },
    { id: 'business-cards', name: 'کارت ویزیت', icon: <PiUserCircle className="text-xl" />, color: 'from-amber-600 to-orange-500' },
    { id: 'templates', name: 'قالب‌ها', icon: <PiMagicWand className="text-xl" />, color: 'from-indigo-600 to-blue-500' },
    { id: 'qr-codes', name: 'QR کدها', icon: <PiQrCode className="text-xl" />, color: 'from-rose-600 to-pink-500' },
    { id: 'analytics', name: 'آمار و گزارش', icon: <PiTrendUp className="text-xl" />, color: 'from-teal-600 to-cyan-500' },
    { id: 'settings', name: 'تنظیمات', icon: <PiShield className="text-xl" />, color: 'from-gray-600 to-gray-500' }
  ];

  const stats = [
    { 
      label: 'قالب‌های کل', 
      value: '۶۱', 
      change: '+۱۲.۵٪', 
      changeValue: '۷',
      icon: <PiSparkle className="text-2xl" />, 
      color: 'from-blue-600 to-cyan-500',
      gradient: 'bg-gradient-to-br from-blue-600 to-cyan-500',
      bgGradient: 'bg-gradient-to-br from-blue-50/80 via-cyan-50/60 to-white',
      trend: 'up'
    },
    { 
      label: 'قالب‌های رایگان', 
      value: '۴۵', 
      change: '+۸.۲٪', 
      changeValue: '۳',
      icon: <PiCheckCircle className="text-2xl" />, 
      color: 'from-emerald-600 to-green-500',
      gradient: 'bg-gradient-to-br from-emerald-600 to-green-500',
      bgGradient: 'bg-gradient-to-br from-emerald-50/80 via-green-50/60 to-white',
      trend: 'up'
    },
    { 
      label: 'قالب‌های پرمیوم', 
      value: '۱۶', 
      change: '+۲۳.۴٪', 
      changeValue: '۳',
      icon: <PiCrown className="text-2xl" />, 
      color: 'from-violet-600 to-purple-500',
      gradient: 'bg-gradient-to-br from-violet-600 to-purple-500',
      bgGradient: 'bg-gradient-to-br from-violet-50/80 via-purple-50/60 to-white',
      trend: 'up'
    },
    { 
      label: 'دانلود کل', 
      value: '۵,۰۸۹', 
      change: '+۱۵.۸٪', 
      changeValue: '۶۹۴',
      icon: <PiDownload className="text-2xl" />, 
      color: 'from-amber-600 to-orange-500',
      gradient: 'bg-gradient-to-br from-amber-600 to-orange-500',
      bgGradient: 'bg-gradient-to-br from-amber-50/80 via-orange-50/60 to-white',
      trend: 'up'
    }
  ];

  const filteredTemplates = templates.filter(template =>
    (template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.category.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (activeCategory === 'all' || template.category.includes(activeCategory)) &&
    (activeFilter === 'all' || 
     (activeFilter === 'featured' && template.featured) ||
     (activeFilter === 'premium' && template.type === 'پرمیوم') ||
     (activeFilter === 'free' && template.type === 'رایگان'))
  );

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <PiStar
        key={index}
        className={`text-sm ${index < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-purple-50/20 relative overflow-hidden">
      
      {/* Advanced Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-200/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float-slow"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-200/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float-slower"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-200/20 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse-slow"></div>
      </div>

      {/* Floating Icons */}
      <div className="absolute top-24 left-24 opacity-10 animate-float">
        <PiSparkle className="text-6xl text-blue-500" />
      </div>
      <div className="absolute bottom-40 right-40 opacity-10 animate-float-delayed">
        <PiShootingStar className="text-5xl text-purple-500" />
      </div>

      <div className="flex relative z-10">
        {/* Enhanced Sidebar */}
        <div className={`bg-white/90 backdrop-blur-2xl border-l border-white/40 shadow-2xl transition-all duration-500 ease-in-out ${
          sidebarOpen ? 'w-80' : 'w-20'
        }`}>
          <div className="p-8 border-b border-white/30">
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <div className="w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl relative overflow-hidden">
                <PiShield className="text-white text-2xl z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
              </div>
              {sidebarOpen && (
                <div className="flex-1">
                  <h1 className="text-2xl font-black text-gray-800 mb-1">پنل مدیریت</h1>
                  <p className="text-gray-500 text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    تربچه - نسخه حرفه‌ای
                  </p>
                </div>
              )}
            </div>
          </div>

          <nav className="p-6">
            {navigationItems.map(item => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center justify-between p-4 rounded-3xl mb-3 transition-all duration-300 group relative overflow-hidden ${
                  item.id === 'templates'
                    ? `bg-gradient-to-r ${item.color} text-white shadow-2xl transform scale-105`
                    : 'text-gray-600 hover:bg-white/80 hover:shadow-lg backdrop-blur-sm'
                }`}
              >
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                    item.id === 'templates'
                      ? 'bg-white/20 text-white shadow-inner' 
                      : `bg-gradient-to-r ${item.color} text-white shadow-lg group-hover:scale-110`
                  }`}>
                    {item.icon}
                  </div>
                  {sidebarOpen && (
                    <span className="font-bold text-lg">{item.name}</span>
                  )}
                </div>
                
                {/* Hover Effect */}
                <div className={`absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                  item.id === 'templates' ? 'opacity-100' : ''
                }`}></div>
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-auto">
          {/* Enhanced Top Bar */}
          <header className="bg-white/80 backdrop-blur-2xl border-b border-white/40 px-8 py-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="w-14 h-14 bg-white/80 backdrop-blur-sm rounded-2xl flex items-center justify-center hover:bg-white hover:shadow-2xl transition-all duration-300 shadow-lg group"
                >
                  <PiMagicWand className="text-purple-600 text-xl group-hover:scale-110 transition-transform duration-300" />
                </button>
                <div>
                  <h1 className="text-3xl font-black text-gray-800 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    مدیریت قالب‌ها
                  </h1>
                  <p className="text-gray-500 text-sm font-medium">مدیریت و آنالیز قالب‌های دیجیتال</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <button className="w-14 h-14 bg-white/80 backdrop-blur-sm rounded-2xl flex items-center justify-center hover:bg-white hover:shadow-2xl transition-all duration-300 shadow-lg relative group">
                  <PiBell className="text-gray-600 text-xl group-hover:scale-110 transition-transform duration-300" />
                  <span className="absolute -top-1 -left-1 w-6 h-6 bg-red-500 rounded-full text-white text-xs flex items-center justify-center shadow-lg font-bold">
                    ۳
                  </span>
                </button>
                
                <div className="flex items-center space-x-3 rtl:space-x-reverse bg-white/80 backdrop-blur-sm rounded-2xl p-3 shadow-lg">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-2xl">
                    A
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-800">مدیر سیستم</p>
                    <p className="text-gray-500 text-sm">admin@torobche.ir</p>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="p-8">
            {/* Enhanced Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <div 
                  key={index} 
                  className={`${stat.bgGradient} rounded-3xl p-6 border border-white/60 shadow-2xl hover:shadow-3xl transition-all duration-500 backdrop-blur-sm group overflow-hidden relative`}
                >
                  {/* Background Effect */}
                  <div className={`absolute -inset-1 bg-gradient-to-r ${stat.color} rounded-3xl opacity-0 group-hover:opacity-5 transition-opacity duration-500 blur-sm`}></div>
                  
                  <div className="flex items-center justify-between mb-4 relative z-10">
                    <div className={`w-16 h-16 ${stat.gradient} rounded-2xl flex items-center justify-center text-white shadow-2xl relative overflow-hidden`}>
                      {stat.icon}
                      <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
                    </div>
                    <div className={`flex items-center space-x-1 rtl:space-x-reverse text-sm font-black ${
                      stat.trend === 'up' ? 'text-emerald-600' : 'text-rose-600'
                    }`}>
                      {stat.trend === 'up' ? <PiCaretUp className="text-lg" /> : <PiCaretDown className="text-lg" />}
                      <span>{stat.change}</span>
                    </div>
                  </div>
                  
                  <div className="text-right relative z-10">
                    <div className="text-3xl font-black text-gray-800 mb-1">{stat.value}</div>
                    <div className="text-gray-600 font-medium mb-2">{stat.label}</div>
                    <div className={`text-xs font-medium mt-2 ${
                      stat.trend === 'up' ? 'text-emerald-600' : 'text-rose-600'
                    }`}>
                      {stat.changeValue} مورد جدید
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Header Actions */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                {/* Search Box */}
                <div className="relative">
                  <PiMagnifyingGlass className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                  <input
                    type="text"
                    placeholder="جستجوی قالب بر اساس نام یا دسته‌بندی..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-96 pr-12 pl-4 py-4 bg-white/80 backdrop-blur-sm border border-white/60 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-lg"
                  />
                </div>

                {/* Filters */}
                <div className="flex items-center space-x-2 rtl:space-x-reverse bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-lg">
                  {filters.map(filter => (
                    <button
                      key={filter.id}
                      onClick={() => setActiveFilter(filter.id)}
                      className={`px-4 py-2 rounded-2xl text-sm font-medium transition-all duration-300 ${
                        activeFilter === filter.id
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                          : 'text-gray-600 hover:bg-white/60'
                      }`}
                    >
                      {filter.name}
                      <span className="mr-2 text-xs bg-white/20 px-1.5 py-0.5 rounded-full">
                        {filter.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <button className="flex items-center space-x-2 rtl:space-x-reverse px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl hover:shadow-2xl transition-all duration-300 shadow-lg group">
                  <PiPlus className="text-xl group-hover:scale-110 transition-transform duration-300" />
                  <span className="font-bold">قالب جدید</span>
                </button>
                <button className="flex items-center space-x-2 rtl:space-x-reverse px-6 py-4 bg-white/80 backdrop-blur-sm border border-white/60 text-gray-700 rounded-2xl hover:shadow-lg transition-all duration-300 shadow-lg group">
                  <PiExport className="text-xl group-hover:scale-110 transition-transform duration-300" />
                  <span className="font-bold">خروجی</span>
                </button>
              </div>
            </div>

            {/* Categories */}
            <div className="flex items-center space-x-3 rtl:space-x-reverse mb-6 overflow-x-auto pb-4">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center space-x-3 rtl:space-x-reverse px-5 py-3 rounded-2xl whitespace-nowrap transition-all duration-300 group ${
                    activeCategory === category.id
                      ? `bg-gradient-to-r ${category.color} text-white shadow-2xl transform scale-105`
                      : 'bg-white/80 backdrop-blur-sm text-gray-600 border border-white/60 hover:shadow-lg'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-2xl flex items-center justify-center ${
                    activeCategory === category.id
                      ? 'bg-white/20 text-white'
                      : `bg-gradient-to-r ${category.color} text-white shadow-lg`
                  }`}>
                    <PiSparkle className="text-sm" />
                  </div>
                  <span className="font-bold">{category.name}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                    activeCategory === category.id
                      ? 'bg-white/20 text-white'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {category.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Templates Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
              {filteredTemplates.map(template => (
                <div 
                  key={template.id} 
                  className={`${template.bgGradient} rounded-3xl border border-white/60 shadow-2xl hover:shadow-3xl transition-all duration-500 backdrop-blur-sm group overflow-hidden relative`}
                >
                  {/* Background Effect */}
                  <div className={`absolute -inset-1 bg-gradient-to-r ${template.color} rounded-3xl opacity-0 group-hover:opacity-5 transition-opacity duration-500 blur-sm`}></div>
                  
                  {/* Template Preview */}
                  <div className="relative h-48 overflow-hidden rounded-t-3xl">
                    <div className={`w-full h-full ${template.gradient} flex items-center justify-center relative overflow-hidden`}>
                      <div className="text-white text-center">
                        <div className="text-2xl font-black mb-2">{template.name}</div>
                        <div className="text-white/80 text-sm">{template.category}</div>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent"></div>
                    </div>
                    
                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      {template.featured && (
                        <span className="bg-gradient-to-r from-yellow-400 to-amber-400 text-white px-3 py-1 rounded-2xl text-xs font-bold shadow-lg flex items-center gap-1">
                          <PiCrown className="text-xs" />
                          ویژه
                        </span>
                      )}
                      <span className="bg-black/60 text-white px-2 py-1 rounded-xl text-xs font-bold backdrop-blur-sm">
                        {template.category}
                      </span>
                    </div>

                    {/* Priority Indicator */}
                    <div className={`absolute top-4 right-4 w-3 h-3 rounded-full ${
                      template.priority === 'high' ? 'bg-rose-500' :
                      template.priority === 'medium' ? 'bg-amber-500' : 'bg-emerald-500'
                    }`}></div>
                  </div>

                  {/* Template Content */}
                  <div className="p-6 relative z-10">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-black text-gray-800 text-xl">{template.name}</h3>
                      <span className={`px-3 py-1 rounded-2xl text-xs font-bold ${
                        template.type === 'پرمیوم' 
                          ? 'bg-yellow-100 text-yellow-700' 
                          : 'bg-emerald-100 text-emerald-700'
                      }`}>
                        {template.type}
                      </span>
                    </div>

                    {/* Rating and Stats */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <div className="flex items-center space-x-1 rtl:space-x-reverse">
                          {renderStars(template.rating)}
                        </div>
                        <span className="text-gray-700 text-sm font-bold">{template.rating}</span>
                        <span className="text-gray-500 text-sm">({template.downloads})</span>
                      </div>
                      <div className="flex items-center space-x-1 rtl:space-x-reverse text-gray-500">
                        <PiHeart className="text-sm" />
                        <span className="text-sm font-medium">{template.likes}</span>
                      </div>
                    </div>

                    {/* Growth and Revenue */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-right">
                        <div className={`flex items-center space-x-1 rtl:space-x-reverse text-sm font-bold ${
                          template.growth.startsWith('+') ? 'text-emerald-600' : 'text-rose-600'
                        }`}>
                          {template.growth.startsWith('+') ? <PiCaretUp className="text-lg" /> : <PiCaretDown className="text-lg" />}
                          <span>{template.growth}</span>
                        </div>
                        <div className="text-gray-500 text-xs">رشد ماهانه</div>
                      </div>
                      <div className="text-left">
                        <div className="text-emerald-600 font-black text-sm">{template.revenue}</div>
                        <div className="text-gray-500 text-xs">درآمد کل</div>
                      </div>
                    </div>

                    {/* Price and Actions */}
                    <div className="flex items-center justify-between">
                      <div className="text-left">
                        <div className={`text-xl font-black ${
                          template.type === 'پرمیوم' ? 'text-yellow-600' : 'text-emerald-600'
                        }`}>
                          {template.price === '۰' ? 'رایگان' : `${template.price} تومان`}
                        </div>
                        <div className="text-gray-500 text-xs">ایجاد: {template.created}</div>
                      </div>
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <button className="w-10 h-10 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center hover:bg-blue-200 hover:scale-110 transition-all duration-300 shadow-lg">
                          <PiEye className="text-lg" />
                        </button>
                        <button className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center hover:bg-emerald-200 hover:scale-110 transition-all duration-300 shadow-lg">
                          <PiPencil className="text-lg" />
                        </button>
                        <button className="w-10 h-10 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center hover:bg-amber-200 hover:scale-110 transition-all duration-300 shadow-lg">
                          <PiDownload className="text-lg" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {filteredTemplates.length === 0 && (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-gradient-to-r from-gray-200 to-gray-300 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <PiMagicWand className="text-gray-400 text-3xl" />
                </div>
                <h3 className="text-2xl font-black text-gray-800 mb-2">قالبی یافت نشد</h3>
                <p className="text-gray-600 mb-6">هیچ قالبی با مشخصات جستجو شده پیدا نشد.</p>
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-bold hover:shadow-2xl transition-all duration-300">
                  ایجاد اولین قالب
                </button>
              </div>
            )}
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
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.15; }
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
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        .shadow-3xl {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
        }
      `}</style>
    </div>
  );
};

export default AdminTemplates;