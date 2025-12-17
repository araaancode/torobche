// client/src/components/forms/ProjectsForm.jsx
import React, { useState } from 'react';
import {
    PlusIcon,
    TrashIcon,
    PencilIcon,
    XMarkIcon,
    LinkIcon,
    CalendarIcon
} from '@heroicons/react/24/outline';
import DatePicker from 'react-datepicker';

const ProjectsForm = ({ data = [], onUpdate }) => {
    const [projects, setProjects] = useState(data.length > 0 ? data : []);
    const [editingIndex, setEditingIndex] = useState(null);
    const [isAdding, setIsAdding] = useState(false);

    const defaultProject = {
        title: '',
        description: '',
        technologies: [],
        link: '',
        startDate: new Date(),
        endDate: new Date(),
        current: false,
        role: '',
        teamSize: '',
        client: ''
    };

    const [newProject, setNewProject] = useState(defaultProject);

    const handleInputChange = (field, value) => {
        if (editingIndex !== null) {
            const updated = [...projects];
            updated[editingIndex] = { ...updated[editingIndex], [field]: value };
            setProjects(updated);
            onUpdate(updated);
        } else {
            setNewProject({ ...newProject, [field]: value });
        }
    };

    const handleArrayChange = (field, value) => {
        const array = value.split(',').map(item => item.trim()).filter(item => item);

        if (editingIndex !== null) {
            const updated = [...projects];
            updated[editingIndex] = { ...updated[editingIndex], [field]: array };
            setProjects(updated);
            onUpdate(updated);
        } else {
            setNewProject({ ...newProject, [field]: array });
        }
    };

    const addProject = () => {
        if (!newProject.title || !newProject.description) {
            alert('Please fill in title and description');
            return;
        }

        const updated = [...projects, newProject];
        setProjects(updated);
        onUpdate(updated);
        setNewProject(defaultProject);
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

    const removeProject = (index) => {
        const updated = projects.filter((_, i) => i !== index);
        setProjects(updated);
        onUpdate(updated);
        if (editingIndex === index) {
            setEditingIndex(null);
        }
    };

    const commonTechnologies = [
        'React', 'Vue', 'Angular', 'Node.js', 'Python', 'Java', 'JavaScript',
        'TypeScript', 'HTML', 'CSS', 'Tailwind', 'Bootstrap', 'MongoDB',
        'PostgreSQL', 'MySQL', 'Firebase', 'AWS', 'Docker', 'Git', 'REST API',
        'GraphQL', 'Next.js', 'Express.js', 'Django', 'Flask', 'Spring Boot'
    ];

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-2xl font-bold text-gray-900">Projects</h3>
                    <p className="text-gray-600">Showcase your personal or professional projects</p>
                </div>
                <button
                    onClick={() => setIsAdding(true)}
                    className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                >
                    <PlusIcon className="w-5 h-5" />
                    <span>Add Project</span>
                </button>
            </div>

            {/* Add/Edit Form */}
            {(isAdding || editingIndex !== null) && (
                <div className="bg-gray-50 p-6 rounded-xl">
                    <div className="flex items-center justify-between mb-4">
                        <h4 className="text-lg font-semibold text-gray-900">
                            {editingIndex !== null ? 'Edit Project' : 'Add New Project'}
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
                                Project Title *
                            </label>
                            <input
                                type="text"
                                value={editingIndex !== null ? projects[editingIndex].title : newProject.title}
                                onChange={(e) => handleInputChange('title', e.target.value)}
                                placeholder="e.g., E-commerce Website"
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Your Role
                            </label>
                            <input
                                type="text"
                                value={editingIndex !== null ? projects[editingIndex].role : newProject.role}
                                onChange={(e) => handleInputChange('role', e.target.value)}
                                placeholder="e.g., Full Stack Developer"
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Client/Organization
                            </label>
                            <input
                                type="text"
                                value={editingIndex !== null ? projects[editingIndex].client : newProject.client}
                                onChange={(e) => handleInputChange('client', e.target.value)}
                                placeholder="e.g., XYZ Company"
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Start Date
                            </label>
                            <div className="relative">
                                <CalendarIcon className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                                <DatePicker
                                    selected={editingIndex !== null ? new Date(projects[editingIndex].startDate) : newProject.startDate}
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
                                        checked={editingIndex !== null ? projects[editingIndex].current : newProject.current}
                                        onChange={(e) => handleInputChange('current', e.target.checked)}
                                        className="w-5 h-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                                    />
                                    <label htmlFor="current" className="text-sm text-gray-700">
                                        Currently working on
                                    </label>
                                </div>

                                {!(editingIndex !== null ? projects[editingIndex].current : newProject.current) && (
                                    <div className="relative">
                                        <CalendarIcon className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                                        <DatePicker
                                            selected={editingIndex !== null ? new Date(projects[editingIndex].endDate) : newProject.endDate}
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
                                Team Size
                            </label>
                            <input
                                type="number"
                                value={editingIndex !== null ? projects[editingIndex].teamSize : newProject.teamSize}
                                onChange={(e) => handleInputChange('teamSize', e.target.value)}
                                placeholder="e.g., 5"
                                min="1"
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Project URL
                            </label>
                            <div className="relative">
                                <LinkIcon className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                                <input
                                    type="url"
                                    value={editingIndex !== null ? projects[editingIndex].link : newProject.link}
                                    onChange={(e) => handleInputChange('link', e.target.value)}
                                    placeholder="https://github.com/username/project"
                                    className="w-full px-4 py-2.5 pl-11 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                                />
                            </div>
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Technologies Used (comma separated)
                            </label>
                            <div className="space-y-3">
                                <input
                                    type="text"
                                    value={editingIndex !== null ? projects[editingIndex].technologies?.join(', ') : newProject.technologies?.join(', ')}
                                    onChange={(e) => handleArrayChange('technologies', e.target.value)}
                                    placeholder="React, Node.js, MongoDB, Tailwind CSS"
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                                />
                                <div>
                                    <p className="text-sm text-gray-600 mb-2">Common technologies:</p>
                                    <div className="flex flex-wrap gap-2">
                                        {commonTechnologies.map(tech => (
                                            <button
                                                key={tech}
                                                type="button"
                                                onClick={() => {
                                                    const current = editingIndex !== null
                                                        ? projects[editingIndex].technologies || []
                                                        : newProject.technologies || [];
                                                    const updated = current.includes(tech)
                                                        ? current.filter(t => t !== tech)
                                                        : [...current, tech];
                                                    handleArrayChange('technologies', updated.join(', '));
                                                }}
                                                className={`px-3 py-1.5 text-sm rounded-lg ${(editingIndex !== null
                                                        ? projects[editingIndex].technologies || []
                                                        : newProject.technologies || []
                                                    ).includes(tech)
                                                        ? 'bg-primary-100 text-primary-700 border border-primary-200'
                                                        : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                                                    }`}
                                            >
                                                {tech}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Project Description *
                            </label>
                            <textarea
                                value={editingIndex !== null ? projects[editingIndex].description : newProject.description}
                                onChange={(e) => handleInputChange('description', e.target.value)}
                                placeholder="Describe the project, your contributions, challenges solved, and outcomes..."
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none resize-none h-40"
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
                            onClick={editingIndex !== null ? saveEdit : addProject}
                            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                        >
                            {editingIndex !== null ? 'Save Changes' : 'Add Project'}
                        </button>
                    </div>
                </div>
            )}

            {/* Projects List */}
            {projects.length > 0 ? (
                <div className="space-y-6">
                    <h4 className="text-lg font-semibold text-gray-900">
                        Your Projects ({projects.length})
                    </h4>

                    {projects.map((project, index) => (
                        <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h5 className="text-xl font-bold text-gray-900">{project.title}</h5>
                                    {project.role && (
                                        <p className="text-lg text-gray-700 mb-1">{project.role}</p>
                                    )}
                                    {project.client && (
                                        <p className="text-gray-600">For: {project.client}</p>
                                    )}
                                    <div className="flex items-center space-x-4 mt-2">
                                        <span className="flex items-center space-x-1 text-gray-600">
                                            <CalendarIcon className="w-4 h-4" />
                                            <span>
                                                {new Date(project.startDate).toLocaleDateString('en-US', {
                                                    month: 'short',
                                                    year: 'numeric'
                                                })}
                                                {' - '}
                                                {project.current
                                                    ? 'Present'
                                                    : new Date(project.endDate).toLocaleDateString('en-US', {
                                                        month: 'short',
                                                        year: 'numeric'
                                                    })
                                                }
                                            </span>
                                        </span>
                                        {project.teamSize && (
                                            <span className="text-gray-600">
                                                Team: {project.teamSize} people
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
                                        onClick={() => removeProject(index)}
                                        className="p-2 text-gray-600 hover:text-red-600"
                                        title="Remove"
                                    >
                                        <TrashIcon className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            <p className="text-gray-700 mb-4">{project.description}</p>

                            {project.technologies && project.technologies.length > 0 && (
                                <div className="mb-4">
                                    <h6 className="font-medium text-gray-900 mb-2">Technologies:</h6>
                                    <div className="flex flex-wrap gap-2">
                                        {project.technologies.map((tech, i) => (
                                            <span
                                                key={i}
                                                className="px-3 py-1 text-sm bg-gray-100 text-gray-800 rounded-full"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {project.link && (
                                <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center space-x-1 text-primary-600 hover:text-primary-700"
                                >
                                    <LinkIcon className="w-4 h-4" />
                                    <span>View Project</span>
                                </a>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 bg-gray-50 rounded-xl">
                    <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <div className="w-8 h-8 bg-primary-500 rounded"></div>
                    </div>
                    <h4 className="text-xl font-medium text-gray-900 mb-2">No projects added yet</h4>
                    <p className="text-gray-600 mb-6">Add your projects to showcase your practical experience</p>
                    <button
                        onClick={() => setIsAdding(true)}
                        className="inline-flex items-center space-x-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                    >
                        <PlusIcon className="w-5 h-5" />
                        <span>Add Your First Project</span>
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProjectsForm;