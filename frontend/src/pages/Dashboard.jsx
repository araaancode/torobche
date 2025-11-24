import React, { useState, useMemo, useCallback } from 'react';
import { 
  PiUser, 
  PiEnvelope, 
  PiPhone, 
  PiMapPin, 
  PiCamera, 
  PiCheckCircle, 
  PiPencil, 
  PiShieldCheck, 
  PiCreditCard, 
  PiBell, 
  PiLock, 
  PiGlobe, 
  PiTrash,
  PiQrCode,
  PiChartLine,
  PiCalendar,
  PiStar,
  PiCrown,
  PiSparkle
} from 'react-icons/pi';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    // Personal Information
    name: 'علی رضایی',
    email: 'ali.rezaei@example.com',
    phone: '۰۹۱۲XXX XXXX',
    location: 'تهران، جردن',
    bio: 'توسعه‌دهنده ارشد فرانت‌اند با ۸+ سال تجربه در زمینه طراحی و توسعه رابط کاربری',
    
    // Business Information
    businessName: 'شرکت نوآوران فناوری',
    businessType: 'استارتاپ فناوری',
    website: 'www.techinnovators.com',
    industry: 'نرم‌افزار و فناوری',
    
    // Subscription
    plan: 'حرفه‌ای',
    planExpiry: '۱۴۰۳/۰۲/۱۵',
    cardsCreated: '۴۲',
    qrScans: '۱,۲۴۷',
    
    // Stats
    profileViews: '۲,۸۴۱',
    customerRating: '۴.۹',
    responseTime: '۲ ساعت'
  });

  const [tempData, setTempData] = useState({});

  const handleEdit = useCallback(() => {
    setTempData(profileData);
    setIsEditing(true);
  }, [profileData]);

  const handleSave = useCallback(() => {
    setProfileData(tempData);
    setIsEditing(false);
  }, [tempData]);

  const handleCancel = useCallback(() => {
    setIsEditing(false);
    setTempData({});
  }, []);

  const handleInputChange = useCallback((field, value) => {
    setTempData(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  const tabs = useMemo(() => [
    { id: 'personal', name: 'اطلاعات شخصی', icon: <PiUser className="text-lg" /> },
    { id: 'business', name: 'اطلاعات کسب‌وکار', icon: <PiShieldCheck className="text-lg" /> },
    { id: 'subscription', name: 'اشتراک و آمار', icon: <PiCrown className="text-lg" /> },
    { id: 'settings', name: 'تنظیمات', icon: <PiBell className="text-lg" /> }
  ], []);

  const stats = useMemo(() => [
    { label: 'بازدید پروفایل', value: profileData.profileViews, icon: <PiChartLine className="text-blue-500" /> },
    { label: 'امتیاز کاربران', value: profileData.customerRating, icon: <PiStar className="text-yellow-500" /> },
    { label: 'زمان پاسخگویی', value: profileData.responseTime, icon: <PiCalendar className="text-green-500" /> }
  ], [profileData]);

  const renderPersonalInfo = () => (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
        <div className="relative">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-xl">
            {profileData.name.split(' ').map(n => n[0]).join('')}
          </div>
          <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-lg border border-gray-200 dark:border-gray-600 hover:scale-110 transition-transform duration-200">
            <PiCamera className="text-gray-600 dark:text-gray-400 text-sm" />
          </button>
        </div>
        
        <div className="flex-1 text-right">
          <h2 className="text-2xl font-black text-gray-800 dark:text-white mb-2">
            {isEditing ? (
              <input
                type="text"
                value={tempData.name || profileData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm rounded-xl px-3 py-2 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full max-w-md"
              />
            ) : (
              profileData.name
            )}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-3">
            {isEditing ? (
              <textarea
                value={tempData.bio || profileData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                className="bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm rounded-xl px-3 py-2 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full max-w-md resize-none"
                rows="2"
              />
            ) : (
              profileData.bio
            )}
          </p>
          <div className="flex items-center gap-3 flex-wrap">
            <span className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
              <PiCheckCircle className="text-sm" />
              تأیید شده
            </span>
            <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
              <PiSparkle className="text-sm" />
              کاربر فعال
            </span>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-white/30 dark:border-gray-700 shadow-lg">
        <h3 className="text-lg font-black text-gray-800 dark:text-white mb-4 flex items-center gap-2">
          <PiEnvelope className="text-blue-500" />
          اطلاعات تماس
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3 p-3 bg-gray-50/80 dark:bg-gray-700/80 rounded-xl">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
              <PiEnvelope className="text-blue-500 text-lg" />
            </div>
            <div className="flex-1 text-right">
              <div className="text-sm text-gray-600 dark:text-gray-400">ایمیل</div>
              {isEditing ? (
                <input
                  type="email"
                  value={tempData.email || profileData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="bg-transparent border-none focus:outline-none w-full text-gray-800 dark:text-white"
                />
              ) : (
                <div className="font-medium text-gray-800 dark:text-white">{profileData.email}</div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-gray-50/80 dark:bg-gray-700/80 rounded-xl">
            <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
              <PiPhone className="text-green-500 text-lg" />
            </div>
            <div className="flex-1 text-right">
              <div className="text-sm text-gray-600 dark:text-gray-400">تلفن</div>
              {isEditing ? (
                <input
                  type="tel"
                  value={tempData.phone || profileData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="bg-transparent border-none focus:outline-none w-full text-gray-800 dark:text-white"
                />
              ) : (
                <div className="font-medium text-gray-800 dark:text-white">{profileData.phone}</div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-gray-50/80 dark:bg-gray-700/80 rounded-xl">
            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
              <PiMapPin className="text-purple-500 text-lg" />
            </div>
            <div className="flex-1 text-right">
              <div className="text-sm text-gray-600 dark:text-gray-400">موقعیت</div>
              {isEditing ? (
                <input
                  type="text"
                  value={tempData.location || profileData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  className="bg-transparent border-none focus:outline-none w-full text-gray-800 dark:text-white"
                />
              ) : (
                <div className="font-medium text-gray-800 dark:text-white">{profileData.location}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderBusinessInfo = () => (
    <div className="space-y-6">
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-white/30 dark:border-gray-700 shadow-lg">
        <h3 className="text-lg font-black text-gray-800 dark:text-white mb-4 flex items-center gap-2">
          <PiShieldCheck className="text-green-500" />
          اطلاعات کسب‌وکار
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3 p-3 bg-gray-50/80 dark:bg-gray-700/80 rounded-xl">
            <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center">
              <PiUser className="text-orange-500 text-lg" />
            </div>
            <div className="flex-1 text-right">
              <div className="text-sm text-gray-600 dark:text-gray-400">نام کسب‌وکار</div>
              {isEditing ? (
                <input
                  type="text"
                  value={tempData.businessName || profileData.businessName}
                  onChange={(e) => handleInputChange('businessName', e.target.value)}
                  className="bg-transparent border-none focus:outline-none w-full text-gray-800 dark:text-white"
                />
              ) : (
                <div className="font-medium text-gray-800 dark:text-white">{profileData.businessName}</div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-gray-50/80 dark:bg-gray-700/80 rounded-xl">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
              <PiGlobe className="text-blue-500 text-lg" />
            </div>
            <div className="flex-1 text-right">
              <div className="text-sm text-gray-600 dark:text-gray-400">وبسایت</div>
              {isEditing ? (
                <input
                  type="url"
                  value={tempData.website || profileData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  className="bg-transparent border-none focus:outline-none w-full text-gray-800 dark:text-white"
                />
              ) : (
                <div className="font-medium text-gray-800 dark:text-white">{profileData.website}</div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-gray-50/80 dark:bg-gray-700/80 rounded-xl">
            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
              <PiCreditCard className="text-purple-500 text-lg" />
            </div>
            <div className="flex-1 text-right">
              <div className="text-sm text-gray-600 dark:text-gray-400">صنعت</div>
              {isEditing ? (
                <input
                  type="text"
                  value={tempData.industry || profileData.industry}
                  onChange={(e) => handleInputChange('industry', e.target.value)}
                  className="bg-transparent border-none focus:outline-none w-full text-gray-800 dark:text-white"
                />
              ) : (
                <div className="font-medium text-gray-800 dark:text-white">{profileData.industry}</div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-gray-50/80 dark:bg-gray-700/80 rounded-xl">
            <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
              <PiCheckCircle className="text-green-500 text-lg" />
            </div>
            <div className="flex-1 text-right">
              <div className="text-sm text-gray-600 dark:text-gray-400">نوع کسب‌وکار</div>
              {isEditing ? (
                <input
                  type="text"
                  value={tempData.businessType || profileData.businessType}
                  onChange={(e) => handleInputChange('businessType', e.target.value)}
                  className="bg-transparent border-none focus:outline-none w-full text-gray-800 dark:text-white"
                />
              ) : (
                <div className="font-medium text-gray-800 dark:text-white">{profileData.businessType}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSubscriptionInfo = () => (
    <div className="space-y-6">
      {/* Plan Info */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <PiCrown className="text-2xl text-yellow-300" />
            <h3 className="text-xl font-black">اشتراک {profileData.plan}</h3>
          </div>
          <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold">
            فعال
          </span>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-black">{profileData.cardsCreated}</div>
            <div className="text-blue-100 text-sm">کارت ساخته شده</div>
          </div>
          <div>
            <div className="text-2xl font-black">{profileData.qrScans}</div>
            <div className="text-blue-100 text-sm">اسکن QR کد</div>
          </div>
          <div>
            <div className="text-2xl font-black">{profileData.profileViews}</div>
            <div className="text-blue-100 text-sm">بازدید پروفایل</div>
          </div>
          <div>
            <div className="text-2xl font-black">{profileData.customerRating}</div>
            <div className="text-blue-100 text-sm">امتیاز</div>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-white/20">
          <div className="text-sm text-blue-100">تاریخ انقضا: {profileData.planExpiry}</div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-4 border border-white/30 dark:border-gray-700 shadow-lg text-center">
            <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center mx-auto mb-3">
              {stat.icon}
            </div>
            <div className="text-2xl font-black text-gray-800 dark:text-white mb-1">{stat.value}</div>
            <div className="text-gray-600 dark:text-gray-400 text-sm">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-white/30 dark:border-gray-700 shadow-lg">
        <h3 className="text-lg font-black text-gray-800 dark:text-white mb-4">اقدامات سریع</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <button className="bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-xl p-3 transition-colors duration-200 border border-blue-200 dark:border-blue-800">
            <PiQrCode className="text-blue-500 text-xl mx-auto mb-2" />
            <div className="text-sm font-medium text-gray-800 dark:text-white">QR کد من</div>
          </button>
          <button className="bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30 rounded-xl p-3 transition-colors duration-200 border border-green-200 dark:border-green-800">
            <PiChartLine className="text-green-500 text-xl mx-auto mb-2" />
            <div className="text-sm font-medium text-gray-800 dark:text-white">آمار و تحلیل</div>
          </button>
          <button className="bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/30 rounded-xl p-3 transition-colors duration-200 border border-purple-200 dark:border-purple-800">
            <PiCreditCard className="text-purple-500 text-xl mx-auto mb-2" />
            <div className="text-sm font-medium text-gray-800 dark:text-white">ارتقاء اشتراک</div>
          </button>
          <button className="bg-orange-50 dark:bg-orange-900/20 hover:bg-orange-100 dark:hover:bg-orange-900/30 rounded-xl p-3 transition-colors duration-200 border border-orange-200 dark:border-orange-800">
            <PiBell className="text-orange-500 text-xl mx-auto mb-2" />
            <div className="text-sm font-medium text-gray-800 dark:text-white">اعلان‌ها</div>
          </button>
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-white/30 dark:border-gray-700 shadow-lg">
        <h3 className="text-lg font-black text-gray-800 dark:text-white mb-4">تنظیمات حریم خصوصی</h3>
        <div className="space-y-3">
          {[
            { label: 'نمایش پروفایل عمومی', description: 'اجازه دهید دیگران پروفایل شما را ببینند', enabled: true },
            { label: 'نمایش اطلاعات تماس', description: 'شماره تلفن و ایمیل شما قابل مشاهده باشد', enabled: true },
            { label: 'نمایش آمار', description: 'آمار بازدید و فعالیت‌های شما نمایش داده شود', enabled: false },
            { label: 'دریافت اعلان‌ها', description: 'اعلان‌های مهم را از طریق ایمیل دریافت کنید', enabled: true }
          ].map((setting, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50/80 dark:bg-gray-700/80 rounded-xl">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${setting.enabled ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                <div className="text-right">
                  <div className="font-medium text-gray-800 dark:text-white">{setting.label}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{setting.description}</div>
                </div>
              </div>
              <button className={`w-12 h-6 rounded-full transition-colors duration-200 ${
                setting.enabled ? 'bg-green-500' : 'bg-gray-400'
              }`}>
                <div className={`w-4 h-4 bg-white rounded-full transition-transform duration-200 ${
                  setting.enabled ? 'transform translate-x-7' : 'transform translate-x-1'
                }`}></div>
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-white/30 dark:border-gray-700 shadow-lg">
        <h3 className="text-lg font-black text-red-600 dark:text-red-400 mb-4 flex items-center gap-2">
          <PiTrash className="text-lg" />
          منطقه خطر
        </h3>
        <div className="space-y-3">
          <button className="w-full text-right p-4 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-xl border border-red-200 dark:border-red-800 transition-colors duration-200">
            <div className="font-medium text-red-700 dark:text-red-300">حذف حساب کاربری</div>
            <div className="text-sm text-red-600 dark:text-red-400 mt-1">تمام اطلاعات شما به طور دائمی حذف خواهد شد</div>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <section 
      id="profile" 
      className="min-h-screen relative overflow-hidden pt-20 pb-12 md:pt-28 md:pb-16 bg-gradient-to-br from-gray-50/95 via-blue-50/95 to-purple-50/95 dark:from-gray-900/95 dark:via-blue-900/20 dark:to-purple-900/20 backdrop-blur-sm"
      aria-label="پروفایل کاربری"
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
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight mb-4">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
                پروفایل کاربری
              </span>
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
              مدیریت اطلاعات شخصی، تنظیمات حساب و آمار فعالیت‌ها
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            {/* Tabs */}
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl p-2 shadow-xl border border-white/30 dark:border-gray-700 mb-6">
              <div className="flex flex-wrap gap-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-white/50 dark:hover:bg-gray-700/50'
                    }`}
                  >
                    {tab.icon}
                    {tab.name}
                  </button>
                ))}
                
                {/* Edit/Save Buttons */}
                <div className="flex-1 flex justify-end gap-2">
                  {isEditing ? (
                    <>
                      <button
                        onClick={handleSave}
                        className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-4 py-3 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
                      >
                        <PiCheckCircle className="text-lg" />
                        ذخیره تغییرات
                      </button>
                      <button
                        onClick={handleCancel}
                        className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-3 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
                      >
                        انصراف
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={handleEdit}
                      className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white px-4 py-3 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
                    >
                      <PiPencil className="text-lg" />
                      ویرایش پروفایل
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/30 dark:border-gray-700">
              {activeTab === 'personal' && renderPersonalInfo()}
              {activeTab === 'business' && renderBusinessInfo()}
              {activeTab === 'subscription' && renderSubscriptionInfo()}
              {activeTab === 'settings' && renderSettings()}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;