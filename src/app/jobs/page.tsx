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
    <div className="bg-gradient-to-br from-slate-50 to-indigo-50/40 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Enhanced Header */}
        <div className="text-center mb-12">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
              {t.jobs.title}
            </h1>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
              {t.jobs.subtitle}
            </p>
            <div className="mt-6 flex justify-center items-center gap-4 text-sm text-gray-600">
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                Live positions
              </span>
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                Visa support
              </span>
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                Remote friendly
              </span>
            </div>
          </div>
        </div>

        {/* Enhanced Search and Filters */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/50 p-8 mb-8 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
          <form onSubmit={handleSearch} className="space-y-4">
            {/* Enhanced Main search bar */}
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <div className="relative">
                  <input
                    type="text"
                    placeholder={t.jobs.searchPlaceholder}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-lg bg-white/90 shadow-lg"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="md:w-72">
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-lg bg-white/90 shadow-lg"
                >
                  {countries.map(country => (
                    <option key={country} value={country}>
                      {country.includes('🇩🇪') || country.includes('🇳🇱') || country.includes('🇬🇧') || country.includes('🇫🇷') || country.includes('🇨🇭') || country.includes('🇲🇹') ? country : `🌍 ${country}`}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <span className="flex items-center gap-2">
                  {t.jobs.filterButton}
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z"></path>
                  </svg>
                </span>
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

        {/* Enhanced Job Cards */}
        {!loading && (
          <div className="grid gap-8">
            {jobs.length > 0 ? (
              jobs.map((job, index) => (
                <div key={job.id} className="animate-fade-in-up" style={{animationDelay: `${index * 0.1}s`}}>
                  <JobCard 
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
                </div>
              ))
            ) : (
              <div className="text-center py-20 animate-fade-in-up">
                <div className="mb-8">
                  <div className="w-32 h-32 mx-auto bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center text-6xl mb-6 animate-float">
                    🔍
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {t.jobs.noResults.title}
                  </h3>
                  <p className="text-lg text-gray-700 mb-8 max-w-md mx-auto">
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
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    {t.jobs.noResults.clearFilters}
                  </button>
                </div>
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