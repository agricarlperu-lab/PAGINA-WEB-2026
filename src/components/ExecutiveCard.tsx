import React from 'react';
import { Phone, Mail, Globe, ShieldCheck, MapPin } from 'lucide-react';
import logoAmazonico from '../agricarl_logo_amazonico.svg';
import { useLanguage } from '../context/LanguageContext';

interface Props {
  className?: string;
  variant?: 'light' | 'dark';
}

export const ExecutiveCard: React.FC<Props> = ({ 
  className = '',
  variant = 'light'
}) => {
  const { language } = useLanguage();
  const isDark = variant === 'dark';

  return (
    <div 
      className={`rounded-2xl p-6 sm:p-7 border transition-all ${
        isDark 
          ? 'bg-slate-900/90 border-slate-800 text-white shadow-xl' 
          : 'bg-white border-slate-200/90 text-slate-800 shadow-md hover:shadow-lg'
      } ${className}`}
    >
      <div className="flex flex-col sm:flex-row items-center sm:items-stretch gap-6">
        
        {/* Left: Logo & Company Name + RUC */}
        <div className="flex flex-col items-center justify-center text-center sm:w-48 shrink-0 space-y-2">
          <div className="relative w-24 h-24 flex items-center justify-center">
            <img 
              src={logoAmazonico} 
              alt="Logo AGRICARL PERU S.A.C." 
              className="w-full h-full object-contain filter drop-shadow-md"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <p className={`font-display font-black text-xs uppercase tracking-wider ${isDark ? 'text-white' : 'text-slate-900'}`}>
              AGRICARL PERU S.A.C.
            </p>
            <p className="font-mono text-[11px] font-bold text-pink-600 dark:text-pink-400 mt-0.5">
              (RUC: 20611291001)
            </p>
          </div>
        </div>

        {/* Vertical Divider (Barra Púrpura / Magenta) */}
        <div className="hidden sm:block w-1 rounded-full bg-gradient-to-b from-purple-700 via-pink-600 to-purple-800 shrink-0 self-stretch my-1 opacity-90" />
        <div className="sm:hidden w-32 h-1 rounded-full bg-gradient-to-r from-purple-700 via-pink-600 to-purple-800 my-1 opacity-90" />

        {/* Right: Official Contact Channels */}
        <div className="flex flex-col justify-center space-y-3.5 flex-grow text-center sm:text-left">
          <div>
            <h4 className={`font-display font-black text-base sm:text-lg tracking-tight ${isDark ? 'text-white' : 'text-slate-950'}`}>
              {language === 'es' ? 'Canales Corporativos Oficiales' : 'Official Corporate Channels'}
            </h4>
            <p className={`text-xs sm:text-sm font-medium ${isDark ? 'text-pink-300' : 'text-pink-700'}`}>
              {language === 'es' ? 'Atención Comercial, Operativa & Envíos' : 'Commercial Support, Operations & Logistics'}
            </p>
          </div>

          <div className="space-y-2.5 text-xs sm:text-sm">
            {/* Phone */}
            <div className="flex items-center justify-center sm:justify-start gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
                <Phone className="w-3.5 h-3.5" />
              </div>
              <a 
                href="https://wa.me/51956352862" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={`font-mono font-bold hover:text-emerald-600 transition-colors ${isDark ? 'text-slate-200' : 'text-slate-900'}`}
              >
                956 352 862
              </a>
            </div>

            {/* Email */}
            <div className="flex items-center justify-center sm:justify-start gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-blue-500/10 text-blue-600 flex items-center justify-center shrink-0">
                <Mail className="w-3.5 h-3.5" />
              </div>
              <a 
                href="mailto:operaciones@agricarlperu.com" 
                className="font-medium text-blue-600 hover:underline break-all transition-colors"
              >
                operaciones@agricarlperu.com
              </a>
            </div>

            {/* Website */}
            <div className="flex items-center justify-center sm:justify-start gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-cyan-500/10 text-cyan-600 flex items-center justify-center shrink-0">
                <Globe className="w-3.5 h-3.5" />
              </div>
              <a 
                href="http://www.agricarlperu.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="font-medium text-cyan-700 dark:text-cyan-400 hover:underline transition-colors"
              >
                http://www.agricarlperu.com
              </a>
            </div>

            {/* Location */}
            <div className="flex items-center justify-center sm:justify-start gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0">
                <MapPin className="w-3.5 h-3.5" />
              </div>
              <span className={`text-xs ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                {language === 'es' ? 'Región San Martín, Amazonía del Perú' : 'San Martín Region, Peruvian Amazon'}
              </span>
            </div>
          </div>
        </div>

      </div>

      <div className={`mt-5 pt-3.5 border-t flex items-center justify-between text-[10px] font-mono ${
        isDark ? 'border-slate-800 text-slate-400' : 'border-slate-100 text-slate-500'
      }`}>
        <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
          <ShieldCheck className="w-3.5 h-3.5" />
          {language === 'es' ? 'Acreditación Institucional Vigente' : 'Active Institutional Accreditation'}
        </span>
        <span>RUC: 20611291001</span>
      </div>
    </div>
  );
};
