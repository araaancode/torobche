// pages/Users.js
import React, { useState } from 'react';
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
  PiUserPlus
} from 'react-icons/pi';

const AdminUsers = ({ onNavigate }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);

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
      avatar: 'A'
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
      avatar: 'S'
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
      avatar: 'M'
    },
    {
      id: 4,
      name: 'فاطمه کریمی',
      email: 'fateme@example.com',
      phone: '09123456786',
      plan: 'حرفه‌ای',
      status: 'غیرفعال',
      joinDate: '۱۴۰۲/１０/۱۲',
      lastLogin: '۱ هفته پیش',
      menus: 8,
      cards: 3,
      avatar: 'F'
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
      avatar: 'R'
    }
  ];

  const navigationItems = [
    { id: 'overview', name: 'داشبورد', icon: <PiSparkle className="text-lg" /> },
    { id: 'users', name: 'مدیریت کاربران', icon: <PiUsers className="text-lg" /> },
    { id: 'menus', name: 'منوها', icon: <PiSparkle className="text-lg" /> },
    { id: 'business-cards', name: 'کارت ویزیت', icon: <PiSparkle className="text-lg" /> },
    { id: 'templates', name: 'قالب‌ها', icon: <PiSparkle className="text-lg" /> },
    { id: 'qr-codes', name: 'QR کدها', icon: <PiSparkle className="text-lg" /> },
    { id: 'analytics', name: 'آمار و گزارش', icon: <PiSparkle className="text-lg" /> },
    { id: 'payments', name: 'پرداخت‌ها', icon: <PiSparkle className="text-lg" /> },
    { id: 'settings', name: 'تنظیمات', icon: <PiSparkle className="text-lg" /> }
  ];

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                item.id === 'users'
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
              <h1 className="text-2xl font-black text-gray-800">مدیریت کاربران</h1>
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
                  placeholder="جستجوی کاربر..."
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
                <PiUserPlus className="text-lg" />
                <span>کاربر جدید</span>
              </button>
              <button className="flex items-center space-x-2 rtl:space-x-reverse px-4 py-3 bg-white border border-gray-200 rounded-2xl hover:bg-gray-50 transition-colors duration-200">
                <PiExport className="text-lg" />
                <span>خروجی</span>
              </button>
            </div>
          </div>

          {/* Users Table */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Table Header */}
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                  <input
                    type="checkbox"
                    checked={selectedUsers.length === users.length}
                    onChange={selectAllUsers}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-gray-600">
                    {selectedUsers.length} کاربر انتخاب شده
                  </span>
                </div>
                {selectedUsers.length > 0 && (
                  <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <button className="text-red-600 hover:text-red-700 flex items-center space-x-2 rtl:space-x-reverse">
                      <PiTrash className="text-lg" />
                      <span>حذف انتخاب شده‌ها</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-gray-200">
              {filteredUsers.map(user => (
                <div key={user.id} className="px-6 py-4 hover:bg-gray-50 transition-colors duration-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 rtl:space-x-reverse">
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user.id)}
                        onChange={() => toggleUserSelection(user.id)}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center text-white font-bold">
                        {user.avatar}
                      </div>
                      <div className="text-right">
                        <h4 className="font-bold text-gray-800">{user.name}</h4>
                        <p className="text-gray-600 text-sm">{user.email}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-6 rtl:space-x-reverse">
                      <div className="text-center">
                        <div className="text-gray-800 font-bold">{user.menus}</div>
                        <div className="text-gray-500 text-xs">منو</div>
                      </div>
                      <div className="text-center">
                        <div className="text-gray-800 font-bold">{user.cards}</div>
                        <div className="text-gray-500 text-xs">کارت</div>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          user.plan === 'حرفه‌ای' ? 'bg-blue-100 text-blue-700' :
                          user.plan === 'تجاری' ? 'bg-purple-100 text-purple-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {user.plan}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs mt-1 ${
                          user.status === 'فعال' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {user.status}
                        </span>
                      </div>
                      <div className="text-left">
                        <div className="text-gray-800 text-sm">{user.joinDate}</div>
                        <div className="text-gray-500 text-xs">عضویت</div>
                      </div>
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <button className="w-8 h-8 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center hover:bg-blue-200 transition-colors duration-200">
                          <PiEye className="text-sm" />
                        </button>
                        <button className="w-8 h-8 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center hover:bg-green-200 transition-colors duration-200">
                          <PiPencil className="text-sm" />
                        </button>
                        <button className="w-8 h-8 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center hover:bg-red-200 transition-colors duration-200">
                          <PiTrash className="text-sm" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center">
                  <PiUsers className="text-white text-xl" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-black text-gray-800">۲,۴۵۶</div>
                  <div className="text-gray-600 text-sm">کاربران کل</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center">
                  <PiUsers className="text-white text-xl" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-black text-gray-800">۲,۱۲۳</div>
                  <div className="text-gray-600 text-sm">کاربران فعال</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                  <PiUsers className="text-white text-xl" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-black text-gray-800">۳۳۳</div>
                  <div className="text-gray-600 text-sm">کاربران غیرفعال</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center">
                  <PiUsers className="text-white text-xl" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-black text-gray-800">۷۶٪</div>
                  <div className="text-gray-600 text-sm">نرخ فعال</div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminUsers;