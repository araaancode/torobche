import React from 'react';
import { PiX, PiDeviceMobile, PiDesktop, PiLaptop } from 'react-icons/pi';

const LiveDemoModal = ({ template, isOpen, onClose }) => {
  if (!isOpen) return null;

  const demoUrls = {
    1: 'https://restaurant-menu-demo.netlify.app',
    2: 'https://cafe-menu-demo.netlify.app', 
    3: 'https://fastfood-menu-demo.netlify.app',
    4: 'https://bakery-menu-demo.netlify.app',
    5: 'https://delivery-menu-demo.netlify.app',
    6: 'https://family-restaurant-demo.netlify.app'
  };

  const [deviceMode, setDeviceMode] = React.useState('desktop');

  const getDeviceSize = () => {
    switch (deviceMode) {
      case 'mobile':
        return 'w-80 h-[600px]';
      case 'tablet':
        return 'w-[768px] h-[1024px]';
      case 'desktop':
        return 'w-full h-[70vh]';
      default:
        return 'w-full h-[70vh]';
    }
  };

  const getDeviceIcon = (mode) => {
    return mode === 'mobile' ? <PiDeviceMobile /> : <PiDesktop />;
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-xl flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl max-w-7xl w-full max-h-[95vh] overflow-hidden border border-gray-700 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700 bg-gray-800/50 backdrop-blur-sm">
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
              <PiLaptop className="text-white text-lg" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white">دموی زنده: {template.name}</h2>
              <p className="text-gray-300">در حال مشاهده نسخه دموی قالب</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            {/* Device Mode Selector */}
            <div className="flex items-center space-x-2 rtl:space-x-reverse bg-gray-700 rounded-2xl p-1">
              {['mobile', 'tablet', 'desktop'].map((mode) => (
                <button
                  key={mode}
                  onClick={() => setDeviceMode(mode)}
                  className={`p-2 rounded-2xl transition-all duration-300 ${
                    deviceMode === mode 
                      ? 'bg-blue-500 text-white shadow-lg' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                  title={
                    mode === 'mobile' ? 'موبایل' :
                    mode === 'tablet' ? 'تبلت' : 'دسکتاپ'
                  }
                >
                  {getDeviceIcon(mode)}
                </button>
              ))}
            </div>

            <button
              onClick={onClose}
              className="w-12 h-12 bg-gray-700 hover:bg-gray-600 rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-110"
            >
              <PiX className="text-white text-xl" />
            </button>
          </div>
        </div>

        {/* Demo Content */}
        <div className="flex-1 p-8 flex items-center justify-center bg-gray-900">
          <div className={`bg-white rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 ${getDeviceSize()}`}>
            <div className="flex items-center justify-between p-4 bg-gray-100 border-b">
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="flex-1 mx-4">
                <div className="bg-white border border-gray-300 rounded-lg px-3 py-1 text-sm text-gray-600 text-center">
                  {demoUrls[template.id]}
                </div>
              </div>
              <div className="w-12"></div>
            </div>
            
            <iframe
              src={demoUrls[template.id]}
              className="w-full h-full border-0"
              title={`Live Demo - ${template.name}`}
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              loading="lazy"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-700 bg-gray-800/50 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div className="text-gray-300">
              <p className="text-sm">💡 نکته: این یک نسخه دمو است. برای سفارشی‌سازی کامل، قالب را انتخاب کنید.</p>
            </div>
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <button
                onClick={onClose}
                className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-2xl font-bold transition-all duration-300"
              >
                بستن دمو
              </button>
              <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-2xl font-bold transition-all duration-300 shadow-2xl">
                انتخاب این قالب
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveDemoModal;