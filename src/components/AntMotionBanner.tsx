import React, { useState } from 'react';
import { Play, Pause, Compass, ShieldCheck, TreePine, Award } from 'lucide-react';
import { isVideoUrl } from './AnimatedImageCarousel';

interface AntMotionBannerProps {
  heroBgUrl: string;
}

export const AntMotionBanner: React.FC<AntMotionBannerProps> = ({
  heroBgUrl,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);

  // Default pristine Amazonian canopy imagery fallback
  const activeBg = heroBgUrl || 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=1920';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-10">
      <div className="relative rounded-3xl overflow-hidden border border-emerald-950/20 shadow-2xl bg-slate-950 group">
        
        {/* Background Video or High-Res Image Layer */}
        {isVideoUrl(activeBg) ? (
          <video
            src={activeBg}
            autoPlay={isPlaying}
            loop
            muted
            playsInline
            className="w-full h-[320px] sm:h-[400px] object-cover opacity-75 group-hover:scale-102 transition-transform duration-1000 ease-out"
          />
        ) : (
          <img
            src={activeBg}
            alt="Paisaje y Ecosistema de San Martín AGRICARL"
            className="w-full h-[320px] sm:h-[400px] object-cover opacity-75 group-hover:scale-102 transition-transform duration-1000 ease-out"
            referrerPolicy="no-referrer"
          />
        )}

        {/* Sophisticated Dark Cinematic Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-slate-950/30 p-8 sm:p-12 flex flex-col justify-between">
          
          {/* Top Bar Badges */}
          <div className="flex items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2.5 bg-black/60 border border-emerald-500/30 px-4 py-1.5 rounded-full backdrop-blur-md text-emerald-300 text-xs font-mono font-medium tracking-wider">
              <TreePine className="w-3.5 h-3.5 text-emerald-400" />
              <span>AGRICARL PERÚ · Conectando al agricultor con el mercado</span>
            </div>

            {isVideoUrl(activeBg) && (
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="bg-black/60 hover:bg-black/80 text-white p-2.5 rounded-full backdrop-blur-md border border-white/20 transition-all cursor-pointer print:hidden"
                title={isPlaying ? 'Pausar Video' : 'Reproducir Video'}
                aria-label={isPlaying ? 'Pausar video' : 'Reproducir video'}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5 text-amber-300" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
              </button>
            )}
          </div>

          {/* Bottom Content & Pillar Highlights */}
          <div className="space-y-6 max-w-3xl">
            <div className="space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-emerald-400 font-bold">
                Trazabilidad & Biodiversidad
              </span>
              <h3 className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-white uppercase tracking-tight">
                El Valor de la Tierra con Rigor Científico
              </h3>
              <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed max-w-2xl">
                Operamos en alianza con comunidades de agricultores locales en San Martín, impulsando la recolección responsable de Sacha Inchi y Cacao con certificaciones de pureza y comercio transparente.
              </p>
            </div>

            {/* Micro-Features Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2 border-t border-white/10 text-white">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-xs font-medium text-slate-200">100% Granos Seleccionados</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Award className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-xs font-medium text-slate-200">Control Sanitario Estricto</span>
              </div>
              <div className="flex items-center gap-2.5 col-span-2 sm:col-span-1">
                <Compass className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-xs font-medium text-slate-200">Exportación Internacional</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
