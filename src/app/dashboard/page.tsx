'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
// import Link from 'next/link';

interface Job {
  id: string;
  title: string;
  location: string;
  country: string;
  type: string;
  salaryMin: number;
  salaryMax: number;
  currency: string;
  status: 'active' | 'paused' | 'closed';
  applicationsCount: number;
  createdAt: string;
  technologies: string[];
}

interface Application {
  id: string;
  jobTitle: string;
  candidateName: string;
  candidateEmail: string;
  status: 'pending' | 'reviewing' | 'interview' | 'offer' | 'rejected';
  appliedAt: string;
  coverLetter?: string;
}

export default function CompanyDashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'overview' | 'jobs' | 'applications' | 'analytics'>('overview');

  // Mock data - in real app, this would come from Supabase
  const [jobs] = useState<Job[]>([
    {
      id: '1',
      title: 'Senior React Developer',
      location: 'Amsterdam',
      country: 'Netherlands',
      type: 'full-time',
      salaryMin: 65000,
      salaryMax: 85000,
      currency: 'EUR',
      status: 'active',
      applicationsCount: 23,
      createdAt: '2024-01-15',
      technologies: ['React', 'TypeScript', 'Node.js']
    },
    {
      id: '2',
      title: 'DevOps Engineer',
      location: 'Amsterdam',
      country: 'Netherlands',
      type: 'full-time',
      salaryMin: 70000,
      salaryMax: 90000,
      currency: 'EUR',
      status: 'active',
      applicationsCount: 15,
      createdAt: '2024-01-10',
      technologies: ['AWS', 'Kubernetes', 'Docker']
    }
  ]);

  const [applications] = useState<Application[]>([
    {
      id: '1',
      jobTitle: 'Senior React Developer',
      candidateName: 'Mehmet Akın',
      candidateEmail: 'mehmet@example.com',
      status: 'pending',
      appliedAt: '2024-01-20',
      coverLetter: 'I am very interested in this position...'
    },
    {
      id: '2',
      jobTitle: 'Senior React Developer',
      candidateName: 'Ayşe Yılmaz',
      candidateEmail: 'ayse@example.com',
      status: 'reviewing',
      appliedAt: '2024-01-19'
    },
    {
      id: '3',
      jobTitle: 'DevOps Engineer',
      candidateName: 'Emre Kaya',
      candidateEmail: 'emre@example.com',
      status: 'interview',
      appliedAt: '2024-01-18'
    }
  ]);

  useEffect(() => {
    if (!user || user.type !== 'company') {
      router.push('/');
    }
  }, [user, router]);

  if (!user || user.type !== 'company') {
    return null;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      case 'closed': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-blue-100 text-blue-800';
      case 'reviewing': return 'bg-yellow-100 text-yellow-800';
      case 'interview': return 'bg-purple-100 text-purple-800';
      case 'offer': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalApplications = applications.length;
  const pendingApplications = applications.filter(app => app.status === 'pending').length;
  const activeJobs = jobs.filter(job => job.status === 'active').length;

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Company Dashboard</h1>
          <p className="text-gray-600">
            Welcome back, {user.name}! Manage your job postings and applications.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'overview', name: 'Overview', icon: '📊' },
                { id: 'jobs', name: 'Job Postings', icon: '💼' },
                { id: 'applications', name: 'Applications', icon: '📋' },
                { id: 'analytics', name: 'Analytics', icon: '📈' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as 'overview' | 'jobs' | 'applications' | 'analytics')}
                  className={`py-4 px-2 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                      <span className="text-white text-sm">💼</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Active Jobs</p>
                    <p className="text-2xl font-semibold text-gray-900">{activeJobs}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                      <span className="text-white text-sm">📋</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Total Applications</p>
                    <p className="text-2xl font-semibold text-gray-900">{totalApplications}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center">
                      <span className="text-white text-sm">⏳</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Pending Review</p>
                    <p className="text-2xl font-semibold text-gray-900">{pendingApplications}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center">
                      <span className="text-white text-sm">👥</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Avg. Applications</p>
                    <p className="text-2xl font-semibold text-gray-900">{Math.round(totalApplications / activeJobs)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Applications */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Recent Applications</h2>
                <button
                  onClick={() => setActiveTab('applications')}
                  className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                >
                  View All →
                </button>
              </div>
              <div className="space-y-4">
                {applications.slice(0, 3).map((application) => (
                  <div key={application.id} className="flex items-center justify-between border-b border-gray-100 pb-4">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{application.candidateName}</h3>
                      <p className="text-sm text-gray-600">{application.jobTitle}</p>
                      <p className="text-xs text-gray-500">Applied {application.appliedAt}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(application.status)}`}>
                      {application.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'jobs' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Job Postings</h2>
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                + Post New Job
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Job Title
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Location
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Salary
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Applications
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {jobs.map((job) => (
                      <tr key={job.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{job.title}</div>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {job.technologies.slice(0, 3).map((tech, i) => (
                                <span key={i} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{job.location}</div>
                          <div className="text-sm text-gray-500">{job.country}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {job.currency} {job.salaryMin.toLocaleString()} - {job.salaryMax.toLocaleString()}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-indigo-600">{job.applicationsCount}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(job.status)}`}>
                            {job.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="text-indigo-600 hover:text-indigo-900 mr-3">Edit</button>
                          <button className="text-red-600 hover:text-red-900">Pause</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'applications' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Applications</h2>
              <div className="flex space-x-2">
                <select className="border border-gray-300 rounded-md px-3 py-2 text-sm">
                  <option>All Jobs</option>
                  <option>Senior React Developer</option>
                  <option>DevOps Engineer</option>
                </select>
                <select className="border border-gray-300 rounded-md px-3 py-2 text-sm">
                  <option>All Status</option>
                  <option>Pending</option>
                  <option>Reviewing</option>
                  <option>Interview</option>
                </select>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="space-y-4 p-6">
                {applications.map((application) => (
                  <div key={application.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900">{application.candidateName}</h3>
                        <p className="text-sm text-gray-600">{application.candidateEmail}</p>
                        <p className="text-sm text-gray-500">Applied for: {application.jobTitle}</p>
                        <p className="text-xs text-gray-500">Applied on {application.appliedAt}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(application.status)}`}>
                        {application.status}
                      </span>
                    </div>
                    
                    {application.coverLetter && (
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Cover Letter:</h4>
                        <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                          {application.coverLetter}
                        </p>
                      </div>
                    )}
                    
                    <div className="flex space-x-3">
                      <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                        View CV
                      </button>
                      <button className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700">
                        Accept
                      </button>
                      <button className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700">
                        Reject
                      </button>
                      <button className="border border-gray-300 px-3 py-1 rounded text-sm hover:bg-gray-50">
                        Schedule Interview
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Analytics</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Trends</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">This Week</span>
                    <span className="font-semibold">12 applications</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Last Week</span>
                    <span className="font-semibold">8 applications</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Growth</span>
                    <span className="font-semibold text-green-600">+50%</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Skills in Applications</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">React</span>
                    <span className="font-semibold">18 candidates</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">TypeScript</span>
                    <span className="font-semibold">15 candidates</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Node.js</span>
                    <span className="font-semibold">12 candidates</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">AWS</span>
                    <span className="font-semibold">8 candidates</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}