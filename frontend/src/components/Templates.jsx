import React, { useState, useEffect, useRef } from 'react';
import { 
  PiForkKnife, 
  PiUserCircle, 
  PiFileText, 
  PiBuilding, 
  PiArrowLeft, 
  PiStar, 
  PiCrown,
  PiMagicWand,
  PiPaintBrush,
  PiShootingStar,
  PiCheckCircle,
  PiRocket,
  PiSparkle,
  PiHeart,
  PiHeartFill,
  PiEye,
  PiDownload,
  PiShoppingCart,
  PiTrendUp,
  PiShieldCheck,
  PiClock,
  PiUsers,
  PiLightning,
  PiMedal,
  PiConfetti,
  PiGift,
  PiCaretRight,
  PiCaretLeft,
  PiPlay,
  PiPause
} from 'react-icons/pi';

const Templates = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [likedTemplates, setLikedTemplates] = useState({});
  const [activeCategory, setActiveCategory] = useState('all');
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % featuredTemplates.length);
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const categories = [
    { id: 'all', name: 'همه قالب‌ها', count: 12, icon: <PiSparkle /> },
    { id: 'restaurant', name: 'رستوران‌ها', count: 4, icon: <PiForkKnife /> },
    { id: 'business', name: 'کسب‌وکار', count: 3, icon: <PiBuilding /> },
    { id: 'personal', name: 'شخصی', count: 3, icon: <PiUserCircle /> },
    { id: 'creative', name: 'خلاقانه', count: 2, icon: <PiMagicWand /> }
  ];

  const templates = [
    {
      id: 'restaurant-menu',
      title: 'منوی رستوران لوکس',
      description: 'منوی دیجیتال تعاملی با قابلیت سفارش آنلاین، دسته‌بندی محصولات و سیستم مدیریت موجودی پیشرفته',
      icon: <PiForkKnife className="text-2xl" />,
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      features: ['سفارش آنلاین', 'دسته‌بندی محصولات', 'مدیریت موجودی', 'گزارش‌گیری پیشرفته', 'پشتیبانی ۲۴/۷'],
      color: 'from-orange-500 to-red-500',
      gradient: 'bg-gradient-to-br from-orange-500 to-red-500',
      bgGradient: 'bg-gradient-to-br from-orange-50 via-red-50 to-white',
      category: 'restaurant',
      popular: true,
      badge: 'پرطرفدار',
      price: '۱,۲۰۰,۰۰۰ تومان',
      oldPrice: '۱,۵۰۰,۰۰۰ تومان',
      rating: 4.9,
      reviews: 127,
      sales: 89
    },
    {
      id: 'doctor-card',
      title: 'کارت مطب پزشکان',
      description: 'کارت دیجیتال پزشکان با قابلیت نوبت‌گیری آنلاین، نمایش تخصص‌ها و مسیریابی هوشمند',
      icon: <PiUserCircle className="text-2xl" />,
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      features: ['نوبت‌گیری آنلاین', 'نمایش تخصص‌ها', 'مسیریابی هوشمند', 'تماس مستقیم', 'نمایش نظرات'],
      color: 'from-green-500 to-teal-500',
      gradient: 'bg-gradient-to-br from-green-500 to-teal-500',
      bgGradient: 'bg-gradient-to-br from-green-50 via-teal-50 to-white',
      category: 'business',
      popular: false,
      badge: 'جدید',
      price: '۹۰۰,۰۰۰ تومان',
      oldPrice: '۱,۲۰۰,۰۰۰ تومان',
      rating: 4.7,
      reviews: 89,
      sales: 64
    },
    {
      id: 'digital-resume',
      title: 'رزومه دیجیتال حرفه‌ای',
      description: 'رزومه حرفه‌ای با قابلیت اشتراک‌گذاری آسان، نمایش مهارت‌ها و پورتفولیو تعاملی',
      icon: <PiFileText className="text-2xl" />,
      image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2072&q=80',
      features: ['اشتراک‌گذاری آسان', 'نمایش مهارت‌ها', 'لینک مستقیم', 'طراحی حرفه‌ای', 'پورتفولیو تعاملی'],
      color: 'from-blue-500 to-cyan-500',
      gradient: 'bg-gradient-to-br from-blue-500 to-cyan-500',
      bgGradient: 'bg-gradient-to-br from-blue-50 via-cyan-50 to-white',
      category: 'personal',
      popular: true,
      badge: 'پرطرفدار',
      price: '۷۵۰,۰۰۰ تومان',
      oldPrice: '۹۰۰,۰۰۰ تومان',
      rating: 4.8,
      reviews: 156,
      sales: 112
    },
    {
      id: 'business-card',
      title: 'کارت کسب‌وکار پیشرفته',
      description: 'کارت ویزیت دیجیتال با امکانات پیشرفته، قابلیت ذخیره مخاطب و یکپارچگی با شبکه‌های اجتماعی',
      icon: <PiBuilding className="text-2xl" />,
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2015&q=80',
      features: ['ذخیره مخاطب', 'شبکه‌های اجتماعی', 'موقعیت مکانی', 'لینک‌های سریع', 'آنالیز بازدید'],
      color: 'from-purple-500 to-pink-500',
      gradient: 'bg-gradient-to-br from-purple-500 to-pink-500',
      bgGradient: 'bg-gradient-to-br from-purple-50 via-pink-50 to-white',
      category: 'business',
      popular: false,
      badge: 'اقتصادی',
      price: '۶۰۰,۰۰۰ تومان',
      oldPrice: '۸۰۰,۰۰۰ تومان',
      rating: 4.6,
      reviews: 78,
      sales: 45
    }
  ];

  const featuredTemplates = templates.slice(0, 3);

  const stats = [
    { icon: <PiDownload className="text-2xl" />, value: '۵۰۰+', label: 'قالب فعال', color: 'text-blue-500' },
    { icon: <PiUsers className="text-2xl" />, value: '۱۰,۰۰۰+', label: 'کاربر راضی', color: 'text-green-500' },
    { icon: <PiStar className="text-2xl" />, value: '۴.۹/۵', label: 'امتیاز', color: 'text-yellow-500' },
    { icon: <PiTrendUp className="text-2xl" />, value: '۹۸٪', label: 'رضایت', color: 'text-purple-500' }
  ];

  const handleTemplateClick = (templateId) => {
    // Navigate to template detail page
    console.log('Navigating to template:', templateId);
  };

  const handleLike = (templateId) => {
    setLikedTemplates(prev => ({
      ...prev,
      [templateId]: !prev[templateId]
    }));
  };

  const handleCustomDesign = () => {
    // Navigate to custom design page
    console.log('Custom design requested');
  };

  const filteredTemplates = activeCategory === 'all' 
    ? templates 
    : templates.filter(template => template.category === activeCategory);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className={index < rating ? "text-yellow-400" : "text-gray-300"}>
        {index < rating ? <PiStar className="text-sm" /> : <PiStar className="text-sm" />}
      </span>
    ));
  };

  return (
    <section ref={sectionRef} id="templates" className="relative min-h-screen py-20 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 overflow-hidden">
      
      {/* Advanced Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float-slow"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float-slower"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-pulse"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25px 25px, #666 1px, transparent 0)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-20 opacity-15 animate-float">
        <PiSparkle className="text-5xl text-blue-500" />
      </div>
      <div className="absolute bottom-32 right-32 opacity-15 animate-float-delayed">
        <PiShootingStar className="text-4xl text-purple-500" />
      </div>
      <div className="absolute top-1/3 right-20 opacity-10 animate-float-slow">
        <PiConfetti className="text-3xl text-yellow-500" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-20">
          <div className={`inline-flex items-center gap-3 bg-white/90 backdrop-blur-xl rounded-3xl px-8 py-4 mb-8 shadow-2xl border border-white/60 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-95'}`}>
            <div className="relative">
              <PiMagicWand className="text-purple-500 text-xl animate-pulse" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
            </div>
            <span className="text-base font-black text-gray-800 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              گالری قالب‌ها
            </span>
            <PiCrown className="text-yellow-500 animate-spin-slow" />
          </div>
          
          <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-6 leading-tight transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient">
              دنیایی از
            </span>
            <br />
            قالب‌های حرفه‌ای
          </h1>
          
          <p className={`text-xl sm:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-medium transition-all duration-1000 delay-400 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            از بین <span className="font-black text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">صدها قالب آماده</span> انتخاب کنید یا کارت دیجیتال خود را از صفر طراحی کنید
          </p>
        </div>

        {/* Stats Bar */}
        <div className={`grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16 transition-all duration-1000 delay-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {stats.map((stat, index) => (
            <div key={index} className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-white/40">
              <div className={`${stat.color} mb-3 flex justify-center`}>
                {stat.icon}
              </div>
              <div className="text-2xl font-black text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm font-medium text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Categories Filter */}
        <div className={`flex flex-wrap justify-center gap-4 mb-12 transition-all duration-1000 delay-800 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`group flex items-center gap-3 px-6 py-4 rounded-2xl font-bold transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-2xl'
                  : 'bg-white/80 backdrop-blur-sm text-gray-700 shadow-lg hover:shadow-xl hover:scale-105'
              }`}
            >
              <span className={activeCategory === category.id ? 'text-white' : 'text-gray-500 group-hover:text-blue-600'}>
                {category.icon}
              </span>
              <span>{category.name}</span>
              <span className={`text-sm px-2 py-1 rounded-full ${
                activeCategory === category.id
                  ? 'bg-white/20 text-white'
                  : 'bg-gray-100 text-gray-600 group-hover:bg-blue-100 group-hover:text-blue-600'
              }`}>
                {category.count}
              </span>
            </button>
          ))}
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-20">
          {filteredTemplates.map((template, index) => (
            <div
              key={template.id}
              className="group relative"
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Main Card */}
              <div className={`${template.bgGradient} rounded-4xl overflow-hidden border border-white/60 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 backdrop-blur-sm h-full`}>
                
                {/* Image Section */}
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={template.image} 
                    alt={template.title}
                    className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Badges */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2">
                    <span className={`${
                      template.popular 
                        ? 'bg-gradient-to-r from-yellow-400 to-orange-400 text-white' 
                        : 'bg-gradient-to-r from-gray-600 to-gray-700 text-white'
                    } px-4 py-2 rounded-2xl text-sm font-bold shadow-lg flex items-center gap-2 backdrop-blur-sm`}>
                      {template.popular && <PiStar className="text-sm" />}
                      {template.badge}
                    </span>
                    
                    {/* Discount Badge */}
                    {template.oldPrice && (
                      <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-xl text-xs font-bold shadow-lg backdrop-blur-sm">
                        {Math.round((1 - parseInt(template.price.replace(/[^0-9]/g, '')) / parseInt(template.oldPrice.replace(/[^0-9]/g, ''))) * 100)}% تخفیف
                      </span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <button 
                      onClick={() => handleLike(template.id)}
                      className={`w-10 h-10 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 ${
                        likedTemplates[template.id] ? 'text-red-500' : 'text-gray-600 hover:text-red-500'
                      }`}
                    >
                      {likedTemplates[template.id] ? <PiHeartFill className="text-lg" /> : <PiHeart className="text-lg" />}
                    </button>
                    
                    <button className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center text-gray-600 hover:text-blue-600 transition-all duration-300 hover:scale-110">
                      <PiEye className="text-lg" />
                    </button>
                  </div>

                  {/* Template Icon */}
                  <div className={`absolute bottom-4 left-4 w-14 h-14 ${template.gradient} rounded-2xl flex items-center justify-center text-white shadow-2xl transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12`}>
                    {template.icon}
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-2xl font-black text-gray-800 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                      {template.title}
                    </h3>
                    
                    {/* Rating */}
                    <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-2xl px-3 py-1 border border-white/40">
                      <div className="flex items-center gap-1">
                        {renderStars(template.rating)}
                      </div>
                      <span className="text-sm font-bold text-gray-700">{template.rating}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 leading-relaxed mb-6 text-justify">
                    {template.description}
                  </p>

                  {/* Features Grid */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {template.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-3 text-gray-700">
                        <div className={`w-8 h-8 ${template.gradient} rounded-xl flex items-center justify-center text-white shadow-lg`}>
                          <PiCheckCircle className="text-sm" />
                        </div>
                        <span className="text-sm font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Price and Stats */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl font-black text-gray-800">{template.price}</div>
                      {template.oldPrice && (
                        <div className="text-lg text-gray-400 line-through">{template.oldPrice}</div>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <PiUsers className="text-gray-400" />
                        <span>{template.sales} فروش</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <PiStar className="text-yellow-400" />
                        <span>{template.reviews} نظر</span>
                      </div>
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex gap-3">
                    <button 
                      onClick={() => handleTemplateClick(template.id)}
                      className={`flex-1 ${template.gradient} hover:shadow-2xl text-white py-4 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-3 group/btn`}
                    >
                      <span>مشاهده و سفارش</span>
                      <PiArrowLeft className="transform transition-transform duration-300 group-hover/btn:-translate-x-1" />
                    </button>
                    
                    <button className="w-14 bg-white/80 backdrop-blur-sm hover:bg-white border border-gray-200 text-gray-700 rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-105 hover:shadow-lg">
                      <PiShoppingCart className="text-xl" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Hover Glow Effect */}
              <div className={`absolute -inset-4 bg-gradient-to-r ${template.color} rounded-4xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10`}></div>
            </div>
          ))}
        </div>

        {/* Custom Design CTA */}
        <div className="text-center">
          <div className="relative bg-gradient-to-r from-gray-900 via-purple-900 to-blue-900 rounded-4xl p-12 text-white shadow-3xl max-w-6xl mx-auto overflow-hidden">
            
            {/* Animated Background */}
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 animate-gradient-slow"></div>
              <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500/5 rounded-full -translate-x-1/2 -translate-y-1/2 animate-float-slow"></div>
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full translate-x-1/2 translate-y-1/2 animate-float-slower"></div>
            </div>

            <div className="relative z-10">
              <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl">
                <PiPaintBrush className="text-3xl text-white" />
              </div>
              
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-6 leading-tight">
                طراحی <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">سفارشی</span> می‌خواهید؟
              </h3>
              
              <p className="text-gray-300 text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
                تیم طراحی حرفه‌ای ما آماده ایجاد کارت دیجیتال کاملاً سفارشی متناسب با برند و نیازهای خاص شماست
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button 
                  onClick={handleCustomDesign}
                  className="group bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-gray-900 px-10 py-5 rounded-2xl font-black transition-all duration-300 hover:scale-105 shadow-2xl hover:shadow-3xl flex items-center gap-3 text-lg min-w-[250px]"
                >
                  <PiRocket className="text-xl group-hover:animate-bounce" />
                  <span>درخواست طراحی سفارشی</span>
                  <PiSparkle className="text-xl group-hover:animate-spin" />
                </button>
                
                <button className="group bg-white/10 backdrop-blur-lg hover:bg-white/20 text-white px-8 py-5 rounded-2xl font-bold transition-all duration-300 hover:scale-105 border border-white/20 flex items-center gap-3 text-lg min-w-[200px]">
                  <PiGift className="text-xl group-hover:scale-110 transition-transform duration-300" />
                  <span>مشاهده نمونه‌کارها</span>
                </button>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap justify-center gap-6 mt-8 text-gray-400">
                <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-2xl backdrop-blur-sm">
                  <PiShieldCheck className="text-lg" />
                  <span className="text-sm font-medium">ضمانت بازگشت وجه ۳۰ روزه</span>
                </div>
                <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-2xl backdrop-blur-sm">
                  <PiMedal className="text-lg" />
                  <span className="text-sm font-medium">طراحی توسط متخصصان</span>
                </div>
                <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-2xl backdrop-blur-sm">
                  <PiLightning className="text-lg" />
                  <span className="text-sm font-medium">تحویل ۳-۵ روز کاری</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-10px) scale(1.05); }
        }
        @keyframes float-slower {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-5deg); }
        }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes gradient-slow {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(180deg); }
        }
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        .animate-float-slower {
          animation: float-slower 10s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 7s ease-in-out infinite;
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 4s ease infinite;
        }
        .animate-gradient-slow {
          animation: gradient-slow 20s linear infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
        .rounded-4xl {
          border-radius: 2.5rem;
        }
        .shadow-3xl {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }
      `}</style>
    </section>
  );
};

export default Templates;