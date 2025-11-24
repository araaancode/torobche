import React, { useState, useMemo, useCallback } from 'react';
import { 
  PiFloppyDisk,
  PiEye,
  PiQrCode,
  PiUpload,
  PiTextbox,
  PiUser,
  PiEnvelope,
  PiPhone,
  PiMapPin,
  PiBuilding,
  PiGlobe,
  PiInstagramLogo,
  PiLinkedinLogo,
  PiTwitterLogo,
  PiPalette,
  PiImage,
  PiCamera,
  PiCheckCircle,
  PiSparkle,
  PiCrown,
  PiMagicWand,
  PiCopy,
  PiShareNetwork,
  PiDownload
} from 'react-icons/pi';

const BusinessCardEditor = () => {
  const [activeTab, setActiveTab] = useState('info');
  const [cardData, setCardData] = useState({
    // اطلاعات شخصی
    fullName: 'علی محمدی',
    jobTitle: 'مدیر عامل',
    company: 'شرکت نوآوران فناوری',
    email: 'ali.mohammadi@example.com',
    phone: '۰۹۱۲XXX XXXX',
    address: 'تهران، خیابان ولیعصر',
    website: 'www.example.com',
    
    // شبکه‌های اجتماعی
    social: {
      instagram: '@alimohammadi',
      linkedin: 'linkedin.com/in/alimohammadi',
      twitter: '@alimohammadi'
    },
    
    // طراحی
    theme: 'blue',
    layout: 'modern',
    profileImage: null
  });

  const themes = useMemo(() => [
    { id: 'blue', name: 'آبی حرفه‌ای', color: 'from-blue-500 to-cyan-500', bg: 'bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20' },
    { id: 'green', name: 'سبز طبیعی', color: 'from-green-500 to-emerald-500', bg: 'bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20' },
    { id: 'purple', name: 'بنفش خلاقانه', color: 'from-purple-500 to-pink-500', bg: 'bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20' },
    { id: 'orange', name: 'نارنجی انرژی', color: 'from-orange-500 to-amber-500', bg: 'bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20' },
    { id: 'gray', name: 'خاکستری مدرن', color: 'from-gray-600 to-gray-700', bg: 'bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900' }
  ], []);

  const CTAButton = ({ 
    children, 
    icon, 
    variant = "primary", 
    className = "",
    onClick,
    ...props 
  }) => {
    const [isHovered, setIsHovered] = useState(false);

    const baseStyles = "group px-6 py-3 rounded-2xl font-bold transition-all duration-300 ease-out flex items-center justify-center space-x-2 rtl:space-x-reverse focus:outline-none focus:ring-2 focus:ring-offset-2 backdrop-blur-sm";
    
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

  const updateField = useCallback((field, value) => {
    setCardData(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  const updateSocial = useCallback((platform, value) => {
    setCardData(prev => ({
      ...prev,
      social: {
        ...prev.social,
        [platform]: value
      }
    }));
  }, []);

  const CardPreview = () => {
    const currentTheme = themes.find(t => t.id === cardData.theme) || themes[0];
    
    return (
      <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/30 dark:border-gray-700">
        <div className={`bg-gradient-to-r ${currentTheme.color} rounded-3xl p-6 text-white shadow-2xl`}>
          {/* Header */}
          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/30">
              {cardData.profileImage ? (
                <img 
                  src={cardData.profileImage} 
                  alt="Profile" 
                  className="w-full h-full rounded-2xl object-cover"
                />
              ) : (
                <PiUser className="text-white text-2xl" />
              )}
            </div>
            <h2 className="text-2xl font-black mb-2">{cardData.fullName}</h2>
            <p className="text-white/80 font-medium">{cardData.jobTitle}</p>
            <p className="text-white/70 text-sm">{cardData.company}</p>
          </div>

          {/* Contact Info */}
          <div className="space-y-3 mb-6">
            <div className="flex items-center space-x-3 rtl:space-x-reverse bg-white/10 rounded-2xl p-3 backdrop-blur-sm">
              <PiEnvelope className="text-white/80 text-lg" />
              <span className="text-white/90 text-sm">{cardData.email}</span>
            </div>
            <div className="flex items-center space-x-3 rtl:space-x-reverse bg-white/10 rounded-2xl p-3 backdrop-blur-sm">
              <PiPhone className="text-white/80 text-lg" />
              <span className="text-white/90 text-sm">{cardData.phone}</span>
            </div>
            <div className="flex items-center space-x-3 rtl:space-x-reverse bg-white/10 rounded-2xl p-3 backdrop-blur-sm">
              <PiMapPin className="text-white/80 text-lg" />
              <span className="text-white/90 text-sm">{cardData.address}</span>
            </div>
            <div className="flex items-center space-x-3 rtl:space-x-reverse bg-white/10 rounded-2xl p-3 backdrop-blur-sm">
              <PiGlobe className="text-white/80 text-lg" />
              <span className="text-white/90 text-sm">{cardData.website}</span>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-4 rtl:space-x-reverse border-t border-white/20 pt-4">
            {cardData.social.instagram && (
              <button className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center hover:bg-white/30 transition-all duration-300 backdrop-blur-sm border border-white/30">
                <PiInstagramLogo className="text-white text-lg" />
              </button>
            )}
            {cardData.social.linkedin && (
              <button className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center hover:bg-white/30 transition-all duration-300 backdrop-blur-sm border border-white/30">
                <PiLinkedinLogo className="text-white text-lg" />
              </button>
            )}
            {cardData.social.twitter && (
              <button className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center hover:bg-white/30 transition-all duration-300 backdrop-blur-sm border border-white/30">
                <PiTwitterLogo className="text-white text-lg" />
              </button>
            )}
          </div>

          {/* QR Code */}
          <div className="text-center mt-4">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto border border-white/30">
              <PiQrCode className="text-gray-700 text-xl" />
            </div>
            <p className="text-white/70 text-xs mt-2">اسکن برای اطلاعات بیشتر</p>
          </div>
        </div>
      </div>
    );
  };

  const handleImageUpload = useCallback((event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        updateField('profileImage', e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }, [updateField]);

  const tabs = useMemo(() => [
    { id: 'info', name: 'اطلاعات', icon: <PiUser className="text-lg" /> },
    { id: 'social', name: 'شبکه‌های اجتماعی', icon: <PiInstagramLogo className="text-lg" /> },
    { id: 'design', name: 'طراحی', icon: <PiPalette className="text-lg" /> }
  ], []);

  return (
    <section 
      id="business-card-editor" 
      className="min-h-screen relative overflow-hidden pt-20 pb-12 md:pt-28 md:pb-16 bg-gradient-to-br from-gray-50/95 via-blue-50/95 to-purple-50/95 dark:from-gray-900/95 dark:via-blue-900/20 dark:to-purple-900/20 backdrop-blur-sm"
      aria-label="ویرایشگر کارت ویزیت دیجیتال"
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
          {/* Header */}
          <div className="text-center mb-12">
            {/* Premium Badge */}
            <div 
              className="inline-flex items-center space-x-2 rtl:space-x-reverse bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl px-4 py-2 mb-6 shadow-xl border border-white/30 dark:border-gray-700"
              role="status"
              aria-label="ویرایشگر پیشرفته کارت ویزیت"
            >
              <div className="flex items-center space-x-1 rtl:space-x-reverse">
                <PiCrown className="text-yellow-500 text-base" aria-hidden="true" />
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full backdrop-blur-sm" aria-hidden="true" />
              </div>
              <span className="text-xs font-black text-gray-800 dark:text-gray-200 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                ویرایشگر پیشرفته کارت ویزیت
              </span>
              <PiSparkle className="text-purple-500 text-base" aria-hidden="true" />
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight mb-4">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
                ویرایشگر کارت ویزیت
              </span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              کارت ویزیت دیجیتال خود را به صورت زنده ویرایش و شخصی‌سازی کنید
            </p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Editor Panel */}
            <div className="xl:col-span-2">
              <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/30 dark:border-gray-700">
                {/* Tabs */}
                <div className="flex space-x-4 rtl:space-x-reverse mb-6 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm rounded-2xl p-1">
                  {tabs.map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-1 py-3 rounded-2xl font-bold transition-all duration-300 flex items-center justify-center space-x-2 rtl:space-x-reverse ${
                        activeTab === tab.id
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                          : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white'
                      }`}
                    >
                      {tab.icon}
                      <span>{tab.name}</span>
                    </button>
                  ))}
                </div>

                {/* Personal Info Tab */}
                {activeTab === 'info' && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-black text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                      <PiUser className="text-blue-500" />
                      اطلاعات شخصی
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { field: 'fullName', label: 'نام کامل', placeholder: 'نام و نام خانوادگی', icon: <PiUser /> },
                        { field: 'jobTitle', label: 'عنوان شغلی', placeholder: 'مثلاً: مدیر عامل', icon: <PiBuilding /> },
                        { field: 'company', label: 'شرکت', placeholder: 'نام شرکت یا سازمان', icon: <PiBuilding /> },
                        { field: 'email', label: 'ایمیل', placeholder: 'example@email.com', icon: <PiEnvelope /> },
                        { field: 'phone', label: 'تلفن', placeholder: '۰۹۱۲XXX XXXX', icon: <PiPhone /> },
                        { field: 'address', label: 'آدرس', placeholder: 'آدرس محل کار', icon: <PiMapPin /> },
                      ].map(({ field, label, placeholder, icon }) => (
                        <div key={field}>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                            {icon}
                            {label}
                          </label>
                          <input
                            type="text"
                            value={cardData[field]}
                            onChange={(e) => updateField(field, e.target.value)}
                            className="w-full bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm rounded-2xl px-4 py-3 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-300 dark:border-gray-600"
                            placeholder={placeholder}
                          />
                        </div>
                      ))}
                      
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                          <PiGlobe className="text-green-500" />
                          وبسایت
                        </label>
                        <input
                          type="url"
                          value={cardData.website}
                          onChange={(e) => updateField('website', e.target.value)}
                          className="w-full bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm rounded-2xl px-4 py-3 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-300 dark:border-gray-600"
                          placeholder="www.example.com"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Social Media Tab */}
                {activeTab === 'social' && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-black text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                      <PiShareNetwork className="text-purple-500" />
                      شبکه‌های اجتماعی
                    </h3>
                    
                    <div className="space-y-4">
                      {[
                        { platform: 'instagram', label: 'اینستاگرام', icon: <PiInstagramLogo className="text-pink-500" />, placeholder: '@username' },
                        { platform: 'linkedin', label: 'لینکدین', icon: <PiLinkedinLogo className="text-blue-600" />, placeholder: 'linkedin.com/in/username' },
                        { platform: 'twitter', label: 'توییتر', icon: <PiTwitterLogo className="text-blue-400" />, placeholder: '@username' }
                      ].map(({ platform, label, icon, placeholder }) => (
                        <div key={platform}>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                            {icon}
                            <span>{label}</span>
                          </label>
                          <input
                            type="text"
                            value={cardData.social[platform]}
                            onChange={(e) => updateSocial(platform, e.target.value)}
                            className="w-full bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm rounded-2xl px-4 py-3 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-300 dark:border-gray-600"
                            placeholder={placeholder}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Design Tab */}
                {activeTab === 'design' && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-black text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                      <PiPalette className="text-orange-500" />
                      طراحی و ظاهر
                    </h3>
                    
                    {/* Theme Selection */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">انتخاب تم رنگی</label>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                        {themes.map(theme => (
                          <button
                            key={theme.id}
                            onClick={() => updateField('theme', theme.id)}
                            className={`aspect-square rounded-2xl bg-gradient-to-r ${theme.color} transition-all duration-300 backdrop-blur-sm border ${
                              cardData.theme === theme.id 
                                ? 'ring-4 ring-blue-500 ring-offset-2 transform scale-105 border-white' 
                                : 'border-gray-300 dark:border-gray-600 hover:scale-105'
                            }`}
                            title={theme.name}
                          />
                        ))}
                      </div>
                    </div>
                    
                    {/* Profile Image Upload */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">آپلود عکس پروفایل</label>
                      <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-2xl p-8 text-center hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-300 cursor-pointer bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm">
                        <PiCamera className="text-gray-400 dark:text-gray-500 text-3xl mx-auto mb-3" />
                        <p className="text-gray-600 dark:text-gray-400 mb-2">عکس خود را اینجا رها کنید یا برای انتخاب کلیک کنید</p>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                          id="profile-image-upload"
                        />
                        <label 
                          htmlFor="profile-image-upload"
                          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-2xl font-bold transition-all duration-300 hover:from-blue-700 hover:to-purple-700 cursor-pointer inline-block"
                        >
                          انتخاب عکس
                        </label>
                      </div>
                    </div>

                    {/* Layout Options */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">سبک طراحی</label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          onClick={() => updateField('layout', 'modern')}
                          className={`p-4 rounded-2xl border-2 transition-all duration-300 backdrop-blur-sm ${
                            cardData.layout === 'modern'
                              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 ring-2 ring-blue-200 dark:ring-blue-800'
                              : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                          }`}
                        >
                          <div className="text-center">
                            <PiTextbox className="text-blue-500 text-xl mx-auto mb-2" />
                            <span className="text-sm font-medium text-gray-800 dark:text-white">مدرن</span>
                          </div>
                        </button>
                        <button
                          onClick={() => updateField('layout', 'classic')}
                          className={`p-4 rounded-2xl border-2 transition-all duration-300 backdrop-blur-sm ${
                            cardData.layout === 'classic'
                              ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 ring-2 ring-purple-200 dark:ring-purple-800'
                              : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                          }`}
                        >
                          <div className="text-center">
                            <PiBuilding className="text-purple-500 text-xl mx-auto mb-2" />
                            <span className="text-sm font-medium text-gray-800 dark:text-white">کلاسیک</span>
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex space-x-4 rtl:space-x-reverse mt-8 pt-6 border-t border-gray-200/50 dark:border-gray-600/50">
                  <CTAButton
                    icon={<PiEye className="text-xl" />}
                    variant="secondary"
                    className="flex-1"
                  >
                    پیش‌نمایش
                  </CTAButton>
                  <CTAButton
                    icon={<PiFloppyDisk className="text-xl" />}
                    variant="primary"
                    className="flex-1"
                  >
                    ذخیره کارت
                  </CTAButton>
                </div>
              </div>
            </div>

            {/* Preview Panel */}
            <div className="xl:col-span-1">
              <div className="sticky top-32 space-y-6">
                <CardPreview />
                
                {/* QR Code Section */}
                <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/30 dark:border-gray-700">
                  <h3 className="text-lg font-black text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                    <PiQrCode className="text-blue-500" />
                    <span>QR کد کارت</span>
                  </h3>
                  <div className="text-center">
                    <div className="w-32 h-32 bg-white dark:bg-gray-700 rounded-2xl flex items-center justify-center mx-auto mb-4 border-2 border-gray-200 dark:border-gray-600">
                      <PiQrCode className="text-gray-700 dark:text-gray-300 text-4xl" />
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                      اسکن این QR کد برای مشاهده کارت ویزیت دیجیتال
                    </p>
                    <CTAButton
                      icon={<PiDownload className="text-xl" />}
                      variant="primary"
                      className="w-full"
                    >
                      دانلود QR کد
                    </CTAButton>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/30 dark:border-gray-700">
                  <h3 className="text-lg font-black text-gray-800 dark:text-white mb-4">عملیات سریع</h3>
                  <div className="space-y-3">
                    <CTAButton
                      icon={<PiUpload className="text-xl" />}
                      variant="secondary"
                      className="w-full"
                    >
                      اشتراک‌گذاری
                    </CTAButton>
                    <CTAButton
                      icon={<PiImage className="text-xl" />}
                      variant="secondary"
                      className="w-full"
                    >
                      دانلود تصویر
                    </CTAButton>
                    <CTAButton
                      icon={<PiCheckCircle className="text-xl" />}
                      variant="primary"
                      className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                    >
                      انتشار کارت
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

export default BusinessCardEditor;