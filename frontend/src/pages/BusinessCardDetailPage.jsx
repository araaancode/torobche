import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { businessCardService } from '../services/api';
import {
    PiQrCode,
    PiShareNetwork,
    PiDownloadSimple,
    PiMapPin,
    PiPhone,
    PiEnvelopeSimple,
    PiGlobe,
    PiInstagramLogo,
    PiWhatsappLogo,
    PiTelegramLogo,
    PiCalendar,
    PiClock,
    PiBuildings,
    PiUser,
    PiArrowLeft,
    PiEye,
    PiTrendUp,
    PiShieldCheck
} from 'react-icons/pi';
import QRCode from 'qrcode.react';

const BusinessCardDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [card, setCard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showQR, setShowQR] = useState(false);

    useEffect(() => {
        fetchCard();
    }, [id]);

    const fetchCard = async () => {
        try {
            setLoading(true);
            const response = await businessCardService.getBusinessCard(id);
            if (response.success) {
                setCard(response.data);
            } else {
                setError('کارت مورد نظر یافت نشد');
            }
        } catch (err) {
            setError(err.message || 'خطا در دریافت اطلاعات کارت');
        } finally {
            setLoading(false);
        }
    };

    const handleShare = async () => {
        if (navigator.share && card) {
            try {
                await navigator.share({
                    title: card.title,
                    text: card.description,
                    url: window.location.href,
                });
            } catch (err) {
                console.error('Error sharing:', err);
            }
        } else {
            // Fallback: Copy to clipboard
            navigator.clipboard.writeText(window.location.href);
            alert('لینک در کلیپ‌بورد کپی شد!');
        }
    };

    const handleDownloadQR = () => {
        const canvas = document.getElementById('qr-code-canvas');
        if (canvas) {
            const pngUrl = canvas
                .toDataURL('image/png')
                .replace('image/png', 'image/octet-stream');
            const downloadLink = document.createElement('a');
            downloadLink.href = pngUrl;
            downloadLink.download = `qr-code-${id}.png`;
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (error || !card) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">خطا!</h3>
                    <p className="text-gray-600 mb-6">{error || 'کارت یافت نشد'}</p>
                    <button
                        onClick={() => navigate('/cards')}
                        className="px-6 py-2 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700"
                    >
                        بازگشت به کارت‌ها
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8 px-4">
            <div className="container mx-auto max-w-4xl">
                {/* Header */}
                <div className="mb-8">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-4"
                    >
                        <PiArrowLeft />
                        <span>بازگشت</span>
                    </button>

                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <h1 className="text-3xl font-black text-gray-900">{card.title}</h1>
                            <p className="text-gray-600 mt-1">{card.companyName}</p>
                        </div>

                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setShowQR(!showQR)}
                                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50"
                            >
                                <PiQrCode />
                                <span>QR کد</span>
                            </button>
                            <button
                                onClick={handleShare}
                                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50"
                            >
                                <PiShareNetwork />
                                <span>اشتراک‌گذاری</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Card Info */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Stats */}
                        <div className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-lg">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="text-center">
                                    <div className="flex items-center justify-center gap-2 mb-1">
                                        <PiEye className="text-blue-600" />
                                        <span className="text-2xl font-bold text-gray-900">{card.views || 0}</span>
                                    </div>
                                    <p className="text-sm text-gray-600">بازدید</p>
                                </div>

                                <div className="text-center">
                                    <div className="flex items-center justify-center gap-2 mb-1">
                                        <PiQrCode className="text-green-600" />
                                        <span className="text-2xl font-bold text-gray-900">{card.qrScans || 0}</span>
                                    </div>
                                    <p className="text-sm text-gray-600">اسکن QR</p>
                                </div>

                                {card.isVerified && (
                                    <div className="text-center">
                                        <div className="flex items-center justify-center gap-2 mb-1">
                                            <PiShieldCheck className="text-yellow-600" />
                                            <span className="text-sm font-bold text-green-600">تایید شده</span>
                                        </div>
                                        <p className="text-sm text-gray-600">وضعیت</p>
                                    </div>
                                )}

                                <div className="text-center">
                                    <div className="flex items-center justify-center gap-2 mb-1">
                                        <PiTrendUp className="text-purple-600" />
                                        <span className="text-sm font-bold text-gray-900">{card.businessType}</span>
                                    </div>
                                    <p className="text-sm text-gray-600">نوع کسب‌وکار</p>
                                </div>
                            </div>
                        </div>

                        {/* Contact Info */}
                        <div className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-lg">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">اطلاعات تماس</h3>

                            <div className="space-y-4">
                                {card.ownerName && (
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                                            <PiUser className="text-blue-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">نام مالک</p>
                                            <p className="font-medium">{card.ownerName}</p>
                                        </div>
                                    </div>
                                )}

                                {card.address?.full && (
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                                            <PiMapPin className="text-green-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">آدرس</p>
                                            <p className="font-medium">{card.address.full}</p>
                                            {card.address.city && (
                                                <p className="text-sm text-gray-500">
                                                    {card.address.city}
                                                    {card.address.province && `، ${card.address.province}`}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {card.phoneNumbers?.map((phone, index) => (
                                    <div key={index} className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                                            <PiPhone className="text-red-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">شماره تلفن {index + 1}</p>
                                            <a
                                                href={`tel:${phone}`}
                                                className="font-medium hover:text-blue-600"
                                            >
                                                {phone}
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Description */}
                        {card.description && (
                            <div className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-lg">
                                <h3 className="text-xl font-bold text-gray-900 mb-4">توضیحات</h3>
                                <p className="text-gray-700 leading-relaxed">{card.description}</p>
                            </div>
                        )}

                        {/* Services */}
                        {card.services && card.services.length > 0 && (
                            <div className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-lg">
                                <h3 className="text-xl font-bold text-gray-900 mb-4">خدمات</h3>
                                <div className="flex flex-wrap gap-2">
                                    {card.services.map((service, index) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                                        >
                                            {service}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column - QR Code & Social */}
                    <div className="space-y-6">
                        {/* QR Code Card */}
                        <div className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-lg">
                            <div className="text-center">
                                <h3 className="text-xl font-bold text-gray-900 mb-4">اسکن QR Code</h3>

                                <div className="flex justify-center mb-4">
                                    {card.qrCode?.data ? (
                                        <img
                                            src={card.qrCode.data}
                                            alt="QR Code"
                                            className="w-48 h-48"
                                        />
                                    ) : (
                                        <QRCode
                                            id="qr-code-canvas"
                                            value={window.location.href}
                                            size={192}
                                            level="H"
                                            includeMargin={true}
                                            fgColor="#1f2937"
                                            bgColor="#ffffff"
                                        />
                                    )}
                                </div>

                                <p className="text-sm text-gray-600 mb-4">
                                    با اسکن این QR Code مستقیماً به این صفحه هدایت می‌شوید
                                </p>

                                <button
                                    onClick={handleDownloadQR}
                                    className="flex items-center justify-center gap-2 w-full py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg"
                                >
                                    <PiDownloadSimple />
                                    <span>دانلود QR Code</span>
                                </button>
                            </div>
                        </div>

                        {/* Working Hours */}
                        {card.workingHours && (
                            <div className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-lg">
                                <h3 className="text-xl font-bold text-gray-900 mb-4">ساعات کاری</h3>
                                <div className="space-y-3">
                                    {Object.entries(card.workingHours).map(([day, hours]) => (
                                        <div key={day} className="flex justify-between items-center">
                                            <span className="text-gray-700">{day}</span>
                                            <span className="font-medium">{hours}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Social Media */}
                        {card.socialMedia && Object.keys(card.socialMedia).length > 0 && (
                            <div className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-lg">
                                <h3 className="text-xl font-bold text-gray-900 mb-4">شبکه‌های اجتماعی</h3>
                                <div className="space-y-3">
                                    {card.socialMedia.website && (
                                        <a
                                            href={card.socialMedia.website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                                        >
                                            <PiGlobe className="text-gray-600" />
                                            <span>وبسایت</span>
                                        </a>
                                    )}

                                    {card.socialMedia.instagram && (
                                        <a
                                            href={card.socialMedia.instagram}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                                        >
                                            <PiInstagramLogo className="text-pink-600" />
                                            <span>اینستاگرام</span>
                                        </a>
                                    )}

                                    {card.socialMedia.whatsapp && (
                                        <a
                                            href={`https://wa.me/${card.socialMedia.whatsapp}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                                        >
                                            <PiWhatsappLogo className="text-green-600" />
                                            <span>واتساپ</span>
                                        </a>
                                    )}

                                    {card.socialMedia.telegram && (
                                        <a
                                            href={`https://t.me/${card.socialMedia.telegram}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                                        >
                                            <PiTelegramLogo className="text-blue-500" />
                                            <span>تلگرام</span>
                                        </a>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BusinessCardDetailPage;