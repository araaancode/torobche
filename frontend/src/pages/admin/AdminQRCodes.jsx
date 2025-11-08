// pages/AdminQRCodes.js
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
  PiChartLine
} from 'react-icons/pi';

const AdminQRCodes = ({ onNavigate }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const qrCodes = [
    {
      id: 1,
      name: 'منوی رستوران برگرلند',
      type: 'منو',
      scans: 1245,
      created: '۱۴۰۲/۱۰/۱۵',
      status: 'فعال',
      url: 'https://cardmaker.ir/menu/burgerland',
      lastScan: '۲ ساعت پیش',
      owner: 'علی محمدی'
    },
    {
      id: 2,
      name: 'کارت ویزیت دکتر محمدی',
      type: 'کارت ویزیت',
      scans: 876,
      created: '۱۴۰۲/۱۰/۱۴',
      status: 'فعال',
      url: 'https://cardmaker.ir/card/drmohammadi',
      lastScan: '۱ روز پیش',
      owner: 'دکتر علی محمدی'
    },
    {
      id: 3,
      name: 'پروفایل کسب و کار',
      type: 'پروفایل',
      scans: 543,
      created: '۱۴۰۲/۱۰/۱۳',
      status: 'غیرفعال',
      url: 'https://cardmaker.ir/profile/novinco',
      lastScan: '۱ هفته پیش',
      owner: 'شرکت نوآور'
    },
    {
      id: 4,
      name: 'کاتالوگ محصولات',
      type: 'کاتالوگ',
      scans: 987,
      created: '۱۴۰۲/۱۰/۱۲',
      status: 'فعال',
      url: 'https://cardmaker.ir/catalog/products',
      lastScan: '۳۰ دقیقه پیش',
      owner: 'فروشگاه مدرن'
    }
  ];

  const navigationItems = [
    { id: 'overview', name: 'داشبورد', icon: <PiSparkle className="text-lg" /> },
    { id: 'users', name: 'مدیریت کاربران', icon: <PiSparkle className="text-lg" /> },
    { id: 'menus', name: 'منوها', icon: <PiSparkle className="text-lg" /> },
    { id: 'business-cards', name: 'کارت ویزیت', icon: <PiSparkle className="text-lg" /> },
    { id: 'templates', name: 'قالب‌ها', icon: <PiSparkle className="text-lg" /> },
    { id: 'qr-codes', name: 'QR کدها', icon: <PiQrCode className="text-lg" /> },
    { id: 'analytics', name: 'آمار و گزارش', icon: <PiSparkle className="text-lg" /> },
    { id: 'payments', name: 'پرداخت‌ها', icon: <PiSparkle className="text-lg" /> },
    { id: 'settings', name: 'تنظیمات', icon: <PiSparkle className="text-lg" /> }
  ];

  const filteredQRCodes = qrCodes.filter(qr =>
    qr.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    qr.owner.toLowerCase().includes(searchTerm.toLowerCase())
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
                item.id === 'qr-codes'
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
              <h1 className="text-2xl font-black text-gray-800">مدیریت QR کدها</h1>
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
                  placeholder="جستجوی QR کد..."
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
                <span>QR کد جدید</span>
              </button>
              <button className="flex items-center space-x-2 rtl:space-x-reverse px-4 py-3 bg-white border border-gray-200 rounded-2xl hover:bg-gray-50 transition-colors duration-200">
                <PiExport className="text-lg" />
                <span>خروجی</span>
              </button>
            </div>
          </div>

          {/* QR Codes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredQRCodes.map(qr => (
              <div key={qr.id} className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center">
                      <PiQrCode className="text-white text-xl" />
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      qr.status === 'فعال' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {qr.status}
                    </span>
                  </div>

                  <h3 className="font-bold text-gray-800 text-lg mb-2">{qr.name}</h3>
                  <p className="text-gray-600 text-sm mb-1">{qr.owner}</p>
                  <p className="text-gray-500 text-xs mb-4">{qr.type}</p>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-gray-800 font-bold">{qr.scans}</div>
                      <div className="text-gray-500 text-xs">اسکن</div>
                    </div>
                    <div className="text-center">
                      <div className="text-gray-800 font-bold text-sm">{qr.lastScan}</div>
                      <div className="text-gray-500 text-xs">آخرین اسکن</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-left">
                      <div className="text-blue-600 font-bold text-xs truncate max-w-[120px]">
                        {qr.url}
                      </div>
                      <div className="text-gray-500 text-xs">لینک</div>
                    </div>
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <button className="w-8 h-8 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center hover:bg-blue-200 transition-colors duration-200">
                        <PiEye className="text-sm" />
                      </button>
                      <button className="w-8 h-8 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center hover:bg-green-200 transition-colors duration-200">
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
                  <PiQrCode className="text-white text-xl" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-black text-gray-800">۳,۴۵۶</div>
                  <div className="text-gray-600 text-sm">QR کدهای کل</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center">
                  <PiQrCode className="text-white text-xl" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-black text-gray-800">۲,۹۸۷</div>
                  <div className="text-gray-600 text-sm">QR کدهای فعال</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                  <PiChartLine className="text-white text-xl" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-black text-gray-800">۴۵,۶۷۸</div>
                  <div className="text-gray-600 text-sm">اسکن کل</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center">
                  <PiChartLine className="text-white text-xl" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-black text-gray-800">۱۲.۳</div>
                  <div className="text-gray-600 text-sm">میانگین اسکن</div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminQRCodes;