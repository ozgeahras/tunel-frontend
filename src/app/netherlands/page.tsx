'use client';

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

export default function NetherlandsPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-blue-500/20"></div>
        <div className="max-w-7xl mx-auto px-4 py-24 relative z-10">
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="text-8xl mb-6 animate-bounce">🇳🇱</div>
            <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-orange-600 to-blue-600 bg-clip-text text-transparent mb-8">
              Tech Jobs in Netherlands
            </h1>
            <p className="text-2xl text-gray-800 max-w-4xl mx-auto leading-relaxed">
              Join the Netherlands&apos; innovative tech ecosystem with world-class companies and excellent work-life balance.
            </p>
          </div>
        </div>
      </div>

      {/* Cities Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Amsterdam */}
          <div className="group bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:rotate-1">
            <div className="text-4xl mb-4">🏢</div>
            <h3 className="text-3xl font-bold text-gray-900 mb-4 group-hover:text-orange-600 transition-colors">Amsterdam Tech</h3>
            <p className="text-gray-800 mb-6 text-lg leading-relaxed">
              Work with global leaders like Booking.com, Adyen, and thriving fintech startups. The Silicon Valley of Europe.
            </p>
            <div className="space-y-3">
              <div className="flex items-center text-gray-700">
                <span className="w-3 h-3 bg-emerald-500 rounded-full mr-3 animate-pulse"></span>
                <span className="font-semibold">Average Salary: €65,000 - €100,000</span>
              </div>
              <div className="flex items-center text-gray-700">
                <span className="w-3 h-3 bg-blue-500 rounded-full mr-3 animate-pulse"></span>
                <span className="font-semibold">Visa Support: Excellent</span>
              </div>
              <div className="flex items-center text-gray-700">
                <span className="w-3 h-3 bg-purple-500 rounded-full mr-3 animate-pulse"></span>
                <span className="font-semibold">Scene: Fintech & Travel</span>
              </div>
            </div>
          </div>

          {/* Eindhoven */}
          <div className="group bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:rotate-1" style={{animationDelay: '0.1s'}}>
            <div className="text-4xl mb-4">🔬</div>
            <h3 className="text-3xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">Eindhoven Innovation</h3>
            <p className="text-gray-800 mb-6 text-lg leading-relaxed">
              Join ASML, Philips, and cutting-edge tech companies in Europe&apos;s smartest region with high-tech manufacturing.
            </p>
            <div className="space-y-3">
              <div className="flex items-center text-gray-700">
                <span className="w-3 h-3 bg-emerald-500 rounded-full mr-3 animate-pulse"></span>
                <span className="font-semibold">Average Salary: €60,000 - €95,000</span>
              </div>
              <div className="flex items-center text-gray-700">
                <span className="w-3 h-3 bg-blue-500 rounded-full mr-3 animate-pulse"></span>
                <span className="font-semibold">Visa Support: Available</span>
              </div>
              <div className="flex items-center text-gray-700">
                <span className="w-3 h-3 bg-purple-500 rounded-full mr-3 animate-pulse"></span>
                <span className="font-semibold">Focus: High-tech & Hardware</span>
              </div>
            </div>
          </div>

          {/* The Hague */}
          <div className="group bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:rotate-1" style={{animationDelay: '0.2s'}}>
            <div className="text-4xl mb-4">⚖️</div>
            <h3 className="text-3xl font-bold text-gray-900 mb-4 group-hover:text-indigo-600 transition-colors">The Hague Digital</h3>
            <p className="text-gray-800 mb-6 text-lg leading-relaxed">
              Work with international organizations and tech companies in the international city of justice and diplomacy.
            </p>
            <div className="space-y-3">
              <div className="flex items-center text-gray-700">
                <span className="w-3 h-3 bg-emerald-500 rounded-full mr-3 animate-pulse"></span>
                <span className="font-semibold">Average Salary: €55,000 - €85,000</span>
              </div>
              <div className="flex items-center text-gray-700">
                <span className="w-3 h-3 bg-blue-500 rounded-full mr-3 animate-pulse"></span>
                <span className="font-semibold">Visa Support: Available</span>
              </div>
              <div className="flex items-center text-gray-700">
                <span className="w-3 h-3 bg-purple-500 rounded-full mr-3 animate-pulse"></span>
                <span className="font-semibold">Sector: Gov Tech & NGOs</span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center animate-fade-in-up">
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-12 shadow-2xl border border-white/50">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Ready to Experience Dutch Innovation?</h2>
            <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">Join a progressive work culture with excellent English proficiency and bike-friendly cities.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-orange-500 to-blue-600 text-white px-10 py-4 rounded-2xl font-bold text-xl hover:from-orange-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                🚀 View Netherlands Jobs
              </button>
              <button className="border-2 border-gray-700 text-gray-700 px-10 py-4 rounded-2xl font-bold text-xl hover:bg-gray-700 hover:text-white transition-all duration-200">
                🏠 Living Guide
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}