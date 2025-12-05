import React, { useState, useRef } from 'react';
import {
  PiQrCode,
  PiDownload,
  PiCopy,
  PiShare,
  PiEye,
  PiTrash,
  PiPlus,
  PiPalette,
  PiTextbox,
  PiLink,
  PiUser,
  PiPhoneCall,
  PiSparkle,
  PiCheckCircle,
  PiExport
} from 'react-icons/pi';

const QRCodeManager = () => {
  const [activeTab, setActiveTab] = useState('generator');
  const [qrData, setQrData] = useState({
    type: 'url',
    content: '',
    title: 'QR کد جدید',
    color: '#3B82F6',
    bgColor: '#FFFFFF',
    size: 200
  });
  const [generatedQRs, setGeneratedQRs] = useState([
    {
      id: 1,
      title: 'کارت ویزیت علی محمدی',
      type: 'vcard',
      content: 'https://cardmaker.ir/ali-mohammadi',
      color: '#3B82F6',
      createdAt: '۱۴۰۲/۱۰/۱۵',
      scans: 124
    },
    {
      id: 2,
      title: 'منوی رستوران برگرلند',
      type: 'url',
      content: 'https://burgeland.ir/menu',
      color: '#EF4444',
      createdAt: '۱۴۰۲/۱۰/۱۲',
      scans: 567
    },
    {
      id: 3,
      title: 'صفحه اینستاگرام',
      type: 'social',
      content: 'https://instagram.com/burgeland',
      color: '#8B5CF6',
      createdAt: '۱۴۰۲/۱۰/۱۰',
      scans: 234
    }
  ]);

  const qrCodeRef = useRef(null);

  const qrTypes = [
    { id: 'url', name: 'لینک وبسایت', icon: <PiLink className="text-lg" />, color: 'from-blue-500 to-cyan-500' },
    { id: 'vcard', name: 'کارت ویزیت', icon: <PiUser className="text-lg" />, color: 'from-green-500 to-emerald-500' },
    { id: 'text', name: 'متن ساده', icon: <PiTextbox className="text-lg" />, color: 'from-purple-500 to-pink-500' },
    { id: 'social', name: 'شبکه اجتماعی', icon: <PiShare className="text-lg" />, color: 'from-orange-500 to-amber-500' },
    { id: 'wifi', name: 'شبکه WiFi', icon: <PiPhoneCall className="text-lg" />, color: 'from-red-500 to-rose-500' }
  ];

  const colorPresets = [
    { name: 'آبی اصلی', color: '#3B82F6', bgColor: '#FFFFFF' },
    { name: 'سبز طبیعی', color: '#10B981', bgColor: '#FFFFFF' },
    { name: 'بنفش خلاق', color: '#8B5CF6', bgColor: '#FFFFFF' },
    { name: 'قرمز انرژی', color: '#EF4444', bgColor: '#FFFFFF' },
    { name: 'نارنجی گرم', color: '#F59E0B', bgColor: '#FFFFFF' },
    { name: 'دارک مدرن', color: '#FFFFFF', bgColor: '#1F2937' }
  ];

  const updateQRData = (field, value) => {
    setQrData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const generateQRCode = () => {
    if (!qrData.content.trim()) {
      alert('لطفا محتوای QR کد را وارد کنید');
      return;
    }

    const newQR = {
      id: Date.now(),
      title: qrData.title || 'QR کد جدید',
      type: qrData.type,
      content: qrData.content,
      color: qrData.color,
      bgColor: qrData.bgColor,
      createdAt: new Date().toLocaleDate('fa-IR'),
      scans: 0
    };

    setGeneratedQRs(prev => [newQR, ...prev]);

    // ریست فرم
    setQrData({
      type: 'url',
      content: '',
      title: 'QR کد جدید',
      color: '#3B82F6',
      bgColor: '#FFFFFF',
      size: 200
    });

    alert('QR کد با موفقیت ایجاد شد!');
  };

  const downloadQRCode = (qr) => {
    // در واقعیت اینجا QR کد واقعی تولید می‌شود
    alert(`دانلود QR کد: ${qr.title}`);
  };

  const copyQRCode = (qr) => {
    navigator.clipboard.writeText(qr.content);
    alert('لینک QR کد در کلیپ‌بورد کپی شد');
  };

  const deleteQRCode = (id) => {
    if (window.confirm('آیا از حذف این QR کد مطمئن هستید؟')) {
      setGeneratedQRs(prev => prev.filter(qr => qr.id !== id));
    }
  };

  const QRCodePreview = ({ qr }) => (
    <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-200">
      <div className="flex items-center justify-between mb-3">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${qr.type === 'url' ? 'bg-blue-100 text-blue-700' :
          qr.type === 'vcard' ? 'bg-green-100 text-green-700' :
            qr.type === 'social' ? 'bg-purple-100 text-purple-700' :
              'bg-orange-100 text-orange-700'
          }`}>
          {qrTypes.find(t => t.id === qr.type)?.name}
        </span>
        <span className="text-xs text-gray-500">{qr.scans} اسکن</span>
      </div>

      <div className="w-32 h-32 mx-auto mb-3 bg-gray-100 rounded-2xl flex items-center justify-center border-2 border-gray-200">
        <PiQrCode className="text-gray-400 text-4xl" style={{ color: qr.color }} />
      </div>

      <h4 className="font-bold text-gray-800 text-center mb-1 truncate">{qr.title}</h4>
      <p className="text-gray-600 text-xs text-center truncate" dir="ltr">{qr.content}</p>
      <p className="text-gray-500 text-xs text-center mt-1">{qr.createdAt}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-300 rounded-full blur-3xl opacity-20 floating"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-300 rounded-full blur-3xl opacity-20 floating" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-300 rounded-full blur-3xl opacity-20 animate-pulse"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="pt-32 pb-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 rtl:space-x-reverse bg-white/80 backdrop-blur-sm rounded-2xl px-4 py-2 mb-6 shadow-xl border border-white/20">
              <PiSparkle className="text-yellow-500 text-lg" />
              <span className="text-sm font-bold text-gray-700">مدیریت هوشمند QR کد</span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent mb-6">
              تولید کننده QR کد
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              ایجاد و مدیریت <span className="font-bold text-purple-600">QR کدهای حرفه‌ای</span> برای
              <span className="font-bold text-blue-600"> لینک‌ها، کارت ویزیت و محتوای دیجیتال</span>
            </p>
          </div>

          {/* Tabs */}
          <div className="glass-card rounded-3xl p-2 shadow-2xl border border-white/20 mb-8 backdrop-blur-xl">
            <div className="flex space-x-2 rtl:space-x-reverse">
              <button
                onClick={() => setActiveTab('generator')}
                className={`flex-1 py-4 rounded-2xl font-bold transition-all duration-300 flex items-center justify-center space-x-2 rtl:space-x-reverse ${activeTab === 'generator'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-white/50'
                  }`}
              >
                <PiQrCode className="text-xl" />
                <span>تولید QR کد</span>
              </button>
              <button
                onClick={() => setActiveTab('management')}
                className={`flex-1 py-4 rounded-2xl font-bold transition-all duration-300 flex items-center justify-center space-x-2 rtl:space-x-reverse ${activeTab === 'management'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-white/50'
                  }`}
              >
                <PiEye className="text-xl" />
                <span>مدیریت QR کدها</span>
                <span className="bg-white/20 px-2 py-1 rounded-full text-xs">
                  {generatedQRs.length}
                </span>
              </button>
            </div>
          </div>

          {/* Generator Tab */}
          {activeTab === 'generator' && (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              {/* Generator Form */}
              <div className="glass-card rounded-3xl p-6 shadow-2xl border border-white/20 backdrop-blur-xl">
                <h2 className="text-2xl font-black text-gray-800 mb-6 flex items-center space-x-2 rtl:space-x-reverse">
                  <PiPlus className="text-blue-500" />
                  <span>تولید QR کد جدید</span>
                </h2>

                {/* QR Type Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">نوع محتوا</label>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {qrTypes.map(type => (
                      <button
                        key={type.id}
                        onClick={() => updateQRData('type', type.id)}
                        className={`p-3 rounded-2xl transition-all duration-300 flex flex-col items-center space-y-2 ${qrData.type === type.id
                          ? `bg-gradient-to-r ${type.color} text-white shadow-lg transform scale-105`
                          : 'glass-effect text-gray-600 hover:text-gray-800'
                          }`}
                      >
                        {type.icon}
                        <span className="text-xs font-medium">{type.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Content Input */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">عنوان QR کد</label>
                    <input
                      type="text"
                      value={qrData.title}
                      onChange={(e) => updateQRData('title', e.target.value)}
                      className="w-full glass-effect rounded-2xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="مثلاً: کارت ویزیت من"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">محتوای QR کد</label>
                    {qrData.type === 'url' && (
                      <input
                        type="url"
                        value={qrData.content}
                        onChange={(e) => updateQRData('content', e.target.value)}
                        className="w-full glass-effect rounded-2xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="https://example.com"
                      />
                    )}
                    {qrData.type === 'text' && (
                      <textarea
                        value={qrData.content}
                        onChange={(e) => updateQRData('content', e.target.value)}
                        rows="3"
                        className="w-full glass-effect rounded-2xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        placeholder="متن خود را اینجا وارد کنید..."
                      />
                    )}
                    {qrData.type === 'vcard' && (
                      <input
                        type="url"
                        value={qrData.content}
                        onChange={(e) => updateQRData('content', e.target.value)}
                        className="w-full glass-effect rounded-2xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="https://cardmaker.ir/your-profile"
                      />
                    )}
                    {qrData.type === 'social' && (
                      <input
                        type="url"
                        value={qrData.content}
                        onChange={(e) => updateQRData('content', e.target.value)}
                        className="w-full glass-effect rounded-2xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="https://instagram.com/username"
                      />
                    )}
                    {qrData.type === 'wifi' && (
                      <input
                        type="text"
                        value={qrData.content}
                        onChange={(e) => updateQRData('content', e.target.value)}
                        className="w-full glass-effect rounded-2xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="SSID,Password,Encryption"
                      />
                    )}
                  </div>
                </div>

                {/* Color Customization */}
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center space-x-2 rtl:space-x-reverse">
                    <PiPalette className="text-purple-500" />
                    <span>رنگ‌بندی QR کد</span>
                  </label>

                  <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-4">
                    {colorPresets.map((preset, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          updateQRData('color', preset.color);
                          updateQRData('bgColor', preset.bgColor);
                        }}
                        className="aspect-square rounded-2xl transition-all duration-300 hover:scale-110 border-2 border-gray-200"
                        style={{
                          background: `linear-gradient(135deg, ${preset.color} 0%, ${preset.bgColor} 100%)`
                        }}
                        title={preset.name}
                      />
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-gray-600 mb-2">رنگ QR</label>
                      <input
                        type="color"
                        value={qrData.color}
                        onChange={(e) => updateQRData('color', e.target.value)}
                        className="w-full h-10 rounded-2xl cursor-pointer"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-2">رنگ پس‌زمینه</label>
                      <input
                        type="color"
                        value={qrData.bgColor}
                        onChange={(e) => updateQRData('bgColor', e.target.value)}
                        className="w-full h-10 rounded-2xl cursor-pointer"
                      />
                    </div>
                  </div>
                </div>

                {/* Generate Button */}
                <button
                  onClick={generateQRCode}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-4 rounded-2xl font-bold transition-all duration-300 hover-lift shadow-2xl mt-6 flex items-center justify-center space-x-2 rtl:space-x-reverse"
                >
                  <PiQrCode className="text-xl" />
                  <span>تولید QR کد</span>
                </button>
              </div>

              {/* Preview Panel */}
              <div className="glass-card rounded-3xl p-6 shadow-2xl border border-white/20 backdrop-blur-xl">
                <h3 className="text-xl font-black text-gray-800 mb-6">پیش‌نمایش QR کد</h3>

                <div className="text-center">
                  <div
                    className="w-64 h-64 mx-auto rounded-2xl flex items-center justify-center border-4 border-gray-200 shadow-lg mb-4"
                    style={{ backgroundColor: qrData.bgColor }}
                  >
                    {qrData.content ? (
                      <div className="text-center">
                        <PiQrCode className="text-6xl mx-auto mb-2" style={{ color: qrData.color }} />
                        <p className="text-sm text-gray-600">پیش‌نمایش QR کد</p>
                      </div>
                    ) : (
                      <div className="text-gray-400">
                        <PiQrCode className="text-8xl mx-auto mb-3 opacity-50" />
                        <p className="text-gray-500">محتوایی برای نمایش وجود ندارد</p>
                      </div>
                    )}
                  </div>

                  <h4 className="font-bold text-gray-800 text-lg mb-2">{qrData.title}</h4>
                  <p className="text-gray-600 text-sm mb-4 truncate max-w-xs mx-auto" dir="ltr">
                    {qrData.content || 'محتوای QR کد اینجا نمایش داده می‌شود'}
                  </p>

                  <div className="flex space-x-3 rtl:space-x-reverse justify-center">
                    <button className="glass-effect text-gray-700 hover:text-blue-600 px-4 py-2 rounded-2xl font-bold transition-all duration-300 hover-lift flex items-center space-x-2 rtl:space-x-reverse">
                      <PiDownload className="text-lg" />
                      <span>دانلود</span>
                    </button>
                    <button className="glass-effect text-gray-700 hover:text-green-600 px-4 py-2 rounded-2xl font-bold transition-all duration-300 hover-lift flex items-center space-x-2 rtl:space-x-reverse">
                      <PiShare className="text-lg" />
                      <span>اشتراک‌گذاری</span>
                    </button>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200/50">
                  <div className="text-center">
                    <div className="text-2xl font-black text-blue-600">{generatedQRs.length}</div>
                    <div className="text-gray-600 text-xs">تعداد QR کدها</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-black text-green-600">
                      {generatedQRs.reduce((sum, qr) => sum + qr.scans, 0)}
                    </div>
                    <div className="text-gray-600 text-xs">اسکن کل</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-black text-purple-600">
                      {Math.round(generatedQRs.reduce((sum, qr) => sum + qr.scans, 0) / generatedQRs.length) || 0}
                    </div>
                    <div className="text-gray-600 text-xs">میانگین اسکن</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Management Tab */}
          {activeTab === 'management' && (
            <div>
              {/* Stats Header */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="glass-card rounded-3xl p-6 text-center hover-lift transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <PiQrCode className="text-white text-xl" />
                  </div>
                  <div className="text-2xl font-black text-gray-800">{generatedQRs.length}</div>
                  <div className="text-gray-600 text-sm">QR کد فعال</div>
                </div>
                <div className="glass-card rounded-3xl p-6 text-center hover-lift transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <PiEye className="text-white text-xl" />
                  </div>
                  <div className="text-2xl font-black text-gray-800">
                    {generatedQRs.reduce((sum, qr) => sum + qr.scans, 0)}
                  </div>
                  <div className="text-gray-600 text-sm">تعداد اسکن</div>
                </div>
                <div className="glass-card rounded-3xl p-6 text-center hover-lift transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <PiExport className="text-white text-xl" />
                  </div>
                  <div className="text-2xl font-black text-gray-800">
                    {generatedQRs.filter(qr => qr.scans > 100).length}
                  </div>
                  <div className="text-gray-600 text-sm">پرطرفدار</div>
                </div>
                <div className="glass-card rounded-3xl p-6 text-center hover-lift transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <PiCheckCircle className="text-white text-xl" />
                  </div>
                  <div className="text-2xl font-black text-gray-800">
                    {generatedQRs.filter(qr => qr.type === 'vcard').length}
                  </div>
                  <div className="text-gray-600 text-sm">کارت ویزیت</div>
                </div>
              </div>

              {/* QR Codes Grid */}
              {generatedQRs.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {generatedQRs.map(qr => (
                    <div key={qr.id} className="group relative">
                      <QRCodePreview qr={qr} />
                      <div className="absolute inset-0 bg-black/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center space-x-2 rtl:space-x-reverse">
                        <button
                          onClick={() => downloadQRCode(qr)}
                          className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center hover:scale-110 transition-all duration-300"
                          title="دانلود"
                        >
                          <PiDownload className="text-green-600 text-lg" />
                        </button>
                        <button
                          onClick={() => copyQRCode(qr)}
                          className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center hover:scale-110 transition-all duration-300"
                          title="کپی لینک"
                        >
                          <PiCopy className="text-blue-600 text-lg" />
                        </button>
                        <button
                          onClick={() => deleteQRCode(qr.id)}
                          className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center hover:scale-110 transition-all duration-300"
                          title="حذف"
                        >
                          <PiTrash className="text-red-600 text-lg" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="w-24 h-24 bg-gradient-to-r from-gray-400 to-gray-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
                    <PiQrCode className="text-white text-3xl" />
                  </div>
                  <h3 className="text-2xl font-black text-gray-800 mb-4">هنوز QR کدی ایجاد نکرده‌اید</h3>
                  <p className="text-gray-600 mb-6">اولین QR کد خود را ایجاد کنید تا اینجا نمایش داده شود</p>
                  <button
                    onClick={() => setActiveTab('generator')}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-2xl font-bold transition-all duration-300 hover-lift shadow-2xl"
                  >
                    ایجاد QR کد جدید
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QRCodeManager;