'use client';

import { useState } from 'react';
import { Project } from '@/lib/cvData';

interface ProjectsFormProps {
  projects: Project[];
  onChange: (projects: Project[]) => void;
}

export default function ProjectsForm({ projects, onChange }: ProjectsFormProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const addProject = () => {
    const newProject: Project = {
      id: crypto.randomUUID(),
      name: '',
      description: '',
      technologies: [],
      url: '',
      github: '',
      startDate: '',
      endDate: '',
      highlights: ['']
    };
    onChange([...projects, newProject]);
    setEditingIndex(projects.length);
  };

  const updateProject = (index: number, field: keyof Project, value: string | string[] | undefined) => {
    const updated = projects.map((project, i) => 
      i === index ? { ...project, [field]: value } : project
    );
    onChange(updated);
  };

  const removeProject = (index: number) => {
    onChange(projects.filter((_, i) => i !== index));
    setEditingIndex(null);
  };

  const addHighlight = (projectIndex: number) => {
    const updated = [...projects];
    updated[projectIndex].highlights.push('');
    onChange(updated);
  };

  const updateHighlight = (projectIndex: number, highlightIndex: number, value: string) => {
    const updated = [...projects];
    updated[projectIndex].highlights[highlightIndex] = value;
    onChange(updated);
  };

  const removeHighlight = (projectIndex: number, highlightIndex: number) => {
    const updated = [...projects];
    updated[projectIndex].highlights.splice(highlightIndex, 1);
    onChange(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Projects</h3>
        <button
          onClick={addProject}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors text-sm"
        >
          + Add Project
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>No projects added yet.</p>
          <p className="text-sm">Click &quot;Add Project&quot; to get started.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {projects.map((project, index) => (
            <div key={project.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  {editingIndex === index ? (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Project Name *
                        </label>
                        <input
                          type="text"
                          value={project.name}
                          onChange={(e) => updateProject(index, 'name', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          placeholder="Tunel Job Platform"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Description *
                        </label>
                        <textarea
                          value={project.description}
                          onChange={(e) => updateProject(index, 'description', e.target.value)}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          placeholder="A comprehensive job platform connecting Turkish developers with European opportunities..."
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Start Date *
                          </label>
                          <input
                            type="month"
                            value={project.startDate}
                            onChange={(e) => updateProject(index, 'startDate', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            End Date
                          </label>
                          <input
                            type="month"
                            value={project.endDate || ''}
                            onChange={(e) => updateProject(index, 'endDate', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          />
                          <p className="text-xs text-gray-500 mt-1">Leave empty if ongoing</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Live URL
                          </label>
                          <input
                            type="url"
                            value={project.url || ''}
                            onChange={(e) => updateProject(index, 'url', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="https://tunel.dev"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            GitHub URL
                          </label>
                          <input
                            type="url"
                            value={project.github || ''}
                            onChange={(e) => updateProject(index, 'github', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="https://github.com/username/project"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Technologies (comma-separated)
                        </label>
                        <input
                          type="text"
                          value={project.technologies.join(', ')}
                          onChange={(e) => updateProject(index, 'technologies', e.target.value.split(', ').filter(Boolean))}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          placeholder="Next.js, React, TypeScript, Tailwind CSS"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Key Highlights
                        </label>
                        {project.highlights.map((highlight, highlightIndex) => (
                          <div key={highlightIndex} className="flex gap-2 mb-2">
                            <input
                              type="text"
                              value={highlight}
                              onChange={(e) => updateHighlight(index, highlightIndex, e.target.value)}
                              className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                              placeholder="Built with Next.js 15 and React 19"
                            />
                            <button
                              onClick={() => removeHighlight(index, highlightIndex)}
                              className="text-red-600 hover:text-red-800 px-2"
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                        <button
                          onClick={() => addHighlight(index)}
                          className="text-indigo-600 hover:text-indigo-800 text-sm"
                        >
                          + Add Highlight
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-semibold text-gray-900">{project.name}</h4>
                        {project.url && (
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-indigo-600 hover:text-indigo-800"
                          >
                            🔗
                          </a>
                        )}
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-600 hover:text-gray-800"
                          >
                            📂
                          </a>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 mb-2">
                        {project.startDate} - {project.endDate || 'Present'}
                      </p>
                      <p className="text-sm text-gray-600 mb-3">{project.description}</p>
                      
                      {project.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-3">
                          {project.technologies.map((tech, i) => (
                            <span key={i} className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded text-xs">
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                      
                      {project.highlights.length > 0 && project.highlights[0] && (
                        <div className="space-y-1">
                          {project.highlights.filter(Boolean).map((highlight, i) => (
                            <div key={i} className="flex items-start">
                              <span className="text-indigo-600 mr-2">•</span>
                              <span className="text-sm text-gray-600">{highlight}</span>
                            </div>
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
                    onClick={() => removeProject(index)}
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