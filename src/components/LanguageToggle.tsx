import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface LanguageToggleProps {
  variant?: 'header' | 'mobile' | 'compact';
  className?: string;
}

export const LanguageToggle: React.FC<LanguageToggleProps> = ({ 
  variant = 'header', 
  className = '' 
}) => {
  const { language, setLanguage, toggleLanguage } = useLanguage();

  if (variant === 'mobile') {
    return (
      <div className={`flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200/80 ${className}`}>
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-100 text-brand-green flex items-center justify-center">
            <Globe className="w-4 h-4" />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              {language === 'es' ? 'Idioma / Language' : 'Language / Idioma'}
            </span>
            <span className="text-[10px] text-slate-500 font-mono">
              {language === 'es' ? 'Español Seleccionado' : 'English Selected'}
            </span>
          </div>
        </div>

        <div className="flex items-center bg-white p-1 rounded-xl border border-slate-200 shadow-2xs font-mono text-xs font-bold">
          <button
            type="button"
            onClick={() => setLanguage('es')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              language === 'es'
                ? 'bg-brand-green text-white shadow-xs font-black'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            aria-pressed={language === 'es'}
          >
            ES
          </button>
          <button
            type="button"
            onClick={() => setLanguage('en')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              language === 'en'
                ? 'bg-brand-green text-white shadow-xs font-black'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            aria-pressed={language === 'en'}
          >
            EN
          </button>
        </div>
      </div>
    );
  }

  // Desktop Header / Compact variant: refined, elegant segmented pill with globe icon
  return (
    <div 
      className={`inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/15 border border-white/20 rounded-full p-1 shadow-2xs transition-colors text-white ${className}`}
      role="group"
      aria-label="Seleccionar idioma / Select language"
    >
      <div className="pl-1.5 pr-0.5 text-rose-200 flex items-center justify-center">
        <Globe className="w-3.5 h-3.5 text-emerald-400" />
      </div>

      <div className="flex items-center gap-0.5 font-mono text-[11px] font-bold">
        <button
          type="button"
          onClick={() => setLanguage('es')}
          title="Español"
          className={`px-2 py-1 rounded-full transition-all duration-200 cursor-pointer ${
            language === 'es'
              ? 'bg-emerald-600 text-white shadow-xs font-black scale-100'
              : 'text-rose-100 hover:text-white hover:bg-white/10'
          }`}
          aria-label="Cambiar a Español"
        >
          ES
        </button>
        <span className="text-white/30 text-[10px] select-none">|</span>
        <button
          type="button"
          onClick={() => setLanguage('en')}
          title="English"
          className={`px-2 py-1 rounded-full transition-all duration-200 cursor-pointer ${
            language === 'en'
              ? 'bg-emerald-600 text-white shadow-xs font-black scale-100'
              : 'text-rose-100 hover:text-white hover:bg-white/10'
          }`}
          aria-label="Switch to English"
        >
          EN
        </button>
      </div>
    </div>
  );
};
export default LanguageToggle;
