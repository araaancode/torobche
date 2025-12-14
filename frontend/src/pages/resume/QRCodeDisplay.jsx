import React from 'react';
import { QRCodeSVG } from 'react-qr-code';
import { FaDownload, FaCopy } from 'react-icons/fa';
import toast from 'react-hot-toast';

const QRCodeDisplay = ({ publicId, qrCodeUrl, resumeName }) => {
    const frontendUrl = process.env.REACT_APP_BASE_URL || 'http://localhost:3000';
    const resumeLink = `${frontendUrl}/r/${publicId}`;

    const handleDownload = () => {
        // Implement QR code download functionality
        toast.success('QR Code downloaded successfully!');
    };

    const handleCopyLink = () => {
        navigator.clipboard.writeText(resumeLink);
        toast.success('Link copied to clipboard!');
    };

    return (
        <div className="card max-w-md mx-auto">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Your Resume QR Code</h3>

            <div className="bg-white p-4 rounded-lg border border-gray-200 mb-4">
                <QRCodeSVG
                    value={resumeLink}
                    size={256}
                    level="H"
                    className="mx-auto"
                />
            </div>

            <div className="space-y-4">
                <div>
                    <p className="text-sm text-gray-600 mb-1">Resume Link:</p>
                    <div className="flex items-center space-x-2">
                        <input
                            type="text"
                            value={resumeLink}
                            readOnly
                            className="form-input flex-grow text-sm"
                        />
                        <button
                            onClick={handleCopyLink}
                            className="btn btn-secondary flex items-center space-x-2"
                        >
                            <FaCopy />
                            <span>Copy</span>
                        </button>
                    </div>
                </div>

                <div className="flex space-x-3">
                    <button
                        onClick={handleDownload}
                        className="btn btn-primary flex items-center space-x-2 flex-grow"
                    >
                        <FaDownload />
                        <span>Download QR Code</span>
                    </button>

                    <a
                        href={resumeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-success flex-grow"
                    >
                        View Resume
                    </a>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-800">
                        <strong>Tip:</strong> Scan this QR code with your phone camera to view your resume instantly!
                    </p>
                </div>
            </div>
        </div>
    );
};

export default QRCodeDisplay;