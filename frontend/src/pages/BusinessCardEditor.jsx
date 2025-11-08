import React, { useState } from 'react';
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
  PiCheckCircle
} from 'react-icons/pi';

const BusinessCardEditor = () => {
  const [activeTab, setActiveTab] = useState('info');
  const [cardData, setCardData] = useState({
    // اطلاعات شخصی
    fullName: 'علی محمدی',
    jobTitle: 'مدیر عامل',
    company: 'شرکت نوآوران فناوری',
    email: 'ali.mohammadi@example.com',
    phone: '09123456789',
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
    layout: 'modern'
  });

  const themes = [
    { id: 'blue', name: 'آبی حرفه‌ای', color: 'from-blue-500 to-cyan-500' },
    { id: 'green', name: 'سبز طبیعی', color: 'from-green-500 to-emerald-500' },
    { id: 'purple', name: 'بنفش خلاقانه', color: 'from-purple-500 to-pink-500' },
    { id: 'orange', name: 'نارنجی انرژی', color: 'from-orange-500 to-amber-500' },
    { id: 'gray', name: 'خاکستری مدرن', color: 'from-gray-600 to-gray-700' }
  ];

  const updateField = (field, value) => {
    setCardData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const updateSocial = (platform, value) => {
    setCardData(prev => ({
      ...prev,
      social: {
        ...prev.social,
        [platform]: value
      }
    }));
  };

  const CardPreview = () => (
    <div className="glass-card rounded-3xl p-8 shadow-2xl border border-white/20 max-w-md mx-auto">
      <div className={`bg-gradient-to-r ${themes.find(t => t.id === cardData.theme)?.color} rounded-3xl p-6 text-white shadow-2xl`}>
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <PiUser className="text-white text-2xl" />
          </div>
          <h2 className="text-2xl font-black mb-2">{cardData.fullName}</h2>
          <p className="text-white/80 font-medium">{cardData.jobTitle}</p>
          <p className="text-white/70 text-sm">{cardData.company}</p>
        </div>

        {/* Contact Info */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <PiEnvelope className="text-white/80 text-lg" />
            <span className="text-white/90 text-sm">{cardData.email}</span>
          </div>
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <PiPhone className="text-white/80 text-lg" />
            <span className="text-white/90 text-sm">{cardData.phone}</span>
          </div>
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <PiMapPin className="text-white/80 text-lg" />
            <span className="text-white/90 text-sm">{cardData.address}</span>
          </div>
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <PiGlobe className="text-white/80 text-lg" />
            <span className="text-white/90 text-sm">{cardData.website}</span>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex justify-center space-x-4 rtl:space-x-reverse border-t border-white/20 pt-4">
          {cardData.social.instagram && (
            <button className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center hover:bg-white/30 transition-all duration-300">
              <PiInstagramLogo className="text-white text-lg" />
            </button>
          )}
          {cardData.social.linkedin && (
            <button className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center hover:bg-white/30 transition-all duration-300">
              <PiLinkedinLogo className="text-white text-lg" />
            </button>
          )}
          {cardData.social.twitter && (
            <button className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center hover:bg-white/30 transition-all duration-300">
              <PiTwitterLogo className="text-white text-lg" />
            </button>
          )}
        </div>

        {/* QR Code */}
        <div className="text-center mt-4">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto">
            <PiQrCode className="text-gray-700 text-xl" />
          </div>
          <p className="text-white/70 text-xs mt-2">اسکن برای اطلاعات بیشتر</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-300 rounded-full blur-3xl opacity-20 floating"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-300 rounded-full blur-3xl opacity-20 floating" style={{animationDelay: '1.5s'}}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="pt-32 pb-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              ویرایشگر کارت ویزیت
            </h1>
            <p className="text-gray-600 text-lg">
              کارت ویزیت دیجیتال خود را به صورت زنده ویرایش و شخصی‌سازی کنید
            </p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Editor Panel */}
            <div className="xl:col-span-2">
              <div className="glass-card rounded-3xl p-6 shadow-2xl border border-white/20 backdrop-blur-xl">
                {/* Tabs */}
                <div className="flex space-x-4 rtl:space-x-reverse mb-6 bg-white/50 rounded-2xl p-1">
                  {[
                    { id: 'info', name: 'اطلاعات', icon: <PiUser /> },
                    { id: 'social', name: 'شبکه‌های اجتماعی', icon: <PiInstagramLogo /> },
                    { id: 'design', name: 'طراحی', icon: <PiPalette /> }
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-1 py-3 rounded-2xl font-bold transition-all duration-300 flex items-center justify-center space-x-2 rtl:space-x-reverse ${
                        activeTab === tab.id
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                          : 'text-gray-600 hover:text-gray-800'
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
                    <h3 className="text-xl font-black text-gray-800 mb-4">اطلاعات شخصی</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">نام کامل</label>
                        <input
                          type="text"
                          value={cardData.fullName}
                          onChange={(e) => updateField('fullName', e.target.value)}
                          className="w-full glass-effect rounded-2xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="نام و نام خانوادگی"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">عنوان شغلی</label>
                        <input
                          type="text"
                          value={cardData.jobTitle}
                          onChange={(e) => updateField('jobTitle', e.target.value)}
                          className="w-full glass-effect rounded-2xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="مثلاً: مدیر عامل"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">شرکت</label>
                        <input
                          type="text"
                          value={cardData.company}
                          onChange={(e) => updateField('company', e.target.value)}
                          className="w-full glass-effect rounded-2xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="نام شرکت یا سازمان"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">ایمیل</label>
                        <input
                          type="email"
                          value={cardData.email}
                          onChange={(e) => updateField('email', e.target.value)}
                          className="w-full glass-effect rounded-2xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="example@email.com"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">تلفن</label>
                        <input
                          type="tel"
                          value={cardData.phone}
                          onChange={(e) => updateField('phone', e.target.value)}
                          className="w-full glass-effect rounded-2xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="09123456789"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">آدرس</label>
                        <input
                          type="text"
                          value={cardData.address}
                          onChange={(e) => updateField('address', e.target.value)}
                          className="w-full glass-effect rounded-2xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="آدرس محل کار"
                        />
                      </div>
                      
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">وبسایت</label>
                        <input
                          type="url"
                          value={cardData.website}
                          onChange={(e) => updateField('website', e.target.value)}
                          className="w-full glass-effect rounded-2xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="www.example.com"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Social Media Tab */}
                {activeTab === 'social' && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-black text-gray-800 mb-4">شبکه‌های اجتماعی</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center space-x-2 rtl:space-x-reverse">
                          <PiInstagramLogo className="text-pink-500" />
                          <span>اینستاگرام</span>
                        </label>
                        <input
                          type="text"
                          value={cardData.social.instagram}
                          onChange={(e) => updateSocial('instagram', e.target.value)}
                          className="w-full glass-effect rounded-2xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-500"
                          placeholder="@username"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center space-x-2 rtl:space-x-reverse">
                          <PiLinkedinLogo className="text-blue-600" />
                          <span>لینکدین</span>
                        </label>
                        <input
                          type="text"
                          value={cardData.social.linkedin}
                          onChange={(e) => updateSocial('linkedin', e.target.value)}
                          className="w-full glass-effect rounded-2xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="linkedin.com/in/username"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center space-x-2 rtl:space-x-reverse">
                          <PiTwitterLogo className="text-blue-400" />
                          <span>توییتر</span>
                        </label>
                        <input
                          type="text"
                          value={cardData.social.twitter}
                          onChange={(e) => updateSocial('twitter', e.target.value)}
                          className="w-full glass-effect rounded-2xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                          placeholder="@username"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Design Tab */}
                {activeTab === 'design' && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-black text-gray-800 mb-4">طراحی و ظاهر</h3>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-4">انتخاب تم رنگی</label>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                        {themes.map(theme => (
                          <button
                            key={theme.id}
                            onClick={() => updateField('theme', theme.id)}
                            className={`aspect-square rounded-2xl bg-gradient-to-r ${theme.color} transition-all duration-300 ${
                              cardData.theme === theme.id 
                                ? 'ring-4 ring-blue-500 ring-offset-2 transform scale-105' 
                                : 'hover:scale-105'
                            }`}
                            title={theme.name}
                          />
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-4">آپلود عکس پروفایل</label>
                      <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-gray-400 transition-all duration-300 cursor-pointer">
                        <PiCamera className="text-gray-400 text-3xl mx-auto mb-3" />
                        <p className="text-gray-600 mb-2">عکس خود را اینجا رها کنید یا برای انتخاب کلیک کنید</p>
                        <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-2xl font-bold transition-all duration-300 hover-lift">
                          انتخاب عکس
                        </button>
                      </div>
                    </div>

                    {/* Layout Options */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-4">سبک طراحی</label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          onClick={() => updateField('layout', 'modern')}
                          className={`p-4 rounded-2xl border-2 transition-all duration-300 ${
                            cardData.layout === 'modern'
                              ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="text-center">
                            <PiTextbox className="text-blue-500 text-xl mx-auto mb-2" />
                            <span className="text-sm font-medium">مدرن</span>
                          </div>
                        </button>
                        <button
                          onClick={() => updateField('layout', 'classic')}
                          className={`p-4 rounded-2xl border-2 transition-all duration-300 ${
                            cardData.layout === 'classic'
                              ? 'border-purple-500 bg-purple-50 ring-2 ring-purple-200'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="text-center">
                            <PiBuilding className="text-purple-500 text-xl mx-auto mb-2" />
                            <span className="text-sm font-medium">کلاسیک</span>
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex space-x-4 rtl:space-x-reverse mt-8 pt-6 border-t border-gray-200/50">
                  <button className="flex-1 glass-effect text-gray-700 py-3 rounded-2xl font-bold transition-all duration-300 hover-lift flex items-center justify-center space-x-2 rtl:space-x-reverse">
                    <PiEye className="text-xl" />
                    <span>پیش‌نمایش</span>
                  </button>
                  <button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-2xl font-bold transition-all duration-300 hover-lift shadow-2xl flex items-center justify-center space-x-2 rtl:space-x-reverse">
                    <PiFloppyDisk className="text-xl" />
                    <span>ذخیره کارت</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Preview Panel */}
            <div className="xl:col-span-1">
              <div className="sticky top-32">
                <CardPreview />
                
                {/* QR Code Section */}
                <div className="glass-card rounded-3xl p-6 shadow-2xl border border-white/20 backdrop-blur-xl mt-6">
                  <h3 className="text-lg font-black text-gray-800 mb-4 flex items-center space-x-2 rtl:space-x-reverse">
                    <PiQrCode className="text-blue-500" />
                    <span>QR کد کارت</span>
                  </h3>
                  <div className="text-center">
                    <div className="w-32 h-32 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 border-2 border-gray-200">
                      <PiQrCode className="text-gray-700 text-4xl" />
                    </div>
                    <p className="text-gray-600 text-sm mb-4">
                      اسکن این QR کد برای مشاهده کارت ویزیت دیجیتال
                    </p>
                    <button className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white px-4 py-2 rounded-2xl font-bold transition-all duration-300 hover-lift w-full">
                      دانلود QR کد
                    </button>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="glass-card rounded-3xl p-6 shadow-2xl border border-white/20 backdrop-blur-xl mt-6">
                  <h3 className="text-lg font-black text-gray-800 mb-4">عملیات سریع</h3>
                  <div className="space-y-3">
                    <button className="w-full glass-effect text-gray-700 py-3 rounded-2xl font-bold transition-all duration-300 hover-lift flex items-center justify-center space-x-2 rtl:space-x-reverse">
                      <PiUpload className="text-xl" />
                      <span>اشتراک‌گذاری</span>
                    </button>
                    <button className="w-full glass-effect text-gray-700 py-3 rounded-2xl font-bold transition-all duration-300 hover-lift flex items-center justify-center space-x-2 rtl:space-x-reverse">
                      <PiImage className="text-xl" />
                      <span>دانلود تصویر</span>
                    </button>
                    <button className="w-full glass-effect text-green-600 py-3 rounded-2xl font-bold transition-all duration-300 hover-lift flex items-center justify-center space-x-2 rtl:space-x-reverse border border-green-200">
                      <PiCheckCircle className="text-xl" />
                      <span>انتشار کارت</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessCardEditor;