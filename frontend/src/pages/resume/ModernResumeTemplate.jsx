import React from 'react';
import { format } from 'date-fns';

const ModernTemplate = ({ resume }) => {
    const formatDate = (date) => {
        if (!date) return 'Present';
        return format(new Date(date), 'MMM yyyy');
    };

    const calculateDuration = (startDate, endDate, isCurrent) => {
        const start = new Date(startDate);
        const end = isCurrent ? new Date() : new Date(endDate);
        const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());

        if (months < 12) {
            return `${months} month${months !== 1 ? 's' : ''}`;
        } else {
            const years = Math.floor(months / 12);
            const remainingMonths = months % 12;
            return `${years} year${years !== 1 ? 's' : ''}${remainingMonths ? ` ${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}` : ''}`;
        }
    };

    return (
        <div className="p-8">
            {/* Header */}
            <div className="mb-8 pb-8 border-b border-gray-200">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">
                            {resume.personalInfo.fullName}
                        </h1>
                        <h2 className="text-2xl text-blue-600 font-semibold">
                            {resume.personalInfo.jobTitle}
                        </h2>
                    </div>

                    {resume.personalInfo.avatar && (
                        <img
                            src={resume.personalInfo.avatar}
                            alt={resume.personalInfo.fullName}
                            className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg mt-4 md:mt-0"
                        />
                    )}
                </div>

                {/* Contact Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    {resume.contactInfo?.email && (
                        <div className="text-gray-700">
                            <strong className="text-gray-900">Email:</strong> {resume.contactInfo.email}
                        </div>
                    )}
                    {resume.contactInfo?.phone && (
                        <div className="text-gray-700">
                            <strong className="text-gray-900">Phone:</strong> {resume.contactInfo.phone}
                        </div>
                    )}
                    {resume.contactInfo?.address && (
                        <div className="text-gray-700">
                            <strong className="text-gray-900">Location:</strong> {resume.contactInfo.address}
                        </div>
                    )}
                </div>

                {/* Social Links */}
                {resume.socialLinks && (
                    <div className="flex space-x-4 mt-4">
                        {resume.socialLinks.linkedin && (
                            <a href={resume.socialLinks.linkedin} className="text-blue-600 hover:underline">
                                LinkedIn
                            </a>
                        )}
                        {resume.socialLinks.github && (
                            <a href={resume.socialLinks.github} className="text-blue-600 hover:underline">
                                GitHub
                            </a>
                        )}
                        {resume.socialLinks.website && (
                            <a href={resume.socialLinks.website} className="text-blue-600 hover:underline">
                                Website
                            </a>
                        )}
                    </div>
                )}
            </div>

            {/* Summary */}
            {resume.personalInfo.summary && (
                <div className="mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">Summary</h3>
                    <p className="text-gray-700 leading-relaxed">
                        {resume.personalInfo.summary}
                    </p>
                </div>
            )}

            {/* Work Experience */}
            {resume.workExperience && resume.workExperience.length > 0 && (
                <div className="mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
                        Work Experience
                    </h3>

                    <div className="space-y-6">
                        {resume.workExperience.map((exp, index) => (
                            <div key={index} className="border-l-4 border-blue-500 pl-4 py-1">
                                <div className="flex flex-col md:flex-row justify-between mb-2">
                                    <h4 className="text-xl font-semibold text-gray-900">{exp.position}</h4>
                                    <div className="text-gray-600">
                                        {formatDate(exp.startDate)} - {exp.isCurrent ? 'Present' : formatDate(exp.endDate)}
                                        <span className="ml-2 text-sm">
                                            ({calculateDuration(exp.startDate, exp.endDate, exp.isCurrent)})
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center text-gray-700 mb-3">
                                    <span className="font-medium">{exp.company}</span>
                                    {exp.location && (
                                        <span className="mx-2">•</span>
                                    )}
                                    <span>{exp.location}</span>
                                </div>

                                {exp.description && (
                                    <p className="text-gray-700 mb-3">{exp.description}</p>
                                )}

                                {exp.achievements && exp.achievements.length > 0 && (
                                    <ul className="list-disc pl-5 text-gray-700 space-y-1">
                                        {exp.achievements.map((achievement, i) => (
                                            <li key={i}>{achievement}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Education */}
            {resume.education && resume.education.length > 0 && (
                <div className="mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
                        Education
                    </h3>

                    <div className="space-y-6">
                        {resume.education.map((edu, index) => (
                            <div key={index} className="border-l-4 border-green-500 pl-4 py-1">
                                <div className="flex flex-col md:flex-row justify-between mb-2">
                                    <h4 className="text-xl font-semibold text-gray-900">{edu.degree}</h4>
                                    <div className="text-gray-600">
                                        {formatDate(edu.startDate)} - {edu.isCurrent ? 'Present' : formatDate(edu.endDate)}
                                    </div>
                                </div>

                                <div className="flex items-center text-gray-700 mb-3">
                                    <span className="font-medium">{edu.institution}</span>
                                    {edu.location && (
                                        <span className="mx-2">•</span>
                                    )}
                                    <span>{edu.location}</span>
                                </div>

                                {edu.field && (
                                    <p className="text-gray-700 mb-2">
                                        <strong>Field:</strong> {edu.field}
                                    </p>
                                )}

                                {edu.description && (
                                    <p className="text-gray-700">{edu.description}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Skills */}
            {resume.skills && resume.skills.length > 0 && (
                <div className="mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">Skills</h3>

                    <div className="flex flex-wrap gap-3">
                        {resume.skills.map((skill, index) => (
                            <div
                                key={index}
                                className="bg-blue-50 text-blue-800 px-4 py-2 rounded-lg"
                            >
                                {skill.name}
                                {skill.level && (
                                    <div className="flex items-center mt-1">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <span
                                                key={star}
                                                className={`text-sm ${star <= skill.level ? 'text-yellow-500' : 'text-gray-300'}`}
                                            >
                                                ★
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Footer */}
            <div className="mt-12 pt-8 border-t border-gray-200 text-center text-gray-500 text-sm">
                <p>Generated by Smart Resume Builder • {resume.publicId}</p>
                <p className="mt-1">Scan QR code to view online version</p>
            </div>
        </div>
    );
};

export default ModernTemplate;