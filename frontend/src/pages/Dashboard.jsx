import React from 'react';
import { PiChartLine, PiCards, PiQrCode, PiGear, PiPlus, PiEye, PiPencil, PiTrash, PiDownload } from 'react-icons/pi';

const Dashboard = () => {
  const stats = [
    { label: 'کل منوها', value: '۵', icon: <PiCards className="text-2xl" />, color: 'from-blue-500 to-cyan-500' },
    { label: 'بازدید امروز', value: '۱۲۴', icon: <PiChartLine className="text-2xl" />, color: 'from-green-500 to-teal-500' },
    { label: 'سفارشات', value: '۲۸', icon: <PiDownload className="text-2xl" />, color: 'from-orange-500 to-red-500' },
    { label: 'میانگین امتیاز', value: '۴.۸', icon: <PiEye className="text-2xl" />, color: 'from-purple-500 to-pink-500' }
  ];

  const menus = [
    { id: 1, name: 'منوی اصلی رستوران', views: 1245, status: 'فعال', lastUpdate: '۲ ساعت پیش' },
    { id: 2, name: 'منوی دسر و نوشیدنی', views: 567, status: 'فعال', lastUpdate: '۱ روز پیش' },
    { id: 3, name: 'منوی ویژه شب', views: 234, status: 'غیرفعال', lastUpdate: '۳ روز پیش' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-300 rounded-full blur-3xl opacity-20 floating"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-300 rounded-full blur-3xl opacity-20 floating" style={{animationDelay: '1.5s'}}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="pt-32 pb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-4xl font-black gradient-text mb-4">
                داشبورد مدیریت
              </h1>
              <p className="text-gray-600 text-lg">
                به پنل مدیریت تربچه خوش آمدید
              </p>
            </div>
            <button className="mt-4 lg:mt-0 group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-2xl font-bold transition-all duration-300 hover-lift shadow-2xl flex items-center space-x-2 rtl:space-x-reverse">
              <PiPlus className="text-xl" />
              <span>منوی جدید</span>
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="glass-card rounded-3xl p-6 shadow-2xl hover-lift">
              <div className="flex items-center justify-between">
                <div>
                  <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                    {stat.icon}
                  </div>
                </div>
                <div className="text-left">
                  <div className="text-2xl font-black text-gray-800">{stat.value}</div>
                  <div className="text-gray-600 text-sm">{stat.label}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Menus */}
        <div className="glass-card rounded-3xl shadow-2xl mb-8 hover-lift">
          <div className="p-6 border-b border-gray-200/50">
            <h2 className="text-xl font-black text-gray-800">منوهای اخیر</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {menus.map((menu) => (
                <div key={menu.id} className="flex items-center justify-between p-4 glass-effect rounded-2xl hover-lift transition-all duration-300">
                  <div className="flex items-center space-x-4 rtl:space-x-reverse">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
                      <PiCards className="text-white text-xl" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800">{menu.name}</h3>
                      <div className="flex items-center space-x-4 rtl:space-x-reverse text-sm text-gray-600 mt-1">
                        <span>بازدید: {menu.views}</span>
                        <span className={`px-2 py-1 rounded-full text-xs glass-effect ${
                          menu.status === 'فعال' ? 'text-green-700' : 'text-gray-700'
                        }`}>
                          {menu.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <button className="w-10 h-10 glass-effect text-blue-600 rounded-2xl flex items-center justify-center transition-all duration-300 hover-lift">
                      <PiEye className="text-lg" />
                    </button>
                    <button className="w-10 h-10 glass-effect text-green-600 rounded-2xl flex items-center justify-center transition-all duration-300 hover-lift">
                      <PiPencil className="text-lg" />
                    </button>
                    <button className="w-10 h-10 glass-effect text-red-600 rounded-2xl flex items-center justify-center transition-all duration-300 hover-lift">
                      <PiTrash className="text-lg" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card rounded-3xl p-6 shadow-2xl text-center hover-lift">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <PiQrCode className="text-white text-2xl" />
            </div>
            <h3 className="font-bold text-gray-800 mb-2">مدیریت QR کد</h3>
            <p className="text-gray-600 text-sm mb-4">ساخت و مدیریت QR کدهای منو</p>
            <button className="glass-effect text-blue-600 px-4 py-2 rounded-2xl text-sm font-medium transition-colors duration-300 hover-lift">
              مشاهده
            </button>
          </div>

          <div className="glass-card rounded-3xl p-6 shadow-2xl text-center hover-lift">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <PiChartLine className="text-white text-2xl" />
            </div>
            <h3 className="font-bold text-gray-800 mb-2">آمار و تحلیل</h3>
            <p className="text-gray-600 text-sm mb-4">مشاهده آمار بازدید و عملکرد</p>
            <button className="glass-effect text-green-600 px-4 py-2 rounded-2xl text-sm font-medium transition-colors duration-300 hover-lift">
              مشاهده
            </button>
          </div>

          <div className="glass-card rounded-3xl p-6 shadow-2xl text-center hover-lift">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <PiGear className="text-white text-2xl" />
            </div>
            <h3 className="font-bold text-gray-800 mb-2">تنظیمات</h3>
            <p className="text-gray-600 text-sm mb-4">مدیریت حساب و تنظیمات</p>
            <button className="glass-effect text-purple-600 px-4 py-2 rounded-2xl text-sm font-medium transition-colors duration-300 hover-lift">
              مشاهده
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;