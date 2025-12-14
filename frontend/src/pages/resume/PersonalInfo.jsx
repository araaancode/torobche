import React from 'react';

const PersonalInfo = ({ register, errors, control }) => {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-group">
                    <label className="form-label">Full Name *</label>
                    <input
                        type="text"
                        {...register('personalInfo.fullName')}
                        className="form-input"
                        placeholder="John Doe"
                    />
                    {errors.personalInfo?.fullName && (
                        <p className="form-error">{errors.personalInfo.fullName.message}</p>
                    )}
                </div>

                <div className="form-group">
                    <label className="form-label">Job Title *</label>
                    <input
                        type="text"
                        {...register('personalInfo.jobTitle')}
                        className="form-input"
                        placeholder="Senior Software Engineer"
                    />
                    {errors.personalInfo?.jobTitle && (
                        <p className="form-error">{errors.personalInfo.jobTitle.message}</p>
                    )}
                </div>
            </div>

            <div className="form-group">
                <label className="form-label">Professional Summary</label>
                <textarea
                    {...register('personalInfo.summary')}
                    className="form-input h-32"
                    placeholder="Briefly describe your professional background, skills, and career goals..."
                    maxLength={500}
                />
                {errors.personalInfo?.summary && (
                    <p className="form-error">{errors.personalInfo.summary.message}</p>
                )}
                <p className="text-sm text-gray-500 mt-1">
                    {watch('personalInfo.summary')?.length || 0}/500 characters
                </p>
            </div>

            <div className="form-group">
                <label className="form-label">Profile Image URL (Optional)</label>
                <input
                    type="url"
                    {...register('personalInfo.avatar')}
                    className="form-input"
                    placeholder="https://example.com/your-photo.jpg"
                />
                <p className="text-sm text-gray-500 mt-1">
                    Provide a link to your professional photo
                </p>
            </div>
        </div>
    );
};

export default PersonalInfo;