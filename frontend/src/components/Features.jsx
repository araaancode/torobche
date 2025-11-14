import React, { useState, useEffect } from 'react';
import { 
  PiQrCode, 
  PiChartLine, 
  PiPalette, 
  PiLightning, 
  PiShieldCheck, 
  PiArrowsClockwise, 
  PiStar, 
  PiPlay, 
  PiArrowLeft, 
  PiForkKnife, 
  PiUserCircle, 
  PiFileText, 
  PiBuilding,
  PiCaretRight,
  PiSparkle,
  PiRocketLaunch
} from 'react-icons/pi';

const Features = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: <PiQrCode style={{ fontSize: '1.5rem' }} />,
      title: 'QR کد هوشمند',
      description: 'QR کدهای داینامیک و قابل پیگیری برای هر نوع کارت دیجیتال',
      gradient: 'linear-gradient(135deg, #3B82F6 0%, #06B6D4 100%)',
      stats: '۱۰۰٪ خودکار'
    },
    {
      icon: <PiPalette style={{ fontSize: '1.5rem' }} />,
      title: 'قالب‌های متنوع',
      description: 'صدها قالب آماده برای رستوران، مطب، رزومه و کسب‌وکار',
      gradient: 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)',
      stats: '۵۰+ قالب'
    },
    {
      icon: <PiLightning style={{ fontSize: '1.5rem' }} />,
      title: 'ساخت سریع',
      description: 'کارت دیجیتال خود را در کمتر از ۵ دقیقه ایجاد کنید',
      gradient: 'linear-gradient(135deg, #10B981 0%, #14B8A6 100%)',
      stats: '۵ دقیقه‌ای'
    },
    {
      icon: <PiChartLine style={{ fontSize: '1.5rem' }} />,
      title: 'آنالیتیکس پیشرفته',
      description: 'تحلیل بازدیدها و تعاملات با کارت دیجیتال شما',
      gradient: 'linear-gradient(135deg, #F59E0B 0%, #EF4444 100%)',
      stats: '۴۰+ متریک'
    },
    {
      icon: <PiShieldCheck style={{ fontSize: '1.5rem' }} />,
      title: 'امنیت بالا',
      description: 'رمزنگاری پیشرفته و محافظت از اطلاعات شما',
      gradient: 'linear-gradient(135deg, #6366F1 0%, #3B82F6 100%)',
      stats: '۱۰۰٪ امن'
    },
    {
      icon: <PiArrowsClockwise style={{ fontSize: '1.5rem' }} />,
      title: 'همگام‌سازی آنی',
      description: 'بروزرسانی لحظه‌ای در تمام پلتفرم‌ها',
      gradient: 'linear-gradient(135deg, #EAB308 0%, #F59E0B 100%)',
      stats: '۰ تاخیر'
    }
  ];

  const useCases = [
    {
      icon: <PiForkKnife style={{ fontSize: '1.5rem' }} />,
      title: 'منوی رستوران',
      description: 'منوی دیجیتال تعاملی با قابلیت سفارش آنلاین',
      gradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)'
    },
    {
      icon: <PiUserCircle style={{ fontSize: '1.5rem' }} />,
      title: 'کارت مطب',
      description: 'کارت دیجیتال پزشکان با قابلیت نوبت‌گیری',
      gradient: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)'
    },
    {
      icon: <PiFileText style={{ fontSize: '1.5rem' }} />,
      title: 'رزومه دیجیتال',
      description: 'رزومه حرفه‌ای با قابلیت اشتراک‌گذاری آسان',
      gradient: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)'
    },
    {
      icon: <PiBuilding style={{ fontSize: '1.5rem' }} />,
      title: 'کارت کسب‌وکار',
      description: 'کارت ویزیت دیجیتال با امکانات پیشرفته',
      gradient: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)'
    }
  ];

  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem',
    position: 'relative',
    zIndex: 10
  };

  const sectionStyle = {
    position: 'relative',
    padding: '5rem 1rem',
    background: 'linear-gradient(135deg, #ffffff 0%, #f8faff 50%, #f0f4ff 100%)',
    overflow: 'hidden'
  };

  const floatingShapeStyle = (top, left, width, height, gradient, delay) => ({
    position: 'absolute',
    top: top,
    left: left,
    width: width,
    height: height,
    background: gradient,
    borderRadius: '50%',
    filter: 'blur(60px)',
    opacity: 0.15,
    animation: `float 6s ease-in-out infinite`,
    animationDelay: delay
  });

  const badgeStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    background: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '1rem',
    padding: '0.5rem 1rem',
    marginBottom: '1.5rem',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
  };

  const sectionTitleStyle = {
    fontSize: 'clamp(2rem, 5vw, 3.5rem)',
    fontWeight: '900',
    color: '#1f2937',
    marginBottom: '1.5rem',
    lineHeight: '1.2',
    textAlign: 'center'
  };

  const gradientTextStyle = {
    background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  };

  const featuresGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '2rem',
    marginBottom: '4rem'
  };

  const featureCardStyle = (delay) => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
    transition: `all 0.6s ease ${delay}`
  });

  const featureContentStyle = {
    background: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '1.5rem',
    padding: '2rem',
    height: '100%',
    position: 'relative',
    overflow: 'hidden',
    transition: 'all 0.3s ease',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
  };

  const iconWrapperStyle = (gradient) => ({
    width: '5rem',
    height: '5rem',
    background: gradient,
    borderRadius: '1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    transition: 'all 0.3s ease',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)'
  });

  const featureNumberStyle = {
    position: 'absolute',
    top: '-0.5rem',
    right: '-0.5rem',
    width: '2rem',
    height: '2rem',
    background: 'white',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.75rem',
    fontWeight: '900',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    color: '#3B82F6'
  };

  const featureHeaderStyle = {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: '1rem',
    gap: '1rem'
  };

  const featureTitleStyle = {
    fontSize: '1.5rem',
    fontWeight: '800',
    color: '#1f2937',
    margin: '0',
    transition: 'all 0.3s ease'
  };

  const featureStatsStyle = {
    fontSize: '0.75rem',
    fontWeight: '700',
    background: 'linear-gradient(135deg, #10B981, #059669)',
    color: 'white',
    padding: '0.25rem 0.75rem',
    borderRadius: '1rem',
    whiteSpace: 'nowrap'
  };

  const useCasesGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1.5rem',
    marginBottom: '3rem'
  };

  const useCaseCardStyle = {
    background: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '1.5rem',
    padding: '2rem',
    textAlign: 'center',
    transition: 'all 0.3s ease',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
  };

  const ctaCardStyle = {
    background: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '2rem',
    padding: '3rem 2rem',
    maxWidth: '800px',
    margin: '0 auto',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)'
  };

  const ctaButtonStyle = (type) => ({
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '1rem 2rem',
    borderRadius: '1rem',
    fontWeight: '700',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    border: 'none',
    cursor: 'pointer',
    textDecoration: 'none',
    background: type === 'primary' 
      ? 'linear-gradient(135deg, #3B82F6, #8B5CF6)' 
      : 'rgba(255, 255, 255, 0.8)',
    color: type === 'primary' ? 'white' : '#374151',
    boxShadow: type === 'primary' 
      ? '0 8px 20px rgba(59, 130, 246, 0.3)' 
      : '0 8px 20px rgba(0, 0, 0, 0.1)'
  });

  return (
    <section id="features" style={sectionStyle}>
      {/* Animated Background */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
        <div style={floatingShapeStyle('10%', '10%', '300px', '300px', 'linear-gradient(135deg, #3B82F6, #8B5CF6)', '0s')}></div>
        <div style={floatingShapeStyle('10%', '60%', '400px', '400px', 'linear-gradient(135deg, #EC4899, #F59E0B)', '-2s')}></div>
        <div style={floatingShapeStyle('50%', '20%', '200px', '200px', 'linear-gradient(135deg, #10B981, #06B6D4)', '-4s')}></div>
        <div style={floatingShapeStyle('30%', '70%', '250px', '250px', 'linear-gradient(135deg, #F59E0B, #EF4444)', '-1s')}></div>
      </div>

      <div style={containerStyle}>
        {/* Section Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '4rem',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s ease'
        }}>
          <div style={badgeStyle}>
            <PiSparkle style={{ 
              color: '#F59E0B',
              animation: 'sparkle 2s ease-in-out infinite'
            }} />
            <span style={{ fontSize: '0.875rem', fontWeight: 'bold', color: '#374151' }}>
              ویژگی‌های منحصربه‌فرد
            </span>
          </div>
          
          <h2 style={sectionTitleStyle}>
            چرا <span style={gradientTextStyle}>کارت‌ساز</span> ما؟
          </h2>
          
          <p style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
            color: '#6b7280',
            maxWidth: '800px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            با قابلیت‌های پیشرفته‌ای که ساخت کارت دیجیتال را برای هر نیازی متحول می‌کند
          </p>
        </div>
        
        {/* Features Grid */}
        <div style={featuresGridStyle}>
          {features.map((feature, index) => (
            <div 
              key={index}
              style={featureCardStyle(`${index * 0.1}s`)}
            >
              <div 
                style={featureContentStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
                  const title = e.currentTarget.querySelector('.feature-title');
                  if (title) {
                    title.style.background = feature.gradient;
                    title.style.WebkitBackgroundClip = 'text';
                    title.style.WebkitTextFillColor = 'transparent';
                    title.style.backgroundClip = 'text';
                  }
                  const icon = e.currentTarget.querySelector('.feature-icon');
                  if (icon) {
                    icon.style.transform = 'scale(1.1) rotate(5deg)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
                  const title = e.currentTarget.querySelector('.feature-title');
                  if (title) {
                    title.style.background = '';
                    title.style.WebkitBackgroundClip = '';
                    title.style.WebkitTextFillColor = '';
                    title.style.backgroundClip = '';
                    title.style.color = '#1f2937';
                  }
                  const icon = e.currentTarget.querySelector('.feature-icon');
                  if (icon) {
                    icon.style.transform = 'scale(1) rotate(0deg)';
                  }
                }}
              >
                {/* Icon Container */}
                <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
                  <div 
                    className="feature-icon"
                    style={iconWrapperStyle(feature.gradient)}
                  >
                    {feature.icon}
                  </div>
                  <div style={featureNumberStyle}>
                    {index + 1}
                  </div>
                </div>
                
                {/* Content */}
                <div style={{ flex: 1 }}>
                  <div style={featureHeaderStyle}>
                    <h3 className="feature-title" style={featureTitleStyle}>
                      {feature.title}
                    </h3>
                    <span style={featureStatsStyle}>
                      {feature.stats}
                    </span>
                  </div>
                  
                  <p style={{
                    color: '#6b7280',
                    lineHeight: '1.6',
                    marginBottom: '1rem',
                    fontSize: '1rem'
                  }}>
                    {feature.description}
                  </p>
                  
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: '#3B82F6',
                    fontWeight: '700',
                    fontSize: '0.875rem',
                    opacity: 0,
                    transform: 'translateX(-10px)',
                    transition: 'all 0.3s ease'
                  }} className="feature-cta">
                    <span>اطلاعات بیشتر</span>
                    <PiCaretRight style={{ transform: 'rotate(180deg)' }} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Use Cases Section */}
        <div style={{ marginBottom: '4rem' }}>
          <h3 style={{
            fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
            fontWeight: '900',
            textAlign: 'center',
            color: '#1f2937',
            marginBottom: '3rem'
          }}>
            مناسب برای <span style={gradientTextStyle}>هر نیازی</span>
          </h3>
          
          <div style={useCasesGridStyle}>
            {useCases.map((useCase, index) => (
              <div 
                key={index} 
                style={useCaseCardStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
                }}
              >
                <div style={{
                  width: '4rem',
                  height: '4rem',
                  background: useCase.gradient,
                  borderRadius: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  margin: '0 auto 1rem',
                  transition: 'all 0.3s ease'
                }}>
                  {useCase.icon}
                </div>
                <h4 style={{
                  fontSize: '1.25rem',
                  fontWeight: '800',
                  color: '#1f2937',
                  marginBottom: '0.5rem'
                }}>{useCase.title}</h4>
                <p style={{
                  color: '#6b7280',
                  fontSize: '0.875rem',
                  lineHeight: '1.5'
                }}>{useCase.description}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Bottom CTA */}
        <div style={{ textAlign: 'center' }}>
          <div style={ctaCardStyle}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
              marginBottom: '1rem'
            }}>
              <PiRocketLaunch style={{ 
                fontSize: '2rem',
                color: '#3B82F6',
                animation: 'bounce 2s ease-in-out infinite'
              }} />
              <h3 style={{
                fontSize: 'clamp(1.5rem, 4vw, 2.25rem)',
                fontWeight: '900',
                color: '#1f2937',
                margin: 0
              }}>
                آماده <span style={gradientTextStyle}>ساخت</span> کارت دیجیتال خود هستید؟
              </h3>
            </div>
            <p style={{
              fontSize: 'clamp(1rem, 2.5vw, 1.125rem)',
              color: '#6b7280',
              marginBottom: '2rem',
              maxWidth: '600px',
              marginLeft: 'auto',
              marginRight: 'auto'
            }}>
              همین حالا شروع کنید و در کمتر از ۵ دقیقه اولین کارت دیجیتال خود را بسازید
            </p>
            <div style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <button 
                style={ctaButtonStyle('primary')}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 12px 25px rgba(59, 130, 246, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 8px 20px rgba(59, 130, 246, 0.3)';
                }}
              >
                <PiLightning />
                <span>شروع رایگان</span>
              </button>
              <button 
                style={ctaButtonStyle('secondary')}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 12px 25px rgba(0, 0, 0, 0.15)';
                  e.target.style.background = 'white';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.1)';
                  e.target.style.background = 'rgba(255, 255, 255, 0.8)';
                }}
              >
                <PiPlay />
                <span>مشاهده ویدیو</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Inline Styles for Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-20px) scale(1.05); }
        }
        
        @keyframes sparkle {
          0%, 100% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.1) rotate(180deg); }
        }
        
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-10px); }
          60% { transform: translateY(-5px); }
        }

        .feature-content:hover .feature-cta {
          opacity: 1 !important;
          transform: translateX(0) !important;
        }

        @media (max-width: 768px) {
          .features-grid {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
          }
          
          .feature-content {
            padding: 1.5rem !important;
          }
          
          .feature-header {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 0.5rem !important;
          }
          
          .use-cases-grid {
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)) !important;
            gap: 1rem !important;
          }
          
          .cta-card {
            padding: 2rem 1.5rem !important;
          }
          
          .cta-buttons {
            flex-direction: column !important;
            align-items: center !important;
          }
          
          .cta-button {
            width: 100% !important;
            max-width: 300px !important;
            justify-content: center !important;
          }
        }

        @media (max-width: 480px) {
          .features-grid {
            grid-template-columns: 1fr !important;
          }
          
          .use-cases-grid {
            grid-template-columns: 1fr !important;
          }
          
          .feature-content {
            padding: 1.25rem !important;
          }
          
          .icon-wrapper {
            width: 4rem !important;
            height: 4rem !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Features;