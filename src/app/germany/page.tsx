'use client';

import { useLanguage } from "@/contexts/LanguageContext";

export default function GermanyPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-red-50">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Tech Jobs in Germany
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Discover amazing tech opportunities in Germany&apos;s thriving startup ecosystem.
          </p>
        </div>
        <div className="mt-16 text-center">
          <button className="bg-gradient-to-r from-yellow-500 to-red-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg">
            View Germany Jobs
          </button>
        </div>
      </div>
    </div>
  );
}