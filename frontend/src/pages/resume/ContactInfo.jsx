import React, { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaGlobe, FaLinkedin, FaGithub, FaTwitter, FaCopy, FaCheck } from 'react-icons/fa';
import { MdLocationCity, MdOutlineMail, MdPhoneIphone } from 'react-icons/md';
import { IoEarthOutline } from 'react-icons/io5';

const ContactInfo = ({ register, errors, control, watch, setValue }) => {
    const [copiedField, setCopiedField] = useState(null);

    // Handle copy to clipboard
    const handleCopyToClipboard = (text, fieldName) => {
        if (text) {
            navigator.clipboard.writeText(text);
            setCopiedField(fieldName);
            setTimeout(() => setCopiedField(null), 2000);
        }
    };

    // Auto-format phone number
    const formatPhoneNumber = (value) => {
        if (!value) return value;

        const phoneNumber = value.replace(/[^\d]/g, '');
        const phoneNumberLength = phoneNumber.length;

        if (phoneNumberLength < 4) return phoneNumber;
        if (phoneNumberLength < 7) {
            return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
        }
        return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
    };

    const handlePhoneChange = (e) => {
        const formattedNumber = formatPhoneNumber(e.target.value);
        setValue('contactInfo.phone', formattedNumber);
    };

    // Get current phone value
    const phoneValue = watch('contactInfo.phone') || '';

    return (
        <div className="space-y-8">
            {/* Contact Information Header */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex items-start">
                    <div className="flex-shrink-0">
                        <FaEnvelope className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="ml-3">
                        <h3 className="text-lg font-medium text-blue-800">Contact Information</h3>
                        <p className="text-sm text-blue-700 mt-1">
                            Provide your contact details so employers can reach you easily.
                        </p>
                    </div>
                </div>
            </div>

            {/* Email - Required Field */}
            <div className="form-group">
                <label className="form-label flex items-center">
                    <FaEnvelope className="mr-2 text-gray-500" />
                    Email Address *
                </label>
                <div className="relative">
                    <input
                        type="email"
                        {...register('contactInfo.email')}
                        className={`form-input pl-10 ${errors.contactInfo?.email ? 'border-red-300' : ''}`}
                        placeholder="your.email@example.com"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MdOutlineMail className="h-5 w-5 text-gray-400" />
                    </div>
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                        <button
                            type="button"
                            onClick={() => handleCopyToClipboard(watch('contactInfo.email'), 'email')}
                            className={`p-1 rounded ${watch('contactInfo.email')
                                    ? 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                                    : 'text-gray-300 cursor-not-allowed'
                                }`}
                            disabled={!watch('contactInfo.email')}
                            title="Copy email"
                        >
                            {copiedField === 'email' ? (
                                <FaCheck className="h-4 w-4 text-green-500" />
                            ) : (
                                <FaCopy className="h-4 w-4" />
                            )}
                        </button>
                    </div>
                </div>
                {errors.contactInfo?.email && (
                    <p className="form-error">{errors.contactInfo.email.message}</p>
                )}
                <p className="text-xs text-gray-500 mt-1">
                    This is required for your resume. It will be publicly visible.
                </p>
            </div>

            {/* Phone Number */}
            <div className="form-group">
                <label className="form-label flex items-center">
                    <FaPhone className="mr-2 text-gray-500" />
                    Phone Number
                </label>
                <div className="relative">
                    <input
                        type="tel"
                        {...register('contactInfo.phone')}
                        onChange={handlePhoneChange}
                        value={phoneValue}
                        className={`form-input pl-10 ${errors.contactInfo?.phone ? 'border-red-300' : ''}`}
                        placeholder="(123) 456-7890"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MdPhoneIphone className="h-5 w-5 text-gray-400" />
                    </div>
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                        <button
                            type="button"
                            onClick={() => handleCopyToClipboard(watch('contactInfo.phone'), 'phone')}
                            className={`p-1 rounded ${watch('contactInfo.phone')
                                    ? 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                                    : 'text-gray-300 cursor-not-allowed'
                                }`}
                            disabled={!watch('contactInfo.phone')}
                            title="Copy phone number"
                        >
                            {copiedField === 'phone' ? (
                                <FaCheck className="h-4 w-4 text-green-500" />
                            ) : (
                                <FaCopy className="h-4 w-4" />
                            )}
                        </button>
                    </div>
                </div>
                {errors.contactInfo?.phone && (
                    <p className="form-error">{errors.contactInfo.phone.message}</p>
                )}
                <p className="text-xs text-gray-500 mt-1">
                    Use international format if applying for international positions
                </p>
            </div>

            {/* Address Information */}
            <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <FaMapMarkerAlt className="mr-2 text-gray-500" />
                    Address Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Address Line */}
                    <div className="form-group">
                        <label className="form-label">Street Address</label>
                        <div className="relative">
                            <input
                                type="text"
                                {...register('contactInfo.address')}
                                className="form-input pl-10"
                                placeholder="123 Main Street"
                            />
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaMapMarkerAlt className="h-5 w-5 text-gray-400" />
                            </div>
                        </div>
                        {errors.contactInfo?.address && (
                            <p className="form-error">{errors.contactInfo.address.message}</p>
                        )}
                    </div>

                    {/* City */}
                    <div className="form-group">
                        <label className="form-label">City</label>
                        <div className="relative">
                            <input
                                type="text"
                                {...register('contactInfo.city')}
                                className="form-input pl-10"
                                placeholder="New York"
                            />
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <MdLocationCity className="h-5 w-5 text-gray-400" />
                            </div>
                        </div>
                        {errors.contactInfo?.city && (
                            <p className="form-error">{errors.contactInfo.city.message}</p>
                        )}
                    </div>

                    {/* Country */}
                    <div className="form-group">
                        <label className="form-label">Country</label>
                        <div className="relative">
                            <select
                                {...register('contactInfo.country')}
                                className="form-input pl-10 appearance-none"
                                defaultValue=""
                            >
                                <option value="">Select Country</option>
                                <option value="United States">United States</option>
                                <option value="Canada">Canada</option>
                                <option value="United Kingdom">United Kingdom</option>
                                <option value="Australia">Australia</option>
                                <option value="Germany">Germany</option>
                                <option value="France">France</option>
                                <option value="Japan">Japan</option>
                                <option value="China">China</option>
                                <option value="India">India</option>
                                <option value="Other">Other</option>
                            </select>
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <IoEarthOutline className="h-5 w-5 text-gray-400" />
                            </div>
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </div>
                        </div>
                        {errors.contactInfo?.country && (
                            <p className="form-error">{errors.contactInfo.country.message}</p>
                        )}
                    </div>

                    {/* Postal Code */}
                    <div className="form-group">
                        <label className="form-label">Postal / Zip Code</label>
                        <input
                            type="text"
                            {...register('contactInfo.postalCode')}
                            className="form-input"
                            placeholder="10001"
                        />
                        {errors.contactInfo?.postalCode && (
                            <p className="form-error">{errors.contactInfo.postalCode.message}</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Website & Portfolio */}
            <div className="form-group">
                <label className="form-label flex items-center">
                    <FaGlobe className="mr-2 text-gray-500" />
                    Personal Website / Portfolio
                </label>
                <div className="relative">
                    <input
                        type="url"
                        {...register('contactInfo.website')}
                        className={`form-input pl-10 ${errors.contactInfo?.website ? 'border-red-300' : ''}`}
                        placeholder="https://yourportfolio.com"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaGlobe className="h-5 w-5 text-gray-400" />
                    </div>
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                        <button
                            type="button"
                            onClick={() => handleCopyToClipboard(watch('contactInfo.website'), 'website')}
                            className={`p-1 rounded ${watch('contactInfo.website')
                                    ? 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                                    : 'text-gray-300 cursor-not-allowed'
                                }`}
                            disabled={!watch('contactInfo.website')}
                            title="Copy website URL"
                        >
                            {copiedField === 'website' ? (
                                <FaCheck className="h-4 w-4 text-green-500" />
                            ) : (
                                <FaCopy className="h-4 w-4" />
                            )}
                        </button>
                    </div>
                </div>
                {errors.contactInfo?.website && (
                    <p className="form-error">{errors.contactInfo.website.message}</p>
                )}
                <p className="text-xs text-gray-500 mt-1">
                    Include your portfolio, blog, or personal website
                </p>
            </div>

            {/* Social Media Links */}
            <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Social Media Profiles</h3>
                <p className="text-sm text-gray-600 mb-4">
                    Add links to your professional social media profiles (optional)
                </p>

                <div className="space-y-4">
                    {/* LinkedIn */}
                    <div className="form-group">
                        <label className="form-label flex items-center">
                            <FaLinkedin className="mr-2 text-blue-700" />
                            LinkedIn Profile
                        </label>
                        <div className="relative">
                            <input
                                type="url"
                                {...register('socialLinks.linkedin')}
                                className="form-input pl-10"
                                placeholder="https://linkedin.com/in/yourprofile"
                            />
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaLinkedin className="h-5 w-5 text-blue-700" />
                            </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                            Recommended for professional networking
                        </p>
                    </div>

                    {/* GitHub */}
                    <div className="form-group">
                        <label className="form-label flex items-center">
                            <FaGithub className="mr-2 text-gray-900" />
                            GitHub Profile
                        </label>
                        <div className="relative">
                            <input
                                type="url"
                                {...register('socialLinks.github')}
                                className="form-input pl-10"
                                placeholder="https://github.com/yourusername"
                            />
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaGithub className="h-5 w-5 text-gray-900" />
                            </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                            Essential for developers and technical roles
                        </p>
                    </div>

                    {/* Twitter */}
                    <div className="form-group">
                        <label className="form-label flex items-center">
                            <FaTwitter className="mr-2 text-blue-400" />
                            Twitter / X Profile
                        </label>
                        <div className="relative">
                            <input
                                type="url"
                                {...register('socialLinks.twitter')}
                                className="form-input pl-10"
                                placeholder="https://twitter.com/yourhandle"
                            />
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaTwitter className="h-5 w-5 text-blue-400" />
                            </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                            Add if you're active in professional communities
                        </p>
                    </div>
                </div>

                {/* Additional Social Links (Collapsible) */}
                <div className="mt-6">
                    <details className="group">
                        <summary className="flex items-center justify-between cursor-pointer text-sm font-medium text-gray-700">
                            <span>Additional Profiles</span>
                            <svg className="h-5 w-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </summary>

                        <div className="mt-4 space-y-4 pl-2">
                            {/* Stack Overflow */}
                            <div className="form-group">
                                <label className="form-label text-sm">Stack Overflow</label>
                                <input
                                    type="url"
                                    {...register('socialLinks.stackoverflow')}
                                    className="form-input text-sm"
                                    placeholder="https://stackoverflow.com/users/yourid"
                                />
                            </div>

                            {/* Behance */}
                            <div className="form-group">
                                <label className="form-label text-sm">Behance</label>
                                <input
                                    type="url"
                                    {...register('socialLinks.behance')}
                                    className="form-input text-sm"
                                    placeholder="https://behance.net/yourprofile"
                                />
                            </div>

                            {/* Dribbble */}
                            <div className="form-group">
                                <label className="form-label text-sm">Dribbble</label>
                                <input
                                    type="url"
                                    {...register('socialLinks.dribbble')}
                                    className="form-input text-sm"
                                    placeholder="https://dribbble.com/yourprofile"
                                />
                            </div>
                        </div>
                    </details>
                </div>
            </div>

            {/* Contact Info Preview */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-800 mb-3 flex items-center">
                    <FaEnvelope className="mr-2" />
                    Preview of Your Contact Information
                </h4>

                <div className="space-y-3">
                    {watch('contactInfo.email') && (
                        <div className="flex items-center text-sm">
                            <span className="w-24 text-gray-600">Email:</span>
                            <span className="font-medium">{watch('contactInfo.email')}</span>
                        </div>
                    )}

                    {watch('contactInfo.phone') && (
                        <div className="flex items-center text-sm">
                            <span className="w-24 text-gray-600">Phone:</span>
                            <span className="font-medium">{watch('contactInfo.phone')}</span>
                        </div>
                    )}

                    {(watch('contactInfo.address') || watch('contactInfo.city') || watch('contactInfo.country')) && (
                        <div className="flex items-start text-sm">
                            <span className="w-24 text-gray-600 mt-1">Address:</span>
                            <div>
                                {watch('contactInfo.address') && <div>{watch('contactInfo.address')}</div>}
                                {(watch('contactInfo.city') || watch('contactInfo.country')) && (
                                    <div className="text-gray-700">
                                        {watch('contactInfo.city')}
                                        {watch('contactInfo.city') && watch('contactInfo.country') && ', '}
                                        {watch('contactInfo.country')}
                                        {watch('contactInfo.postalCode') && `, ${watch('contactInfo.postalCode')}`}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {watch('contactInfo.website') && (
                        <div className="flex items-center text-sm">
                            <span className="w-24 text-gray-600">Website:</span>
                            <a
                                href={watch('contactInfo.website')}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-medium text-blue-600 hover:text-blue-800 hover:underline truncate"
                            >
                                {watch('contactInfo.website')}
                            </a>
                        </div>
                    )}

                    {/* Social Links Preview */}
                    {(watch('socialLinks.linkedin') || watch('socialLinks.github') || watch('socialLinks.twitter')) && (
                        <div className="pt-2 border-t border-blue-100">
                            <div className="flex flex-wrap gap-3">
                                {watch('socialLinks.linkedin') && (
                                    <a
                                        href={watch('socialLinks.linkedin')}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs hover:bg-blue-200"
                                    >
                                        <FaLinkedin className="mr-1" />
                                        LinkedIn
                                    </a>
                                )}

                                {watch('socialLinks.github') && (
                                    <a
                                        href={watch('socialLinks.github')}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs hover:bg-gray-200"
                                    >
                                        <FaGithub className="mr-1" />
                                        GitHub
                                    </a>
                                )}

                                {watch('socialLinks.twitter') && (
                                    <a
                                        href={watch('socialLinks.twitter')}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-400 text-xs hover:bg-blue-100"
                                    >
                                        <FaTwitter className="mr-1" />
                                        Twitter
                                    </a>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Tips Section */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex">
                    <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className="ml-3">
                        <h3 className="text-sm font-medium text-yellow-800">
                            Contact Information Tips
                        </h3>
                        <div className="mt-2 text-sm text-yellow-700">
                            <ul className="list-disc pl-5 space-y-1">
                                <li>Use a professional email address (preferably with your name)</li>
                                <li>Include a phone number with voicemail set up</li>
                                <li>Add location (city and country is usually sufficient)</li>
                                <li>Only include social media profiles that are professional</li>
                                <li>Your email will be publicly visible on your resume</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactInfo;