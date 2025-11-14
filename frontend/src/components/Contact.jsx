import React, { useState, useEffect, useRef } from 'react';
import { 
  PiPhone,
  PiEnvelope,
  PiMapPin,
  PiClock,
  PiWhatsappLogo,
  PiTelegramLogo,
  PiInstagramLogo,
  PiLinkedinLogo,
  PiPaperPlaneTilt,
  PiUser,
  PiBuilding,
  PiChatText,
  PiCheckCircle,
  PiSparkle,
  PiShieldCheck,
  PiStarFill,
  PiCaretRight,
  PiCaretLeft,
  PiPlay,
  PiPause,
  PiCalendar,
  PiClockClockwise,
  PiGear,
  PiHeadset,
  PiShootingStar,
  PiConfetti
} from 'react-icons/pi';

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('form');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentOffice, setCurrentOffice] = useState(0);
  const sectionRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
    service: ''
  });

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

  const contactMethods = [
    {
      icon: <PiPhone className="text-2xl" />,
      title: 'تماس تلفنی',
      info: '۰۲۱-۱۲۳۴۵۶۷۸',
      subtitle: 'پشتیبانی ۲۴/۷',
      color: 'from-green-500 to-emerald-500',
      action: 'tel:+982112345678',
      description: 'همیشه در دسترس برای پاسخگویی'
    },
    {
      icon: <PiWhatsappLogo className="text-2xl" />,
      title: 'واتساپ',
      info: '۰۹۱۲۱۲۳۴۵۶۷',
      subtitle: 'پاسخ سریع',
      color: 'from-green-400 to-teal-500',
      action: 'https://wa.me/989121234567',
      description: 'مکالمه مستقیم با کارشناس'
    },
    {
      icon: <PiEnvelope className="text-2xl" />,
      title: 'ایمیل',
      info: 'info@menudigital.ir',
      subtitle: 'پاسخ در ۲ ساعت',
      color: 'from-blue-500 to-cyan-500',
      action: 'mailto:info@menudigital.ir',
      description: 'ارسال مستندات و پیام‌های طولانی'
    },
    {
      icon: <PiTelegramLogo className="text-2xl" />,
      title: 'تلگرام',
      info: '@menudigital',
      subtitle: 'کانال اطلاع‌رسانی',
      color: 'from-blue-400 to-indigo-500',
      action: 'https://t.me/menudigital',
      description: 'آخرین اخبار و به‌روزرسانی‌ها'
    }
  ];

  const socialMedia = [
    { icon: <PiInstagramLogo className="text-xl" />, name: 'اینستاگرام', color: 'from-pink-500 to-rose-500', link: '#' },
    { icon: <PiLinkedinLogo className="text-xl" />, name: 'لینکدین', color: 'from-blue-600 to-blue-700', link: '#' },
    { icon: <PiTelegramLogo className="text-xl" />, name: 'تلگرام', color: 'from-blue-400 to-indigo-500', link: '#' }
  ];

  const offices = [
    {
      city: 'تهران',
      address: 'خیابان ولیعصر، پلاک ۱۲۳۴، برج تجارت',
      phone: '۰۲۱-۱۲۳۴۵۶۷۸',
      hours: 'شنبه تا چهارشنبه ۸:۰۰ تا ۱۷:۰۰',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    },
    {
      city: 'اصفهان',
      address: 'خیابان چهارباغ، مجتمع تجاری نگین',
      phone: '۰۳۱-۱۲۳۴۵۶۷۸',
      hours: 'شنبه تا چهارشنبه ۸:۰۰ تا ۱۶:۰۰',
      image: 'https://images.unsplash.com/photo-1596727147705-61a532a659bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    },
    {
      city: 'مشهد',
      address: 'بلوار وکیل‌آباد، برج الماس',
      phone: '۰۵۱-۱۲۳۴۵۶۷۸',
      hours: 'شنبه تا چهارشنبه ۸:۰۰ تا ۱۶:۰۰',
      image: 'https://images.unsplash.com/photo-1540910419892-4a36d2c326da?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    }
  ];

  const services = [
    'منوی دیجیتال پایه',
    'منوی دیجیتال پیشرفته',
    'سیستم سفارش آنلاین',
    'پنل مدیریت',
    'پشتیبانی VIP',
    'مشاوره تخصصی'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Form submitted:', formData);
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after success
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        subject: '',
        message: '',
        service: ''
      });
      setIsSubmitted(false);
    }, 5000);
  };

  return (
    <section ref={sectionRef} id="contact" className="relative min-h-screen py-20 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 overflow-hidden">
      
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
              <PiHeadset className="text-blue-500 text-xl animate-pulse" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
            </div>
            <span className="text-base font-black text-gray-800 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              در تماس باشید
            </span>
            <PiStarFill className="text-yellow-500 animate-spin-slow" />
          </div>
          
          <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-6 leading-tight transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient">
              راه‌های ارتباطی
            </span>
            <br />
            با ما
          </h1>
          
          <p className={`text-xl sm:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-medium transition-all duration-1000 delay-400 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            تیم پشتیبانی ما <span className="font-black text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">همیشه آماده</span> پاسخگویی به سوالات و دریافت پیشنهادات شماست
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-20">
          
          {/* Contact Methods Sidebar */}
          <div className="xl:col-span-1">
            <div className={`bg-white/90 backdrop-blur-xl rounded-4xl p-8 shadow-3xl border border-white/60 transition-all duration-1000 delay-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              
              <h3 className="text-2xl font-black text-gray-800 mb-8 text-center">راه‌های ارتباطی</h3>
              
              <div className="space-y-6">
                {contactMethods.map((method, index) => (
                  <a
                    key={index}
                    href={method.action}
                    className="group block"
                  >
                    <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-gray-100">
                      <div className="flex items-start gap-4">
                        <div className={`w-14 h-14 bg-gradient-to-r ${method.color} rounded-2xl flex items-center justify-center text-white shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                          {method.icon}
                        </div>
                        
                        <div className="flex-1">
                          <h4 className="text-lg font-black text-gray-800 mb-1 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                            {method.title}
                          </h4>
                          <div className="text-gray-600 font-semibold mb-1">{method.info}</div>
                          <div className="text-sm text-gray-500 mb-2">{method.subtitle}</div>
                          <div className="text-xs text-gray-400">{method.description}</div>
                        </div>
                      </div>
                    </div>
                  </a>
                ))}
              </div>

              {/* Social Media */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h4 className="text-lg font-black text-gray-800 mb-4 text-center">شبکه‌های اجتماعی</h4>
                <div className="flex justify-center gap-4">
                  {socialMedia.map((social, index) => (
                    <a
                      key={index}
                      href={social.link}
                      className={`w-12 h-12 bg-gradient-to-r ${social.color} rounded-2xl flex items-center justify-center text-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 transform`}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>

              {/* Support Info */}
              <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-6 border border-blue-100">
                <div className="flex items-center gap-3 mb-3">
                  <PiClockClockwise className="text-blue-500 text-xl" />
                  <span className="font-black text-gray-800">ساعات پاسخگویی</span>
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>شنبه - چهارشنبه:</span>
                    <span className="font-semibold">۸:۰۰ تا ۱۷:۰۰</span>
                  </div>
                  <div className="flex justify-between">
                    <span>پنجشنبه:</span>
                    <span className="font-semibold">۸:۰۰ تا ۱۴:۰۰</span>
                  </div>
                  <div className="flex justify-between text-green-600 font-semibold">
                    <span>پشتیبانی فوری:</span>
                    <span>۲۴/۷</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="xl:col-span-2">
            {/* Tabs Navigation */}
            <div className={`flex gap-4 mb-8 transition-all duration-1000 delay-800 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <button
                onClick={() => setActiveTab('form')}
                className={`flex-1 py-4 rounded-2xl font-bold transition-all duration-300 ${
                  activeTab === 'form' 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-2xl' 
                    : 'bg-white/80 backdrop-blur-sm text-gray-700 shadow-lg hover:shadow-xl'
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <PiPaperPlaneTilt className="text-xl" />
                  <span>ارسال پیام</span>
                </div>
              </button>
              
              <button
                onClick={() => setActiveTab('offices')}
                className={`flex-1 py-4 rounded-2xl font-bold transition-all duration-300 ${
                  activeTab === 'offices' 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-2xl' 
                    : 'bg-white/80 backdrop-blur-sm text-gray-700 shadow-lg hover:shadow-xl'
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <PiMapPin className="text-xl" />
                  <span>دفاتر ما</span>
                </div>
              </button>
              
              <button
                onClick={() => setActiveTab('support')}
                className={`flex-1 py-4 rounded-2xl font-bold transition-all duration-300 ${
                  activeTab === 'support' 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-2xl' 
                    : 'bg-white/80 backdrop-blur-sm text-gray-700 shadow-lg hover:shadow-xl'
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <PiHeadset className="text-xl" />
                  <span>پشتیبانی</span>
                </div>
              </button>
            </div>

            {/* Tab Content */}
            <div className={`transition-all duration-1000 delay-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              
              {/* Contact Form */}
              {activeTab === 'form' && (
                <div className="bg-white/90 backdrop-blur-xl rounded-4xl p-8 shadow-3xl border border-white/60">
                  {isSubmitted ? (
                    <div className="text-center py-12">
                      <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
                        <PiCheckCircle className="text-3xl text-white" />
                      </div>
                      <h3 className="text-2xl font-black text-gray-800 mb-4">پیام شما با موفقیت ارسال شد!</h3>
                      <p className="text-gray-600 mb-6">کارشناسان ما ظرف ۲ ساعت کاری با شما تماس خواهند گرفت.</p>
                      <button
                        onClick={() => setIsSubmitted(false)}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-2xl font-bold transition-all duration-300 hover:scale-105"
                      >
                        ارسال پیام جدید
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="text-center mb-8">
                        <h3 className="text-2xl font-black text-gray-800 mb-2">فرم درخواست مشاوره</h3>
                        <p className="text-gray-600">کارشناسان ما پس از دریافت پیام، با شما تماس خواهند گرفت</p>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="relative">
                            <PiUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                            <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                              placeholder="نام و نام خانوادگی *"
                              className="w-full bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl px-12 py-4 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                              required
                            />
                          </div>
                          
                          <div className="relative">
                            <PiBuilding className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                            <input
                              type="text"
                              name="company"
                              value={formData.company}
                              onChange={handleInputChange}
                              placeholder="نام رستوران/کافه"
                              className="w-full bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl px-12 py-4 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                            />
                          </div>
                          
                          <div className="relative">
                            <PiPhone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              placeholder="شماره تماس *"
                              className="w-full bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl px-12 py-4 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                              required
                            />
                          </div>
                          
                          <div className="relative">
                            <PiEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              placeholder="آدرس ایمیل"
                              className="w-full bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl px-12 py-4 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                            />
                          </div>
                        </div>

                        <div className="relative">
                          <PiChatText className="absolute left-4 top-4 text-gray-400 text-xl" />
                          <select
                            name="service"
                            value={formData.service}
                            onChange={handleInputChange}
                            className="w-full bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl px-12 py-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 appearance-none"
                          >
                            <option value="">انتخاب خدمات مورد نظر</option>
                            {services.map((service, index) => (
                              <option key={index} value={service}>{service}</option>
                            ))}
                          </select>
                        </div>

                        <div className="relative">
                          <PiPaperPlaneTilt className="absolute left-4 top-4 text-gray-400 text-xl" />
                          <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            placeholder="پیام خود را بنویسید... *"
                            rows="5"
                            className="w-full bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl px-12 py-4 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                            required
                          ></textarea>
                        </div>

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 rounded-2xl font-bold transition-all duration-300 hover:scale-105 shadow-2xl hover:shadow-3xl flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isSubmitting ? (
                            <>
                              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              <span>در حال ارسال...</span>
                            </>
                          ) : (
                            <>
                              <PiPaperPlaneTilt className="text-xl" />
                              <span>ارسال درخواست مشاوره</span>
                              <PiCaretLeft className="text-xl" />
                            </>
                          )}
                        </button>

                        <div className="flex items-center justify-center gap-2 text-gray-500 text-sm">
                          <PiShieldCheck className="text-green-500" />
                          <span>اطلاعات شما کاملاً محرمانه نگهداری می‌شود</span>
                        </div>
                      </form>
                    </>
                  )}
                </div>
              )}

              {/* Offices Tab */}
              {activeTab === 'offices' && (
                <div className="bg-white/90 backdrop-blur-xl rounded-4xl p-8 shadow-3xl border border-white/60">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-black text-gray-800 mb-2">دفاتر ما در سراسر ایران</h3>
                    <p className="text-gray-600">برای ملاقات حضوری با کارشناسان ما</p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    {offices.map((office, index) => (
                      <div
                        key={index}
                        className={`bg-gradient-to-br from-gray-50 to-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-gray-100 cursor-pointer ${
                          currentOffice === index ? 'ring-2 ring-blue-500' : ''
                        }`}
                        onClick={() => setCurrentOffice(index)}
                      >
                        <div className="text-center mb-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center text-white mx-auto mb-3">
                            <PiMapPin className="text-xl" />
                          </div>
                          <h4 className="text-lg font-black text-gray-800">{office.city}</h4>
                        </div>
                        
                        <div className="space-y-3 text-sm text-gray-600">
                          <div className="flex items-start gap-2">
                            <PiMapPin className="text-blue-500 mt-1 flex-shrink-0" />
                            <span>{office.address}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <PiPhone className="text-green-500" />
                            <span>{office.phone}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <PiClock className="text-orange-500" />
                            <span>{office.hours}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Office Details */}
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-6 border border-blue-100">
                    <div className="flex flex-col lg:flex-row gap-6 items-center">
                      <img
                        src={offices[currentOffice].image}
                        alt={offices[currentOffice].city}
                        className="w-full lg:w-48 h-48 object-cover rounded-2xl shadow-lg"
                      />
                      <div className="flex-1">
                        <h4 className="text-xl font-black text-gray-800 mb-4">دفتر {offices[currentOffice].city}</h4>
                        <div className="space-y-3 text-gray-600">
                          <div className="flex items-start gap-3">
                            <PiMapPin className="text-blue-500 mt-1 flex-shrink-0" />
                            <span className="leading-relaxed">{offices[currentOffice].address}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <PiPhone className="text-green-500" />
                            <span>{offices[currentOffice].phone}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <PiClock className="text-orange-500" />
                            <span>{offices[currentOffice].hours}</span>
                          </div>
                        </div>
                        
                        <button className="mt-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-2xl font-bold transition-all duration-300 hover:scale-105 flex items-center gap-2">
                          <PiCalendar className="text-xl" />
                          <span>رزرو وقت ملاقات</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Support Tab */}
              {activeTab === 'support' && (
                <div className="bg-white/90 backdrop-blur-xl rounded-4xl p-8 shadow-3xl border border-white/60">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-black text-gray-800 mb-2">پشتیبانی تخصصی</h3>
                    <p className="text-gray-600">تیم پشتیبانی ما همیشه آماده کمک به شماست</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-6 border border-green-100">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center text-white mb-4">
                        <PiHeadset className="text-xl" />
                      </div>
                      <h4 className="text-lg font-black text-gray-800 mb-2">پشتیبانی فوری</h4>
                      <p className="text-gray-600 text-sm mb-4">برای مشکلات فوری و اضطراری</p>
                      <div className="text-2xl font-black text-green-600 mb-2">۰۹۱۲۱۲۳۴۵۶۷</div>
                      <div className="text-xs text-gray-500">۲۴ ساعته - ۷ روز هفته</div>
                    </div>

                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl p-6 border border-blue-100">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center text-white mb-4">
                        <PiGear className="text-xl" />
                      </div>
                      <h4 className="text-lg font-black text-gray-800 mb-2">پشتیبانی فنی</h4>
                      <p className="text-gray-600 text-sm mb-4">برای مشکلات فنی و راهنمایی</p>
                      <div className="text-2xl font-black text-blue-600 mb-2">۰۲۱-۱۲۳۴۵۶۷۸</div>
                      <div className="text-xs text-gray-500">شنبه تا چهارشنبه ۸:۰۰ تا ۱۷:۰۰</div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-3xl p-6 border border-purple-100">
                    <h4 className="text-lg font-black text-gray-800 mb-4">سوالات متداول</h4>
                    <div className="space-y-4">
                      {[
                        'چقدر زمان برای راه‌اندازی منوی دیجیتال نیاز است؟',
                        'آیا امکان سفارشی‌سازی منو وجود دارد؟',
                        'پشتیبانی شامل چه خدماتی می‌شود؟',
                        'آیا آموزش استفاده از پنل ارائه می‌شود؟'
                      ].map((question, index) => (
                        <div key={index} className="flex items-start gap-3 p-4 bg-white/50 rounded-2xl hover:bg-white transition-all duration-300 cursor-pointer">
                          <PiChatText className="text-purple-500 mt-1 flex-shrink-0" />
                          <span className="text-gray-700">{question}</span>
                        </div>
                      ))}
                    </div>
                    
                    <button className="w-full mt-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-2xl font-bold transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2">
                      <PiPaperPlaneTilt className="text-xl" />
                      <span>مشاهده تمام سوالات متداول</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Contact Bar */}
        <div className={`text-center transition-all duration-1000 delay-1200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-4xl p-8 text-white shadow-3xl">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="text-right">
                <h4 className="text-2xl font-black mb-2">هنوز سوالی دارید؟</h4>
                <p className="text-blue-100">
                  مستقیماً با مدیر فروش ما صحبت کنید
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="tel:+982112345678"
                  className="group bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-2xl font-black transition-all duration-300 hover:scale-105 shadow-2xl hover:shadow-3xl flex items-center gap-3"
                >
                  <PiPhone className="text-xl group-hover:animate-bounce" />
                  <span>تماس فوری</span>
                </a>
                
                <a
                  href="https://wa.me/989121234567"
                  className="group bg-white/10 backdrop-blur-lg hover:bg-white/20 border border-white/20 text-white px-8 py-4 rounded-2xl font-bold transition-all duration-300 hover:scale-105 flex items-center gap-3"
                >
                  <PiWhatsappLogo className="text-xl group-hover:scale-110 transition-transform duration-300" />
                  <span>پیام در واتساپ</span>
                </a>
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

export default Contact;