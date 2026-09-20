import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import { Language, TranslationDictionary, TRANSLATIONS } from '../data/translations';
import { SiteTextConfig, CommerceItem, COMMERCE_ITEMS } from '../data';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (keyPath: string, fallback?: string) => string;
  translations: TranslationDictionary;
  siteText: SiteTextConfig;
  commerceItems: CommerceItem[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('agricarl_language');
      if (saved === 'es' || saved === 'en') {
        return saved;
      }
      // Check browser navigator language
      if (typeof navigator !== 'undefined' && navigator.language && navigator.language.startsWith('en')) {
        return 'en';
      }
    } catch {}
    return 'es';
  });

  const setLanguage = (newLang: Language) => {
    setLanguageState(newLang);
    try {
      localStorage.setItem('agricarl_language', newLang);
    } catch {}
  };

  const toggleLanguage = () => {
    setLanguage(language === 'es' ? 'en' : 'es');
  };

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
    }
  }, [language]);

  const translations = useMemo(() => {
    return TRANSLATIONS[language] || TRANSLATIONS.es;
  }, [language]);

  // Nested property lookup helper
  const t = (keyPath: string, fallback?: string): string => {
    const keys = keyPath.split('.');
    let current: any = translations;
    for (const key of keys) {
      if (current && typeof current === 'object' && key in current) {
        current = current[key];
      } else {
        return fallback || keyPath;
      }
    }
    return typeof current === 'string' ? current : (fallback || keyPath);
  };

  // Derive active siteText, respecting any persistent contact/RUC settings
  const siteText: SiteTextConfig = useMemo(() => {
    const base = translations.siteText;
    try {
      const saved = localStorage.getItem('agricarl_site_text');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Only preserve persistent corporate identifiers (phone, email, RUC, address) if customized
        return {
          ...base,
          contactPhone: parsed.contactPhone || base.contactPhone,
          contactEmail: parsed.contactEmail || base.contactEmail,
          contactAddress: parsed.contactAddress || base.contactAddress,
          companyRuc: parsed.companyRuc || base.companyRuc,
          companyWebsite: parsed.companyWebsite || base.companyWebsite,
        };
      }
    } catch {}
    return base;
  }, [translations]);

  // Derive active commerce items, matching current language but preserving any customized images from localStorage
  const commerceItems: CommerceItem[] = useMemo(() => {
    const langItems = translations.commerceItems;
    try {
      const saved = localStorage.getItem('agricarl_commerce_items');
      if (saved) {
        const parsed: CommerceItem[] = JSON.parse(saved);
        return langItems.map(item => {
          const match = parsed.find(p => p.id === item.id);
          if (match && match.image) {
            return {
              ...item,
              image: match.image
            };
          }
          return item;
        });
      }
    } catch {}
    return langItems;
  }, [translations]);

  const value = useMemo(() => ({
    language,
    setLanguage,
    toggleLanguage,
    t,
    translations,
    siteText,
    commerceItems,
  }), [language, translations, siteText, commerceItems]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
