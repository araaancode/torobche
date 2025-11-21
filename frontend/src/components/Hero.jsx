import React, { useMemo, useState, useCallback, useRef, useEffect } from 'react';
import { 
  PiPlayCircle, 
  PiCards, 
  PiQrCode, 
  PiArrowDown, 
  PiForkKnife, 
  PiUserCircle, 
  PiFileText, 
  PiBuilding, 
  PiStar,
  PiClock,
  PiHamburger,
  PiCheckCircle,
  PiSparkle,
  PiCrown,
  PiShieldCheck,
  PiRocket,
  PiTrendUp,
  PiStethoscope,
  PiBriefcase,
  PiGraduationCap,
  PiPhone,
  PiMapPin,
  PiEnvelope,
  PiGlobe,
  PiLinkedinLogo,
  PiGitBranch,
  PiHeartbeat,
  PiCode,
  PiCoffee
} from 'react-icons/pi';

// ========== CONSTANTS & CONFIG ==========
const CARD_TYPES = [
  { 
    name: 'منوی رستوران', 
    icon: <PiForkKnife className="text-2xl" />, 
    color: 'from-orange-500 to-red-500',
    bgColor: 'bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/30 dark:to-red-950/30',
    borderColor: 'border-orange-200 dark:border-orange-800',
    description: 'منوی آنلاین تعاملی با قابلیت سفارش'
  },
  { 
    name: 'کارت مطب', 
    icon: <PiStethoscope className="text-2xl" />, 
    color: 'from-green-500 to-teal-500',
    bgColor: 'bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-950/30 dark:to-teal-950/30',
    borderColor: 'border-green-200 dark:border-green-800',
    description: 'کارت دیجیتال پزشکان با نوبت‌دهی'
  },
  { 
    name: 'کارت کسب‌وکار', 
    icon: <PiBriefcase className="text-2xl" />, 
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30',
    borderColor: 'border-blue-200 dark:border-blue-800',
    description: 'کارت ویزیت هوشمند با analytics'
  },
  { 
    name: 'رزومه دیجیتال', 
    icon: <PiGraduationCap className="text-2xl" />, 
    color: 'from-purple-500 to-pink-500',
    bgColor: 'bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30',
    borderColor: 'border-purple-200 dark:border-purple-800',
    description: 'رزومه پویا با قابلیت نمایش نمونه کار'
  }
];


const STATS = [
  { value: '۱۰,۰۰۰+', label: 'کارت فعال', trend: '+۲۴٪' },
  { value: '۹۸٪', label: 'رضایت مشتری', trend: '+۵٪' },
  { value: '۲۴/۷', label: 'پشتیبانی', trend: '۱۰۰٪' }
];

// ========== CARD PREVIEWS DATA ==========
const CARD_PREVIEWS = {
  restaurant: {
    type: 'منوی رستوران',
    title: 'برگرلند',
    subtitle: 'رستوران فست فود',
    icon: <PiHamburger className="text-2xl text-orange-500" />,
    image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2015&q=80',
    stats: [
      { value: '۳۰+', label: 'انواع برگر' },
      { icon: <PiClock className="text-blue-500 text-lg" />, label: 'آماده‌سازی' },
      { value: '۲۴/۷', label: 'سرویس‌دهی' }
    ],
    featured: {
      title: 'برگر ویژه',
      description: 'گوشت آنگری، پنیر چدار، قارچ',
      price: '۴۵,۰۰۰'
    },
    status: 'همین حالا باز است',
    badge: 'تحویل رایگان',
    badgeText: 'سفارش بالای ۵۰٬۰۰۰',
    color: 'orange'
  },
  doctor: {
    type: 'کارت مطب',
    title: 'دکتر سارا محمدی',
    subtitle: 'متخصص قلب و عروق',
    icon: <PiHeartbeat className="text-2xl text-green-500" />,
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    stats: [
      { value: '۱۵+', label: 'سال تجربه' },
      { icon: <PiStar className="text-yellow-500 fill-current text-lg" />, label: 'امتیاز ۴.۹' },
      { value: '۵۰۰+', label: 'بیمار راضی' }
    ],
    featured: {
      title: 'نوبت‌دهی آنلاین',
      description: 'دریافت نوبت اینترنتی',
      price: 'رایگان'
    },
    contact: [
      { icon: <PiPhone className="text-blue-500" />, text: '۰۹۱۲XXX XXXX' },
      { icon: <PiMapPin className="text-green-500" />, text: 'تهران، جردن' }
    ],
    status: 'آماده ویزیت',
    badge: 'تضمین کیفیت',
    color: 'green'
  },
  business: {
    type: 'کارت کسب‌وکار',
    title: 'شرکت نوآوران فناوری',
    subtitle: 'ارائه‌دهنده راه‌حل‌های نرم‌افزاری',
    icon: <PiCode className="text-2xl text-blue-500" />,
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80',
    stats: [
      { value: '۵۰+', label: 'پروژه موفق' },
      { icon: <PiTrendUp className="text-purple-500 text-lg" />, label: 'رشد ۲۰۰٪' },
      { value: '۱۰۰٪', label: 'رضایت مشتری' }
    ],
    featured: {
      title: 'مشاوره رایگان',
      description: 'مشاوره تخصصی کسب‌وکار',
      price: 'رایگان'
    },
    contact: [
      { icon: <PiEnvelope className="text-red-500" />, text: 'info@company.com' },
      { icon: <PiGlobe className="text-green-500" />, text: 'www.company.com' }
    ],
    status: 'در دسترس',
    badge: 'پروژه‌های بین‌المللی',
    color: 'blue'
  },
  resume: {
    type: 'رزومه دیجیتال',
    title: 'علی رضایی',
    subtitle: 'توسعه‌دهنده ارشد فرانت‌اند',
    icon: <PiCoffee className="text-2xl text-purple-500" />,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
    stats: [
      { value: '۸+', label: 'سال تجربه' },
      { icon: <PiGitBranch className="text-orange-500 text-lg" />, label: '۵۰+ پروژه' },
      { value: '۲۴', label: 'مهارت تخصصی' }
    ],
    featured: {
      title: 'نمونه کارها',
      description: 'دیدن پروژه‌های انجام شده',
      price: 'مشاهده'
    },
    contact: [
      { icon: <PiLinkedinLogo className="text-blue-600" />, text: 'linkedin.com/in/ali' },
      { icon: <PiEnvelope className="text-gray-500" />, text: 'ali.rezaei@email.com' }
    ],
    status: 'در جستجوی فرصت‌های جدید',
    badge: 'توصیه‌شده',
    color: 'purple'
  }
};

// ========== CUSTOM HOOKS ==========
const useIntersectionObserver = (threshold = 0.1) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold]);

  return [ref, isIntersecting];
};

const useFloatAnimation = (initialHovered = false) => {
  const [isHovered, setIsHovered] = useState(initialHovered);
  
  const handlers = useMemo(() => ({
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: () => setIsHovered(false),
  }), []);

  return {
    floatClass: isHovered ? '' : 'animate-float',
    hoverHandlers: handlers,
    isHovered
  };
};

const useImageLoader = (initialLoaded = false) => {
  const [imageLoaded, setImageLoaded] = useState(initialLoaded);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
    setImageError(false);
  }, []);

  const handleImageError = useCallback(() => {
    setImageError(true);
    setImageLoaded(false);
  }, []);

  return {
    imageLoaded,
    imageError,
    handleImageLoad,
    handleImageError
  };
};

const useCardNavigation = () => {
  const [activeCard, setActiveCard] = useState('restaurant');
  const [direction, setDirection] = useState('next');

  const navigateToCard = useCallback((cardType) => {
    const cardTypes = Object.keys(CARD_PREVIEWS);
    const currentIndex = cardTypes.indexOf(activeCard);
    const newIndex = cardTypes.indexOf(cardType);
    setDirection(newIndex > currentIndex ? 'next' : 'prev');
    setActiveCard(cardType);
  }, [activeCard]);

  // Auto-rotate cards
  useEffect(() => {
    const cardTypes = Object.keys(CARD_PREVIEWS);
    const interval = setInterval(() => {
      setDirection('next');
      setActiveCard(current => {
        const currentIndex = cardTypes.indexOf(current);
        const nextIndex = (currentIndex + 1) % cardTypes.length;
        return cardTypes[nextIndex];
      });
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return {
    activeCard,
    direction,
    navigateToCard
  };
};

// ========== REUSABLE COMPONENTS ==========
const AnimatedSection = ({ children, className = "", delay = 0 }) => {
  const [ref, isIntersecting] = useIntersectionObserver(0.1);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isIntersecting 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-8'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const FloatingElement = ({ children, className = "", hoverEnabled = true, delay = 0 }) => {
  const { floatClass, hoverHandlers } = useFloatAnimation();
  const [ref, isIntersecting] = useIntersectionObserver(0.1);

  return (
    <div 
      ref={ref}
      className={`transform transition-all duration-1000 ease-out ${
        isIntersecting 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-8'
      } ${hoverEnabled ? floatClass : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
      {...(hoverEnabled ? hoverHandlers : {})}
    >
      {children}
    </div>
  );
};

const CardTypeSelector = ({ types, activeType, onTypeChange }) => {
  return (
    <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-6">
      {types.map((type, index) => {
        const cardKey = Object.keys(CARD_PREVIEWS)[index];
        const isActive = activeType === cardKey;
        
        return (
          <button
            key={type.name}
            onClick={() => onTypeChange(cardKey)}
            className={`flex items-center space-x-3 rtl:space-x-reverse px-4 py-3 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 backdrop-blur-sm border ${
              isActive
                ? 'bg-white/80 dark:bg-gray-800/80 shadow-lg border-white/30 dark:border-gray-700'
                : 'bg-white/50 dark:bg-gray-800/50 shadow-md hover:shadow-lg border-white/20 dark:border-gray-600'
            }`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ml-2 ${
              isActive 
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white scale-110' 
                : 'bg-gray-100/80 dark:bg-gray-700/80 text-gray-600 dark:text-gray-400'
            }`}>
              {type.icon}
            </div>
            <div className="text-right">
              <div className={`text-sm font-bold transition-colors duration-300  ${
                isActive
                  ? 'text-gray-800 dark:text-white'
                  : 'text-gray-600 dark:text-gray-400'
              }`}>
                {type.name}
              </div>
              <div className={`text-xs transition-all duration-300 ${
                isActive
                  ? 'text-gray-600 dark:text-gray-300 opacity-100'
                  : 'text-gray-500 dark:text-gray-500 opacity-0 h-0'
              }`}>
                {type.description}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
};

const FeatureItem = ({ feature, index }) => {
  const [ref, isIntersecting] = useIntersectionObserver(0.1);
  const delay = index * 150;

  return (
    <div 
      ref={ref}
      className="flex items-center space-x-3 rtl:space-x-reverse bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-3 shadow-lg hover:shadow-xl transition-all duration-300 group hover:scale-105 border border-white/30 dark:border-gray-700"
      style={{
        opacity: isIntersecting ? 1 : 0,
        transform: isIntersecting ? 'translateX(0)' : 'translateX(-20px)',
        transitionDelay: `${delay}ms`
      }}
      role="listitem"
    >
      <div className="flex-shrink-0">
        <div className="w-10 h-10 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-white/50 dark:border-gray-600">
          {feature.icon}
        </div>
      </div>
      <div className="flex-1 min-w-0 text-right">
        <div className="text-sm font-bold text-gray-800 dark:text-white mb-1">
          {feature.text}
        </div>
        <div className="text-xs text-gray-600 dark:text-gray-400">
          {feature.description}
        </div>
      </div>
    </div>
  );
};

const StatItem = ({ stat, index, isLast }) => {
  const [ref, isIntersecting] = useIntersectionObserver(0.1);
  const delay = index * 200;

  return (
    <>
      <div 
        ref={ref}
        className="text-center transform transition-all duration-700 ease-out"
        style={{
          opacity: isIntersecting ? 1 : 0,
          transform: isIntersecting ? 'translateY(0)' : 'translateY(30px)',
          transitionDelay: `${delay}ms`
        }}
      >
        <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse mb-1">
          <div 
            className="text-xl lg:text-2xl font-black text-gray-900 dark:text-white"
            aria-label={`${stat.value} ${stat.label}`}
          >
            {stat.value}
          </div>
          <span className="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded-full font-bold backdrop-blur-sm">
            {stat.trend}
          </span>
        </div>
        <div className="text-gray-600 dark:text-gray-400 text-sm">{stat.label}</div>
      </div>
      {!isLast && (
        <div 
          className="w-px h-10 bg-gradient-to-b from-transparent via-gray-300 dark:via-gray-600 to-transparent"
          aria-hidden="true"
        />
      )}
    </>
  );
};

const CTAButton = ({ 
  children, 
  icon, 
  variant = "primary", 
  className = "",
  onClick,
  ...props 
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const baseStyles = "group px-6 py-3 rounded-2xl font-bold transition-all duration-500 ease-out flex items-center justify-center space-x-2 rtl:space-x-reverse min-w-[180px] focus:outline-none focus:ring-2 focus:ring-offset-2 backdrop-blur-sm";
  
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

const OptimizedImage = ({ 
  src, 
  alt, 
  className = "",
  fallbackIcon = <PiHamburger className="text-4xl text-orange-400" />
}) => {
  const { imageLoaded, imageError, handleImageLoad, handleImageError } = useImageLoader();

  return (
    <div className={`relative overflow-hidden rounded-2xl ${className}`}>
      {!imageError ? (
        <>
          <img 
            src={src}
            alt={alt}
            className={`w-full h-full object-cover transition-all duration-700 ease-out ${
              imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
            }`}
            onLoad={handleImageLoad}
            onError={handleImageError}
            loading="lazy"
            decoding="async"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </>
      ) : (
        <div 
          className="w-full h-full bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900/20 dark:to-red-900/20 flex items-center justify-center backdrop-blur-sm"
          role="img"
          aria-label={alt}
        >
          {fallbackIcon}
        </div>
      )}
      
      {/* Enhanced Loading Skeleton */}
      {!imageLoaded && !imageError && (
        <div 
          className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 animate-pulse backdrop-blur-sm"
          aria-hidden="true"
        />
      )}
    </div>
  );
};

const CardPreview = ({ cardData, isActive, direction }) => {
  const { 
    type, title, subtitle, icon, image, stats, featured, contact, status, badge, badgeText, color 
  } = cardData;

  const getColorClasses = (color) => {
    const colors = {
      orange: 'from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border-orange-200 dark:border-orange-800 text-orange-600 dark:text-orange-400',
      green: 'from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 border-green-200 dark:border-green-800 text-green-600 dark:text-green-400',
      blue: 'from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400',
      purple: 'from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-800 text-purple-600 dark:text-purple-400'
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className={`bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl border border-white/30 dark:border-gray-700 transform transition-all duration-700 ${
      isActive 
        ? 'opacity-100 translate-x-0 scale-100 rotate-3 hover:rotate-0' 
        : `opacity-0 translate-x-${direction === 'next' ? '20' : '-20'} scale-95`
    } hover:shadow-3xl group cursor-grab active:cursor-grabbing`}>
      
      {/* Card Header */}
      <div className="relative h-40 sm:h-48 md:h-56 overflow-hidden">
        <OptimizedImage
          src={image}
          alt={`${title} - ${subtitle}`}
          className="h-full group-hover:scale-105 transition-transform duration-700"
        />
        
        {/* Card Type Badge */}
        <div className="absolute top-3 left-3">
          <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg rounded-2xl p-2 shadow-xl transform hover:scale-110 transition-transform duration-300 border border-white/30 dark:border-gray-600">
            {icon}
          </div>
        </div>

        {/* Rating/Status Badge */}
        <div className="absolute top-3 right-3">
          <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg rounded-2xl px-3 py-1 shadow-xl transform hover:scale-105 transition-transform duration-300 border border-white/30 dark:border-gray-600">
            <span className="font-black text-gray-900 dark:text-white text-sm">{badge}</span>
          </div>
        </div>

        {/* Title Section */}
        <div className="absolute bottom-3 right-3 text-right">
          <h3 className="text-lg sm:text-xl font-black text-white drop-shadow-2xl">{title}</h3>
          <p className="text-white/90 text-sm drop-shadow-lg">{subtitle}</p>
          <p className="text-white/80 text-xs drop-shadow-lg mt-1">{type}</p>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 sm:p-5">
        {/* Stats Section */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4">
          {stats.map((stat, index) => (
            <div key={index} className="text-center bg-gray-50/80 dark:bg-gray-700/80 backdrop-blur-sm rounded-xl p-2 transform hover:scale-105 transition-transform duration-300 cursor-pointer border border-white/30 dark:border-gray-600">
              {stat.value ? (
                <div className="text-base sm:text-lg font-black text-gray-900 dark:text-white mb-1">
                  {stat.value}
                </div>
              ) : (
                <div className="flex justify-center mb-1 text-base">
                  {stat.icon}
                </div>
              )}
              <div className="text-gray-500 dark:text-gray-400 text-xs">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Featured Section */}
        <div className={`bg-gradient-to-r ${getColorClasses(color)} rounded-xl p-3 mb-4 border transform hover:scale-[1.02] transition-transform duration-300 backdrop-blur-sm`}>
          <div className="flex items-center justify-between">
            <div className="text-right">
              <h4 className="font-black text-gray-900 dark:text-white text-sm sm:text-base mb-1">
                {featured.title}
              </h4>
              <p className="text-gray-600 dark:text-gray-300 text-xs">
                {featured.description}
              </p>
            </div>
            <div className="text-left">
              <div className={`text-base sm:text-lg font-black ${getColorClasses(color).split(' ').find(cls => cls.startsWith('text-'))}`}>
                {featured.price}
              </div>
            </div>
          </div>
        </div>

        {/* Contact Info (for doctor, business, resume) */}
        {contact && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
            {contact.map((item, index) => (
              <div key={index} className="flex items-center space-x-2 rtl:space-x-reverse bg-gray-50/80 dark:bg-gray-700/80 backdrop-blur-sm rounded-xl p-2 transform hover:scale-105 transition-transform duration-300 cursor-pointer border border-white/30 dark:border-gray-600">
                {item.icon}
                <span className="text-xs text-gray-700 dark:text-gray-300">{item.text}</span>
              </div>
            ))}
          </div>
        )}

        {/* Status Section */}
        <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-2 border border-green-300 dark:border-green-800 transform hover:scale-105 transition-transform duration-300 cursor-pointer backdrop-blur-sm">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-green-800 dark:text-green-400 font-bold text-xs">
            {status}
          </span>
        </div>
      </div>
    </div>
  );
};

// ========== MAIN COMPONENT ==========
const Hero = () => {
  const cardTypes = useMemo(() => CARD_TYPES, []);
  const stats = useMemo(() => STATS, []);
  
  const { activeCard, direction, navigateToCard } = useCardNavigation();
  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDemoClick = useCallback(() => {
    console.log('Demo clicked - Active card:', activeCard);
  }, [activeCard]);

  const handleCreateCard = useCallback(() => {
    console.log('Create card clicked for:', activeCard);
  }, [activeCard]);

  return (
    <section 
      id="home" 
      className="min-h-screen relative overflow-hidden pt-20 pb-12 md:pt-28 md:pb-16 bg-gradient-to-br from-gray-50/95 via-blue-50/95 to-purple-50/95 dark:from-gray-900/95 dark:via-blue-900/20 dark:to-purple-900/20 transition-all duration-1000 backdrop-blur-sm"
      aria-label="صفحه اصلی پلتفرم کارت دیجیتال تربچه"
    >
      {/* Enhanced Animated Background with Scroll Effects */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className={`absolute top-8 left-8 w-64 h-64 md:w-80 md:h-80 bg-blue-300 dark:bg-blue-600 rounded-full blur-3xl opacity-20 animate-pulse transition-transform duration-2000 ${
          isScrolled ? 'scale-110' : 'scale-100'
        }`} />
        <div className={`absolute bottom-8 right-8 w-64 h-64 md:w-80 md:h-80 bg-purple-300 dark:bg-purple-600 rounded-full blur-3xl opacity-20 animate-pulse delay-1000 transition-transform duration-2000 ${
          isScrolled ? 'scale-110' : 'scale-100'
        }`} />
        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-56 h-56 md:w-72 md:h-72 bg-cyan-300 dark:bg-cyan-600 rounded-full blur-3xl opacity-20 animate-pulse delay-500 transition-transform duration-2000 ${
          isScrolled ? 'scale-110' : 'scale-100'
        }`} />
        
        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02] backdrop-blur-sm">
          <div 
            className="absolute inset-0 animate-grid-flow"
            style={{
              backgroundImage: `linear-gradient(#e5e7eb 1px, transparent 1px), linear-gradient(90deg, #e5e7eb 1px, transparent 1px)`,
              backgroundSize: '50px 50px',
            }}
          />
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1.5 h-1.5 bg-blue-400/30 dark:bg-blue-500/20 rounded-full animate-float-particle backdrop-blur-sm"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${10 + Math.random() * 10}s`
              }}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 xl:gap-16">
          
          {/* Content Section */}
          <div className="lg:w-1/2 text-center lg:text-right order-2 lg:order-1">
            {/* Premium Badge with Animation */}
            <AnimatedSection delay={100}>
              <div 
                className="inline-flex items-center space-x-2 rtl:space-x-reverse bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl px-4 py-2 mb-6 shadow-xl border border-white/30 dark:border-gray-700 hover:shadow-2xl transition-all duration-500 hover:scale-105 group cursor-pointer"
                role="status"
                aria-label="پلتفرم شماره ۱ کارت دیجیتال"
              >
                <div className="flex items-center space-x-1 rtl:space-x-reverse">
                  <PiCrown className="text-yellow-500 text-base group-hover:scale-110 transition-transform duration-300" aria-hidden="true" />
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-ping backdrop-blur-sm" aria-hidden="true" />
                </div>
                <span className="text-xs font-black text-gray-800 dark:text-gray-200 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  پلتفرم شماره ۱ کارت دیجیتال
                </span>
                <PiSparkle className="text-purple-500 text-base group-hover:rotate-180 transition-transform duration-500" aria-hidden="true" />
              </div>
            </AnimatedSection>
            
            {/* Main Heading */}
            <AnimatedSection delay={200}>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black leading-tight mb-4 lg:mb-6">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent animate-gradient-x">
                  کارت دیجیتال
                </span>
                <br />
                <span className="text-gray-900 dark:text-white">هوشمند برای</span>
                <br />
                <span className="text-gray-900 dark:text-white">هر نیازی</span>
              </h1>
            </AnimatedSection>
            
            {/* Description */}
            <AnimatedSection delay={300}>
              <p className="text-base sm:text-lg lg:text-xl text-gray-700 dark:text-gray-300 mb-4 lg:mb-6 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                با <span className="font-black text-blue-600 dark:text-blue-400">تربچه</span> ما، کارت دیجیتال حرفه‌ای برای 
                <span className="font-black text-purple-600 dark:text-purple-400"> رستوران، مطب، رزومه و کسب‌وکار</span> خود ایجاد کنید.
              </p>
            </AnimatedSection>

            {/* Card Type Selector */}
            <AnimatedSection delay={400}>
              <CardTypeSelector 
                types={cardTypes}
                activeType={activeCard}
                onTypeChange={navigateToCard}
              />
            </AnimatedSection>

            
            {/* CTA Buttons */}
            <AnimatedSection delay={600} className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-6 lg:mb-8">
              <CTAButton
                icon={<PiPlayCircle className="text-lg" aria-hidden="true" />}
                variant="primary"
                onClick={handleDemoClick}
                aria-label="مشاهده دمو زنده از پلتفرم کارت دیجیتال"
              >
                مشاهده دمو زنده
              </CTAButton>
              
              <CTAButton
                icon={<PiCards className="text-purple-600 dark:text-purple-400 text-lg" aria-hidden="true" />}
                variant="secondary"
                onClick={handleCreateCard}
                aria-label="شروع ساخت کارت دیجیتال رایگان"
              >
                ساخت کارت رایگان
              </CTAButton>
            </AnimatedSection>
            
            {/* Stats */}
            <AnimatedSection delay={700}>
              <div 
                className="flex items-center justify-center lg:justify-start space-x-6 lg:space-x-8 rtl:space-x-reverse bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-4 lg:p-5 shadow-lg border border-white/50 dark:border-gray-700"
                role="region"
                aria-label="آمار و ارقام پلتفرم"
              >
                {stats.map((stat, index) => (
                  <StatItem 
                    key={index}
                    stat={stat}
                    index={index}
                    isLast={index === stats.length - 1}
                  />
                ))}
              </div>
            </AnimatedSection>
          </div>
          
          {/* Card Preview Section */}
          <div className="lg:w-1/2 relative order-1 lg:order-2 mb-12 lg:mb-0">
            <div className="relative max-w-md mx-auto lg:mx-0 lg:max-w-none">
              <FloatingElement delay={400}>
                {/* Main Card Preview */}
                <CardPreview 
                  cardData={CARD_PREVIEWS[activeCard]}
                  isActive={true}
                  direction={direction}
                />
                
                {/* QR Code Card */}
                <div className="absolute -bottom-4 -left-4 sm:-bottom-5 sm:-left-5">
                  <FloatingElement hoverEnabled={false} delay={800}>
                    <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-xl p-2 sm:p-3 shadow-lg border border-white/30 dark:border-gray-700 transform -rotate-6 hover:rotate-0 transition-transform duration-500 hover:shadow-xl group cursor-pointer">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white dark:bg-gray-700 rounded-lg flex items-center justify-center shadow-inner border border-gray-200 dark:border-gray-600 group-hover:scale-105 transition-transform duration-300">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 border-3 border-gray-900 dark:border-gray-100 flex items-center justify-center rounded backdrop-blur-sm">
                          <PiQrCode className="text-gray-900 dark:text-gray-100 text-lg" aria-hidden="true" />
                        </div>
                      </div>
                      <div className="text-center mt-1">
                        <span className="text-xs font-bold text-gray-900 dark:text-white">اسکن برای اطلاعات</span>
                      </div>
                    </div>
                  </FloatingElement>
                </div>

                {/* Type Badge */}
                <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 transform hover:scale-110 hover:rotate-12 transition-transform duration-300">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-2 sm:p-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer backdrop-blur-sm border border-blue-400/30"
                    role="status"
                    aria-label={`${CARD_PREVIEWS[activeCard].badge} - ${CARD_PREVIEWS[activeCard].badgeText || ''}`}
                  >
                    <div className="text-center">
                      <div className="text-xs font-black">{CARD_PREVIEWS[activeCard].badge}</div>
                      {CARD_PREVIEWS[activeCard].badgeText && (
                        <div className="text-[9px] opacity-90">{CARD_PREVIEWS[activeCard].badgeText}</div>
                      )}
                    </div>
                  </div>
                </div>
              </FloatingElement>
              
              {/* Background Decorations */}
              <div className="absolute -top-6 -right-6 w-24 h-24 sm:w-28 sm:h-28 bg-yellow-400 dark:bg-yellow-600 rounded-3xl blur-2xl opacity-30 -z-10 animate-pulse backdrop-blur-sm" aria-hidden="true" />
              <div className="absolute -bottom-6 -left-6 w-28 h-28 sm:w-32 sm:h-32 bg-cyan-400 dark:bg-cyan-600 rounded-3xl blur-2xl opacity-30 -z-10 animate-pulse delay-1000 backdrop-blur-sm" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>

 

      {/* Enhanced CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) rotate(3deg); 
          }
          50% { 
            transform: translateY(-15px) rotate(3deg); 
          }
        }
        
        @keyframes bounce {
          0%, 100% { 
            transform: translateY(0); 
          }
          50% { 
            transform: translateY(-8px); 
          }
        }

        @keyframes gradient-x {
          0%, 100% {
            background-size: 200% 200%;
            background-position: left center;
          }
          50% {
            background-position: right center;
          }
        }

        @keyframes grid-flow {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(50px);
          }
        }

        @keyframes float-particle {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-15px) translateX(8px);
          }
          50% {
            transform: translateY(-30px) translateX(-4px);
          }
          75% {
            transform: translateY(-15px) translateX(-8px);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-bounce {
          animation: bounce 2s infinite;
        }

        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
          background-size: 200% 200%;
        }

        .animate-grid-flow {
          animation: grid-flow 20s linear infinite;
        }

        .animate-float-particle {
          animation: float-particle linear infinite;
        }

        .shadow-2xl {
          box-shadow: 0 20px 40px -12px rgba(0, 0, 0, 0.2);
        }

        .shadow-3xl {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }

        /* Responsive improvements */
        @media (max-width: 1024px) {
          .hero-content {
            text-align: center;
          }
          
          .hero-stats {
            justify-content: center;
          }
        }

        @media (max-width: 768px) {
          .card-preview {
            max-width: 100%;
          }
          
          .features-list {
            flex-direction: column;
            align-items: center;
          }
        }

        @media (max-width: 480px) {
          .hero-title {
            font-size: 2rem;
          }
          
          .hero-description {
            font-size: 1rem;
          }
        }

        /* Enhanced reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          .animate-float,
          .animate-bounce,
          .animate-pulse,
          .animate-gradient-x,
          .animate-grid-flow,
          .animate-float-particle {
            animation: none;
          }
          
          .transform,
          .transition-all,
          .transition-transform,
          .transition-opacity {
            transform: none;
            transition: none;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;