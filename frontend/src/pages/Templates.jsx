import React, { useState } from 'react';
import {
  PiMagnifyingGlass,
  PiSquaresFour,
  PiList,
  PiHeart,
  PiEye,
  PiCheckCircle,
  PiStar,
  PiPhoneCall,
  PiDesktop,
  PiPalette,
  PiX,
  PiPlay,
  PiArrowLeft,
  PiArrowRight,
  PiSparkle,
  PiCrown,
  PiRocket
} from 'react-icons/pi';
import LiveDemoModal from '../components/LiveDemoModal';

const Templates = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [previewTemplate, setPreviewTemplate] = useState(null);
  const [currentPreviewImage, setCurrentPreviewImage] = useState(0);
  const [liveDemoTemplate, setLiveDemoTemplate] = useState(null);

  const categories = [
    { id: 'all', name: 'همه قالب‌ها', count: 24, color: 'from-blue-500 to-cyan-500' },
    { id: 'restaurant', name: 'رستوران', count: 8, color: 'from-green-500 to-emerald-500' },
    { id: 'cafe', name: 'کافه', count: 5, color: 'from-orange-500 to-amber-500' },
    { id: 'fastfood', name: 'فست فود', count: 4, color: 'from-red-500 to-rose-500' },
    { id: 'bakery', name: 'قنادی', count: 3, color: 'from-purple-500 to-pink-500' },
    { id: 'delivery', name: 'تحویل اکسپرس', count: 4, color: 'from-indigo-500 to-blue-500' }
  ];

  const templates = [
    {
      id: 1,
      name: 'مینیمال رستوران',
      description: 'قالب ساده و مدرن برای رستوران‌های لوکس با طراحی شیک و کاربرپسند',
      category: 'restaurant',
      price: 0,
      isPremium: false,
      rating: 4.8,
      likes: 124,
      views: 2456,
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
      previewImages: [
        'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
      ],
      tags: ['مدرن', 'مینیمال', 'رستوران'],
      responsive: true,
      features: ['سفارشی‌سازی آسان', 'پشتیبانی موبایل', 'آماده استفاده'],
      demoUrl: 'https://restaurant-menu-demo.netlify.app',
      color: 'from-blue-500 to-cyan-500',
      hasLiveDemo: true
    },
    {
      id: 2,
      name: 'کافه دنج',
      description: 'قالب گرم و صمیمی برای کافه‌ها و coffee shop ها با فضای دلنشین',
      category: 'cafe',
      price: 29000,
      isPremium: true,
      rating: 4.9,
      likes: 89,
      views: 1876,
      image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
      previewImages: [
        'https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1445116572660-236099ec97a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
      ],
      tags: ['کافه', 'گرم', 'صمیمی'],
      responsive: true,
      features: ['منوی نوشیدنی', 'گالری تصاویر', 'سیستم رزرو'],
      demoUrl: 'https://cafe-menu-demo.netlify.app',
      color: 'from-amber-500 to-orange-500',
      hasLiveDemo: true
    },
    {
      id: 3,
      name: 'برگر مدرن',
      description: 'قالب پرانرژی و سریع برای فست فودها با طراحی پویا و جذاب',
      category: 'fastfood',
      price: 0,
      isPremium: false,
      rating: 4.7,
      likes: 156,
      views: 3124,
      image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
      previewImages: [
        'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1547584376-2eac41bb6d3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
      ],
      tags: ['فست فود', 'مدرن', 'پرسرعت'],
      responsive: true,
      features: ['سفارش آنلاین', 'تایمر آماده‌سازی', 'سیستم تخفیف'],
      demoUrl: 'https://fastfood-menu-demo.netlify.app',
      color: 'from-red-500 to-rose-500',
      hasLiveDemo: true
    },
    {
      id: 4,
      name: 'شیرینی سنتی',
      description: 'قالب سنتی و زیبا برای قنادی‌های ایرانی با طراحی اصیل',
      category: 'bakery',
      price: 19000,
      isPremium: true,
      rating: 4.6,
      likes: 67,
      views: 1432,
      image: 'https://images.unsplash.com/photo-1555507036-ab794f27d2e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
      previewImages: [
        'https://images.unsplash.com/photo-1555507036-ab794f27d2e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1488477181946-6428a0291777?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
      ],
      tags: ['سنتی', 'قنادی', 'زیبا'],
      responsive: true,
      features: ['گالری محصولات', 'سیستم سفارش', 'قالب سنتی'],
      demoUrl: 'https://bakery-menu-demo.netlify.app',
      color: 'from-purple-500 to-pink-500',
      hasLiveDemo: true
    },
    {
      id: 5,
      name: 'تحویل اکسپرس',
      description: 'قالب بهینه شده برای سرویس‌های تحویل غذا با سرعت بالا',
      category: 'delivery',
      price: 39000,
      isPremium: true,
      rating: 4.9,
      likes: 203,
      views: 4231,
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
      previewImages: [
        'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1565299585323-38174c13fae8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
      ],
      tags: ['تحویل', 'سریع', 'کاربرپسند'],
      responsive: true,
      features: ['پیگیری سفارش', 'موقعیت‌یابی', 'پرداخت آنلاین'],
      demoUrl: 'https://delivery-menu-demo.netlify.app',
      color: 'from-indigo-500 to-blue-500',
      hasLiveDemo: true
    },
    {
      id: 6,
      name: 'رستوران خانوادگی',
      description: 'قالب گرم و خانوادگی برای رستوران‌های محلی با فضای صمیمی',
      category: 'restaurant',
      price: 0,
      isPremium: false,
      rating: 4.5,
      likes: 98,
      views: 1987,
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
      previewImages: [
        'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1578474846511-04ba529f0b88?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
      ],
      tags: ['خانوادگی', 'گرم', 'محلی'],
      responsive: true,
      features: ['منوی کودک', 'رزرو میز', 'گالری محیط'],
      demoUrl: 'https://family-restaurant-demo.netlify.app',
      color: 'from-emerald-500 to-green-500',
      hasLiveDemo: true
    }
  ];

  const toggleFavorite = (templateId) => {
    setFavorites(prev =>
      prev.includes(templateId)
        ? prev.filter(id => id !== templateId)
        : [...prev, templateId]
    );
  };

  const openPreview = (template) => {
    setPreviewTemplate(template);
    setCurrentPreviewImage(0);
    document.body.style.overflow = 'hidden';
  };

  const closePreview = () => {
    setPreviewTemplate(null);
    document.body.style.overflow = 'auto';
  };

  const openLiveDemo = (template) => {
    setLiveDemoTemplate(template);
    document.body.style.overflow = 'hidden';
  };

  const closeLiveDemo = () => {
    setLiveDemoTemplate(null);
    document.body.style.overflow = 'auto';
  };

  const nextImage = () => {
    if (previewTemplate) {
      setCurrentPreviewImage((prev) =>
        prev === previewTemplate.previewImages.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (previewTemplate) {
      setCurrentPreviewImage((prev) =>
        prev === 0 ? previewTemplate.previewImages.length - 1 : prev - 1
      );
    }
  };

  const filteredTemplates = templates.filter(template => {
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    const matchesSearch = template.name.includes(searchTerm) ||
      template.description.includes(searchTerm) ||
      template.tags.some(tag => tag.includes(searchTerm));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-300 rounded-full blur-3xl opacity-20 floating"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-300 rounded-full blur-3xl opacity-20 floating" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-300 rounded-full blur-3xl opacity-20 animate-pulse"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="pt-32 pb-8">
          {/* Enhanced Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 rtl:space-x-reverse bg-white/80 backdrop-blur-sm rounded-2xl px-4 py-2 mb-6 shadow-xl border border-white/20">
              <PiSparkle className="text-yellow-500 text-lg" />
              <span className="text-sm font-bold text-gray-700">+۲۴ قالب حرفه‌ای با دموی زنده</span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent mb-6">
              گالری قالب‌ها
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              قالبی که <span className="font-bold text-purple-600">کسب‌وکار شما</span> را متحول می‌کند انتخاب کنید.
              <span className="font-bold text-green-600"> دموی زنده </span>همه قالب‌ها در دسترس است!
            </p>
          </div>

          {/* Rest of the Templates component remains the same... */}

          {/* Enhanced Templates Grid/List */}
          <div className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8'
              : 'space-y-6'
          }>
            {filteredTemplates.map((template) => (
              <div
                key={template.id}
                className={`group glass-card rounded-3xl overflow-hidden shadow-2xl border border-white/20 hover-lift transition-all duration-500 backdrop-blur-xl ${viewMode === 'list' ? 'flex' : ''
                  }`}
              >
                {/* Template Image */}
                <div className={`relative overflow-hidden ${viewMode === 'list' ? 'w-80 flex-shrink-0' : ''}`}>
                  <img
                    src={template.image}
                    alt={template.name}
                    className={`w-full transition-transform duration-700 group-hover:scale-110 ${viewMode === 'list' ? 'h-64' : 'h-56'
                      } object-cover cursor-pointer`}
                    onClick={() => openPreview(template)}
                  />

                  {/* Enhanced Overlay */}
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-between p-6 cursor-pointer"
                    onClick={() => openPreview(template)}
                  >
                    <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                      <button className="bg-white/90 backdrop-blur-sm text-blue-600 px-4 py-2 rounded-2xl font-bold flex items-center space-x-2 rtl:space-x-reverse hover:bg-white transition-all duration-300">
                        <PiEye className="text-xl" />
                        <span>پیش‌نمایش زنده</span>
                      </button>
                    </div>
                  </div>

                  {/* Live Demo Badge */}
                  {template.hasLiveDemo && (
                    <div className="absolute top-4 left-4 transform -rotate-6">
                      <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-2xl font-black shadow-2xl flex items-center space-x-2 rtl:space-x-reverse">
                        <PiPlay className="text-white" />
                        <span>دموی زنده</span>
                      </div>
                    </div>
                  )}

                  {/* Enhanced Premium Badge */}
                  {template.isPremium && (
                    <div className="absolute top-4 right-4 transform rotate-6">
                      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-2xl font-black shadow-2xl flex items-center space-x-2 rtl:space-x-reverse">
                        <PiCrown className="text-white" />
                        <span>پرمیوم</span>
                      </div>
                    </div>
                  )}

                  {/* Enhanced Favorite Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(template.id);
                    }}
                    className="absolute top-20 right-4 w-10 h-10 glass-effect rounded-2xl flex items-center justify-center transition-all duration-300 hover-lift hover:scale-110 shadow-lg"
                  >
                    <PiHeart
                      className={`text-lg transition-all duration-300 ${favorites.includes(template.id)
                        ? 'text-red-500 fill-current transform scale-110'
                        : 'text-gray-400 group-hover:text-red-400'
                        }`}
                    />
                  </button>
                </div>

                {/* Template Content */}
                <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-black text-gray-800 text-xl mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300">
                        {template.name}
                      </h3>
                      <p className="text-gray-600 leading-relaxed line-clamp-2">{template.description}</p>
                    </div>
                    <div className="text-left ml-4">
                      <div className={`text-2xl font-black transition-all duration-300 ${template.price === 0
                        ? 'text-green-600 group-hover:text-green-500'
                        : 'text-orange-600 group-hover:text-orange-500'
                        }`}>
                        {template.price === 0 ? 'رایگان' : `${template.price.toLocaleString()}`}
                      </div>
                      {template.price > 0 && (
                        <div className="text-gray-500 text-sm">تومان</div>
                      )}
                    </div>
                  </div>

                  {/* Enhanced Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {template.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 px-3 py-1 rounded-2xl text-sm font-medium border border-blue-200 transition-all duration-300 hover:scale-105 hover:shadow-md"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Enhanced Stats and Actions */}
                  <div className="flex items-center justify-between pt-5 border-t border-gray-200/50">
                    <div className="flex items-center space-x-6 rtl:space-x-reverse text-sm">
                      <div className="flex items-center space-x-2 rtl:space-x-reverse text-amber-600 bg-amber-50 px-3 py-1 rounded-2xl">
                        <PiStar className="fill-current" />
                        <span className="font-bold">{template.rating}</span>
                      </div>
                      <div className="flex items-center space-x-2 rtl:space-x-reverse text-gray-500">
                        <PiHeart className={favorites.includes(template.id) ? "text-red-500 fill-current" : ""} />
                        <span>{template.likes}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                      <button
                        onClick={() => openLiveDemo(template)}
                        className="glass-effect text-gray-700 hover:text-green-600 px-4 py-2 rounded-2xl font-bold transition-all duration-300 hover-lift flex items-center space-x-2 rtl:space-x-reverse hover:shadow-lg border border-green-200 hover:border-green-300"
                      >
                        <PiPlay className="text-lg" />
                        <span>دموی زنده</span>
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

          {/* No Results and Load More sections remain the same... */}
        </div>
      </div>

      {/* Preview Modal - Update the demo button in preview modal */}
      {previewTemplate && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xl flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl max-w-6xl w-full max-h-[95vh] overflow-hidden border border-white/20 shadow-2xl">
            {/* Header and content remain the same... */}

            {/* Enhanced Footer Actions */}
            <div className="p-8 border-t border-gray-200/50 bg-gradient-to-r from-gray-50 to-white/80 backdrop-blur-sm">
              <div className="flex flex-col lg:flex-row gap-4">
                <button
                  onClick={closePreview}
                  className="flex-1 glass-effect text-gray-700 py-4 rounded-2xl font-bold transition-all duration-300 hover-lift text-lg border border-white/20 hover:border-gray-300"
                >
                  بستن پیش‌نمایش
                </button>
                <button
                  onClick={() => openLiveDemo(previewTemplate)}
                  className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-4 rounded-2xl font-bold transition-all duration-300 hover-lift shadow-2xl text-lg flex items-center justify-center space-x-3 rtl:space-x-reverse group"
                >
                  <PiPlay className="text-xl group-hover:transform group-hover:scale-110 transition-transform duration-300" />
                  <span>مشاهده دموی زنده</span>
                </button>
                <button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 rounded-2xl font-bold transition-all duration-300 hover-lift shadow-2xl text-lg flex items-center justify-center space-x-3 rtl:space-x-reverse group">
                  <PiRocket className="text-xl group-hover:transform group-hover:rotate-12 transition-transform duration-300" />
                  <span>انتخاب این قالب</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Live Demo Modal */}
      <LiveDemoModal
        template={liveDemoTemplate}
        isOpen={!!liveDemoTemplate}
        onClose={closeLiveDemo}
      />
    </div>
  );
};

export default Templates;