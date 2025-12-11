import React from 'react';
import { QRCodeSVG } from 'react-qr-code';
import { PiQrCode } from 'react-icons/pi';

const QRCodeDisplay = ({ sessionId, size = 128 }) => {
    const qrValue = `${window.location.origin}/resume/${sessionId}`;

    return (
        <div className="flex flex-col items-center">
            <div className="p-4 bg-white rounded-lg shadow-inner mb-2">
                <QRCodeSVG
                    value={qrValue}
                    size={size}
                    level="H"
                    fgColor="#1e40af"
                    bgColor="#ffffff"
                />
            </div>
            <div className="flex items-center text-gray-600">
                <PiQrCode className="mr-2" />
                <span className="text-sm">Scan to view resume</span>
            </div>
        </div>
    );
};

export default QRCodeDisplay;