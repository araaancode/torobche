import React, { useState, useEffect, useRef } from 'react';
import { 
  PiArrowLeft,
  PiShareNetwork,
  PiDownload,
  PiHeart,
  PiHeartFill,
  PiEye,
  PiCopy,
  PiCheckCircle,
  PiQrCode,
  PiPhone,
  PiEnvelope,
  PiMapPin,
  PiGlobe,
  PiLinkedinLogo,
  PiInstagramLogo,
  PiTwitterLogo,
  PiWhatsappLogo,
  PiCalendar,
  PiClock,
  PiUser,
  PiBuilding,
  PiSparkle,
  PiShootingStar,
  PiCrown,
  PiMedal,
  PiTrendUp,
  PiShieldCheck,
  PiRocket,
  PiMagicWand,
  PiPaintBrush,
  PiPalette,
  PiDeviceMobile,
  PiDeviceTablet,
  PiLaptop,
  PiGear,
  PiLock,
  PiBell,
  PiBookmark,
  PiBookmarkFill
} from 'react-icons/pi';
import { useNavigate, useParams } from 'react-router-dom';

const BusinessCardPage = () => {
  const navigate = useNavigate();
  const { templateId } = useParams();
  const [activeTab, setActiveTab] = useState('preview');
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [copiedField, setCopiedField] = useState('');
  const [currentColor, setCurrentColor] = useState('blue');
  const [currentView, setCurrentView] = useState('mobile');
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const businessCardData = {
    id: templateId || 'corporate-pro',
    title: 'کارت ویزیت شرکتی پیشرفته',
    description: 'قالب رسمی و حرفه‌ای با امکانات پیشرفته برای شرکت‌های بزرگ و سازمان‌ها',
    category: 'شرکتی',
    price: '۱,۲۰۰,۰۰۰ تومان',
    oldPrice: '۱,۵۰۰,۰۰۰ تومان',
    rating: 4.9,
    reviews: 156,
    sales: 289,
    popular: true,
    featured: true,
    badge: 'پرفروش',
    
    features: [
      'طراحی ریسپانسیو',
      'شبکه‌های اجتماعی',
      'نقشه هوشمند',
      'تماس مستقیم',
      'ذخیره مخاطب',
      'آنالیز بازدید',
      'QR Code داینامیک',
      'پشتیبانی ۲۴/۷'
    ],

    contactInfo: {
      name: 'علی محمدی',
      position: 'مدیر عامل',
      company: 'شرکت فناوری اطلاعات نوآوران',
      phone: '+۹۸ ۹۱۲ ۱۲۳ ۴۵۶۷',
      email: 'ali.mohammadi@company.com',
      website: 'www.company.com',
      address: 'تهران، خیابان ولیعصر، پلاک ۱۲۳۴',
      linkedin: 'linkedin.com/in/alimohammadi',
      instagram: '@alimohammadi'
    },

    stats: {
      views: '۲,۴۸۹',
      shares: '۵۶۷',
      downloads: '۸۹۲',
      contacts: '۱,۲۳۴'
    },

    colors: [
      { name: 'blue', value: 'from-blue-500 to-cyan-500', bg: 'bg-gradient-to-r from-blue-500 to-cyan-500' },
      { name: 'purple', value: 'from-purple-500 to-pink-500', bg: 'bg-gradient-to-r from-purple-500 to-pink-500' },
      { name: 'green', value: 'from-green-500 to-teal-500', bg: 'bg-gradient-to-r from-green-500 to-teal-500' },
      { name: 'orange', value: 'from-orange-500 to-red-500', bg: 'bg-gradient-to-r from-orange-500 to-red-500' },
      { name: 'indigo', value: 'from-indigo-500 to-purple-500', bg: 'bg-gradient-to-r from-indigo-500 to-purple-500' }
    ],

    views: [
      { name: 'mobile', icon: <PiDeviceMobile />, label: 'موبایل' },
      { name: 'tablet', icon: <PiDeviceTablet />, label: 'تبلت' },
      { name: 'desktop', icon: <PiLaptop />, label: 'دسکتاپ' }
    ]
  };

  const similarTemplates = [
    {
      id: 'startup-card',
      title: 'کارت استارتاپی',
      description: 'قالب مدرن و پویا برای استارتاپ‌ها',
      image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      price: '۹۰۰,۰۰۰ تومان',
      rating: 4.7
    },
    {
      id: 'minimal-card',
      title: 'کارت مینیمال',
      description: 'طراحی ساده و شیک برای کسب‌وکارهای خلاق',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      price: '۷۵۰,۰۰۰ تومان',
      rating: 4.8
    },
    {
      id: 'creative-card',
      title: 'کارت خلاقانه',
      description: 'قالب منحصر به فرد برای برندهای خاص',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      price: '۱,۵۰۰,۰۰۰ تومان',
      rating: 4.9
    }
  ];

  const copyToClipboard = async (text, field) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(''), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: businessCardData.title,
          text: businessCardData.description,
          url: window.location.href,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      copyToClipboard(window.location.href, 'link');
    }
  };

  const handleDownload = () => {
    // Simulate download
    console.log('Downloading business card template...');
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className={index < rating ? "text-yellow-400" : "text-gray-300"}>
        {index < rating ? <PiRocket className="text-lg" /> : <PiRocket className="text-lg" />}
      </span>
    ));
  };

  return (
    <div ref={sectionRef} className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30">
      
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float-slow"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float-slower"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-pulse"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-20 opacity-15 animate-float">
        <PiSparkle className="text-5xl text-blue-500" />
      </div>
      <div className="absolute bottom-32 right-32 opacity-15 animate-float-delayed">
        <PiShootingStar className="text-4xl text-purple-500" />
      </div>

      {/* Header */}
      <header className="relative bg-white/90 backdrop-blur-xl border-b border-white/60 shadow-lg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <button
              onClick={() => navigate(-1)}
              className="group flex items-center gap-3 bg-white/80 backdrop-blur-sm hover:bg-white text-gray-700 px-6 py-3 rounded-2xl font-bold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl border border-white/40"
            >
              <PiArrowLeft className="text-xl transform transition-transform duration-300 group-hover:-translate-x-1" />
              <span>بازگشت</span>
            </button>
            
            <div className={`text-center transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 flex items-center gap-4 justify-center">
                <PiBuilding className="text-blue-500" />
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient">
                  {businessCardData.title}
                </span>
              </h1>
              <p className="text-gray-600 mt-3 text-lg">کارت ویزیت دیجیتال حرفه‌ای برای کسب‌وکار شما</p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`p-3 rounded-2xl transition-all duration-300 hover:scale-110 ${
                  isBookmarked 
                    ? 'bg-yellow-500/20 text-yellow-600 border border-yellow-500/30' 
                    : 'bg-white/80 backdrop-blur-sm text-gray-600 border border-white/40 hover:bg-white'
                }`}
              >
                {isBookmarked ? <PiBookmarkFill className="text-xl" /> : <PiBookmark className="text-xl" />}
              </button>
              
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`p-3 rounded-2xl transition-all duration-300 hover:scale-110 ${
                  isLiked 
                    ? 'bg-red-500/20 text-red-600 border border-red-500/30' 
                    : 'bg-white/80 backdrop-blur-sm text-gray-600 border border-white/40 hover:bg-white'
                }`}
              >
                {isLiked ? <PiHeartFill className="text-xl" /> : <PiHeart className="text-xl" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Left Column - Preview & Customization */}
          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            
            {/* Preview Card */}
            <div className="bg-white/90 backdrop-blur-xl rounded-4xl p-8 shadow-3xl border border-white/60 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-black text-gray-800">پیش‌نمایش زنده</h2>
                
                {/* View Controls */}
                <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-2xl p-2 border border-white/40">
                  {businessCardData.views.map((view) => (
                    <button
                      key={view.name}
                      onClick={() => setCurrentView(view.name)}
                      className={`p-2 rounded-xl transition-all duration-300 ${
                        currentView === view.name 
                          ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg' 
                          : 'text-gray-600 hover:text-gray-800 hover:bg-white'
                      }`}
                    >
                      {view.icon}
                    </button>
                  ))}
                </div>
              </div>

              {/* Business Card Preview */}
              <div className={`relative bg-gradient-to-br ${businessCardData.colors.find(c => c.name === currentColor)?.value} rounded-3xl p-8 text-white shadow-2xl overflow-hidden ${
                currentView === 'mobile' ? 'max-w-sm mx-auto' : 
                currentView === 'tablet' ? 'max-w-md mx-auto' : 
                'w-full'
              }`}>
                
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    backgroundSize: '30px 30px'
                  }}></div>
                </div>

                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-black mb-2">{businessCardData.contactInfo.name}</h3>
                      <p className="text-blue-100 font-medium">{businessCardData.contactInfo.position}</p>
                    </div>
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                      <PiBuilding className="text-2xl" />
                    </div>
                  </div>

                  {/* Company Info */}
                  <div className="mb-6">
                    <h4 className="text-lg font-bold mb-2">{businessCardData.contactInfo.company}</h4>
                    <p className="text-blue-100 text-sm">{businessCardData.contactInfo.address}</p>
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <PiPhone className="text-blue-200" />
                      <span className="text-sm">{businessCardData.contactInfo.phone}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <PiEnvelope className="text-blue-200" />
                      <span className="text-sm">{businessCardData.contactInfo.email}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <PiGlobe className="text-blue-200" />
                      <span className="text-sm">{businessCardData.contactInfo.website}</span>
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="flex gap-3 mt-6 pt-6 border-t border-white/20">
                    <PiLinkedinLogo className="text-white/80 hover:text-white cursor-pointer transition-colors duration-300" />
                    <PiInstagramLogo className="text-white/80 hover:text-white cursor-pointer transition-colors duration-300" />
                    <PiTwitterLogo className="text-white/80 hover:text-white cursor-pointer transition-colors duration-300" />
                    <PiWhatsappLogo className="text-white/80 hover:text-white cursor-pointer transition-colors duration-300" />
                  </div>

                  {/* QR Code */}
                  <div className="absolute bottom-4 left-4 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <PiQrCode className="text-white" />
                  </div>
                </div>
              </div>

              {/* Customization Controls */}
              <div className="mt-8">
                <h3 className="text-xl font-black text-gray-800 mb-4">سفارشی‌سازی رنگ</h3>
                <div className="flex gap-3">
                  {businessCardData.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setCurrentColor(color.name)}
                      className={`w-10 h-10 ${color.bg} rounded-xl shadow-lg transition-all duration-300 hover:scale-110 ${
                        currentColor === color.name ? 'ring-2 ring-offset-2 ring-gray-800' : ''
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <button
                onClick={handleDownload}
                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white py-4 rounded-2xl font-bold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
              >
                <PiDownload className="text-xl" />
                <span>دانلود نمونه</span>
              </button>
              
              <button
                onClick={handleShare}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white py-4 rounded-2xl font-bold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
              >
                <PiShareNetwork className="text-xl" />
                <span>اشتراک‌گذاری</span>
              </button>
              
              <button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-4 rounded-2xl font-bold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-3">
                <PiRocket className="text-xl" />
                <span>سفارش Now</span>
              </button>
            </div>
          </div>

          {/* Right Column - Details & Info */}
          <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            
            {/* Template Info */}
            <div className="bg-white/90 backdrop-blur-xl rounded-4xl p-8 shadow-3xl border border-white/60 mb-8">
              {/* Header Badges */}
              <div className="flex items-center gap-3 mb-6">
                <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-4 py-2 rounded-2xl text-sm font-bold shadow-lg flex items-center gap-2">
                  <PiCrown className="text-sm" />
                  {businessCardData.badge}
                </span>
                <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-2xl text-sm font-bold shadow-lg">
                  {businessCardData.category}
                </span>
              </div>

              {/* Price & Rating */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="text-3xl font-black text-gray-800">{businessCardData.price}</div>
                  {businessCardData.oldPrice && (
                    <div className="text-xl text-gray-400 line-through">{businessCardData.oldPrice}</div>
                  )}
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {renderStars(businessCardData.rating)}
                  </div>
                  <span className="text-gray-600 font-bold">({businessCardData.reviews})</span>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-4 text-center border border-blue-100">
                  <div className="text-2xl font-black text-gray-800 mb-1">{businessCardData.stats.views}</div>
                  <div className="text-sm text-gray-600">بازدید</div>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-4 text-center border border-green-100">
                  <div className="text-2xl font-black text-gray-800 mb-1">{businessCardData.stats.sales}</div>
                  <div className="text-sm text-gray-600">فروش</div>
                </div>
              </div>

              {/* Features */}
              <div className="mb-6">
                <h3 className="text-xl font-black text-gray-800 mb-4">امکانات و قابلیت‌ها</h3>
                <div className="grid grid-cols-2 gap-3">
                  {businessCardData.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3 text-gray-700">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white shadow-lg">
                        <PiCheckCircle className="text-sm" />
                      </div>
                      <span className="text-sm font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Info Copy */}
              <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-3xl p-6 border border-gray-200">
                <h3 className="text-lg font-black text-gray-800 mb-4">اطلاعات تماس</h3>
                <div className="space-y-3">
                  {Object.entries(businessCardData.contactInfo).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-gray-600">
                        {key === 'name' && <PiUser className="text-lg" />}
                        {key === 'position' && <PiBuilding className="text-lg" />}
                        {key === 'phone' && <PiPhone className="text-lg" />}
                        {key === 'email' && <PiEnvelope className="text-lg" />}
                        {key === 'website' && <PiGlobe className="text-lg" />}
                        {key === 'address' && <PiMapPin className="text-lg" />}
                        <span className="text-sm font-medium">{value}</span>
                      </div>
                      <button
                        onClick={() => copyToClipboard(value, key)}
                        className="p-2 bg-white/80 backdrop-blur-sm rounded-xl text-gray-600 hover:text-blue-600 transition-all duration-300 hover:scale-110 border border-white/40"
                      >
                        {copiedField === key ? <PiCheckCircle className="text-green-500" /> : <PiCopy className="text-lg" />}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-4xl p-8 text-white shadow-3xl">
              <div className="text-center">
                <PiShieldCheck className="text-4xl mx-auto mb-4 text-white/80" />
                <h3 className="text-2xl font-black mb-4">ضمانت کیفیت و پشتیبانی</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <PiCheckCircle className="text-green-300" />
                    <span>پشتیبانی ۲۴/۷</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <PiCheckCircle className="text-green-300" />
                    <span>ضمانت بازگشت وجه</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <PiCheckCircle className="text-green-300" />
                    <span>آپدیت رایگان</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <PiCheckCircle className="text-green-300" />
                    <span>نصب و راه‌اندازی</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Templates */}
        <div className={`mt-16 transition-all duration-1000 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="text-3xl font-black text-gray-800 mb-8 text-center">قالب‌های مشابه</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {similarTemplates.map((template) => (
              <div key={template.id} className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 border border-white/40 cursor-pointer">
                <img 
                  src={template.image} 
                  alt={template.title}
                  className="w-full h-32 object-cover rounded-2xl mb-4"
                />
                <h3 className="text-lg font-black text-gray-800 mb-2">{template.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{template.description}</p>
                <div className="flex items-center justify-between">
                  <div className="text-lg font-black text-gray-800">{template.price}</div>
                  <div className="flex items-center gap-1">
                    {renderStars(template.rating)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

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
        .rounded-4xl {
          border-radius: 2.5rem;
        }
        .shadow-3xl {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }
      `}</style>
    </div>
  );
};

export default BusinessCardPage;