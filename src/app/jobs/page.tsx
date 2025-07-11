'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import JobCard from '@/components/JobCard';
import { Job, mockJobs, searchJobs } from '@/lib/mockData';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import LoginModal from '@/components/auth/LoginModal';
import SearchDropdown from '@/components/SearchDropdown';
import { searchJobTitles } from '@/lib/job-titles-data';

function JobsContent() {
  const { t, language, getCountryList } = useLanguage();
  const { user } = useAuth();
  const searchParams = useSearchParams();
  
  // Get country list for current language
  const countries = getCountryList();
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

  // Get job title suggestions based on search query
  const jobSuggestions = searchJobTitles(searchQuery, language);

  const handleJobsSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  useEffect(() => {
    setLoading(true);
    
    // Simulate API call delay
    const timer = setTimeout(() => {
      // Find selected country name for search
      const selectedCountryName = countries.find(c => c.key === selectedCountry)?.name || '';
      let filteredJobs = searchJobs(searchQuery, selectedCountryName === countries[0]?.name ? 'Tüm Ülkeler' : selectedCountryName);
      
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
  }, [searchQuery, selectedCountry, selectedExperience, selectedType, salaryMin, remoteOnly, visaSponsorshipOnly, sortBy]); // Remove countries from dependencies

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is handled by useEffect
  };

  // Initialize values from URL params - only run when searchParams change
  useEffect(() => {
    // Get search query from URL
    const urlQuery = searchParams.get('q');
    if (urlQuery) {
      setSearchQuery(urlQuery);
    }

    // Get country from URL  
    const urlCountry = searchParams.get('country');
    if (urlCountry && countries.some(c => c.key === urlCountry)) {
      setSelectedCountry(urlCountry);
    } else if (countries.length > 0) {
      setSelectedCountry(countries[0].key); // Use 'all' key as default
    }
  }, [searchParams, countries]); // Only searchParams and countries (not state values)

  // No need for separate effect - first useEffect handles all cases

  return (
    <div className="bg-[var(--background)] min-h-screen transition-colors">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{t.jobs.title}</h1>
          <p className="text-gray-600 dark:text-gray-300">
            {t.jobs.subtitle}
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-[var(--surface)] rounded-lg border border-[var(--border-color)] p-6 mb-8 transition-colors">
          <form onSubmit={handleSearch} className="space-y-4">
            {/* Main search bar */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <SearchDropdown
                  value={searchQuery}
                  onChange={handleJobsSearchChange}
                  placeholder={t.jobs.searchPlaceholder}
                  suggestions={jobSuggestions}
                  className="w-full px-4 py-3 border border-[var(--border-color)] bg-[var(--background)] text-[var(--text-primary)] rounded-lg focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]/20 placeholder-[var(--text-muted)] transition-all"
                />
              </div>
              <div className="md:w-64">
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="w-full px-4 py-3 border border-[var(--border-color)] bg-[var(--background)] text-[var(--text-primary)] rounded-lg focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]/20 transition-all"
                >
                  {countries.map(country => (
                    <option key={country.key} value={country.key}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                className="bg-[var(--primary)] text-[var(--background)] px-6 py-3 rounded-lg hover:bg-[var(--primary-hover)] transition-all font-medium border border-[var(--primary)] hover:border-[var(--primary-hover)]"
              >
                {t.jobs.filterButton}
              </button>
            </div>
            
            {/* Advanced filters */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-[var(--border-color)]">
              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Experience Level</label>
                <select
                  value={selectedExperience}
                  onChange={(e) => setSelectedExperience(e.target.value)}
                  className="w-full px-3 py-2 border border-[var(--border-color)] bg-[var(--background)] text-[var(--text-primary)] rounded-md focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]/20 transition-all"
                >
                  <option value="">All Levels</option>
                  <option value="junior">Junior (0-2 years)</option>
                  <option value="mid">Mid (2-5 years)</option>
                  <option value="senior">Senior (5+ years)</option>
                  <option value="lead">Lead/Principal</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Job Type</label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full px-3 py-2 border border-[var(--border-color)] bg-[var(--background)] text-[var(--text-primary)] rounded-md focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]/20 transition-all"
                >
                  <option value="">All Types</option>
                  <option value="full-time">Full-time</option>
                  <option value="part-time">Part-time</option>
                  <option value="contract">Contract</option>
                  <option value="internship">Internship</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Min. Salary (EUR)</label>
                <input
                  type="number"
                  value={salaryMin}
                  onChange={(e) => setSalaryMin(e.target.value)}
                  placeholder="e.g., 50000"
                  className="w-full px-3 py-2 border border-[var(--border-color)] bg-[var(--background)] text-[var(--text-primary)] rounded-md focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]/20 transition-all"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 border border-[var(--border-color)] bg-[var(--background)] text-[var(--text-primary)] rounded-md focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]/20 transition-all"
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
                <span className="text-sm text-[var(--text-secondary)]">Remote Work Available</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={visaSponsorshipOnly}
                  onChange={(e) => setVisaSponsorshipOnly(e.target.checked)}
                  className="mr-2 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <span className="text-sm text-[var(--text-secondary)]">Visa Sponsorship Available</span>
              </label>
            </div>
          </form>
        </div>

        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-gray-600 dark:text-gray-300">
            {loading ? t.jobs.searching : `${jobs.length} ${t.jobs.resultsFound}`}
            {selectedCountry !== countries[0]?.key && ` (${countries.find(c => c.key === selectedCountry)?.name})`}
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
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
                  {t.jobs.noResults.title}
                </h3>
                <p className="text-[var(--text-muted)] mb-4">
                  {t.jobs.noResults.description}
                </p>
                <button 
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCountry(countries[0]?.key || '');
                    setSelectedExperience('');
                    setSelectedType('');
                    setSalaryMin('');
                    setRemoteOnly(false);
                    setVisaSponsorshipOnly(false);
                  }}
                  className="bg-[var(--primary)] text-[var(--surface)] px-4 py-2 rounded hover:bg-[var(--primary-hover)] transition-colors"
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

// Loading component for Suspense fallback
function JobsLoading() {
  return (
    <div className="bg-[var(--background)] min-h-screen transition-colors">
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-[var(--surface)] rounded w-64 mb-4"></div>
          <div className="h-4 bg-[var(--surface)] rounded w-96 mb-8"></div>
          <div className="bg-[var(--surface)] rounded-lg p-6 mb-8">
            <div className="h-12 bg-[var(--background)] rounded mb-4"></div>
            <div className="h-8 bg-[var(--background)] rounded w-32"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main component with Suspense boundary
export default function JobsPage() {
  return (
    <Suspense fallback={<JobsLoading />}>
      <JobsContent />
    </Suspense>
  );
}