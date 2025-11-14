import React, { useState, useEffect, useRef } from 'react';
import { 
  PiHeart,
  PiHeartFill,
  PiCaretUp,
  PiPhone,
  PiEnvelope,
  PiMapPin,
  PiClock,
  PiWhatsappLogo,
  PiTelegramLogo,
  PiInstagramLogo,
  PiLinkedinLogo,
  PiTwitterLogo,
  PiYoutubeLogo,
  PiStarFill,
  PiShieldCheck,
  PiCertificate,
  PiMedal,
  PiSparkle,
  PiShootingStar,
  PiRocket,
  PiUserCircle,
  PiGear,
  PiHeadset,
  PiQuestion,
  PiBookOpen,
  PiNewspaper,
  PiShield,
  PiLock,
  PiEye,
  PiEyeSlash
} from 'react-icons/pi';

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [liked, setLiked] = useState(false);
  const [currentYear] = useState(new Date().getFullYear());
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

    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = [
    { name: 'صفحه اصلی', href: '#home' },
    { name: 'خدمات', href: '#services' },
    { name: 'نمونه کارها', href: '#portfolio' },
    { name: 'درباره ما', href: '#about' },
    { name: 'نظرات مشتریان', href: '#testimonials' },
    { name: 'تماس با ما', href: '#contact' }
  ];

  const services = [
    'منوی دیجیتال پایه',
    'منوی دیجیتال پیشرفته',
    'سیستم سفارش آنلاین',
    'پنل مدیریت رستوران',
    'آنالیز و گزارش‌گیری',
    'پشتیبانی ۲۴ ساعته'
  ];

  const supportLinks = [
    { name: 'مرکز پشتیبانی', href: '/support', icon: <PiHeadset /> },
    { name: 'مستندات', href: '/docs', icon: <PiBookOpen /> },
    { name: 'آموزش‌ها', href: '/tutorials', icon: <PiQuestion /> },
    { name: 'وبلاگ', href: '/blog', icon: <PiNewspaper /> }
  ];

  const legalLinks = [
    { name: 'قوانین و مقررات', href: '/terms' },
    { name: 'حریم خصوصی', href: '/privacy' },
    { name: 'سوالات متداول', href: '/faq' }
  ];

  const socialMedia = [
    { icon: <PiInstagramLogo className="text-xl" />, name: 'اینستاگرام', color: 'from-pink-500 to-rose-500', href: '#' },
    { icon: <PiLinkedinLogo className="text-xl" />, name: 'لینکدین', color: 'from-blue-600 to-blue-700', href: '#' },
    { icon: <PiTelegramLogo className="text-xl" />, name: 'تلگرام', color: 'from-blue-400 to-indigo-500', href: '#' },
    { icon: <PiTwitterLogo className="text-xl" />, name: 'توییتر', color: 'from-blue-400 to-cyan-500', href: '#' },
    { icon: <PiYoutubeLogo className="text-xl" />, name: 'یوتیوب', color: 'from-red-500 to-red-600', href: '#' }
  ];

  const achievements = [
    { icon: <PiMedal className="text-lg" />, text: 'برنده جایزه نوآوری', year: '۱۴۰۲' },
    { icon: <PiMedal className="text-lg" />, text: 'رتبه ۱ صنعت', year: '۱۴۰۱-۱۴۰۲' },
    { icon: <PiCertificate className="text-lg" />, text: 'ISO 9001', year: '۱۴۰۰' },
    { icon: <PiShieldCheck className="text-lg" />, text: 'گواهی امنیت', year: '۱۴۰۱' }
  ];

  const contactInfo = [
    { icon: <PiPhone className="text-lg" />, info: '۰۲۱-۱۲۳۴۵۶۷۸', description: 'پشتیبانی تلفنی' },
    { icon: <PiWhatsappLogo className="text-lg" />, info: '۰۹۱۲۱۲۳۴۵۶۷', description: 'پاسخ سریع' },
    { icon: <PiEnvelope className="text-lg" />, info: 'info@menudigital.ir', description: 'ایمیل رسمی' },
    { icon: <PiMapPin className="text-lg" />, info: 'تهران، خیابان ولیعصر', description: 'دفتر مرکزی' }
  ];

  const workingHours = [
    { day: 'شنبه - چهارشنبه', hours: '۸:۰۰ تا ۱۷:۰۰' },
    { day: 'پنجشنبه', hours: '۸:۰۰ تا ۱۴:۰۰' },
    { day: 'پشتیبانی فوری', hours: '۲۴/۷', highlight: true }
  ];

  return (
    <footer ref={sectionRef} className="relative bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 overflow-hidden">
      
      {/* Advanced Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full mix-blend-soft-light filter blur-3xl animate-float-slow"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full mix-blend-soft-light filter blur-3xl animate-float-slower"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-cyan-500/5 rounded-full mix-blend-soft-light filter blur-3xl animate-pulse"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-10 left-20 opacity-10 animate-float">
        <PiSparkle className="text-4xl text-blue-400" />
      </div>
      <div className="absolute bottom-20 right-32 opacity-10 animate-float-delayed">
        <PiShootingStar className="text-5xl text-purple-400" />
      </div>
      <div className="absolute top-1/3 right-1/4 opacity-5 animate-float-slow">
        <PiRocket className="text-3xl text-cyan-400" />
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Section - Main Links */}
        <div className={`py-16 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-6 gap-8">
            
            {/* Brand Column */}
            <div className="xl:col-span-2">
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl flex items-center justify-center shadow-2xl">
                    <PiStarFill className="text-xl text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-white">منوی دیجیتال</h3>
                    <p className="text-gray-400 text-sm">پیشرو در صنعت رستوران‌داری</p>
                  </div>
                </div>
                
                <p className="text-gray-300 leading-relaxed mb-6">
                  ما با ارائه راهکارهای نوآورانه در زمینه منوی دیجیتال، به رستوران‌ها و کافه‌ها کمک می‌کنیم تا تجربه‌ای استثنایی برای مشتریان خود خلق کنند.
                </p>
                
                {/* Achievements */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {achievements.slice(0, 2).map((achievement, index) => (
                    <div key={index} className="bg-white/5 backdrop-blur-sm rounded-2xl p-3 border border-white/10">
                      <div className="flex items-center gap-2">
                        <div className="text-yellow-400">
                          {achievement.icon}
                        </div>
                        <div>
                          <div className="text-white text-sm font-medium">{achievement.text}</div>
                          <div className="text-gray-400 text-xs">{achievement.year}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Media */}
              <div className="mb-6">
                <h4 className="text-lg font-black text-white mb-4">ما را دنبال کنید</h4>
                <div className="flex gap-3">
                  {socialMedia.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      className={`group w-12 h-12 bg-gradient-to-r ${social.color} rounded-2xl flex items-center justify-center text-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 transform backdrop-blur-sm`}
                      title={social.name}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>

              {/* Like Button */}
              <button
                onClick={() => setLiked(!liked)}
                className={`group flex items-center gap-2 px-4 py-2 rounded-2xl transition-all duration-300 ${
                  liked 
                    ? 'bg-red-500/20 text-red-400 border border-red-500/30' 
                    : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10'
                }`}
              >
                {liked ? (
                  <PiHeartFill className="text-red-400 animate-pulse" />
                ) : (
                  <PiHeart className="group-hover:text-red-400 transition-colors duration-300" />
                )}
                <span className="text-sm font-medium">
                  {liked ? 'پسندیده شد!' : 'پسندیدن'}
                </span>
              </button>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-black text-white mb-6">لینک‌های سریع</h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-2 flex items-center gap-2 group"
                    >
                      <PiCaretUp className="transform rotate-90 text-gray-500 group-hover:text-white transition-colors duration-300" />
                      <span>{link.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-lg font-black text-white mb-6">خدمات ما</h4>
              <ul className="space-y-3">
                {services.map((service, index) => (
                  <li key={index}>
                    <a
                      href="#"
                      className="text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-2 flex items-center gap-2 group"
                    >
                      <PiGear className="text-gray-500 group-hover:text-blue-400 transition-colors duration-300" />
                      <span>{service}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-lg font-black text-white mb-6">پشتیبانی</h4>
              <ul className="space-y-3 mb-6">
                {supportLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-2 flex items-center gap-2 group"
                    >
                      <span className="text-gray-500 group-hover:text-green-400 transition-colors duration-300">
                        {link.icon}
                      </span>
                      <span>{link.name}</span>
                    </a>
                  </li>
                ))}
              </ul>

              {/* Legal Links */}
              <div className="pt-6 border-t border-gray-700">
                <ul className="space-y-2">
                  {legalLinks.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.href}
                        className="text-gray-400 hover:text-gray-300 text-sm transition-colors duration-300 flex items-center gap-2"
                      >
                        <PiShield className="text-gray-500 text-xs" />
                        <span>{link.name}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-black text-white mb-6">تماس با ما</h4>
              <div className="space-y-4 mb-6">
                {contactInfo.map((contact, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="text-blue-400 mt-1 flex-shrink-0">
                      {contact.icon}
                    </div>
                    <div>
                      <div className="text-white font-medium text-sm">{contact.info}</div>
                      <div className="text-gray-400 text-xs">{contact.description}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Working Hours */}
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                <h5 className="text-white font-bold mb-3 text-sm">ساعات کاری</h5>
                <div className="space-y-2">
                  {workingHours.map((schedule, index) => (
                    <div key={index} className={`flex justify-between text-xs ${
                      schedule.highlight ? 'text-green-400' : 'text-gray-400'
                    }`}>
                      <span>{schedule.day}</span>
                      <span className="font-medium">{schedule.hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Section - Newsletter & Trust */}
        <div className={`py-8 border-t border-gray-700 transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            
            {/* Newsletter */}
            <div>
              <h4 className="text-lg font-black text-white mb-3">عضویت در خبرنامه</h4>
              <p className="text-gray-300 text-sm mb-4">
                از آخرین اخبار، تخفیف‌ها و به‌روزرسانی‌ها مطلع شوید
              </p>
              
              <div className="flex gap-3">
                <input
                  type="email"
                  placeholder="آدرس ایمیل شما"
                  className="flex-1 bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300"
                />
                <button className="bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-gray-900 px-6 py-3 rounded-2xl font-bold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2">
                  <PiEnvelope className="text-lg" />
                  <span>عضویت</span>
                </button>
              </div>
            </div>

            {/* Trust Badges */}
            <div>
              <h4 className="text-lg font-black text-white mb-4 text-center lg:text-left">گواهی‌ها و اعتبارها</h4>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="bg-white/5 backdrop-blur-sm rounded-2xl p-3 text-center border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105">
                    <div className="text-yellow-400 mb-2 flex justify-center">
                      {achievement.icon}
                    </div>
                    <div className="text-white text-xs font-medium mb-1">{achievement.text}</div>
                    <div className="text-gray-400 text-xs">{achievement.year}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Copyright */}
        <div className={`py-6 border-t border-gray-700 transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            
            {/* Copyright */}
            <div className="flex items-center gap-4 text-gray-400 text-sm">
              <div className="flex items-center gap-2">
                <PiLock className="text-green-400" />
                <span>سایت امن</span>
              </div>
              <div className="w-px h-4 bg-gray-600"></div>
              <span>کلیه حقوق محفوظ است © {currentYear.toLocaleString('fa-IR')}</span>
              <div className="w-px h-4 bg-gray-600"></div>
              <span>منوی دیجیتال</span>
            </div>

            {/* Additional Links */}
            <div className="flex items-center gap-6 text-gray-400 text-sm">
              <div className="flex items-center gap-2">
                <PiUserCircle className="text-blue-400" />
                <span>۵۰۰+ مشتری راضی</span>
              </div>
              <div className="w-px h-4 bg-gray-600"></div>
              <div className="flex items-center gap-2">
                <PiShieldCheck className="text-green-400" />
                <span>ضمانت کیفیت</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 left-8 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 flex items-center justify-center z-50 ${
          showBackToTop ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}
      >
        <PiCaretUp className="text-xl" />
      </button>

      {/* Live Support Floating Button */}
      <div className="fixed bottom-8 right-8 flex flex-col gap-3 z-50">
        <a
          href="https://wa.me/989121234567"
          className="w-14 h-14 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 flex items-center justify-center group"
        >
          <PiWhatsappLogo className="text-2xl" />
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-400 rounded-full animate-ping"></div>
        </a>
        
        <a
          href="tel:+982112345678"
          className="w-14 h-14 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 flex items-center justify-center group"
        >
          <PiPhone className="text-xl" />
          <div className="absolute -top-2 -right-2 w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
        </a>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(5deg); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-5px) scale(1.05); }
        }
        @keyframes float-slower {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-3px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(-5deg); }
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
      `}</style>
    </footer>
  );
};

export default Footer;