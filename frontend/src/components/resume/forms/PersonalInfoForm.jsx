// client/src/components/forms/PersonalInfoForm.jsx
import React, { useState } from 'react';
import {
    UserIcon,
    EnvelopeIcon,
    PhoneIcon,
    MapPinIcon,
    GlobeAltIcon,
    LinkIcon,
    CalendarIcon,
    FlagIcon,
    CheckCircleIcon
} from '@heroicons/react/24/outline';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const PersonalInfoForm = ({ data = {}, onUpdate }) => {
    const [formData, setFormData] = useState({
        fullName: data.fullName || '',
        title: data.title || '',
        email: data.email || '',
        phone: data.phone || '',
        address: {
            street: data.address?.street || '',
            city: data.address?.city || '',
            state: data.address?.state || '',
            country: data.address?.country || '',
            postalCode: data.address?.postalCode || ''
        },
        about: data.about || '',
        website: data.website || '',
        linkedin: data.linkedin || '',
        github: data.github || '',
        twitter: data.twitter || '',
        portfolio: data.portfolio || '',
        dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : null,
        nationality: data.nationality || '',
        visaStatus: data.visaStatus || '',
        drivingLicense: data.drivingLicense || false
    });

    const handleChange = (field, value) => {
        const updatedData = { ...formData };

        if (field.includes('.')) {
            const [parent, child] = field.split('.');
            updatedData[parent] = { ...updatedData[parent], [child]: value };
        } else {
            updatedData[field] = value;
        }

        setFormData(updatedData);
        onUpdate(updatedData);
    };

    const basicInfoFields = [
        {
            id: 'fullName',
            label: 'Full Name',
            icon: UserIcon,
            placeholder: 'John Doe',
            required: true,
            colSpan: 'col-span-1 md:col-span-2'
        },
        {
            id: 'title',
            label: 'Professional Title',
            icon: UserIcon,
            placeholder: 'Senior Software Engineer',
            required: true,
            colSpan: 'col-span-1 md:col-span-2'
        },
        {
            id: 'email',
            label: 'Email Address',
            icon: EnvelopeIcon,
            placeholder: 'john@example.com',
            type: 'email',
            required: true
        },
        {
            id: 'phone',
            label: 'Phone Number',
            icon: PhoneIcon,
            placeholder: '+1 (555) 123-4567',
            type: 'tel'
        }
    ];

    const addressFields = [
        {
            id: 'address.street',
            label: 'Street Address',
            icon: MapPinIcon,
            placeholder: '123 Main Street',
            colSpan: 'col-span-1 md:col-span-2'
        },
        {
            id: 'address.city',
            label: 'City',
            icon: MapPinIcon,
            placeholder: 'New York'
        },
        {
            id: 'address.state',
            label: 'State/Province',
            icon: MapPinIcon,
            placeholder: 'NY'
        },
        {
            id: 'address.country',
            label: 'Country',
            icon: FlagIcon,
            placeholder: 'United States'
        },
        {
            id: 'address.postalCode',
            label: 'Postal Code',
            icon: MapPinIcon,
            placeholder: '10001'
        }
    ];

    const socialFields = [
        {
            id: 'website',
            label: 'Personal Website',
            icon: GlobeAltIcon,
            placeholder: 'https://johndoe.com'
        },
        {
            id: 'linkedin',
            label: 'LinkedIn URL',
            icon: LinkIcon,
            placeholder: 'https://linkedin.com/in/johndoe'
        },
        {
            id: 'github',
            label: 'GitHub URL',
            icon: LinkIcon,
            placeholder: 'https://github.com/johndoe'
        },
        {
            id: 'twitter',
            label: 'Twitter URL',
            icon: LinkIcon,
            placeholder: 'https://twitter.com/johndoe'
        },
        {
            id: 'portfolio',
            label: 'Portfolio URL',
            icon: LinkIcon,
            placeholder: 'https://portfolio.johndoe.com'
        }
    ];

    const isFormValid = formData.fullName && formData.email;

    return (
        <div className="space-y-8">
            {/* Basic Information */}
            <div className="space-y-6">
                <div className="flex items-center space-x-2">
                    <UserIcon className="w-6 h-6 text-gray-500" />
                    <h3 className="text-xl font-semibold text-gray-900">Basic Information</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {basicInfoFields.map((field) => (
                        <div key={field.id} className={field.colSpan || 'col-span-1'}>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                {field.label}
                                {field.required && <span className="text-red-500 ml-1">*</span>}
                            </label>
                            <div className="relative">
                                <field.icon className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                                <input
                                    type={field.type || 'text'}
                                    value={field.id.includes('.')
                                        ? formData[field.id.split('.')[0]][field.id.split('.')[1]]
                                        : formData[field.id]
                                    }
                                    onChange={(e) => handleChange(field.id, e.target.value)}
                                    placeholder={field.placeholder}
                                    className="w-full px-4 py-2.5 pl-11 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all duration-200"
                                    required={field.required}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Address */}
            <div className="space-y-6">
                <div className="flex items-center space-x-2">
                    <MapPinIcon className="w-6 h-6 text-gray-500" />
                    <h3 className="text-xl font-semibold text-gray-900">Address</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {addressFields.map((field) => (
                        <div key={field.id} className={field.colSpan || 'col-span-1'}>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                {field.label}
                            </label>
                            <div className="relative">
                                <field.icon className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    value={field.id.includes('.')
                                        ? formData[field.id.split('.')[0]][field.id.split('.')[1]]
                                        : formData[field.id]
                                    }
                                    onChange={(e) => handleChange(field.id, e.target.value)}
                                    placeholder={field.placeholder}
                                    className="w-full px-4 py-2.5 pl-11 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all duration-200"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* About Me */}
            <div className="space-y-6">
                <div className="flex items-center space-x-2">
                    <UserIcon className="w-6 h-6 text-gray-500" />
                    <h3 className="text-xl font-semibold text-gray-900">About Me</h3>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Professional Summary
                        <span className="text-xs text-gray-500 ml-2">
                            {formData.about?.length || 0}/2000 characters
                        </span>
                    </label>
                    <div className="relative">
                        <textarea
                            value={formData.about}
                            onChange={(e) => handleChange('about', e.target.value)}
                            placeholder="Write a compelling summary of your professional background, skills, and career objectives..."
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all duration-200 resize-none h-48"
                            maxLength={2000}
                        />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                        Tip: Keep it concise (2-3 paragraphs) and highlight your key achievements.
                    </p>
                </div>
            </div>

            {/* Social Links */}
            <div className="space-y-6">
                <div className="flex items-center space-x-2">
                    <LinkIcon className="w-6 h-6 text-gray-500" />
                    <h3 className="text-xl font-semibold text-gray-900">Social Profiles</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {socialFields.map((field) => (
                        <div key={field.id} className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                {field.label}
                            </label>
                            <div className="relative">
                                <field.icon className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                                <input
                                    type="url"
                                    value={formData[field.id]}
                                    onChange={(e) => handleChange(field.id, e.target.value)}
                                    placeholder={field.placeholder}
                                    className="w-full px-4 py-2.5 pl-11 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all duration-200"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Additional Information */}
            <div className="space-y-6">
                <div className="flex items-center space-x-2">
                    <CalendarIcon className="w-6 h-6 text-gray-500" />
                    <h3 className="text-xl font-semibold text-gray-900">Additional Information</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Date of Birth
                        </label>
                        <div className="relative">
                            <CalendarIcon className="absolute left-3 top-3.5 w-5 h-5 text-gray-400 z-10" />
                            <DatePicker
                                selected={formData.dateOfBirth}
                                onChange={(date) => handleChange('dateOfBirth', date)}
                                dateFormat="MMMM d, yyyy"
                                className="w-full px-4 py-2.5 pl-11 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all duration-200"
                                placeholderText="Select date"
                                showYearDropdown
                                yearDropdownItemNumber={50}
                                scrollableYearDropdown
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Nationality
                        </label>
                        <div className="relative">
                            <FlagIcon className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                value={formData.nationality}
                                onChange={(e) => handleChange('nationality', e.target.value)}
                                placeholder="Your nationality"
                                className="w-full px-4 py-2.5 pl-11 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all duration-200"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Visa Status
                        </label>
                        <div className="relative">
                            <FlagIcon className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                            <select
                                value={formData.visaStatus}
                                onChange={(e) => handleChange('visaStatus', e.target.value)}
                                className="w-full px-4 py-2.5 pl-11 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all duration-200"
                            >
                                <option value="">Select status</option>
                                <option value="citizen">Citizen</option>
                                <option value="permanent_resident">Permanent Resident</option>
                                <option value="work_visa">Work Visa</option>
                                <option value="student_visa">Student Visa</option>
                                <option value="visitor">Visitor</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="flex items-center space-x-3">
                    <input
                        type="checkbox"
                        id="drivingLicense"
                        checked={formData.drivingLicense}
                        onChange={(e) => handleChange('drivingLicense', e.target.checked)}
                        className="w-5 h-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <label htmlFor="drivingLicense" className="text-sm text-gray-700">
                        I have a valid driving license
                    </label>
                </div>
            </div>

            {/* Form Validation */}
            <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between">
                    <div>
                        <h4 className="font-medium text-gray-900">Form Status</h4>
                        <p className="text-sm text-gray-600">
                            {isFormValid ? 'All required fields completed' : 'Required fields missing'}
                        </p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className={`w-3 h-3 rounded-full ${isFormValid ? 'bg-green-500' : 'bg-red-500'}`}></div>
                        <span className="text-sm font-medium">
                            {isFormValid ? 'Complete' : 'Incomplete'}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PersonalInfoForm;