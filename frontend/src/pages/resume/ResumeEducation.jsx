import React from 'react';
import { useFieldArray } from 'react-hook-form';
import { FaPlus, FaTrash } from 'react-icons/fa';

const Education = ({ control, watch, setValue }) => {
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'education'
    });

    const addEducation = () => {
        append({
            institution: '',
            degree: '',
            field: '',
            startDate: '',
            endDate: '',
            description: '',
            isCurrent: false,
        });
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Education History</h3>
                <button
                    type="button"
                    onClick={addEducation}
                    className="btn btn-primary flex items-center space-x-2"
                >
                    <FaPlus />
                    <span>Add Education</span>
                </button>
            </div>

            {fields.length === 0 ? (
                <div className="text-center py-8 bg-gray-50 rounded-lg">
                    <p className="text-gray-500">No education added yet. Add your first education entry.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {fields.map((field, index) => (
                        <div key={field.id} className="card relative">
                            <button
                                type="button"
                                onClick={() => remove(index)}
                                className="absolute top-4 right-4 text-red-500 hover:text-red-700"
                            >
                                <FaTrash />
                            </button>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="form-group">
                                    <label className="form-label">Institution *</label>
                                    <input
                                        {...register(`education.${index}.institution`)}
                                        className="form-input"
                                        placeholder="University Name"
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Degree *</label>
                                    <input
                                        {...register(`education.${index}.degree`)}
                                        className="form-input"
                                        placeholder="Bachelor of Science"
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Field of Study *</label>
                                    <input
                                        {...register(`education.${index}.field`)}
                                        className="form-input"
                                        placeholder="Computer Science"
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Start Date *</label>
                                    <input
                                        type="date"
                                        {...register(`education.${index}.startDate`)}
                                        className="form-input"
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">End Date</label>
                                    <input
                                        type="date"
                                        {...register(`education.${index}.endDate`)}
                                        className="form-input"
                                        disabled={watch(`education.${index}.isCurrent`)}
                                    />
                                    <div className="flex items-center mt-2">
                                        <input
                                            type="checkbox"
                                            {...register(`education.${index}.isCurrent`)}
                                            className="mr-2"
                                        />
                                        <label className="text-sm">Currently studying here</label>
                                    </div>
                                </div>
                            </div>

                            <div className="form-group mt-4">
                                <label className="form-label">Description (Optional)</label>
                                <textarea
                                    {...register(`education.${index}.description`)}
                                    className="form-input h-24"
                                    placeholder="Describe your studies, achievements, or relevant coursework..."
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Education;