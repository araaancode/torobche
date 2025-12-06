import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { businessTemplateService } from '../../services/api';
import {
    PiPalette,
    PiSparkle,
    PiStar,
    PiTrendUp,
    PiFilter,
    PiSearch,
    PiFire,
    PiEye,
    PiRocketLaunch,
    PiCrown,
    PiCheckCircle,
    PiClock,
    PiArrowRight,
    PiLightning,
    PiShieldCheck,
    PiUsers,
    PiGridFour,
    PiListBullets,
    PiCaretLeft,
    PiCaretRight,
    PiX,
    PiFunnel,
    PiGridFill,
    PiListFill
} from 'react-icons/pi';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';
import TemplateCard from '../../components/templates/TemplateCard';

const BusinessTemplatesPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [templates, setTemplates] = useState([]);
    const [filteredTemplates, setFilteredTemplates] = useState([]);
    const [popularTemplates, setPopularTemplates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalTemplates, setTotalTemplates] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
    const [showFilters, setShowFilters] = useState(false);

    // فیلترها
    const [filters, setFilters] = useState({
        businessType: '',
        category: '',
        isPremium: '',
        search: '',
        sortBy: 'usageCount',
        sortOrder: 'desc',
        page: 1,
        limit: 12
    });

    // انواع کسب‌وکار
    const businessTypes = [
        'رستوران',
        'کافی شاپ',
        'مطب پزشکی',
        'آرایشگاه',
        'تعمیرگاه',
        'فروشگاه پوشاک',
        'سوپرمارکت',
        'داروخانه',
        'آتلیه',
        'آژانس مسافرتی',
        'آموزشگاه',
        'فروشگاه مواد غذایی',
        'لبنیات فروشی',
        'لاستیک فروشی',
        'نوتی فروشی',
        'دیگر'
    ];

    // دسته‌بندی‌ها
    const categories = [
        'مدرن',
        'کلاسیک',
        'مینیمال',
        'رنگی',
        'تیره',
        'شیک',
        'صنعتی',
        'حرفه‌ای'
    ];

    useEffect(() => {
        setIsVisible(true);
        fetchTemplates();
        fetchPopularTemplates();
    }, [filters.page]);

    useEffect(() => {
        filterTemplates();
    }, [filters, templates]);

    const fetchTemplates = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await businessTemplateService.getBusinessTemplates({
                businessType: filters.businessType || undefined,
                category: filters.category || undefined,
                isPremium: filters.isPremium || undefined,
                search: filters.search || undefined,
                page: filters.page,
                limit: filters.limit,
                sortBy: filters.sortBy,
                sortOrder: filters.sortOrder,
                isActive: true
            });

            if (response.success) {
                setTemplates(response.data);
                setFilteredTemplates(response.data);
                setTotalTemplates(response.total || 0);
                setTotalPages(response.totalPages || 1);
            }
        } catch (err) {
            console.error('Error fetching templates:', err);
            setError(err.message || 'خطا در دریافت قالب‌ها');
        } finally {
            setLoading(false);
        }
    };

    const fetchPopularTemplates = async () => {
        try {
            const response = await businessTemplateService.getPopularTemplates(6);
            if (response.success) {
                setPopularTemplates(response.data || []);
            }
        } catch (err) {
            console.error('Error fetching popular templates:', err);
        }
    };

    const filterTemplates = () => {
        let result = [...templates];

        if (filters.businessType) {
            result = result.filter(template => template.businessType === filters.businessType);
        }

        if (filters.category) {
            result = result.filter(template => template.category === filters.category);
        }

        if (filters.isPremium !== '') {
            result = result.filter(template =>
                filters.isPremium === 'true' ? template.isPremium : !template.isPremium
            );
        }

        if (filters.search) {
            const searchTerm = filters.search.toLowerCase();
            result = result.filter(template =>
                template.name?.toLowerCase().includes(searchTerm) ||
                template.description?.toLowerCase().includes(searchTerm) ||
                template.tags?.some(tag => tag.toLowerCase().includes(searchTerm))
            );
        }

        // مرتب‌سازی
        result.sort((a, b) => {
            if (filters.sortBy === 'usageCount') {
                return filters.sortOrder === 'desc'
                    ? b.usageCount - a.usageCount
                    : a.usageCount - b.usageCount;
            } else if (filters.sortBy === 'rating') {
                const ratingA = a.rating?.average || 0;
                const ratingB = b.rating?.average || 0;
                return filters.sortOrder === 'desc'
                    ? ratingB - ratingA
                    : ratingA - ratingB;
            } else if (filters.sortBy === 'createdAt') {
                return filters.sortOrder === 'desc'
                    ? new Date(b.createdAt) - new Date(a.createdAt)
                    : new Date(a.createdAt) - new Date(b.createdAt);
            }
            return 0;
        });

        setFilteredTemplates(result);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        fetchTemplates();
    };

    const handleTemplateClick = (templateId) => {
        navigate(`/templates/${templateId}`);
    };

    const handleCreateFromTemplate = async (templateId) => {
        try {
            navigate(`/dashboard/cards/create-from-template/${templateId}`);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handlePageChange = (newPage) => {
        setFilters({ ...filters, page: newPage });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const resetFilters = () => {
        setFilters({
            businessType: '',
            category: '',
            isPremium: '',
            search: '',
            sortBy: 'usageCount',
            sortOrder: 'desc',
            page: 1,
            limit: 12
        });
        setShowFilters(false);
    };

    const clearSearch = () => {
        setFilters({ ...filters, search: '' });
    };

    // استایل‌ها (همانند Features.jsx)
    const containerStyle = {
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 1rem',
        position: 'relative',
        zIndex: 10
    };

    const sectionStyle = {
        position: 'relative',
        padding: '4rem 1rem',
        background: 'linear-gradient(135deg, #ffffff 0%, #f8faff 50%, #f0f4ff 100%)',
        minHeight: '100vh',
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

    const filterSectionStyle = {
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '1.5rem',
        padding: '1.5rem',
        marginBottom: '2rem',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
    };

    const inputStyle = {
        background: 'rgba(255, 255, 255, 0.7)',
        border: '1px solid #e5e7eb',
        borderRadius: '0.75rem',
        padding: '0.75rem 1rem',
        fontSize: '0.875rem',
        width: '100%',
        transition: 'all 0.3s ease'
    };

    const selectStyle = {
        ...inputStyle,
        cursor: 'pointer'
    };

    const actionButtonStyle = (type) => ({
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.75rem 1.5rem',
        borderRadius: '0.75rem',
        fontWeight: '600',
        fontSize: '0.875rem',
        transition: 'all 0.3s ease',
        border: 'none',
        cursor: 'pointer',
        background: type === 'primary'
            ? 'linear-gradient(135deg, #3B82F6, #8B5CF6)'
            : type === 'secondary'
                ? 'rgba(255, 255, 255, 0.8)'
                : 'transparent',
        color: type === 'primary' ? 'white' : '#374151',
        boxShadow: type === 'primary'
            ? '0 4px 15px rgba(59, 130, 246, 0.3)'
            : '0 4px 15px rgba(0, 0, 0, 0.1)'
    });

    if (error) {
        return (
            <div style={sectionStyle}>
                <ErrorMessage
                    message={error}
                    onRetry={fetchTemplates}
                />
            </div>
        );
    }

    return (
        <section style={sectionStyle}>
            {/* Animated Background */}
            <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
                <div style={floatingShapeStyle('10%', '10%', '300px', '300px', 'linear-gradient(135deg, #3B82F6, #8B5CF6)', '0s')}></div>
                <div style={floatingShapeStyle('10%', '60%', '400px', '400px', 'linear-gradient(135deg, #EC4899, #F59E0B)', '-2s')}></div>
                <div style={floatingShapeStyle('50%', '20%', '200px', '200px', 'linear-gradient(135deg, #10B981, #06B6D4)', '-4s')}></div>
                <div style={floatingShapeStyle('30%', '70%', '250px', '250px', 'linear-gradient(135deg, #F59E0B, #EF4444)', '-1s')}></div>
            </div>

            <div style={containerStyle}>
                {/* Header */}
                <div style={{
                    textAlign: 'center',
                    marginBottom: '3rem',
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
                            گالری قالب‌های حرفه‌ای
                        </span>
                    </div>

                    <h2 style={sectionTitleStyle}>
                        <span style={gradientTextStyle}>قالب‌های متنوع</span> برای هر کسب‌وکار
                    </h2>

                    <p style={{
                        fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
                        color: '#6b7280',
                        maxWidth: '800px',
                        margin: '0 auto',
                        lineHeight: '1.6'
                    }}>
                        از بین صدها قالب حرفه‌ای انتخاب کنید و کارت دیجیتال خود را در کمتر از ۵ دقیقه بسازید
                    </p>
                </div>

                {/* Popular Templates Section */}
                {!loading && popularTemplates.length > 0 && (
                    <div style={{ marginBottom: '3rem' }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginBottom: '1.5rem',
                            flexWrap: 'wrap',
                            gap: '1rem'
                        }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem'
                            }}>
                                <PiFire style={{ fontSize: '1.75rem', color: '#EF4444' }} />
                                <h3 style={{
                                    fontSize: '1.5rem',
                                    fontWeight: '800',
                                    color: '#1f2937',
                                    margin: 0
                                }}>
                                    قالب‌های محبوب هفته
                                </h3>
                            </div>

                            <Link
                                to="/templates/popular"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    color: '#3B82F6',
                                    fontWeight: '600',
                                    fontSize: '0.875rem',
                                    textDecoration: 'none',
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                <span>مشاهده همه</span>
                                <PiArrowRight style={{ transform: 'rotate(180deg)' }} />
                            </Link>
                        </div>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                            gap: '1.5rem'
                        }}>
                            {popularTemplates.map((template) => (
                                <div
                                    key={template._id}
                                    style={{
                                        background: 'rgba(255, 255, 255, 0.9)',
                                        backdropFilter: 'blur(10px)',
                                        border: '1px solid rgba(255, 255, 255, 0.2)',
                                        borderRadius: '1.5rem',
                                        overflow: 'hidden',
                                        transition: 'all 0.3s ease',
                                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                                        cursor: 'pointer'
                                    }}
                                    onClick={() => handleTemplateClick(template._id)}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-8px)';
                                        e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
                                    }}
                                >
                                    {/* Template Header */}
                                    <div style={{
                                        height: '180px',
                                        background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
                                        position: 'relative',
                                        overflow: 'hidden',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        {template.isPremium && (
                                            <div style={{
                                                position: 'absolute',
                                                top: '1rem',
                                                left: '1rem',
                                                background: 'linear-gradient(135deg, #F59E0B, #D97706)',
                                                color: 'white',
                                                padding: '0.5rem 1rem',
                                                borderRadius: '1rem',
                                                fontSize: '0.75rem',
                                                fontWeight: '700',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.25rem',
                                                zIndex: 10,
                                                boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)'
                                            }}>
                                                <PiCrown />
                                                <span>پریمیوم</span>
                                            </div>
                                        )}

                                        <div style={{
                                            width: '80px',
                                            height: '80px',
                                            background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
                                            borderRadius: '1.5rem',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: 'white',
                                            fontSize: '2.5rem',
                                            boxShadow: '0 8px 20px rgba(59, 130, 246, 0.3)'
                                        }}>
                                            <PiPalette />
                                        </div>

                                        {/* Usage Badge */}
                                        <div style={{
                                            position: 'absolute',
                                            bottom: '1rem',
                                            right: '1rem',
                                            background: 'rgba(255, 255, 255, 0.9)',
                                            padding: '0.5rem 1rem',
                                            borderRadius: '1rem',
                                            fontSize: '0.75rem',
                                            fontWeight: '700',
                                            color: '#3B82F6',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.25rem',
                                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                                        }}>
                                            <PiTrendUp />
                                            <span>{template.usageCount || 0} بار استفاده</span>
                                        </div>
                                    </div>

                                    {/* Template Content */}
                                    <div style={{ padding: '1.5rem' }}>
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'flex-start',
                                            marginBottom: '1rem'
                                        }}>
                                            <div>
                                                <h4 style={{
                                                    fontSize: '1.25rem',
                                                    fontWeight: '800',
                                                    margin: '0 0 0.5rem 0',
                                                    color: '#1f2937'
                                                }}>
                                                    {template.name}
                                                </h4>
                                                <div style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '0.5rem',
                                                    flexWrap: 'wrap'
                                                }}>
                                                    <span style={{
                                                        fontSize: '0.75rem',
                                                        color: '#6b7280',
                                                        background: '#f3f4f6',
                                                        padding: '0.25rem 0.75rem',
                                                        borderRadius: '1rem'
                                                    }}>
                                                        {template.businessType}
                                                    </span>

                                                    {template.category && (
                                                        <span style={{
                                                            fontSize: '0.75rem',
                                                            color: '#3B82F6',
                                                            background: 'rgba(59, 130, 246, 0.1)',
                                                            padding: '0.25rem 0.75rem',
                                                            borderRadius: '1rem'
                                                        }}>
                                                            {template.category}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Rating */}
                                            <div style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.25rem',
                                                color: template.rating?.average ? '#F59E0B' : '#9ca3af'
                                            }}>
                                                <PiStar />
                                                <span style={{ fontSize: '0.875rem', fontWeight: '700' }}>
                                                    {template.rating?.average?.toFixed(1) || 'جدید'}
                                                    {template.rating?.count && (
                                                        <span style={{
                                                            color: '#6b7280',
                                                            marginRight: '0.25rem',
                                                            fontSize: '0.75rem'
                                                        }}>
                                                            ({template.rating.count})
                                                        </span>
                                                    )}
                                                </span>
                                            </div>
                                        </div>

                                        <p style={{
                                            color: '#6b7280',
                                            fontSize: '0.875rem',
                                            marginBottom: '1.5rem',
                                            lineHeight: '1.5',
                                            minHeight: '40px'
                                        }}>
                                            {template.description?.substring(0, 100)}...
                                        </p>

                                        {/* Action Buttons */}
                                        <div style={{
                                            display: 'flex',
                                            gap: '0.75rem'
                                        }}>
                                            <button
                                                style={{
                                                    flex: 1,
                                                    ...actionButtonStyle('primary'),
                                                    padding: '0.75rem'
                                                }}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleCreateFromTemplate(template._id);
                                                }}
                                            >
                                                <PiRocketLaunch />
                                                <span>استفاده از قالب</span>
                                            </button>

                                            <button
                                                style={{
                                                    padding: '0.75rem',
                                                    ...actionButtonStyle('secondary')
                                                }}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    navigate(`/templates/${template._id}/preview`);
                                                }}
                                            >
                                                <PiEye />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Main Content Area */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2rem'
                }}>
                    {/* Filters and Controls */}
                    <div style={filterSectionStyle}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '1.5rem',
                            flexWrap: 'wrap',
                            gap: '1rem'
                        }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem'
                            }}>
                                <button
                                    onClick={() => setShowFilters(!showFilters)}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        padding: '0.75rem 1.25rem',
                                        background: 'rgba(255, 255, 255, 0.8)',
                                        border: '1px solid #e5e7eb',
                                        borderRadius: '0.75rem',
                                        color: '#374151',
                                        fontWeight: '600',
                                        fontSize: '0.875rem',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    <PiFilter />
                                    <span>فیلترها</span>
                                    {(filters.businessType || filters.category || filters.isPremium || filters.search) && (
                                        <div style={{
                                            width: '8px',
                                            height: '8px',
                                            background: '#EF4444',
                                            borderRadius: '50%',
                                            marginRight: '0.25rem'
                                        }}></div>
                                    )}
                                </button>

                                {/* View Mode Toggle */}
                                <div style={{
                                    display: 'flex',
                                    background: 'rgba(255, 255, 255, 0.8)',
                                    border: '1px solid #e5e7eb',
                                    borderRadius: '0.75rem',
                                    overflow: 'hidden'
                                }}>
                                    <button
                                        onClick={() => setViewMode('grid')}
                                        style={{
                                            padding: '0.75rem',
                                            background: viewMode === 'grid' ? '#3B82F6' : 'transparent',
                                            border: 'none',
                                            color: viewMode === 'grid' ? 'white' : '#374151',
                                            cursor: 'pointer',
                                            transition: 'all 0.3s ease'
                                        }}
                                    >
                                        {viewMode === 'grid' ? <PiGridFill /> : <PiGridFour />}
                                    </button>
                                    <button
                                        onClick={() => setViewMode('list')}
                                        style={{
                                            padding: '0.75rem',
                                            background: viewMode === 'list' ? '#3B82F6' : 'transparent',
                                            border: 'none',
                                            color: viewMode === 'list' ? 'white' : '#374151',
                                            cursor: 'pointer',
                                            transition: 'all 0.3s ease'
                                        }}
                                    >
                                        {viewMode === 'list' ? <PiListFill /> : <PiListBullets />}
                                    </button>
                                </div>
                            </div>

                            {/* Search Box */}
                            <div style={{
                                position: 'relative',
                                flex: 1,
                                maxWidth: '400px'
                            }}>
                                <PiSearch style={{
                                    position: 'absolute',
                                    right: '1rem',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    color: '#9ca3af',
                                    fontSize: '1.25rem'
                                }} />
                                <input
                                    type="text"
                                    placeholder="جستجوی قالب..."
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem 3rem 0.75rem 1rem',
                                        background: 'rgba(255, 255, 255, 0.8)',
                                        border: '1px solid #e5e7eb',
                                        borderRadius: '0.75rem',
                                        fontSize: '0.875rem',
                                        color: '#374151',
                                        transition: 'all 0.3s ease'
                                    }}
                                    value={filters.search}
                                    onChange={(e) => setFilters({ ...filters, search: e.target.value, page: 1 })}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSearch(e)}
                                />
                                {filters.search && (
                                    <button
                                        onClick={clearSearch}
                                        style={{
                                            position: 'absolute',
                                            left: '1rem',
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            background: 'none',
                                            border: 'none',
                                            color: '#9ca3af',
                                            cursor: 'pointer',
                                            padding: '0'
                                        }}
                                    >
                                        <PiX />
                                    </button>
                                )}
                            </div>

                            {/* Sort Options */}
                            <div>
                                <select
                                    style={selectStyle}
                                    value={filters.sortBy}
                                    onChange={(e) => setFilters({ ...filters, sortBy: e.target.value, page: 1 })}
                                >
                                    <option value="usageCount">مرتب‌سازی: محبوب‌ترین</option>
                                    <option value="rating">مرتب‌سازی: بالاترین امتیاز</option>
                                    <option value="createdAt">مرتب‌سازی: جدیدترین</option>
                                </select>
                            </div>
                        </div>

                        {/* Advanced Filters (Collapsible) */}
                        {showFilters && (
                            <div style={{
                                marginTop: '1.5rem',
                                paddingTop: '1.5rem',
                                borderTop: '1px solid #e5e7eb'
                            }}>
                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                                    gap: '1rem',
                                    marginBottom: '1rem'
                                }}>
                                    {/* Business Type Filter */}
                                    <div>
                                        <label style={{
                                            display: 'block',
                                            fontSize: '0.875rem',
                                            fontWeight: '600',
                                            color: '#374151',
                                            marginBottom: '0.5rem'
                                        }}>
                                            نوع کسب‌وکار
                                        </label>
                                        <select
                                            style={selectStyle}
                                            value={filters.businessType}
                                            onChange={(e) => setFilters({ ...filters, businessType: e.target.value, page: 1 })}
                                        >
                                            <option value="">همه انواع</option>
                                            {businessTypes.map(type => (
                                                <option key={type} value={type}>{type}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Category Filter */}
                                    <div>
                                        <label style={{
                                            display: 'block',
                                            fontSize: '0.875rem',
                                            fontWeight: '600',
                                            color: '#374151',
                                            marginBottom: '0.5rem'
                                        }}>
                                            دسته‌بندی
                                        </label>
                                        <select
                                            style={selectStyle}
                                            value={filters.category}
                                            onChange={(e) => setFilters({ ...filters, category: e.target.value, page: 1 })}
                                        >
                                            <option value="">همه دسته‌ها</option>
                                            {categories.map(category => (
                                                <option key={category} value={category}>{category}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Premium Filter */}
                                    <div>
                                        <label style={{
                                            display: 'block',
                                            fontSize: '0.875rem',
                                            fontWeight: '600',
                                            color: '#374151',
                                            marginBottom: '0.5rem'
                                        }}>
                                            نوع قالب
                                        </label>
                                        <select
                                            style={selectStyle}
                                            value={filters.isPremium}
                                            onChange={(e) => setFilters({ ...filters, isPremium: e.target.value, page: 1 })}
                                        >
                                            <option value="">همه قالب‌ها</option>
                                            <option value="false">رایگان</option>
                                            <option value="true">پریمیوم</option>
                                        </select>
                                    </div>
                                </div>

                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    paddingTop: '1rem',
                                    borderTop: '1px solid #e5e7eb'
                                }}>
                                    <button
                                        onClick={resetFilters}
                                        style={{
                                            ...actionButtonStyle('secondary'),
                                            padding: '0.5rem 1rem'
                                        }}
                                    >
                                        <PiX />
                                        <span>حذف همه فیلترها</span>
                                    </button>

                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        fontSize: '0.875rem',
                                        color: '#6b7280'
                                    }}>
                                        <PiCheckCircle style={{ color: '#10B981' }} />
                                        <span>{totalTemplates} قالب یافت شد</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Results Info */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '0.75rem 1rem',
                        background: 'rgba(255, 255, 255, 0.8)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: '1rem',
                        marginBottom: '1rem'
                    }}>
                        <div style={{
                            fontSize: '0.875rem',
                            color: '#6b7280'
                        }}>
                            نمایش <span style={{ fontWeight: '700', color: '#374151' }}>
                                {filteredTemplates.length}
                            </span> قالب از <span style={{ fontWeight: '700', color: '#374151' }}>
                                {totalTemplates}
                            </span> قالب
                        </div>

                        {filters.businessType && (
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                fontSize: '0.75rem',
                                color: '#3B82F6',
                                background: 'rgba(59, 130, 246, 0.1)',
                                padding: '0.25rem 0.75rem',
                                borderRadius: '1rem'
                            }}>
                                <span>نوع کسب‌وکار: {filters.businessType}</span>
                                <button
                                    onClick={() => setFilters({ ...filters, businessType: '' })}
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        color: '#3B82F6',
                                        cursor: 'pointer',
                                        padding: '0',
                                        fontSize: '0.75rem'
                                    }}
                                >
                                    <PiX />
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Loading State */}
                    {loading ? (
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '400px'
                        }}>
                            <LoadingSpinner size={60} color="#3B82F6" />
                        </div>
                    ) : filteredTemplates.length === 0 ? (
                        /* Empty State */
                        <div style={{
                            textAlign: 'center',
                            padding: '4rem 2rem',
                            background: 'rgba(255, 255, 255, 0.9)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            borderRadius: '1.5rem',
                            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
                        }}>
                            <div style={{
                                width: '80px',
                                height: '80px',
                                background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 1.5rem',
                                fontSize: '2rem',
                                color: '#9ca3af'
                            }}>
                                <PiPalette />
                            </div>
                            <h3 style={{
                                fontSize: '1.5rem',
                                fontWeight: '700',
                                color: '#374151',
                                marginBottom: '0.5rem'
                            }}>
                                قالبی یافت نشد!
                            </h3>
                            <p style={{
                                color: '#6b7280',
                                marginBottom: '1.5rem',
                                maxWidth: '400px',
                                marginLeft: 'auto',
                                marginRight: 'auto'
                            }}>
                                با فیلترهای فعلی هیچ قالبی پیدا نشد. لطفاً فیلترها را تغییر دهید.
                            </p>
                            <button
                                onClick={resetFilters}
                                style={actionButtonStyle('primary')}
                            >
                                <PiFilter />
                                <span>حذف همه فیلترها</span>
                            </button>
                        </div>
                    ) : (
                        /* Templates Grid/List */
                        <>
                            <div style={{
                                display: viewMode === 'grid'
                                    ? 'grid'
                                    : 'flex',
                                gridTemplateColumns: viewMode === 'grid'
                                    ? 'repeat(auto-fill, minmax(300px, 1fr))'
                                    : '1fr',
                                flexDirection: viewMode === 'list' ? 'column' : 'row',
                                gap: viewMode === 'grid' ? '1.5rem' : '1rem',
                                marginBottom: '2rem'
                            }}>
                                {filteredTemplates.map((template) => (
                                    viewMode === 'grid' ? (
                                        /* Grid View Card */
                                        <TemplateCard
                                            key={template._id}
                                            template={template}
                                            onViewClick={() => handleTemplateClick(template._id)}
                                            onUseClick={() => handleCreateFromTemplate(template._id)}
                                            onPreviewClick={() => navigate(`/templates/${template._id}/preview`)}
                                            viewMode="grid"
                                        />
                                    ) : (
                                        /* List View Card */
                                        <TemplateCard
                                            key={template._id}
                                            template={template}
                                            onViewClick={() => handleTemplateClick(template._id)}
                                            onUseClick={() => handleCreateFromTemplate(template._id)}
                                            onPreviewClick={() => navigate(`/templates/${template._id}/preview`)}
                                            viewMode="list"
                                        />
                                    )
                                ))}
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    marginTop: '2rem'
                                }}>
                                    <button
                                        onClick={() => handlePageChange(filters.page - 1)}
                                        disabled={filters.page === 1}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            width: '40px',
                                            height: '40px',
                                            background: filters.page === 1
                                                ? '#f3f4f6'
                                                : 'rgba(255, 255, 255, 0.8)',
                                            border: '1px solid #e5e7eb',
                                            borderRadius: '0.5rem',
                                            color: filters.page === 1 ? '#9ca3af' : '#374151',
                                            cursor: filters.page === 1 ? 'not-allowed' : 'pointer',
                                            transition: 'all 0.3s ease'
                                        }}
                                    >
                                        <PiCaretRight style={{ transform: 'rotate(180deg)' }} />
                                    </button>

                                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                        let pageNum;
                                        if (totalPages <= 5) {
                                            pageNum = i + 1;
                                        } else if (filters.page <= 3) {
                                            pageNum = i + 1;
                                        } else if (filters.page >= totalPages - 2) {
                                            pageNum = totalPages - 4 + i;
                                        } else {
                                            pageNum = filters.page - 2 + i;
                                        }

                                        return (
                                            <button
                                                key={pageNum}
                                                onClick={() => handlePageChange(pageNum)}
                                                style={{
                                                    width: '40px',
                                                    height: '40px',
                                                    background: filters.page === pageNum
                                                        ? 'linear-gradient(135deg, #3B82F6, #8B5CF6)'
                                                        : 'rgba(255, 255, 255, 0.8)',
                                                    border: '1px solid #e5e7eb',
                                                    borderRadius: '0.5rem',
                                                    color: filters.page === pageNum ? 'white' : '#374151',
                                                    fontWeight: '600',
                                                    cursor: 'pointer',
                                                    transition: 'all 0.3s ease'
                                                }}
                                            >
                                                {pageNum}
                                            </button>
                                        );
                                    })}

                                    <button
                                        onClick={() => handlePageChange(filters.page + 1)}
                                        disabled={filters.page === totalPages}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            width: '40px',
                                            height: '40px',
                                            background: filters.page === totalPages
                                                ? '#f3f4f6'
                                                : 'rgba(255, 255, 255, 0.8)',
                                            border: '1px solid #e5e7eb',
                                            borderRadius: '0.5rem',
                                            color: filters.page === totalPages ? '#9ca3af' : '#374151',
                                            cursor: filters.page === totalPages ? 'not-allowed' : 'pointer',
                                            transition: 'all 0.3s ease'
                                        }}
                                    >
                                        <PiCaretLeft style={{ transform: 'rotate(180deg)' }} />
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>

                {/* CTA Section */}
                <div style={{
                    marginTop: '4rem',
                    padding: '3rem 2rem',
                    background: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '2rem',
                    textAlign: 'center',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)'
                }}>
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
                            قالب <span style={gradientTextStyle}>مناسب</span> خود را پیدا نکردید؟
                        </h3>
                    </div>

                    <p style={{
                        fontSize: 'clamp(1rem, 2.5vw, 1.125rem)',
                        color: '#6b7280',
                        marginBottom: '2rem',
                        maxWidth: '600px',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        lineHeight: '1.6'
                    }}>
                        ما می‌توانیم قالب اختصاصی کسب‌وکار شما را طراحی کنیم!
                    </p>

                    <div style={{
                        display: 'flex',
                        gap: '1rem',
                        justifyContent: 'center',
                        flexWrap: 'wrap'
                    }}>
                        <button
                            style={{
                                ...actionButtonStyle('primary'),
                                padding: '1rem 2rem',
                                fontSize: '1rem'
                            }}
                            onClick={() => navigate('/contact')}
                        >
                            <PiPalette />
                            <span>درخواست قالب اختصاصی</span>
                        </button>

                        <button
                            style={{
                                ...actionButtonStyle('secondary'),
                                padding: '1rem 2rem',
                                fontSize: '1rem'
                            }}
                            onClick={() => navigate('/dashboard/cards/create')}
                        >
                            <PiLightning />
                            <span>ساخت کارت بدون قالب</span>
                        </button>
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
          .header-badge {
            padding: 0.5rem 0.75rem !important;
          }
          
          .section-title {
            font-size: 2rem !important;
          }
          
          .filter-grid {
            grid-template-columns: 1fr !important;
          }
          
          .template-grid {
            grid-template-columns: 1fr !important;
          }
          
          .action-buttons {
            flex-direction: column !important;
          }
          
          .action-buttons button {
            width: 100% !important;
            max-width: 300px !important;
          }
        }

        @media (max-width: 480px) {
          .container {
            padding: 0 0.75rem !important;
          }
          
          .section-padding {
            padding: 3rem 0.75rem !important;
          }
          
          .template-card {
            padding: 1rem !important;
          }
        }
      `}</style>
        </section>
    );
};

export default BusinessTemplatesPage;