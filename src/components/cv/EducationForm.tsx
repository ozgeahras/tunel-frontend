'use client';

import { useState } from 'react';
import { Education } from '@/lib/cvData';

interface EducationFormProps {
  education: Education[];
  onChange: (education: Education[]) => void;
}

export default function EducationForm({ education, onChange }: EducationFormProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const addEducation = () => {
    const newEducation: Education = {
      id: crypto.randomUUID(),
      institution: '',
      degree: '',
      field: '',
      location: '',
      startDate: '',
      endDate: '',
      gpa: '',
      description: '',
      isCurrentlyStudying: false
    };
    onChange([...education, newEducation]);
    setEditingIndex(education.length);
  };

  const updateEducation = (index: number, field: keyof Education, value: string | boolean | undefined) => {
    const updated = education.map((edu, i) => 
      i === index ? { ...edu, [field]: value } : edu
    );
    onChange(updated);
  };

  const removeEducation = (index: number) => {
    onChange(education.filter((_, i) => i !== index));
    setEditingIndex(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Education</h3>
        <button
          onClick={addEducation}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors text-sm"
        >
          + Add Education
        </button>
      </div>

      {education.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>No education added yet.</p>
          <p className="text-sm">Click &quot;Add Education&quot; to get started.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {education.map((edu, index) => (
            <div key={edu.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  {editingIndex === index ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Institution *
                          </label>
                          <input
                            type="text"
                            value={edu.institution}
                            onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Istanbul Technical University"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Degree *
                          </label>
                          <input
                            type="text"
                            value={edu.degree}
                            onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Bachelor of Science"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Field of Study *
                          </label>
                          <input
                            type="text"
                            value={edu.field}
                            onChange={(e) => updateEducation(index, 'field', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Computer Engineering"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Location
                          </label>
                          <input
                            type="text"
                            value={edu.location}
                            onChange={(e) => updateEducation(index, 'location', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Istanbul, Turkey"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Start Date *
                          </label>
                          <input
                            type="month"
                            value={edu.startDate}
                            onChange={(e) => updateEducation(index, 'startDate', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            End Date
                          </label>
                          <input
                            type="month"
                            value={edu.endDate || ''}
                            onChange={(e) => updateEducation(index, 'endDate', e.target.value)}
                            disabled={edu.isCurrentlyStudying}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            GPA
                          </label>
                          <input
                            type="text"
                            value={edu.gpa || ''}
                            onChange={(e) => updateEducation(index, 'gpa', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="3.4/4.0"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={edu.isCurrentlyStudying}
                            onChange={(e) => {
                              updateEducation(index, 'isCurrentlyStudying', e.target.checked);
                              if (e.target.checked) {
                                updateEducation(index, 'endDate', undefined);
                              }
                            }}
                            className="mr-2"
                          />
                          <span className="text-sm text-gray-700">I am currently studying here</span>
                        </label>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Description
                        </label>
                        <textarea
                          value={edu.description || ''}
                          onChange={(e) => updateEducation(index, 'description', e.target.value)}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          placeholder="Relevant coursework, thesis, achievements..."
                        />
                      </div>
                    </div>
                  ) : (
                    <div>
                      <h4 className="font-semibold text-gray-900">{edu.degree} in {edu.field}</h4>
                      <p className="text-gray-700">{edu.institution}</p>
                      <p className="text-sm text-gray-500">
                        {edu.startDate} - {edu.isCurrentlyStudying ? 'Present' : edu.endDate} • {edu.location}
                      </p>
                      {edu.gpa && (
                        <p className="text-sm text-gray-600 mt-1">GPA: {edu.gpa}</p>
                      )}
                      {edu.description && (
                        <p className="text-sm text-gray-600 mt-2">{edu.description}</p>
                      )}
                    </div>
                  )}
                </div>
                
                <div className="flex space-x-2 ml-4">
                  <button
                    onClick={() => setEditingIndex(editingIndex === index ? null : index)}
                    className="text-indigo-600 hover:text-indigo-800 text-sm"
                  >
                    {editingIndex === index ? 'Save' : 'Edit'}
                  </button>
                  <button
                    onClick={() => removeEducation(index)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}