"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, TranslationKey, Language } from '@/lib/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('EN');
  const [mounted, setMounted] = useState(false);

  const handleSetLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('languagePreference', lang);
      const html = document.documentElement;
      if (lang === 'AR') {
        html.setAttribute('dir', 'rtl');
        html.setAttribute('lang', 'ar');
      } else {
        html.setAttribute('dir', 'ltr');
        html.setAttribute('lang', lang.toLowerCase());
      }
    }
  };

  useEffect(() => {
    // eslint-disable-next-line
    setMounted(true);
    const savedLang = localStorage.getItem('languagePreference') as Language | null;
    if (savedLang && (savedLang === 'EN' || savedLang === 'FR' || savedLang === 'AR')) {
      handleSetLanguage(savedLang);
    }
  }, []);

  const t = (key: TranslationKey): string => {
    if (!mounted) return translations['EN'][key] || key;
    return translations[language][key] || key;
  };

  const isRTL = language === 'AR';

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t, isRTL }}>
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
