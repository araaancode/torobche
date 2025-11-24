// pages/RestaurantMenuPage.js
import React, { useState, useMemo } from 'react';
import { PiForkKnife, PiArrowLeft, PiStar, PiClock, PiMapPin, PiHeart, PiSparkle, PiCrown } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';
import AdvancedSearchFilter from '../components/AdvancedSearchFilter';

const RestaurantMenuPage = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    priceRange: '',
    rating: '',
    sort: 'newest'
  });

  const restaurantTemplates = [
    {
      id: 1,
      title: 'منوی مدرن رستوران',
      description: 'منوی شیک و مدرن با قابلیت سفارش آنلاین',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      category: 'مدرن',
      price: 'رایگان',
      rating: 4.8,
      deliveryTime: '30 دقیقه',
      location: 'تهران',
      features: ['سفارش آنلاین', 'پشتیبانی 24/7', 'سیستم پرداخت'],
      popular: true,
      badge: 'پرطرفدار'
    },
    {
      id: 2,
      title: 'منوی فست فود',
      description: 'منوی بهینه شده برای فست فود و رستوران‌های سریع',
      image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2015&q=80',
      category: 'فست فود',
      price: 'رایگان',
      rating: 4.5,
      deliveryTime: '25 دقیقه',
      location: 'اصفهان',
      features: ['منوی سریع', 'تخفیف‌های ویژه', 'مدیریت موجودی'],
      popular: false,
      badge: 'جدید'
    },
  ];

  const searchFields = [
    {
      name: 'category',
      label: 'دسته‌بندی',
      type: 'select',
      options: [
        { value: 'مدرن', label: 'مدرن' },
        { value: 'فست فود', label: 'فست فود' },
        { value: 'سنتی', label: 'سنتی' },
        { value: 'کافه', label: 'کافه' }
      ]
    },
    {
      name: 'priceRange',
      label: 'محدوده قیمت',
      type: 'select',
      options: [
        { value: 'رایگان', label: 'رایگان' },
        { value: 'اقتصادی', label: 'اقتصادی' },
        { value: 'حرفه‌ای', label: 'حرفه‌ای' }
      ]
    },
    {
      name: 'rating',
      label: 'حداقل امتیاز',
      type: 'select',
      options: [
        { value: '4', label: '۴ ستاره به بالا' },
        { value: '3', label: '۳ ستاره به بالا' },
        { value: '2', label: '۲ ستاره به بالا' }
      ]
    }
  ];

  const sortOptions = [
    { value: 'newest', label: 'جدیدترین' },
    { value: 'popular', label: 'محبوب‌ترین' },
    { value: 'rating', label: 'بالاترین امتیاز' },
    { value: 'deliveryTime', label: 'سریع‌ترین ارسال' }
  ];

  const filteredTemplates = useMemo(() => {
    return restaurantTemplates.filter(template => {
      const matchesSearch = !filters.search || 
        template.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        template.description.toLowerCase().includes(filters.search.toLowerCase());
      
      const matchesCategory = !filters.category || template.category === filters.category;
      const matchesPrice = !filters.priceRange || template.price === filters.priceRange;
      const matchesRating = !filters.rating || template.rating >= parseFloat(filters.rating);

      return matchesSearch && matchesCategory && matchesPrice && matchesRating;
    });
  }, [filters, restaurantTemplates]);

  const handleFilterChange = (key, value) => {
    if (key === 'clear') {
      setFilters({
        search: '',
        category: '',
        priceRange: '',
        rating: '',
        sort: 'newest'
      });
    } else {
      setFilters(prev => ({ ...prev, [key]: value }));
    }
  };

  return (
    <section className="min-h-screen relative overflow-hidden pt-20 pb-12 bg-gradient-to-br from-purple-50/95 via-red-50/95 to-amber-50/95 dark:from-purple-900/20 dark:via-red-900/20 dark:to-amber-900/20 transition-all duration-1000 backdrop-blur-sm">
      
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-8 left-8 w-64 h-64 bg-purple-300 dark:bg-purple-600 rounded-full blur-3xl opacity-20 animate-pulse" />
        <div className="absolute bottom-8 right-8 w-64 h-64 bg-red-300 dark:bg-red-600 rounded-full blur-3xl opacity-20 animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-56 h-56 bg-amber-300 dark:bg-amber-600 rounded-full blur-3xl opacity-20 animate-pulse delay-500" />
        
        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02]">
          <div 
            className="absolute inset-0 animate-grid-flow"
            style={{
              backgroundImage: `linear-gradient(#e5e7eb 1px, transparent 1px), linear-gradient(90deg, #e5e7eb 1px, transparent 1px)`,
              backgroundSize: '50px 50px',
            }}
          />
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section - Matching Hero Style */}
        <div className="text-center mb-8 lg:mb-12">
          {/* Premium Badge */}
          <div className="inline-flex items-center space-x-2 rtl:space-x-reverse bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl px-4 py-2 mb-6 shadow-xl border border-white/30 dark:border-gray-700 hover:shadow-2xl transition-all duration-500 hover:scale-105 group cursor-pointer">
            <div className="flex items-center space-x-1 rtl:space-x-reverse">
              <PiCrown className="text-yellow-500 text-base group-hover:scale-110 transition-transform duration-300" />
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-ping backdrop-blur-sm" />
            </div>
            <span className="text-xs font-black text-gray-800 dark:text-gray-200 bg-gradient-to-r from-purple-600 to-red-600 bg-clip-text text-transparent">
              برترین قالب‌های منوی دیجیتال
            </span>
            <PiSparkle className="text-red-500 text-base group-hover:rotate-180 transition-transform duration-500" />
          </div>

          {/* Main Heading */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight mb-4 lg:mb-6">
            <span className="bg-gradient-to-r from-purple-600 via-red-600 to-amber-600 bg-clip-text text-transparent animate-gradient-x">
              قالب‌های منوی رستوران
            </span>
            <br />
            <span className="text-gray-900 dark:text-white">حرفه‌ای و مدرن</span>
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg lg:text-xl text-gray-700 dark:text-gray-300 mb-6 lg:mb-8 leading-relaxed max-w-2xl mx-auto">
            با <span className="font-black text-purple-600 dark:text-purple-400">تربچه</span>، منوی دیجیتال حرفه‌ای برای 
            <span className="font-black text-red-600 dark:text-red-400"> رستوران، فست فود، کافه و کسب‌وکار</span> خود ایجاد کنید.
          </p>
        </div>

        {/* Search & Filter Section */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl p-6 mb-8 shadow-xl border border-white/50 dark:border-gray-700">
          <AdvancedSearchFilter
            filters={filters}
            onFilterChange={handleFilterChange}
            searchFields={searchFields}
            sortOptions={sortOptions}
          />
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600 dark:text-gray-400">
            <span className="font-bold text-gray-800 dark:text-white">{filteredTemplates.length}</span> قالب پیدا شد
          </p>
          
          {/* Stats */}
          <div className="flex items-center space-x-6 rtl:space-x-reverse bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-3 shadow-lg border border-white/50 dark:border-gray-700">
            <div className="text-center">
              <div className="text-lg font-black text-gray-900 dark:text-white">۱۰۰+</div>
              <div className="text-gray-600 dark:text-gray-400 text-sm">قالب فعال</div>
            </div>
            <div className="w-px h-8 bg-gradient-to-b from-transparent via-gray-300 dark:via-gray-600 to-transparent" />
            <div className="text-center">
              <div className="text-lg font-black text-gray-900 dark:text-white">۹۸٪</div>
              <div className="text-gray-600 dark:text-gray-400 text-sm">رضایت کاربران</div>
            </div>
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredTemplates.map(template => (
            <div 
              key={template.id} 
              className="group bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 border border-white/30 dark:border-gray-700 transform hover:-translate-y-2 animate-float"
            >
              {/* Image Section */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={template.image} 
                  alt={template.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Badges */}
                <div className="absolute top-4 right-4">
                  {template.popular && (
                    <div className="bg-gradient-to-r from-yellow-500 to-purple-500 text-white px-3 py-1 rounded-2xl text-sm font-bold flex items-center gap-1 backdrop-blur-sm border border-yellow-400/30">
                      <PiStar className="text-sm" />
                      {template.badge}
                    </div>
                  )}
                </div>
                <div className="absolute top-4 left-4">
                  <button className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm w-10 h-10 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 border border-white/30 dark:border-gray-600">
                    <PiHeart className="text-red-500 text-xl" />
                  </button>
                </div>

                {/* Quick Info Overlay */}
                <div className="absolute bottom-4 right-4 text-right">
                  <h3 className="text-lg font-black text-white drop-shadow-2xl">{template.title}</h3>
                  <p className="text-white/90 text-sm drop-shadow-lg">{template.category}</p>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-black text-gray-900 dark:text-white">{template.title}</h3>
                  <span className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-3 py-1 rounded-2xl text-sm font-bold backdrop-blur-sm border border-green-400/30">
                    {template.price}
                  </span>
                </div>

                <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">{template.description}</p>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm mb-4">
                  <div className="flex items-center gap-1 bg-gray-50/80 dark:bg-gray-700/80 backdrop-blur-sm rounded-xl px-3 py-2">
                    <PiStar className="text-yellow-500" />
                    <span className="font-bold text-gray-900 dark:text-white">{template.rating}</span>
                  </div>
                  <div className="flex items-center gap-1 bg-gray-50/80 dark:bg-gray-700/80 backdrop-blur-sm rounded-xl px-3 py-2">
                    <PiClock className="text-blue-500" />
                    <span className="text-gray-700 dark:text-gray-300">{template.deliveryTime}</span>
                  </div>
                  <div className="flex items-center gap-1 bg-gray-50/80 dark:bg-gray-700/80 backdrop-blur-sm rounded-xl px-3 py-2">
                    <PiMapPin className="text-red-500" />
                    <span className="text-gray-700 dark:text-gray-300">{template.location}</span>
                  </div>
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {template.features.map((feature, index) => (
                    <span 
                      key={index} 
                      className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-3 py-1 rounded-xl text-xs font-bold backdrop-blur-sm border border-purple-200 dark:border-purple-800"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* CTA Button */}
                <button className="w-full bg-gradient-to-r from-purple-500 to-red-500 hover:from-purple-600 hover:to-red-600 text-white py-3 rounded-2xl font-bold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl backdrop-blur-sm border border-purple-400/30 group">
                  <span className="flex items-center justify-center gap-2">
                    استفاده از این قالب
                    <PiForkKnife className="group-hover:scale-110 transition-transform duration-300" />
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredTemplates.length === 0 && (
          <div className="text-center py-16 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl shadow-xl border border-white/50 dark:border-gray-700">
            <PiForkKnife className="text-6xl text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-500 dark:text-gray-400 mb-2">نتیجه‌ای یافت نشد</h3>
            <p className="text-gray-400 dark:text-gray-500">لطفاً فیلترهای جستجو را تغییر دهید</p>
          </div>
        )}
      </div>

      {/* Enhanced CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px); 
          }
          50% { 
            transform: translateY(-10px); 
          }
        }

        @keyframes gradient-x {
          0%, 100% {
            background-size: 200% 200%;
            background-position: left center;
          }
          50% {
            background-position: right center;
          }
        }

        @keyframes grid-flow {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(50px);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
          background-size: 200% 200%;
        }

        .animate-grid-flow {
          animation: grid-flow 20s linear infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-float,
          .animate-gradient-x,
          .animate-grid-flow {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
};

export default RestaurantMenuPage;