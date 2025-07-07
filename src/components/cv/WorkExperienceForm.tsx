'use client';

import { useState } from 'react';
import { WorkExperience } from '@/lib/cvData';

interface WorkExperienceFormProps {
  experiences: WorkExperience[];
  onChange: (experiences: WorkExperience[]) => void;
}

export default function WorkExperienceForm({ experiences, onChange }: WorkExperienceFormProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const addExperience = () => {
    const newExperience: WorkExperience = {
      id: crypto.randomUUID(),
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      isCurrentJob: false,
      description: '',
      achievements: [''],
      technologies: []
    };
    onChange([...experiences, newExperience]);
    setEditingIndex(experiences.length);
  };

  const updateExperience = (index: number, field: keyof WorkExperience, value: string | boolean | string[] | undefined) => {
    const updated = experiences.map((exp, i) => 
      i === index ? { ...exp, [field]: value } : exp
    );
    onChange(updated);
  };

  const removeExperience = (index: number) => {
    onChange(experiences.filter((_, i) => i !== index));
    setEditingIndex(null);
  };

  const addAchievement = (expIndex: number) => {
    const updated = [...experiences];
    updated[expIndex].achievements.push('');
    onChange(updated);
  };

  const updateAchievement = (expIndex: number, achIndex: number, value: string) => {
    const updated = [...experiences];
    updated[expIndex].achievements[achIndex] = value;
    onChange(updated);
  };

  const removeAchievement = (expIndex: number, achIndex: number) => {
    const updated = [...experiences];
    updated[expIndex].achievements.splice(achIndex, 1);
    onChange(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Work Experience</h3>
        <button
          onClick={addExperience}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors text-sm"
        >
          + Add Experience
        </button>
      </div>

      {experiences.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>No work experience added yet.</p>
          <p className="text-sm">Click &quot;Add Experience&quot; to get started.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {experiences.map((exp, index) => (
            <div key={exp.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  {editingIndex === index ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Position *
                          </label>
                          <input
                            type="text"
                            value={exp.position}
                            onChange={(e) => updateExperience(index, 'position', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Senior Software Developer"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Company *
                          </label>
                          <input
                            type="text"
                            value={exp.company}
                            onChange={(e) => updateExperience(index, 'company', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="TechCorp"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Location
                          </label>
                          <input
                            type="text"
                            value={exp.location}
                            onChange={(e) => updateExperience(index, 'location', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Amsterdam, NL"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Start Date *
                          </label>
                          <input
                            type="month"
                            value={exp.startDate}
                            onChange={(e) => updateExperience(index, 'startDate', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            End Date
                          </label>
                          <input
                            type="month"
                            value={exp.endDate || ''}
                            onChange={(e) => updateExperience(index, 'endDate', e.target.value)}
                            disabled={exp.isCurrentJob}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={exp.isCurrentJob}
                            onChange={(e) => {
                              updateExperience(index, 'isCurrentJob', e.target.checked);
                              if (e.target.checked) {
                                updateExperience(index, 'endDate', undefined);
                              }
                            }}
                            className="mr-2"
                          />
                          <span className="text-sm text-gray-700">This is my current job</span>
                        </label>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Description
                        </label>
                        <textarea
                          value={exp.description}
                          onChange={(e) => updateExperience(index, 'description', e.target.value)}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          placeholder="Briefly describe your role and responsibilities..."
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Key Achievements
                        </label>
                        {exp.achievements.map((achievement, achIndex) => (
                          <div key={achIndex} className="flex gap-2 mb-2">
                            <input
                              type="text"
                              value={achievement}
                              onChange={(e) => updateAchievement(index, achIndex, e.target.value)}
                              className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                              placeholder="Improved system performance by 40%"
                            />
                            <button
                              onClick={() => removeAchievement(index, achIndex)}
                              className="text-red-600 hover:text-red-800 px-2"
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                        <button
                          onClick={() => addAchievement(index)}
                          className="text-indigo-600 hover:text-indigo-800 text-sm"
                        >
                          + Add Achievement
                        </button>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Technologies (comma-separated)
                        </label>
                        <input
                          type="text"
                          value={exp.technologies.join(', ')}
                          onChange={(e) => updateExperience(index, 'technologies', e.target.value.split(', ').filter(Boolean))}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          placeholder="React, Node.js, PostgreSQL, AWS"
                        />
                      </div>
                    </div>
                  ) : (
                    <div>
                      <h4 className="font-semibold text-gray-900">{exp.position}</h4>
                      <p className="text-gray-700">{exp.company}</p>
                      <p className="text-sm text-gray-500">
                        {exp.startDate} - {exp.isCurrentJob ? 'Present' : exp.endDate} • {exp.location}
                      </p>
                      {exp.description && (
                        <p className="text-sm text-gray-600 mt-2">{exp.description}</p>
                      )}
                      {exp.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {exp.technologies.map((tech, i) => (
                            <span key={i} className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded text-xs">
                              {tech}
                            </span>
                          ))}
                        </div>
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
                    onClick={() => removeExperience(index)}
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