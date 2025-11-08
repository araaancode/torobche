import React, { useState } from 'react';
import { PiPlus, PiQrCode, PiChartLine, PiPencil, PiTrash, PiEye, PiExport } from 'react-icons/pi';

const MenuManager = () => {
  const [menus, setMenus] = useState([
    {
      id: 1,
      name: 'منوی اصلی رستوران',
      description: 'منوی کامل غذاهای اصلی',
      status: 'فعال',
      views: 1245,
      items: 25,
      lastUpdate: '۲ ساعت پیش',
      qrCode: 'qrcode1'
    },
    {
      id: 2,
      name: 'منوی دسر و نوشیدنی',
      description: 'انواع دسر و نوشیدنی‌های سرد و گرم',
      status: 'فعال',
      views: 567,
      items: 18,
      lastUpdate: '۱ روز پیش',
      qrCode: 'qrcode2'
    },
    {
      id: 3,
      name: 'منوی ویژه شب',
      description: 'پیشنهادات ویژه ساعات شب',
      status: 'غیرفعال',
      views: 234,
      items: 12,
      lastUpdate: '۳ روز پیش',
      qrCode: 'qrcode3'
    }
  ]);

  const deleteMenu = (id) => {
    setMenus(menus.filter(menu => menu.id !== id));
  };

  const toggleStatus = (id) => {
    setMenus(menus.map(menu => 
      menu.id === id 
        ? {...menu, status: menu.status === 'فعال' ? 'غیرفعال' : 'فعال'}
        : menu
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-300 rounded-full blur-3xl opacity-20 floating"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-300 rounded-full blur-3xl opacity-20 floating" style={{animationDelay: '1.5s'}}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="pt-32 pb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-4xl font-black gradient-text mb-4">مدیریت منوها</h1>
              <p className="text-gray-600 text-lg">مدیریت و سازماندهی منوهای رستوران</p>
            </div>
            <button className="mt-4 lg:mt-0 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-2xl font-bold transition-all duration-300 hover-lift shadow-2xl flex items-center space-x-2 rtl:space-x-reverse">
              <PiPlus className="text-xl" />
              <span>منوی جدید</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          {/* Stats Cards */}
          <div className="glass-card rounded-3xl p-6 shadow-2xl hover-lift">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <PiQrCode className="text-white text-xl" />
              </div>
              <div className="text-2xl font-black text-gray-800">{menus.length}</div>
              <div className="text-gray-600 text-sm">منوی فعال</div>
            </div>
          </div>

          <div className="glass-card rounded-3xl p-6 shadow-2xl hover-lift">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <PiEye className="text-white text-xl" />
              </div>
              <div className="text-2xl font-black text-gray-800">
                {menus.reduce((sum, menu) => sum + menu.views, 0).toLocaleString()}
              </div>
              <div className="text-gray-600 text-sm">بازدید کل</div>
            </div>
          </div>

          <div className="glass-card rounded-3xl p-6 shadow-2xl hover-lift">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <PiChartLine className="text-white text-xl" />
              </div>
              <div className="text-2xl font-black text-gray-800">
                {menus.reduce((sum, menu) => sum + menu.items, 0)}
              </div>
              <div className="text-gray-600 text-sm">آیتم کل</div>
            </div>
          </div>

          <div className="glass-card rounded-3xl p-6 shadow-2xl hover-lift">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <PiExport className="text-white text-xl" />
              </div>
              <div className="text-2xl font-black text-gray-800">
                {menus.filter(menu => menu.status === 'فعال').length}
              </div>
              <div className="text-gray-600 text-sm">منوی منتشر شده</div>
            </div>
          </div>
        </div>

        {/* Menus List */}
        <div className="glass-card rounded-3xl shadow-2xl hover-lift">
          <div className="p-6 border-b border-gray-200/50">
            <h2 className="text-xl font-black text-gray-800">لیست منوها</h2>
          </div>
          
          <div className="p-6">
            <div className="space-y-4">
              {menus.map((menu) => (
                <div key={menu.id} className="flex items-center justify-between p-4 glass-effect rounded-2xl hover-lift transition-all duration-300">
                  <div className="flex items-center space-x-4 rtl:space-x-reverse">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
                      <PiQrCode className="text-white text-xl" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800">{menu.name}</h3>
                      <p className="text-gray-600 text-sm">{menu.description}</p>
                      <div className="flex items-center space-x-4 rtl:space-x-reverse text-sm text-gray-500 mt-1">
                        <span>بازدید: {menu.views.toLocaleString()}</span>
                        <span>آیتم‌ها: {menu.items}</span>
                        <span>آخرین تغییر: {menu.lastUpdate}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <button 
                      onClick={() => toggleStatus(menu.id)}
                      className={`px-3 py-1 rounded-2xl text-xs font-medium transition-all duration-300 hover-lift ${
                        menu.status === 'فعال' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {menu.status}
                    </button>
                    
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <button className="w-8 h-8 glass-effect text-blue-600 rounded-xl flex items-center justify-center hover-lift">
                        <PiEye className="text-sm" />
                      </button>
                      <button className="w-8 h-8 glass-effect text-green-600 rounded-xl flex items-center justify-center hover-lift">
                        <PiPencil className="text-sm" />
                      </button>
                      <button className="w-8 h-8 glass-effect text-purple-600 rounded-xl flex items-center justify-center hover-lift">
                        <PiChartLine className="text-sm" />
                      </button>
                      <button 
                        onClick={() => deleteMenu(menu.id)}
                        className="w-8 h-8 glass-effect text-red-600 rounded-xl flex items-center justify-center hover-lift"
                      >
                        <PiTrash className="text-sm" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuManager;