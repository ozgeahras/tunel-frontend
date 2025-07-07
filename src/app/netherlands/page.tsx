'use client';

import { useLanguage } from "@/contexts/LanguageContext";

export default function NetherlandsPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Tech Jobs in Netherlands
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Join the Netherlands&apos; innovative tech ecosystem.
          </p>
        </div>
        <div className="mt-16 text-center">
          <button className="bg-gradient-to-r from-orange-500 to-blue-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg">
            View Netherlands Jobs
          </button>
        </div>
      </div>
    </div>
  );
}