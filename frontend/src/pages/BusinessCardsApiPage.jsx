import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { businessCardService } from '../services/api';
import {
    PiQrCode,
    PiChartLine,
    PiPalette,
    PiLightning,
    PiShieldCheck,
    PiArrowsClockwise,
    PiPlus,
    PiPencil,
    PiTrash,
    PiExport,
    PiEye,
    PiShareNetwork,
    PiMapPin,
    PiBuilding,
    PiSparkle,
    PiRocketLaunch,
    PiTrendUp,
    PiStar,
    PiFilter,
    PiSearch,
    PiDownloadSimple,
    PiWarningCircle,
    PiCopy,
    PiCheckCircle,
    PiClock,
    PiCalendar,
    PiUser,
    PiPhone,
    PiEnvelope,
    PiGlobe,
    PiFunnel,
    PiCrown,
    PiGridFour,
    PiListBullets,
    PiCaretLeft,
    PiCaretRight,
    PiX,
    PiMagnifyingGlass,
    PiSortAscending,
    PiSlidersHorizontal
} from 'react-icons/pi';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';
import BusinessCard from '../../components/cards/BusinessCard';
import { toast } from 'react-hot-toast';

const BusinessCardsPage = () => {
    const navigate = useNavigate();
    const [cards, setCards] = useState([]);
    const [filteredCards, setFilteredCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [stats, setStats] = useState({
        totalCards: 0,
        totalViews: 0,
        totalQrScans: 0,
        verifiedCards: 0,
        activeCards: 0
    });
    const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
    const [showFilters, setShowFilters] = useState(false);
    const [selectedCards, setSelectedCards] = useState([]);
    const [bulkActions, setBulkActions] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);

    // فیلترها
    const [filters, setFilters] = useState({
        businessType: '',
        city: '',
        province: '',
        isVerified: '',
        isActive: '',
        search: '',
        sortBy: 'createdAt',
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

    useEffect(() => {
        fetchBusinessCards();
    }, [filters.page, filters.sortBy, filters.sortOrder]);

    useEffect(() => {
        filterCards();
    }, [filters, cards]);

    const fetchBusinessCards = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await businessCardService.getBusinessCards({
                businessType: filters.businessType || undefined,
                city: filters.city || undefined,
                province: filters.province || undefined,
                isVerified: filters.isVerified || undefined,
                isActive: filters.isActive || undefined,
                search: filters.search || undefined,
                page: filters.page,
                limit: filters.limit,
                sortBy: filters.sortBy,
                sortOrder: filters.sortOrder
            });

            if (response.success) {
                setCards(response.data || []);
                setFilteredCards(response.data || []);
                setTotalItems(response.total || 0);
                setTotalPages(response.totalPages || 1);

                // محاسبه آمار
                calculateStats(response.data || []);
            }
        } catch (err) {
            console.error('Error fetching business cards:', err);
            setError(err.message || 'خطا در دریافت کارت‌ها');
            toast.error('خطا در دریافت کارت‌ها');
        } finally {
            setLoading(false);
        }
    };

    const calculateStats = (cardsData) => {
        const totalViews = cardsData.reduce((sum, card) => sum + (card.views || 0), 0);
        const totalQrScans = cardsData.reduce((sum, card) => sum + (card.qrScans || 0), 0);
        const verifiedCards = cardsData.filter(card => card.isVerified).length;
        const activeCards = cardsData.filter(card => card.isActive).length;

        setStats({
            totalCards: cardsData.length,
            totalViews,
            totalQrScans,
            verifiedCards,
            activeCards
        });
    };

    const filterCards = () => {
        let result = [...cards];

        if (filters.businessType) {
            result = result.filter(card => card.businessType === filters.businessType);
        }

        if (filters.city) {
            result = result.filter(card =>
                card.address?.city?.toLowerCase().includes(filters.city.toLowerCase())
            );
        }

        if (filters.province) {
            result = result.filter(card =>
                card.address?.province?.toLowerCase().includes(filters.province.toLowerCase())
            );
        }

        if (filters.isVerified !== '') {
            result = result.filter(card =>
                filters.isVerified === 'true' ? card.isVerified : !card.isVerified
            );
        }

        if (filters.isActive !== '') {
            result = result.filter(card =>
                filters.isActive === 'true' ? card.isActive : !card.isActive
            );
        }

        if (filters.search) {
            const searchTerm = filters.search.toLowerCase();
            result = result.filter(card =>
                card.title?.toLowerCase().includes(searchTerm) ||
                card.companyName?.toLowerCase().includes(searchTerm) ||
                card.ownerName?.toLowerCase().includes(searchTerm) ||
                card.tags?.some(tag => tag.toLowerCase().includes(searchTerm)) ||
                card.description?.toLowerCase().includes(searchTerm)
            );
        }

        setFilteredCards(result);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setFilters({ ...filters, page: 1 });
        fetchBusinessCards();
    };

    const clearSearch = () => {
        setFilters({ ...filters, search: '' });
    };

    const resetFilters = () => {
        setFilters({
            businessType: '',
            city: '',
            province: '',
            isVerified: '',
            isActive: '',
            search: '',
            sortBy: 'createdAt',
            sortOrder: 'desc',
            page: 1,
            limit: 12
        });
        setShowFilters(false);
    };

    const generateQRCode = async (cardId) => {
        try {
            setError(null);

            const response = await businessCardService.generateQRCode(cardId);

            if (response.success) {
                toast.success('QR Code با موفقیت ایجاد شد!');
                fetchBusinessCards();
            }
        } catch (err) {
            console.error('Error generating QR code:', err);
            toast.error(err.message || 'خطا در ایجاد QR Code');
        }
    };

    const deleteCard = async (cardId) => {
        if (!window.confirm('آیا از حذف این کارت اطمینان دارید؟')) {
            return;
        }

        try {
            setError(null);

            const response = await businessCardService.deleteBusinessCard(cardId);

            if (response.success) {
                toast.success('کارت با موفقیت حذف شد!');
                fetchBusinessCards();
            }
        } catch (err) {
            console.error('Error deleting card:', err);
            toast.error(err.message || 'خطا در حذف کارت');
        }
    };

    const duplicateCard = async (cardId) => {
        try {
            setError(null);

            const response = await businessCardService.duplicateBusinessCard(cardId);

            if (response.success) {
                toast.success('کارت با موفقیت کپی شد!');
                fetchBusinessCards();
            }
        } catch (err) {
            console.error('Error duplicating card:', err);
            toast.error(err.message || 'خطا در کپی کردن کارت');
        }
    };

    const exportCards = () => {
        try {
            const dataToExport = bulkActions && selectedCards.length > 0
                ? selectedCards
                : filteredCards;

            const dataStr = JSON.stringify(dataToExport, null, 2);
            const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

            const exportFileDefaultName = `business-cards-${new Date().toISOString().split('T')[0]}.json`;

            const linkElement = document.createElement('a');
            linkElement.setAttribute('href', dataUri);
            linkElement.setAttribute('download', exportFileDefaultName);
            linkElement.click();

            toast.success('کارت‌ها با موفقیت صادر شدند');
        } catch (err) {
            console.error('Error exporting cards:', err);
            toast.error('خطا در خروجی گرفتن');
        }
    };

    const handleCardSelect = (cardId) => {
        if (selectedCards.includes(cardId)) {
            setSelectedCards(selectedCards.filter(id => id !== cardId));
        } else {
            setSelectedCards([...selectedCards, cardId]);
        }
    };

    const selectAllCards = () => {
        if (selectedCards.length === filteredCards.length) {
            setSelectedCards([]);
        } else {
            setSelectedCards(filteredCards.map(card => card._id));
        }
    };

    const handleBulkDelete = async () => {
        if (!selectedCards.length) return;

        if (!window.confirm(`آیا از حذف ${selectedCards.length} کارت انتخاب شده اطمینان دارید؟`)) {
            return;
        }

        try {
            setLoading(true);
            const promises = selectedCards.map(id => businessCardService.deleteBusinessCard(id));
            await Promise.all(promises);

            toast.success(`${selectedCards.length} کارت با موفقیت حذف شدند`);
            setSelectedCards([]);
            setBulkActions(false);
            fetchBusinessCards();
        } catch (err) {
            toast.error('خطا در حذف گروهی کارت‌ها');
        } finally {
            setLoading(false);
        }
    };

    const handleBulkQRGenerate = async () => {
        if (!selectedCards.length) return;

        try {
            setLoading(true);
            const promises = selectedCards.map(id => businessCardService.generateQRCode(id));
            await Promise.all(promises);

            toast.success(`QR Code برای ${selectedCards.length} کارت ایجاد شد`);
            fetchBusinessCards();
        } catch (err) {
            toast.error('خطا در ایجاد QR Code گروهی');
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (newPage) => {
        setFilters({ ...filters, page: newPage });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const getBusinessTypeColor = (type) => {
        const colors = {
            'رستوران': 'bg-red-100 text-red-800',
            'کافی شاپ': 'bg-amber-100 text-amber-800',
            'مطب پزشکی': 'bg-blue-100 text-blue-800',
            'آرایشگاه': 'bg-pink-100 text-pink-800',
            'تعمیرگاه': 'bg-gray-100 text-gray-800',
            'فروشگاه پوشاک': 'bg-purple-100 text-purple-800',
            'سوپرمارکت': 'bg-green-100 text-green-800',
            'داروخانه': 'bg-cyan-100 text-cyan-800',
            'آتلیه': 'bg-indigo-100 text-indigo-800',
            'آژانس مسافرتی': 'bg-teal-100 text-teal-800',
            'آموزشگاه': 'bg-orange-100 text-orange-800',
        };
        return colors[type] || 'bg-gray-100 text-gray-800';
    };

    // استایل‌های مشابه Features.jsx
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

    const statsCardStyle = {
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '1.5rem',
        padding: '1.5rem',
        textAlign: 'center',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s ease'
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
        transition: 'all 0.3s ease',
        outline: 'none'
    };

    const selectStyle = {
        ...inputStyle,
        cursor: 'pointer'
    };

    const actionButtonStyle = (type, size = 'md') => ({
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        padding: size === 'lg' ? '1rem 2rem' : size === 'sm' ? '0.5rem 1rem' : '0.75rem 1.5rem',
        borderRadius: '0.75rem',
        fontWeight: '600',
        fontSize: size === 'lg' ? '1rem' : '0.875rem',
        transition: 'all 0.3s ease',
        border: 'none',
        cursor: 'pointer',
        background: type === 'primary'
            ? 'linear-gradient(135deg, #3B82F6, #8B5CF6)'
            : type === 'success'
                ? 'linear-gradient(135deg, #10B981, #059669)'
                : type === 'danger'
                    ? 'linear-gradient(135deg, #EF4444, #DC2626)'
                    : type === 'warning'
                        ? 'linear-gradient(135deg, #F59E0B, #D97706)'
                        : 'rgba(255, 255, 255, 0.8)',
        color: ['primary', 'success', 'danger', 'warning'].includes(type) ? 'white' : '#374151',
        boxShadow: ['primary', 'success', 'danger', 'warning'].includes(type)
            ? `0 4px 15px rgba(${type === 'primary' ? '59, 130, 246' : type === 'success' ? '16, 185, 129' : type === 'danger' ? '239, 68, 68' : '245, 158, 11'}, 0.3)`
            : '0 4px 15px rgba(0, 0, 0, 0.1)',
        minWidth: '120px'
    });

    if (error) {
        return (
            <div style={sectionStyle}>
                <ErrorMessage
                    message={error}
                    onRetry={fetchBusinessCards}
                />
            </div>
        );
    }

    return (
        <section style={sectionStyle}>
            {/* Animated Background */}
            <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
                <div style={floatingShapeStyle('10%', '10%', '300px', '300px', 'linear-gradient(135deg, #3B82F6, #8B5CF6)', '0s')}></div>
                <div style={floatingShapeStyle('10%', '60%', '400px', '400px', 'linear-gradient(135deg, #10B981, #059669)', '-2s')}></div>
                <div style={floatingShapeStyle('50%', '20%', '200px', '200px', 'linear-gradient(135deg, #F59E0B, #D97706)', '-4s')}></div>
                <div style={floatingShapeStyle('30%', '70%', '250px', '250px', 'linear-gradient(135deg, #8B5CF6, #7C3AED)', '-1s')}></div>
            </div>

            <div style={containerStyle}>
                {/* Header */}
                <div style={{
                    textAlign: 'center',
                    marginBottom: '3rem',
                    opacity: 1,
                    transform: 'translateY(0)',
                    transition: 'all 0.8s ease'
                }}>
                    <div style={badgeStyle}>
                        <PiSparkle style={{
                            color: '#F59E0B',
                            animation: 'sparkle 2s ease-in-out infinite'
                        }} />
                        <span style={{ fontSize: '0.875rem', fontWeight: 'bold', color: '#374151' }}>
                            گالری کارت‌های کسب‌وکار
                        </span>
                    </div>

                    <h2 style={sectionTitleStyle}>
                        کارت‌های <span style={gradientTextStyle}>دیجیتال</span> کسب‌وکارها
                    </h2>

                    <p style={{
                        fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
                        color: '#6b7280',
                        maxWidth: '800px',
                        margin: '0 auto',
                        lineHeight: '1.6'
                    }}>
                        جستجو و کشف کارت‌های دیجیتال کسب‌وکارهای مختلف در سراسر ایران
                    </p>
                </div>

                {/* Stats Overview */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '1.5rem',
                    marginBottom: '2rem'
                }}>
                    <div
                        style={statsCardStyle}
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
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem',
                            marginBottom: '0.5rem'
                        }}>
                            <PiBuilding style={{ fontSize: '1.5rem', color: '#3B82F6' }} />
                            <span style={{ fontSize: '2rem', fontWeight: '900', color: '#1f2937' }}>
                                {stats.totalCards}
                            </span>
                        </div>
                        <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>کل کارت‌ها</span>
                    </div>

                    <div
                        style={statsCardStyle}
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
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem',
                            marginBottom: '0.5rem'
                        }}>
                            <PiQrCode style={{ fontSize: '1.5rem', color: '#10B981' }} />
                            <span style={{ fontSize: '2rem', fontWeight: '900', color: '#1f2937' }}>
                                {stats.totalQrScans}
                            </span>
                        </div>
                        <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>اسکن QR Code</span>
                    </div>

                    <div
                        style={statsCardStyle}
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
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem',
                            marginBottom: '0.5rem'
                        }}>
                            <PiEye style={{ fontSize: '1.5rem', color: '#8B5CF6' }} />
                            <span style={{ fontSize: '2rem', fontWeight: '900', color: '#1f2937' }}>
                                {stats.totalViews}
                            </span>
                        </div>
                        <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>بازدید کل</span>
                    </div>

                    <div
                        style={statsCardStyle}
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
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem',
                            marginBottom: '0.5rem'
                        }}>
                            <PiShieldCheck style={{ fontSize: '1.5rem', color: '#F59E0B' }} />
                            <span style={{ fontSize: '2rem', fontWeight: '900', color: '#1f2937' }}>
                                {stats.verifiedCards}
                            </span>
                        </div>
                        <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>تایید شده‌ها</span>
                    </div>
                </div>

                {/* Action Bar */}
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
                        gap: '1rem',
                        flexWrap: 'wrap'
                    }}>
                        <button
                            style={actionButtonStyle('primary')}
                            onClick={() => navigate('/dashboard/cards/create')}
                            onMouseEnter={(e) => {
                                e.target.style.transform = 'translateY(-2px)';
                                e.target.style.boxShadow = '0 8px 25px rgba(59, 130, 246, 0.4)';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.transform = 'translateY(0)';
                                e.target.style.boxShadow = '0 4px 15px rgba(59, 130, 246, 0.3)';
                            }}
                        >
                            <PiPlus />
                            <span>ایجاد کارت جدید</span>
                        </button>

                        {bulkActions && selectedCards.length > 0 && (
                            <>
                                <button
                                    style={actionButtonStyle('danger', 'sm')}
                                    onClick={handleBulkDelete}
                                >
                                    <PiTrash />
                                    <span>حذف ({selectedCards.length})</span>
                                </button>
                                <button
                                    style={actionButtonStyle('success', 'sm')}
                                    onClick={handleBulkQRGenerate}
                                >
                                    <PiQrCode />
                                    <span>ایجاد QR ({selectedCards.length})</span>
                                </button>
                                <button
                                    style={actionButtonStyle('', 'sm')}
                                    onClick={() => {
                                        setSelectedCards([]);
                                        setBulkActions(false);
                                    }}
                                >
                                    <PiX />
                                    <span>انصراف</span>
                                </button>
                            </>
                        )}
                    </div>

                    <div style={{
                        display: 'flex',
                        gap: '0.5rem',
                        flexWrap: 'wrap'
                    }}>
                        {!bulkActions && (
                            <button
                                style={actionButtonStyle('')}
                                onClick={() => setBulkActions(true)}
                            >
                                <PiCopy />
                                <span>انتخاب گروهی</span>
                            </button>
                        )}

                        <button
                            style={actionButtonStyle('')}
                            onClick={exportCards}
                            disabled={filteredCards.length === 0}
                        >
                            <PiExport />
                            <span>خروجی JSON</span>
                        </button>

                        <button
                            style={actionButtonStyle('')}
                            onClick={() => navigate('/templates')}
                        >
                            <PiPalette />
                            <span>قالب‌ها</span>
                        </button>
                    </div>
                </div>

                {/* Filter Section */}
                <div style={filterSectionStyle}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '1rem',
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
                                {(filters.businessType || filters.city || filters.province ||
                                    filters.isVerified || filters.isActive || filters.search) && (
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
                                        transition: 'all 0.3s ease',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <PiGridFour size={20} />
                                </button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    style={{
                                        padding: '0.75rem',
                                        background: viewMode === 'list' ? '#3B82F6' : 'transparent',
                                        border: 'none',
                                        color: viewMode === 'list' ? 'white' : '#374151',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <PiListBullets size={20} />
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
                                placeholder="جستجو در کارت‌ها..."
                                style={inputStyle}
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
                                <option value="createdAt">جدیدترین</option>
                                <option value="views">پربازدیدترین</option>
                                <option value="qrScans">بیشترین اسکن QR</option>
                                <option value="title">الفبایی</option>
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

                                {/* City Filter */}
                                <div>
                                    <label style={{
                                        display: 'block',
                                        fontSize: '0.875rem',
                                        fontWeight: '600',
                                        color: '#374151',
                                        marginBottom: '0.5rem'
                                    }}>
                                        <PiMapPin style={{ marginLeft: '0.25rem' }} />
                                        شهر
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="نام شهر..."
                                        style={inputStyle}
                                        value={filters.city}
                                        onChange={(e) => setFilters({ ...filters, city: e.target.value, page: 1 })}
                                    />
                                </div>

                                {/* Province Filter */}
                                <div>
                                    <label style={{
                                        display: 'block',
                                        fontSize: '0.875rem',
                                        fontWeight: '600',
                                        color: '#374151',
                                        marginBottom: '0.5rem'
                                    }}>
                                        استان
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="نام استان..."
                                        style={inputStyle}
                                        value={filters.province}
                                        onChange={(e) => setFilters({ ...filters, province: e.target.value, page: 1 })}
                                    />
                                </div>

                                {/* Verification Filter */}
                                <div>
                                    <label style={{
                                        display: 'block',
                                        fontSize: '0.875rem',
                                        fontWeight: '600',
                                        color: '#374151',
                                        marginBottom: '0.5rem'
                                    }}>
                                        وضعیت تایید
                                    </label>
                                    <select
                                        style={selectStyle}
                                        value={filters.isVerified}
                                        onChange={(e) => setFilters({ ...filters, isVerified: e.target.value, page: 1 })}
                                    >
                                        <option value="">همه</option>
                                        <option value="true">تایید شده</option>
                                        <option value="false">تایید نشده</option>
                                    </select>
                                </div>

                                {/* Active Status Filter */}
                                <div>
                                    <label style={{
                                        display: 'block',
                                        fontSize: '0.875rem',
                                        fontWeight: '600',
                                        color: '#374151',
                                        marginBottom: '0.5rem'
                                    }}>
                                        وضعیت فعال
                                    </label>
                                    <select
                                        style={selectStyle}
                                        value={filters.isActive}
                                        onChange={(e) => setFilters({ ...filters, isActive: e.target.value, page: 1 })}
                                    >
                                        <option value="">همه</option>
                                        <option value="true">فعال</option>
                                        <option value="false">غیرفعال</option>
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
                                        ...actionButtonStyle('', 'sm'),
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
                                    <span>{totalItems} کارت یافت شد</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Results Info */}
                {!loading && (
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
                                {filteredCards.length}
                            </span> کارت از <span style={{ fontWeight: '700', color: '#374151' }}>
                                {totalItems}
                            </span> کارت
                            {selectedCards.length > 0 && (
                                <span style={{ marginRight: '1rem', color: '#3B82F6', fontWeight: '600' }}>
                                    ({selectedCards.length} انتخاب شده)
                                </span>
                            )}
                        </div>

                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            flexWrap: 'wrap'
                        }}>
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
                                    <span>نوع: {filters.businessType}</span>
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

                            {filters.city && (
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    fontSize: '0.75rem',
                                    color: '#10B981',
                                    background: 'rgba(16, 185, 129, 0.1)',
                                    padding: '0.25rem 0.75rem',
                                    borderRadius: '1rem'
                                }}>
                                    <PiMapPin size={12} />
                                    <span>{filters.city}</span>
                                    <button
                                        onClick={() => setFilters({ ...filters, city: '' })}
                                        style={{
                                            background: 'none',
                                            border: 'none',
                                            color: '#10B981',
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
                    </div>
                )}

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
                ) : filteredCards.length === 0 ? (
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
                            <PiBuilding />
                        </div>
                        <h3 style={{
                            fontSize: '1.5rem',
                            fontWeight: '700',
                            color: '#374151',
                            marginBottom: '0.5rem'
                        }}>
                            کارتی یافت نشد!
                        </h3>
                        <p style={{
                            color: '#6b7280',
                            marginBottom: '1.5rem',
                            maxWidth: '400px',
                            marginLeft: 'auto',
                            marginRight: 'auto'
                        }}>
                            {filters.search || filters.businessType || filters.city
                                ? 'با فیلترهای فعلی هیچ کارتی پیدا نشد.'
                                : 'هنوز کارتی در سیستم ثبت نشده است!'}
                        </p>
                        <div style={{
                            display: 'flex',
                            gap: '1rem',
                            justifyContent: 'center',
                            flexWrap: 'wrap'
                        }}>
                            <button
                                onClick={resetFilters}
                                style={actionButtonStyle('primary')}
                            >
                                <PiFilter />
                                <span>حذف همه فیلترها</span>
                            </button>

                            {!filters.search && !filters.businessType && !filters.city && (
                                <button
                                    onClick={() => navigate('/dashboard/cards/create')}
                                    style={actionButtonStyle('success')}
                                >
                                    <PiPlus />
                                    <span>ایجاد اولین کارت</span>
                                </button>
                            )}
                        </div>
                    </div>
                ) : (
                    /* Cards Grid/List */
                    <>
                        {bulkActions && (
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                                padding: '1rem',
                                background: 'rgba(59, 130, 246, 0.1)',
                                border: '1px solid rgba(59, 130, 246, 0.2)',
                                borderRadius: '1rem',
                                marginBottom: '1.5rem'
                            }}>
                                <input
                                    type="checkbox"
                                    checked={selectedCards.length === filteredCards.length}
                                    onChange={selectAllCards}
                                    style={{
                                        width: '18px',
                                        height: '18px',
                                        cursor: 'pointer'
                                    }}
                                />
                                <span style={{
                                    fontSize: '0.875rem',
                                    color: '#374151',
                                    fontWeight: '600'
                                }}>
                                    انتخاب همه ({selectedCards.length} از {filteredCards.length})
                                </span>
                            </div>
                        )}

                        <div style={{
                            display: viewMode === 'grid'
                                ? 'grid'
                                : 'flex',
                            gridTemplateColumns: viewMode === 'grid'
                                ? 'repeat(auto-fill, minmax(350px, 1fr))'
                                : '1fr',
                            flexDirection: viewMode === 'list' ? 'column' : 'row',
                            gap: viewMode === 'grid' ? '1.5rem' : '1rem',
                            marginBottom: '2rem'
                        }}>
                            {filteredCards.map((card) => (
                                <div
                                    key={card._id}
                                    style={{
                                        background: 'rgba(255, 255, 255, 0.9)',
                                        backdropFilter: 'blur(10px)',
                                        border: '1px solid rgba(255, 255, 255, 0.2)',
                                        borderRadius: '1.5rem',
                                        overflow: 'hidden',
                                        transition: 'all 0.3s ease',
                                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                                        position: 'relative'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-8px)';
                                        e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
                                    }}
                                >
                                    {/* Bulk Selection Checkbox */}
                                    {bulkActions && (
                                        <div style={{
                                            position: 'absolute',
                                            top: '1rem',
                                            left: '1rem',
                                            zIndex: 10
                                        }}>
                                            <input
                                                type="checkbox"
                                                checked={selectedCards.includes(card._id)}
                                                onChange={() => handleCardSelect(card._id)}
                                                style={{
                                                    width: '20px',
                                                    height: '20px',
                                                    cursor: 'pointer'
                                                }}
                                            />
                                        </div>
                                    )}

                                    {/* Card Header */}
                                    <div style={{
                                        background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
                                        padding: '1.5rem',
                                        color: 'white',
                                        position: 'relative'
                                    }}>
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'flex-start'
                                        }}>
                                            <div>
                                                <h4 style={{
                                                    fontSize: '1.25rem',
                                                    fontWeight: '800',
                                                    margin: '0 0 0.5rem 0',
                                                    color: 'white'
                                                }}>
                                                    {card.title}
                                                </h4>
                                                <div style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '0.5rem',
                                                    fontSize: '0.875rem',
                                                    opacity: 0.9
                                                }}>
                                                    <PiBuilding />
                                                    <span>{card.companyName}</span>
                                                </div>
                                            </div>

                                            {/* Verification Badge */}
                                            {card.isVerified && (
                                                <div style={{
                                                    background: 'rgba(255, 255, 255, 0.2)',
                                                    padding: '0.25rem 0.75rem',
                                                    borderRadius: '1rem',
                                                    fontSize: '0.75rem',
                                                    fontWeight: '700',
                                                    backdropFilter: 'blur(10px)',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '0.25rem'
                                                }}>
                                                    <PiShieldCheck />
                                                    تایید شده
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Card Body */}
                                    <div style={{ padding: '1.5rem' }}>
                                        {/* Business Info */}
                                        <div style={{ marginBottom: '1.5rem' }}>
                                            {card.address && (
                                                <div style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '0.5rem',
                                                    marginBottom: '0.75rem'
                                                }}>
                                                    <PiMapPin style={{ color: '#6b7280', fontSize: '1rem', flexShrink: 0 }} />
                                                    <span style={{ color: '#374151', fontSize: '0.875rem' }}>
                                                        {card.address.city || 'شهر مشخص نشده'}
                                                        {card.address.province && `، ${card.address.province}`}
                                                    </span>
                                                </div>
                                            )}

                                            <div style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                marginBottom: '0.75rem'
                                            }}>
                                                <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                                                    نوع کسب‌وکار:
                                                </span>
                                                <span style={{
                                                    fontSize: '0.875rem',
                                                    fontWeight: '600',
                                                    color: '#374151'
                                                }}>
                                                    {card.businessType}
                                                </span>
                                            </div>

                                            {card.ownerName && (
                                                <div style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '0.5rem',
                                                    marginBottom: '0.75rem'
                                                }}>
                                                    <PiUser style={{ color: '#6b7280', fontSize: '1rem' }} />
                                                    <span style={{ color: '#374151', fontSize: '0.875rem' }}>
                                                        {card.ownerName}
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Stats */}
                                        <div style={{
                                            display: 'grid',
                                            gridTemplateColumns: 'repeat(3, 1fr)',
                                            gap: '0.75rem',
                                            marginBottom: '1.5rem'
                                        }}>
                                            <div style={{ textAlign: 'center' }}>
                                                <div style={{
                                                    fontSize: '1.25rem',
                                                    fontWeight: '800',
                                                    color: '#3B82F6'
                                                }}>
                                                    {card.views || 0}
                                                </div>
                                                <div style={{
                                                    fontSize: '0.75rem',
                                                    color: '#6b7280'
                                                }}>
                                                    بازدید
                                                </div>
                                            </div>
                                            <div style={{ textAlign: 'center' }}>
                                                <div style={{
                                                    fontSize: '1.25rem',
                                                    fontWeight: '800',
                                                    color: '#10B981'
                                                }}>
                                                    {card.qrScans || 0}
                                                </div>
                                                <div style={{
                                                    fontSize: '0.75rem',
                                                    color: '#6b7280'
                                                }}>
                                                    اسکن QR
                                                </div>
                                            </div>
                                            <div style={{ textAlign: 'center' }}>
                                                <div style={{
                                                    fontSize: '1.25rem',
                                                    fontWeight: '800',
                                                    color: card.isActive ? '#10B981' : '#EF4444'
                                                }}>
                                                    {card.isActive ? 'فعال' : 'غیرفعال'}
                                                </div>
                                                <div style={{
                                                    fontSize: '0.75rem',
                                                    color: '#6b7280'
                                                }}>
                                                    وضعیت
                                                </div>
                                            </div>
                                        </div>

                                        {/* Action Buttons */}
                                        <div style={{
                                            display: 'grid',
                                            gridTemplateColumns: 'repeat(2, 1fr)',
                                            gap: '0.5rem'
                                        }}>
                                            <button
                                                style={actionButtonStyle('primary')}
                                                onClick={() => navigate(`/cards/${card._id}`)}
                                                onMouseEnter={(e) => {
                                                    e.target.style.transform = 'translateY(-2px)';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.target.style.transform = 'translateY(0)';
                                                }}
                                            >
                                                <PiEye />
                                                <span>مشاهده</span>
                                            </button>

                                            <button
                                                style={actionButtonStyle('success')}
                                                onClick={() => generateQRCode(card._id)}
                                                onMouseEnter={(e) => {
                                                    e.target.style.transform = 'translateY(-2px)';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.target.style.transform = 'translateY(0)';
                                                }}
                                            >
                                                <PiQrCode />
                                                <span>QR Code</span>
                                            </button>

                                            <button
                                                style={actionButtonStyle('')}
                                                onClick={() => navigate(`/dashboard/cards/${card._id}/edit`)}
                                                onMouseEnter={(e) => {
                                                    e.target.style.transform = 'translateY(-2px)';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.target.style.transform = 'translateY(0)';
                                                }}
                                            >
                                                <PiPencil />
                                                <span>ویرایش</span>
                                            </button>

                                            <button
                                                style={actionButtonStyle('danger')}
                                                onClick={() => deleteCard(card._id)}
                                                onMouseEnter={(e) => {
                                                    e.target.style.transform = 'translateY(-2px)';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.target.style.transform = 'translateY(0)';
                                                }}
                                            >
                                                <PiTrash />
                                                <span>حذف</span>
                                            </button>
                                        </div>

                                        {/* Additional Actions */}
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            gap: '1rem',
                                            marginTop: '1rem',
                                            paddingTop: '1rem',
                                            borderTop: '1px solid #e5e7eb'
                                        }}>
                                            <button
                                                onClick={() => duplicateCard(card._id)}
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '0.25rem',
                                                    background: 'none',
                                                    border: 'none',
                                                    color: '#6b7280',
                                                    fontSize: '0.75rem',
                                                    cursor: 'pointer',
                                                    transition: 'color 0.3s ease'
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.target.style.color = '#3B82F6';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.target.style.color = '#6b7280';
                                                }}
                                            >
                                                <PiCopy size={12} />
                                                <span>کپی</span>
                                            </button>

                                            <button
                                                onClick={() => navigate(`/cards/${card._id}/qr-code`)}
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '0.25rem',
                                                    background: 'none',
                                                    border: 'none',
                                                    color: '#6b7280',
                                                    fontSize: '0.75rem',
                                                    cursor: 'pointer',
                                                    transition: 'color 0.3s ease'
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.target.style.color = '#10B981';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.target.style.color = '#6b7280';
                                                }}
                                            >
                                                <PiDownloadSimple size={12} />
                                                <span>دانلود QR</span>
                                            </button>

                                            <button
                                                onClick={() => navigate(`/cards/short/${card.shortUrl}`)}
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '0.25rem',
                                                    background: 'none',
                                                    border: 'none',
                                                    color: '#6b7280',
                                                    fontSize: '0.75rem',
                                                    cursor: 'pointer',
                                                    transition: 'color 0.3s ease'
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.target.style.color = '#8B5CF6';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.target.style.color = '#6b7280';
                                                }}
                                            >
                                                <PiShareNetwork size={12} />
                                                <span>اشتراک</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
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
                            کارت <span style={gradientTextStyle}>دیجیتال</span> خود را ایجاد کنید!
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
                        در کمتر از ۵ دقیقه کارت دیجیتال حرفه‌ای کسب‌وکار خود را بسازید
                    </p>

                    <div style={{
                        display: 'flex',
                        gap: '1rem',
                        justifyContent: 'center',
                        flexWrap: 'wrap'
                    }}>
                        <button
                            style={{
                                ...actionButtonStyle('primary', 'lg'),
                                padding: '1rem 2rem',
                                fontSize: '1rem'
                            }}
                            onClick={() => navigate('/dashboard/cards/create')}
                        >
                            <PiLightning />
                            <span>ساخت کارت جدید</span>
                        </button>

                        <button
                            style={{
                                ...actionButtonStyle('', 'lg'),
                                padding: '1rem 2rem',
                                fontSize: '1rem'
                            }}
                            onClick={() => navigate('/templates')}
                        >
                            <PiPalette />
                            <span>مشاهده قالب‌ها</span>
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
          .stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 1rem !important;
          }
          
          .cards-grid {
            grid-template-columns: 1fr !important;
            gap: 1rem !important;
          }
          
          .filter-grid {
            grid-template-columns: 1fr !important;
          }
          
          .action-buttons {
            flex-direction: column !important;
            align-items: stretch !important;
          }
          
          .action-buttons button {
            width: 100% !important;
          }
          
          .pagination {
            flex-wrap: wrap !important;
          }
        }

        @media (max-width: 480px) {
          .section-title {
            font-size: 2rem !important;
          }
          
          .stats-grid {
            grid-template-columns: 1fr !important;
          }
          
          .cta-buttons {
            flex-direction: column !important;
          }
          
          .cta-buttons button {
            width: 100% !important;
            max-width: 300px !important;
          }
        }
      `}</style>
        </section>
    );
};

export default BusinessCardsPage;