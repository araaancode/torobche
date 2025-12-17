// client/src/components/LoadingSpinner.jsx
import React from 'react';

const LoadingSpinner = ({ size = 'md', text = 'Loading...', className = '' }) => {
    const sizeClasses = {
        sm: 'w-4 h-4',
        md: 'w-8 h-8',
        lg: 'w-12 h-12',
        xl: 'w-16 h-16'
    };

    return (
        <div className={`flex flex-col items-center justify-center ${className}`}>
            <div className="relative">
                <div className={`${sizeClasses[size]} border-4 border-gray-200 rounded-full`}></div>
                <div
                    className={`${sizeClasses[size]} border-4 border-primary-500 border-t-transparent rounded-full animate-spin absolute top-0 left-0`}
                ></div>
            </div>
            {text && (
                <p className="mt-4 text-gray-600 font-medium">{text}</p>
            )}
        </div>
    );
};

export default LoadingSpinner;