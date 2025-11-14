import React, { useState, useEffect, useRef } from 'react';
import { 
  PiRocket,
  PiPhone,
  PiWhatsappLogo,
  PiStarFill,
  PiShieldCheck,
  PiClock,
  PiCrown,
  PiSparkle,
  PiTrendUp,
  PiMedal,
  PiCheckCircle,
  PiArrowRight,
  PiArrowLeft,
  PiPlay,
  PiPause,
  PiUserCircle,
  PiCalendar,
  PiGift,
  PiShootingStar,
  PiLightning,
  PiConfetti
} from 'react-icons/pi';

const CTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    business: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
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
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const testimonials = [
    {
      name: 'محمد رضایی',
      business: 'رستوران ویلا',
      text: 'ظرف ۲۴ ساعت راه‌اندازی شد! فروش ما ۴۵٪ افزایش پیدا کرد.',
      time: '۳ روز پیش'
    },
    {
      name: 'فاطمه محمدی',
      business: 'کافه بوتیک',
      text: 'پشتیبانی فوق‌العاده‌ای داشتند. واقعاً حرفه‌ای هستند.',
      time: '۱ هفته پیش'
    },
    {
      name: 'علی کریمی',
      business: 'فست فود برگرلند',
      text: 'مشتریان ما عاشق سرعت و سادگی منوی دیجیتال شدن.',
      time: '۲ روز پیش'
    }
  ];

  const features = [
    { icon: <PiRocket className="text-xl" />, text: 'راه‌اندازی ۲۴ ساعته', color: 'text-blue-500' },
    { icon: <PiShieldCheck className="text-xl" />, text: 'ضمانت بازگشت وجه', color: 'text-green-500' },
    { icon: <PiCrown className="text-xl" />, text: 'پشتیبانی VIP', color: 'text-yellow-500' },
    { icon: <PiGift className="text-xl" />, text: 'مشاوره رایگان', color: 'text-purple-500' }
  ];

  const stats = [
    { number: '۹۸٪', label: 'رضایت مشتری', color: 'from-green-500 to-emerald-500' },
    { number: '۲۴h', label: 'راه‌اندازی', color: 'from-blue-500 to-cyan-500' },
    { number: '۴.۹', label: 'امتیاز', color: 'from-yellow-500 to-orange-500' },
    { number: '۵۰۰+', label: 'مشتری فعال', color: 'from-purple-500 to-pink-500' }
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
    // Reset form
    setFormData({ name: '', phone: '', business: '' });
  };

  return (
    <section ref={sectionRef} id="cta" className="relative min-h-screen py-20 bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 overflow-hidden">
      
      {/* Advanced Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated Gradient Orbs */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full mix-blend-soft-light filter blur-3xl animate-float-slow"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-pink-500/20 to-rose-500/20 rounded-full mix-blend-soft-light filter blur-3xl animate-float-slower"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-500/10 rounded-full mix-blend-soft-light filter blur-3xl animate-pulse"></div>
        
        {/* Animated Grid */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        {/* Floating Particles */}
        <div className="absolute top-20 left-1/4 animate-float">
          <PiSparkle className="text-2xl text-blue-400/30" />
        </div>
        <div className="absolute bottom-40 right-1/3 animate-float-delayed">
          <PiShootingStar className="text-3xl text-purple-400/30" />
        </div>
        <div className="absolute top-1/3 right-20 animate-float-slow">
          <PiConfetti className="text-xl text-yellow-400/30" />
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className={`inline-flex items-center gap-3 bg-white/10 backdrop-blur-xl rounded-3xl px-8 py-4 mb-8 shadow-2xl border border-white/20 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-95'}`}>
            <div className="relative">
              <PiLightning className="text-yellow-400 text-xl animate-pulse" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
            </div>
            <span className="text-base font-black text-white">
              زمان تحول فرا رسیده!
            </span>
            <PiStarFill className="text-yellow-400 animate-spin-slow" />
          </div>
          
          <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
              همین امروز
            </span>
            <br />
            فروش خود را متحول کنید
          </h1>
          
          <p className={`text-xl sm:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-medium transition-all duration-1000 delay-400 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            به جمع <span className="font-black text-white">۵۰۰+ رستوران موفق</span> بپیوندید و 
            <span className="text-yellow-400"> ظرف ۲۴ ساعت </span>
            منوی دیجیتال خود را راه‌اندازی کنید
          </p>
        </div>

        {/* Main CTA Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          
          {/* Left: Form Section */}
          <div className={`transition-all duration-1000 delay-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="bg-white/10 backdrop-blur-xl rounded-4xl p-8 shadow-3xl border border-white/20">
              
              {/* Form Header */}
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-2xl">
                  <PiRocket className="text-2xl text-white" />
                </div>
                <h3 className="text-2xl font-black text-white mb-2">
                  درخواست مشاوره رایگان
                </h3>
                <p className="text-gray-300">
                  کارشناسان ما ظرف ۲ ساعت با شما تماس می‌گیرند
                </p>
              </div>

              {/* Features */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 bg-white/5 rounded-2xl p-3 border border-white/10">
                    <div className={feature.color}>
                      {feature.icon}
                    </div>
                    <span className="text-white text-sm font-medium">{feature.text}</span>
                  </div>
                ))}
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="relative">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="نام و نام خانوادگی"
                      className="w-full bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl px-6 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300"
                      required
                    />
                    <PiUserCircle className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                  </div>
                  
                  <div className="relative">
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="شماره تماس"
                      className="w-full bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl px-6 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300"
                      required
                    />
                    <PiPhone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                  </div>
                  
                  <div className="relative">
                    <input
                      type="text"
                      name="business"
                      value={formData.business}
                      onChange={handleInputChange}
                      placeholder="نام رستوران یا کافه"
                      className="w-full bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl px-6 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300"
                      required
                    />
                    <PiStarFill className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-gray-900 py-4 rounded-2xl font-black transition-all duration-300 hover:scale-105 shadow-2xl hover:shadow-3xl flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full animate-spin"></div>
                      <span>در حال ارسال...</span>
                    </>
                  ) : (
                    <>
                      <PiRocket className="text-xl group-hover:animate-bounce" />
                      <span>دریافت مشاوره رایگان</span>
                      <PiArrowLeft className="text-xl group-hover:translate-x-1 transition-transform duration-300" />
                    </>
                  )}
                </button>

                {/* Trust Badge */}
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 text-gray-400 text-sm">
                    <PiShieldCheck className="text-green-400" />
                    <span>اطلاعات شما محرمانه می‌ماند</span>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Right: Stats & Testimonials */}
          <div className={`transition-all duration-1000 delay-800 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 text-center border border-white/10 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105"
                >
                  <div className={`text-3xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                    {stat.number}
                  </div>
                  <div className="text-gray-300 text-sm font-medium">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Testimonials Carousel */}
            <div className="bg-white/5 backdrop-blur-xl rounded-4xl p-6 border border-white/10 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-xl font-black text-white">نظرات مشتریان اخیر</h4>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {isPlaying ? <PiPause className="text-xl" /> : <PiPlay className="text-xl" />}
                  </button>
                </div>
              </div>

              <div className="relative h-32 overflow-hidden">
                {testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                      index === currentTestimonial
                        ? 'opacity-100 translate-x-0'
                        : index < currentTestimonial
                        ? 'opacity-0 -translate-x-10'
                        : 'opacity-0 translate-x-10'
                    }`}
                  >
                    <div className="space-y-4">
                      <p className="text-gray-300 leading-relaxed text-justify">
                        "{testimonial.text}"
                      </p>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-white font-semibold">{testimonial.name}</div>
                          <div className="text-gray-400 text-sm">{testimonial.business}</div>
                        </div>
                        <div className="text-gray-500 text-sm flex items-center gap-1">
                          <PiClock />
                          <span>{testimonial.time}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Dots Indicator */}
              <div className="flex justify-center gap-2 mt-6">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentTestimonial
                        ? 'bg-yellow-400 w-6'
                        : 'bg-gray-600 hover:bg-gray-500'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              <button className="group bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 text-white py-3 rounded-2xl font-bold transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2">
                <PiWhatsappLogo className="text-green-400 text-xl" />
                <span>واتساپ</span>
              </button>
              <button className="group bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 text-white py-3 rounded-2xl font-bold transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2">
                <PiPhone className="text-blue-400 text-xl" />
                <span>تماس فوری</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom CTA Bar */}
        <div className={`text-center transition-all duration-1000 delay-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="bg-gradient-to-r from-yellow-400/10 to-orange-400/10 backdrop-blur-xl rounded-4xl p-8 border border-yellow-400/20 shadow-3xl">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="text-right">
                <h4 className="text-2xl font-black text-white mb-2">
                  فرصت را از دست ندهید!
                </h4>
                <p className="text-gray-300">
                  همین حالا شروع کنید و از <span className="text-yellow-400">۱۵ روز استفاده رایگان</span> بهره‌مند شوید
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="group bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-8 py-4 rounded-2xl font-black transition-all duration-300 hover:scale-105 shadow-2xl hover:shadow-3xl flex items-center gap-3">
                  <PiGift className="text-xl" />
                  <span>شروع رایگان</span>
                  <PiArrowRight className="text-xl group-hover:translate-x-1 transition-transform duration-300" />
                </button>
                
                <button className="group bg-transparent hover:bg-white/10 border border-yellow-400 text-yellow-400 hover:text-white px-8 py-4 rounded-2xl font-bold transition-all duration-300 hover:scale-105 flex items-center gap-3">
                  <PiCalendar className="text-xl" />
                  <span>رزرو دمو</span>
                </button>
              </div>
            </div>

            {/* Countdown Timer */}
            <div className="flex items-center justify-center gap-4 mt-6 pt-6 border-t border-yellow-400/20">
              <div className="text-yellow-400 text-sm font-medium">پیشنهاد ویژه برای ۲۴ ساعت آینده</div>
              <div className="flex items-center gap-2 text-white font-mono">
                <span className="bg-white/10 px-3 py-1 rounded-lg">۲۳</span>:
                <span className="bg-white/10 px-3 py-1 rounded-lg">۵۹</span>:
                <span className="bg-white/10 px-3 py-1 rounded-lg">۴۵</span>
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

export default CTA;