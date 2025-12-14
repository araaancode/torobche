const shortid = require('shortid');

// Generate unique public ID
exports.generatePublicId = () => {
    return shortid.generate();
};

// Format date for display
exports.formatDate = (date) => {
    if (!date) return 'Present';

    const options = { year: 'numeric', month: 'long' };
    return new Date(date).toLocaleDateString('en-US', options);
};

// Calculate duration between dates
exports.calculateDuration = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date();

    const years = end.getFullYear() - start.getFullYear();
    const months = end.getMonth() - start.getMonth();

    let totalMonths = years * 12 + months;

    if (totalMonths < 12) {
        return `${totalMonths} month${totalMonths !== 1 ? 's' : ''}`;
    } else {
        const years = Math.floor(totalMonths / 12);
        const remainingMonths = totalMonths % 12;

        if (remainingMonths === 0) {
            return `${years} year${years !== 1 ? 's' : ''}`;
        } else {
            return `${years} year${years !== 1 ? 's' : ''} ${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
        }
    }
};