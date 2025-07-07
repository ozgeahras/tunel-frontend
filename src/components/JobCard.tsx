import { Job } from '@/lib/mockData';
import { useLanguage } from '@/contexts/LanguageContext';

interface JobCardProps {
  job: Job;
  onApply?: () => void;
}

export default function JobCard({ job, onApply }: JobCardProps) {
  const { t, language } = useLanguage();
  
  const formatDate = (dateString: string) => {
    const localeMap = {
      'en': 'en-US',
      'tr': 'tr-TR',
      'de': 'de-DE',
      'nl': 'nl-NL'
    };
    
    return new Date(dateString).toLocaleDateString(localeMap[language], {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const currentTranslation = job.translations[language];

  return (
    <div className="group bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 p-8 border border-white/50 hover:-translate-y-1 hover:rotate-1 relative overflow-hidden">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      {/* Content */}
      <div className="relative z-10">
        {/* Enhanced Header */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-start gap-4 flex-1">
            {/* Company Logo Placeholder */}
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
              {job.company.charAt(0)}
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">{currentTranslation.title}</h3>
              <p className="text-xl text-gray-800 font-semibold mb-1">{job.company}</p>
              <p className="text-gray-700 mb-2 flex items-center gap-2">
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                {job.location}, {job.country}
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-bold mb-3 shadow-lg border border-emerald-200">
              ✓ {t.jobs.card.visaSponsorship}
            </div>
            <p className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">{job.salary}</p>
          </div>
        </div>

        {/* Enhanced Job Details */}
        <div className="flex flex-wrap gap-3 mb-6">
          <span className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 px-4 py-2 rounded-xl text-sm font-semibold border border-blue-300 shadow-sm">
            📊 {job.type}
          </span>
          <span className="bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800 px-4 py-2 rounded-xl text-sm font-semibold border border-purple-300 shadow-sm">
            🎯 {job.experienceLevel}
          </span>
          {job.remote && (
            <span className="bg-gradient-to-r from-green-100 to-green-200 text-green-800 px-4 py-2 rounded-xl text-sm font-semibold border border-green-300 shadow-sm">
              🌍 Remote
            </span>
          )}
        </div>

        {/* Enhanced Technologies */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {job.technologies.slice(0, 5).map((tech, index) => (
              <span 
                key={index}
                className="bg-gradient-to-r from-violet-100 to-purple-100 text-violet-800 px-3 py-2 rounded-lg text-sm font-semibold border border-violet-300 shadow-sm hover:scale-105 transition-transform duration-200"
              >
                {tech}
              </span>
            ))}
            {job.technologies.length > 5 && (
              <span className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-600 px-3 py-2 rounded-lg text-sm font-medium border border-gray-300">
                +{job.technologies.length - 5} {t.jobs.card.moreTech}
              </span>
            )}
          </div>
        </div>

        {/* Enhanced Description */}
        <p className="text-gray-800 mb-6 text-lg leading-relaxed line-clamp-2">{currentTranslation.description}</p>

        {/* Enhanced Benefits Preview */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {currentTranslation.benefits.slice(0, 3).map((benefit, index) => (
              <span 
                key={index}
                className="bg-gradient-to-r from-emerald-50 to-green-50 text-emerald-700 px-3 py-2 rounded-lg text-sm font-medium border border-emerald-200 shadow-sm"
              >
                ✨ {benefit}
              </span>
            ))}
            {currentTranslation.benefits.length > 3 && (
              <span className="bg-gradient-to-r from-gray-50 to-gray-100 text-gray-600 px-3 py-2 rounded-lg text-sm font-medium border border-gray-200">
                +{currentTranslation.benefits.length - 3} {t.jobs.card.benefits}
              </span>
            )}
          </div>
        </div>

        {/* Enhanced Footer */}
        <div className="flex justify-between items-center pt-6 border-t border-gray-200">
          <div className="text-sm text-gray-600">
            <p className="flex items-center gap-2 mb-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              {t.jobs.card.postedDate}: {formatDate(job.postedDate)}
            </p>
            <p className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              {t.jobs.card.applicationDeadline}: {formatDate(job.applicationDeadline)}
            </p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={onApply}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              {t.jobs.card.apply}
            </button>
            <button className="border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 font-semibold">
              {t.jobs.card.details}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}