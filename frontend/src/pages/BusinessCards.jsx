import React, { useState } from 'react';
import { 
  PiMagnifyingGlass, 
  PiSquaresFour, 
  PiList, 
  PiHeart, 
  PiEye, 
  PiCheckCircle,
  PiStar,
  PiDeviceMobile,
  PiDesktop,
  PiPalette,
  PiUser,
  PiBuilding,
  PiBriefcase,
  PiStethoscope,
  PiGraduationCap,
  PiPaintBrush,
  PiCamera,
  PiCar,
  PiHouse,
  PiSparkle,
  PiCrown,
  PiRocket
} from 'react-icons/pi';

const BusinessCards = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState([]);

  const categories = [
    { id: 'all', name: 'همه کارت‌ها', count: 36, color: 'from-blue-500 to-cyan-500', icon: <PiUser className="text-lg" /> },
    { id: 'business', name: 'کسب‌وکار', count: 8, color: 'from-green-500 to-emerald-500', icon: <PiBuilding className="text-lg" /> },
    { id: 'medical', name: 'پزشکی', count: 5, color: 'from-red-500 to-rose-500', icon: <PiStethoscope className="text-lg" /> },
    { id: 'education', name: 'آموزشی', count: 6, color: 'from-purple-500 to-pink-500', icon: <PiGraduationCap className="text-lg" /> },
    { id: 'creative', name: 'خلاقانه', count: 7, color: 'from-orange-500 to-amber-500', icon: <PiPaintBrush className="text-lg" /> },
    { id: 'photography', name: 'عکاسی', count: 4, color: 'from-indigo-500 to-blue-500', icon: <PiCamera className="text-lg" /> },
    { id: 'realestate', name: 'مشاور املاک', count: 3, color: 'from-teal-500 to-cyan-500', icon: <PiHouse className="text-lg" /> },
    { id: 'automotive', name: 'خودرو', count: 3, color: 'from-gray-600 to-gray-700', icon: <PiCar className="text-lg" /> }
  ];

  const businessCards = [
    {
      id: 1,
      name: 'کارت مدیرعامل',
      description: 'کارت ویزیت شیک و حرفه‌ای برای مدیران ارشد و مدیرعامل',
      category: 'business',
      price: 0,
      isPremium: false,
      rating: 4.9,
      likes: 156,
      views: 3245,
      image: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
      tags: ['مدیریت', 'حرفه‌ای', 'شرکتی'],
      responsive: true,
      features: ['طراحی لوکس', 'کد QR', 'شبکه‌های اجتماعی'],
      demoUrl: '#',
      color: 'from-blue-500 to-cyan-500',
      hasLiveDemo: true
    },
    {
      id: 2,
      name: 'کارت پزشک',
      description: 'کارت ویزیت تخصصی برای پزشکان با طراحی درمانگاهی',
      category: 'medical',
      price: 29000,
      isPremium: true,
      rating: 4.8,
      likes: 89,
      views: 1876,
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
      tags: ['پزشکی', 'تخصصی', 'درمانگاه'],
      responsive: true,
      features: ['نمایش تخصص', 'نوبت‌دهی', 'موقعیت مطب'],
      demoUrl: '#',
      color: 'from-green-500 to-emerald-500',
      hasLiveDemo: true
    },
    {
      id: 3,
      name: 'کارت استاد دانشگاه',
      description: 'کارت ویزیت آکادمیک برای اساتید و پژوهشگران',
      category: 'education',
      price: 0,
      isPremium: false,
      rating: 4.7,
      likes: 124,
      views: 2654,
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
      tags: ['آکادمیک', 'آموزشی', 'پژوهش'],
      responsive: true,
      features: ['رزومه آکادمیک', 'مقالات', 'اطلاعات تماس'],
      demoUrl: '#',
      color: 'from-purple-500 to-pink-500',
      hasLiveDemo: true
    },
    {
      id: 4,
      name: 'کارت طراح گرافیک',
      description: 'کارت ویزیت خلاقانه برای طراحان و هنرمندان',
      category: 'creative',
      price: 19000,
      isPremium: true,
      rating: 4.9,
      likes: 203,
      views: 3890,
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
      tags: ['خلاقانه', 'گرافیک', 'هنری'],
      responsive: true,
      features: ['گالری آثار', 'مهارت‌ها', 'نمونه کارها'],
      demoUrl: '#',
      color: 'from-orange-500 to-amber-500',
      hasLiveDemo: true
    },
    {
      id: 5,
      name: 'کارت عکاس',
      description: 'کارت ویزیت بصری برای عکاسان حرفه‌ای',
      category: 'photography',
      price: 25000,
      isPremium: true,
      rating: 4.8,
      likes: 167,
      views: 3120,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
      tags: ['عکاسی', 'بصری', 'حرفه‌ای'],
      responsive: true,
      features: ['گالری عکس', 'سبک عکاسی', 'تجهیزات'],
      demoUrl: '#',
      color: 'from-indigo-500 to-blue-500',
      hasLiveDemo: true
    },
    {
      id: 6,
      name: 'کارت مشاور املاک',
      description: 'کارت ویزیت تخصصی برای مشاورین املاک',
      category: 'realestate',
      price: 0,
      isPremium: false,
      rating: 4.6,
      likes: 98,
      views: 2341,
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
      tags: ['املاک', 'مشاور', 'ملکی'],
      responsive: true,
      features: ['لیست املاک', 'موقعیت‌ها', 'تماس مستقیم'],
      demoUrl: '#',
      color: 'from-teal-500 to-cyan-500',
      hasLiveDemo: true
    },
    {
      id: 7,
      name: 'کارت نمایندگی خودرو',
      description: 'کارت ویزیت برای نمایندگی‌های خودرو',
      category: 'automotive',
      price: 32000,
      isPremium: true,
      rating: 4.7,
      likes: 134,
      views: 2789,
      image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
      tags: ['خودرو', 'نمایندگی', 'فروش'],
      responsive: true,
      features: ['مدل‌های موجود', 'خدمات پس از فروش', 'فاینانس'],
      demoUrl: '#',
      color: 'from-gray-600 to-gray-700',
      hasLiveDemo: true
    },
    {
      id: 8,
      name: 'کارت وکیل',
      description: 'کارت ویزیت رسمی برای وکلای دادگستری',
      category: 'business',
      price: 28000,
      isPremium: true,
      rating: 4.9,
      likes: 178,
      views: 3456,
      image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
      tags: ['حقوقی', 'وکالت', 'قانون'],
      responsive: true,
      features: ['تخصص‌های حقوقی', 'پرونده‌ها', 'مشاوره'],
      demoUrl: '#',
      color: 'from-blue-600 to-purple-600',
      hasLiveDemo: true
    }
  ];

  const toggleFavorite = (cardId) => {
    setFavorites(prev => 
      prev.includes(cardId) 
        ? prev.filter(id => id !== cardId)
        : [...prev, cardId]
    );
  };

  const filteredCards = businessCards.filter(card => {
    const matchesCategory = selectedCategory === 'all' || card.category === selectedCategory;
    const matchesSearch = card.name.includes(searchTerm) || 
                         card.description.includes(searchTerm) ||
                         card.tags.some(tag => tag.includes(searchTerm));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-300 rounded-full blur-3xl opacity-20 floating"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-300 rounded-full blur-3xl opacity-20 floating" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-300 rounded-full blur-3xl opacity-20 animate-pulse"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="pt-32 pb-8">
          {/* Enhanced Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 rtl:space-x-reverse bg-white/80 backdrop-blur-sm rounded-2xl px-4 py-2 mb-6 shadow-xl border border-white/20">
              <PiSparkle className="text-yellow-500 text-lg" />
              <span className="text-sm font-bold text-gray-700">+۳۶ قالب کارت ویزیت حرفه‌ای</span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent mb-6">
              کارت ویزیت دیجیتال
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              کارت ویزیت <span className="font-bold text-purple-600">دیجیتال و هوشمند</span> برای هر کسب‌وکار. 
              طراحی‌های <span className="font-bold text-blue-600">حرفه‌ای و ریسپانسیو</span> برای همه مشاغل
            </p>
          </div>

          {/* Search and Filters */}
          <div className="glass-card rounded-3xl p-8 shadow-2xl border border-white/20 mb-12 backdrop-blur-xl">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-6">
              {/* Search */}
              <div className="flex-1 relative">
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <PiMagnifyingGlass className="text-xl" />
                </div>
                <input
                  type="text"
                  placeholder="جستجو در کارت‌ها (نام، توضیحات، تگ‌ها)..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full glass-effect rounded-2xl px-6 py-4 pr-12 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-lg"
                />
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center space-x-3 rtl:space-x-reverse bg-white/50 rounded-2xl p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-3 rounded-2xl transition-all duration-300 flex items-center space-x-2 rtl:space-x-reverse ${
                    viewMode === 'grid' 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105' 
                      : 'text-gray-600 hover:text-gray-800 hover:bg-white/80'
                  }`}
                >
                  <PiSquaresFour className="text-xl" />
                  <span className="font-medium">گرید</span>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-3 rounded-2xl transition-all duration-300 flex items-center space-x-2 rtl:space-x-reverse ${
                    viewMode === 'list' 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105' 
                      : 'text-gray-600 hover:text-gray-800 hover:bg-white/80'
                  }`}
                >
                  <PiList className="text-xl" />
                  <span className="font-medium">لیست</span>
                </button>
              </div>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`group relative px-6 py-3 rounded-2xl font-bold transition-all duration-300 hover-lift overflow-hidden flex items-center space-x-2 rtl:space-x-reverse ${
                    selectedCategory === category.id
                      ? `bg-gradient-to-r ${category.color} text-white shadow-2xl transform scale-105`
                      : 'glass-effect text-gray-600 hover:text-gray-800'
                  }`}
                >
                  {category.icon}
                  <span>{category.name}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    selectedCategory === category.id 
                      ? 'bg-white/20 text-white' 
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {category.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Business Cards Grid/List */}
          <div className={
            viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8'
              : 'space-y-6'
          }>
            {filteredCards.map((card) => (
              <div
                key={card.id}
                className={`group glass-card rounded-3xl overflow-hidden shadow-2xl border border-white/20 hover-lift transition-all duration-500 backdrop-blur-xl ${
                  viewMode === 'list' ? 'flex' : ''
                }`}
              >
                {/* Card Image */}
                <div className={`relative overflow-hidden ${viewMode === 'list' ? 'w-80 flex-shrink-0' : ''}`}>
                  <img
                    src={card.image}
                    alt={card.name}
                    className={`w-full transition-transform duration-700 group-hover:scale-110 ${
                      viewMode === 'list' ? 'h-64' : 'h-56'
                    } object-cover cursor-pointer`}
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-between p-6">
                    <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                      <button className="bg-white/90 backdrop-blur-sm text-blue-600 px-4 py-2 rounded-2xl font-bold flex items-center space-x-2 rtl:space-x-reverse hover:bg-white transition-all duration-300">
                        <PiEye className="text-xl" />
                        <span>پیش‌نمایش زنده</span>
                      </button>
                    </div>
                  </div>
                  
                  {/* Live Demo Badge */}
                  {card.hasLiveDemo && (
                    <div className="absolute top-4 left-4 transform -rotate-6">
                      <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-2xl font-black shadow-2xl flex items-center space-x-2 rtl:space-x-reverse">
                        <PiSparkle className="text-white" />
                        <span>دموی زنده</span>
                      </div>
                    </div>
                  )}

                  {/* Premium Badge */}
                  {card.isPremium && (
                    <div className="absolute top-4 right-4 transform rotate-6">
                      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-2xl font-black shadow-2xl flex items-center space-x-2 rtl:space-x-reverse">
                        <PiCrown className="text-white" />
                        <span>پرمیوم</span>
                      </div>
                    </div>
                  )}

                  {/* Favorite Button */}
                  <button
                    onClick={() => toggleFavorite(card.id)}
                    className="absolute top-20 right-4 w-10 h-10 glass-effect rounded-2xl flex items-center justify-center transition-all duration-300 hover-lift hover:scale-110 shadow-lg"
                  >
                    <PiHeart
                      className={`text-lg transition-all duration-300 ${
                        favorites.includes(card.id)
                          ? 'text-red-500 fill-current transform scale-110'
                          : 'text-gray-400 group-hover:text-red-400'
                      }`}
                    />
                  </button>
                </div>

                {/* Card Content */}
                <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-black text-gray-800 text-xl mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300">
                        {card.name}
                      </h3>
                      <p className="text-gray-600 leading-relaxed line-clamp-2">{card.description}</p>
                    </div>
                    <div className="text-left ml-4">
                      <div className={`text-2xl font-black transition-all duration-300 ${
                        card.price === 0 
                          ? 'text-green-600 group-hover:text-green-500' 
                          : 'text-orange-600 group-hover:text-orange-500'
                      }`}>
                        {card.price === 0 ? 'رایگان' : `${card.price.toLocaleString()}`}
                      </div>
                      {card.price > 0 && (
                        <div className="text-gray-500 text-sm">تومان</div>
                      )}
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {card.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 px-3 py-1 rounded-2xl text-sm font-medium border border-blue-200 transition-all duration-300 hover:scale-105 hover:shadow-md"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Features */}
                  <div className="space-y-3 mb-6">
                    {card.features.slice(0, 2).map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3 rtl:space-x-reverse text-gray-700 group/feature">
                        <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <PiCheckCircle className="text-white text-sm" />
                        </div>
                        <span className="text-sm font-medium group-hover/feature:text-gray-800 transition-colors duration-300">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Stats and Actions */}
                  <div className="flex items-center justify-between pt-5 border-t border-gray-200/50">
                    <div className="flex items-center space-x-6 rtl:space-x-reverse text-sm">
                      <div className="flex items-center space-x-2 rtl:space-x-reverse text-amber-600 bg-amber-50 px-3 py-1 rounded-2xl">
                        <PiStar className="fill-current" />
                        <span className="font-bold">{card.rating}</span>
                      </div>
                      <div className="flex items-center space-x-2 rtl:space-x-reverse text-gray-500">
                        <PiHeart className={favorites.includes(card.id) ? "text-red-500 fill-current" : ""} />
                        <span>{card.likes}</span>
                      </div>
                      <div className="flex items-center space-x-2 rtl:space-x-reverse text-gray-500">
                        <PiEye />
                        <span>{card.views.toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                      <button className="glass-effect text-gray-700 hover:text-blue-600 px-4 py-2 rounded-2xl font-bold transition-all duration-300 hover-lift flex items-center space-x-2 rtl:space-x-reverse hover:shadow-lg">
                        <PiEye className="text-lg" />
                        <span>پیش‌نمایش</span>
                      </button>
                      <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-5 py-2 rounded-2xl font-bold transition-all duration-300 hover-lift shadow-2xl hover:shadow-blue-500/25 flex items-center space-x-2 rtl:space-x-reverse group/select">
                        <PiRocket className="text-lg group-hover/select:transform group-hover/select:rotate-12 transition-transform duration-300" />
                        <span>انتخاب قالب</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredCards.length === 0 && (
            <div className="text-center py-24">
              <div className="w-32 h-32 bg-gradient-to-r from-gray-400 to-gray-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl">
                <PiBriefcase className="text-white text-4xl" />
              </div>
              <h3 className="text-3xl font-black text-gray-800 mb-4">کارتی یافت نشد</h3>
              <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
                متأسفانه هیچ کارتی با معیارهای جستجوی شما مطابقت ندارد. می‌توانید فیلترها را تغییر دهید یا عبارت جستجوی خود را اصلاح کنید.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-bold transition-all duration-300 hover-lift shadow-2xl text-lg"
              >
                مشاهده همه کارت‌ها
              </button>
            </div>
          )}

          {/* Load More */}
          {filteredCards.length > 0 && (
            <div className="text-center mt-16">
              <button className="group glass-effect text-gray-700 hover:text-blue-600 px-8 py-4 rounded-2xl font-bold transition-all duration-300 hover-lift border border-white/20 hover:border-blue-200 text-lg">
                <span className="flex items-center space-x-2 rtl:space-x-reverse">
                  <span>بارگذاری کارت‌های بیشتر</span>
                  <PiSparkle className="text-blue-500 transform group-hover:rotate-180 transition-transform duration-500" />
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BusinessCards;