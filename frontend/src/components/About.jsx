import React, { useState, useEffect, useRef } from 'react';
import { 
  PiUsers, 
  PiCoffee, 
  PiChartLine, 
  PiShieldCheck, 
  PiClock, 
  PiStar, 
  PiLightning, 
  PiHandshake, 
  PiTrophy,
  PiSparkle,
  PiMedal,
  PiTarget,
  PiHeart,
  PiCheckCircle,
  PiPlay,
  PiCaretLeft,
  PiUserCircle,
  PiRocket,
  PiTrendUp
} from 'react-icons/pi';

const About = () => {
  const [activeValue, setActiveValue] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [counterValues, setCounterValues] = useState({
    restaurants: 0,
    orders: 0,
    satisfaction: 0,
    support: 0
  });
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          startCounters();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const startCounters = () => {
    const targets = {
      restaurants: 500,
      orders: 50000,
      satisfaction: 98,
      support: 100
    };

    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;

    Object.keys(targets).forEach(key => {
      let current = 0;
      const target = targets[key];
      const increment = target / steps;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        setCounterValues(prev => ({
          ...prev,
          [key]: Math.floor(current)
        }));
      }, stepDuration);
    });
  };

  const stats = [
    { 
      number: `${counterValues.restaurants.toLocaleString('fa-IR')}+`, 
      label: 'رستوران فعال', 
      icon: <PiCoffee className="text-2xl" />, 
      color: 'text-blue-600',
      bgColor: 'bg-blue-500/10',
      description: 'در سراسر ایران'
    },
    { 
      number: `${counterValues.orders.toLocaleString('fa-IR')}+`, 
      label: 'سفارش روزانه', 
      icon: <PiChartLine className="text-2xl" />, 
      color: 'text-green-600',
      bgColor: 'bg-green-500/10',
      description: 'میانگین روزانه'
    },
    { 
      number: `${counterValues.satisfaction}٪`, 
      label: 'رضایت مشتری', 
      icon: <PiUsers className="text-2xl" />, 
      color: 'text-purple-600',
      bgColor: 'bg-purple-500/10',
      description: 'نرخ رضایت'
    },
    { 
      number: '۲۴/۷', 
      label: 'پشتیبانی', 
      icon: <PiShieldCheck className="text-2xl" />, 
      color: 'text-orange-600',
      bgColor: 'bg-orange-500/10',
      description: 'همیشه در دسترس'
    }
  ];

  const values = [
    {
      icon: <PiLightning className="text-3xl" />,
      title: 'نوآوری مداوم',
      description: 'همیشه در حال توسعه ویژگی‌های جدید و بهبود تجربه کاربری هستیم. تیم تحقیق و توسعه ما پیوسته در حال ابداع راهکارهای خلاقانه است.',
      color: 'from-blue-500 to-cyan-500',
      bgGradient: 'bg-gradient-to-br from-blue-50 via-cyan-50 to-white',
      features: ['توسعه مستمر', 'فناوری روز', 'خلاقیت']
    },
    {
      icon: <PiHandshake className="text-3xl" />,
      title: 'اعتماد متقابل',
      description: 'شفافیت و صداقت اساس رابطه ما با مشتریان است. هر وعده‌ای که می‌دهیم، با تمام توان به آن عمل می‌کنیم.',
      color: 'from-green-500 to-teal-500',
      bgGradient: 'bg-gradient-to-br from-green-50 via-teal-50 to-white',
      features: ['شفافیت', 'تعهد', 'پاسخگویی']
    },
    {
      icon: <PiStar className="text-3xl" />,
      title: 'کیفیت برتر',
      description: 'بالاترین استانداردهای کیفیت در تمام محصولات و خدمات. هیچ چیز کمتر از بهترین را قبول نداریم.',
      color: 'from-purple-500 to-pink-500',
      bgGradient: 'bg-gradient-to-br from-purple-50 via-pink-50 to-white',
      features: ['استاندارد بالا', 'دقت', 'کمال‌گرایی']
    },
    {
      icon: <PiClock className="text-3xl" />,
      title: 'پشتیبانی تمام‌وقت',
      description: 'پشتیبانی ۲۴ ساعته برای حل سریع مشکلات شما. تیم پشتیبانی ما همیشه آماده خدمت‌رسانی است.',
      color: 'from-orange-500 to-red-500',
      bgGradient: 'bg-gradient-to-br from-orange-50 via-red-50 to-white',
      features: ['دسترسی دائمی', 'سرعت عمل', 'تخصص']
    }
  ];

  const achievements = [
    { icon: <PiTrophy className="text-xl" />, text: 'برنده جایزه بهترین استارتاپ ۱۴۰۲', subtext: 'انجمن فناوری اطلاعات ایران' },
    { icon: <PiMedal className="text-xl" />, text: 'رتبه ۱ در صنعت رستوران‌داری', subtext: 'سازمان صنایع غذایی' },
    { icon: <PiMedal className="text-xl" />, text: 'نوآور برتر در فناوری', subtext: 'مرکز نوآوری دیجیتال' }
  ];

  return (
    <section ref={sectionRef} id="about" className="relative min-h-screen py-20 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 overflow-hidden">
      
      {/* Advanced Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float-slow"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float-slower"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-pulse"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
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
        <PiTarget className="text-4xl text-purple-500" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-20">
          <div className={`inline-flex items-center gap-3 bg-white/90 backdrop-blur-xl rounded-3xl px-8 py-4 mb-8 shadow-2xl border border-white/60 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-95'}`}>
            <div className="relative">
              <PiSparkle className="text-blue-500 text-xl animate-spin-slow" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
            </div>
            <span className="text-base font-black text-gray-800 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              داستان ما
            </span>
            <PiHeart className="text-red-500 animate-pulse" />
          </div>
          
          <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-6 leading-tight transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient">
              مسیر موفقیت
            </span>
            <br />
            در یک نگاه
          </h1>
          
          <p className={`text-xl sm:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-medium transition-all duration-1000 delay-400 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            از یک ایده ساده تا تبدیل شدن به <span className="font-black text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">پلتفرم پیشرو</span> در صنعت رستوران‌داری دیجیتال
          </p>
        </div>

        {/* Main Content */}
        <div className="flex flex-col xl:flex-row items-center gap-16 mb-20">
          
          {/* Enhanced Content Section */}
          <div className="xl:w-1/2">
            <div className={`bg-white/90 backdrop-blur-xl rounded-4xl p-8 shadow-3xl border border-white/60 transition-all duration-1000 delay-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              
              <div className="space-y-6">
                <p className="text-lg text-gray-700 leading-relaxed text-justify font-medium">
                  ما در تیم <span className="font-black text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">منوی دیجیتال</span>، با هدف تسهیل فرآیند سفارش‌گیری و بهبود تجربه مشتری در رستوران‌ها و کافه‌ها گرد هم آمدیم. ماموریت ما ایجاد تحول دیجیتال در صنعت غذایی کشور است.
                </p>
                
                <p className="text-lg text-gray-700 leading-relaxed text-justify font-medium">
                  با توجه به رشد روزافزون استفاده از تلفن‌های هوشمند و نیاز به کاهش تماس فیزیکی، راهکار منوی دیجیتال را توسعه دادیم که هم برای صاحبان رستوران و هم برای مشتریان مزایای بسیاری دارد. این راهکار نه تنها کارایی را افزایش می‌دهد، بلکه تجربه‌ای مدرن و لذت‌بخش ایجاد می‌کند.
                </p>
                
                <p className="text-lg text-gray-700 leading-relaxed text-justify font-medium">
                  تیم ما متشکل از <span className="font-semibold text-blue-600">متخصصان طراحی، توسعه و بازاریابی</span> است که با همکاری یکدیگر، بهترین تجربه کاربری را برای شما و مشتریان‌تان فراهم می‌کنند. ما به نوآوری، کیفیت و رضایت مشتری اعتقاد راسخ داریم.
                </p>
              </div>

              {/* Enhanced CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <button className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-bold transition-all duration-300 hover:scale-105 shadow-2xl hover:shadow-3xl flex items-center gap-3 justify-center">
                  <PiHandshake className="text-xl group-hover:scale-110 transition-transform duration-300" />
                  <span>شروع همکاری</span>
                  <PiRocket className="text-xl group-hover:translate-x-1 transition-transform duration-300" />
                </button>
                
                <button className="group bg-white/80 backdrop-blur-lg hover:bg-white text-gray-800 px-8 py-4 rounded-2xl font-bold transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl border border-white/50 flex items-center gap-3 justify-center">
                  <PiUserCircle className="text-xl group-hover:scale-110 transition-transform duration-300" />
                  <span>آشنایی با تیم</span>
                  <PiCaretLeft className="text-xl group-hover:-translate-x-1 transition-transform duration-300" />
                </button>
              </div>

              {/* Achievements */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
                {achievements.map((achievement, index) => (
                  <div key={index} className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl p-4 text-white text-center shadow-lg">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      {achievement.icon}
                      <span className="text-sm font-bold">{achievement.text}</span>
                    </div>
                    <p className="text-yellow-100 text-xs">{achievement.subtext}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Enhanced Stats Section */}
          <div className="xl:w-1/2">
            <div className={`bg-white/90 backdrop-blur-xl rounded-4xl p-8 shadow-3xl border border-white/60 transition-all duration-1000 delay-800 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              
              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-6 mb-8">
                {stats.map((stat, index) => (
                  <div 
                    key={index}
                    className="group relative bg-gradient-to-br from-white to-gray-50 rounded-3xl p-6 text-center shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 border border-white/40"
                  >
                    <div className={`${stat.bgColor} w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                      <div className={stat.color}>
                        {stat.icon}
                      </div>
                    </div>
                    
                    <div className="text-3xl font-black text-gray-800 mb-2 transition-all duration-300">
                      {stat.number}
                    </div>
                    
                    <div className="text-gray-600 font-semibold mb-1">{stat.label}</div>
                    <div className="text-xs text-gray-500">{stat.description}</div>
                    
                    {/* Hover Effect */}
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                ))}
              </div>
              
              {/* Progress Bars */}
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>رضایت مشتریان</span>
                  <span className="font-bold text-green-600">۹۸٪</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-gradient-to-r from-green-500 to-teal-500 h-3 rounded-full transition-all duration-1000" style={{ width: '98%' }}></div>
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>سرعت اجرا</span>
                  <span className="font-bold text-blue-600">۹۵٪</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-3 rounded-full transition-all duration-1000 delay-300" style={{ width: '95%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Values Section */}
        <div className={`text-center transition-all duration-1000 delay-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="flex items-center justify-center gap-4 mb-12">
            <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent flex-1"></div>
            <h3 className="text-3xl sm:text-4xl font-black text-gray-900 whitespace-nowrap">
              ارزش‌های <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">بنیادین</span>
            </h3>
            <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent flex-1"></div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div 
                key={index}
                className="group relative"
                onMouseEnter={() => setActiveValue(index)}
              >
                <div className={`${value.bgGradient} rounded-4xl p-8 text-right border border-white/60 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 backdrop-blur-sm h-full`}>
                  
                  <div className="flex items-start justify-between mb-6">
                    <div className={`w-16 h-16 bg-gradient-to-r ${value.color} rounded-3xl flex items-center justify-center text-white shadow-2xl transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300`}>
                      {value.icon}
                    </div>
                    
                    <div className="flex gap-2">
                      {value.features.map((feature, idx) => (
                        <span key={idx} className="bg-white/80 backdrop-blur-sm text-gray-700 px-3 py-1 rounded-xl text-xs font-medium border border-white/40">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <h4 className="text-2xl font-black text-gray-800 mb-4 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                    {value.title}
                  </h4>
                  
                  <p className="text-gray-700 leading-relaxed text-justify font-medium">
                    {value.description}
                  </p>

                  {/* Animated Check Circle */}
                  <div className="flex justify-start mt-6">
                    <div className={`w-8 h-8 bg-gradient-to-r ${value.color} rounded-full flex items-center justify-center text-white transform group-hover:scale-110 transition-all duration-300`}>
                      <PiCheckCircle className="text-lg" />
                    </div>
                  </div>
                </div>

                {/* Active State Indicator */}
                {activeValue === index && (
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-4xl opacity-20 blur-sm transition-all duration-500"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Mission Vision Section */}
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 mt-20 transition-all duration-1000 delay-1200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-4xl p-8 text-white shadow-3xl">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mb-6">
              <PiTarget className="text-2xl" />
            </div>
            <h4 className="text-2xl font-black mb-4">ماموریت ما</h4>
            <p className="text-blue-100 leading-relaxed text-justify">
              ایجاد تحول دیجیتال در صنعت رستوران‌داری با ارائه راهکارهای نوآورانه که کارایی را افزایش داده و تجربه‌ای استثنایی برای مشتریان و صاحبان کسب‌وکار خلق می‌کند.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-green-500 to-teal-600 rounded-4xl p-8 text-white shadow-3xl">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mb-6">
              <PiTrendUp className="text-2xl" />
            </div>
            <h4 className="text-2xl font-black mb-4">چشم‌انداز ما</h4>
            <p className="text-green-100 leading-relaxed text-justify">
              تبدیل شدن به پلتفرم پیشرو در خاورمیانه برای دیجیتالی‌سازی رستوران‌ها و کافه‌ها، با تمرکز بر نوآوری، کیفیت و رضایت مشتری.
            </p>
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

export default About;