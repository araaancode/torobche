// client/src/components/forms/EducationForm.jsx
import React, { useState } from 'react';
import {
    PlusIcon,
    TrashIcon,
    PencilIcon,
    CheckIcon,
    XMarkIcon,
    CalendarIcon,
    MapPinIcon,
    AcademicCapIcon
} from '@heroicons/react/24/outline';
import DatePicker from 'react-datepicker';

const EducationForm = ({ data = [], onUpdate }) => {
    const [educations, setEducations] = useState(data.length > 0 ? data : []);
    const [editingIndex, setEditingIndex] = useState(null);
    const [isAdding, setIsAdding] = useState(false);

    const defaultEducation = {
        degree: '',
        institution: '',
        location: '',
        fieldOfStudy: '',
        startDate: new Date(),
        endDate: new Date(),
        current: false,
        gpa: '',
        description: '',
        honors: []
    };

    const [newEducation, setNewEducation] = useState(defaultEducation);

    const handleInputChange = (field, value) => {
        if (editingIndex !== null) {
            const updated = [...educations];
            updated[editingIndex] = { ...updated[editingIndex], [field]: value };
            setEducations(updated);
            onUpdate(updated);
        } else {
            setNewEducation({ ...newEducation, [field]: value });
        }
    };

    const handleArrayChange = (field, value) => {
        const array = value.split(',').map(item => item.trim()).filter(item => item);

        if (editingIndex !== null) {
            const updated = [...educations];
            updated[editingIndex] = { ...updated[editingIndex], [field]: array };
            setEducations(updated);
            onUpdate(updated);
        } else {
            setNewEducation({ ...newEducation, [field]: array });
        }
    };

    const addEducation = () => {
        if (!newEducation.degree || !newEducation.institution) {
            alert('Please fill in degree and institution');
            return;
        }

        const updated = [...educations, newEducation];
        setEducations(updated);
        onUpdate(updated);
        setNewEducation(defaultEducation);
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

    const removeEducation = (index) => {
        const updated = educations.filter((_, i) => i !== index);
        setEducations(updated);
        onUpdate(updated);
        if (editingIndex === index) {
            setEditingIndex(null);
        }
    };

    const degreeLevels = [
        'High School Diploma',
        'Associate Degree',
        'Bachelor\'s Degree',
        'Master\'s Degree',
        'PhD',
        'MBA',
        'Certificate',
        'Diploma',
        'Other'
    ];

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-2xl font-bold text-gray-900">Education</h3>
                    <p className="text-gray-600">Add your educational background</p>
                </div>
                <button
                    onClick={() => setIsAdding(true)}
                    className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                >
                    <PlusIcon className="w-5 h-5" />
                    <span>Add Education</span>
                </button>
            </div>

            {/* Add/Edit Form */}
            {(isAdding || editingIndex !== null) && (
                <div className="bg-gray-50 p-6 rounded-xl">
                    <div className="flex items-center justify-between mb-4">
                        <h4 className="text-lg font-semibold text-gray-900">
                            {editingIndex !== null ? 'Edit Education' : 'Add New Education'}
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
                                Degree/Certificate *
                            </label>
                            <select
                                value={editingIndex !== null ? educations[editingIndex].degree : newEducation.degree}
                                onChange={(e) => handleInputChange('degree', e.target.value)}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                            >
                                <option value="">Select degree level</option>
                                {degreeLevels.map(level => (
                                    <option key={level} value={level}>
                                        {level}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Institution *
                            </label>
                            <input
                                type="text"
                                value={editingIndex !== null ? educations[editingIndex].institution : newEducation.institution}
                                onChange={(e) => handleInputChange('institution', e.target.value)}
                                placeholder="e.g., Stanford University"
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Location
                            </label>
                            <input
                                type="text"
                                value={editingIndex !== null ? educations[editingIndex].location : newEducation.location}
                                onChange={(e) => handleInputChange('location', e.target.value)}
                                placeholder="e.g., Stanford, CA"
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Field of Study
                            </label>
                            <input
                                type="text"
                                value={editingIndex !== null ? educations[editingIndex].fieldOfStudy : newEducation.fieldOfStudy}
                                onChange={(e) => handleInputChange('fieldOfStudy', e.target.value)}
                                placeholder="e.g., Computer Science"
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Start Date *
                            </label>
                            <div className="relative">
                                <CalendarIcon className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                                <DatePicker
                                    selected={editingIndex !== null ? new Date(educations[editingIndex].startDate) : newEducation.startDate}
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
                                        checked={editingIndex !== null ? educations[editingIndex].current : newEducation.current}
                                        onChange={(e) => handleInputChange('current', e.target.checked)}
                                        className="w-5 h-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                                    />
                                    <label htmlFor="current" className="text-sm text-gray-700">
                                        Currently studying
                                    </label>
                                </div>

                                {!(editingIndex !== null ? educations[editingIndex].current : newEducation.current) && (
                                    <div className="relative">
                                        <CalendarIcon className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                                        <DatePicker
                                            selected={editingIndex !== null ? new Date(educations[editingIndex].endDate) : newEducation.endDate}
                                            onChange={(date) => handleInputChange('endDate', date)}
                                            dateFormat="MMMM yyyy"
                                            showMonthYearPicker
                                            className="w-full px-4 py-2.5 pl-11 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                GPA
                            </label>
                            <input
                                type="text"
                                value={editingIndex !== null ? educations[editingIndex].gpa : newEducation.gpa}
                                onChange={(e) => handleInputChange('gpa', e.target.value)}
                                placeholder="e.g., 3.8/4.0"
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Honors/Awards (comma separated)
                            </label>
                            <input
                                type="text"
                                value={editingIndex !== null ? educations[editingIndex].honors?.join(', ') : newEducation.honors?.join(', ')}
                                onChange={(e) => handleArrayChange('honors', e.target.value)}
                                placeholder="e.g., Summa Cum Laude, Dean's List, Scholarship"
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Description
                            </label>
                            <textarea
                                value={editingIndex !== null ? educations[editingIndex].description : newEducation.description}
                                onChange={(e) => handleInputChange('description', e.target.value)}
                                placeholder="Describe your coursework, thesis, projects, or other relevant information..."
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none resize-none h-32"
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
                            onClick={editingIndex !== null ? saveEdit : addEducation}
                            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                        >
                            {editingIndex !== null ? 'Save Changes' : 'Add Education'}
                        </button>
                    </div>
                </div>
            )}

            {/* Educations List */}
            {educations.length > 0 ? (
                <div className="space-y-6">
                    <h4 className="text-lg font-semibold text-gray-900">
                        Your Education ({educations.length})
                    </h4>

                    {educations.map((edu, index) => (
                        <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h5 className="text-xl font-bold text-gray-900">{edu.degree}</h5>
                                    <p className="text-lg text-gray-700">{edu.institution}</p>
                                    <div className="flex items-center space-x-4 mt-2">
                                        <span className="flex items-center space-x-1 text-gray-600">
                                            <CalendarIcon className="w-4 h-4" />
                                            <span>
                                                {new Date(edu.startDate).toLocaleDateString('en-US', {
                                                    month: 'short',
                                                    year: 'numeric'
                                                })}
                                                {' - '}
                                                {edu.current
                                                    ? 'Present'
                                                    : new Date(edu.endDate).toLocaleDateString('en-US', {
                                                        month: 'short',
                                                        year: 'numeric'
                                                    })
                                                }
                                            </span>
                                        </span>
                                        {edu.location && (
                                            <span className="flex items-center space-x-1 text-gray-600">
                                                <MapPinIcon className="w-4 h-4" />
                                                <span>{edu.location}</span>
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
                                        onClick={() => removeEducation(index)}
                                        className="p-2 text-gray-600 hover:text-red-600"
                                        title="Remove"
                                    >
                                        <TrashIcon className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            {edu.fieldOfStudy && (
                                <p className="text-gray-700 mb-2">
                                    <span className="font-medium">Field:</span> {edu.fieldOfStudy}
                                </p>
                            )}

                            {edu.gpa && (
                                <p className="text-gray-700 mb-2">
                                    <span className="font-medium">GPA:</span> {edu.gpa}
                                </p>
                            )}

                            {edu.description && (
                                <p className="text-gray-700 mb-4">{edu.description}</p>
                            )}

                            {edu.honors && edu.honors.length > 0 && (
                                <div>
                                    <h6 className="font-medium text-gray-900 mb-2">Honors & Awards:</h6>
                                    <div className="flex flex-wrap gap-2">
                                        {edu.honors.map((honor, i) => (
                                            <span
                                                key={i}
                                                className="px-3 py-1 text-sm bg-yellow-50 text-yellow-800 rounded-full"
                                            >
                                                {honor}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 bg-gray-50 rounded-xl">
                    <AcademicCapIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h4 className="text-xl font-medium text-gray-900 mb-2">No education added yet</h4>
                    <p className="text-gray-600 mb-6">Add your educational background to showcase your qualifications</p>
                    <button
                        onClick={() => setIsAdding(true)}
                        className="inline-flex items-center space-x-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                    >
                        <PlusIcon className="w-5 h-5" />
                        <span>Add Your First Education</span>
                    </button>
                </div>
            )}
        </div>
    );
};

export default EducationForm;