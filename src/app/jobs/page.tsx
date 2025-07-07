'use client';

import { useState, useEffect } from 'react';
import JobCard from '@/components/JobCard';
import { Job, mockJobs, searchJobs, EU_COUNTRIES } from '@/lib/mockData';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import LoginModal from '@/components/auth/LoginModal';

export default function JobsPage() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [jobs, setJobs] = useState<Job[]>(mockJobs);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedExperience, setSelectedExperience] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [salaryMin, setSalaryMin] = useState('');
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [visaSponsorshipOnly, setVisaSponsorshipOnly] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [sortBy, setSortBy] = useState('latest');

  useEffect(() => {
    setLoading(true);
    
    // Simulate API call delay
    const timer = setTimeout(() => {
      const searchCountry = selectedCountry === t.home.allCountries ? 'Tüm Ülkeler' : selectedCountry;
      let filteredJobs = searchJobs(searchQuery, searchCountry);
      
      // Apply additional filters
      if (selectedExperience) {
        filteredJobs = filteredJobs.filter(job => job.experienceLevel === selectedExperience);
      }
      
      if (selectedType) {
        filteredJobs = filteredJobs.filter(job => job.type === selectedType);
      }
      
      if (salaryMin) {
        filteredJobs = filteredJobs.filter(job => job.salaryMin >= parseInt(salaryMin));
      }
      
      if (remoteOnly) {
        filteredJobs = filteredJobs.filter(job => job.remote);
      }
      
      if (visaSponsorshipOnly) {
        filteredJobs = filteredJobs.filter(job => job.visaSponsorship);
      }
      
      // Apply sorting
      switch (sortBy) {
        case 'salary-high':
          filteredJobs.sort((a, b) => b.salaryMax - a.salaryMax);
          break;
        case 'salary-low':
          filteredJobs.sort((a, b) => a.salaryMin - b.salaryMin);
          break;
        case 'latest':
        default:
          filteredJobs.sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime());
          break;
      }
      
      setJobs(filteredJobs);
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, selectedCountry, selectedExperience, selectedType, salaryMin, remoteOnly, visaSponsorshipOnly, sortBy, t.home.allCountries]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is handled by useEffect
  };

  const countries = [t.home.allCountries, ...EU_COUNTRIES];
  
  // Initialize selectedCountry with translated value
  useEffect(() => {
    if (!selectedCountry) {
      setSelectedCountry(t.home.allCountries);
    }
  }, [t.home.allCountries, selectedCountry]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{t.jobs.title}</h1>
          <p className="text-gray-600">
            {t.jobs.subtitle}
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <form onSubmit={handleSearch} className="space-y-4">
            {/* Main search bar */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder={t.jobs.searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="md:w-64">
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {countries.map(country => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
              >
                {t.jobs.filterButton}
              </button>
            </div>
            
            {/* Advanced filters */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-gray-200">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Experience Level</label>
                <select
                  value={selectedExperience}
                  onChange={(e) => setSelectedExperience(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">All Levels</option>
                  <option value="junior">Junior (0-2 years)</option>
                  <option value="mid">Mid (2-5 years)</option>
                  <option value="senior">Senior (5+ years)</option>
                  <option value="lead">Lead/Principal</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Job Type</label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">All Types</option>
                  <option value="full-time">Full-time</option>
                  <option value="part-time">Part-time</option>
                  <option value="contract">Contract</option>
                  <option value="internship">Internship</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Min. Salary (EUR)</label>
                <input
                  type="number"
                  value={salaryMin}
                  onChange={(e) => setSalaryMin(e.target.value)}
                  placeholder="e.g., 50000"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="latest">Latest Posted</option>
                  <option value="salary-high">Salary: High to Low</option>
                  <option value="salary-low">Salary: Low to High</option>
                </select>
              </div>
            </div>
            
            {/* Checkboxes */}
            <div className="flex flex-wrap gap-6 pt-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={remoteOnly}
                  onChange={(e) => setRemoteOnly(e.target.checked)}
                  className="mr-2 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700">Remote Work Available</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={visaSponsorshipOnly}
                  onChange={(e) => setVisaSponsorshipOnly(e.target.checked)}
                  className="mr-2 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700">Visa Sponsorship Available</span>
              </label>
            </div>
          </form>
        </div>

        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-gray-600">
            {loading ? t.jobs.searching : `${jobs.length} ${t.jobs.resultsFound}`}
            {selectedCountry !== t.home.allCountries && ` (${selectedCountry})`}
            {searchQuery && ` - "${searchQuery}" için`}
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        )}

        {/* Job Cards */}
        {!loading && (
          <div className="grid gap-6">
            {jobs.length > 0 ? (
              jobs.map(job => (
                <JobCard 
                  key={job.id} 
                  job={job} 
                  onApply={() => {
                    if (!user) {
                      setIsLoginModalOpen(true);
                    } else {
                      // Handle application logic
                      alert('Application functionality will be implemented!');
                    }
                  }}
                />
              ))
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {t.jobs.noResults.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {t.jobs.noResults.description}
                </p>
                <button 
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCountry(t.home.allCountries);
                    setSelectedExperience('');
                    setSelectedType('');
                    setSalaryMin('');
                    setRemoteOnly(false);
                    setVisaSponsorshipOnly(false);
                  }}
                  className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors"
                >
                  {t.jobs.noResults.clearFilters}
                </button>
              </div>
            )}
          </div>
        )}
        
        <LoginModal 
          isOpen={isLoginModalOpen} 
          onClose={() => setIsLoginModalOpen(false)} 
          defaultType="individual"
        />
      </div>
    </div>
  );
}