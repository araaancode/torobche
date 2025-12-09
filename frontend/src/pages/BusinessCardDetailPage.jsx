// components/BusinessCardDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { businessCardApi } from '../utils/businessCardsApi';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowLeft,
    Download,
    Share2,
    Printer,
    Copy,
    QrCode,
    Phone,
    Mail,
    MapPin,
    Globe,
    Instagram,
    Linkedin,
    Twitter,
    Send,
    Edit,
    Eye,
    FileText, // اینو اضافه کردم
    Heart,
    Link as LinkIcon,
    AlertCircle // برای نمایش خطا
} from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const BusinessCardDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [businessCard, setBusinessCard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [copied, setCopied] = useState(false);
    const [showQR, setShowQR] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    const [downloadProgress, setDownloadProgress] = useState(0);

    useEffect(() => {
        loadBusinessCard();
    }, [id]);

    const loadBusinessCard = async () => {
        try {
            setLoading(true);
            const response = await businessCardApi.getById(id);

            if (response && response.success) {
                setBusinessCard(response.data);

                // Check if card is favorite in localStorage
                const favorites = JSON.parse(localStorage.getItem('businessCardFavorites') || '[]');
                setIsFavorite(favorites.includes(response.data._id));
            } else {
                setError('کارت ویزیت یافت نشد');
                // Load mock data for demo
                loadMockData();
            }
        } catch (err) {
            console.error('Error loading business card:', err);
            setError('خطا در بارگذاری کارت ویزیت. لطفاً دوباره تلاش کنید.');
            // Load mock data for demo
            loadMockData();
        } finally {
            setLoading(false);
        }
    };

    const loadMockData = () => {
        // Mock data for demo
        setBusinessCard({
            _id: id || 'mock-id',
            title: 'کارت ویزیت شرکت فناوری اطلاعات',
            description: 'ارائه دهنده خدمات نرم‌افزاری و راه‌کارهای هوشمند کسب‌وکار',
            ownerName: 'علی محمدی',
            businessType: 'فناوری اطلاعات',
            phone: '۰۹۱۲۳۴۵۶۷۸۹',
            address: 'تهران، خیابان ولیعصر، پلاک ۱۲۳۴، طبقه ۵',
            email: 'ali.mohammadi@techco.com',
            website: 'https://techco.com',
            socialLinks: {
                instagram: 'techco.ir',
                linkedin: 'company/techco',
                twitter: 'techco_ir',
                telegram: 'techco_channel'
            },
            logo: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=200&h=200&fit=crop',
            coverImage: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop',
            qrCode: '',
            template: {
                _id: '1',
                title: 'قالب مدرن',
                colorPallete: ['#4F46E5', '#7C3AED', '#EC4899']
            },
            shareableLink: `/card/business-${id || 'mock'}`,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        });
    };

    const handleShare = async () => {
        const shareUrl = `${window.location.origin}/card/${businessCard.shareableLink?.split('/').pop()}`;

        if (navigator.share) {
            try {
                await navigator.share({
                    title: `کارت ویزیت ${businessCard.ownerName}`,
                    text: `کارت ویزیت ${businessCard.ownerName} - ${businessCard.businessType}`,
                    url: shareUrl,
                });
            } catch (err) {
                console.log('Error sharing:', err);
                copyToClipboard(shareUrl);
            }
        } else {
            copyToClipboard(shareUrl);
        }
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    const handleDownloadImage = async () => {
        const cardElement = document.getElementById('business-card-preview');
        if (!cardElement) return;

        try {
            setDownloadProgress(10);
            const canvas = await html2canvas(cardElement, {
                scale: 2,
                backgroundColor: '#ffffff',
                useCORS: true,
                logging: false
            });

            setDownloadProgress(60);
            const image = canvas.toDataURL('image/png', 1.0);

            setDownloadProgress(90);
            const link = document.createElement('a');
            link.download = `کارت-ویزیت-${businessCard.ownerName}.png`;
            link.href = image;
            link.click();

            setDownloadProgress(100);
            setTimeout(() => setDownloadProgress(0), 1000);
        } catch (err) {
            console.error('Error downloading image:', err);
            alert('خطا در دانلود تصویر. لطفاً دوباره تلاش کنید.');
        }
    };

    const handleDownloadPDF = async () => {
        const cardElement = document.getElementById('business-card-preview');
        if (!cardElement) return;

        try {
            setDownloadProgress(10);
            const canvas = await html2canvas(cardElement, {
                scale: 2,
                backgroundColor: '#ffffff',
                useCORS: true
            });

            setDownloadProgress(60);
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: [85, 55] // Standard business card size
            });

            setDownloadProgress(80);
            const imgWidth = 85;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

            setDownloadProgress(95);
            pdf.save(`کارت-ویزیت-${businessCard.ownerName}.pdf`);

            setDownloadProgress(100);
            setTimeout(() => setDownloadProgress(0), 1000);
        } catch (err) {
            console.error('Error downloading PDF:', err);
            alert('خطا در دانلود PDF. لطفاً دوباره تلاش کنید.');
        }
    };

    const handlePrint = () => {
        window.print();
    };

    const handleToggleFavorite = () => {
        const favorites = JSON.parse(localStorage.getItem('businessCardFavorites') || '[]');

        if (isFavorite) {
            const newFavorites = favorites.filter(favId => favId !== businessCard._id);
            localStorage.setItem('businessCardFavorites', JSON.stringify(newFavorites));
        } else {
            favorites.push(businessCard._id);
            localStorage.setItem('businessCardFavorites', JSON.stringify(favorites));
        }

        setIsFavorite(!isFavorite);
    };

    const handleGenerateQR = async () => {
        if (!businessCard.qrCode) {
            try {
                // اگر API درست کار نمی‌کنه، mock data بده
                setBusinessCard(prev => ({
                    ...prev,
                    qrCode: 'data:image/png;base64,mock-qr-code-data-for-demo'
                }));
                setShowQR(true);
            } catch (err) {
                console.error('Error generating QR:', err);
            }
        } else {
            setShowQR(!showQR);
        }
    };

    const handleContactClick = (type, value) => {
        switch (type) {
            case 'phone':
                window.open(`tel:${value}`);
                break;
            case 'email':
                window.open(`mailto:${value}`);
                break;
            case 'website':
                window.open(value, '_blank');
                break;
            case 'address':
                window.open(`https://maps.google.com/?q=${encodeURIComponent(value)}`, '_blank');
                break;
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="relative">
                        <div className="w-24 h-24 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Eye className="w-12 h-12 text-blue-600 animate-pulse" />
                        </div>
                    </div>
                    <p className="mt-6 text-gray-600 text-lg font-medium">
                        در حال بارگذاری کارت ویزیت...
                    </p>
                </div>
            </div>
        );
    }

    if (error && !businessCard) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-red-50 flex items-center justify-center p-4">
                <div className="text-center max-w-md">
                    <div className="w-32 h-32 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
                        <AlertCircle className="w-16 h-16 text-red-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">خطا در بارگذاری</h2>
                    <p className="text-gray-600 mb-6">{error}</p>
                    <div className="space-y-3">
                        <button
                            onClick={loadMockData}
                            className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            مشاهده نمونه کارت ویزیت
                        </button>
                        <button
                            onClick={() => navigate('/business-cards')}
                            className="w-full px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            بازگشت به لیست کارت‌ها
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 print:bg-white">
            {/* Header - Hidden on print */}
            <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm print:hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <button
                            onClick={() => navigate(-1)}
                            className="flex items-center text-gray-700 hover:text-gray-900 transition-colors group"
                        >
                            <ArrowLeft className="w-5 h-5 ml-2 group-hover:-translate-x-1 transition-transform" />
                            بازگشت
                        </button>

                        <div className="text-center">
                            <h1 className="text-xl font-bold text-gray-900">
                                پیش‌نمایش کارت ویزیت
                            </h1>
                            <p className="text-gray-600 text-sm mt-1">
                                {businessCard.ownerName} • {businessCard.businessType}
                            </p>
                        </div>

                        <div className="flex items-center space-x-3">
                            <button
                                onClick={handleToggleFavorite}
                                className={`p-2 rounded-lg transition-colors ${isFavorite ? 'text-red-500 bg-red-50' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'}`}
                                title={isFavorite ? 'حذف از علاقه‌مندی‌ها' : 'افزودن به علاقه‌مندی‌ها'}
                            >
                                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                            </button>
                            <button
                                onClick={() => navigate(`/business-cards/${id}/edit`)}
                                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                <Edit className="w-4 h-4 ml-2" />
                                ویرایش
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Business Card Preview */}
                    <div className="lg:col-span-2">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200"
                            id="business-card-preview"
                        >
                            {/* Cover Image */}
                            <div className="relative h-64 bg-gradient-to-r from-blue-600 to-purple-600">
                                {businessCard.coverImage ? (
                                    <img
                                        src={businessCard.coverImage}
                                        alt="کاور"
                                        className="w-full h-full object-cover"
                                        crossOrigin="anonymous"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-r from-blue-600 to-purple-600"></div>
                                )}

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                                {/* Logo */}
                                {businessCard.logo && (
                                    <div className="absolute -bottom-12 right-8 w-32 h-32 bg-white rounded-2xl p-4 shadow-2xl">
                                        <img
                                            src={businessCard.logo}
                                            alt="لوگو"
                                            className="w-full h-full object-contain"
                                            crossOrigin="anonymous"
                                        />
                                    </div>
                                )}

                                {/* Business Type Badge */}
                                <div className="absolute top-6 left-6">
                                    <span className="px-4 py-2 bg-white/90 backdrop-blur-sm text-gray-900 rounded-full text-sm font-medium">
                                        {businessCard.businessType}
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-8 pt-16">
                                {/* Name and Title */}
                                <div className="mb-8">
                                    <h2 className="text-4xl font-bold text-gray-900 mb-2">
                                        {businessCard.ownerName}
                                    </h2>
                                    <p className="text-xl text-blue-600 font-medium">
                                        {businessCard.title}
                                    </p>
                                </div>

                                {/* Description */}
                                {businessCard.description && (
                                    <div className="mb-8 p-6 bg-gray-50 rounded-2xl">
                                        <p className="text-gray-700 leading-relaxed">
                                            {businessCard.description}
                                        </p>
                                    </div>
                                )}

                                {/* Contact Information Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                    {/* Phone */}
                                    {businessCard.phone && (
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => handleContactClick('phone', businessCard.phone)}
                                            className="flex items-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl hover:from-green-100 hover:to-emerald-100 transition-all duration-300 border border-green-100 cursor-pointer group text-right"
                                        >
                                            <div className="w-14 h-14 bg-green-500 text-white rounded-xl flex items-center justify-center ml-4 group-hover:bg-green-600 transition-colors">
                                                <Phone className="w-6 h-6" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm text-gray-500 mb-1">تلفن تماس</p>
                                                <p className="font-bold text-gray-900 text-lg">{businessCard.phone}</p>
                                            </div>
                                        </motion.button>
                                    )}

                                    {/* Email */}
                                    {businessCard.email && (
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => handleContactClick('email', businessCard.email)}
                                            className="flex items-center p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl hover:from-blue-100 hover:to-cyan-100 transition-all duration-300 border border-blue-100 cursor-pointer group text-right"
                                        >
                                            <div className="w-14 h-14 bg-blue-500 text-white rounded-xl flex items-center justify-center ml-4 group-hover:bg-blue-600 transition-colors">
                                                <Mail className="w-6 h-6" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm text-gray-500 mb-1">آدرس ایمیل</p>
                                                <p className="font-bold text-gray-900 text-lg truncate">{businessCard.email}</p>
                                            </div>
                                        </motion.button>
                                    )}

                                    {/* Address */}
                                    {businessCard.address && (
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => handleContactClick('address', businessCard.address)}
                                            className="flex items-center p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl hover:from-purple-100 hover:to-pink-100 transition-all duration-300 border border-purple-100 cursor-pointer group text-right"
                                        >
                                            <div className="w-14 h-14 bg-purple-500 text-white rounded-xl flex items-center justify-center ml-4 group-hover:bg-purple-600 transition-colors">
                                                <MapPin className="w-6 h-6" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm text-gray-500 mb-1">آدرس</p>
                                                <p className="font-bold text-gray-900 text-lg">{businessCard.address}</p>
                                            </div>
                                        </motion.button>
                                    )}

                                    {/* Website */}
                                    {businessCard.website && (
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => handleContactClick('website', businessCard.website)}
                                            className="flex items-center p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl hover:from-orange-100 hover:to-amber-100 transition-all duration-300 border border-orange-100 cursor-pointer group text-right"
                                        >
                                            <div className="w-14 h-14 bg-orange-500 text-white rounded-xl flex items-center justify-center ml-4 group-hover:bg-orange-600 transition-colors">
                                                <Globe className="w-6 h-6" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm text-gray-500 mb-1">وبسایت</p>
                                                <p className="font-bold text-gray-900 text-lg truncate">
                                                    {businessCard.website.replace('https://', '').replace('http://', '')}
                                                </p>
                                            </div>
                                        </motion.button>
                                    )}
                                </div>

                                {/* Social Media Links */}
                                {Object.values(businessCard.socialLinks).some(link => link) && (
                                    <div className="mb-8">
                                        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                                            <Send className="w-5 h-5 ml-2 text-gray-400" />
                                            شبکه‌های اجتماعی
                                        </h3>
                                        <div className="flex flex-wrap gap-3">
                                            {businessCard.socialLinks.instagram && (
                                                <a
                                                    href={`https://instagram.com/${businessCard.socialLinks.instagram}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center px-4 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                                                >
                                                    <Instagram className="w-5 h-5 ml-2" />
                                                    اینستاگرام
                                                </a>
                                            )}
                                            {businessCard.socialLinks.linkedin && (
                                                <a
                                                    href={`https://linkedin.com/in/${businessCard.socialLinks.linkedin}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                                                >
                                                    <Linkedin className="w-5 h-5 ml-2" />
                                                    لینکدین
                                                </a>
                                            )}
                                            {businessCard.socialLinks.twitter && (
                                                <a
                                                    href={`https://twitter.com/${businessCard.socialLinks.twitter}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center px-4 py-3 bg-gradient-to-r from-sky-500 to-blue-500 text-white rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                                                >
                                                    <Twitter className="w-5 h-5 ml-2" />
                                                    توییتر
                                                </a>
                                            )}
                                            {businessCard.socialLinks.telegram && (
                                                <a
                                                    href={`https://t.me/${businessCard.socialLinks.telegram}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center px-4 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                                                >
                                                    <Send className="w-5 h-5 ml-2" />
                                                    تلگرام
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* QR Code Section */}
                                <AnimatePresence>
                                    {showQR && businessCard.qrCode && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="mt-8 p-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl border border-gray-200"
                                        >
                                            <div className="flex flex-col md:flex-row items-center justify-between">
                                                <div className="md:ml-8 mb-6 md:mb-0 text-center md:text-right">
                                                    <h4 className="text-xl font-bold text-gray-900 mb-3">
                                                        اسکن کنید
                                                    </h4>
                                                    <p className="text-gray-600 mb-4">
                                                        با اسکن این کد QR، اطلاعات کارت ویزیت مستقیماً در تلفن همراه شما ذخیره می‌شود.
                                                    </p>
                                                    <button
                                                        onClick={() => copyToClipboard(businessCard.shareableLink)}
                                                        className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                                                    >
                                                        <LinkIcon className="w-4 h-4 ml-2" />
                                                        کپی لینک
                                                    </button>
                                                </div>
                                                <div className="w-48 h-48 p-4 bg-white rounded-2xl border-2 border-gray-200 shadow-lg">
                                                    <img
                                                        src={businessCard.qrCode}
                                                        alt="کد QR"
                                                        className="w-full h-full object-contain"
                                                        crossOrigin="anonymous"
                                                    />
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Footer */}
                                <div className="pt-8 mt-8 border-t border-gray-200 text-center">
                                    <p className="text-sm text-gray-500">
                                        آخرین بروزرسانی: {new Date(businessCard.updatedAt).toLocaleDateString('fa-IR')}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Action Sidebar */}
                    <div className="print:hidden">
                        <div className="sticky top-24">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200"
                            >
                                <h3 className="text-xl font-bold text-gray-900 mb-6">
                                    اقدامات
                                </h3>

                                {/* Download Progress */}
                                {downloadProgress > 0 && (
                                    <div className="mb-6">
                                        <div className="flex justify-between mb-2">
                                            <span className="text-sm text-gray-600">در حال دانلود...</span>
                                            <span className="text-sm font-bold text-blue-600">{downloadProgress}%</span>
                                        </div>
                                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                            <motion.div
                                                className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                                                initial={{ width: '0%' }}
                                                animate={{ width: `${downloadProgress}%` }}
                                                transition={{ duration: 0.3 }}
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* Action Buttons */}
                                <div className="space-y-4">
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={handleShare}
                                        className="w-full flex items-center justify-center p-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl"
                                    >
                                        {copied ? (
                                            <>
                                                <Copy className="w-5 h-5 ml-2" />
                                                لینک کپی شد!
                                            </>
                                        ) : (
                                            <>
                                                <Share2 className="w-5 h-5 ml-2" />
                                                اشتراک‌گذاری
                                            </>
                                        )}
                                    </motion.button>

                                    <div className="grid grid-cols-2 gap-3">
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={handleDownloadImage}
                                            className="flex flex-col items-center justify-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 rounded-xl border border-green-200 transition-all duration-300"
                                        >
                                            <Download className="w-5 h-5 text-green-600 mb-2" />
                                            <span className="text-sm font-medium text-gray-900">دانلود عکس</span>
                                        </motion.button>

                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={handleDownloadPDF}
                                            className="flex flex-col items-center justify-center p-4 bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 rounded-xl border border-purple-200 transition-all duration-300"
                                        >
                                            <FileText className="w-5 h-5 text-purple-600 mb-2" />
                                            <span className="text-sm font-medium text-gray-900">دانلود PDF</span>
                                        </motion.button>
                                    </div>

                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={handlePrint}
                                        className="w-full flex items-center justify-center p-4 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl hover:from-gray-700 hover:to-gray-800 transition-all duration-300"
                                    >
                                        <Printer className="w-5 h-5 ml-2" />
                                        چاپ کارت
                                    </motion.button>

                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={handleGenerateQR}
                                        className="w-full flex items-center justify-center p-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300"
                                    >
                                        <QrCode className="w-5 h-5 ml-2" />
                                        {businessCard.qrCode ? 'نمایش کد QR' : 'تولید کد QR'}
                                    </motion.button>

                                    <button
                                        onClick={handleToggleFavorite}
                                        className={`w-full flex items-center justify-center p-4 rounded-xl transition-all duration-300 ${isFavorite
                                            ? 'bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 text-red-600'
                                            : 'bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 text-gray-700 hover:bg-gray-100'
                                            }`}
                                    >
                                        <Heart className={`w-5 h-5 ml-2 ${isFavorite ? 'fill-current' : ''}`} />
                                        {isFavorite ? 'حذف از علاقه‌مندی‌ها' : 'افزودن به علاقه‌مندی‌ها'}
                                    </button>
                                </div>

                                {/* Stats */}
                                <div className="mt-8 pt-6 border-t border-gray-200">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="text-center">
                                            <div className="w-12 h-12 mx-auto mb-2 bg-blue-100 rounded-full flex items-center justify-center">
                                                <Eye className="w-6 h-6 text-blue-600" />
                                            </div>
                                            <p className="text-sm text-gray-500">بازدید</p>
                                            <p className="text-lg font-bold text-gray-900">۱۲۴</p>
                                        </div>
                                        <div className="text-center">
                                            <div className="w-12 h-12 mx-auto mb-2 bg-green-100 rounded-full flex items-center justify-center">
                                                <Download className="w-6 h-6 text-green-600" />
                                            </div>
                                            <p className="text-sm text-gray-500">دانلود</p>
                                            <p className="text-lg font-bold text-gray-900">۳۴</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Quick Contact */}
                                <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
                                    <h4 className="font-bold text-gray-900 mb-3">📞 تماس سریع</h4>
                                    {businessCard.phone && (
                                        <a
                                            href={`tel:${businessCard.phone}`}
                                            className="block w-full text-center py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mb-2"
                                        >
                                            تماس تلفنی
                                        </a>
                                    )}
                                    {businessCard.email && (
                                        <a
                                            href={`mailto:${businessCard.email}`}
                                            className="block w-full text-center py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                                        >
                                            ارسال ایمیل
                                        </a>
                                    )}
                                </div>
                            </motion.div>

                            {/* Share Link */}
                            <div className="mt-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200">
                                <h4 className="font-bold text-gray-900 mb-3">🔗 لینک اشتراک‌گذاری</h4>
                                <div className="flex items-center mb-4">
                                    <div className="flex-1 bg-white border border-gray-300 rounded-lg p-3 text-sm text-gray-600 truncate">
                                        {`${window.location.origin}/card/${businessCard.shareableLink?.split('/').pop()}`}
                                    </div>
                                    <button
                                        onClick={() => copyToClipboard(businessCard.shareableLink)}
                                        className="mr-3 p-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                                    >
                                        <Copy className="w-4 h-4" />
                                    </button>
                                </div>
                                <p className="text-xs text-gray-500">
                                    این لینک برای اشتراک‌گذاری عمومی کارت ویزیت شماست.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Print Styles */}
            <style>{`
                @media print {
                    body * {
                        visibility: hidden;
                    }
                    #business-card-preview,
                    #business-card-preview * {
                        visibility: visible;
                    }
                    #business-card-preview {
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 100%;
                        box-shadow: none;
                        border: none;
                    }
                }
            `}</style>
        </div>
    );
};

export default BusinessCardDetailPage;