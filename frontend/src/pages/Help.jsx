import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { PiQuestion, PiBook, PiVideo, PiChat, PiMagnifyingGlass, PiCaretDown, PiCaretLeft, PiPlayCircle, PiCards, PiSparkle, PiCrown } from 'react-icons/pi';

const CTAButton = ({ 
  children, 
  icon, 
  variant = "primary", 
  className = "",
  onClick,
  ...props 
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const baseStyles = "group px-6 py-3 rounded-2xl font-bold transition-all duration-300 ease-out flex items-center justify-center space-x-2 rtl:space-x-reverse min-w-[180px] focus:outline-none focus:ring-2 focus:ring-offset-2 backdrop-blur-sm";
  
  const variants = {
    primary: "bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 hover:from-blue-700 hover:via-purple-700 hover:to-cyan-700 text-white shadow-xl hover:shadow-2xl focus:ring-blue-500 relative overflow-hidden hover:scale-105 border border-blue-500/30",
    secondary: "bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg hover:bg-white dark:hover:bg-gray-800 text-gray-800 dark:text-white shadow-lg hover:shadow-xl border border-white/50 dark:border-gray-700 focus:ring-purple-500 hover:scale-105 hover:border-white/80 dark:hover:border-gray-600"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      {...props}
    >
      {variant === "primary" && (
        <>
          <div 
            className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
            aria-hidden="true"
          />
        </>
      )}
      <span className={`transform transition-transform duration-300 ${isHovered ? 'scale-110' : 'scale-100'}`}>
        {icon}
      </span>
      <span className={`relative z-10 font-bold ${variant === 'primary' ? 'text-white' : ''}`}>
        {children}
      </span>
    </button>
  );
};

const Help = () => {
  const [activeCategory, setActiveCategory] = useState('getting-started');
  const [openItems, setOpenItems] = useState({});
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleItem = useCallback((id) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  }, []);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories = useMemo(() => [
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
  ], []);

  const popularArticles = useMemo(() => [
    'راهنمای کامل ساخت اولین منو',
    'بهترین روش‌های قیمت‌گذاری',
    'نحوه استفاده از QR کد',
    'راهکارهای افزایش بازدید منو',
    'تنظیمات پیشرفته منو'
  ], []);

  const handleSupportClick = useCallback(() => {
    console.log('Contact support clicked');
  }, []);

  const handleVideoTutorials = useCallback(() => {
    console.log('Video tutorials clicked');
  }, []);

  return (
    <section 
      id="help" 
      className="min-h-screen relative overflow-hidden pt-20 pb-12 md:pt-28 md:pb-16 bg-gradient-to-br from-gray-50/95 via-blue-50/95 to-purple-50/95 dark:from-gray-900/95 dark:via-blue-900/20 dark:to-purple-900/20 backdrop-blur-sm"
      aria-label="مرکز راهنمایی پلتفرم تربچه"
    >
      {/* Static Background */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-8 left-8 w-64 h-64 md:w-80 md:h-80 bg-blue-300 dark:bg-blue-600 rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-8 right-8 w-64 h-64 md:w-80 md:h-80 bg-purple-300 dark:bg-purple-600 rounded-full blur-3xl opacity-20" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-56 h-56 md:w-72 md:h-72 bg-cyan-300 dark:bg-cyan-600 rounded-full blur-3xl opacity-20" />
        
        {/* Static Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02] backdrop-blur-sm">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(#e5e7eb 1px, transparent 1px), linear-gradient(90deg, #e5e7eb 1px, transparent 1px)`,
              backgroundSize: '50px 50px',
            }}
          />
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="pt-20 pb-8">
          {/* Header Section */}
          <div className="text-center mb-12">
            {/* Premium Badge */}
            <div 
              className="inline-flex items-center space-x-2 rtl:space-x-reverse bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl px-4 py-2 mb-6 shadow-xl border border-white/30 dark:border-gray-700"
              role="status"
              aria-label="مرکز راهنمایی تخصصی"
            >
              <div className="flex items-center space-x-1 rtl:space-x-reverse">
                <PiCrown className="text-yellow-500 text-base" aria-hidden="true" />
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full backdrop-blur-sm" aria-hidden="true" />
              </div>
              <span className="text-xs font-black text-gray-800 dark:text-gray-200 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                مرکز راهنمایی تخصصی
              </span>
              <PiSparkle className="text-purple-500 text-base" aria-hidden="true" />
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black leading-tight mb-4 lg:mb-6">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
                مرکز راهنمایی
              </span>
              <br />
              <span className="text-gray-900 dark:text-white">پاسخ سوالات شما</span>
              <br />
              <span className="text-gray-900 dark:text-white">در یک مکان</span>
            </h1>
            
            {/* Description */}
            <p className="text-base sm:text-lg lg:text-xl text-gray-700 dark:text-gray-300 mb-6 lg:mb-8 leading-relaxed max-w-2xl mx-auto">
              با <span className="font-black text-blue-600 dark:text-blue-400">مرکز راهنمایی تربچه</span>، پاسخ تمام سوالات خود را 
              <span className="font-black text-purple-600 dark:text-purple-400"> به سرعت و به راحتی</span> پیدا کنید.
            </p>

            {/* Search */}
            <div className="max-w-2xl mx-auto relative">
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <PiMagnifyingGlass className="text-xl" />
              </div>
              <input
                type="text"
                placeholder="چه سوالی دارید؟ جستجو کنید..."
                className="w-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl px-4 py-4 pr-12 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-white/50 dark:border-gray-700 shadow-lg"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/30 dark:border-gray-700 sticky top-32">
                <h3 className="text-lg font-black text-gray-800 dark:text-white mb-4">دسته‌بندی‌ها</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`w-full text-right p-3 rounded-2xl flex items-center justify-between backdrop-blur-sm border ${
                        activeCategory === category.id
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg border-transparent'
                          : 'bg-white/50 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 border-white/30 dark:border-gray-600'
                      }`}
                    >
                      <div className="flex items-center space-x-3 rtl:space-x-reverse">
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                          activeCategory === category.id 
                            ? 'bg-white/20 text-white' 
                            : 'bg-gray-100/80 dark:bg-gray-600/80 text-gray-600 dark:text-gray-400'
                        }`}>
                          {category.icon}
                        </div>
                        <span className="font-medium">{category.name}</span>
                      </div>
                      <PiCaretLeft className={`text-lg ${
                        activeCategory === category.id ? 'transform rotate-90' : ''
                      }`} />
                    </button>
                  ))}
                </div>

                <div className="border-t border-gray-200/50 dark:border-gray-600/50 mt-6 pt-6">
                  <h4 className="text-lg font-black text-gray-800 dark:text-white mb-4">مقالات پرطرفدار</h4>
                  <div className="space-y-2">
                    {popularArticles.map((article, index) => (
                      <button
                        key={index}
                        className="w-full text-right p-3 rounded-2xl bg-white/50 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 text-sm backdrop-blur-sm border border-white/30 dark:border-gray-600"
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
              <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/30 dark:border-gray-700">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-black text-gray-800 dark:text-white">
                    {categories.find(cat => cat.id === activeCategory)?.name}
                  </h2>
                  <div className="flex items-center space-x-4 rtl:space-x-reverse text-sm text-gray-600 dark:text-gray-400">
                    <CTAButton
                      icon={<PiVideo className="text-lg" />}
                      variant="secondary"
                      className="min-w-0 px-4 py-2 text-sm"
                      onClick={handleVideoTutorials}
                    >
                      آموزش ویدیویی
                    </CTAButton>
                    <CTAButton
                      icon={<PiChat className="text-lg" />}
                      variant="secondary"
                      className="min-w-0 px-4 py-2 text-sm"
                      onClick={handleSupportClick}
                    >
                      پشتیبانی آنلاین
                    </CTAButton>
                  </div>
                </div>

                <div className="space-y-4">
                  {categories
                    .find(cat => cat.id === activeCategory)
                    ?.items.map((item) => (
                      <div key={item.id} className="bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/30 dark:border-gray-600">
                        <button
                          onClick={() => toggleItem(item.id)}
                          className="w-full text-right p-4 flex items-center justify-between"
                        >
                          <div className="flex items-center space-x-3 rtl:space-x-reverse">
                            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                              <PiQuestion className="text-blue-500 text-xl" />
                            </div>
                            <span className="font-medium text-gray-800 dark:text-white">{item.question}</span>
                          </div>
                          <PiCaretDown
                            className={`text-gray-400 text-lg ${
                              openItems[item.id] ? 'transform rotate-180' : ''
                            }`}
                          />
                        </button>
                        {openItems[item.id] && (
                          <div className="px-4 pb-4">
                            <div className="border-t border-gray-200/50 dark:border-gray-600/50 pt-4">
                              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{item.answer}</p>
                              <div className="flex items-center space-x-4 rtl:space-x-reverse mt-3 pt-3 border-t border-gray-200/50 dark:border-gray-600/50">
                                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                                  این پاسخ مفید بود
                                </button>
                                <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 text-sm">
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
                <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl border border-blue-200 dark:border-blue-800 backdrop-blur-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-black text-gray-800 dark:text-white mb-2">پاسخ خود را پیدا نکردید؟</h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">تیم پشتیبانی ما آماده کمک به شماست</p>
                    </div>
                    <CTAButton
                      icon={<PiChat className="text-xl" />}
                      variant="primary"
                      onClick={handleSupportClick}
                    >
                      تماس با پشتیبانی
                    </CTAButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Help;