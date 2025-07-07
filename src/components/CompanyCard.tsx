'use client';

import { useState } from 'react';
import { Company } from '@/lib/companiesData';
import { useLanguage } from '@/contexts/LanguageContext';

interface CompanyCardProps {
  company: Company;
  onFollow?: (companyId: string) => void;
}

export default function CompanyCard({ company, onFollow }: CompanyCardProps) {
  const { language } = useLanguage();
  const [isFollowing, setIsFollowing] = useState(company.isFollowing || false);
  
  const currentTranslation = company.translations[language];

  const handleFollowClick = () => {
    setIsFollowing(!isFollowing);
    onFollow?.(company.id);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Startup': return 'bg-green-100 text-green-800';
      case 'Scale-up': return 'bg-blue-100 text-blue-800';
      case 'Unicorn': return 'bg-purple-100 text-purple-800';
      case 'Enterprise': return 'bg-gray-100 text-gray-800';
      case 'Public': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`text-sm ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}>
        ★
      </span>
    ));
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-200">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="text-4xl">{company.logo}</div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-1">
              {currentTranslation.name}
            </h3>
            <div className="flex items-center space-x-2 mb-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(company.category)}`}>
                {company.category}
              </span>
              <span className="text-sm text-gray-500">{company.size} employees</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">
                📍 {company.location}, {company.country}
              </span>
              <span className="text-sm text-gray-500">• Founded {company.founded}</span>
            </div>
          </div>
        </div>
        
        <button
          onClick={handleFollowClick}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            isFollowing
              ? 'bg-indigo-600 text-white hover:bg-indigo-700'
              : 'border border-indigo-600 text-indigo-600 hover:bg-indigo-50'
          }`}
        >
          {isFollowing ? '✓ Following' : '+ Follow'}
        </button>
      </div>

      {/* Description */}
      <p className="text-gray-600 mb-4 line-clamp-2">
        {currentTranslation.description}
      </p>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-1 mb-1">
            {renderStars(company.rating)}
          </div>
          <div className="text-xs text-gray-500">{company.reviews} reviews</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-indigo-600">{company.openPositions}</div>
          <div className="text-xs text-gray-500">Open positions</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-green-600">✓</div>
          <div className="text-xs text-gray-500">Visa sponsor</div>
        </div>
        <div className="text-center">
          <div className="text-sm font-semibold text-gray-700">{company.funding}</div>
          <div className="text-xs text-gray-500">Funding</div>
        </div>
      </div>

      {/* Tech Stack */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-900 mb-2">Tech Stack</h4>
        <div className="flex flex-wrap gap-1">
          {company.techStack.slice(0, 6).map((tech, index) => (
            <span 
              key={index}
              className="bg-violet-100 text-violet-700 px-2 py-1 rounded text-xs font-medium"
            >
              {tech}
            </span>
          ))}
          {company.techStack.length > 6 && (
            <span className="bg-gray-100 text-gray-500 px-2 py-1 rounded text-xs">
              +{company.techStack.length - 6} more
            </span>
          )}
        </div>
      </div>

      {/* Culture Preview */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-900 mb-2">Culture</h4>
        <div className="flex flex-wrap gap-1">
          {currentTranslation.culture.slice(0, 2).map((item, index) => (
            <span 
              key={index}
              className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs"
            >
              {item}
            </span>
          ))}
          {currentTranslation.culture.length > 2 && (
            <span className="bg-gray-50 text-gray-500 px-2 py-1 rounded text-xs">
              +{currentTranslation.culture.length - 2} more
            </span>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <div className="flex space-x-3">
          {company.socialMedia.linkedin && (
            <a 
              href={company.socialMedia.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-600 transition-colors"
            >
              <span className="text-sm">💼</span>
            </a>
          )}
          {company.socialMedia.twitter && (
            <a 
              href={`https://twitter.com/${company.socialMedia.twitter}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400 transition-colors"
            >
              <span className="text-sm">🐦</span>
            </a>
          )}
          {company.socialMedia.glassdoor && (
            <a 
              href={company.socialMedia.glassdoor}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-green-600 transition-colors"
            >
              <span className="text-sm">🏢</span>
            </a>
          )}
        </div>
        
        <div className="flex space-x-2">
          <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-50 transition-colors text-sm">
            View Jobs
          </button>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors text-sm">
            Company Profile
          </button>
        </div>
      </div>
    </div>
  );
}