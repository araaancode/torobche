// client/src/components/forms/SkillsForm.jsx
import React, { useState } from 'react';
import {
    PlusIcon,
    TrashIcon,
    PencilIcon,
    XMarkIcon,
    StarIcon,
    WrenchScrewdriverIcon
} from '@heroicons/react/24/outline';

const SkillsForm = ({ data = [], onUpdate }) => {
    const [skills, setSkills] = useState(data.length > 0 ? data : []);
    const [editingIndex, setEditingIndex] = useState(null);
    const [isAdding, setIsAdding] = useState(false);

    const defaultSkill = {
        category: '',
        items: []
    };

    const defaultSkillItem = {
        name: '',
        level: 3,
        yearsOfExperience: '',
        lastUsed: null
    };

    const [newSkill, setNewSkill] = useState(defaultSkill);
    const [newSkillItem, setNewSkillItem] = useState(defaultSkillItem);
    const [addingItem, setAddingItem] = useState(false);

    const commonCategories = [
        'Technical Skills',
        'Programming Languages',
        'Frameworks & Libraries',
        'Databases',
        'Tools & Platforms',
        'Soft Skills',
        'Languages',
        'Certifications',
        'Other Skills'
    ];

    const proficiencyLevels = [
        { value: 1, label: 'Beginner' },
        { value: 2, label: 'Basic' },
        { value: 3, label: 'Intermediate' },
        { value: 4, label: 'Advanced' },
        { value: 5, label: 'Expert' }
    ];

    const handleInputChange = (field, value) => {
        if (editingIndex !== null) {
            const updated = [...skills];
            updated[editingIndex] = { ...updated[editingIndex], [field]: value };
            setSkills(updated);
            onUpdate(updated);
        } else {
            setNewSkill({ ...newSkill, [field]: value });
        }
    };

    const handleSkillItemChange = (field, value) => {
        setNewSkillItem({ ...newSkillItem, [field]: value });
    };

    const addSkillCategory = () => {
        if (!newSkill.category) {
            alert('Please enter a category name');
            return;
        }

        const updated = [...skills, newSkill];
        setSkills(updated);
        onUpdate(updated);
        setNewSkill(defaultSkill);
        setIsAdding(false);
    };

    const addSkillItem = (categoryIndex) => {
        if (!newSkillItem.name) {
            alert('Please enter a skill name');
            return;
        }

        const updated = [...skills];
        if (!updated[categoryIndex].items) {
            updated[categoryIndex].items = [];
        }
        updated[categoryIndex].items.push({ ...newSkillItem });
        setSkills(updated);
        onUpdate(updated);
        setNewSkillItem(defaultSkillItem);
        setAddingItem(null);
    };

    const removeSkillCategory = (index) => {
        const updated = skills.filter((_, i) => i !== index);
        setSkills(updated);
        onUpdate(updated);
        if (editingIndex === index) {
            setEditingIndex(null);
        }
    };

    const removeSkillItem = (categoryIndex, itemIndex) => {
        const updated = [...skills];
        updated[categoryIndex].items = updated[categoryIndex].items.filter((_, i) => i !== itemIndex);
        setSkills(updated);
        onUpdate(updated);
    };

    const updateSkillItemLevel = (categoryIndex, itemIndex, level) => {
        const updated = [...skills];
        updated[categoryIndex].items[itemIndex].level = level;
        setSkills(updated);
        onUpdate(updated);
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-2xl font-bold text-gray-900">Skills</h3>
                    <p className="text-gray-600">Add your skills and expertise</p>
                </div>
                <button
                    onClick={() => setIsAdding(true)}
                    className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                >
                    <PlusIcon className="w-5 h-5" />
                    <span>Add Skill Category</span>
                </button>
            </div>

            {/* Add Skill Category Form */}
            {isAdding && (
                <div className="bg-gray-50 p-6 rounded-xl">
                    <div className="flex items-center justify-between mb-4">
                        <h4 className="text-lg font-semibold text-gray-900">Add New Skill Category</h4>
                        <button
                            onClick={() => setIsAdding(false)}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            <XMarkIcon className="w-6 h-6" />
                        </button>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Category Name *
                            </label>
                            <div className="space-y-4">
                                <input
                                    type="text"
                                    value={newSkill.category}
                                    onChange={(e) => handleInputChange('category', e.target.value)}
                                    placeholder="e.g., Programming Languages"
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                                />

                                <div>
                                    <p className="text-sm text-gray-600 mb-2">Common categories:</p>
                                    <div className="flex flex-wrap gap-2">
                                        {commonCategories.map(category => (
                                            <button
                                                key={category}
                                                type="button"
                                                onClick={() => handleInputChange('category', category)}
                                                className="px-3 py-1.5 text-sm bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                                            >
                                                {category}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={() => setIsAdding(false)}
                                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={addSkillCategory}
                                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                            >
                                Add Category
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Add Skill Item Form */}
            {addingItem !== null && (
                <div className="bg-gray-50 p-6 rounded-xl">
                    <div className="flex items-center justify-between mb-4">
                        <h4 className="text-lg font-semibold text-gray-900">
                            Add Skill to {skills[addingItem]?.category}
                        </h4>
                        <button
                            onClick={() => setAddingItem(null)}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            <XMarkIcon className="w-6 h-6" />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Skill Name *
                            </label>
                            <input
                                type="text"
                                value={newSkillItem.name}
                                onChange={(e) => handleSkillItemChange('name', e.target.value)}
                                placeholder="e.g., JavaScript, React, Project Management"
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Proficiency Level
                            </label>
                            <div className="space-y-3">
                                <div className="flex items-center space-x-4">
                                    {proficiencyLevels.map(level => (
                                        <button
                                            key={level.value}
                                            type="button"
                                            onClick={() => handleSkillItemChange('level', level.value)}
                                            className={`flex flex-col items-center ${newSkillItem.level === level.value ? 'text-primary-600' : 'text-gray-500'
                                                }`}
                                        >
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${newSkillItem.level >= level.value
                                                    ? 'bg-primary-100 text-primary-600'
                                                    : 'bg-gray-100 text-gray-400'
                                                }`}>
                                                {level.value}
                                            </div>
                                            <span className="text-xs mt-1">{level.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Years of Experience
                            </label>
                            <input
                                type="number"
                                value={newSkillItem.yearsOfExperience}
                                onChange={(e) => handleSkillItemChange('yearsOfExperience', e.target.value)}
                                placeholder="e.g., 5"
                                min="0"
                                max="50"
                                step="0.5"
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Last Used
                            </label>
                            <select
                                value={newSkillItem.lastUsed}
                                onChange={(e) => handleSkillItemChange('lastUsed', e.target.value)}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                            >
                                <option value="">Select</option>
                                <option value="currently_using">Currently Using</option>
                                <option value="last_6_months">Last 6 Months</option>
                                <option value="last_year">Last Year</option>
                                <option value="1-2_years">1-2 Years Ago</option>
                                <option value="3+_years">3+ Years Ago</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex justify-end space-x-3 mt-6">
                        <button
                            onClick={() => setAddingItem(null)}
                            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => addSkillItem(addingItem)}
                            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                        >
                            Add Skill
                        </button>
                    </div>
                </div>
            )}

            {/* Skills List */}
            {skills.length > 0 ? (
                <div className="space-y-8">
                    {skills.map((skillCategory, categoryIndex) => (
                        <div key={categoryIndex} className="bg-white border border-gray-200 rounded-xl p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h4 className="text-xl font-bold text-gray-900">
                                    {skillCategory.category}
                                </h4>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => setAddingItem(categoryIndex)}
                                        className="flex items-center space-x-1 px-3 py-1.5 text-sm bg-primary-50 text-primary-700 rounded-lg hover:bg-primary-100"
                                    >
                                        <PlusIcon className="w-4 h-4" />
                                        <span>Add Skill</span>
                                    </button>
                                    <button
                                        onClick={() => removeSkillCategory(categoryIndex)}
                                        className="p-1.5 text-gray-500 hover:text-red-600"
                                        title="Remove Category"
                                    >
                                        <TrashIcon className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            {skillCategory.items && skillCategory.items.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {skillCategory.items.map((skill, itemIndex) => (
                                        <div key={itemIndex} className="border border-gray-100 rounded-lg p-4 hover:bg-gray-50">
                                            <div className="flex justify-between items-start mb-3">
                                                <h5 className="font-semibold text-gray-900">{skill.name}</h5>
                                                <button
                                                    onClick={() => removeSkillItem(categoryIndex, itemIndex)}
                                                    className="text-gray-400 hover:text-red-500"
                                                    title="Remove Skill"
                                                >
                                                    <XMarkIcon className="w-4 h-4" />
                                                </button>
                                            </div>

                                            <div className="space-y-3">
                                                <div>
                                                    <div className="flex justify-between items-center mb-1">
                                                        <span className="text-sm text-gray-600">Proficiency</span>
                                                        <span className="text-sm font-medium">
                                                            {proficiencyLevels.find(l => l.value === skill.level)?.label || 'Intermediate'}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center space-x-1">
                                                        {[1, 2, 3, 4, 5].map(level => (
                                                            <button
                                                                key={level}
                                                                onClick={() => updateSkillItemLevel(categoryIndex, itemIndex, level)}
                                                                className={`w-6 h-2 rounded ${skill.level >= level
                                                                        ? 'bg-primary-500'
                                                                        : 'bg-gray-200'
                                                                    }`}
                                                                title={`Set to ${proficiencyLevels.find(l => l.value === level)?.label}`}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>

                                                {skill.yearsOfExperience && (
                                                    <div className="text-sm text-gray-600">
                                                        <span className="font-medium">Experience:</span> {skill.yearsOfExperience} years
                                                    </div>
                                                )}

                                                {skill.lastUsed && (
                                                    <div className="text-sm text-gray-600">
                                                        <span className="font-medium">Last Used:</span> {
                                                            skill.lastUsed === 'currently_using' ? 'Currently Using' :
                                                                skill.lastUsed === 'last_6_months' ? 'Last 6 Months' :
                                                                    skill.lastUsed === 'last_year' ? 'Last Year' :
                                                                        skill.lastUsed === '1-2_years' ? '1-2 Years Ago' :
                                                                            '3+ Years Ago'
                                                        }
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8 bg-gray-50 rounded-lg">
                                    <WrenchScrewdriverIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                                    <p className="text-gray-600">No skills added to this category yet</p>
                                    <button
                                        onClick={() => setAddingItem(categoryIndex)}
                                        className="mt-3 inline-flex items-center space-x-1 px-4 py-2 text-sm bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                                    >
                                        <PlusIcon className="w-4 h-4" />
                                        <span>Add First Skill</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 bg-gray-50 rounded-xl">
                    <WrenchScrewdriverIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h4 className="text-xl font-medium text-gray-900 mb-2">No skills added yet</h4>
                    <p className="text-gray-600 mb-6">Add your skills to showcase your expertise</p>
                    <button
                        onClick={() => setIsAdding(true)}
                        className="inline-flex items-center space-x-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                    >
                        <PlusIcon className="w-5 h-5" />
                        <span>Add Your First Skill Category</span>
                    </button>
                </div>
            )}

            {/* Tips */}
            <div className="p-6 bg-blue-50 rounded-xl border border-blue-100">
                <h4 className="text-lg font-semibold text-blue-900 mb-3">💡 Tips for Adding Skills</h4>
                <ul className="space-y-2 text-blue-800">
                    <li>• Group similar skills together (e.g., Programming Languages, Tools, Soft Skills)</li>
                    <li>• Be honest about your proficiency level</li>
                    <li>• Include both technical and soft skills</li>
                    <li>• Add skills relevant to the jobs you're targeting</li>
                    <li>• Update skills that you're currently using or learning</li>
                </ul>
            </div>
        </div>
    );
};

export default SkillsForm;