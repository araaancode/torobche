// pages/DoctorCardPage.js
import React, { useState, useMemo } from 'react';
import { PiUserCircle, PiArrowLeft, PiStar, PiCalendar, PiStethoscope, PiHeart } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';
import AdvancedSearchFilter from '../components/AdvancedSearchFilter';

const DoctorCardPage = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    search: '',
    specialty: '',
    experience: '',
    availability: '',
    sort: 'newest'
  });

  const doctorTemplates = [
    {
      id: 1,
      title: 'کارت مطب عمومی',
      description: 'کارت دیجیتال حرفه‌ای برای پزشکان عمومی',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      specialty: 'عمومی',
      experience: '5+ سال',
      availability: 'نوبت‌دهی آنلاین',
      rating: 4.9,
      features: ['نوبت‌گیری آنلاین', 'نمایش تخصص‌ها', 'مسیریابی', 'تماس مستقیم'],
      popular: true
    },
    {
      id: 2,
      title: 'کارت متخصص قلب',
      description: 'قالب تخصصی برای پزشکان متخصص قلب',
      image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=2034&q=80',
      specialty: 'قلب',
      experience: '10+ سال',
      availability: 'مشاوره آنلاین',
      rating: 4.8,
      features: ['مشاوره آنلاین', 'نمایش مدارک', 'مقالات تخصصی', 'رزرو نوبت'],
      popular: false
    },
    // ... templates بیشتر
  ];

  const searchFields = [
    {
      name: 'specialty',
      label: 'تخصص',
      type: 'select',
      options: [
        { value: 'عمومی', label: 'عمومی' },
        { value: 'قلب', label: 'قلب' },
        { value: 'ارتوپدی', label: 'ارتوپدی' },
        { value: 'پوست', label: 'پوست' },
        { value: 'اطفال', label: 'اطفال' }
      ]
    },
    {
      name: 'experience',
      label: 'سابقه کار',
      type: 'select',
      options: [
        { value: '1-3', label: '۱-۳ سال' },
        { value: '3-5', label: '۳-۵ سال' },
        { value: '5+', label: '۵+ سال' },
        { value: '10+', label: '۱۰+ سال' }
      ]
    },
    {
      name: 'availability',
      label: 'نوع خدمات',
      type: 'select',
      options: [
        { value: 'نوبت‌دهی آنلاین', label: 'نوبت‌دهی آنلاین' },
        { value: 'مشاوره آنلاین', label: 'مشاوره آنلاین' },
        { value: 'ویزیت در منزل', label: 'ویزیت در منزل' }
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
    return doctorTemplates.filter(template => {
      const matchesSearch = !filters.search || 
        template.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        template.description.toLowerCase().includes(filters.search.toLowerCase());
      
      const matchesSpecialty = !filters.specialty || template.specialty === filters.specialty;
      const matchesExperience = !filters.experience || template.experience === filters.experience;
      const matchesAvailability = !filters.availability || template.availability === filters.availability;

      return matchesSearch && matchesSpecialty && matchesExperience && matchesAvailability;
    });
  }, [filters, doctorTemplates]);

  const handleFilterChange = (key, value) => {
    if (key === 'clear') {
      setFilters({
        search: '',
        specialty: '',
        experience: '',
        availability: '',
        sort: 'newest'
      });
    } else {
      setFilters(prev => ({ ...prev, [key]: value }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-lg border-b border-white/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 font-bold text-lg"
            >
              <PiArrowLeft />
              بازگشت
            </button>
            
            <div className="text-center">
              <h1 className="text-3xl font-black text-gray-800 flex items-center gap-3 justify-center">
                <PiUserCircle className="text-green-500" />
                <span className="bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
                  قالب‌های کارت مطب
                </span>
              </h1>
              <p className="text-gray-600 mt-2">کارت دیجیتال حرفه‌ای برای پزشکان محترم</p>
            </div>

            <div className="w-24"></div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <AdvancedSearchFilter
          filters={filters}
          onFilterChange={handleFilterChange}
          searchFields={searchFields}
          sortOptions={sortOptions}
        />

        {/* Results Grid - Similar structure to RestaurantMenuPage but with medical styling */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map(template => (
            <div key={template.id} className="bg-white rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={template.image} 
                  alt={template.title}
                  className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4">
                  {template.popular && (
                    <span className="bg-gradient-to-r from-green-400 to-teal-400 text-white px-3 py-1 rounded-2xl text-sm font-bold flex items-center gap-1">
                      <PiStar className="text-sm" />
                      پرطرفدار
                    </span>
                  )}
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-black text-gray-800">{template.title}</h3>
                  <span className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-3 py-1 rounded-2xl text-sm font-bold">
                    {template.experience}
                  </span>
                </div>

                <p className="text-gray-600 mb-4 leading-relaxed">{template.description}</p>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <PiStar className="text-yellow-500" />
                    <span className="font-bold">{template.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <PiStethoscope className="text-green-500" />
                    <span>{template.specialty}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <PiCalendar className="text-blue-500" />
                    <span>{template.availability}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {template.features.map((feature, index) => (
                    <span key={index} className="bg-green-100 text-green-700 px-3 py-1 rounded-xl text-xs font-bold">
                      {feature}
                    </span>
                  ))}
                </div>

                <button className="w-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white py-3 rounded-2xl font-bold transition-all duration-300 hover:scale-105 shadow-lg">
                  استفاده از این قالب
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredTemplates.length === 0 && (
          <div className="text-center py-16">
            <PiUserCircle className="text-6xl text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-500 mb-2">قالبی یافت نشد</h3>
            <p className="text-gray-400">لطفاً فیلترهای جستجو را تغییر دهید</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorCardPage;