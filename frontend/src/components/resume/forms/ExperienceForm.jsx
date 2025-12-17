// client/src/components/forms/ExperienceForm.jsx
import React, { useState } from 'react';
import {
    PlusIcon,
    TrashIcon,
    PencilIcon,
    CheckIcon,
    XMarkIcon,
    CalendarIcon,
    MapPinIcon,
    BriefcaseIcon
} from '@heroicons/react/24/outline';
import DatePicker from 'react-datepicker';

const ExperienceForm = ({ data = [], onUpdate }) => {
    const [experiences, setExperiences] = useState(data.length > 0 ? data : []);
    const [editingIndex, setEditingIndex] = useState(null);
    const [isAdding, setIsAdding] = useState(false);

    const defaultExperience = {
        jobTitle: '',
        company: '',
        location: '',
        startDate: new Date(),
        endDate: new Date(),
        current: false,
        description: '',
        achievements: [],
        employmentType: 'full-time',
        industry: ''
    };

    const [newExperience, setNewExperience] = useState(defaultExperience);

    const handleInputChange = (field, value) => {
        if (editingIndex !== null) {
            const updated = [...experiences];
            updated[editingIndex] = { ...updated[editingIndex], [field]: value };
            setExperiences(updated);
            onUpdate(updated);
        } else {
            setNewExperience({ ...newExperience, [field]: value });
        }
    };

    const handleArrayChange = (field, value) => {
        const array = value.split(',').map(item => item.trim()).filter(item => item);

        if (editingIndex !== null) {
            const updated = [...experiences];
            updated[editingIndex] = { ...updated[editingIndex], [field]: array };
            setExperiences(updated);
            onUpdate(updated);
        } else {
            setNewExperience({ ...newExperience, [field]: array });
        }
    };

    const addExperience = () => {
        if (!newExperience.jobTitle || !newExperience.company) {
            alert('Please fill in job title and company');
            return;
        }

        const updated = [...experiences, newExperience];
        setExperiences(updated);
        onUpdate(updated);
        setNewExperience(defaultExperience);
        setIsAdding(false);
    };

    const startEdit = (index) => {
        setEditingIndex(index);
    };

    const saveEdit = () => {
        setEditingIndex(null);
    };

    const cancelEdit = () => {
        setEditingIndex(null);
    };

    const removeExperience = (index) => {
        const updated = experiences.filter((_, i) => i !== index);
        setExperiences(updated);
        onUpdate(updated);
        if (editingIndex === index) {
            setEditingIndex(null);
        }
    };

    const employmentTypes = [
        { value: 'full-time', label: 'Full Time' },
        { value: 'part-time', label: 'Part Time' },
        { value: 'contract', label: 'Contract' },
        { value: 'freelance', label: 'Freelance' },
        { value: 'internship', label: 'Internship' }
    ];

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-2xl font-bold text-gray-900">Work Experience</h3>
                    <p className="text-gray-600">Add your professional work history</p>
                </div>
                <button
                    onClick={() => setIsAdding(true)}
                    className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                >
                    <PlusIcon className="w-5 h-5" />
                    <span>Add Experience</span>
                </button>
            </div>

            {/* Add/Edit Form */}
            {(isAdding || editingIndex !== null) && (
                <div className="bg-gray-50 p-6 rounded-xl">
                    <div className="flex items-center justify-between mb-4">
                        <h4 className="text-lg font-semibold text-gray-900">
                            {editingIndex !== null ? 'Edit Experience' : 'Add New Experience'}
                        </h4>
                        <button
                            onClick={editingIndex !== null ? cancelEdit : () => setIsAdding(false)}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            <XMarkIcon className="w-6 h-6" />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Job Title *
                            </label>
                            <input
                                type="text"
                                value={editingIndex !== null ? experiences[editingIndex].jobTitle : newExperience.jobTitle}
                                onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                                placeholder="e.g., Senior Software Engineer"
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Company *
                            </label>
                            <input
                                type="text"
                                value={editingIndex !== null ? experiences[editingIndex].company : newExperience.company}
                                onChange={(e) => handleInputChange('company', e.target.value)}
                                placeholder="e.g., Google Inc."
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Location
                            </label>
                            <input
                                type="text"
                                value={editingIndex !== null ? experiences[editingIndex].location : newExperience.location}
                                onChange={(e) => handleInputChange('location', e.target.value)}
                                placeholder="e.g., San Francisco, CA"
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Employment Type
                            </label>
                            <select
                                value={editingIndex !== null ? experiences[editingIndex].employmentType : newExperience.employmentType}
                                onChange={(e) => handleInputChange('employmentType', e.target.value)}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                            >
                                {employmentTypes.map(type => (
                                    <option key={type.value} value={type.value}>
                                        {type.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Start Date *
                            </label>
                            <div className="relative">
                                <CalendarIcon className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                                <DatePicker
                                    selected={editingIndex !== null ? new Date(experiences[editingIndex].startDate) : newExperience.startDate}
                                    onChange={(date) => handleInputChange('startDate', date)}
                                    dateFormat="MMMM yyyy"
                                    showMonthYearPicker
                                    className="w-full px-4 py-2.5 pl-11 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                End Date
                            </label>
                            <div className="space-y-2">
                                <div className="flex items-center space-x-3 mb-2">
                                    <input
                                        type="checkbox"
                                        id="current"
                                        checked={editingIndex !== null ? experiences[editingIndex].current : newExperience.current}
                                        onChange={(e) => handleInputChange('current', e.target.checked)}
                                        className="w-5 h-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                                    />
                                    <label htmlFor="current" className="text-sm text-gray-700">
                                        I currently work here
                                    </label>
                                </div>

                                {!(editingIndex !== null ? experiences[editingIndex].current : newExperience.current) && (
                                    <div className="relative">
                                        <CalendarIcon className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                                        <DatePicker
                                            selected={editingIndex !== null ? new Date(experiences[editingIndex].endDate) : newExperience.endDate}
                                            onChange={(date) => handleInputChange('endDate', date)}
                                            dateFormat="MMMM yyyy"
                                            showMonthYearPicker
                                            className="w-full px-4 py-2.5 pl-11 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Description
                            </label>
                            <textarea
                                value={editingIndex !== null ? experiences[editingIndex].description : newExperience.description}
                                onChange={(e) => handleInputChange('description', e.target.value)}
                                placeholder="Describe your responsibilities and achievements..."
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none resize-none h-32"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Key Achievements (comma separated)
                            </label>
                            <textarea
                                value={editingIndex !== null ? experiences[editingIndex].achievements?.join(', ') : newExperience.achievements?.join(', ')}
                                onChange={(e) => handleArrayChange('achievements', e.target.value)}
                                placeholder="e.g., Increased team productivity by 30%, Managed a budget of $500k, Led a team of 10 engineers..."
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none resize-none h-24"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end space-x-3 mt-6">
                        <button
                            onClick={editingIndex !== null ? cancelEdit : () => setIsAdding(false)}
                            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={editingIndex !== null ? saveEdit : addExperience}
                            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                        >
                            {editingIndex !== null ? 'Save Changes' : 'Add Experience'}
                        </button>
                    </div>
                </div>
            )}

            {/* Experiences List */}
            {experiences.length > 0 ? (
                <div className="space-y-6">
                    <h4 className="text-lg font-semibold text-gray-900">
                        Your Work Experience ({experiences.length})
                    </h4>

                    {experiences.map((exp, index) => (
                        <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h5 className="text-xl font-bold text-gray-900">{exp.jobTitle}</h5>
                                    <p className="text-lg text-gray-700">{exp.company}</p>
                                    <div className="flex items-center space-x-4 mt-2">
                                        <span className="flex items-center space-x-1 text-gray-600">
                                            <CalendarIcon className="w-4 h-4" />
                                            <span>
                                                {new Date(exp.startDate).toLocaleDateString('en-US', {
                                                    month: 'short',
                                                    year: 'numeric'
                                                })}
                                                {' - '}
                                                {exp.current
                                                    ? 'Present'
                                                    : new Date(exp.endDate).toLocaleDateString('en-US', {
                                                        month: 'short',
                                                        year: 'numeric'
                                                    })
                                                }
                                            </span>
                                        </span>
                                        {exp.location && (
                                            <span className="flex items-center space-x-1 text-gray-600">
                                                <MapPinIcon className="w-4 h-4" />
                                                <span>{exp.location}</span>
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => startEdit(index)}
                                        className="p-2 text-gray-600 hover:text-primary-600"
                                        title="Edit"
                                    >
                                        <PencilIcon className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={() => removeExperience(index)}
                                        className="p-2 text-gray-600 hover:text-red-600"
                                        title="Remove"
                                    >
                                        <TrashIcon className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            {exp.description && (
                                <p className="text-gray-700 mb-4">{exp.description}</p>
                            )}

                            {exp.achievements && exp.achievements.length > 0 && (
                                <div>
                                    <h6 className="font-medium text-gray-900 mb-2">Key Achievements:</h6>
                                    <ul className="space-y-1">
                                        {exp.achievements.map((achievement, i) => (
                                            <li key={i} className="flex items-start">
                                                <CheckIcon className="w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                                                <span className="text-gray-700">{achievement}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 bg-gray-50 rounded-xl">
                    <BriefcaseIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h4 className="text-xl font-medium text-gray-900 mb-2">No work experience added yet</h4>
                    <p className="text-gray-600 mb-6">Add your first work experience to showcase your professional background</p>
                    <button
                        onClick={() => setIsAdding(true)}
                        className="inline-flex items-center space-x-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                    >
                        <PlusIcon className="w-5 h-5" />
                        <span>Add Your First Experience</span>
                    </button>
                </div>
            )}
        </div>
    );
};

export default ExperienceForm;