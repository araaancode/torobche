import React, { useState } from 'react';
import { PiQuestion, PiBook, PiVideo, PiChat, PiMagnifyingGlass, PiCaretDown, PiCaretLeft } from 'react-icons/pi';

const Help = () => {
  const [activeCategory, setActiveCategory] = useState('getting-started');
  const [openItems, setOpenItems] = useState({});

  const toggleItem = (id) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const categories = [
    {
      id: 'getting-started',
      name: 'شروع کار',
      icon: <PiBook className="text-xl" />,
      items: [
        {
          id: 1,
          question: 'چگونه اولین منوی خود را ایجاد کنم؟',
          answer: 'برای ایجاد اولین منو، وارد حساب کاربری خود شوید، روی دکمه "ساخت منوی جدید" کلیک کنید و مراحل راهنمای ساخت منو را دنبال نمایید.'
        },
        {
          id: 2,
          question: 'چگونه قالب منو را تغییر دهم؟',
          answer: 'در صفحه ویرایش منو، به بخش "قالب‌ها" مراجعه کرده و از بین قالب‌های موجود، مورد دلخواه خود را انتخاب کنید.'
        },
        {
          id: 3,
          question: 'چگونه QR کد منو را دریافت کنم؟',
          answer: 'پس از ذخیره منو، به صفحه مدیریت منوها مراجعه کرده و روی آیکون QR کد کلیک کنید تا QR کد منو نمایش داده شود.'
        }
      ]
    },
    {
      id: 'menu-management',
      name: 'مدیریت منو',
      icon: <PiBook className="text-xl" />,
      items: [
        {
          id: 4,
          question: 'چگونه آیتم جدید به منو اضافه کنم؟',
          answer: 'در صفحه ویرایش منو، روی دکمه "افزودن آیتم" کلیک کرده و اطلاعات آیتم شامل نام، توضیحات، قیمت و تصویر را وارد کنید.'
        },
        {
          id: 5,
          question: 'چگونه دسته‌بندی ایجاد کنم؟',
          answer: 'در بخش ویرایش منو، می‌توانید دسته‌بندی‌های مختلف مانند "پیش غذا"، "غذای اصلی"، "دسر" و ... ایجاد کنید.'
        },
        {
          id: 6,
          question: 'چگونه قیمت آیتم‌ها را به روز کنم؟',
          answer: 'در صفحه ویرایش منو، روی آیتم مورد نظر کلیک کرده و قیمت جدید را وارد کنید، سپس تغییرات را ذخیره نمایید.'
        }
      ]
    },
    {
      id: 'analytics',
      name: 'آمار و گزارش‌ها',
      icon: <PiBook className="text-xl" />,
      items: [
        {
          id: 7,
          question: 'چگونه آمار بازدید منو را ببینم؟',
          answer: 'به صفحه "آمار و تحلیل" مراجعه کرده و گزارش کامل بازدیدهای منو را مشاهده کنید.'
        },
        {
          id: 8,
          question: 'چه اطلاعاتی در گزارش‌ها موجود است؟',
          answer: 'شماره بازدیدها، زمان‌های پربازدید، آیتم‌های محبوب و اطلاعات جغرافیایی بازدیدکنندگان.'
        }
      ]
    }
  ];

  const popularArticles = [
    'راهنمای کامل ساخت اولین منو',
    'بهترین روش‌های قیمت‌گذاری',
    'نحوه استفاده از QR کد',
    'راهکارهای افزایش بازدید منو',
    'تنظیمات پیشرفته منو'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-300 rounded-full blur-3xl opacity-20 floating"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-300 rounded-full blur-3xl opacity-20 floating" style={{animationDelay: '1.5s'}}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="pt-32 pb-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-black gradient-text mb-4">مرکز راهنمایی</h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-8">
              پاسخ سوالات خود را در مرکز راهنمایی ما پیدا کنید
            </p>

            {/* Search */}
            <div className="max-w-2xl mx-auto relative">
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <PiMagnifyingGlass className="text-xl" />
              </div>
              <input
                type="text"
                placeholder="چه سوالی دارید؟ جستجو کنید..."
                className="w-full glass-effect rounded-2xl px-4 py-4 pr-12 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="glass-card rounded-3xl p-6 shadow-2xl hover-lift sticky top-32">
                <h3 className="text-lg font-black text-gray-800 mb-4">دسته‌بندی‌ها</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`w-full text-right p-3 rounded-2xl transition-all duration-300 flex items-center justify-between ${
                        activeCategory === category.id
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                          : 'glass-effect text-gray-700 hover:bg-white/50'
                      }`}
                    >
                      <div className="flex items-center space-x-3 rtl:space-x-reverse">
                        {category.icon}
                        <span>{category.name}</span>
                      </div>
                      <PiCaretLeft className={`text-lg transition-transform duration-300 ${
                        activeCategory === category.id ? 'transform rotate-90' : ''
                      }`} />
                    </button>
                  ))}
                </div>

                <div className="border-t border-gray-200/50 mt-6 pt-6">
                  <h4 className="text-lg font-black text-gray-800 mb-4">مقالات پرطرفدار</h4>
                  <div className="space-y-2">
                    {popularArticles.map((article, index) => (
                      <button
                        key={index}
                        className="w-full text-right p-3 rounded-2xl glass-effect text-gray-700 hover:bg-white/50 transition-all duration-300 text-sm hover-lift"
                      >
                        {article}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="glass-card rounded-3xl p-6 shadow-2xl hover-lift">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-black text-gray-800">
                    {categories.find(cat => cat.id === activeCategory)?.name}
                  </h2>
                  <div className="flex items-center space-x-4 rtl:space-x-reverse text-sm text-gray-600">
                    <button className="flex items-center space-x-1 rtl:space-x-reverse hover:text-blue-600 transition-colors duration-300">
                      <PiVideo className="text-lg" />
                      <span>آموزش ویدیویی</span>
                    </button>
                    <button className="flex items-center space-x-1 rtl:space-x-reverse hover:text-green-600 transition-colors duration-300">
                      <PiChat className="text-lg" />
                      <span>پشتیبانی آنلاین</span>
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  {categories
                    .find(cat => cat.id === activeCategory)
                    ?.items.map((item) => (
                      <div key={item.id} className="glass-effect rounded-2xl overflow-hidden">
                        <button
                          onClick={() => toggleItem(item.id)}
                          className="w-full text-right p-4 flex items-center justify-between hover:bg-white/30 transition-all duration-300"
                        >
                          <div className="flex items-center space-x-3 rtl:space-x-reverse">
                            <PiQuestion className="text-blue-500 text-xl" />
                            <span className="font-medium text-gray-800">{item.question}</span>
                          </div>
                          <PiCaretDown
                            className={`text-gray-400 text-lg transition-transform duration-300 ${
                              openItems[item.id] ? 'transform rotate-180' : ''
                            }`}
                          />
                        </button>
                        {openItems[item.id] && (
                          <div className="px-4 pb-4">
                            <div className="border-t border-gray-200/50 pt-4">
                              <p className="text-gray-600 text-sm leading-relaxed">{item.answer}</p>
                              <div className="flex items-center space-x-4 rtl:space-x-reverse mt-3 pt-3 border-t border-gray-200/50">
                                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                                  این پاسخ مفید بود
                                </button>
                                <button className="text-gray-500 hover:text-gray-700 text-sm">
                                  گزارش مشکل
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                </div>

                {/* Contact Support */}
                <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl border border-blue-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-black text-gray-800 mb-2">پاسخ خود را پیدا نکردید؟</h4>
                      <p className="text-gray-600 text-sm">تیم پشتیبانی ما آماده کمک به شماست</p>
                    </div>
                    <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-2xl font-bold transition-all duration-300 hover-lift shadow-2xl flex items-center space-x-2 rtl:space-x-reverse">
                      <PiChat className="text-xl" />
                      <span>تماس با پشتیبانی</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;