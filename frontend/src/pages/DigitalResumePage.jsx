import React, { useState, useMemo } from 'react';
import { PiFileText, PiArrowLeft, PiStar, PiBriefcase, PiGraduationCap, PiHeart } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';
import AdvancedSearchFilter from '../components/AdvancedSearchFilter';

const DigitalResumePage = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    search: '',
    industry: '',
    experienceLevel: '',
    templateStyle: '',
    sort: 'newest'
  });

  const resumeTemplates = [
    {
      id: 1,
      title: 'رزومه مدرن توسعه‌دهنده',
      description: 'قالب حرفه‌ای برای توسعه‌دهندگان و برنامه‌نویسان',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      industry: 'فناوری اطلاعات',
      experienceLevel: 'ارشد',
      templateStyle: 'مدرن',
      rating: 4.9,
      features: ['نمایش پروژه‌ها', 'مهارت‌های فنی', 'گیت‌هاب', 'لینک دمو'],
      popular: true,
      price: 'رایگان'
    },
    {
      id: 2,
      title: 'رزومه خلاقانه طراحی',
      description: 'قالب خلاقانه برای طراحان و هنرمندان',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
      industry: 'طراحی',
      experienceLevel: 'میانی',
      templateStyle: 'خلاقانه',
      rating: 4.7,
      features: ['گالری نمونه‌کار', 'نمایش خلاقیت', 'رنگ‌بندی متنوع', 'پورتفولیو'],
      popular: false,
      price: 'حرفه‌ای'
    },
    {
      id: 3,
      title: 'رزومه کلاسیک مدیریت',
      description: 'قالب رسمی و کلاسیک برای موقعیت‌های مدیریتی',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      industry: 'مدیریت',
      experienceLevel: 'ارشد',
      templateStyle: 'کلاسیک',
      rating: 4.8,
      features: ['نمایش تجربیات', 'مدارک تحصیلی', 'توصیه‌نامه‌ها', 'تماس مستقیم'],
      popular: true,
      price: 'اقتصادی'
    },
    {
      id: 4,
      title: 'رزومه مینیمال مارکتینگ',
      description: 'قالب ساده و مؤثر برای متخصصان مارکتینگ',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      industry: 'مارکتینگ',
      experienceLevel: 'تازه‌کار',
      templateStyle: 'مینیمال',
      rating: 4.6,
      features: ['آمار و ارقام', 'نمایش کمپین‌ها', 'تحلیل نتایج', 'لینک‌های رسانه‌ای'],
      popular: false,
      price: 'رایگان'
    },
    {
      id: 5,
      title: 'رزومه آکادمیک پژوهشگر',
      description: 'قالب تخصصی برای پژوهشگران و اساتید دانشگاه',
      image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      industry: 'آکادمیک',
      experienceLevel: 'ارشد',
      templateStyle: 'آکادمیک',
      rating: 4.9,
      features: ['لیست publications', 'پروژه‌های تحقیقاتی', 'همایش‌ها', 'مدارک علمی'],
      popular: true,
      price: 'حرفه‌ای'
    },
    {
      id: 6,
      title: 'رزومه استارتاپی',
      description: 'قالب پویا و مدرن برای کارآفرینان و استارتاپ‌ها',
      image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      industry: 'استارتاپ',
      experienceLevel: 'میانی',
      templateStyle: 'مدرن',
      rating: 4.5,
      features: ['نمایش استارتاپ‌ها', 'مهارت‌های کارآفرینی', 'فاندینگ', 'تیم‌سازی'],
      popular: false,
      price: 'اقتصادی'
    }
  ];

  const searchFields = [
    {
      name: 'industry',
      label: 'صنعت',
      type: 'select',
      options: [
        { value: 'فناوری اطلاعات', label: 'فناوری اطلاعات' },
        { value: 'طراحی', label: 'طراحی' },
        { value: 'مدیریت', label: 'مدیریت' },
        { value: 'مارکتینگ', label: 'مارکتینگ' },
        { value: 'آکادمیک', label: 'آکادمیک' },
        { value: 'استارتاپ', label: 'استارتاپ' }
      ]
    },
    {
      name: 'experienceLevel',
      label: 'سطح تجربه',
      type: 'select',
      options: [
        { value: 'تازه‌کار', label: 'تازه‌کار' },
        { value: 'میانی', label: 'میانی' },
        { value: 'ارشد', label: 'ارشد' }
      ]
    },
    {
      name: 'templateStyle',
      label: 'سبک قالب',
      type: 'select',
      options: [
        { value: 'مدرن', label: 'مدرن' },
        { value: 'خلاقانه', label: 'خلاقانه' },
        { value: 'کلاسیک', label: 'کلاسیک' },
        { value: 'مینیمال', label: 'مینیمال' },
        { value: 'آکادمیک', label: 'آکادمیک' }
      ]
    }
  ];

  const sortOptions = [
    { value: 'newest', label: 'جدیدترین' },
    { value: 'popular', label: 'محبوب‌ترین' },
    { value: 'rating', label: 'بالاترین امتیاز' },
    { value: 'experience', label: 'بیشترین تجربه' }
  ];

  const filteredTemplates = useMemo(() => {
    return resumeTemplates.filter(template => {
      const matchesSearch = !filters.search || 
        template.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        template.description.toLowerCase().includes(filters.search.toLowerCase());
      
      const matchesIndustry = !filters.industry || template.industry === filters.industry;
      const matchesExperience = !filters.experienceLevel || template.experienceLevel === filters.experienceLevel;
      const matchesStyle = !filters.templateStyle || template.templateStyle === filters.templateStyle;

      return matchesSearch && matchesIndustry && matchesExperience && matchesStyle;
    });
  }, [filters, resumeTemplates]);

  const handleFilterChange = (key, value) => {
    if (key === 'clear') {
      setFilters({
        search: '',
        industry: '',
        experienceLevel: '',
        templateStyle: '',
        sort: 'newest'
      });
    } else {
      setFilters(prev => ({ ...prev, [key]: value }));
    }
  };

  const getPriceColor = (price) => {
    switch (price) {
      case 'رایگان': return 'from-green-500 to-teal-500';
      case 'اقتصادی': return 'from-blue-500 to-cyan-500';
      case 'حرفه‌ای': return 'from-purple-500 to-pink-500';
      default: return 'from-gray-500 to-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
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
                <PiFileText className="text-blue-500" />
                <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  قالب‌های رزومه دیجیتال
                </span>
              </h1>
              <p className="text-gray-600 mt-2">رزومه حرفه‌ای خود را با بهترین قالب‌ها بسازید</p>
            </div>

            <div className="w-24"></div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                
                {/* Badges */}
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  {template.popular && (
                    <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 py-1 rounded-2xl text-sm font-bold flex items-center gap-1">
                      <PiStar className="text-sm" />
                      پرطرفدار
                    </span>
                  )}
                  <span className={`bg-gradient-to-r ${getPriceColor(template.price)} text-white px-3 py-1 rounded-2xl text-sm font-bold`}>
                    {template.price}
                  </span>
                </div>

                {/* Favorite Button */}
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
                </div>

                <p className="text-gray-600 mb-4 leading-relaxed">{template.description}</p>

                {/* Details */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <PiStar className="text-yellow-500" />
                    <span className="font-bold">{template.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <PiBriefcase className="text-blue-500" />
                    <span>{template.experienceLevel}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <PiGraduationCap className="text-green-500" />
                    <span>{template.industry}</span>
                  </div>
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {template.features.map((feature, index) => (
                    <span key={index} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-xl text-xs font-bold">
                      {feature}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white py-3 rounded-2xl font-bold transition-all duration-300 hover:scale-105 shadow-lg">
                  استفاده از این قالب
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredTemplates.length === 0 && (
          <div className="text-center py-16">
            <PiFileText className="text-6xl text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-500 mb-2">نتیجه‌ای یافت نشد</h3>
            <p className="text-gray-400">لطفاً فیلترهای جستجو را تغییر دهید</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DigitalResumePage;