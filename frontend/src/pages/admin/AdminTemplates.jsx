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
  PiDownload
} from 'react-icons/pi';

const AdminTemplates = ({ onNavigate }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

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
      featured: true
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
      featured: true
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
      featured: false
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
      featured: false
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
      featured: true
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
      featured: false
    }
  ];

  const categories = [
    { id: 'all', name: 'همه قالب‌ها', count: templates.length },
    { id: 'restaurant', name: 'رستوران', count: 12 },
    { id: 'medical', name: 'پزشکی', count: 8 },
    { id: 'business', name: 'کسب و کار', count: 15 },
    { id: 'corporate', name: 'شرکتی', count: 9 },
    { id: 'cafe', name: 'کافه', count: 6 },
    { id: 'personal', name: 'شخصی', count: 11 }
  ];

  const navigationItems = [
    { id: 'overview', name: 'داشبورد', icon: <PiSparkle className="text-lg" /> },
    { id: 'users', name: 'مدیریت کاربران', icon: <PiSparkle className="text-lg" /> },
    { id: 'menus', name: 'منوها', icon: <PiSparkle className="text-lg" /> },
    { id: 'business-cards', name: 'کارت ویزیت', icon: <PiSparkle className="text-lg" /> },
    { id: 'templates', name: 'قالب‌ها', icon: <PiSparkle className="text-lg" /> },
    { id: 'qr-codes', name: 'QR کدها', icon: <PiSparkle className="text-lg" /> },
    { id: 'analytics', name: 'آمار و گزارش', icon: <PiSparkle className="text-lg" /> },
    { id: 'payments', name: 'پرداخت‌ها', icon: <PiSparkle className="text-lg" /> },
    { id: 'settings', name: 'تنظیمات', icon: <PiSparkle className="text-lg" /> }
  ];

  const filteredTemplates = templates.filter(template =>
    template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                <p className="text-gray-500 text-xs">کارت‌ساز</p>
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
                item.id === 'templates'
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
              <h1 className="text-2xl font-black text-gray-800">مدیریت قالب‌ها</h1>
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
          {/* Header Actions */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <div className="relative">
                <PiMagnifyingGlass className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
                <input
                  type="text"
                  placeholder="جستجوی قالب..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-80 pr-10 pl-4 py-3 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button className="flex items-center space-x-2 rtl:space-x-reverse px-4 py-3 bg-white border border-gray-200 rounded-2xl hover:bg-gray-50 transition-colors duration-200">
                <PiFunnel className="text-gray-600 text-lg" />
                <span>فیلتر</span>
              </button>
            </div>

            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <button className="flex items-center space-x-2 rtl:space-x-reverse px-4 py-3 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition-colors duration-200">
                <PiPlus className="text-lg" />
                <span>قالب جدید</span>
              </button>
              <button className="flex items-center space-x-2 rtl:space-x-reverse px-4 py-3 bg-white border border-gray-200 rounded-2xl hover:bg-gray-50 transition-colors duration-200">
                <PiExport className="text-lg" />
                <span>خروجی</span>
              </button>
            </div>
          </div>

          {/* Categories */}
          <div className="flex items-center space-x-4 rtl:space-x-reverse mb-6 overflow-x-auto pb-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center space-x-2 rtl:space-x-reverse px-4 py-2 rounded-2xl whitespace-nowrap transition-colors duration-200 ${
                  activeCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                }`}
              >
                <span>{category.name}</span>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  activeCategory === category.id
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {category.count}
                </span>
              </button>
            ))}
          </div>

          {/* Templates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTemplates.map(template => (
              <div key={template.id} className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300">
                <div className="relative">
                  <div className="w-full h-48 bg-gradient-to-br from-blue-400 to-purple-500 rounded-t-3xl flex items-center justify-center">
                    <span className="text-white font-bold text-lg">{template.name}</span>
                  </div>
                  {template.featured && (
                    <div className="absolute top-4 left-4 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                      ویژه
                    </div>
                  )}
                  <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded-full text-xs">
                    {template.category}
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-gray-800">{template.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      template.type === 'پرمیوم' 
                        ? 'bg-yellow-100 text-yellow-700' 
                        : 'bg-green-100 text-green-700'
                    }`}>
                      {template.type}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-1 rtl:space-x-reverse">
                      <PiStar className="text-yellow-500 text-sm" />
                      <span className="text-gray-700 text-sm font-medium">{template.rating}</span>
                      <span className="text-gray-500 text-sm">({template.downloads})</span>
                    </div>
                    <div className="flex items-center space-x-1 rtl:space-x-reverse text-gray-500">
                      <PiHeart className="text-sm" />
                      <span className="text-sm">{template.likes}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-left">
                      <div className={`text-lg font-black ${
                        template.type === 'پرمیوم' ? 'text-yellow-600' : 'text-green-600'
                      }`}>
                        {template.price === '۰' ? 'رایگان' : `${template.price} تومان`}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <button className="w-8 h-8 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center hover:bg-blue-200 transition-colors duration-200">
                        <PiEye className="text-sm" />
                      </button>
                      <button className="w-8 h-8 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center hover:bg-green-200 transition-colors duration-200">
                        <PiPencil className="text-sm" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center">
                  <PiSparkle className="text-white text-xl" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-black text-gray-800">۶۱</div>
                  <div className="text-gray-600 text-sm">قالب‌های کل</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center">
                  <PiSparkle className="text-white text-xl" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-black text-gray-800">۴۵</div>
                  <div className="text-gray-600 text-sm">قالب‌های رایگان</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                  <PiSparkle className="text-white text-xl" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-black text-gray-800">۱۶</div>
                  <div className="text-gray-600 text-sm">قالب‌های پرمیوم</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center">
                  <PiDownload className="text-white text-xl" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-black text-gray-800">۵,۰۸۹</div>
                  <div className="text-gray-600 text-sm">دانلود کل</div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminTemplates;