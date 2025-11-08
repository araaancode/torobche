import React from 'react';
import { PiChartLine, PiEye, PiDownload, PiUsers, PiTrendUp } from 'react-icons/pi';

const Analytics = () => {
  const stats = [
    { label: 'بازدید کل', value: '۱۲,۴۵۶', change: '+۱۲٪', icon: <PiEye className="text-2xl" />, color: 'from-blue-500 to-cyan-500' },
    { label: 'بازدید امروز', value: '۲۳۴', change: '+۸٪', icon: <PiChartLine className="text-2xl" />, color: 'from-green-500 to-teal-500' },
    { label: 'سفارشات', value: '۱۵۶', change: '+۱۵٪', icon: <PiDownload className="text-2xl" />, color: 'from-orange-500 to-red-500' },
    { label: 'کاربران فعال', value: '۸۹', change: '+۵٪', icon: <PiUsers className="text-2xl" />, color: 'from-purple-500 to-pink-500' }
  ];

  const popularItems = [
    { name: 'برگر ویژه', views: 1245, orders: 89 },
    { name: 'سیب زمینی سرخ کرده', views: 987, orders: 67 },
    { name: 'نوشابه قوطی', views: 856, orders: 123 },
    { name: 'سالاد سزار', views: 654, orders: 45 }
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
                آمار و تحلیل
              </h1>
              <p className="text-gray-600 text-lg">
                تحلیل عملکرد منو و رفتار کاربران
              </p>
            </div>
            <div className="flex items-center space-x-4 rtl:space-x-reverse mt-4 lg:mt-0">
              <select className="glass-effect text-gray-700 px-4 py-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>۷ روز گذشته</option>
                <option>۳۰ روز گذشته</option>
                <option>۹۰ روز گذشته</option>
              </select>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="glass-card rounded-3xl p-6 shadow-2xl hover-lift">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                  {stat.icon}
                </div>
                <div className={`flex items-center space-x-1 rtl:space-x-reverse text-sm font-medium ${
                  stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                }`}>
                  <PiTrendUp className={stat.change.startsWith('+') ? '' : 'transform rotate-180'} />
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Popular Items */}
          <div className="glass-card rounded-3xl shadow-2xl hover-lift">
            <div className="p-6 border-b border-gray-200/50">
              <h2 className="text-xl font-black text-gray-800">محبوب‌ترین آیتم‌ها</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {popularItems.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 glass-effect rounded-2xl hover-lift transition-all duration-300">
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center text-white font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800">{item.name}</h4>
                        <div className="flex items-center space-x-4 rtl:space-x-reverse text-sm text-gray-600 mt-1">
                          <span>بازدید: {item.views}</span>
                          <span>سفارش: {item.orders}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-left">
                      <div className="text-green-600 font-bold text-sm">{(item.orders / item.views * 100).toFixed(1)}%</div>
                      <div className="text-gray-500 text-xs">نرخ تبدیل</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Traffic Sources */}
          <div className="glass-card rounded-3xl shadow-2xl hover-lift">
            <div className="p-6 border-b border-gray-200/50">
              <h2 className="text-xl font-black text-gray-800">منابع ترافیک</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {[
                  { source: 'QR کد', percentage: 65, color: 'from-blue-500 to-cyan-500' },
                  { source: 'لینک مستقیم', percentage: 20, color: 'from-green-500 to-teal-500' },
                  { source: 'شبکه‌های اجتماعی', percentage: 10, color: 'from-purple-500 to-pink-500' },
                  { source: 'سایر', percentage: 5, color: 'from-gray-500 to-gray-700' }
                ].map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">{item.source}</span>
                      <span className="text-sm text-gray-600">{item.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full bg-gradient-to-r ${item.color}`}
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;