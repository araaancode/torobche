// client/src/utils/validation.js
export const validatePersonalInfo = (data) => {
    const errors = {};

    if (!data.fullName?.trim()) {
        errors.fullName = 'نام کامل الزامی است';
    }

    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        errors.email = 'ایمیل معتبر نیست';
    }

    return errors;
};

export const validateExperience = (experience) => {
    return experience.every(exp => {
        return exp.jobTitle && exp.company && exp.startDate;
    });
};