import React, { useState, useRef, useEffect } from 'react';
import {
  PiArrowLeft,
  PiHeart,
  PiShare,
  PiDownload,
  PiPlayCircle,
  PiStar,
  PiClock,
  PiUser,
  PiEye,
  PiCheckCircle,
  PiQrCode,
  PiPhoneCall,
  PiDesktop,
  PiPalette,
  PiSparkle,
  PiCrown,
  PiRocket,
  PiCards,
  PiCalendar,
  PiMapPin,
  PiEnvelope,
  PiPhone,
  PiGlobe,
  PiLinkedinLogo,
  PiInstagramLogo,
  PiTwitterLogo,
  PiX,
  PiGradient,
  PiMagicWand,
  PiLightning,
  PiShieldCheck,
  PiInfinity
} from 'react-icons/pi';
import { useParams, useNavigate } from 'react-router-dom';

const CardDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('preview');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedColor, setSelectedColor] = useState('blue');
  const [showLivePreview, setShowLivePreview] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const previewRef = useRef(null);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle fullscreen
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      previewRef.current?.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  // Mock card data
  const cardData = {
    id: 1,
    name: 'کارت مدیرعامل حرفه‌ای',
    description: 'کارت ویزیت شیک و حرفه‌ای برای مدیران ارشد و مدیرعامل با طراحی مدرن و امکانات پیشرفته',
    category: 'business',
    price: 0,
    isPremium: true,
    rating: 4.9,
    likes: 156,
    views: 3245,
    downloads: 892,
    createdDate: '۱۴۰۲/۱۰/۱۵',
    lastUpdate: '۱۴۰۲/۱۱/۲۰',
    image: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    tags: ['مدیریت', 'حرفه‌ای', 'شرکتی', 'لوکس', 'مدرن'],
    responsive: true,
    features: [
      'طراحی لوکس و حرفه‌ای',
      'کد QR هوشمند',
      'شبکه‌های اجتماعی',
      'موقعیت‌یابی',
      'تماس مستقیم',
      'رزرو وقت'
    ],
    demoUrl: '#',
    color: 'from-blue-500 to-cyan-500',
    hasLiveDemo: true,
    stats: [
      { value: '۵۰۰+', label: 'استفاده شده', icon: <PiUser className="text-blue-500" /> },
      { value: '۴.۹/۵', label: 'امتیاز', icon: <PiStar className="text-yellow-500" /> },
      { value: '۲۴/۷', label: 'پشتیبانی', icon: <PiShieldCheck className="text-green-500" /> }
    ],
    templateInfo: {
      sections: ['هدینگ', 'درباره من', 'مهارت‌ها', 'تجربیات', 'تماس'],
      customization: ['رنگ', 'فونت', 'لوگو', 'عکس', 'محتوا'],
      compatibility: ['موبایل', 'تبلت', 'دسکتاپ']
    },
    author: {
      name: 'علی محمدی',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
      rating: 4.8,
      templates: 24,
      verified: true
    }
  };

  const colorOptions = [
    { id: 'blue', name: 'آبی', class: 'from-blue-500 to-cyan-500', bg: 'bg-gradient-to-r from-blue-500 to-cyan-500' },
    { id: 'purple', name: 'بنفش', class: 'from-purple-500 to-pink-500', bg: 'bg-gradient-to-r from-purple-500 to-pink-500' },
    { id: 'green', name: 'سبز', class: 'from-green-500 to-emerald-500', bg: 'bg-gradient-to-r from-green-500 to-emerald-500' },
    { id: 'orange', name: 'نارنجی', class: 'from-orange-500 to-amber-500', bg: 'bg-gradient-to-r from-orange-500 to-amber-500' },
    { id: 'gradient', name: 'گرادینت', class: 'from-blue-500 via-purple-500 to-pink-500', bg: 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500' }
  ];

  const relatedCards = [
    {
      id: 2,
      name: 'کارت وکیل',
      description: 'کارت ویزیت رسمی برای وکلای دادگستری',
      price: 28000,
      image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
      rating: 4.9,
      isPremium: true
    },
    {
      id: 3,
      name: 'کارت مشاور',
      description: 'کارت ویزیت حرفه‌ای برای مشاوران',
      price: 0,
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
      rating: 4.7,
      isPremium: false
    },
    {
      id: 4,
      name: 'کارت مدیر مالی',
      description: 'کارت ویزیت تخصصی برای مدیران مالی',
      price: 35000,
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
      rating: 4.8,
      isPremium: true
    }
  ];

  const CTAButton = ({ children, icon, variant = "primary", className = "", onClick, loading = false }) => {
    return (
      <button
        onClick={onClick}
        disabled={loading}
        className={`group relative px-8 py-4 rounded-2xl font-bold transition-all duration-500 ease-out flex items-center justify-center space-x-3 rtl:space-x-reverse min-w-[200px] focus:outline-none focus:ring-4 focus:ring-offset-4 backdrop-blur-sm border ${variant === "primary"
          ? "bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 hover:from-blue-700 hover:via-purple-700 hover:to-cyan-700 text-white shadow-2xl hover:shadow-3xl focus:ring-blue-500/50 hover:scale-105 border-transparent"
          : variant === "secondary"
            ? "bg-white/90 backdrop-blur-lg hover:bg-white text-gray-800 shadow-xl hover:shadow-2xl border border-white/50 focus:ring-purple-500/50 hover:scale-105 hover:border-white/80"
            : "bg-gradient-to-r from-gray-900 to-black text-white shadow-2xl hover:shadow-3xl focus:ring-gray-500/50 hover:scale-105 border border-gray-700"
          } ${loading ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      >
        {variant === "primary" && (
          <>
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </>
        )}

        {loading ? (
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          <span className={`transform transition-transform duration-300 group-hover:scale-110 ${variant === 'premium' ? 'text-yellow-400' : ''}`}>
            {icon}
          </span>
        )}
        <span className="relative z-10 font-bold text-lg">
          {children}
        </span>
      </button>
    );
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: cardData.name,
          text: cardData.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      // Show toast notification
      console.log('لینک کپی شد!');
    }
  };

  const handleLivePreview = () => {
    setIsLoading(true);
    setShowLivePreview(true);
    setTimeout(() => setIsLoading(false), 1500);
  };

  // Enhanced Live Preview Component
  const LivePreview = () => {
    const [currentView, setCurrentView] = useState('desktop');
    const [isPreviewLoading, setIsPreviewLoading] = useState(true);

    useEffect(() => {
      const timer = setTimeout(() => {
        setIsPreviewLoading(false);
      }, 1800);
      return () => clearTimeout(timer);
    }, []);

    const deviceSizes = {
      desktop: 'w-full h-full',
      tablet: 'w-4/5 h-4/5 max-w-4xl',
      phone: 'w-80 h-[700px]'
    };

    const deviceFrames = {
      phone: (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-2xl z-20 shadow-lg"></div>
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gray-700 rounded-full z-20"></div>
          <div className="absolute inset-2 rounded-[2rem] border-2 border-gray-800/50 z-10"></div>
        </div>
      ),
      tablet: (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gray-700 rounded-full z-20"></div>
          <div className="absolute inset-4 rounded-3xl border-2 border-gray-800/30 z-10"></div>
        </div>
      ),
      desktop: null
    };

    return (
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900/95 via-purple-900/95 to-blue-900/95 backdrop-blur-2xl z-50 flex items-center justify-center p-4">
        {/* Enhanced Header Controls */}
        <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-10">
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <button
              onClick={() => setShowLivePreview(false)}
              className="group glass-effect text-white/90 hover:text-white px-6 py-3 rounded-2xl font-bold transition-all duration-300 hover-lift backdrop-blur-xl border border-white/10 hover:border-white/20 flex items-center space-x-3 rtl:space-x-reverse hover:scale-105"
            >
              <PiX className="text-xl group-hover:rotate-90 transition-transform duration-300" />
              <span>بستن پیش‌نمایش</span>
            </button>

            {/* Premium Badge */}
            <div className="glass-effect rounded-2xl px-4 py-2 backdrop-blur-xl border border-yellow-500/20">
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <PiCrown className="text-yellow-400 text-lg" />
                <span className="text-yellow-400 font-bold text-sm">پیش‌نمایش زنده</span>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            {/* Enhanced Device View Toggle */}
            <div className="glass-effect rounded-2xl p-2 backdrop-blur-xl border border-white/10 flex items-center space-x-1 rtl:space-x-reverse">
              {[
                { view: 'phone', icon: PiPhoneCall, label: 'موبایل' },
                { view: 'tablet', icon: PiDesktop, label: 'تبلت' },
                { view: 'desktop', icon: PiDesktop, label: 'دسکتاپ' }
              ].map(({ view, icon: Icon, label }) => (
                <button
                  key={view}
                  onClick={() => setCurrentView(view)}
                  className={`p-3 rounded-xl transition-all duration-300 flex items-center space-x-2 rtl:space-x-reverse group ${currentView === view
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                    }`}
                >
                  <Icon className="text-lg" />
                  <span className="text-sm font-medium hidden sm:block">{label}</span>
                </button>
              ))}
            </div>

            {/* Enhanced Fullscreen Toggle */}
            <button
              onClick={toggleFullscreen}
              className="glass-effect text-white/90 hover:text-white p-3 rounded-2xl transition-all duration-300 hover-lift backdrop-blur-xl border border-white/10 hover:border-white/20 hover:scale-110"
            >
              {isFullscreen ? <PiUser className="text-xl" /> : <PiUser className="text-xl" />}
            </button>
          </div>
        </div>

        {/* Enhanced Preview Container */}
        <div
          ref={previewRef}
          className={`relative glass-card rounded-3xl overflow-hidden shadow-2xl border border-white/20 transition-all duration-500 transform ${deviceSizes[currentView]
            } ${isFullscreen ? '!w-full !h-full !rounded-none' : 'scale-95 hover:scale-100'} ${isPreviewLoading ? 'animate-pulse' : ''
            }`}
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)'
          }}
        >
          {/* Device Frame */}
          {deviceFrames[currentView]}

          {/* Enhanced Loading State */}
          {isPreviewLoading && (
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 flex items-center justify-center z-10 backdrop-blur-sm">
              <div className="text-center text-white">
                <div className="w-20 h-20 border-4 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-6 shadow-2xl"></div>
                <div className="space-y-3">
                  <PiSparkle className="text-white text-3xl mx-auto animate-bounce" />
                  <p className="text-xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                    در حال بارگذاری پیش‌نمایش...
                  </p>
                  <p className="text-white/70 text-sm">لطفاً چند لحظه صبر کنید</p>
                </div>
              </div>
            </div>
          )}

          {/* Enhanced Preview Content */}
          <div className="w-full h-full bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 relative overflow-auto">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-10 left-10 w-72 h-72 bg-blue-200 rounded-full blur-3xl opacity-20 animate-float"></div>
              <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-200 rounded-full blur-3xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
            </div>

            {/* Mock Business Card Content */}
            <div className="min-h-full flex items-center justify-center p-8 relative z-10">
              <div className="glass-card rounded-3xl p-8 shadow-2xl border border-white/30 max-w-md w-full backdrop-blur-sm transform hover:scale-105 transition-transform duration-500">
                {/* Enhanced Header */}
                <div className="text-center mb-8">
                  <div className="relative inline-block">
                    <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-2xl transform hover:rotate-6 transition-transform duration-500">
                      <PiUser className="text-white text-3xl" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-white shadow-lg"></div>
                  </div>
                  <h2 className="text-2xl font-black text-gray-800 mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    علی محمدی
                  </h2>
                  <p className="text-gray-600 font-medium">مدیرعامل و مؤسس</p>
                  <div className="flex justify-center space-x-2 rtl:space-x-reverse mt-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">
                      💼 کسب‌وکار
                    </span>
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
                      ✅ آنلاین
                    </span>
                  </div>
                </div>

                {/* Enhanced Contact Info */}
                <div className="space-y-4 mb-8">
                  {[
                    { icon: PiPhone, text: '۰۹۱۲ XXX XXXX', color: 'text-blue-500' },
                    { icon: PiEnvelope, text: 'ali@company.com', color: 'text-green-500' },
                    { icon: PiMapPin, text: 'تهران، جردن', color: 'text-red-500' },
                    { icon: PiGlobe, text: 'www.company.com', color: 'text-purple-500' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-4 rtl:space-x-reverse text-gray-700 group hover:bg-white/50 rounded-2xl p-3 transition-all duration-300">
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br from-white to-gray-50 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 ${item.color}`}>
                        <item.icon className="text-lg" />
                      </div>
                      <span className="font-medium flex-1">{item.text}</span>
                    </div>
                  ))}
                </div>

                {/* Enhanced Social Links */}
                <div className="flex justify-center space-x-4 rtl:space-x-reverse mb-8">
                  {[
                    { icon: PiLinkedinLogo, color: 'bg-blue-600 hover:bg-blue-700', label: 'لینکدین' },
                    { icon: PiInstagramLogo, color: 'bg-pink-600 hover:bg-pink-700', label: 'اینستاگرام' },
                    { icon: PiTwitterLogo, color: 'bg-blue-400 hover:bg-blue-500', label: 'توییتر' }
                  ].map((social, index) => (
                    <button
                      key={index}
                      className={`w-14 h-14 ${social.color} text-white rounded-2xl flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl group relative overflow-hidden`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                      <social.icon className="text-xl relative z-10" />
                    </button>
                  ))}
                </div>

                {/* Enhanced QR Code */}
                <div className="text-center">
                  <div className="w-28 h-28 bg-white rounded-2xl flex items-center justify-center mx-auto shadow-2xl border border-gray-200 transform hover:rotate-3 transition-transform duration-500">
                    <div className="w-24 h-24 border-4 border-gray-900 flex items-center justify-center rounded-lg">
                      <PiQrCode className="text-gray-900 text-2xl" />
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mt-3 font-medium">اسکن کنید برای اطلاعات بیشتر</p>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Interactive Elements Overlay */}
          <div className="absolute bottom-6 left-6 right-6 flex justify-center space-x-4 rtl:space-x-reverse">
            {[
              { icon: PiPhone, label: 'تماس', color: 'from-green-500 to-emerald-500' },
              { icon: PiShare, label: 'اشتراک', color: 'from-blue-500 to-cyan-500' },
              { icon: PiDownload, label: 'ذخیره', color: 'from-purple-500 to-pink-500' }
            ].map((action, index) => (
              <button
                key={index}
                className={`bg-gradient-to-r ${action.color} text-white px-6 py-3 rounded-2xl font-bold transition-all duration-300 hover-lift shadow-lg hover:shadow-xl flex items-center space-x-2 rtl:space-x-reverse hover:scale-105 min-w-[120px] justify-center`}
              >
                <action.icon className="text-lg" />
                <span>{action.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Enhanced Bottom Info Bar */}
        <div className="absolute bottom-6 left-6 right-6 text-center">
          <div className="glass-effect rounded-2xl p-4 backdrop-blur-xl border border-white/10 inline-block">
            <p className="text-white/90 text-sm font-medium">
              ✨ این یک پیش‌نمایش تعاملی از قالب است. برای سفارشی‌سازی روی "استفاده از این قالب" کلیک کنید.
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 relative overflow-hidden">
        {/* Enhanced Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className={`absolute top-20 left-20 w-96 h-96 bg-blue-300 rounded-full blur-3xl opacity-20 animate-float transition-transform duration-2000 ${isScrolled ? 'scale-110' : 'scale-100'
            }`} />
          <div className={`absolute bottom-20 right-20 w-96 h-96 bg-purple-300 rounded-full blur-3xl opacity-20 animate-float transition-transform duration-2000 ${isScrolled ? 'scale-110' : 'scale-100'
            }`} style={{ animationDelay: '1.5s' }} />
          <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-cyan-300 rounded-full blur-3xl opacity-20 animate-float transition-transform duration-2000 ${isScrolled ? 'scale-110' : 'scale-100'
            }`} style={{ animationDelay: '2.5s' }} />

          {/* Animated Grid */}
          <div className="absolute inset-0 opacity-[0.02]">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, #3b82f6 2px, transparent 0),
                              radial-gradient(circle at 75% 75%, #8b5cf6 2px, transparent 0)`,
              backgroundSize: '60px 60px',
              backgroundPosition: '0 0, 30px 30px'
            }} />
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          {/* Enhanced Header */}
          <div className="pt-32 pb-8">
            <div className="flex items-center justify-between mb-12">
              <button
                onClick={() => navigate(-1)}
                className="group flex items-center gap-3 text-gray-600 hover:text-gray-800 font-bold text-lg glass-effect rounded-2xl px-6 py-3 hover-lift transition-all duration-300 backdrop-blur-sm border border-white/20 hover:border-white/40"
              >
                <PiArrowLeft className="transform group-hover:-translate-x-1 transition-transform duration-300" />
                <span>بازگشت به گالری</span>
              </button>

              {/* Enhanced Premium Badge */}
              <div className="flex flex-col items-center space-y-3">
                <div className="inline-flex items-center space-x-3 rtl:space-x-reverse glass-effect rounded-2xl px-6 py-3 shadow-2xl border border-yellow-500/20 hover:shadow-3xl transition-all duration-500 hover:scale-105 group cursor-pointer backdrop-blur-xl">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <PiCrown className="text-yellow-500 text-xl group-hover:scale-110 transition-transform duration-300" />
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  </div>
                  <span className="text-sm font-black bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                    قالب پرمیوم تأیید شده
                  </span>
                  <PiSparkle className="text-purple-500 text-lg group-hover:rotate-180 transition-transform duration-500" />
                </div>

                {/* Quick Stats */}
                <div className="flex items-center space-x-6 rtl:space-x-reverse text-sm text-gray-600">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <PiEye className="text-blue-500" />
                    <span>{cardData.views.toLocaleString()} بازدید</span>
                  </div>
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <PiDownload className="text-green-500" />
                    <span>{cardData.downloads} دانلود</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={`group w-14 h-14 glass-effect rounded-2xl flex items-center justify-center transition-all duration-300 hover-lift backdrop-blur-sm border ${isFavorite
                    ? 'text-red-500 border-red-500/20 bg-red-500/10'
                    : 'text-gray-400 border-white/20 hover:text-red-400 hover:border-red-500/20'
                    }`}
                >
                  <PiHeart className={`text-2xl transition-all duration-300 ${isFavorite
                    ? 'fill-current scale-110'
                    : 'group-hover:scale-110'
                    }`} />
                </button>
                <button
                  onClick={handleShare}
                  className="group w-14 h-14 glass-effect rounded-2xl flex items-center justify-center transition-all duration-300 hover-lift backdrop-blur-sm border border-white/20 text-gray-400 hover:text-blue-600 hover:border-blue-500/20"
                >
                  <PiShare className="text-2xl group-hover:scale-110 transition-transform duration-300" />
                </button>
              </div>
            </div>

            {/* Enhanced Main Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-12">
              {/* Left Column - Preview & Author */}
              <div className="xl:col-span-2 space-y-8">
                {/* Enhanced Preview Card */}
                <div className="glass-card rounded-3xl p-8 shadow-2xl border border-white/30 backdrop-blur-xl hover-lift transition-all duration-500">
                  <div className="relative rounded-3xl overflow-hidden group cursor-pointer" onClick={handleLivePreview}>
                    <img
                      src={cardData.image}
                      alt={cardData.name}
                      className="w-full h-96 object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />

                    {/* Enhanced Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-between p-8">
                      <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center space-x-3 rtl:space-x-reverse shadow-2xl">
                          <PiPlayCircle className="text-xl" />
                          <span>مشاهده پیش‌نمایش زنده</span>
                        </div>
                      </div>
                    </div>

                    {/* Enhanced Live Demo Badge */}
                    {cardData.hasLiveDemo && (
                      <div className="absolute top-6 left-6 transform -rotate-6">
                        <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-2xl font-black shadow-2xl flex items-center space-x-3 rtl:space-x-reverse backdrop-blur-sm border border-white/20">
                          <PiSparkle className="text-white text-lg" />
                          <span>دموی زنده تعاملی</span>
                        </div>
                      </div>
                    )}

                    {/* Enhanced Stats Overlay */}
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="grid grid-cols-3 gap-4">
                        {cardData.stats.map((stat, index) => (
                          <div key={index} className="text-center bg-white/95 backdrop-blur-sm rounded-2xl p-4 transform hover:scale-105 transition-all duration-300 cursor-pointer border border-white/30 shadow-lg">
                            <div className="flex justify-center mb-2">
                              {stat.icon}
                            </div>
                            <div className="text-lg font-black text-gray-900 mb-1">
                              {stat.value}
                            </div>
                            <div className="text-gray-600 text-sm font-medium">
                              {stat.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Color Options */}
                  <div className="mt-8">
                    <div className="flex items-center justify-between mb-6">
                      <h4 className="font-black text-gray-800 text-xl flex items-center space-x-3 rtl:space-x-reverse">
                        <PiPalette className="text-purple-500 text-2xl" />
                        <span>انتخاب پالت رنگی</span>
                      </h4>
                      <span className="text-gray-500 text-sm">سفارشی‌سازی آسان</span>
                    </div>
                    <div className="flex flex-wrap gap-4">
                      {colorOptions.map((color) => (
                        <button
                          key={color.id}
                          onClick={() => setSelectedColor(color.id)}
                          className={`group relative p-4 rounded-2xl transition-all duration-300 hover-lift border-2 ${selectedColor === color.id
                            ? 'border-blue-500 shadow-2xl transform scale-110'
                            : 'border-white/30 hover:border-white/50 hover:scale-105'
                            }`}
                        >
                          <div className={`w-12 h-12 rounded-xl ${color.bg} shadow-lg transform group-hover:rotate-12 transition-transform duration-300`} />
                          <span className="text-sm text-gray-700 font-medium mt-2 block text-center">
                            {color.name}
                          </span>
                          {selectedColor === color.id && (
                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center shadow-lg">
                              <PiCheckCircle className="text-white text-xs" />
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Enhanced Author Info */}
                <div className="glass-card rounded-3xl p-8 shadow-2xl border border-white/30 backdrop-blur-xl hover-lift transition-all duration-300">
                  <div className="flex items-center space-x-6 rtl:space-x-reverse">
                    <div className="relative">
                      <img
                        src={cardData.author.avatar}
                        alt={cardData.author.name}
                        className="w-20 h-20 rounded-2xl object-cover shadow-lg"
                      />
                      {cardData.author.verified && (
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center shadow-lg">
                          <PiCheckCircle className="text-white text-xs" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 rtl:space-x-reverse mb-2">
                        <h4 className="font-black text-gray-800 text-xl">{cardData.author.name}</h4>
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-bold">
                          طراح قالب
                        </span>
                      </div>
                      <div className="flex items-center space-x-6 rtl:space-x-reverse text-gray-600">
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                          <PiStar className="text-yellow-500 fill-current" />
                          <span className="font-bold">{cardData.author.rating}</span>
                          <span>امتیاز</span>
                        </div>
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                          <PiCards className="text-purple-500" />
                          <span className="font-bold">{cardData.author.templates}</span>
                          <span>قالب</span>
                        </div>
                      </div>
                    </div>
                    <button className="glass-effect text-blue-600 hover:text-blue-700 px-6 py-3 rounded-2xl font-bold transition-all duration-300 hover-lift border border-blue-500/20 hover:border-blue-500/40">
                      مشاهده پروفایل
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column - Details & Actions */}
              <div className="space-y-8">
                {/* Enhanced Details Card */}
                <div className="glass-card rounded-3xl p-8 shadow-2xl border border-white/30 backdrop-blur-xl hover-lift transition-all duration-300">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h1 className="text-3xl font-black text-gray-800 mb-4 gradient-text leading-tight">
                        {cardData.name}
                      </h1>
                      <p className="text-gray-600 text-lg leading-relaxed">
                        {cardData.description}
                      </p>
                    </div>
                  </div>

                  {/* Enhanced Tags */}
                  <div className="flex flex-wrap gap-3 mb-8">
                    {cardData.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 px-4 py-2 rounded-2xl text-sm font-bold border border-blue-200 transition-all duration-300 hover:scale-105 hover:shadow-md backdrop-blur-sm flex items-center space-x-2 rtl:space-x-reverse"
                      >
                        <PiSparkle className="text-blue-500 text-sm" />
                        <span>#{tag}</span>
                      </span>
                    ))}
                  </div>

                  {/* Enhanced Pricing & Rating */}
                  <div className="grid grid-cols-2 gap-6 mb-8">
                    <div className="text-center glass-effect rounded-2xl p-6 backdrop-blur-sm border border-white/30 hover-lift transition-all duration-300">
                      <div className={`text-4xl font-black mb-2 ${cardData.price === 0
                        ? 'text-green-600'
                        : 'text-orange-600'
                        }`}>
                        {cardData.price === 0 ? 'رایگان' : `${cardData.price.toLocaleString()}`}
                      </div>
                      {cardData.price > 0 && (
                        <div className="text-gray-500 text-sm">تومان</div>
                      )}
                      <div className="text-gray-600 text-sm mt-2">هزینه قالب</div>
                    </div>
                    <div className="text-center glass-effect rounded-2xl p-6 backdrop-blur-sm border border-white/30 hover-lift transition-all duration-300">
                      <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse text-amber-600 mb-2">
                        <PiStar className="fill-current text-2xl" />
                        <span className="font-black text-3xl">{cardData.rating}</span>
                      </div>
                      <div className="text-gray-600 text-sm">امتیاز کاربران</div>
                    </div>
                  </div>

                  {/* Enhanced CTA Buttons */}
                  <div className="space-y-4">
                    <CTAButton
                      icon={<PiPlayCircle className="text-2xl" />}
                      variant="secondary"
                      onClick={handleLivePreview}
                      loading={isLoading}
                      className="w-full text-lg py-5"
                    >
                      {isLoading ? 'در حال بارگذاری...' : 'پیش‌نمایش زنده'}
                    </CTAButton>
                    <CTAButton
                      icon={<PiRocket className="text-2xl" />}
                      variant="primary"
                      onClick={() => console.log('Use template')}
                      className="w-full text-lg py-5"
                    >
                      استفاده از این قالب
                    </CTAButton>
                    {cardData.isPremium && (
                      <CTAButton
                        icon={<PiCrown className="text-2xl" />}
                        variant="premium"
                        onClick={() => console.log('Premium features')}
                        className="w-full text-lg py-5"
                      >
                        ویژگی‌های پرمیوم
                      </CTAButton>
                    )}
                  </div>
                </div>

                {/* Enhanced Features Card */}
                <div className="glass-card rounded-3xl p-8 shadow-2xl border border-white/30 backdrop-blur-xl hover-lift transition-all duration-300">
                  <h3 className="font-black text-gray-800 text-xl mb-6 flex items-center space-x-3 rtl:space-x-reverse">
                    <PiMagicWand className="text-purple-500 text-2xl" />
                    <span>امکانات و ویژگی‌ها</span>
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
                    {cardData.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-4 rtl:space-x-reverse text-gray-700 group hover:bg-white/50 rounded-2xl p-4 transition-all duration-300 hover-lift">
                        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                          <PiCheckCircle className="text-white text-xl" />
                        </div>
                        <span className="text-lg font-medium group-hover:text-gray-800 transition-colors duration-300 flex-1">
                          {feature}
                        </span>
                        <PiLightning className="text-yellow-500 text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Tabs Section */}
            <div className="glass-card rounded-3xl p-8 shadow-2xl border border-white/30 backdrop-blur-xl mb-12 hover-lift transition-all duration-300">
              <div className="flex flex-wrap gap-4 mb-8">
                {[
                  { id: 'preview', label: 'پیش‌نمایش زنده', icon: PiPlayCircle },
                  { id: 'details', label: 'جزئیات فنی', icon: PiCards },
                  { id: 'customization', label: 'سفارشی‌سازی', icon: PiPalette },
                  { id: 'reviews', label: 'نظرات کاربران', icon: PiStar }
                ].map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setActiveTab(id)}
                    className={`group px-8 py-4 rounded-2xl font-bold transition-all duration-300 hover-lift flex items-center space-x-3 rtl:space-x-reverse ${activeTab === id
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-2xl transform scale-105'
                      : 'glass-effect text-gray-600 hover:text-gray-800 border border-white/20'
                      }`}
                  >
                    <Icon className={`text-xl ${activeTab === id ? 'text-white' : 'text-gray-400 group-hover:text-current'
                      }`} />
                    <span className="text-lg">{label}</span>
                  </button>
                ))}
              </div>

              {/* Enhanced Tab Content */}
              <div className="min-h-96">
                {activeTab === 'preview' && (
                  <div className="text-center py-16">
                    <div className="w-40 h-40 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl transform hover:scale-105 transition-transform duration-500">
                      <PiPlayCircle className="text-white text-5xl" />
                    </div>
                    <h4 className="text-3xl font-black text-gray-800 mb-6 gradient-text">
                      پیش‌نمایش زنده قالب
                    </h4>
                    <p className="text-gray-600 text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
                      برای مشاهده پیش‌نمایش زنده و تعاملی قالب، روی دکمه زیر کلیک کنید و تجربه‌ای واقعی از کارت ویزیت خود داشته باشید
                    </p>
                    <CTAButton
                      icon={<PiPlayCircle className="text-2xl" />}
                      variant="primary"
                      onClick={handleLivePreview}
                      loading={isLoading}
                      className="text-xl px-12 py-6"
                    >
                      {isLoading ? 'در حال بارگذاری...' : 'مشاهده دموی زنده'}
                    </CTAButton>
                  </div>
                )}

                {activeTab === 'details' && (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {[
                      {
                        title: 'بخش‌های قالب',
                        items: cardData.templateInfo.sections,
                        icon: PiCards,
                        color: 'from-green-500 to-emerald-500'
                      },
                      {
                        title: 'قابلیت سفارشی‌سازی',
                        items: cardData.templateInfo.customization,
                        icon: PiPalette,
                        color: 'from-blue-500 to-cyan-500'
                      },
                      {
                        title: 'سازگاری کامل',
                        items: cardData.templateInfo.compatibility,
                        icon: PiPhoneCall,
                        color: 'from-purple-500 to-pink-500'
                      }
                    ].map((section, index) => (
                      <div key={index} className="glass-effect rounded-2xl p-6 backdrop-blur-sm border border-white/30 hover-lift transition-all duration-300">
                        <div className={`w-16 h-16 bg-gradient-to-r ${section.color} rounded-2xl flex items-center justify-center mb-4 shadow-lg`}>
                          <section.icon className="text-white text-2xl" />
                        </div>
                        <h5 className="font-black text-gray-800 text-lg mb-4">{section.title}</h5>
                        <div className="space-y-3">
                          {section.items.map((item, itemIndex) => (
                            <div key={itemIndex} className="flex items-center space-x-3 rtl:space-x-reverse text-gray-700">
                              <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"></div>
                              <span className="text-sm font-medium">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Enhanced Related Cards */}
            <div className="mb-16">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-3xl font-black text-gray-800 flex items-center space-x-3 rtl:space-x-reverse">
                  <PiSparkle className="text-yellow-500 text-2xl" />
                  <span>قالب‌های مشابه</span>
                </h3>
                <button className="glass-effect text-gray-600 hover:text-gray-800 px-6 py-3 rounded-2xl font-bold transition-all duration-300 hover-lift border border-white/20">
                  مشاهده همه
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedCards.map((card) => (
                  <div key={card.id} className="group glass-card rounded-3xl overflow-hidden shadow-2xl border border-white/20 hover-lift transition-all duration-500 backdrop-blur-xl transform hover:scale-105">
                    <div className="relative overflow-hidden">
                      <img
                        src={card.image}
                        alt={card.name}
                        className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-700"
                      />
                      {card.isPremium && (
                        <div className="absolute top-4 left-4">
                          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-2xl text-sm font-black shadow-2xl flex items-center space-x-2 rtl:space-x-reverse">
                            <PiCrown className="text-white" />
                            <span>پرمیوم</span>
                          </div>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                    </div>
                    <div className="p-6">
                      <h4 className="font-black text-gray-800 text-lg mb-3 group-hover:gradient-text transition-all duration-300">
                        {card.name}
                      </h4>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{card.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 rtl:space-x-reverse text-amber-600 bg-amber-50 px-3 py-1 rounded-2xl">
                          <PiStar className="fill-current" />
                          <span className="font-bold text-sm">{card.rating}</span>
                        </div>
                        <div className={`text-lg font-black ${card.price === 0 ? 'text-green-600' : 'text-orange-600'
                          }`}>
                          {card.price === 0 ? 'رایگان' : `${card.price.toLocaleString()} تومان`}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Live Preview Modal */}
      {showLivePreview && <LivePreview />}

      <style jsx>{`
        .gradient-text {
          background: linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          background-size: 200% 200%;
          animation: gradient-shift 3s ease infinite;
        }
        
        .glass-card {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.4);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        }
        
        .glass-effect {
          background: rgba(255, 255, 255, 0.5);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }
        
        .hover-lift {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .hover-lift:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
          }
          50% { 
            transform: translateY(-20px) rotate(1deg); 
          }
        }

        @keyframes gradient-shift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, #2563eb, #7c3aed);
        }
      `}</style>
    </>
  );
};

export default CardDetailPage;