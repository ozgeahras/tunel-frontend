'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
// import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { CVData, mockUserCV, createEmptyCV, AIAnalysisResult, PersonalInfo, WorkExperience, Education, Skill, Project } from '@/lib/cvData';
import LoginModal from '@/components/auth/LoginModal';
import PersonalInfoForm from '@/components/cv/PersonalInfoForm';
import WorkExperienceForm from '@/components/cv/WorkExperienceForm';
import EducationForm from '@/components/cv/EducationForm';
import SkillsForm from '@/components/cv/SkillsForm';
import ProjectsForm from '@/components/cv/ProjectsForm';
import CVImport from '@/components/cv/CVImport';

type CVSection = 'overview' | 'personal' | 'experience' | 'education' | 'skills' | 'projects' | 'import';

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  // const { t } = useLanguage();
  const [cvData, setCvData] = useState<CVData>(mockUserCV);
  const [activeSection, setActiveSection] = useState<CVSection>('overview');
  const [hasChanges, setHasChanges] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      setIsLoginModalOpen(true);
    }
  }, [user, loading]);

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600 animate-pulse">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-8">
            <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <div className="text-3xl text-white">🔒</div>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Login Required
            </h1>
            <p className="text-gray-600 mb-8 leading-relaxed">
              You need to sign in to access your profile and CV builder. Create your professional CV with our AI-powered tools.
            </p>
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Sign In to Continue
            </button>
          </div>
        </div>
        
        <LoginModal 
          isOpen={isLoginModalOpen} 
          onClose={() => {
            setIsLoginModalOpen(false);
            router.push('/');
          }} 
          defaultType="individual"
        />
      </div>
    );
  }

  // Only show for individual users
  if (user.type !== 'individual') {
    return (
      <div className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-8">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <div className="text-3xl text-white">🏢</div>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
              Company Account
            </h1>
            <p className="text-gray-600 mb-8 leading-relaxed">
              CV Builder is only available for individual users. Companies can access their dashboard to manage job postings and applications.
            </p>
            <button
              onClick={() => router.push('/dashboard')}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  const sections = [
    { id: 'overview' as CVSection, name: 'Overview', icon: '📊' },
    { id: 'personal' as CVSection, name: 'Personal Info', icon: '👤' },
    { id: 'experience' as CVSection, name: 'Experience', icon: '💼' },
    { id: 'education' as CVSection, name: 'Education', icon: '🎓' },
    { id: 'skills' as CVSection, name: 'Skills', icon: '⚡' },
    { id: 'projects' as CVSection, name: 'Projects', icon: '🚀' },
    { id: 'import' as CVSection, name: 'Import CV', icon: '📄' }
  ];

  const updatePersonalInfo = (personalInfo: PersonalInfo) => {
    setCvData(prev => ({ ...prev, personalInfo }));
    setHasChanges(true);
  };

  const updateWorkExperience = (workExperience: WorkExperience[]) => {
    setCvData(prev => ({ ...prev, workExperience }));
    setHasChanges(true);
  };

  const updateEducation = (education: Education[]) => {
    setCvData(prev => ({ ...prev, education }));
    setHasChanges(true);
  };

  const updateSkills = (skills: Skill[]) => {
    setCvData(prev => ({ ...prev, skills }));
    setHasChanges(true);
  };

  const updateProjects = (projects: Project[]) => {
    setCvData(prev => ({ ...prev, projects }));
    setHasChanges(true);
  };

  const handleImportComplete = (result: AIAnalysisResult) => {
    if (result.extractedData) {
      setCvData(prev => ({
        ...prev,
        ...result.extractedData,
        updatedAt: new Date().toISOString()
      }));
      setHasChanges(true);
      setActiveSection('overview');
    }
  };

  const saveCV = () => {
    // In a real app, this would save to backend
    setCvData(prev => ({ ...prev, updatedAt: new Date().toISOString() }));
    setHasChanges(false);
    alert('CV saved successfully!');
  };

  const createNewCV = () => {
    setCvData(createEmptyCV());
    setActiveSection('personal');
    setHasChanges(false);
  };

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">CV Overview</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Personal Information</h4>
                  <p className="text-2xl font-bold text-indigo-600">
                    {cvData.personalInfo.firstName} {cvData.personalInfo.lastName}
                  </p>
                  <p className="text-gray-600">{cvData.personalInfo.email}</p>
                  <p className="text-gray-600">{cvData.personalInfo.location}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Statistics</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Work Experience:</span>
                      <span className="font-medium">{cvData.workExperience.length} positions</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Skills:</span>
                      <span className="font-medium">{cvData.skills.length} skills</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Projects:</span>
                      <span className="font-medium">{cvData.projects.length} projects</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Languages:</span>
                      <span className="font-medium">{cvData.languages.length} languages</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {cvData.personalInfo.summary && (
                <div className="mt-6">
                  <h4 className="font-medium text-gray-700 mb-2">Professional Summary</h4>
                  <p className="text-gray-600">{cvData.personalInfo.summary}</p>
                </div>
              )}
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Experience</h3>
              {cvData.workExperience.length > 0 ? (
                <div className="space-y-4">
                  {cvData.workExperience.slice(0, 2).map((exp) => (
                    <div key={exp.id} className="border-l-4 border-indigo-500 pl-4">
                      <h4 className="font-medium text-gray-900">{exp.position}</h4>
                      <p className="text-gray-700">{exp.company}</p>
                      <p className="text-sm text-gray-500">
                        {exp.startDate} - {exp.isCurrentJob ? 'Present' : exp.endDate}
                      </p>
                      {exp.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {exp.technologies.slice(0, 5).map((tech, i) => (
                            <span key={i} className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded text-xs">
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No work experience added yet.</p>
              )}
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Skills Overview</h3>
              {cvData.skills.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {['Programming', 'Framework', 'Database', 'Cloud'].map(category => {
                    const categorySkills = cvData.skills.filter(skill => skill.category === category);
                    return (
                      <div key={category}>
                        <h4 className="font-medium text-gray-700 mb-2">{category}</h4>
                        <div className="space-y-1">
                          {categorySkills.slice(0, 3).map(skill => (
                            <div key={skill.id} className="text-sm">
                              <span className="text-gray-900">{skill.name}</span>
                              <span className="text-gray-500 ml-1">({skill.level})</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-gray-500">No skills added yet.</p>
              )}
            </div>
          </div>
        );

      case 'personal':
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <PersonalInfoForm 
              data={cvData.personalInfo} 
              onChange={updatePersonalInfo} 
            />
          </div>
        );

      case 'experience':
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <WorkExperienceForm 
              experiences={cvData.workExperience} 
              onChange={updateWorkExperience} 
            />
          </div>
        );

      case 'education':
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <EducationForm 
              education={cvData.education} 
              onChange={updateEducation} 
            />
          </div>
        );

      case 'skills':
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <SkillsForm 
              skills={cvData.skills} 
              onChange={updateSkills} 
            />
          </div>
        );

      case 'projects':
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <ProjectsForm 
              projects={cvData.projects} 
              onChange={updateProjects} 
            />
          </div>
        );

      case 'import':
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <CVImport onImportComplete={handleImportComplete} />
          </div>
        );

      default:
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {sections.find(s => s.id === activeSection)?.name}
            </h3>
            <p className="text-gray-600">This section is coming soon!</p>
          </div>
        );
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">CV Builder</h1>
              <p className="text-gray-600">
                Create and manage your professional CV with AI assistance
              </p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={createNewCV}
                className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                New CV
              </button>
              {hasChanges && (
                <button
                  onClick={saveCV}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Save Changes
                </button>
              )}
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                Export PDF
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-64 bg-white rounded-lg shadow-md p-4 h-fit">
            <nav className="space-y-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeSection === section.id
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span>{section.icon}</span>
                  <span>{section.name}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {renderSectionContent()}
          </div>
        </div>
      </div>
    </div>
  );
}