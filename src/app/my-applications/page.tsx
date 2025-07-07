'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Application {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  country: string;
  appliedAt: string;
  status: 'pending' | 'reviewing' | 'interview' | 'offer' | 'rejected';
  salary: string;
  type: string;
  coverLetter?: string;
}

export default function MyApplicationsPage() {
  const { user } = useAuth();
  const router = useRouter();

  // Mock applications data
  const [applications] = useState<Application[]>([
    {
      id: '1',
      jobTitle: 'Senior React Developer',
      company: 'Spotify',
      location: 'Stockholm',
      country: 'Sweden',
      appliedAt: '2024-01-20',
      status: 'reviewing',
      salary: 'SEK 65,000 - 85,000',
      type: 'Full-time',
      coverLetter: 'I am very excited about this opportunity...'
    },
    {
      id: '2',
      jobTitle: 'Full Stack Developer',
      company: 'Klarna',
      location: 'Berlin',
      country: 'Germany',
      appliedAt: '2024-01-18',
      status: 'interview',
      salary: 'EUR 60,000 - 80,000',
      type: 'Full-time'
    },
    {
      id: '3',
      jobTitle: 'DevOps Engineer',
      company: 'Adyen',
      location: 'Amsterdam',
      country: 'Netherlands',
      appliedAt: '2024-01-15',
      status: 'pending',
      salary: 'EUR 65,000 - 85,000',
      type: 'Full-time'
    },
    {
      id: '4',
      jobTitle: 'Frontend Developer',
      company: 'Booking.com',
      location: 'Amsterdam',
      country: 'Netherlands',
      appliedAt: '2024-01-10',
      status: 'rejected',
      salary: 'EUR 55,000 - 75,000',
      type: 'Full-time'
    }
  ]);

  useEffect(() => {
    if (!user || user.type !== 'individual') {
      router.push('/');
    }
  }, [user, router]);

  if (!user || user.type !== 'individual') {
    return null;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-blue-100 text-blue-800';
      case 'reviewing': return 'bg-yellow-100 text-yellow-800';
      case 'interview': return 'bg-purple-100 text-purple-800';
      case 'offer': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return '⏳';
      case 'reviewing': return '👀';
      case 'interview': return '🎯';
      case 'offer': return '🎉';
      case 'rejected': return '❌';
      default: return '📝';
    }
  };

  const statusCounts = {
    pending: applications.filter(app => app.status === 'pending').length,
    reviewing: applications.filter(app => app.status === 'reviewing').length,
    interview: applications.filter(app => app.status === 'interview').length,
    offer: applications.filter(app => app.status === 'offer').length,
    rejected: applications.filter(app => app.status === 'rejected').length
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Applications</h1>
          <p className="text-gray-600">
            Track your job applications and their progress
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow-md text-center">
            <div className="text-2xl mb-1">📊</div>
            <div className="text-2xl font-bold text-gray-900">{applications.length}</div>
            <div className="text-sm text-gray-600">Total</div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-md text-center">
            <div className="text-2xl mb-1">⏳</div>
            <div className="text-2xl font-bold text-blue-600">{statusCounts.pending}</div>
            <div className="text-sm text-gray-600">Pending</div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-md text-center">
            <div className="text-2xl mb-1">👀</div>
            <div className="text-2xl font-bold text-yellow-600">{statusCounts.reviewing}</div>
            <div className="text-sm text-gray-600">Under Review</div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-md text-center">
            <div className="text-2xl mb-1">🎯</div>
            <div className="text-2xl font-bold text-purple-600">{statusCounts.interview}</div>
            <div className="text-sm text-gray-600">Interview</div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-md text-center">
            <div className="text-2xl mb-1">🎉</div>
            <div className="text-2xl font-bold text-green-600">{statusCounts.offer}</div>
            <div className="text-sm text-gray-600">Offers</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link 
              href="/jobs"
              className="flex items-center p-4 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors"
            >
              <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center mr-4">
                <span className="text-white">🔍</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Find New Jobs</h3>
                <p className="text-sm text-gray-600">Browse latest opportunities</p>
              </div>
            </Link>
            
            <Link 
              href="/profile"
              className="flex items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
            >
              <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center mr-4">
                <span className="text-white">👤</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Update CV</h3>
                <p className="text-sm text-gray-600">Keep your profile current</p>
              </div>
            </Link>
            
            <Link 
              href="/companies"
              className="flex items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
            >
              <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center mr-4">
                <span className="text-white">🏢</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Explore Companies</h3>
                <p className="text-sm text-gray-600">Research potential employers</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Applications List */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">All Applications</h2>
          </div>
          
          <div className="divide-y divide-gray-200">
            {applications.map((application) => (
              <div key={application.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 mr-3">
                        {application.jobTitle}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center ${getStatusColor(application.status)}`}>
                        <span className="mr-1">{getStatusIcon(application.status)}</span>
                        {application.status}
                      </span>
                    </div>
                    
                    <div className="flex items-center text-gray-600 mb-2">
                      <span className="font-medium">{application.company}</span>
                      <span className="mx-2">•</span>
                      <span>{application.location}, {application.country}</span>
                      <span className="mx-2">•</span>
                      <span className="text-indigo-600 font-medium">{application.salary}</span>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-500">
                      <span>Applied on {new Date(application.appliedAt).toLocaleDateString()}</span>
                      <span className="mx-2">•</span>
                      <span>{application.type}</span>
                    </div>
                    
                    {application.coverLetter && (
                      <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-700">
                          <strong>Cover Letter:</strong> {application.coverLetter}
                        </p>
                      </div>
                    )}
                  </div>
                  
                  <div className="ml-6 flex flex-col space-y-2">
                    <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                      View Details
                    </button>
                    {application.status === 'pending' && (
                      <button className="text-red-600 hover:text-red-800 text-sm font-medium">
                        Withdraw
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">💡 Application Tips</h3>
          <ul className="space-y-2 text-blue-800">
            <li>• Follow up on applications that have been pending for more than 2 weeks</li>
            <li>• Keep your CV updated with your latest skills and experiences</li>
            <li>• Research company culture and values before interviews</li>
            <li>• Prepare questions about visa sponsorship process during interviews</li>
            <li>• Network with Turkish professionals already working in Europe</li>
          </ul>
        </div>
      </div>
    </div>
  );
}