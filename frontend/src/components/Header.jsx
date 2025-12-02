import React, { useState, useEffect } from 'react';
import {
  PiCards,
  PiUser,
  PiRocket,
  PiHouse,
  PiBriefcase,
  PiTag,
  PiInfo,
  PiPhone,
  PiList,
  PiX,
  PiCrown,
  PiSparkle,
  PiShieldCheck
} from 'react-icons/pi';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeNav, setActiveNav] = useState('#home');
  const [isphone, setIsphone] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const checkphone = () => {
      setIsphone(window.innerWidth < 1024);
    };

    // Initial check
    checkphone();

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', checkphone);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkphone);
    };
  }, []);

  const navItems = [
    { name: 'صفحه اصلی', href: '#home', icon: <PiHouse style={{ fontSize: '0.875rem' }} /> },
    { name: 'قالب‌ها', href: '#templates', icon: <PiCards style={{ fontSize: '0.875rem' }} /> },
    { name: 'نمونه کارها', href: '#portfolio', icon: <PiBriefcase style={{ fontSize: '0.875rem' }} /> },
    { name: 'قیمت‌گذاری', href: '#pricing', icon: <PiTag style={{ fontSize: '0.875rem' }} /> },
    { name: 'درباره ما', href: '#about', icon: <PiInfo style={{ fontSize: '0.875rem' }} /> },
    { name: 'تماس', href: '#contact', icon: <PiPhone style={{ fontSize: '0.875rem' }} /> }
  ];

  // Inline styles
  const styles = {
    header: {
      position: 'fixed',
      top: 0,
      width: '100%',
      zIndex: 50,
      transition: 'all 0.5s ease',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      background: isScrolled
        ? 'rgba(255, 255, 255, 0.25)'
        : 'transparent',
      padding: isScrolled ? '0.5rem 0' : '1rem 0',
      boxShadow: isScrolled ? '0 25px 50px -12px rgba(0, 0, 0, 0.25)' : 'none',
      borderBottom: isScrolled ? '1px solid rgba(255, 255, 255, 0.1)' : 'none'
    },
    container: {
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '0 1rem'
    },
    logoContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    },
    logoIcon: {
      width: '2.5rem',
      height: '2.5rem',
      // background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      borderRadius: '1rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      // boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      position: 'relative',
      overflow: 'hidden'
    },
    logoText: {
      fontSize: '1.5rem',
      fontWeight: 900,
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },
    logoSubtext: {
      fontSize: '0.75rem',
      color: '#6b7280',
      marginTop: '-2px',
      fontWeight: 500,
      display: 'flex',
      alignItems: 'center',
      gap: '0.25rem'
    },
    desktopNav: {
      display: isphone ? 'none' : 'flex',
      alignItems: 'center',
      gap: '0.25rem',
      background: 'rgba(255, 255, 255, 0.05)',
      borderRadius: '1rem',
      padding: '0.25rem'
    },
    navItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.5rem 1rem',
      borderRadius: '0.75rem',
      fontSize: '0.875rem',
      fontWeight: 500,
      transition: 'all 0.3s ease',
      position: 'relative',
      textDecoration: 'none'
    },
    ctaButton: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      padding: '0.75rem 1.5rem',
      borderRadius: '1rem',
      fontWeight: 'bold',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      position: 'relative',
      overflow: 'hidden',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
    },
    phoneMenuButton: {
      display: isphone ? 'flex' : 'none',
      width: '3rem',
      height: '3rem',
      background: 'rgba(255, 255, 255, 0.25)',
      backdropFilter: 'blur(10px)',
      borderRadius: '1rem',
      alignItems: 'center',
      justifyContent: 'center',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      position: 'relative'
    },
    phoneMenu: {
      display: isphone ? 'block' : 'none',
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(20px)',
      borderRadius: '1.5rem',
      padding: '1.5rem',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      marginTop: '1rem',
      animation: 'floating 3s ease-in-out infinite'
    },
    phoneNavItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      padding: '0.75rem 1rem',
      borderRadius: '1rem',
      fontSize: '0.875rem',
      fontWeight: 500,
      transition: 'all 0.3s ease',
      textDecoration: 'none'
    },
    activeNavItem: {
      background: 'rgba(59, 130, 246, 0.1)',
      color: '#2563eb',
      border: '1px solid rgba(59, 130, 246, 0.2)'
    },
    inactiveNavItem: {
      color: '#4b5563'
    },
    shimmer: {
      position: 'absolute',
      top: 0,
      left: '-100%',
      width: '100%',
      height: '100%',
      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
      animation: 'shimmer 2s infinite'
    },
    statusDot: {
      position: 'absolute',
      top: '-0.25rem',
      right: '-0.25rem',
      width: '1rem',
      height: '1rem',
      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      borderRadius: '50%',
      border: '2px solid white',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
    },
    loginButton: {
      display: isphone ? 'none' : 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      color: '#4b5563',
      padding: '0.5rem 1rem',
      background: 'rgba(255, 255, 255, 0.25)',
      backdropFilter: 'blur(10px)',
      borderRadius: '1rem',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontSize: '0.875rem',
      fontWeight: 500
    }
  };

  // Adjust logo size for larger screens
  if (!isphone) {
    styles.logoIcon.width = '3rem';
    styles.logoIcon.height = '3rem';
    styles.logoText.fontSize = '1.875rem';
  }

  return (
    <header style={styles.header}>
      <div style={styles.container}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {/* Logo */}
          <div
            style={styles.logoContainer}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <div style={{ position: 'relative' }}>
              <div style={styles.logoIcon}>
                <img src="https://cdn-icons-png.flaticon.com/128/7217/7217779.png" alt="logo" />
                <div style={styles.shimmer}></div>
              </div>
              {/* <div style={styles.statusDot}></div> */}
              <PiSparkle style={{
                position: 'absolute',
                top: '-0.5rem',
                left: '-0.5rem',
                color: '#fbbf24',
                fontSize: '0.75rem',
                animation: 'pulse 2s infinite'
              }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={styles.logoText}>تربچه</span>
              <div style={styles.logoSubtext}>
                <span>پلتفرم چندمنظوره</span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation - Hidden on phone */}
          <nav style={styles.desktopNav}>
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                style={{
                  ...styles.navItem,
                  ...(activeNav === item.href
                    ? { ...styles.activeNavItem, color: '#2563eb' }
                    : { ...styles.inactiveNavItem, color: '#4b5563' }
                  )
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  if (activeNav !== item.href) {
                    e.currentTarget.style.color = '#2563eb';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  if (activeNav !== item.href) {
                    e.currentTarget.style.color = '#4b5563';
                  }
                }}
                onClick={() => setActiveNav(item.href)}
              >
                <div style={{
                  transition: 'transform 0.3s ease',
                  transform: activeNav === item.href ? 'scale(1.1)' : 'scale(1)'
                }}>
                  {item.icon}
                </div>
                <span>{item.name}</span>
                {/* {activeNav === item.href && (
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '0.25rem',
                    height: '0.25rem',
                    backgroundColor: '#3b82f6',
                    borderRadius: '50%'
                  }}></div>
                )} */}
              </a>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {/* Login Button - Hidden on phone */}
            <button
              style={styles.loginButton}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.color = '#2563eb';
                e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.color = '#4b5563';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
              }}
            >
              <PiUser />
              <span>ورود</span>
            </button>

            {/* Main CTA Button */}
            <button
              style={styles.ctaButton}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.background = 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
              }}
            >
              <div style={styles.shimmer}></div>
              <PiRocket style={{
                animation: 'bounce 1s infinite',
                fontSize: '1.125rem'
              }} />
              <span>ساخت کارت رایگان</span>
              <PiCrown style={{
                position: 'absolute',
                top: '-0.25rem',
                right: '-0.25rem',
                color: '#fbbf24',
                fontSize: '0.75rem',
                animation: 'pulse 2s infinite'
              }} />
            </button>

            {/* phone Menu Button - Only shown on small devices */}
            <button
              style={styles.phoneMenuButton}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
              }}
            >
              {isMenuOpen ? (
                <PiX style={{ color: '#374151', fontSize: '1.125rem' }} />
              ) : (
                <PiList style={{ color: '#374151', fontSize: '1.125rem' }} />
              )}
              <div style={{
                position: 'absolute',
                top: '0.25rem',
                right: '0.25rem',
                width: '0.5rem',
                height: '0.5rem',
                backgroundColor: '#3b82f6',
                borderRadius: '50%',
                opacity: isMenuOpen ? 0 : 1,
                animation: isMenuOpen ? 'none' : 'ping 1s infinite'
              }}></div>
            </button>
          </div>
        </div>

        {/* phone Menu - Only shown on small devices when menu is open */}
        {isphone && isMenuOpen && (
          <div style={styles.phoneMenu}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  style={{
                    ...styles.phoneNavItem,
                    ...(activeNav === item.href ? styles.activeNavItem : styles.inactiveNavItem)
                  }}
                  onClick={() => {
                    setActiveNav(item.href);
                    setIsMenuOpen(false);
                  }}
                  onMouseEnter={(e) => {
                    if (activeNav !== item.href) {
                      e.currentTarget.style.background = 'rgba(59, 130, 246, 0.05)';
                      e.currentTarget.style.color = '#2563eb';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeNav !== item.href) {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = '#4b5563';
                    }
                  }}
                >
                  <div style={{
                    padding: '0.5rem',
                    borderRadius: '0.5rem',
                    background: activeNav === item.href ? 'rgba(59, 130, 246, 0.1)' : 'rgba(107, 114, 128, 0.1)',
                    color: activeNav === item.href ? '#2563eb' : '#6b7280',
                    transition: 'all 0.3s ease'
                  }}>
                    {item.icon}
                  </div>
                  <span style={{ flex: 1 }}>{item.name}</span>
                  <div style={{
                    width: '0.5rem',
                    height: '0.5rem',
                    borderRadius: '50%',
                    backgroundColor: activeNav === item.href ? '#3b82f6' : '#d1d5db',
                    transition: 'all 0.3s ease'
                  }}></div>
                </a>
              ))}

              <div style={{
                paddingTop: '1rem',
                marginTop: '0.5rem',
                borderTop: '1px solid rgba(209, 213, 219, 0.5)'
              }}>
                <button style={{
                  ...styles.ctaButton,
                  width: '100%',
                  justifyContent: 'center',
                  marginBottom: '0.5rem'
                }}>
                  <div style={styles.shimmer}></div>
                  <PiRocket style={{ animation: 'bounce 1s infinite' }} />
                  <span>ساخت کارت رایگان</span>
                </button>

                <button style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  color: '#4b5563',
                  padding: '0.75rem',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '0.875rem',
                  fontWeight: 500
                }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#2563eb';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#4b5563';
                  }}
                >
                  <PiUser />
                  <span>ورود به حساب کاربری</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Inline CSS for animations */}
      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes floating {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @keyframes ping {
          0% { transform: scale(1); opacity: 1; }
          75%, 100% { transform: scale(2); opacity: 0; }
        }
      `}</style>
    </header>
  );
};

export default Header;