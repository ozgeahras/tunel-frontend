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
    <div className="bg-[var(--card-background)] rounded-lg border border-[var(--border-color)] p-6 hover:border-[var(--primary)]/50 transition-all">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">{currentTranslation.title}</h3>
          <p className="text-lg text-[var(--text-secondary)] mb-1">{job.company}</p>
          <p className="text-[var(--text-muted)] mb-2">
            {job.location}, {job.country}
          </p>
        </div>
        <div className="text-right">
          <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium mb-2">
            {t.jobs.card.visaSponsorship}
          </div>
          <p className="text-indigo-600 font-semibold">{job.salary}</p>
        </div>
      </div>

      {/* Job Details */}
      <div className="flex flex-wrap gap-2 mb-4">
        <span className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded text-sm">
          {job.type}
        </span>
        <span className="bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 px-2 py-1 rounded text-sm">
          {job.experienceLevel}
        </span>
      </div>

      {/* Technologies */}
      <div className="mb-4">
        <div className="flex flex-wrap gap-1">
          {job.technologies.slice(0, 5).map((tech, index) => (
            <span 
              key={index}
              className="bg-violet-100 dark:bg-violet-900 text-violet-700 dark:text-violet-300 px-2 py-1 rounded text-xs font-medium"
            >
              {tech}
            </span>
          ))}
          {job.technologies.length > 5 && (
            <span className="bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 px-2 py-1 rounded text-xs">
              +{job.technologies.length - 5} {t.jobs.card.moreTech}
            </span>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">{currentTranslation.description}</p>

      {/* Benefits Preview */}
      <div className="mb-4">
        <div className="flex flex-wrap gap-1">
          {currentTranslation.benefits.slice(0, 3).map((benefit, index) => (
            <span 
              key={index}
              className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 px-2 py-1 rounded text-xs"
            >
              {benefit}
            </span>
          ))}
          {currentTranslation.benefits.length > 3 && (
            <span className="bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 px-2 py-1 rounded text-xs">
              +{currentTranslation.benefits.length - 3} {t.jobs.card.benefits}
            </span>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-600">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          <p>{t.jobs.card.postedDate}: {formatDate(job.postedDate)}</p>
          <p>{t.jobs.card.applicationDeadline}: {formatDate(job.applicationDeadline)}</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={onApply}
            className="bg-[var(--primary)] text-[var(--background)] px-4 py-2 rounded hover:bg-[var(--primary-hover)] transition-all font-medium"
          >
            {t.jobs.card.apply}
          </button>
          <button className="border border-[var(--border-color)] text-[var(--text-secondary)] px-4 py-2 rounded hover:bg-[var(--border-color)]/50 transition-all">
            {t.jobs.card.details}
          </button>
        </div>
      </div>
    </div>
  );
}