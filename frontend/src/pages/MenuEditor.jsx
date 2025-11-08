import React, { useState } from 'react';
import { 
  PiPlus, 
  PiTrash, 
  PiPencil, 
  PiEye, 
  PiFloppyDisk, 
  PiUpload, 
  PiTextbox, 
  PiCurrencyDollar, 
  PiImage 
} from 'react-icons/pi';

const MenuEditor = () => {
  const [menuItems, setMenuItems] = useState([
    { id: 1, name: 'برگر ویژه', description: 'گوشت آنگری، پنیر چدار، قارچ', price: 45000, image: '' },
    { id: 2, name: 'سیب زمینی سرخ کرده', description: 'سیب زمینی طلایی با سس مخصوص', price: 18000, image: '' },
    { id: 3, name: 'نوشابه قوطی', description: 'نوشابه گازدار 330 میلی‌لیتر', price: 12000, image: '' }
  ]);

  const [editingItem, setEditingItem] = useState(null);

  const addNewItem = () => {
    const newItem = {
      id: Date.now(),
      name: 'آیتم جدید',
      description: 'توضیحات آیتم',
      price: 0,
      image: ''
    };
    setMenuItems([...menuItems, newItem]);
    setEditingItem(newItem.id);
  };

  const deleteItem = (id) => {
    setMenuItems(menuItems.filter(item => item.id !== id));
  };

  const updateItem = (id, field, value) => {
    setMenuItems(menuItems.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

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
                ویرایشگر منو
              </h1>
              <p className="text-gray-600 text-lg">
                منوی رستوران خود را به صورت زنده ویرایش کنید
              </p>
            </div>
            <div className="flex items-center space-x-4 rtl:space-x-reverse mt-4 lg:mt-0">
              <button className="glass-effect text-gray-700 hover:text-blue-600 px-4 py-3 rounded-2xl font-medium transition-all duration-300 hover-lift flex items-center space-x-2 rtl:space-x-reverse">
                <PiEye className="text-xl" />
                <span>پیش‌نمایش</span>
              </button>
              <button className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white px-6 py-3 rounded-2xl font-bold transition-all duration-300 hover-lift shadow-2xl flex items-center space-x-2 rtl:space-x-reverse">
                <PiFloppyDisk className="text-xl" />
                <span>ذخیره منو</span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Editor Panel */}
          <div className="glass-card rounded-3xl p-6 shadow-2xl hover-lift">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-black text-gray-800">آیتم‌های منو</h2>
              <button 
                onClick={addNewItem}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-2xl font-bold transition-all duration-300 hover-lift flex items-center space-x-2 rtl:space-x-reverse"
              >
                <PiPlus className="text-xl" />
                <span>آیتم جدید</span>
              </button>
            </div>

            <div className="space-y-4">
              {menuItems.map((item) => (
                <div key={item.id} className="glass-effect rounded-2xl p-4 border border-white/20 hover-lift transition-all duration-300">
                  {editingItem === item.id ? (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-gray-800">ویرایش آیتم</h3>
                        <button 
                          onClick={() => setEditingItem(null)}
                          className="text-gray-500 hover:text-gray-700 transition-colors duration-300"
                        >
                          ×
                        </button>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <label className="text-sm font-medium text-gray-700 mb-1 block">نام آیتم</label>
                          <input
                            type="text"
                            value={item.name}
                            onChange={(e) => updateItem(item.id, 'name', e.target.value)}
                            className="w-full glass-effect rounded-2xl px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium text-gray-700 mb-1 block">توضیحات</label>
                          <textarea
                            value={item.description}
                            onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                            className="w-full glass-effect rounded-2xl px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                            rows="2"
                          />
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium text-gray-700 mb-1 block">قیمت (تومان)</label>
                          <input
                            type="number"
                            value={item.price}
                            onChange={(e) => updateItem(item.id, 'price', parseInt(e.target.value))}
                            className="w-full glass-effect rounded-2xl px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 rtl:space-x-reverse">
                        <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center">
                          <PiTextbox className="text-white text-xl" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800">{item.name}</h4>
                          <p className="text-gray-600 text-sm">{item.description}</p>
                          <div className="text-orange-600 font-bold mt-1">{item.price.toLocaleString()} تومان</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <button 
                          onClick={() => setEditingItem(item.id)}
                          className="w-8 h-8 glass-effect text-blue-600 rounded-xl flex items-center justify-center hover-lift transition-all duration-300"
                        >
                          <PiPencil className="text-sm" />
                        </button>
                        <button 
                          onClick={() => deleteItem(item.id)}
                          className="w-8 h-8 glass-effect text-red-600 rounded-xl flex items-center justify-center hover-lift transition-all duration-300"
                        >
                          <PiTrash className="text-sm" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Preview Panel */}
          <div className="glass-card rounded-3xl p-6 shadow-2xl hover-lift">
            <h2 className="text-xl font-black text-gray-800 mb-6">پیش‌نمایش منو</h2>
            
            <div className="space-y-4">
              {menuItems.map((item) => (
                <div key={item.id} className="glass-effect rounded-2xl p-4 border border-white/20 hover-lift transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-gray-800 text-lg">{item.name}</h4>
                      <p className="text-gray-600 text-sm mt-1">{item.description}</p>
                    </div>
                    <div className="text-left">
                      <div className="text-orange-600 font-bold text-lg">{item.price.toLocaleString()}</div>
                      <div className="text-gray-500 text-sm">تومان</div>
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

export default MenuEditor;