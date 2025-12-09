import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    ArrowLeft,
    Printer,
    Download,
    Share2,
    QrCode as QrCodeIcon,
    Phone,
    Mail,
    MapPin,
    Building,
    User,
    Award,
    Stethoscope,
    Calendar,
    Clock,
    Globe,
    Edit,
    Copy,
    Heart,
    Star,
    Eye,
    Instagram,
    Linkedin,
    Facebook,
    MessageCircle,
    CheckCircle,
    Shield,
    AlertCircle,
    RefreshCw
} from 'lucide-react';
import { visitCardApi } from '../utils/visitCardsApi';

// برای QR code - ابتدا بررسی می‌کنیم آیا کتابخانه نصب شده یا نه
let QRCodeComponent = null;
try {
    const QRCodeModule = await import('react-qr-code');
    QRCodeComponent = QRCodeModule.QRCodeSVG;
} catch (error) {
    console.warn('react-qr-code not installed, using fallback');
    QRCodeComponent = ({ value, size }) => (
        <div style={{
            width: size,
            height: size,
            backgroundColor: '#f3f4f6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#6b7280'
        }}>
            QR Code
        </div>
    );
}

const VisitCardView = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [visitCard, setVisitCard] = useState(null);
    const [error, setError] = useState(null);
    const [copied, setCopied] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [showQR, setShowQR] = useState(false);
    const [imageError, setImageError] = useState({
        cover: false,
        profile: false,
        qr: false
    });
    const [useGeneratedQR, setUseGeneratedQR] = useState(false);

    const qrCodeRef = useRef(null);

    // بارگذاری داده‌های کارت ویزیت
    useEffect(() => {
        const loadVisitCard = async () => {
            try {
                setLoading(true);
                setError(null);
                setImageError({
                    cover: false,
                    profile: false,
                    qr: false
                });
                setUseGeneratedQR(false);

                console.log('در حال بارگذاری کارت ویزیت با ID:', id);
                const response = await visitCardApi.getById(id);

                if (response && response.success) {
                    console.log('کارت ویزیت دریافت شد:', response.data);

                    setVisitCard(response.data);

                    // بازگرداندن اطلاعات لایک از localStorage
                    const likedCards = JSON.parse(localStorage.getItem('likedVisitCards') || '[]');
                    setIsLiked(likedCards.includes(response.data._id));
                } else {
                    setError(response?.message || 'کارت ویزیت یافت نشد');
                }
            } catch (error) {
                console.error('خطا در بارگذاری کارت ویزیت:', error);
                setError('خطا در بارگذاری اطلاعات کارت ویزیت');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            loadVisitCard();
        }
    }, [id]);

    // تابع بهبود یافته برای دریافت URL کامل تصاویر
    const getFullImageUrl = (path, type = 'general') => {
        if (!path || path === 'undefined' || path === 'null' || path === '') {
            console.warn(`Invalid ${type} image path:`, path);
            return null;
        }

        const cleanPath = String(path).trim();

        // اگر مسیر کامل است
        if (cleanPath.startsWith('http://') || cleanPath.startsWith('https://')) {
            return cleanPath;
        }

        // حذف slash اول اگر وجود دارد
        const normalizedPath = cleanPath.startsWith('/') ? cleanPath.substring(1) : cleanPath;

        // تشخیص نوع فایل و مسیر مناسب
        if (type === 'qr' || normalizedPath.includes('qrcode') || normalizedPath.includes('visitcard')) {
            return `http://localhost:5000/uploads/qrcodes/${normalizedPath}`;
        }

        // برای سایر تصاویر
        return `http://localhost:5000/uploads/${normalizedPath}`;
    };

    // تابع ویژه برای تست تصاویر
    const testImageUrl = async (url) => {
        if (!url) return false;

        try {
            const response = await fetch(url, {
                method: 'HEAD',
                mode: 'no-cors'
            });
            return true;
        } catch (error) {
            console.log('Image test failed for:', url);
            return false;
        }
    };

    // کپی کردن اطلاعات به کلیپ‌بورد
    const copyToClipboard = (text) => {
        if (!text) {
            alert('متن‌ای برای کپی وجود ندارد');
            return;
        }

        navigator.clipboard.writeText(text).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }).catch(err => {
            console.error('خطا در کپی کردن:', err);
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    // لایک کردن کارت ویزیت
    const handleLike = () => {
        if (!visitCard) return;

        const likedCards = JSON.parse(localStorage.getItem('likedVisitCards') || '[]');

        if (isLiked) {
            const newLikedCards = likedCards.filter(cardId => cardId !== visitCard._id);
            localStorage.setItem('likedVisitCards', JSON.stringify(newLikedCards));
            setIsLiked(false);
        } else {
            likedCards.push(visitCard._id);
            localStorage.setItem('likedVisitCards', JSON.stringify(likedCards));
            setIsLiked(true);
        }
    };

    // اشتراک‌گذاری
    const handleShare = async () => {
        if (!visitCard) return;

        const shareData = {
            title: `کارت ویزیت دکتر ${visitCard.doctorName}`,
            text: `${visitCard.doctorName} - ${visitCard.medicalDegree}\nتخصص: ${visitCard.specialty}\nتلفن: ${visitCard.phone}`,
            url: window.location.href,
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (error) {
                console.error('خطا در اشتراک‌گذاری:', error);
                if (error.name !== 'AbortError') {
                    copyToClipboard(window.location.href);
                }
            }
        } else {
            copyToClipboard(window.location.href);
        }
    };

    // چاپ کارت ویزیت
    const handlePrint = () => {
        window.print();
    };

    // قالب‌بندی تلفن
    const formatPhone = (phone) => {
        if (!phone) return '';
        const digits = phone.replace(/\D/g, '');

        if (digits.length === 10) {
            return digits.replace(/(\d{4})(\d{3})(\d{4})/, '$1 $2 $3');
        } else if (digits.length === 11) {
            return digits.replace(/(\d{3})(\d{8})/, '$1 $2');
        }

        return phone;
    };

    // باز کردن لینک
    const openLink = (url) => {
        if (!url) {
            alert('آدرس نامعتبر است');
            return;
        }

        let fullUrl = url;
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            fullUrl = 'https://' + url;
        }

        window.open(fullUrl, '_blank', 'noopener,noreferrer');
    };

    // باز کردن نقشه
    const openMap = (address) => {
        if (!address) {
            alert('آدرسی وارد نشده است');
            return;
        }

        const encodedAddress = encodeURIComponent(address);
        const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
        window.open(mapUrl, '_blank', 'noopener,noreferrer');
    };

    // باز کردن تلفن
    const openPhone = (phone) => {
        if (!phone) {
            alert('شماره تلفنی وارد نشده است');
            return;
        }

        const cleanPhone = phone.replace(/\D/g, '');
        window.open(`tel:${cleanPhone}`, '_self');
    };

    // باز کردن ایمیل
    const openEmail = (email) => {
        if (!email) {
            alert('آدرس ایمیلی وارد نشده است');
            return;
        }

        window.open(`mailto:${email}`, '_self');
    };

    // بررسی و اعتبارسنجی داده‌ها
    const isValidPhone = (phone) => {
        return phone && phone.trim().length > 5;
    };

    const isValidEmail = (email) => {
        return email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    // قالب‌بندی تاریخ
    const formatDate = (dateString) => {
        if (!dateString) return 'تاریخ نامشخص';

        try {
            const date = new Date(dateString);
            return new Intl.DateTimeFormat('fa-IR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }).format(date);
        } catch (error) {
            console.error('خطا در قالب‌بندی تاریخ:', error);
            return dateString;
        }
    };

    // دانلود QR code
    const downloadQRCode = () => {
        try {
            const link = document.createElement('a');
            link.download = `qrcode-${visitCard.doctorName}-${Date.now()}.png`;

            if (useGeneratedQR || !visitCard?.qrcode) {
                // ایجاد QR code ساده
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = 200;
                canvas.height = 200;

                // پس‌زمینه سفید
                ctx.fillStyle = '#ffffff';
                ctx.fillRect(0, 0, 200, 200);

                // متن ساده
                ctx.fillStyle = '#000000';
                ctx.font = '20px Arial';
                ctx.textAlign = 'center';
                ctx.fillText('QR Code', 100, 100);

                link.href = canvas.toDataURL('image/png');
            } else {
                // دانلود QR code آپلود شده
                const qrUrl = getFullImageUrl(visitCard.qrcode, 'qr');
                link.href = qrUrl;
            }

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('خطا در دانلود QR code:', error);
            alert('خطا در دانلود QR کد');
        }
    };

    // تست مجدد QR code
    const retryQrCode = () => {
        setImageError(prev => ({ ...prev, qr: false }));
        setUseGeneratedQR(false);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="relative">
                        <div className="w-24 h-24 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Stethoscope className="w-12 h-12 text-teal-600 animate-pulse" />
                        </div>
                    </div>
                    <p className="mt-6 text-gray-600 text-lg font-medium">
                        در حال بارگذاری کارت ویزیت...
                    </p>
                    <p className="mt-2 text-sm text-gray-500">لطفاً چند لحظه صبر کنید</p>
                </div>
            </div>
        );
    }

    if (error || !visitCard) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 flex items-center justify-center">
                <div className="text-center max-w-md mx-auto p-8">
                    <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-r from-red-100 to-red-200 rounded-full flex items-center justify-center">
                        <AlertCircle className="w-16 h-16 text-red-600" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        ⚠️ کارت ویزیت یافت نشد
                    </h2>
                    <p className="text-gray-600 mb-8">
                        {error || 'کارت ویزیت مورد نظر وجود ندارد یا حذف شده است.'}
                    </p>
                    <div className="space-y-4">
                        <button
                            onClick={() => navigate('/visit-cards')}
                            className="w-full px-6 py-3 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors flex items-center justify-center"
                        >
                            <ArrowLeft className="w-5 h-5 ml-2" />
                            بازگشت به لیست کارت ویزیت‌ها
                        </button>
                        <button
                            onClick={() => navigate('/visit-cards/create')}
                            className="w-full px-6 py-3 border-2 border-teal-600 text-teal-600 rounded-xl hover:bg-teal-50 transition-colors"
                        >
                            ساخت کارت ویزیت جدید
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // استخراج داده‌ها
    const {
        doctorName,
        medicalDegree,
        specialty,
        subSpecialty,
        medicalCouncilNumber,
        phone,
        email,
        website,
        address,
        clinicName,
        clinicPhone,
        specialities,
        description,
        icon,
        coverImage,
        qrcode,
        title,
        bussinessName,
        createdAt,
        views
    } = visitCard;

    const fullIconUrl = getFullImageUrl(icon, 'profile');
    const fullCoverUrl = getFullImageUrl(coverImage, 'cover');
    const fullQrCodeUrl = getFullImageUrl(qrcode, 'qr');

    // دکمه‌های اشتراک‌گذاری اجتماعی
    const socialButtons = [
        {
            name: 'فیسبوک',
            icon: Facebook,
            color: 'blue',
            url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`
        },
        {
            name: 'توییتر',
            icon: () => (
                <svg className="w-5 h-5 ml-2 fill-current" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.213c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
            ),
            color: 'sky',
            url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(`کارت ویزیت دکتر ${doctorName}`)}`
        },
        {
            name: 'لینکدین',
            icon: Linkedin,
            color: 'blue',
            url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`
        },
        {
            name: 'واتساپ',
            icon: () => (
                <svg className="w-5 h-5 ml-2 fill-current" viewBox="0 0 24 24">
                    <path d="M17.507 14.307l-.009.075c-.016.125-.04.225-.078.285-.04.065-.103.143-.178.206-.157.14-.388.263-.69.35-.252.078-.5.106-.838.106-.5 0-.88-.063-1.506-.25-.22-.065-.438-.152-.647-.257-.065-.04-.152-.085-.25-.118a.828.828 0 00-.227-.04c-.096 0-.194.025-.294.075l-2.55 1.27c-.2.1-.47.2-.76.2-.5 0-.92-.16-1.18-.44-.26-.28-.4-.67-.4-1.13 0-.26.04-.52.12-.78l.6-2.04c.1-.35.22-.67.37-.96a4.5 4.5 0 01.6-.84c.2-.22.42-.42.67-.6.25-.18.53-.33.84-.44.3-.1.63-.16.98-.16.2 0 .38.02.54.06.16.04.3.1.43.18.13.08.24.18.34.3.1.12.18.26.24.44.06.18.1.4.13.66.03.26.04.55.04.86 0 .26-.02.5-.06.72-.04.22-.1.4-.18.54-.08.14-.18.25-.3.33-.12.08-.26.12-.43.12-.1 0-.2-.02-.3-.06-.1-.04-.2-.1-.3-.18-.1-.08-.2-.18-.3-.3-.1-.12-.2-.26-.3-.44-.1-.18-.2-.4-.3-.66-.1-.26-.2-.56-.3-.9-.1-.34-.2-.72-.3-1.14-.1-.42-.2-.88-.3-1.38-.1-.5-.2-1.03-.3-1.6-.1-.57-.2-1.17-.3-1.8-.1-.63-.2-1.28-.3-1.95-.1-.67-.2-1.34-.3-2.01-.1-.67-.2-1.33-.3-1.98-.1-.65-.2-1.28-.3-1.88-.1-.6-.2-1.16-.3-1.68-.1-.52-.2-.98-.3-1.38-.1-.4-.2-.73-.3-1-.1-.27-.2-.46-.3-.58-.1-.12-.2-.2-.3-.26-.1-.06-.2-.1-.3-.12-.1-.02-.2-.03-.3-.03-.1 0-.2.01-.3.03-.1.02-.2.06-.3.12-.1.06-.2.14-.3.26-.1.12-.2.28-.3.5-.1.22-.2.5-.3.84-.1.34-.2.75-.3 1.23-.1.48-.2 1.02-.3 1.62-.1.6-.2 1.26-.3 1.98-.1.72-.2 1.49-.3 2.31-.1.82-.2 1.68-.3 2.58-.1.9-.2 1.82-.3 2.76-.1.94-.2 1.89-.3 2.85-.1.96-.2 1.92-.3 2.88-.1.96-.2 1.9-.3 2.82-.1.92-.2 1.82-.3 2.7-.1.88-.2 1.72-.3 2.52-.1.8-.2 1.56-.3 2.28-.1.72-.2 1.38-.3 1.98-.1.6-.2 1.14-.3 1.62-.1.48-.2.88-.3 1.2-.1.32-.2.56-.3.72-.1.16-.2.26-.3.3-.1.04-.2.06-.3.06-.1 0-.2-.02-.3-.06z" />
                </svg>
            ),
            color: 'green',
            url: `https://wa.me/?text=${encodeURIComponent(`کارت ویزیت دکتر ${doctorName}: ${window.location.href}`)}`
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
            {/* Header */}
            <motion.header
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <button
                            onClick={() => navigate('/visit-cards')}
                            className="flex items-center text-gray-700 hover:text-gray-900 transition-colors group"
                        >
                            <ArrowLeft className="w-5 h-5 ml-2 group-hover:-translate-x-1 transition-transform" />
                            بازگشت
                        </button>

                        <div className="text-center">
                            <h1 className="text-2xl font-bold text-gray-900 flex items-center justify-center">
                                <Stethoscope className="w-6 h-6 ml-2 text-teal-600" />
                                کارت ویزیت پزشکی
                            </h1>
                            <p className="text-gray-600 text-sm mt-1">
                                {doctorName} - {specialty}
                            </p>
                        </div>

                        <div className="flex items-center space-x-2">
                            <button
                                onClick={handleLike}
                                className={`p-2 rounded-full transition-all duration-300 ${isLiked ? 'text-red-500 bg-red-50 shadow-md' : 'text-gray-500 hover:text-red-500 hover:bg-red-50'}`}
                                title={isLiked ? "حذف از علاقه‌مندی‌ها" : "ذخیره در علاقه‌مندی‌ها"}
                            >
                                <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                            </button>
                            <button
                                onClick={handleShare}
                                className="p-2 rounded-full text-gray-500 hover:text-teal-600 hover:bg-teal-50 transition-colors"
                                title="اشتراک‌گذاری"
                            >
                                <Share2 className="w-5 h-5" />
                            </button>
                            <Link
                                to={`/visit-cards/${id}/edit`}
                                className="p-2 rounded-full text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                                title="ویرایش"
                            >
                                <Edit className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                </div>
            </motion.header>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="space-y-8"
                >
                    {/* Hero Section */}
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                        {/* تصویر پس‌زمینه */}
                        {fullCoverUrl && !imageError.cover && (
                            <div className="absolute inset-0">
                                <img
                                    src={fullCoverUrl}
                                    alt="کاور"
                                    className="w-full h-full object-cover opacity-20"
                                    onError={(e) => {
                                        console.error('Error loading cover image');
                                        setImageError(prev => ({ ...prev, cover: true }));
                                    }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-teal-600/30"></div>
                            </div>
                        )}

                        <div className="relative p-8 md:p-12">
                            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                                {/* عکس پروفایل */}
                                <div className="relative">
                                    <div className="w-40 h-40 rounded-full bg-white p-3 shadow-2xl">
                                        <div className="w-full h-full rounded-full overflow-hidden border-4 border-white">
                                            {fullIconUrl && !imageError.profile ? (
                                                <img
                                                    src={fullIconUrl}
                                                    alt={doctorName}
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => {
                                                        console.error('Error loading profile image');
                                                        setImageError(prev => ({ ...prev, profile: true }));
                                                    }}
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-gradient-to-br from-blue-100 to-teal-100 flex items-center justify-center">
                                                    <User className="w-20 h-20 text-gray-400" />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    {medicalCouncilNumber && (
                                        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-full shadow-lg">
                                            <div className="flex items-center text-sm font-bold">
                                                <Shield className="w-4 h-4 ml-2" />
                                                نظام پزشکی: {medicalCouncilNumber}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* اطلاعات اصلی */}
                                <div className="flex-1 text-center md:text-right">
                                    <div className="mb-6">
                                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
                                            {doctorName}
                                        </h1>
                                        <div className="flex flex-wrap items-center justify-center md:justify-end gap-3 mb-4">
                                            <div className="flex items-center text-2xl text-teal-700 font-bold">
                                                <Stethoscope className="w-6 h-6 ml-2" />
                                                {medicalDegree}
                                            </div>
                                            <div className="text-xl text-gray-700 font-medium">
                                                تخصص: <span className="text-teal-600">{specialty}</span>
                                            </div>
                                            {subSpecialty && (
                                                <div className="text-lg text-gray-600">
                                                    فوق تخصص: {subSpecialty}
                                                </div>
                                            )}
                                        </div>

                                        {clinicName && (
                                            <div className="flex items-center justify-center md:justify-end text-xl text-gray-800 mb-4">
                                                <Building className="w-5 h-5 ml-2 text-blue-600" />
                                                {clinicName}
                                            </div>
                                        )}
                                    </div>

                                    {/* آمار */}
                                    <div className="flex flex-wrap justify-center md:justify-end gap-6">
                                        <div className="flex items-center text-gray-600">
                                            <Eye className="w-5 h-5 ml-2" />
                                            <span>{views || 0} بازدید</span>
                                        </div>
                                        <div className="flex items-center text-gray-600">
                                            <Calendar className="w-5 h-5 ml-2" />
                                            <span>ایجاد شده در {formatDate(createdAt)}</span>
                                        </div>
                                        <div className="flex items-center text-gray-600">
                                            <CheckCircle className="w-5 h-5 ml-2 text-green-500" />
                                            <span>تایید شده</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions Bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
                    >
                        <div className="flex flex-wrap justify-center gap-4">
                            {isValidPhone(phone) && (
                                <button
                                    onClick={() => openPhone(phone)}
                                    className="flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                                >
                                    <Phone className="w-5 h-5 ml-2" />
                                    تماس مستقیم
                                </button>
                            )}

                            {isValidPhone(phone) && (
                                <button
                                    onClick={() => window.open(`sms:${phone.replace(/\D/g, '')}`, '_blank')}
                                    className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                                >
                                    <MessageCircle className="w-5 h-5 ml-2" />
                                    ارسال پیامک
                                </button>
                            )}

                            {isValidEmail(email) && (
                                <button
                                    onClick={() => openEmail(email)}
                                    className="flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                                >
                                    <Mail className="w-5 h-5 ml-2" />
                                    ارسال ایمیل
                                </button>
                            )}

                            <button
                                onClick={() => setShowQR(true)}
                                className="flex items-center px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-xl hover:from-teal-600 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                            >
                                <QrCodeIcon className="w-5 h-5 ml-2" />
                                نمایش QR کد
                            </button>

                            <button
                                onClick={handlePrint}
                                className="flex items-center px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl hover:from-gray-700 hover:to-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl"
                            >
                                <Printer className="w-5 h-5 ml-2" />
                                چاپ کارت ویزیت
                            </button>
                        </div>
                    </motion.div>

                    {/* QR Code Modal */}
                    {showQR && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
                            onClick={() => setShowQR(false)}
                        >
                            <div
                                className="bg-white rounded-3xl p-8 max-w-md mx-4 shadow-2xl"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="text-center">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                        QR Code کارت ویزیت
                                    </h3>

                                    <div className="w-64 h-64 mx-auto mb-6 bg-white p-4 rounded-2xl shadow-lg flex items-center justify-center">
                                        {fullQrCodeUrl && !useGeneratedQR ? (
                                            <>
                                                <img
                                                    src={fullQrCodeUrl}
                                                    alt="QR Code"
                                                    className="w-full h-full object-contain"
                                                    onError={(e) => {
                                                        console.error('Error loading QR code image');
                                                        setImageError(prev => ({ ...prev, qr: true }));
                                                        setUseGeneratedQR(true);
                                                    }}
                                                />
                                                {imageError.qr && (
                                                    <div className="absolute inset-0 flex items-center justify-center bg-white">
                                                        <div className="text-center">
                                                            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                                                            <p className="text-red-600">خطا در بارگذاری QR کد</p>
                                                            <button
                                                                onClick={retryQrCode}
                                                                className="mt-2 text-sm text-blue-600 hover:text-blue-800 flex items-center justify-center mx-auto"
                                                            >
                                                                <RefreshCw className="w-4 h-4 ml-2" />
                                                                تلاش مجدد
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}
                                            </>
                                        ) : (
                                            <div className="text-center">
                                                {QRCodeComponent ? (
                                                    <QRCodeComponent
                                                        value={window.location.href}
                                                        size={200}
                                                        level="H"
                                                        includeMargin={true}
                                                        className="mx-auto"
                                                    />
                                                ) : (
                                                    <div style={{
                                                        width: 200,
                                                        height: 200,
                                                        backgroundColor: '#f3f4f6',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        color: '#6b7280'
                                                    }}>
                                                        QR Code
                                                    </div>
                                                )}
                                                <p className="mt-2 text-sm text-gray-500">QR Code تولید شده</p>
                                            </div>
                                        )}
                                    </div>

                                    <p className="text-gray-600 mb-6">
                                        برای ذخیره اطلاعات پزشک، این کد را اسکن کنید
                                    </p>

                                    <div className="flex gap-3">
                                        <button
                                            onClick={downloadQRCode}
                                            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center"
                                        >
                                            <Download className="w-4 h-4 ml-2" />
                                            دانلود QR کد
                                        </button>

                                        <button
                                            onClick={() => setShowQR(false)}
                                            className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-colors"
                                        >
                                            بستن
                                        </button>
                                    </div>

                                    {useGeneratedQR && (
                                        <p className="mt-4 text-sm text-orange-600">
                                            ⚠️ QR code اصلی در دسترس نیست، از نسخه تولید شده استفاده می‌شود
                                        </p>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* ستون چپ: اطلاعات تماس */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* اطلاعات تماس */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                                className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
                            >
                                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                                    <Phone className="w-6 h-6 ml-3 text-blue-600" />
                                    اطلاعات تماس
                                </h2>

                                <div className="space-y-6">
                                    {/* تلفن‌ها */}
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800 mb-4">شماره تماس‌ها</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {isValidPhone(phone) && (
                                                <div className="bg-blue-50 rounded-xl p-6">
                                                    <div className="flex items-center justify-between mb-3">
                                                        <div className="flex items-center">
                                                            <Phone className="w-5 h-5 ml-3 text-blue-600" />
                                                            <span className="text-gray-700 font-medium">تلفن همراه</span>
                                                        </div>
                                                        <button
                                                            onClick={() => copyToClipboard(phone)}
                                                            className="text-blue-600 hover:text-blue-800 text-sm"
                                                        >
                                                            {copied ? 'کپی شد!' : 'کپی'}
                                                        </button>
                                                    </div>
                                                    <p className="text-2xl font-bold text-gray-900 dir-ltr text-right">
                                                        {formatPhone(phone)}
                                                    </p>
                                                </div>
                                            )}

                                            {isValidPhone(clinicPhone) && (
                                                <div className="bg-green-50 rounded-xl p-6">
                                                    <div className="flex items-center justify-between mb-3">
                                                        <div className="flex items-center">
                                                            <Phone className="w-5 h-5 ml-3 text-green-600" />
                                                            <span className="text-gray-700 font-medium">تلفن مطب</span>
                                                        </div>
                                                        <button
                                                            onClick={() => copyToClipboard(clinicPhone)}
                                                            className="text-green-600 hover:text-green-800 text-sm"
                                                        >
                                                            {copied ? 'کپی شد!' : 'کپی'}
                                                        </button>
                                                    </div>
                                                    <p className="text-2xl font-bold text-gray-900 dir-ltr text-right">
                                                        {formatPhone(clinicPhone)}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* ایمیل و وبسایت */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {isValidEmail(email) && (
                                            <div className="bg-purple-50 rounded-xl p-6">
                                                <div className="flex items-center justify-between mb-3">
                                                    <div className="flex items-center">
                                                        <Mail className="w-5 h-5 ml-3 text-purple-600" />
                                                        <span className="text-gray-700 font-medium">ایمیل</span>
                                                    </div>
                                                    <button
                                                        onClick={() => copyToClipboard(email)}
                                                        className="text-purple-600 hover:text-purple-800 text-sm"
                                                    >
                                                        {copied ? 'کپی شد!' : 'کپی'}
                                                    </button>
                                                </div>
                                                <p
                                                    className="text-lg font-medium text-gray-900 truncate cursor-pointer hover:text-purple-600"
                                                    onClick={() => openEmail(email)}
                                                    title="ارسال ایمیل"
                                                >
                                                    {email}
                                                </p>
                                            </div>
                                        )}

                                        {website && (
                                            <div className="bg-orange-50 rounded-xl p-6">
                                                <div className="flex items-center justify-between mb-3">
                                                    <div className="flex items-center">
                                                        <Globe className="w-5 h-5 ml-3 text-orange-600" />
                                                        <span className="text-gray-700 font-medium">وبسایت</span>
                                                    </div>
                                                    <button
                                                        onClick={() => copyToClipboard(website)}
                                                        className="text-orange-600 hover:text-orange-800 text-sm"
                                                    >
                                                        {copied ? 'کپی شد!' : 'کپی'}
                                                    </button>
                                                </div>
                                                <p
                                                    className="text-lg font-medium text-gray-900 truncate cursor-pointer hover:text-orange-600"
                                                    onClick={() => openLink(website)}
                                                    title="بازدید از وبسایت"
                                                >
                                                    {website}
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                    {/* آدرس */}
                                    {address && (
                                        <div className="bg-yellow-50 rounded-xl p-6">
                                            <div className="flex items-center justify-between mb-3">
                                                <div className="flex items-center">
                                                    <MapPin className="w-5 h-5 ml-3 text-yellow-600" />
                                                    <span className="text-gray-700 font-medium">آدرس مطب</span>
                                                </div>
                                                <button
                                                    onClick={() => copyToClipboard(address)}
                                                    className="text-yellow-600 hover:text-yellow-800 text-sm"
                                                >
                                                    {copied ? 'کپی شد!' : 'کپی'}
                                                </button>
                                            </div>
                                            <p className="text-lg font-medium text-gray-900 leading-relaxed">
                                                {address}
                                            </p>
                                            <button
                                                onClick={() => openMap(address)}
                                                className="mt-4 text-sm text-blue-600 hover:text-blue-800 flex items-center"
                                            >
                                                <MapPin className="w-4 h-4 ml-2" />
                                                مشاهده در نقشه
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </motion.div>

                            {/* تخصص‌ها و خدمات */}
                            {specialities && specialities.length > 0 && (
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.4 }}
                                    className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
                                >
                                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                                        <Award className="w-6 h-6 ml-3 text-teal-600" />
                                        تخصص‌ها و خدمات
                                    </h2>

                                    <div className="flex flex-wrap gap-3">
                                        {specialities.map((speciality, index) => (
                                            <span
                                                key={index}
                                                className="px-4 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 flex items-center"
                                            >
                                                <Star className="w-4 h-4 ml-2 fill-current" />
                                                {speciality}
                                            </span>
                                        ))}
                                    </div>

                                    {description && (
                                        <div className="mt-8 pt-8 border-t border-gray-100">
                                            <h3 className="text-xl font-semibold text-gray-800 mb-4">توضیحات</h3>
                                            <p className="text-gray-600 leading-relaxed text-justify whitespace-pre-line">
                                                {description}
                                            </p>
                                        </div>
                                    )}
                                </motion.div>
                            )}
                        </div>

                        {/* ستون راست: اطلاعات جانبی */}
                        <div className="space-y-8">
                            {/* دکمه‌های اشتراک‌گذاری اجتماعی */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                                className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
                            >
                                <h3 className="text-xl font-bold text-gray-900 mb-4">اشتراک‌گذاری</h3>
                                <div className="grid grid-cols-2 gap-3">
                                    {socialButtons.map((social, index) => {
                                        const Icon = social.icon;
                                        const bgColor = `bg-${social.color}-100`;
                                        const textColor = `text-${social.color}-600`;
                                        const hoverBgColor = `hover:bg-${social.color}-200`;

                                        return (
                                            <button
                                                key={index}
                                                onClick={() => openLink(social.url)}
                                                className={`flex items-center justify-center p-3 ${bgColor} ${textColor} rounded-xl ${hoverBgColor} transition-colors`}
                                            >
                                                {typeof Icon === 'function' ? <Icon /> : <Icon className="w-5 h-5 ml-2" />}
                                                {social.name}
                                            </button>
                                        );
                                    })}
                                </div>
                            </motion.div>

                            {/* اطلاعات اضافی */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 }}
                                className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
                            >
                                <h3 className="text-xl font-bold text-gray-900 mb-4">اطلاعات اضافی</h3>
                                <div className="space-y-4">
                                    {title && (
                                        <div className="flex items-center text-gray-600">
                                            <span className="ml-3 font-medium">عنوان:</span>
                                            <span>{title}</span>
                                        </div>
                                    )}

                                    {bussinessName && (
                                        <div className="flex items-center text-gray-600">
                                            <Building className="w-5 h-5 ml-3 text-gray-400" />
                                            <span>نام کسب‌وکار: {bussinessName}</span>
                                        </div>
                                    )}

                                    <div className="pt-4 border-t border-gray-100">
                                        <p className="text-sm text-gray-500 mb-2">کد شناسایی:</p>
                                        <div className="flex items-center">
                                            <code className="bg-gray-100 px-3 py-1 rounded text-sm font-mono text-gray-700 break-all flex-1">
                                                {id}
                                            </code>
                                            <button
                                                onClick={() => copyToClipboard(id)}
                                                className="mr-3 text-blue-600 hover:text-blue-800 text-sm whitespace-nowrap"
                                            >
                                                {copied ? 'کپی شد!' : 'کپی'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* دکمه دانلود */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 }}
                                className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-2xl shadow-lg p-6 text-white"
                            >
                                <h3 className="text-xl font-bold mb-4">ذخیره کارت ویزیت</h3>
                                <p className="mb-6 opacity-90">
                                    کارت ویزیت را ذخیره کنید یا برای دیگران ارسال نمایید.
                                </p>
                                <div className="space-y-3">
                                    <button
                                        onClick={handlePrint}
                                        className="w-full flex items-center justify-center py-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl transition-colors"
                                    >
                                        <Printer className="w-5 h-5 ml-2" />
                                        چاپ PDF
                                    </button>
                                    <button
                                        onClick={downloadQRCode}
                                        className="w-full flex items-center justify-center py-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl transition-colors"
                                    >
                                        <Download className="w-5 h-5 ml-2" />
                                        دانلود QR Code
                                    </button>
                                    {fullIconUrl && !imageError.profile && (
                                        <button
                                            onClick={() => {
                                                const link = document.createElement('a');
                                                link.href = fullIconUrl;
                                                link.download = `profile-${doctorName}-${Date.now()}.png`;
                                                document.body.appendChild(link);
                                                link.click();
                                                document.body.removeChild(link);
                                            }}
                                            className="w-full flex items-center justify-center py-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl transition-colors"
                                        >
                                            <Download className="w-5 h-5 ml-2" />
                                            دانلود عکس پروفایل
                                        </button>
                                    )}
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    {/* نوار پایینی */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-2xl shadow-lg p-8 border border-blue-100"
                    >
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                    نیاز به مشاوره پزشکی دارید؟
                                </h3>
                                <p className="text-gray-600">
                                    برای دریافت نوبت یا مشاوره با پزشک تماس بگیرید.
                                </p>
                            </div>
                            <div className="flex gap-4">
                                {isValidPhone(phone) && (
                                    <button
                                        onClick={() => openPhone(phone)}
                                        className="px-8 py-3 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-xl hover:from-teal-700 hover:to-teal-800 transition-all duration-300 font-bold shadow-lg hover:shadow-xl"
                                    >
                                        <Phone className="w-5 h-5 ml-2 inline" />
                                        تماس برای نوبت
                                    </button>
                                )}
                                <Link
                                    to={`/visit-cards/${id}/edit`}
                                    className="px-8 py-3 border-2 border-teal-600 text-teal-600 rounded-xl hover:bg-teal-50 transition-all duration-300 font-bold"
                                >
                                    <Edit className="w-5 h-5 ml-2 inline" />
                                    ویرایش اطلاعات
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            {/* Footer */}
            <footer className="mt-12 py-8 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <p className="text-gray-300">
                            © {new Date().getFullYear()} کارت ویزیت پزشکی. تمامی حقوق محفوظ است.
                        </p>
                        <p className="text-gray-400 text-sm mt-2">
                            این صفحه توسط سامانه کارت ویزیت پزشکی تولید شده است.
                        </p>
                        <div className="mt-4 flex flex-wrap justify-center gap-4">
                            <button
                                onClick={() => navigate('/visit-cards')}
                                className="text-gray-300 hover:text-white transition-colors"
                            >
                                لیست پزشکان
                            </button>
                            <button
                                onClick={() => navigate('/visit-cards/create')}
                                className="text-gray-300 hover:text-white transition-colors"
                            >
                                ساخت کارت ویزیت
                            </button>
                            <button
                                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                className="text-gray-300 hover:text-white transition-colors"
                            >
                                بازگشت به بالا
                            </button>
                            <button
                                onClick={() => setShowQR(true)}
                                className="text-gray-300 hover:text-white transition-colors"
                            >
                                نمایش QR Code
                            </button>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Toast برای کپی */}
            {copied && (
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg z-50"
                >
                    <div className="flex items-center">
                        <CheckCircle className="w-5 h-5 ml-2" />
                        متن با موفقیت کپی شد!
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default VisitCardView;