import React from 'react';
import { Leaf, Diamond, Compass, Sparkles, Sprout } from 'lucide-react';

export type DividerVariant = 'leaf' | 'dots' | 'diamond' | 'technical' | 'gradient';

interface SectionDividerProps {
  variant?: DividerVariant;
  label?: string;
  className?: string;
  accentColor?: 'green' | 'pink' | 'slate' | 'gold';
}

export const SectionDivider: React.FC<SectionDividerProps> = ({
  variant = 'leaf',
  label,
  className = '',
  accentColor = 'green',
}) => {
  const getAccentConfig = () => {
    switch (accentColor) {
      case 'pink':
        return {
          lineFrom: 'rgba(236,72,153,0)',
          lineTo: 'rgba(236,72,153,0.35)',
          dotBg: 'bg-brand-pink-accent',
          chipBg: 'bg-pink-50/80',
          chipBorder: 'border-pink-200/80',
          chipText: 'text-pink-800',
          iconColor: 'text-[#d81b60]',
          patternFill: '#ec4899',
        };
      case 'gold':
        return {
          lineFrom: 'rgba(217,119,6,0)',
          lineTo: 'rgba(217,119,6,0.35)',
          dotBg: 'bg-amber-500',
          chipBg: 'bg-amber-50/80',
          chipBorder: 'border-amber-200/80',
          chipText: 'text-amber-800',
          iconColor: 'text-amber-600',
          patternFill: '#d97706',
        };
      case 'slate':
        return {
          lineFrom: 'rgba(100,116,139,0)',
          lineTo: 'rgba(100,116,139,0.25)',
          dotBg: 'bg-slate-400',
          chipBg: 'bg-slate-50/90',
          chipBorder: 'border-slate-200',
          chipText: 'text-slate-600',
          iconColor: 'text-slate-500',
          patternFill: '#64748b',
        };
      case 'green':
      default:
        return {
          lineFrom: 'rgba(13,122,70,0)',
          lineTo: 'rgba(13,122,70,0.35)',
          dotBg: 'bg-brand-green',
          chipBg: 'bg-emerald-50/80',
          chipBorder: 'border-emerald-200/80',
          chipText: 'text-emerald-800',
          iconColor: 'text-[#0d7a46]',
          patternFill: '#0d7a46',
        };
    }
  };

  const config = getAccentConfig();

  return (
    <div 
      className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 select-none ${className}`} 
      role="separator" 
      aria-label={label || 'Separador decorativo de sección'}
    >
      <div className="relative flex items-center justify-center">
        {/* Subtle patterned horizontal line layer */}
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full relative h-[1px]">
            {/* Smooth dual-tapered horizontal hairline rule */}
            <div 
              className="w-full h-[1px]" 
              style={{
                background: `linear-gradient(90deg, transparent 0%, ${config.lineTo} 35%, ${config.lineTo} 65%, transparent 100%)`
              }}
            />

            {/* Subtle repeating micro-pattern overlay */}
            {variant === 'dots' && (
              <div 
                className="absolute inset-x-12 -top-1.5 bottom-0 h-3 opacity-30 pointer-events-none"
                style={{
                  backgroundImage: `radial-gradient(circle, ${config.patternFill} 1px, transparent 1px)`,
                  backgroundSize: '16px 8px',
                  maskImage: 'linear-gradient(90deg, transparent, black 20%, black 80%, transparent)',
                  WebkitMaskImage: 'linear-gradient(90deg, transparent, black 20%, black 80%, transparent)',
                }}
              />
            )}

            {variant === 'technical' && (
              <div 
                className="absolute inset-x-16 -top-1 bottom-0 h-2 opacity-25 pointer-events-none"
                style={{
                  backgroundImage: `repeating-linear-gradient(90deg, ${config.patternFill} 0, ${config.patternFill} 2px, transparent 2px, transparent 12px)`,
                  maskImage: 'linear-gradient(90deg, transparent, black 25%, black 75%, transparent)',
                  WebkitMaskImage: 'linear-gradient(90deg, transparent, black 25%, black 75%, transparent)',
                }}
              />
            )}
          </div>
        </div>

        {/* Center badge / decorative ornamental motif */}
        <div className="relative z-10 flex items-center gap-3 bg-brand-light px-5 py-1">
          {variant === 'leaf' && (
            <div className="flex items-center gap-2.5">
              <span className={`w-1.5 h-1.5 rounded-full ${config.dotBg} opacity-50`} />
              <div className={`w-7 h-7 rounded-full bg-white shadow-xs border ${config.chipBorder} flex items-center justify-center transition-transform duration-300 hover:scale-105`}>
                <Leaf className={`w-3.5 h-3.5 ${config.iconColor}`} />
              </div>
              {label && (
                <span className={`font-mono text-[9.5px] font-bold uppercase tracking-[0.22em] ${config.chipText}`}>
                  {label}
                </span>
              )}
              <span className={`w-1.5 h-1.5 rounded-full ${config.dotBg} opacity-50`} />
            </div>
          )}

          {variant === 'diamond' && (
            <div className="flex items-center gap-2.5">
              <span className="w-1 h-1 rotate-45 bg-slate-300" />
              <div className={`w-6 h-6 rotate-45 rounded-xs bg-white shadow-xs border ${config.chipBorder} flex items-center justify-center`}>
                <Diamond className={`w-2.5 h-2.5 -rotate-45 ${config.iconColor} fill-current/15`} />
              </div>
              {label && (
                <span className={`font-mono text-[9.5px] font-bold uppercase tracking-[0.22em] ${config.chipText}`}>
                  {label}
                </span>
              )}
              <span className="w-1 h-1 rotate-45 bg-slate-300" />
            </div>
          )}

          {variant === 'dots' && (
            <div className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-slate-300" />
              <span className={`w-1.5 h-1.5 rounded-full ${config.dotBg} opacity-70`} />
              <span className={`w-2.5 h-2.5 rounded-full ${config.dotBg} shadow-xs ring-2 ring-white`} />
              {label && (
                <span className={`font-mono text-[9.5px] font-bold uppercase tracking-[0.22em] px-2 ${config.chipText}`}>
                  {label}
                </span>
              )}
              <span className={`w-2.5 h-2.5 rounded-full ${config.dotBg} shadow-xs ring-2 ring-white`} />
              <span className={`w-1.5 h-1.5 rounded-full ${config.dotBg} opacity-70`} />
              <span className="w-1 h-1 rounded-full bg-slate-300" />
            </div>
          )}

          {variant === 'technical' && (
            <div className="flex items-center gap-2.5">
              <div className="flex items-center gap-1 opacity-50 font-mono text-[9px] text-slate-400">
                <span>[</span>
                <span className={`w-1 h-1 rounded-full ${config.dotBg}`} />
                <span>]</span>
              </div>
              <div className={`px-3 py-1 rounded-full bg-white border ${config.chipBorder} shadow-2xs flex items-center gap-1.5`}>
                <Compass className={`w-3 h-3 ${config.iconColor}`} />
                <span className={`font-mono text-[9px] font-bold uppercase tracking-[0.22em] ${config.chipText}`}>
                  {label || 'AGRICARL PERÚ · SAN MARTÍN'}
                </span>
              </div>
              <div className="flex items-center gap-1 opacity-50 font-mono text-[9px] text-slate-400">
                <span>[</span>
                <span className={`w-1 h-1 rounded-full ${config.dotBg}`} />
                <span>]</span>
              </div>
            </div>
          )}

          {variant === 'gradient' && (
            <div className="flex items-center gap-2.5">
              <div className="w-2 h-2 rounded-full bg-gradient-to-tr from-brand-green to-emerald-400 shadow-2xs" />
              {label && (
                <span className={`font-mono text-[9.5px] font-bold uppercase tracking-[0.25em] ${config.chipText}`}>
                  {label}
                </span>
              )}
              <div className="w-2 h-2 rounded-full bg-gradient-to-tr from-[#ec4899] to-pink-300 shadow-2xs" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
