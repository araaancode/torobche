// pages/RestaurantMenuPage.js
import React, { useState, useMemo } from 'react';
import { PiForkKnife, PiArrowLeft, PiStar, PiClock, PiMapPin, PiHeart } from 'react-icons/pi';
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
      popular: true
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
      popular: false
    },
    // ... اضافه کردن templates بیشتر
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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-lg border-b border-white/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 font-bold text-lg"
            >
              <PiArrowLeft />
              بازگشت
            </button>
            
            <div className="text-center">
              <h1 className="text-3xl font-black text-gray-800 flex items-center gap-3 justify-center">
                <PiForkKnife className="text-orange-500" />
                <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  قالب‌های منوی رستوران
                </span>
              </h1>
              <p className="text-gray-600 mt-2">انتخاب از بین بهترین قالب‌های منوی دیجیتال</p>
            </div>

            <div className="w-24"></div> {/* For balance */}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search & Filter */}
        <AdvancedSearchFilter
          filters={filters}
          onFilterChange={handleFilterChange}
          searchFields={searchFields}
          sortOptions={sortOptions}
        />

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            <span className="font-bold text-gray-800">{filteredTemplates.length}</span> قالب پیدا شد
          </p>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map(template => (
            <div key={template.id} className="bg-white rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2">
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={template.image} 
                  alt={template.title}
                  className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4">
                  {template.popular && (
                    <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 py-1 rounded-2xl text-sm font-bold flex items-center gap-1">
                      <PiStar className="text-sm" />
                      پرطرفدار
                    </span>
                  )}
                </div>
                <div className="absolute top-4 left-4">
                  <button className="bg-white/90 backdrop-blur-sm w-10 h-10 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300">
                    <PiHeart className="text-red-500 text-xl" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-black text-gray-800">{template.title}</h3>
                  <span className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-3 py-1 rounded-2xl text-sm font-bold">
                    {template.price}
                  </span>
                </div>

                <p className="text-gray-600 mb-4 leading-relaxed">{template.description}</p>

                {/* Details */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <PiStar className="text-yellow-500" />
                    <span className="font-bold">{template.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <PiClock className="text-blue-500" />
                    <span>{template.deliveryTime}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <PiMapPin className="text-red-500" />
                    <span>{template.location}</span>
                  </div>
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {template.features.map((feature, index) => (
                    <span key={index} className="bg-orange-100 text-orange-700 px-3 py-1 rounded-xl text-xs font-bold">
                      {feature}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-3 rounded-2xl font-bold transition-all duration-300 hover:scale-105 shadow-lg">
                  استفاده از این قالب
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredTemplates.length === 0 && (
          <div className="text-center py-16">
            <PiForkKnife className="text-6xl text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-500 mb-2">نتیجه‌ای یافت نشد</h3>
            <p className="text-gray-400">لطفاً فیلترهای جستجو را تغییر دهید</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantMenuPage;