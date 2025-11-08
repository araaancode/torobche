// pages/AdminBusinessCards.js
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
  PiDownload,
  PiQrCode,
  PiUserCircle
} from 'react-icons/pi';

const AdminBusinessCards = ({ onNavigate }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const businessCards = [
    {
      id: 1,
      name: 'دکتر علی محمدی',
      title: 'متخصص قلب و عروق',
      company: 'بیمارستان میلاد',
      phone: '021-12345678',
      email: 'ali@example.com',
      status: 'فعال',
      views: 345,
      downloads: 89,
      created: '۱۴۰۲/۱۰/۱۵',
      template: 'مدرن پزشکی',
      avatar: 'A'
    },
    {
      id: 2,
      name: 'مهندس سارا احمدی',
      title: 'معمار senior',
      company: 'شرکت معماری نوآور',
      phone: '021-12345679',
      email: 'sara@example.com',
      status: 'فعال',
      views: 287,
      downloads: 67,
      created: '۱۴۰۲/۱۰/۱۴',
      template: 'مینیمال',
      avatar: 'S'
    },
    {
      id: 3,
      name: 'محمد رضایی',
      title: 'مدیر فروش',
      company: 'شرکت تجاری پارس',
      phone: '021-12345680',
      email: 'mohammad@example.com',
      status: 'غیرفعال',
      views: 156,
      downloads: 45,
      created: '۱۴۰۲/۱۰/۱۳',
      template: 'کلاسیک',
      avatar: 'M'
    },
    {
      id: 4,
      name: 'فاطمه کریمی',
      title: 'طراح گرافیک',
      company: 'استودیو خلاق',
      phone: '021-12345681',
      email: 'fateme@example.com',
      status: 'فعال',
      views: 432,
      downloads: 123,
      created: '۱۴۰۲/۱۰/۱۲',
      template: 'خلاقانه',
      avatar: 'F'
    }
  ];

  const navigationItems = [
    { id: 'overview', name: 'داشبورد', icon: <PiSparkle className="text-lg" /> },
    { id: 'users', name: 'مدیریت کاربران', icon: <PiSparkle className="text-lg" /> },
    { id: 'menus', name: 'منوها', icon: <PiSparkle className="text-lg" /> },
    { id: 'business-cards', name: 'کارت ویزیت', icon: <PiUserCircle className="text-lg" /> },
    { id: 'templates', name: 'قالب‌ها', icon: <PiSparkle className="text-lg" /> },
    { id: 'qr-codes', name: 'QR کدها', icon: <PiSparkle className="text-lg" /> },
    { id: 'analytics', name: 'آمار و گزارش', icon: <PiSparkle className="text-lg" /> },
    { id: 'payments', name: 'پرداخت‌ها', icon: <PiSparkle className="text-lg" /> },
    { id: 'settings', name: 'تنظیمات', icon: <PiSparkle className="text-lg" /> }
  ];

  const filteredCards = businessCards.filter(card =>
    card.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    card.company.toLowerCase().includes(searchTerm.toLowerCase())
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
                item.id === 'business-cards'
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
              <h1 className="text-2xl font-black text-gray-800">مدیریت کارت ویزیت</h1>
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
                  placeholder="جستجوی کارت ویزیت..."
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
                <span>کارت جدید</span>
              </button>
              <button className="flex items-center space-x-2 rtl:space-x-reverse px-4 py-3 bg-white border border-gray-200 rounded-2xl hover:bg-gray-50 transition-colors duration-200">
                <PiExport className="text-lg" />
                <span>خروجی</span>
              </button>
            </div>
          </div>

          {/* Business Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCards.map(card => (
              <div key={card.id} className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white font-bold">
                      {card.avatar}
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      card.status === 'فعال' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {card.status}
                    </span>
                  </div>

                  <h3 className="font-bold text-gray-800 text-lg mb-1">{card.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">{card.title}</p>
                  <p className="text-gray-500 text-xs mb-4">{card.company}</p>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-gray-800 font-bold">{card.views}</div>
                      <div className="text-gray-500 text-xs">بازدید</div>
                    </div>
                    <div className="text-center">
                      <div className="text-gray-800 font-bold">{card.downloads}</div>
                      <div className="text-gray-500 text-xs">دانلود</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-left">
                      <div className="text-blue-600 font-bold text-sm">{card.template}</div>
                      <div className="text-gray-500 text-xs">قالب</div>
                    </div>
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <button className="w-8 h-8 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center hover:bg-blue-200 transition-colors duration-200">
                        <PiEye className="text-sm" />
                      </button>
                      <button className="w-8 h-8 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center hover:bg-green-200 transition-colors duration-200">
                        <PiQrCode className="text-sm" />
                      </button>
                      <button className="w-8 h-8 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center hover:bg-orange-200 transition-colors duration-200">
                        <PiDownload className="text-sm" />
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
                  <PiUserCircle className="text-white text-xl" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-black text-gray-800">۸۹۰</div>
                  <div className="text-gray-600 text-sm">کارت‌های کل</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center">
                  <PiUserCircle className="text-white text-xl" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-black text-gray-800">۷۶۵</div>
                  <div className="text-gray-600 text-sm">کارت‌های فعال</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                  <PiQrCode className="text-white text-xl" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-black text-gray-800">۱۲,۴۵۶</div>
                  <div className="text-gray-600 text-sm">اسکن QR کد</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center">
                  <PiDownload className="text-white text-xl" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-black text-gray-800">۳,۲۱۰</div>
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

export default AdminBusinessCards;