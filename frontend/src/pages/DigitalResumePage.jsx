// pages/DigitalResumePage.js
import React, { useState, useMemo } from 'react';
import { 
  PiGraduationCap, 
  PiArrowLeft, 
  PiStar, 
  PiBriefcase, 
  PiCode, 
  PiHeart,
  PiSparkle,
  PiCrown,
  PiClock,
  PiMapPin,
  PiUserCircle,
  PiCertificate
} from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';
import AdvancedSearchFilter from '../components/AdvancedSearchFilter';

const DigitalResumePage = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    search: '',
    industry: '',
    experience: '',
    skills: '',
    sort: 'newest'
  });

  const resumeTemplates = [
    {
      id: 1,
      title: 'رزومه توسعه‌دهنده',
      description: 'قالب مدرن و حرفه‌ای برای توسعه‌دهندگان و برنامه‌نویسان',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      industry: 'فناوری',
      experience: '3+ سال',
      skills: 'React, Node.js',
      rating: 4.9,
      features: ['نمونه کار تعاملی', 'مهارت‌های فنی', 'پروژه‌های GitHub', 'تماس مستقیم'],
      popular: true,
      badge: 'پرطرفدار',
      location: 'دورکاری',
      projects: '۲۵+ پروژه'
    },
    {
      id: 2,
      title: 'رزومه مدیر محصول',
      description: 'قالب استراتژیک برای مدیران محصول و بیزینس آنالیزست‌ها',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      industry: 'مدیریت',
      experience: '5+ سال',
      skills: 'Product Strategy',
      rating: 4.8,
      features: ['نمایش متریک', 'پرتفولیو محصول', 'تحلیل بازار', 'رزومه تعاملی'],
      popular: false,
      badge: 'حرفه‌ای',
      location: 'تهران',
      projects: '۱۵+ محصول'
    },
    {
      id: 3,
      title: 'رزومه طراح UI/UX',
      description: 'قالب خلاقانه برای طراحان رابط کاربری و تجربه کاربری',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2064&q=80',
      industry: 'طراحی',
      experience: '4+ سال',
      skills: 'Figma, Adobe XD',
      rating: 4.7,
      features: ['گالری نمونه کار', 'پرتفولیو تعاملی', 'Case Studies', 'فرآیند طراحی'],
      popular: true,
      badge: 'خلاقانه',
      location: 'اصفهان',
      projects: '۴۰+ طرح'
    },
    {
      id: 4,
      title: 'رزومه مارکتینگ',
      description: 'قالب تاثیرگذار برای متخصصان مارکتینگ و دیجیتال مارکترها',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2015&q=80',
      industry: 'مارکتینگ',
      experience: '6+ سال',
      skills: 'Digital Marketing',
      rating: 4.6,
      features: ['آنالیتیکس پیشرفته', 'کمپین‌های موفق', 'ROI نمایش', 'نتایج کمی'],
      popular: false,
      badge: 'تاثیرگذار',
      location: 'مشهد',
      projects: '۵۰+ کمپین'
    }
  ];

  const searchFields = [
    {
      name: 'industry',
      label: 'صنعت',
      type: 'select',
      options: [
        { value: 'فناوری', label: 'فناوری' },
        { value: 'مدیریت', label: 'مدیریت' },
        { value: 'طراحی', label: 'طراحی' },
        { value: 'مارکتینگ', label: 'مارکتینگ' },
        { value: 'مالی', label: 'مالی' }
      ]
    },
    {
      name: 'experience',
      label: 'سابقه کار',
      type: 'select',
      options: [
        { value: '0-2', label: '۰-۲ سال' },
        { value: '2-4', label: '۲-۴ سال' },
        { value: '4-6', label: '۴-۶ سال' },
        { value: '6+', label: '۶+ سال' }
      ]
    },
    {
      name: 'skills',
      label: 'مهارت‌ها',
      type: 'select',
      options: [
        { value: 'React, Node.js', label: 'توسعه فرانت‌اند' },
        { value: 'Product Strategy', label: 'مدیریت محصول' },
        { value: 'Figma, Adobe XD', label: 'طراحی UI/UX' },
        { value: 'Digital Marketing', label: 'مارکتینگ دیجیتال' }
      ]
    }
  ];

  const sortOptions = [
    { value: 'newest', label: 'جدیدترین' },
    { value: 'popular', label: 'محبوب‌ترین' },
    { value: 'rating', label: 'بالاترین امتیاز' },
    { value: 'experience', label: 'بیشترین سابقه' }
  ];

  const filteredTemplates = useMemo(() => {
    return resumeTemplates.filter(template => {
      const matchesSearch = !filters.search || 
        template.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        template.description.toLowerCase().includes(filters.search.toLowerCase());
      
      const matchesIndustry = !filters.industry || template.industry === filters.industry;
      const matchesExperience = !filters.experience || template.experience === filters.experience;
      const matchesSkills = !filters.skills || template.skills === filters.skills;

      return matchesSearch && matchesIndustry && matchesExperience && matchesSkills;
    });
  }, [filters, resumeTemplates]);

  const handleFilterChange = (key, value) => {
    if (key === 'clear') {
      setFilters({
        search: '',
        industry: '',
        experience: '',
        skills: '',
        sort: 'newest'
      });
    } else {
      setFilters(prev => ({ ...prev, [key]: value }));
    }
  };

  return (
    <section className="min-h-screen relative overflow-hidden pt-20 pb-12 bg-gradient-to-br from-blue-50/95 via-purple-50/95 to-cyan-50/95 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-cyan-900/20 transition-all duration-1000 backdrop-blur-sm">
      
      {/* Enhanced Animated Background - Using Hero Colors */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-8 left-8 w-64 h-64 bg-blue-300 dark:bg-blue-600 rounded-full blur-3xl opacity-20 animate-pulse" />
        <div className="absolute bottom-8 right-8 w-64 h-64 bg-purple-300 dark:bg-purple-600 rounded-full blur-3xl opacity-20 animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-56 h-56 bg-cyan-300 dark:bg-cyan-600 rounded-full blur-3xl opacity-20 animate-pulse delay-500" />
        
        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02]">
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
        
        {/* Header Section - Matching Hero Style with Blue/Purple Colors */}
        <div className="text-center mb-8 lg:mb-12">
          {/* Premium Badge */}
          <div className="inline-flex items-center space-x-2 rtl:space-x-reverse bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl px-4 py-2 mb-6 shadow-xl border border-white/30 dark:border-gray-700 hover:shadow-2xl transition-all duration-500 hover:scale-105 group cursor-pointer">
            <div className="flex items-center space-x-1 rtl:space-x-reverse">
              <PiCrown className="text-yellow-500 text-base group-hover:scale-110 transition-transform duration-300" />
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-ping backdrop-blur-sm" />
            </div>
            <span className="text-xs font-black text-gray-800 dark:text-gray-200 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              پلتفرم شماره ۱ رزومه دیجیتال
            </span>
            <PiSparkle className="text-purple-500 text-base group-hover:rotate-180 transition-transform duration-500" />
          </div>

          {/* Main Heading */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight mb-4 lg:mb-6">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent animate-gradient-x">
              رزومه دیجیتال
            </span>
            <br />
            <span className="text-gray-900 dark:text-white">هوشمند و تعاملی</span>
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg lg:text-xl text-gray-700 dark:text-gray-300 mb-6 lg:mb-8 leading-relaxed max-w-2xl mx-auto">
            با <span className="font-black text-blue-600 dark:text-blue-400">تربچه</span>، رزومه دیجیتال حرفه‌ای برای 
            <span className="font-black text-purple-600 dark:text-purple-400"> توسعه‌دهندگان، طراحان، مدیران و متخصصان</span> ایجاد کنید.
          </p>
        </div>

        {/* Search & Filter Section */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl p-6 mb-8 shadow-xl border border-white/50 dark:border-gray-700">
          <AdvancedSearchFilter
            filters={filters}
            onFilterChange={handleFilterChange}
            searchFields={searchFields}
            sortOptions={sortOptions}
          />
        </div>

        {/* Results Count & Stats */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600 dark:text-gray-400">
            <span className="font-bold text-gray-800 dark:text-white">{filteredTemplates.length}</span> قالب پیدا شد
          </p>
          
          {/* Stats - Using Hero Color Scheme */}
          <div className="flex items-center space-x-6 rtl:space-x-reverse bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-3 shadow-lg border border-white/50 dark:border-gray-700">
            <div className="text-center">
              <div className="text-lg font-black text-gray-900 dark:text-white">۲,۰۰۰+</div>
              <div className="text-gray-600 dark:text-gray-400 text-sm">رزومه فعال</div>
            </div>
            <div className="w-px h-8 bg-gradient-to-b from-transparent via-gray-300 dark:via-gray-600 to-transparent" />
            <div className="text-center">
              <div className="text-lg font-black text-gray-900 dark:text-white">۹۵٪</div>
              <div className="text-gray-600 dark:text-gray-400 text-sm">مصاحبه موفق</div>
            </div>
            <div className="w-px h-8 bg-gradient-to-b from-transparent via-gray-300 dark:via-gray-600 to-transparent" />
            <div className="text-center">
              <div className="text-lg font-black text-gray-900 dark:text-white">۸۵٪</div>
              <div className="text-gray-600 dark:text-gray-400 text-sm">افزایش شانس</div>
            </div>
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredTemplates.map(template => (
            <div 
              key={template.id} 
              className="group bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 border border-white/30 dark:border-gray-700 transform hover:-translate-y-2 animate-float"
            >
              {/* Image Section */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={template.image} 
                  alt={template.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Badges */}
                <div className="absolute top-4 right-4">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 rounded-2xl text-sm font-bold flex items-center gap-1 backdrop-blur-sm border border-blue-400/30">
                    <PiStar className="text-sm" />
                    {template.badge}
                  </div>
                </div>
                <div className="absolute top-4 left-4">
                  <button className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm w-10 h-10 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 border border-white/30 dark:border-gray-600">
                    <PiHeart className="text-red-500 text-xl" />
                  </button>
                </div>

                {/* Quick Info Overlay */}
                <div className="absolute bottom-4 right-4 text-right">
                  <h3 className="text-lg font-black text-white drop-shadow-2xl">{template.title}</h3>
                  <p className="text-white/90 text-sm drop-shadow-lg">{template.industry}</p>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-black text-gray-900 dark:text-white">{template.title}</h3>
                  <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 rounded-2xl text-sm font-bold backdrop-blur-sm border border-blue-400/30">
                    {template.experience}
                  </span>
                </div>

                <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">{template.description}</p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="flex items-center gap-1 bg-gray-50/80 dark:bg-gray-700/80 backdrop-blur-sm rounded-xl p-2 justify-center">
                    <PiStar className="text-yellow-500" />
                    <span className="font-bold text-gray-900 dark:text-white text-sm">{template.rating}</span>
                  </div>
                  <div className="flex items-center gap-1 bg-gray-50/80 dark:bg-gray-700/80 backdrop-blur-sm rounded-xl p-2 justify-center">
                    <PiBriefcase className="text-blue-500" />
                    <span className="text-gray-700 dark:text-gray-300 text-sm">{template.industry}</span>
                  </div>
                  <div className="flex items-center gap-1 bg-gray-50/80 dark:bg-gray-700/80 backdrop-blur-sm rounded-xl p-2 justify-center">
                    <PiCertificate className="text-purple-500" />
                    <span className="text-gray-700 dark:text-gray-300 text-sm">{template.projects}</span>
                  </div>
                </div>

                {/* Location & Skills */}
                <div className="flex items-center justify-between text-sm mb-4">
                  <div className="flex items-center gap-1 bg-blue-50/80 dark:bg-blue-900/30 backdrop-blur-sm rounded-xl px-3 py-2">
                    <PiMapPin className="text-blue-600" />
                    <span className="text-blue-700 dark:text-blue-300 font-medium">{template.location}</span>
                  </div>
                  <div className="flex items-center gap-1 bg-purple-50/80 dark:bg-purple-900/30 backdrop-blur-sm rounded-xl px-3 py-2">
                    <PiCode className="text-purple-600" />
                    <span className="text-purple-700 dark:text-purple-300 font-medium text-xs">{template.skills}</span>
                  </div>
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {template.features.map((feature, index) => (
                    <span 
                      key={index} 
                      className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-xl text-xs font-bold backdrop-blur-sm border border-blue-200 dark:border-blue-800"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* CTA Button - Using Hero Gradient */}
                <button className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 hover:from-blue-700 hover:via-purple-700 hover:to-cyan-700 text-white py-3 rounded-2xl font-bold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl backdrop-blur-sm border border-blue-500/30 group relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  <span className="flex items-center justify-center gap-2 relative z-10">
                    استفاده از این قالب
                    <PiGraduationCap className="group-hover:scale-110 transition-transform duration-300" />
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredTemplates.length === 0 && (
          <div className="text-center py-16 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl shadow-xl border border-white/50 dark:border-gray-700">
            <PiGraduationCap className="text-6xl text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-500 dark:text-gray-400 mb-2">قالبی یافت نشد</h3>
            <p className="text-gray-400 dark:text-gray-500">لطفاً فیلترهای جستجو را تغییر دهید</p>
          </div>
        )}
      </div>

      {/* Enhanced CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px); 
          }
          50% { 
            transform: translateY(-10px); 
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

        @media (prefers-reduced-motion: reduce) {
          .animate-float,
          .animate-gradient-x,
          .animate-grid-flow,
          .animate-float-particle {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
};

export default DigitalResumePage;