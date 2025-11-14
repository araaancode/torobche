import React, { useState, useEffect, useRef } from 'react';
import { 
  PiStarFill,
  PiStar,
  PiQuotes,
  PiUserCircle,
  PiInstagramLogo,
  PiTwitterLogo,
  PiLinkedinLogo,
  PiCaretLeft,
  PiCaretRight,
  PiPlay,
  PiPause,
  PiShieldCheck,
  PiTrendUp,
  PiHeart,
  PiHeartFill,
  PiCalendar,
  PiCheckCircle,
  PiCrown,
  PiSparkle,
  PiMedal,
  PiChartLine,
  PiShootingStar
} from 'react-icons/pi';

const Testimonials = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [likedCards, setLikedCards] = useState({});
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

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const testimonials = [
    {
      id: 1,
      name: 'محمد رضایی',
      position: 'مدیر رستوران ویلا',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80',
      rating: 5,
      text: 'با راه‌اندازی منوی دیجیتال، فروش ما ۴۰٪ افزایش پیدا کرد. مشتریان از سرعت و سهولت سفارش‌گیری بسیار راضی‌اند. پشتیبانی ۲۴ ساعته تیم شما واقعاً قابل تقدیره.',
      project: 'رستوران ایتالیایی ویلا',
      social: { platform: 'instagram', handle: '@villa_restaurant' },
      stats: { sales: '+۴۰٪', orders: '+۲۵۰۰', time: '-۵۰٪' },
      color: 'from-blue-500 to-cyan-500',
      bgGradient: 'bg-gradient-to-br from-blue-50 via-cyan-50 to-white',
      duration: '۶ ماه'
    },
    {
      id: 2,
      name: 'فاطمه محمدی',
      position: 'مالک کافه بوتیک',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80',
      rating: 5,
      text: 'منوی دیجیتال باعث شد مشتریان زمان بیشتری در کافه بمانند و میانگین خرید ۳۵٪ افزایش پیدا کند. طراحی فوق‌العاده و امکانات پیشرفته آنالیز واقعاً بی‌نظیره.',
      project: 'کافه بوتیک قهوه خانه',
      social: { platform: 'twitter', handle: '@coffee_shop' },
      stats: { sales: '+۳۵٪', orders: '+۱۸۰۰', time: '-۴۰٪' },
      color: 'from-emerald-500 to-teal-500',
      bgGradient: 'bg-gradient-to-br from-emerald-50 via-teal-50 to-white',
      duration: '۴ ماه'
    },
    {
      id: 3,
      name: 'علی کریمی',
      position: 'مدیر فست فود',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80',
      rating: 4,
      text: 'در فست فود زمان یعنی همه چیز. منوی دیجیتال زمان انتظار مشتریان رو نصف کرد و رضایت‌مندی به شدت افزایش پیدا کرد. مشتریان ما عاشق سرعت سیستم شدن.',
      project: 'فست فود برگرلند',
      social: { platform: 'linkedin', handle: 'ali_karimi' },
      stats: { sales: '+۵۰٪', orders: '+۳۲۰۰', time: '-۶۰٪' },
      color: 'from-orange-500 to-red-500',
      bgGradient: 'bg-gradient-to-br from-orange-50 via-red-50 to-white',
      duration: '۸ ماه'
    },
    {
      id: 4,
      name: 'زهرا حسینی',
      position: 'سرآشپز و مالک',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80',
      rating: 5,
      text: 'سیستم آنالیز منوی دیجیتال به ما کمک کرد پرفروش‌ترین آیتم‌ها رو شناسایی کنیم و سودمون رو ۴۵٪ افزایش بدیم. رابط کاربری بسیار intuitive و زیباست.',
      project: 'رستوران سنتی نگین',
      social: { platform: 'instagram', handle: '@negin_restaurant' },
      stats: { sales: '+۴۵٪', orders: '+۲۱۰۰', time: '-۳۵٪' },
      color: 'from-pink-500 to-rose-500',
      bgGradient: 'bg-gradient-to-br from-pink-50 via-rose-50 to-white',
      duration: '۵ ماه'
    }
  ];

  const achievements = [
    { icon: <PiTrendUp className="text-2xl" />, value: '۹۷٪', label: 'رضایت مشتریان', color: 'text-green-500', bg: 'bg-green-500/10' },
    { icon: <PiStarFill className="text-2xl" />, value: '۴.۹/۵', label: 'میانگین امتیاز', color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
    { icon: <PiUserCircle className="text-2xl" />, value: '۲۵۰+', label: 'مشتری فعال', color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { icon: <PiShieldCheck className="text-2xl" />, value: '۱۰۰٪', label: 'ضمانت کیفیت', color: 'text-purple-500', bg: 'bg-purple-500/10' },
    { icon: <PiChartLine className="text-2xl" />, value: '۴۲٪', label: 'میانگین رشد', color: 'text-cyan-500', bg: 'bg-cyan-500/10' },
    { icon: <PiMedal className="text-2xl" />, value: 'رتبه ۱', label: 'در صنعت', color: 'text-orange-500', bg: 'bg-orange-500/10' }
  ];

  const socialIcons = {
    instagram: <PiInstagramLogo className="text-lg" />,
    twitter: <PiTwitterLogo className="text-lg" />,
    linkedin: <PiLinkedinLogo className="text-lg" />
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className={index < rating ? "text-yellow-400 animate-pulse" : "text-gray-300"}>
        {index < rating ? <PiStarFill className="text-xl" /> : <PiStar className="text-xl" />}
      </span>
    ));
  };

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleLike = (id) => {
    setLikedCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <section ref={sectionRef} id="testimonials" className="relative min-h-screen py-20 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 overflow-hidden">
      
      {/* Advanced Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float-slow"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-pink-200 to-rose-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float-slower"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-pulse"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25px 25px, #666 1px, transparent 0)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
      </div>

      {/* Floating Elements with Sparkles */}
      <div className="absolute top-32 left-20 opacity-20 animate-float">
        <PiSparkle className="text-5xl text-blue-500" />
      </div>
      <div className="absolute bottom-40 right-24 opacity-20 animate-float-delayed">
        <PiShootingStar className="text-6xl text-purple-500" />
      </div>
      <div className="absolute top-1/4 right-1/4 opacity-15 animate-float-slow">
        <PiCrown className="text-4xl text-yellow-500" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section with Enhanced Animation */}
        <div className="text-center mb-20">
          <div className={`inline-flex items-center gap-3 bg-white/90 backdrop-blur-xl rounded-3xl px-8 py-4 mb-8 shadow-2xl border border-white/60 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-95'}`}>
            <div className="relative">
              <PiSparkle className="text-yellow-500 text-xl animate-spin-slow" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
            </div>
            <span className="text-base font-black text-gray-800 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              تجربیات مشتریان
            </span>
            <div className="flex gap-1">
              {[1, 2, 3].map((star) => (
                <PiStarFill key={star} className="text-yellow-400 text-sm animate-bounce" style={{ animationDelay: `${star * 0.2}s` }} />
              ))}
            </div>
          </div>
          
          <h1 className={`text-5xl sm:text-6xl lg:text-7xl font-black text-gray-900 mb-6 leading-tight transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient">
              صدای موفقیت
            </span>
            <br />
            مشتریان ما
          </h1>
          
          <p className={`text-2xl sm:text-3xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-medium transition-all duration-1000 delay-400 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            به جمع <span className="font-black text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">۲۵۰+ کسب‌وکار موفق</span> بپیوندید
          </p>
        </div>

        {/* Enhanced Achievements Grid */}
        <div className={`grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-20 transition-all duration-1000 delay-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {achievements.map((achievement, index) => (
            <div 
              key={index}
              className="group relative bg-white/80 backdrop-blur-xl rounded-2xl p-6 text-center shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 border border-white/40"
            >
              {/* Hover Effect */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${achievement.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
              
              <div className={`${achievement.color} mb-3 flex justify-center relative`}>
                <div className={`p-3 rounded-2xl ${achievement.bg} backdrop-blur-sm`}>
                  {achievement.icon}
                </div>
              </div>
              <div className="text-2xl font-black text-gray-900 mb-1 relative z-10">{achievement.value}</div>
              <div className="text-sm font-semibold text-gray-600 relative z-10">{achievement.label}</div>
            </div>
          ))}
        </div>

        {/* Premium Testimonial Carousel */}
        <div className="max-w-7xl mx-auto mb-20">
          <div className="relative">
            
            {/* Main Testimonial Display */}
            <div className="relative h-[500px] mb-12">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className={`absolute inset-0 transition-all duration-700 ease-out ${
                    index === activeTestimonial
                      ? 'opacity-100 translate-x-0 scale-100 z-20'
                      : index < activeTestimonial
                      ? 'opacity-0 -translate-x-20 scale-95 z-10'
                      : 'opacity-0 translate-x-20 scale-95 z-10'
                  }`}
                >
                  <div className={`${testimonial.bgGradient} rounded-4xl shadow-3xl border border-white/60 p-8 h-full backdrop-blur-sm`}>
                    <div className="flex flex-col xl:flex-row gap-8 h-full">
                      
                      {/* Enhanced User Profile Sidebar */}
                      <div className="xl:w-2/5 flex flex-col items-center text-center xl:text-right xl:items-end">
                        <div className="relative mb-6">
                          <div className="relative">
                            <img
                              src={testimonial.avatar}
                              alt={testimonial.name}
                              className="w-28 h-28 rounded-3xl object-cover border-4 border-white shadow-2xl"
                            />
                            <div className={`absolute -bottom-3 -right-3 w-12 h-12 bg-gradient-to-r ${testimonial.color} rounded-2xl flex items-center justify-center text-white text-lg shadow-xl`}>
                              <PiCheckCircle />
                            </div>
                          </div>
                          {/* Verification Badge */}
                          <div className="absolute -top-2 -left-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs px-3 py-1 rounded-full font-bold shadow-lg">
                            تایید شده
                          </div>
                        </div>
                        
                        <h3 className="text-2xl font-black text-gray-900 mb-2">{testimonial.name}</h3>
                        <p className="text-gray-600 text-base mb-3">{testimonial.position}</p>
                        
                        <div className="flex items-center gap-1 mb-4">
                          {renderStars(testimonial.rating)}
                        </div>
                        
                        <div className="flex items-center gap-3 text-gray-500 mb-6 p-3 bg-white/50 rounded-2xl">
                          {socialIcons[testimonial.social.platform]}
                          <span className="text-sm font-medium">{testimonial.social.handle}</span>
                        </div>
                        
                        {/* Enhanced Stats */}
                        <div className="grid grid-cols-3 gap-3 w-full">
                          {Object.entries(testimonial.stats).map(([key, value], idx) => (
                            <div key={key} className="bg-white/80 backdrop-blur-sm rounded-2xl p-3 text-center border border-white/40 shadow-lg">
                              <div className="text-lg font-black text-gray-900 mb-1">{value}</div>
                              <div className="text-xs text-gray-600 font-medium">
                                {key === 'sales' && 'فروش'}
                                {key === 'orders' && 'سفارش'}
                                {key === 'time' && 'زمان'}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Enhanced Testimonial Content */}
                      <div className="xl:w-3/5 flex flex-col">
                        <div className="flex items-start justify-between mb-8">
                          <div className={`w-16 h-16 bg-gradient-to-r ${testimonial.color} rounded-3xl flex items-center justify-center text-white shadow-2xl`}>
                            <PiQuotes className="text-3xl" />
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-medium text-gray-500 bg-white/80 px-4 py-2 rounded-2xl backdrop-blur-sm border border-white/40">
                              {testimonial.project}
                            </span>
                            <span className="text-sm font-medium text-gray-500 bg-white/80 px-4 py-2 rounded-2xl backdrop-blur-sm border border-white/40">
                              {testimonial.duration}
                            </span>
                          </div>
                        </div>
                        
                        <p className="text-gray-700 text-xl leading-relaxed flex-grow mb-8 text-justify font-medium">
                          {testimonial.text}
                        </p>
                        
                        <div className="flex items-center justify-between pt-8 border-t border-gray-200/60">
                          <div className="flex items-center gap-3 text-gray-500">
                            <PiCalendar className="text-xl" />
                            <span className="text-sm font-medium">۲ ماه پیش</span>
                          </div>
                          <div className="flex items-center gap-4">
                            <button 
                              onClick={() => handleLike(testimonial.id)}
                              className={`transition-all duration-300 transform hover:scale-110 ${
                                likedCards[testimonial.id] ? 'text-red-500' : 'text-gray-400 hover:text-red-400'
                              }`}
                            >
                              {likedCards[testimonial.id] ? 
                                <PiHeartFill className="text-2xl animate-like" /> : 
                                <PiHeart className="text-2xl" />
                              }
                            </button>
                            <button className="text-gray-400 hover:text-blue-400 transition-colors duration-200 transform hover:scale-110">
                              <PiTwitterLogo className="text-2xl" />
                            </button>
                            <button className="text-gray-400 hover:text-purple-400 transition-colors duration-200 transform hover:scale-110">
                              <PiInstagramLogo className="text-2xl" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Enhanced Navigation Controls */}
            <div className="flex items-center justify-center gap-6">
              <button
                onClick={prevTestimonial}
                className="group bg-white/90 backdrop-blur-xl hover:bg-white text-gray-700 w-14 h-14 rounded-2xl flex items-center justify-center shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 border border-white/40"
              >
                <PiCaretRight className="text-2xl group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="group bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white w-16 h-16 rounded-2xl flex items-center justify-center shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 border border-white/20"
              >
                {isPlaying ? 
                  <PiPause className="text-2xl group-hover:scale-110 transition-transform duration-300" /> : 
                  <PiPlay className="text-2xl group-hover:scale-110 transition-transform duration-300" />
                }
              </button>
              
              <button
                onClick={nextTestimonial}
                className="group bg-white/90 backdrop-blur-xl hover:bg-white text-gray-700 w-14 h-14 rounded-2xl flex items-center justify-center shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 border border-white/40"
              >
                <PiCaretLeft className="text-2xl group-hover:-translate-x-1 transition-transform duration-300" />
              </button>
            </div>

            {/* Enhanced Dots Indicator */}
            <div className="flex justify-center gap-3 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`relative transition-all duration-500 ${
                    index === activeTestimonial
                      ? 'w-12 bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg'
                      : 'w-3 bg-gray-300 hover:bg-gray-400'
                  } h-3 rounded-full`}
                >
                  {index === activeTestimonial && (
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-ping opacity-60"></div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Final Premium CTA */}
        <div className="text-center">
          <div className="relative bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 rounded-4xl p-12 text-white shadow-4xl max-w-5xl mx-auto overflow-hidden">
            
            {/* Animated Background */}
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 animate-gradient-slow"></div>
              <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500/5 rounded-full -translate-x-1/2 -translate-y-1/2 animate-float-slow"></div>
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full translate-x-1/2 translate-y-1/2 animate-float-slower"></div>
            </div>

            <div className="relative z-10">
              <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl">
                <PiSparkle className="text-3xl text-white" />
              </div>
              
              <h3 className="text-3xl sm:text-4xl font-black mb-6 leading-tight">
                آماده ایجاد <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">تجربه‌ای فراموش‌نشدنی</span> برای مشتریان خود هستید؟
              </h3>
              
              <p className="text-gray-300 text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
                به خانواده کسب‌وکارهای پیشرو بپیوندید و تحولی شگفت‌انگیز در فروش خود ایجاد کنید
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button className="group bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-gray-900 px-10 py-5 rounded-2xl font-black transition-all duration-300 hover:scale-105 shadow-2xl hover:shadow-3xl flex items-center gap-3 text-lg">
                  <PiStarFill className="text-xl group-hover:rotate-180 transition-transform duration-500" />
                  <span>شروع سفر موفقیت</span>
                  <PiSparkle className="text-xl group-hover:animate-spin" />
                </button>
                
                <button className="group bg-white/10 backdrop-blur-lg hover:bg-white/20 text-white px-8 py-5 rounded-2xl font-bold transition-all duration-300 hover:scale-105 border border-white/20 flex items-center gap-3 text-lg">
                  <PiUserCircle className="text-xl group-hover:scale-110 transition-transform duration-300" />
                  <span>مشاوره رایگان</span>
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
                  <span className="text-sm font-medium">رتبه ۱ در صنعت</span>
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
        @keyframes like {
          0% { transform: scale(1); }
          50% { transform: scale(1.3); }
          100% { transform: scale(1); }
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
        .animate-like {
          animation: like 0.6s ease-in-out;
        }
        .rounded-4xl {
          border-radius: 2.5rem;
        }
        .shadow-3xl {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }
        .shadow-4xl {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </section>
  );
};

export default Testimonials;