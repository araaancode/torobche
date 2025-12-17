import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HomeIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { PiRocketLaunch, PiSparkle } from 'react-icons/pi';

const NotFound = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const containerStyle = {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 1rem',
        position: 'relative',
        zIndex: 10
    };

    const sectionStyle = {
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        padding: '2rem 1rem',
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

    const contentCardStyle = {
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '2rem',
        padding: '4rem 2rem',
        textAlign: 'center',
        maxWidth: '700px',
        width: '100%',
        margin: '0 auto',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
        transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
        opacity: isVisible ? 1 : 0,
        transition: 'all 0.8s ease'
    };

    const errorNumberStyle = {
        fontSize: 'clamp(8rem, 20vw, 12rem)',
        fontWeight: '900',
        background: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        marginBottom: '1rem',
        lineHeight: '1',
        textShadow: '0 4px 20px rgba(59, 130, 246, 0.2)'
    };

    const titleStyle = {
        fontSize: 'clamp(2rem, 5vw, 3rem)',
        fontWeight: '900',
        color: '#1f2937',
        marginBottom: '1.5rem',
        lineHeight: '1.2'
    };

    const descriptionStyle = {
        fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)',
        color: '#6b7280',
        marginBottom: '3rem',
        lineHeight: '1.6'
    };

    const badgeStyle = {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '1rem',
        padding: '0.75rem 1.5rem',
        marginBottom: '2rem',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
    };

    const buttonContainerStyle = {
        display: 'flex',
        flexDirection: 'row',
        gap: '1rem',
        justifyContent: 'center',
        flexWrap: 'wrap'
    };

    const buttonStyle = (type) => ({
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.75rem',
        padding: '1rem 2.5rem',
        borderRadius: '1rem',
        fontWeight: '700',
        fontSize: '1.125rem',
        transition: 'all 0.3s ease',
        textDecoration: 'none',
        cursor: 'pointer',
        border: 'none',
        background: type === 'primary'
            ? 'linear-gradient(135deg, #3B82F6, #8B5CF6)'
            : 'rgba(255, 255, 255, 0.9)',
        color: type === 'primary' ? 'white' : '#374151',
        boxShadow: type === 'primary'
            ? '0 8px 20px rgba(59, 130, 246, 0.3)'
            : '0 8px 20px rgba(0, 0, 0, 0.1)',
        border: type === 'secondary' ? '1px solid rgba(209, 213, 219, 0.3)' : 'none'
    });

    return (
        <section style={sectionStyle}>
            {/* Animated Background */}
            <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
                <div style={floatingShapeStyle('10%', '10%', '250px', '250px', 'linear-gradient(135deg, #3B82F6, #8B5CF6)', '0s')}></div>
                <div style={floatingShapeStyle('10%', '70%', '350px', '350px', 'linear-gradient(135deg, #EC4899, #F59E0B)', '-2s')}></div>
                <div style={floatingShapeStyle('60%', '20%', '200px', '200px', 'linear-gradient(135deg, #10B981, #06B6D4)', '-4s')}></div>
                <div style={floatingShapeStyle('40%', '80%', '300px', '300px', 'linear-gradient(135deg, #F59E0B, #EF4444)', '-1s')}></div>
            </div>

            <div style={containerStyle}>
                <div style={contentCardStyle}>
                    {/* Badge */}
                    <div style={badgeStyle}>
                        <PiSparkle style={{
                            color: '#F59E0B',
                            animation: 'sparkle 2s ease-in-out infinite'
                        }} />
                        <span style={{ fontSize: '1rem', fontWeight: 'bold', color: '#374151' }}>
                            صفحه مورد نظر یافت نشد
                        </span>
                    </div>

                    {/* Error Number */}
                    <div style={errorNumberStyle}>
                        ۴۰۴
                    </div>

                    {/* Title */}
                    <h1 style={titleStyle}>
                        <span style={{ background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                            متأسفیم!
                        </span> صفحه مورد نظر یافت نشد
                    </h1>

                    {/* Description */}
                    <p style={descriptionStyle}>
                        صفحه‌ای که به دنبال آن هستید وجود ندارد، منتقل شده یا حذف شده است.
                        <br />
                        می‌توانید به صفحه اصلی بازگردید یا از دکمه بازگشت استفاده کنید.
                    </p>

                    {/* Buttons */}
                    <div style={buttonContainerStyle}>
                        <Link
                            to="/"
                            style={buttonStyle('primary')}
                            onMouseEnter={(e) => {
                                e.target.style.transform = 'translateY(-4px)';
                                e.target.style.boxShadow = '0 16px 32px rgba(59, 130, 246, 0.4)';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.transform = 'translateY(0)';
                                e.target.style.boxShadow = '0 8px 20px rgba(59, 130, 246, 0.3)';
                            }}
                        >
                            <HomeIcon style={{ width: '1.5rem', height: '1.5rem' }} />
                            <span>بازگشت به صفحه اصلی</span>
                        </Link>

                        <button
                            onClick={() => window.history.back()}
                            style={buttonStyle('secondary')}
                            onMouseEnter={(e) => {
                                e.target.style.transform = 'translateY(-4px)';
                                e.target.style.boxShadow = '0 16px 32px rgba(0, 0, 0, 0.2)';
                                e.target.style.background = 'white';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.transform = 'translateY(0)';
                                e.target.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.1)';
                                e.target.style.background = 'rgba(255, 255, 255, 0.9)';
                            }}
                        >
                            <ArrowLeftIcon style={{ width: '1.5rem', height: '1.5rem' }} />
                            <span>بازگشت به عقب</span>
                        </button>
                    </div>

                    {/* CTA Section */}
                    <div style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid rgba(229, 231, 235, 0.5)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '1rem' }}>
                            <PiRocketLaunch style={{
                                fontSize: '2rem',
                                color: '#3B82F6',
                                animation: 'bounce 2s ease-in-out infinite'
                            }} />
                            <p style={{
                                fontSize: '1.125rem',
                                fontWeight: '700',
                                color: '#374151',
                                margin: 0
                            }}>
                                راهنمای استفاده از سرویس ما را ببینید
                            </p>
                        </div>
                        <p style={{
                            fontSize: '1rem',
                            color: '#6b7280',
                            marginBottom: '0'
                        }}>
                            یا برای مشاهده راهنمای کامل به{' '}
                            <Link to="/features" style={{
                                color: '#3B82F6',
                                fontWeight: '700',
                                textDecoration: 'none',
                                borderBottom: '2px solid rgba(59, 130, 246, 0.3)',
                                paddingBottom: '2px'
                            }}>
                                صفحه ویژگی‌ها
                            </Link>{' '}
                            مراجعه کنید
                        </p>
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

                @media (max-width: 768px) {
                    .content-card {
                        padding: 3rem 1.5rem !important;
                    }
                    
                    .button-container {
                        flex-direction: column !important;
                        align-items: center !important;
                    }
                    
                    .button-container a,
                    .button-container button {
                        width: 100% !important;
                        max-width: 300px !important;
                    }
                }

                @media (max-width: 480px) {
                    .content-card {
                        padding: 2rem 1rem !important;
                        border-radius: 1.5rem !important;
                    }
                    
                    .error-number {
                        font-size: 6rem !important;
                    }
                    
                    .title {
                        font-size: 1.75rem !important;
                    }
                    
                    .description {
                        font-size: 1rem !important;
                    }
                }
            `}</style>
        </section>
    );
};

export default NotFound;