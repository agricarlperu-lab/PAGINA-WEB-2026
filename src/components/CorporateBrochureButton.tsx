import React, { useState } from 'react';
import { FileDown, CheckCircle2, Loader2, Sparkles } from 'lucide-react';
import { generateCorporateBrochure } from '../utils/brochurePdfGenerator';
import { useLanguage } from '../context/LanguageContext';

interface Props {
  variant?: 'header' | 'floating' | 'banner' | 'footer';
  className?: string;
  companyRuc?: string;
  email?: string;
  phone?: string;
  location?: string;
}

export const CorporateBrochureButton: React.FC<Props> = ({
  variant = 'header',
  className = '',
  companyRuc = '20611291001',
  email = 'operaciones@agricarlperu.com',
  phone = '+51 956 352 862',
  location = 'Región San Martín, Amazonía del Perú'
}) => {
  const { language, translations } = useLanguage();
  const [downloading, setDownloading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleDownload = () => {
    if (downloading) return;
    setDownloading(true);

    try {
      setTimeout(() => {
        generateCorporateBrochure({
          companyName: 'AGRICARL PERÚ S.A.C.',
          companyRuc,
          email,
          phone,
          location,
          website: 'http://www.agricarlperu.com'
        });
        setDownloading(false);
        setSuccess(true);

        setTimeout(() => {
          setSuccess(false);
        }, 3500);
      }, 400);
    } catch (err) {
      console.error('Error al generar el brochure:', err);
      setDownloading(false);
    }
  };

  if (variant === 'floating') {
    return (
      <div className="fixed bottom-5 right-5 z-40 print:hidden flex flex-col items-end gap-2 group">
        {/* Toast / Notification feedback when downloaded */}
        {success && (
          <div className="bg-slate-900/95 text-white px-3.5 py-2 rounded-xl text-xs font-medium shadow-2xl border border-emerald-500/40 flex items-center gap-2 animate-bounce">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{translations.nav.brochureDownloaded}</span>
          </div>
        )}

        <button
          onClick={handleDownload}
          disabled={downloading}
          className={`relative flex items-center gap-2.5 px-4 py-3 sm:py-3.5 rounded-full shadow-[0_10px_30px_-5px_rgba(7,37,24,0.4)] transition-all duration-300 cursor-pointer overflow-hidden border border-emerald-500/30 ${
            downloading 
              ? 'bg-slate-800 text-slate-300' 
              : 'bg-gradient-to-r from-[#072518] via-[#0d7a46] to-[#072518] text-white hover:shadow-emerald-900/50 hover:scale-105 active:scale-95'
          } ${className}`}
          title={language === 'es' ? 'Descargar Brochure Corporativo en PDF' : 'Download Corporate Brochure in PDF'}
          aria-label={language === 'es' ? 'Descargar Brochure Corporativo en PDF' : 'Download Corporate Brochure in PDF'}
        >
          {/* Subtle shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

          {downloading ? (
            <Loader2 className="w-5 h-5 animate-spin text-emerald-400" />
          ) : success ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-300" />
          ) : (
            <div className="relative">
              <FileDown className="w-5 h-5 text-emerald-300" />
              <span className="absolute -top-1 -right-1 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            </div>
          )}

          <div className="flex flex-col text-left">
            <span className="text-xs font-bold font-display uppercase tracking-wider leading-tight flex items-center gap-1">
              {language === 'es' ? 'Brochure Corporativo' : 'Corporate Brochure'}
              <span className="text-[9px] bg-emerald-400/20 text-emerald-300 font-mono px-1.5 py-0.2 rounded border border-emerald-400/30">
                PDF
              </span>
            </span>
            <span className="text-[10px] text-emerald-200/80 font-mono tracking-tight hidden sm:block">
              {downloading ? translations.nav.generatingFile : (language === 'es' ? 'Productos & Servicios 2026' : 'Products & Services 2026')}
            </span>
          </div>
        </button>
      </div>
    );
  }

  // Header quick access variant
  return (
    <div className="relative inline-flex items-center">
      {success && (
        <div className="absolute -bottom-9 right-0 bg-slate-900 text-white px-2.5 py-1 rounded-lg text-[10px] font-medium shadow-xl border border-emerald-500/40 flex items-center gap-1.5 whitespace-nowrap z-50">
          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
          <span>{translations.nav.brochureDownloaded}</span>
        </div>
      )}

      <button
        onClick={handleDownload}
        disabled={downloading}
        className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer border ${
          variant === 'header'
            ? 'bg-white/10 hover:bg-white/20 text-white hover:text-rose-100 border-white/20 hover:border-white/40 shadow-2xs active:scale-95'
            : 'bg-white/10 hover:bg-white/20 text-white border-white/20'
        } ${className}`}
        title={language === 'es' ? 'Descargar Brochure Corporativo AGRICARL PERÚ en formato PDF' : 'Download AGRICARL PERÚ Corporate Brochure in PDF'}
      >
        {downloading ? (
          <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-400" />
        ) : (
          <FileDown className="w-3.5 h-3.5 text-emerald-400" />
        )}
        <span className="font-mono text-[11px] font-bold">{translations.nav.brochurePdf}</span>
      </button>
    </div>
  );
};
