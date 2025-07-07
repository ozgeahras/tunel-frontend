'use client';

import { useState } from 'react';
import { Skill } from '@/lib/cvData';

interface SkillsFormProps {
  skills: Skill[];
  onChange: (skills: Skill[]) => void;
}

export default function SkillsForm({ skills, onChange }: SkillsFormProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const skillCategories = [
    'Programming',
    'Framework',
    'Database',
    'Cloud',
    'Tool',
    'Language',
    'Soft Skill'
  ] as const;

  const skillLevels = [
    'Beginner',
    'Intermediate',
    'Advanced',
    'Expert'
  ] as const;

  const addSkill = () => {
    const newSkill: Skill = {
      id: crypto.randomUUID(),
      name: '',
      category: 'Programming',
      level: 'Intermediate',
      yearsOfExperience: 1
    };
    onChange([...skills, newSkill]);
    setEditingIndex(skills.length);
  };

  const updateSkill = (index: number, field: keyof Skill, value: string | number) => {
    const updated = skills.map((skill, i) => 
      i === index ? { ...skill, [field]: value } : skill
    );
    onChange(updated);
  };

  const removeSkill = (index: number) => {
    onChange(skills.filter((_, i) => i !== index));
    setEditingIndex(null);
  };

  const getSkillsByCategory = (category: string) => {
    return skills.filter(skill => skill.category === category);
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-gray-100 text-gray-800';
      case 'Intermediate': return 'bg-blue-100 text-blue-800';
      case 'Advanced': return 'bg-green-100 text-green-800';
      case 'Expert': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Skills</h3>
        <button
          onClick={addSkill}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors text-sm"
        >
          + Add Skill
        </button>
      </div>

      {skills.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>No skills added yet.</p>
          <p className="text-sm">Click &quot;Add Skill&quot; to get started.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Skills by Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map(category => {
              const categorySkills = getSkillsByCategory(category);
              if (categorySkills.length === 0) return null;
              
              return (
                <div key={category} className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3">{category}</h4>
                  <div className="space-y-2">
                    {categorySkills.map(skill => (
                      <div key={skill.id} className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">{skill.name}</span>
                        <span className={`px-2 py-1 rounded-full text-xs ${getLevelColor(skill.level)}`}>
                          {skill.level}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* All Skills List */}
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-4">All Skills</h4>
            <div className="space-y-3">
              {skills.map((skill, index) => (
                <div key={skill.id} className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <div className="flex-1">
                    {editingIndex === index ? (
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                          <input
                            type="text"
                            value={skill.name}
                            onChange={(e) => updateSkill(index, 'name', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="React"
                          />
                        </div>
                        <div>
                          <select
                            value={skill.category}
                            onChange={(e) => updateSkill(index, 'category', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          >
                            {skillCategories.map(cat => (
                              <option key={cat} value={cat}>{cat}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <select
                            value={skill.level}
                            onChange={(e) => updateSkill(index, 'level', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          >
                            {skillLevels.map(level => (
                              <option key={level} value={level}>{level}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <input
                            type="number"
                            value={skill.yearsOfExperience || ''}
                            onChange={(e) => updateSkill(index, 'yearsOfExperience', parseInt(e.target.value) || 0)}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Years"
                            min="0"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-4">
                        <span className="font-medium text-gray-900">{skill.name}</span>
                        <span className="text-sm text-gray-500">({skill.category})</span>
                        <span className={`px-2 py-1 rounded-full text-xs ${getLevelColor(skill.level)}`}>
                          {skill.level}
                        </span>
                        {skill.yearsOfExperience && (
                          <span className="text-xs text-gray-500">
                            {skill.yearsOfExperience} years
                          </span>
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
                      onClick={() => removeSkill(index)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}