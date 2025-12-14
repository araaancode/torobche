import React from 'react';
import { FaSpinner, FaSync, FaCircleNotch, FaCog } from 'react-icons/fa';

// Different types of spinners
const SPINNER_TYPES = {
    DEFAULT: 'default',
    DOTS: 'dots',
    RING: 'ring',
    GEAR: 'gear',
    BAR: 'bar',
    PULSE: 'pulse',
    GRID: 'grid',
    CLIP: 'clip',
    SCALE: 'scale',
    BOUNCE: 'bounce',
};

// Different sizes
const SPINNER_SIZES = {
    SMALL: 'small',
    MEDIUM: 'medium',
    LARGE: 'large',
    XLARGE: 'xlarge',
};

// Different colors
const SPINNER_COLORS = {
    PRIMARY: 'primary',
    SECONDARY: 'secondary',
    WHITE: 'white',
    GRAY: 'gray',
    BLUE: 'blue',
    GREEN: 'green',
    RED: 'red',
    PURPLE: 'purple',
    YELLOW: 'yellow',
    PINK: 'pink',
    INDIGO: 'indigo',
};

const LoadingSpinner = ({
    type = SPINNER_TYPES.DEFAULT,
    size = SPINNER_SIZES.MEDIUM,
    color = SPINNER_COLORS.PRIMARY,
    text = '',
    fullScreen = false,
    overlay = false,
    className = '',
}) => {
    // Size mappings
    const sizeMap = {
        [SPINNER_SIZES.SMALL]: {
            iconSize: 'h-4 w-4',
            textSize: 'text-sm',
            containerSize: 'p-2',
        },
        [SPINNER_SIZES.MEDIUM]: {
            iconSize: 'h-8 w-8',
            textSize: 'text-base',
            containerSize: 'p-4',
        },
        [SPINNER_SIZES.LARGE]: {
            iconSize: 'h-12 w-12',
            textSize: 'text-lg',
            containerSize: 'p-6',
        },
        [SPINNER_SIZES.XLARGE]: {
            iconSize: 'h-16 w-16',
            textSize: 'text-xl',
            containerSize: 'p-8',
        },
    };

    // Color mappings
    const colorMap = {
        [SPINNER_COLORS.PRIMARY]: 'text-blue-600',
        [SPINNER_COLORS.SECONDARY]: 'text-gray-600',
        [SPINNER_COLORS.WHITE]: 'text-white',
        [SPINNER_COLORS.GRAY]: 'text-gray-400',
        [SPINNER_COLORS.BLUE]: 'text-blue-500',
        [SPINNER_COLORS.GREEN]: 'text-green-500',
        [SPINNER_COLORS.RED]: 'text-red-500',
        [SPINNER_COLORS.PURPLE]: 'text-purple-500',
        [SPINNER_COLORS.YELLOW]: 'text-yellow-500',
        [SPINNER_COLORS.PINK]: 'text-pink-500',
        [SPINNER_COLORS.INDIGO]: 'text-indigo-500',
    };

    const { iconSize, textSize, containerSize } = sizeMap[size];
    const colorClass = colorMap[color];

    // Render different spinner types
    const renderSpinner = () => {
        switch (type) {
            case SPINNER_TYPES.DOTS:
                return (
                    <div className="flex space-x-1">
                        <div className={`${iconSize} rounded-full ${colorClass} animate-bounce`} style={{ animationDelay: '0ms' }}></div>
                        <div className={`${iconSize} rounded-full ${colorClass} animate-bounce`} style={{ animationDelay: '150ms' }}></div>
                        <div className={`${iconSize} rounded-full ${colorClass} animate-bounce`} style={{ animationDelay: '300ms' }}></div>
                    </div>
                );

            case SPINNER_TYPES.RING:
                return (
                    <div className={`${iconSize} border-4 border-t-transparent rounded-full ${colorClass.replace('text-', 'border-')} animate-spin`}></div>
                );

            case SPINNER_TYPES.GEAR:
                return (
                    <FaCog className={`${iconSize} ${colorClass} animate-spin`} />
                );

            case SPINNER_TYPES.BAR:
                return (
                    <div className={`w-32 h-2 bg-gray-200 rounded-full overflow-hidden`}>
                        <div className={`h-full ${colorClass.replace('text-', 'bg-')} animate-progress`}></div>
                    </div>
                );

            case SPINNER_TYPES.PULSE:
                return (
                    <div className={`${iconSize} rounded-full ${colorClass.replace('text-', 'bg-')} animate-pulse`}></div>
                );

            case SPINNER_TYPES.GRID:
                return (
                    <div className="grid grid-cols-3 gap-1">
                        {[...Array(9)].map((_, i) => (
                            <div
                                key={i}
                                className={`h-3 w-3 ${colorClass.replace('text-', 'bg-')} animate-grid-pulse`}
                                style={{ animationDelay: `${i * 100}ms` }}
                            ></div>
                        ))}
                    </div>
                );

            case SPINNER_TYPES.CLIP:
                return (
                    <div className={`${iconSize} border-4 border-t-transparent border-b-transparent rounded-full ${colorClass.replace('text-', 'border-')} animate-spin`}></div>
                );

            case SPINNER_TYPES.SCALE:
                return (
                    <div className={`${iconSize} ${colorClass.replace('text-', 'bg-')} rounded-full animate-scale`}></div>
                );

            case SPINNER_TYPES.BOUNCE:
                return (
                    <div className="flex space-x-2">
                        <div className={`${iconSize.replace('h-', 'h-3').replace('w-', 'w-3')} rounded-full ${colorClass.replace('text-', 'bg-')} animate-bounce`} style={{ animationDelay: '0ms' }}></div>
                        <div className={`${iconSize.replace('h-', 'h-3').replace('w-', 'w-3')} rounded-full ${colorClass.replace('text-', 'bg-')} animate-bounce`} style={{ animationDelay: '100ms' }}></div>
                        <div className={`${iconSize.replace('h-', 'h-3').replace('w-', 'w-3')} rounded-full ${colorClass.replace('text-', 'bg-')} animate-bounce`} style={{ animationDelay: '200ms' }}></div>
                    </div>
                );

            case SPINNER_TYPES.DEFAULT:
            default:
                return (
                    <FaSpinner className={`${iconSize} ${colorClass} animate-spin`} />
                );
        }
    };

    // If fullScreen, render full screen loader
    if (fullScreen) {
        return (
            <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/90 backdrop-blur-sm">
                {renderSpinner()}
                {text && (
                    <p className={`mt-4 ${textSize} font-medium text-gray-700 animate-pulse`}>
                        {text}
                    </p>
                )}
                <div className="mt-8 text-center max-w-md">
                    <p className="text-sm text-gray-500">
                        Loading your content...
                    </p>
                    <div className="mt-2 h-1 w-48 bg-gray-200 rounded-full overflow-hidden mx-auto">
                        <div className="h-full bg-blue-500 animate-progress-wide"></div>
                    </div>
                </div>
            </div>
        );
    }

    // If overlay, render overlay spinner
    if (overlay) {
        return (
            <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm rounded-lg">
                {renderSpinner()}
                {text && (
                    <p className={`mt-3 ${textSize} font-medium text-gray-700`}>
                        {text}
                    </p>
                )}
            </div>
        );
    }

    // Regular spinner
    return (
        <div className={`flex flex-col items-center justify-center ${containerSize} ${className}`}>
            <div className="relative">
                {renderSpinner()}

                {/* Optional progress indicator for some spinner types */}
                {(type === SPINNER_TYPES.DEFAULT || type === SPINNER_TYPES.RING) && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className={`text-xs font-semibold ${colorClass}`}>
                            {size === SPINNER_SIZES.SMALL ? '' : '···'}
                        </span>
                    </div>
                )}
            </div>

            {text && (
                <p className={`mt-3 ${textSize} font-medium text-gray-700 text-center`}>
                    {text}
                </p>
            )}
        </div>
    );
};

// Export spinner types and sizes for easy access
LoadingSpinner.TYPES = SPINNER_TYPES;
LoadingSpinner.SIZES = SPINNER_SIZES;
LoadingSpinner.COLORS = SPINNER_COLORS;

export default LoadingSpinner;