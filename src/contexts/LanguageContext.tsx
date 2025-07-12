'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { en } from '@/locales/en';
import { tr } from '@/locales/tr';
import { de } from '@/locales/de';
import { nl } from '@/locales/nl';

export type Language = 'en' | 'tr' | 'de' | 'nl';

type TranslationValues = typeof en;

// Countries data
const countries = {
  en: {
    'all': 'All Countries',
    'germany': 'Germany',
    'netherlands': 'Netherlands', 
    'sweden': 'Sweden',
    'denmark': 'Denmark',
    'norway': 'Norway',
    'finland': 'Finland',
    'uk': 'United Kingdom',
    'ireland': 'Ireland',
    'france': 'France',
    'spain': 'Spain',
    'italy': 'Italy',
    'portugal': 'Portugal',
    'switzerland': 'Switzerland',
    'austria': 'Austria',
    'belgium': 'Belgium',
    'luxembourg': 'Luxembourg',
    'czech-republic': 'Czech Republic',
    'poland': 'Poland',
    'estonia': 'Estonia',
    'latvia': 'Latvia',
    'lithuania': 'Lithuania'
  },
  
  tr: {
    'all': 'Tüm Ülkeler',
    'germany': 'Almanya',
    'netherlands': 'Hollanda',
    'sweden': 'İsveç',
    'denmark': 'Danimarka', 
    'norway': 'Norveç',
    'finland': 'Finlandiya',
    'uk': 'İngiltere',
    'ireland': 'İrlanda',
    'france': 'Fransa',
    'spain': 'İspanya',
    'italy': 'İtalya',
    'portugal': 'Portekiz',
    'switzerland': 'İsviçre',
    'austria': 'Avusturya',
    'belgium': 'Belçika',
    'luxembourg': 'Lüksemburg',
    'czech-republic': 'Çek Cumhuriyeti',
    'poland': 'Polonya',
    'estonia': 'Estonya',
    'latvia': 'Letonya',
    'lithuania': 'Litvanya'
  },
  
  de: {
    'all': 'Alle Länder',
    'germany': 'Deutschland',
    'netherlands': 'Niederlande',
    'sweden': 'Schweden',
    'denmark': 'Dänemark',
    'norway': 'Norwegen', 
    'finland': 'Finnland',
    'uk': 'Vereinigtes Königreich',
    'ireland': 'Irland',
    'france': 'Frankreich',
    'spain': 'Spanien',
    'italy': 'Italien',
    'portugal': 'Portugal',
    'switzerland': 'Schweiz',
    'austria': 'Österreich',
    'belgium': 'Belgien',
    'luxembourg': 'Luxemburg',
    'czech-republic': 'Tschechische Republik',
    'poland': 'Polen',
    'estonia': 'Estland',
    'latvia': 'Lettland',
    'lithuania': 'Litauen'
  },
  
  nl: {
    'all': 'Alle Landen',
    'germany': 'Duitsland',
    'netherlands': 'Nederland',
    'sweden': 'Zweden',
    'denmark': 'Denemarken',
    'norway': 'Noorwegen',
    'finland': 'Finland', 
    'uk': 'Verenigd Koninkrijk',
    'ireland': 'Ierland',
    'france': 'Frankrijk',
    'spain': 'Spanje',
    'italy': 'Italië',
    'portugal': 'Portugal',
    'switzerland': 'Zwitserland',
    'austria': 'Oostenrijk',
    'belgium': 'België',
    'luxembourg': 'Luxemburg',
    'czech-republic': 'Tsjechische Republiek',
    'poland': 'Polen',
    'estonia': 'Estland',
    'latvia': 'Letland',
    'lithuania': 'Litouwen'
  }
};

// Country keys in order of popularity
const countryKeys = [
  'all',
  'germany',
  'netherlands', 
  'sweden',
  'uk',
  'denmark',
  'france',
  'norway',
  'finland',
  'switzerland',
  'ireland',
  'austria',
  'belgium',
  'spain',
  'italy',
  'portugal',
  'luxembourg',
  'czech-republic',
  'poland',
  'estonia',
  'latvia',
  'lithuania'
];

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationValues;
  getCountryList: () => Array<{key: string, name: string}>;
  getCountryName: (key: string) => string;
}

const translations = {
  en,
  tr,
  de,
  nl
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en'); // Default to English

  useEffect(() => {
    // Check if language is stored in localStorage
    const storedLanguage = localStorage.getItem('tunel-language') as Language;
    if (storedLanguage && Object.keys(translations).includes(storedLanguage)) {
      setLanguage(storedLanguage);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('tunel-language', lang);
  };

  const getCountryList = () => {
    const countryNames = countries[language] || countries.en;
    return countryKeys.map(key => ({
      key,
      name: countryNames[key] || key
    }));
  };

  const getCountryName = (key: string) => {
    const countryNames = countries[language] || countries.en;
    return countryNames[key] || key;
  };

  const value = {
    language,
    setLanguage: handleSetLanguage,
    t: translations[language],
    getCountryList,
    getCountryName
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

export const LANGUAGE_OPTIONS = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'nl', name: 'Nederlands', flag: '🇳🇱' },
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷' }
] as const;