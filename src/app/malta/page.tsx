'use client';

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

export default function MaltaPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-blue-50 to-teal-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-blue-500/20"></div>
        <div className="max-w-7xl mx-auto px-4 py-24 relative z-10">
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="text-8xl mb-6 animate-bounce">🇲🇹</div>
            <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-yellow-600 to-blue-600 bg-clip-text text-transparent mb-8">
              Tech Jobs in Malta
            </h1>
            <p className="text-2xl text-gray-800 max-w-4xl mx-auto leading-relaxed">
              Discover tech opportunities in Malta&apos;s growing digital economy with excellent quality of life and Mediterranean lifestyle.
            </p>
          </div>
        </div>
      </div>

      {/* Sectors Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Gaming & iGaming */}
          <div className="group bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:rotate-1">
            <div className="text-4xl mb-4">🎰</div>
            <h3 className="text-3xl font-bold text-gray-900 mb-4 group-hover:text-yellow-600 transition-colors">Gaming & iGaming</h3>
            <p className="text-gray-800 mb-6 text-lg leading-relaxed">
              Join Malta&apos;s thriving gaming industry with companies like Evolution Gaming, Betsson, and innovative startups.
            </p>
            <div className="space-y-3">
              <div className="flex items-center text-gray-700">
                <span className="w-3 h-3 bg-emerald-500 rounded-full mr-3 animate-pulse"></span>
                <span className="font-semibold">Average Salary: €35,000 - €65,000</span>
              </div>
              <div className="flex items-center text-gray-700">
                <span className="w-3 h-3 bg-blue-500 rounded-full mr-3 animate-pulse"></span>
                <span className="font-semibold">Status: EU Citizenship</span>
              </div>
              <div className="flex items-center text-gray-700">
                <span className="w-3 h-3 bg-purple-500 rounded-full mr-3 animate-pulse"></span>
                <span className="font-semibold">Industry: Gaming Leader</span>
              </div>
            </div>
          </div>

          {/* Fintech Hub */}
          <div className="group bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:rotate-1" style={{animationDelay: '0.1s'}}>
            <div className="text-4xl mb-4">💳</div>
            <h3 className="text-3xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">Fintech Hub</h3>
            <p className="text-gray-800 mb-6 text-lg leading-relaxed">
              Work with innovative fintech companies and digital payment solutions in Europe&apos;s blockchain island.
            </p>
            <div className="space-y-3">
              <div className="flex items-center text-gray-700">
                <span className="w-3 h-3 bg-emerald-500 rounded-full mr-3 animate-pulse"></span>
                <span className="font-semibold">Average Salary: €40,000 - €70,000</span>
              </div>
              <div className="flex items-center text-gray-700">
                <span className="w-3 h-3 bg-blue-500 rounded-full mr-3 animate-pulse"></span>
                <span className="font-semibold">Status: EU Citizenship</span>
              </div>
              <div className="flex items-center text-gray-700">
                <span className="w-3 h-3 bg-purple-500 rounded-full mr-3 animate-pulse"></span>
                <span className="font-semibold">Focus: Blockchain & DLT</span>
              </div>
            </div>
          </div>

          {/* Digital Services */}
          <div className="group bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:rotate-1" style={{animationDelay: '0.2s'}}>
            <div className="text-4xl mb-4">🖥️</div>
            <h3 className="text-3xl font-bold text-gray-900 mb-4 group-hover:text-teal-600 transition-colors">Digital Services</h3>
            <p className="text-gray-800 mb-6 text-lg leading-relaxed">
              Join digital agencies and software companies serving international markets from the beautiful Mediterranean.
            </p>
            <div className="space-y-3">
              <div className="flex items-center text-gray-700">
                <span className="w-3 h-3 bg-emerald-500 rounded-full mr-3 animate-pulse"></span>
                <span className="font-semibold">Average Salary: €30,000 - €55,000</span>
              </div>
              <div className="flex items-center text-gray-700">
                <span className="w-3 h-3 bg-blue-500 rounded-full mr-3 animate-pulse"></span>
                <span className="font-semibold">Status: EU Citizenship</span>
              </div>
              <div className="flex items-center text-gray-700">
                <span className="w-3 h-3 bg-purple-500 rounded-full mr-3 animate-pulse"></span>
                <span className="font-semibold">Type: Digital agencies</span>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mt-16 bg-gradient-to-br from-blue-50 to-teal-50 rounded-3xl p-12">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Why Choose Malta?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl mb-4">☀️</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Sunny Weather</h3>
              <p className="text-gray-700">300+ sunny days per year</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">🏦</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Low Tax Rates</h3>
              <p className="text-gray-700">Attractive tax incentives</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">🌊</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Island Life</h3>
              <p className="text-gray-700">Mediterranean lifestyle</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">🇬🇧</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">English Speaking</h3>
              <p className="text-gray-700">No language barrier</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center animate-fade-in-up">
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-12 shadow-2xl border border-white/50">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Ready for Island Tech Life?</h2>
            <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">Experience the perfect blend of technology innovation and Mediterranean relaxation.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-yellow-500 to-blue-600 text-white px-10 py-4 rounded-2xl font-bold text-xl hover:from-yellow-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                🏝️ View Malta Jobs
              </button>
              <button className="border-2 border-gray-700 text-gray-700 px-10 py-4 rounded-2xl font-bold text-xl hover:bg-gray-700 hover:text-white transition-all duration-200">
                🏡 Relocation Guide
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}