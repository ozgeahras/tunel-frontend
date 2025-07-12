'use client';

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import LoginModal from "@/components/auth/LoginModal";

export default function Home() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  return (
    <div className="bg-[var(--background)] transition-colors">
      {/* Hero Section */}
      <section className="bg-[var(--primary)] text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">
            {t.home.title}
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            {t.home.subtitle}
          </p>
          
          {/* Search Bar */}
          <div className="max-w-4xl mx-auto bg-[var(--surface)] rounded-lg border border-[var(--border-color)] p-6 flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder={t.home.searchPlaceholder}
                className="w-full px-4 py-3 text-[var(--text-primary)] bg-[var(--background)] border border-[var(--border-color)] rounded-lg focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]/20 placeholder-[var(--text-muted)] transition-all"
              />
            </div>
            <div className="flex-1">
              <select className="w-full px-4 py-3 text-[var(--text-primary)] bg-[var(--background)] border border-[var(--border-color)] rounded-lg focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]/20 transition-all">
                <option>{t.home.allCountries}</option>
                <option>Almanya</option>
                <option>Hollanda</option>
                <option>İngiltere</option>
                <option>Fransa</option>
                <option>İsviçre</option>
              </select>
            </div>
            <button className="bg-[var(--primary)] text-[var(--background)] px-8 py-3 rounded-lg hover:bg-[var(--primary-hover)] transition-all font-medium border border-[var(--primary)] hover:border-[var(--primary-hover)]">
              {t.home.searchButton}
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-[var(--card-background)] p-8 rounded-2xl shadow-lg border border-[var(--border-color)] transition-colors">
              <div className="text-4xl font-bold text-[var(--primary)] mb-3">500+</div>
              <div className="text-[var(--text-primary)] font-semibold text-lg">{t.home.stats.jobs}</div>
            </div>
            <div className="bg-[var(--card-background)] p-8 rounded-2xl shadow-lg border border-[var(--border-color)] transition-colors">
              <div className="text-4xl font-bold text-[var(--primary)] mb-3">50+</div>
              <div className="text-[var(--text-primary)] font-semibold text-lg">{t.home.stats.companies}</div>
            </div>
            <div className="bg-[var(--card-background)] p-8 rounded-2xl shadow-lg border border-[var(--border-color)] transition-colors">
              <div className="text-4xl font-bold text-[var(--primary)] mb-3">15+</div>
              <div className="text-[var(--text-primary)] font-semibold text-lg">{t.home.stats.countries}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-[var(--background)] transition-colors">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-[var(--text-primary)] mb-4">
            {t.home.whyTunel}
          </h2>
          <p className="text-xl text-center text-[var(--text-secondary)] mb-16 max-w-3xl mx-auto">
            Discover why thousands of Turkish developers choose Tunel for their European career journey
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-[var(--card-background)] rounded-2xl shadow-lg border border-[var(--border-color)] transition-colors">
              <div className="w-20 h-20 bg-[var(--primary)] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-4">{t.home.features.visaOnly.title}</h3>
              <p className="text-[var(--text-secondary)] leading-relaxed text-lg">
                {t.home.features.visaOnly.description}
              </p>
            </div>
            <div className="text-center p-8 bg-[var(--card-background)] rounded-2xl shadow-lg border border-[var(--border-color)] transition-colors">
              <div className="w-20 h-20 bg-[var(--primary)] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-4">{t.home.features.smartFiltering.title}</h3>
              <p className="text-[var(--text-secondary)] leading-relaxed text-lg">
                {t.home.features.smartFiltering.description}
              </p>
            </div>
            <div className="text-center p-8 bg-[var(--card-background)] rounded-2xl shadow-lg border border-[var(--border-color)] transition-colors">
              <div className="w-20 h-20 bg-[var(--primary)] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-4">{t.home.features.turkishProfessionals.title}</h3>
              <p className="text-[var(--text-secondary)] leading-relaxed text-lg">
                {t.home.features.turkishProfessionals.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-16 bg-[var(--surface)] transition-colors">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-[var(--text-primary)] mb-4">
            Success Stories
          </h2>
          <p className="text-xl text-center text-[var(--text-secondary)] mb-16 max-w-3xl mx-auto">
            Real stories from Turkish developers who found their dream jobs in Europe
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[var(--card-background)] p-8 rounded-2xl shadow-xl border border-[var(--border-color)] transition-colors">
              <div className="flex items-center mb-4">
                <div className="w-14 h-14 bg-[var(--primary)] rounded-full flex items-center justify-center text-white font-bold mr-4 text-lg">
                  MA
                </div>
                <div>
                  <h4 className="font-bold text-lg text-[var(--text-primary)]">Mehmet Akın</h4>
                  <p className="text-[var(--text-secondary)] font-medium">Frontend Developer</p>
                </div>
              </div>
              <p className="text-[var(--text-secondary)] mb-4 text-lg leading-relaxed">
                &quot;Found my dream job at a Berlin startup through Tunel. The visa process was seamless and the company was incredibly supportive.&quot;
              </p>
              <div className="flex items-center text-sm text-[var(--text-muted)]">
                <span>🇩🇪 Berlin, Germany</span>
                <span className="mx-2">•</span>
                <span>€65,000/year</span>
              </div>
            </div>
            
            <div className="bg-[var(--card-background)] p-8 rounded-2xl shadow-xl border border-[var(--border-color)] transition-colors">
              <div className="flex items-center mb-4">
                <div className="w-14 h-14 bg-[var(--primary)] rounded-full flex items-center justify-center text-white font-bold mr-4 text-lg">
                  AY
                </div>
                <div>
                  <h4 className="font-bold text-lg text-[var(--text-primary)]">Ayşe Yılmaz</h4>
                  <p className="text-[var(--text-secondary)] font-medium">Full Stack Developer</p>
                </div>
              </div>
              <p className="text-[var(--text-secondary)] mb-4 text-lg leading-relaxed">
                &quot;Relocated to Amsterdam with my family. The job market insights and company culture information helped me choose the perfect fit.&quot;
              </p>
              <div className="flex items-center text-sm text-[var(--text-muted)]">
                <span>🇳🇱 Amsterdam, Netherlands</span>
                <span className="mx-2">•</span>
                <span>€70,000/year</span>
              </div>
            </div>
            
            <div className="bg-[var(--card-background)] p-8 rounded-2xl shadow-xl border border-[var(--border-color)] transition-colors">
              <div className="flex items-center mb-4">
                <div className="w-14 h-14 bg-[var(--primary)] rounded-full flex items-center justify-center text-white font-bold mr-4 text-lg">
                  EK
                </div>
                <div>
                  <h4 className="font-bold text-lg text-[var(--text-primary)]">Emre Kaya</h4>
                  <p className="text-[var(--text-secondary)] font-medium">DevOps Engineer</p>
                </div>
              </div>
              <p className="text-[var(--text-secondary)] mb-4 text-lg leading-relaxed">
                &quot;Tunel connected me with innovative companies in Zurich. The detailed job descriptions and tech stack information was invaluable.&quot;
              </p>
              <div className="flex items-center text-sm text-[var(--text-muted)]">
                <span>🇨🇭 Zurich, Switzerland</span>
                <span className="mx-2">•</span>
                <span>€85,000/year</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Companies Section */}
      <section className="py-16 bg-[var(--background)] transition-colors">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-[var(--text-primary)] mb-4">
            Trusted by Leading Companies
          </h2>
          <p className="text-xl text-center text-[var(--text-secondary)] mb-16 max-w-3xl mx-auto">
            Join thousands of developers working at Europe&apos;s most innovative companies
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 items-center">
            <div className="bg-[var(--card-background)] p-6 rounded-2xl shadow-lg border border-[var(--border-color)] flex items-center justify-center h-20 transition-colors">
              <span className="text-2xl font-bold text-[var(--primary)]">Spotify</span>
            </div>
            <div className="bg-[var(--card-background)] p-6 rounded-2xl shadow-lg border border-[var(--border-color)] flex items-center justify-center h-20 transition-colors">
              <span className="text-2xl font-bold text-[var(--primary)]">Adyen</span>
            </div>
            <div className="bg-[var(--card-background)] p-6 rounded-2xl shadow-lg border border-[var(--border-color)] flex items-center justify-center h-20 transition-colors">
              <span className="text-2xl font-bold text-[var(--primary)]">Klarna</span>
            </div>
            <div className="bg-[var(--card-background)] p-6 rounded-2xl shadow-lg border border-[var(--border-color)] flex items-center justify-center h-20 transition-colors">
              <span className="text-xl font-bold text-[var(--primary)]">Delivery Hero</span>
            </div>
            <div className="bg-[var(--card-background)] p-6 rounded-2xl shadow-lg border border-[var(--border-color)] flex items-center justify-center h-20 transition-colors">
              <span className="text-2xl font-bold text-[var(--primary)]">Takeaway</span>
            </div>
            <div className="bg-[var(--card-background)] p-6 rounded-2xl shadow-lg border border-[var(--border-color)] flex items-center justify-center h-20 transition-colors">
              <span className="text-2xl font-bold text-[var(--primary)]">Bunq</span>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Jobs Section */}
      <section className="py-16 bg-[var(--surface)] transition-colors">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-4xl font-bold text-[var(--text-primary)] mb-4">Latest Opportunities</h2>
              <p className="text-xl text-[var(--text-secondary)]">Fresh openings from top European companies</p>
            </div>
            <Link href="/jobs" className="bg-[var(--primary)] text-white px-6 py-3 rounded-xl hover:bg-[var(--primary-hover)] transition-colors font-medium shadow-lg">
              View All Jobs →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-[var(--card-background)] p-8 rounded-2xl shadow-xl border border-[var(--border-color)] transition-colors">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-[var(--primary)] rounded-2xl flex items-center justify-center text-white font-bold mr-4 text-xl shadow-lg">
                  S
                </div>
                <div>
                  <h3 className="font-bold text-xl text-[var(--text-primary)]">Senior React Developer</h3>
                  <p className="text-[var(--text-secondary)] font-semibold text-lg">Spotify</p>
                </div>
              </div>
              <p className="text-[var(--text-secondary)] mb-6 text-base leading-relaxed">
                Join our team building next-generation music streaming experiences. Remote-first culture with visa sponsorship available.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="bg-[var(--surface)] text-[var(--primary)] px-3 py-1 rounded-lg text-sm font-medium">React</span>
                <span className="bg-[var(--surface)] text-[var(--primary)] px-3 py-1 rounded-lg text-sm font-medium">TypeScript</span>
                <span className="bg-[var(--surface)] text-[var(--primary)] px-3 py-1 rounded-lg text-sm font-medium">Node.js</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[var(--text-secondary)] font-medium">🇸🇪 Stockholm, Sweden</span>
                <span className="text-[var(--primary)] font-bold text-lg">€70,000 - €95,000</span>
              </div>
            </div>
            
            <div className="bg-[var(--card-background)] p-8 rounded-2xl shadow-xl border border-[var(--border-color)] transition-colors">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-[var(--primary)] rounded-2xl flex items-center justify-center text-white font-bold mr-4 text-xl shadow-lg">
                  A
                </div>
                <div>
                  <h3 className="font-bold text-xl text-[var(--text-primary)]">DevOps Engineer</h3>
                  <p className="text-[var(--text-secondary)] font-semibold text-lg">Adyen</p>
                </div>
              </div>
              <p className="text-[var(--text-secondary)] mb-6 text-base leading-relaxed">
                Scale payment infrastructure for global merchants. Work with cutting-edge cloud technologies and microservices.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="bg-[var(--surface)] text-[var(--primary)] px-3 py-1 rounded-lg text-sm font-medium">AWS</span>
                <span className="bg-[var(--surface)] text-[var(--primary)] px-3 py-1 rounded-lg text-sm font-medium">Kubernetes</span>
                <span className="bg-[var(--surface)] text-[var(--primary)] px-3 py-1 rounded-lg text-sm font-medium">Docker</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[var(--text-secondary)] font-medium">🇳🇱 Amsterdam, Netherlands</span>
                <span className="text-[var(--primary)] font-bold text-lg">€65,000 - €85,000</span>
              </div>
            </div>
            
            <div className="bg-[var(--card-background)] p-8 rounded-2xl shadow-xl border border-[var(--border-color)] transition-colors">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-[var(--primary)] rounded-2xl flex items-center justify-center text-white font-bold mr-4 text-xl shadow-lg">
                  K
                </div>
                <div>
                  <h3 className="font-bold text-xl text-[var(--text-primary)]">Full Stack Developer</h3>
                  <p className="text-[var(--text-secondary)] font-semibold text-lg">Klarna</p>
                </div>
              </div>
              <p className="text-[var(--text-secondary)] mb-6 text-base leading-relaxed">
                Build the future of payments and shopping. Join our diverse team with excellent benefits and growth opportunities.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="bg-[var(--surface)] text-[var(--primary)] px-3 py-1 rounded-lg text-sm font-medium">Python</span>
                <span className="bg-[var(--surface)] text-[var(--primary)] px-3 py-1 rounded-lg text-sm font-medium">React</span>
                <span className="bg-[var(--surface)] text-[var(--primary)] px-3 py-1 rounded-lg text-sm font-medium">PostgreSQL</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[var(--text-secondary)] font-medium">🇩🇪 Berlin, Germany</span>
                <span className="text-[var(--primary)] font-bold text-lg">€60,000 - €80,000</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[var(--primary)] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            {t.home.cta.title}
          </h2>
          <p className="text-xl mb-8">
            {t.home.cta.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {user ? (
              <Link
                href="/jobs"
                className="bg-[var(--card-background)] text-[var(--primary)] px-8 py-3 rounded-lg font-medium hover:bg-[var(--surface)] transition-colors"
              >
                Explore Jobs
              </Link>
            ) : (
              <>
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="bg-[var(--card-background)] text-[var(--primary)] px-8 py-3 rounded-lg font-medium hover:bg-[var(--surface)] transition-colors"
                >
                  {t.home.cta.register}
                </button>
                <Link
                  href="/jobs"
                  className="border border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-[var(--card-background)] hover:text-[var(--primary)] transition-colors"
                >
                  {t.home.cta.browseJobs}
                </Link>
              </>
            )}
          </div>
        </div>
      </section>
      
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
      />
    </div>
  );
}
