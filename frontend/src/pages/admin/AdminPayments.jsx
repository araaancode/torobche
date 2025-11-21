// pages/AdminPayments.js
import React, { useState } from 'react';
import { 
  PiShield, 
  PiBell,
  PiSparkle,
  PiMagnifyingGlass,
  PiFunnel,
  PiEye,
  PiDownload,
  PiExport,
  PiMoney,
  PiCheckCircle,
  PiXCircle,
  PiClock
} from 'react-icons/pi';

const AdminPayments = ({ onNavigate }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const payments = [
    {
      id: 1,
      user: 'علی محمدی',
      email: 'ali@example.com',
      amount: '۱۲۹,۰۰۰',
      plan: 'حرفه‌ای',
      status: 'موفق',
      date: '۱۴۰۲/۱۰/۱۵',
      time: '۱۴:۳۰',
      transactionId: 'TX-123456',
      method: 'درگاه بانکی'
    },
    {
      id: 2,
      user: 'سارا احمدی',
      email: 'sara@example.com',
      amount: '۰',
      plan: 'رایگان',
      status: 'موفق',
      date: '۱۴۰۲/۱۰/۱۴',
      time: '۱۰:۱۵',
      transactionId: 'TX-123457',
      method: 'رایگان'
    },
    {
      id: 3,
      user: 'محمد رضایی',
      email: 'mohammad@example.com',
      amount: '۲۹۹,۰۰۰',
      plan: 'تجاری',
      status: 'در انتظار',
      date: '۱۴۰۲/۱۰/۱۳',
      time: '۱۶:۴۵',
      transactionId: 'TX-123458',
      method: 'درگاه بانکی'
    },
    {
      id: 4,
      user: 'فاطمه کریمی',
      email: 'fateme@example.com',
      amount: '۱۲۹,۰۰۰',
      plan: 'حرفه‌ای',
      status: 'ناموفق',
      date: '۱۴۰۲/۱۰/۱۲',
      time: '۰۹:۲۰',
      transactionId: 'TX-123459',
      method: 'درگاه بانکی'
    },
    {
      id: 5,
      user: 'رضا حسینی',
      email: 'reza@example.com',
      amount: '۱۲۹,۰۰۰',
      plan: 'حرفه‌ای',
      status: 'موفق',
      date: '۱۴۰۲/۱۰/۱۱',
      time: '۱۱:۳۰',
      transactionId: 'TX-123460',
      method: 'درگاه بانکی'
    }
  ];

  const navigationItems = [
    { id: 'overview', name: 'داشبورد', icon: <PiSparkle className="text-lg" /> },
    { id: 'users', name: 'مدیریت کاربران', icon: <PiSparkle className="text-lg" /> },
    { id: 'menus', name: 'منوها', icon: <PiSparkle className="text-lg" /> },
    { id: 'business-cards', name: 'کارت ویزیت', icon: <PiSparkle className="text-lg" /> },
    { id: 'templates', name: 'قالب‌ها', icon: <PiSparkle className="text-lg" /> },
    { id: 'qr-codes', name: 'QR کدها', icon: <PiSparkle className="text-lg" /> },
    { id: 'analytics', name: 'آمار و گزارش', icon: <PiSparkle className="text-lg" /> },
    { id: 'payments', name: 'پرداخت‌ها', icon: <PiMoney className="text-lg" /> },
    { id: 'settings', name: 'تنظیمات', icon: <PiSparkle className="text-lg" /> }
  ];

  const statusFilters = [
    { id: 'all', name: 'همه', count: payments.length },
    { id: 'success', name: 'موفق', count: payments.filter(p => p.status === 'موفق').length },
    { id: 'pending', name: 'در انتظار', count: payments.filter(p => p.status === 'در انتظار').length },
    { id: 'failed', name: 'ناموفق', count: payments.filter(p => p.status === 'ناموفق').length }
  ];

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = payment.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'success' && payment.status === 'موفق') ||
                         (statusFilter === 'pending' && payment.status === 'در انتظار') ||
                         (statusFilter === 'failed' && payment.status === 'ناموفق');
    
    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case 'موفق': return <PiCheckCircle className="text-green-500 text-lg" />;
      case 'در انتظار': return <PiClock className="text-yellow-500 text-lg" />;
      case 'ناموفق': return <PiXCircle className="text-red-500 text-lg" />;
      default: return <PiClock className="text-gray-500 text-lg" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'موفق': return 'bg-green-100 text-green-700';
      case 'در انتظار': return 'bg-yellow-100 text-yellow-700';
      case 'ناموفق': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
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
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center space-x-3 rtl:space-x-reverse p-3 rounded-2xl mb-2 transition-all duration-200 ${
                item.id === 'payments'
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
              <h1 className="text-2xl font-black text-gray-800">مدیریت پرداخت‌ها</h1>
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
                  placeholder="جستجوی پرداخت..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-80 pr-10 pl-4 py-3 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              {/* Status Filters */}
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                {statusFilters.map(filter => (
                  <button
                    key={filter.id}
                    onClick={() => setStatusFilter(filter.id)}
                    className={`flex items-center space-x-2 rtl:space-x-reverse px-3 py-2 rounded-2xl text-sm transition-colors duration-200 ${
                      statusFilter === filter.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <span>{filter.name}</span>
                    <span className={`px-1.5 py-0.5 rounded-full text-xs ${
                      statusFilter === filter.id
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {filter.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <button className="flex items-center space-x-2 rtl:space-x-reverse px-4 py-3 bg-white border border-gray-200 rounded-2xl hover:bg-gray-50 transition-colors duration-200">
                <PiDownload className="text-lg" />
                <span>خروجی Excel</span>
              </button>
              <button className="flex items-center space-x-2 rtl:space-x-reverse px-4 py-3 bg-white border border-gray-200 rounded-2xl hover:bg-gray-50 transition-colors duration-200">
                <PiExport className="text-lg" />
                <span>گزارش PDF</span>
              </button>
            </div>
          </div>

          {/* Payments Table */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Table Header */}
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-600">
                <div className="col-span-3">کاربر</div>
                <div className="col-span-2">مبلغ</div>
                <div className="col-span-2">پلن</div>
                <div className="col-span-2">وضعیت</div>
                <div className="col-span-3">تاریخ و زمان</div>
              </div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-gray-200">
              {filteredPayments.map(payment => (
                <div key={payment.id} className="px-6 py-4 hover:bg-gray-50 transition-colors duration-200">
                  <div className="grid grid-cols-12 gap-4 items-center">
                    <div className="col-span-3">
                      <div className="flex items-center space-x-3 rtl:space-x-reverse">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center text-white font-bold">
                          {payment.user.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800">{payment.user}</h4>
                          <p className="text-gray-600 text-sm">{payment.email}</p>
                        </div>
                      </div>
                    </div>

                    <div className="col-span-2">
                      <div className="text-left">
                        <div className="text-gray-800 font-bold">{payment.amount}</div>
                        <div className="text-gray-500 text-xs">تومان</div>
                      </div>
                    </div>

                    <div className="col-span-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        payment.plan === 'حرفه‌ای' ? 'bg-blue-100 text-blue-700' :
                        payment.plan === 'تجاری' ? 'bg-purple-100 text-purple-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {payment.plan}
                      </span>
                    </div>

                    <div className="col-span-2">
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        {getStatusIcon(payment.status)}
                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(payment.status)}`}>
                          {payment.status}
                        </span>
                      </div>
                    </div>

                    <div className="col-span-3">
                      <div className="text-left">
                        <div className="text-gray-800 text-sm">{payment.date}</div>
                        <div className="text-gray-500 text-xs">{payment.time}</div>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">شناسه تراکنش:</span>
                        <span className="text-gray-800 font-mono mr-2">{payment.transactionId}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">روش پرداخت:</span>
                        <span className="text-gray-800 mr-2">{payment.method}</span>
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
                  <PiMoney className="text-white text-xl" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-black text-gray-800">۲۴.۵M</div>
                  <div className="text-gray-600 text-sm">درآمد کل</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center">
                  <PiCheckCircle className="text-white text-xl" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-black text-gray-800">۱,۲۳۴</div>
                  <div className="text-gray-600 text-sm">پرداخت موفق</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-2xl flex items-center justify-center">
                  <PiClock className="text-white text-xl" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-black text-gray-800">۴۵</div>
                  <div className="text-gray-600 text-sm">در انتظار</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl flex items-center justify-center">
                  <PiXCircle className="text-white text-xl" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-black text-gray-800">۲۳</div>
                  <div className="text-gray-600 text-sm">پرداخت ناموفق</div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminPayments;