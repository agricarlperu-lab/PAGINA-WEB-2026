import React, { useState, useEffect } from 'react';
import { EditableMedia } from './EditableMedia';
import { 
  ArrowLeft, 
  MapPin, 
  Flame, 
  Sun, 
  Award, 
  Package, 
  Sparkles, 
  Layers, 
  Send, 
  PhoneCall,
  ChevronRight
} from 'lucide-react';
import { motion } from 'motion/react';

interface CacaoPageProps {
  onBack: () => void;
}

export default function CacaoPage({ onBack }: CacaoPageProps) {
  const [pupilPos, setPupilPos] = useState({ x: 0, y: 0 });
  const [showSpeech, setShowSpeech] = useState(false);

  // Eye tracking logic
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const moveX = (e.clientX - window.innerWidth / 2) / 80;
      const moveY = (e.clientY - window.innerHeight / 2) / 80;
      // Constrain eye movement range slightly
      const limit = 8;
      const x = Math.max(-limit, Math.min(limit, moveX));
      const y = Math.max(-limit, Math.min(limit, moveY));
      setPupilPos({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    
    // Show speech bubble after 2 seconds
    const timer = setTimeout(() => {
      setShowSpeech(true);
    }, 2000);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timer);
    };
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const MascotSvg = ({ idSuffix = '' }) => (
    <svg id={`agricarlito-svg-${idSuffix}`} viewBox="0 -120 300 750" className="w-full h-full">
      <defs>
        <radialGradient id={`ruggedPodGrad-${idSuffix}`} cx="40%" cy="30%" r="80%">
          <stop offset="0%" stopColor="#f5d68d" />
          <stop offset="35%" stopColor="#d4af37" />
          <stop offset="70%" stopColor="#8b4d16" />
          <stop offset="100%" stopColor="#3d2b1f" />
        </radialGradient>
        <linearGradient id={`shoeGreenGrad-${idSuffix}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#22c55e" />
          <stop offset="100%" stopColor="#166534" />
        </linearGradient>
      </defs>
      
      <ellipse cx="150" cy="620" rx="100" ry="18" fill="#3d2b1f" opacity="0.1" />
      
      <g className="anim-body">
        {/* Legs */}
        <g className="anim-leg-l">
          <path d="M125 450 Q115 500, 110 600" stroke="#1d1109" strokeWidth="24" strokeLinecap="round" fill="none" />
          <g transform="translate(80, 600)">
            <path d="M0 0 Q0 -15 20 -15 L45 -15 Q55 -15 55 5 L55 22 Q55 30 45 30 L10 30 Q0 30 0 22 Z" fill={`url(#shoeGreenGrad-${idSuffix})`} />
            <rect x="0" y="24" width="55" height="6" rx="2" fill="#0b2c1a" />
          </g>
        </g>
        <g className="anim-leg-r">
          <path d="M175 450 Q185 500, 190 600" stroke="#1d1109" strokeWidth="24" strokeLinecap="round" fill="none" />
          <g transform="translate(165, 600)">
            <path d="M0 0 Q0 -15 20 -15 L45 -15 Q55 -15 55 5 L55 22 Q55 30 45 30 L10 30 Q0 30 0 22 Z" fill={`url(#shoeGreenGrad-${idSuffix})`} />
            <rect x="0" y="24" width="55" height="6" rx="2" fill="#0b2c1a" />
          </g>
        </g>

        {/* Arms */}
        <g className="anim-arm-l">
          <path d="M85 300 Q30 300, 15 380" stroke="#1d1109" strokeWidth="22" strokeLinecap="round" fill="none" />
          <g transform="translate(-20, 370) rotate(-15)">
            <circle cx="20" cy="20" r="28" fill="#ffffff" stroke="#e5e7eb" strokeWidth="1" />
            <ellipse cx="2" cy="10" rx="8" ry="18" fill="#ffffff" /> 
            <ellipse cx="20" cy="2" rx="8" ry="22" fill="#ffffff" /> 
            <ellipse cx="38" cy="10" rx="8" ry="18" fill="#ffffff" /> 
          </g>
        </g>
        <g className="anim-arm-r">
          <path d="M215 300 Q270 300, 285 380" stroke="#1d1109" strokeWidth="22" strokeLinecap="round" fill="none" />
          <g transform="translate(265, 370) rotate(15)">
            <circle cx="20" cy="20" r="28" fill="#ffffff" stroke="#e5e7eb" strokeWidth="1" />
            <ellipse cx="38" cy="10" rx="8" ry="18" fill="#ffffff" />
            <ellipse cx="20" cy="2" rx="8" ry="22" fill="#ffffff" />
            <ellipse cx="2" cy="10" rx="8" ry="18" fill="#ffffff" />
          </g>
        </g>

        {/* Stem */}
        <g transform="translate(150, 42)">
          <path d="M0 0 L0 -80" stroke="#1d1109" strokeWidth="18" strokeLinecap="round" />
        </g>

        {/* Cocoa Pod Body */}
        <path d="M150 40 C100 40, 55 120, 50 280 C45 440, 100 530, 150 560 C200 530, 255 440, 250 280 C245 120, 200 40, 150 40 Z" fill={`url(#ruggedPodGrad-${idSuffix})`} stroke="#1d1109" strokeWidth="2" />
        
        {/* Rugged details */}
        <g opacity="0.3" fill="none" stroke="#1d1109" strokeWidth="8" strokeLinecap="round">
          <path d="M110 80 Q65 280 100 520" />
          <path d="M150 45 Q135 280 150 540" />
          <path d="M190 80 Q235 280 200 520" />
        </g>

        {/* Face with Blinking and eye-tracking */}
        <g id={`face-${idSuffix}`}>
          <g className="anim-eyes">
            <ellipse cx="110" cy="250" rx="22" ry="30" fill="#ffffff" />
            <circle cx={110 + pupilPos.x} cy={250 + pupilPos.y} r="11" fill="#3d2b1f" />
          </g>
          <g className="anim-eyes">
            <ellipse cx="190" cy="250" rx="22" ry="30" fill="#ffffff" />
            <circle cx={190 + pupilPos.x} cy={250 + pupilPos.y} r="11" fill="#3d2b1f" />
          </g>
          <path d="M130 330 Q150 365 170 330" fill="none" stroke="#3d2b1f" strokeWidth="7" strokeLinecap="round" />
        </g>
      </g>
    </svg>
  );

  return (
    <div className="bg-brand-light text-slate-900 font-sans min-h-screen relative overflow-hidden pb-12 bg-architectural-grid">
      {/* Subtle architectural ambient texture */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.03] z-10 bg-architectural-dots"></div>

      {/* Back button */}
      <div className="max-w-7xl mx-auto px-6 pt-6 relative z-20">
        <button 
          onClick={onBack}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#3d2b1f]/10 text-[#3d2b1f] hover:bg-[#3d2b1f]/25 text-xs font-bold uppercase tracking-widest transition-all duration-300 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Regresar a Productos</span>
        </button>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-[#f5ede4] to-slate-200 z-0"></div>
        
        <div className="relative z-10 text-center max-w-6xl">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-center gap-4 mb-4">
              <span className="w-12 h-[2px] bg-[#b08968]"></span>
              <span className="text-[#3d2b1f] font-black text-[11px] sm:text-[12px] tracking-[0.4em] sm:tracking-[0.6em] uppercase">
                Cacao de la Región San Martín, Perú
              </span>
              <span className="w-12 h-[2px] bg-[#b08968]"></span>
            </div>

            <h1 className="font-serif italic">
              <span className="block text-transparent text-7xl md:text-[9.5rem] font-black leading-none uppercase drop-shadow-lg select-none" style={{ WebkitTextStroke: '1.5px #3d2b1f' }}>
                Linaje
              </span>
              <span className="block bg-gradient-to-r from-[#3d2b1f] to-[#5c4033] bg-clip-text text-transparent text-6xl md:text-[8rem] font-black not-italic -mt-4 md:-mt-12 tracking-tighter uppercase drop-shadow-xl">
                AMAZÓNICO.
              </span>
            </h1>

            <p className="max-w-2xl mx-auto text-sm sm:text-lg md:text-xl text-[#5c4033] font-bold leading-relaxed px-4 uppercase tracking-widest">
              Exportamos la pureza del grano de <span className="text-[#3d2b1f] border-b-2 border-[#d4af37]">San Martín</span> para la alta chocolatería mundial.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
              <a 
                href="https://wa.me/51956352862?text=Hola,%20solicito%20cotización%20de%20sus%20productos%20de%20cacao." 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center gap-4 px-12 py-5 bg-[#3d2b1f] text-white font-black rounded-full hover:bg-[#b08968] hover:scale-105 transition-all shadow-2xl uppercase tracking-widest text-xs"
              >
                <span>SOLICITAR COTIZACIÓN</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Ritual / Proceso Section */}
      <section className="py-24 px-6 bg-white relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif italic mb-4 text-[#3d2b1f] uppercase font-black leading-tight">
              El Ritual del <span className="text-[#b08968]">Cacao de San Martín.</span>
            </h2>
            <p className="text-[#5c4033] font-extrabold uppercase tracking-[0.2em] text-xs">
              Post-Cosecha de Linaje Amazónico
            </p>
            <div className="w-20 h-1.5 bg-[#d4af37] mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-[#2b1d12]/95 backdrop-blur-md border-2 border-[#d4af37] p-8 sm:p-10 rounded-[2.5rem] hover:-translate-y-2 hover:shadow-2xl hover:bg-[#1a110a] transition-all duration-300 shadow-xl text-white">
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                <MapPin className="text-[#d4af37] w-8 h-8" />
              </div>
              <h3 className="text-xl font-black mb-4 uppercase tracking-tighter">Cosecha Selecta</h3>
              <p className="text-sm text-white/90 font-medium leading-relaxed">
                Selección manual grano a grano en las mejores parcelas de la Región San Martín.
              </p>
            </div>

            <div className="bg-[#2b1d12]/95 backdrop-blur-md border-2 border-[#d4af37] p-8 sm:p-10 rounded-[2.5rem] hover:-translate-y-2 hover:shadow-2xl hover:bg-[#1a110a] transition-all duration-300 shadow-xl text-white">
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                <Flame className="text-[#d4af37] w-8 h-8" />
              </div>
              <h3 className="text-xl font-black mb-4 uppercase tracking-tighter">Fermentado Noble</h3>
              <p className="text-sm text-white/90 font-medium leading-relaxed">
                Cajones de madera de laurel para despertar los aromas cítricos y afrutados naturales.
              </p>
            </div>

            <div className="bg-[#2b1d12]/95 backdrop-blur-md border-2 border-[#d4af37] p-8 sm:p-10 rounded-[2.5rem] hover:-translate-y-2 hover:shadow-2xl hover:bg-[#1a110a] transition-all duration-300 shadow-xl text-white">
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                <Sun className="text-[#d4af37] w-8 h-8" />
              </div>
              <h3 className="text-xl font-black mb-4 uppercase tracking-tighter">Secado al Sol</h3>
              <p className="text-sm text-white/90 font-medium leading-relaxed">
                Control estricto de humedad sobre camas africanas bajo el sol de la selva alta.
              </p>
            </div>

            <div className="bg-[#2b1d12]/95 backdrop-blur-md border-2 border-[#d4af37] p-8 sm:p-10 rounded-[2.5rem] hover:-translate-y-2 hover:shadow-2xl hover:bg-[#1a110a] transition-all duration-300 shadow-xl text-white">
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                <Award className="text-[#d4af37] w-8 h-8" />
              </div>
              <h3 className="text-xl font-black mb-4 uppercase tracking-tighter">Grano Exportable</h3>
              <p className="text-sm text-white/90 font-medium leading-relaxed">
                Certificación de calidad SAC para garantizar la pureza del linaje amazónico para todo el mundo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Portafolio Ventas Section */}
      <section className="py-24 px-6 bg-[#fff9f0] relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[#b08968] font-black text-xs uppercase tracking-[0.5em] mb-3 block">
              Portafolio San Martín
            </span>
            <h2 className="text-4xl md:text-6xl font-serif italic text-[#3d2b1f] uppercase font-black">
              Nuestra <span className="text-[#b08968]">Venta Especializada.</span>
            </h2>
            <p className="text-[#5c4033] font-bold uppercase tracking-widest text-xs mt-2">
              Cacao Puro de Exportación de la Región San Martín
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Producto 1 */}
            <div className="bg-white rounded-[2rem] p-6 border border-[#b08968]/20 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden">
              <div className="text-center">
                <div className="h-44 rounded-2xl overflow-hidden mb-6 border border-slate-100 shadow-inner">
                  <EditableMedia
                    mediaKey="img-cacao"
                    src="https://images.unsplash.com/photo-1587132137056-bfbf0166836e?auto=format&fit=crop&q=80&w=800"
                    alt="Cacao Seco Fermentado"
                    title="Cacao Seco Fermentado"
                    section="Página Cacao"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h4 className="text-2xl font-black text-[#3d2b1f] mb-2 uppercase">Cacao Seco</h4>
                <p className="text-[#5c4033] font-extrabold text-xs mb-4 uppercase tracking-widest border-b-2 border-[#b08968] pb-1 inline-block">
                  60% a 80% Fermentación
                </p>
                <p className="text-xs text-[#5c4033] leading-relaxed mb-8 font-bold uppercase">
                  Grano seco de alta calidad con fermentación controlada para obtener perfiles sensoriales profundos.
                </p>
              </div>
              <a 
                href="https://wa.me/51956352862?text=Hola%20Agricarl%20Peru%20SAC,%20deseo%20cotizar%20Cacao%20Seco%20fermentado%20(60-80%25)." 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full py-4 bg-[#d4af37] text-[#3d2b1f] hover:bg-[#3d2b1f] hover:text-white font-black rounded-full transition-all uppercase tracking-[0.2em] text-xs shadow-md flex items-center justify-center gap-2"
              >
                <span>COTIZAR</span>
                <Send className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Producto 2 */}
            <div className="bg-white rounded-[2rem] p-6 border-t-8 border-t-[#d4af37] border-x border-b border-[#b08968]/20 shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden">
              <div className="text-center">
                <div className="h-44 rounded-2xl overflow-hidden mb-6 border border-slate-100 shadow-inner">
                  <EditableMedia
                    mediaKey="img-cacao-nibs"
                    src="https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&q=80&w=800"
                    alt="Nibs de Cacao Puro"
                    title="Nibs de Cacao Puro Tostado"
                    section="Página Cacao"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h4 className="text-2xl font-black text-[#3d2b1f] mb-2 uppercase">Nibs de Cacao</h4>
                <p className="text-[#5c4033] font-extrabold text-xs mb-4 uppercase tracking-widest border-b-2 border-[#b08968] pb-1 inline-block">
                  Súper Alimento Puro
                </p>
                <p className="text-xs text-[#5c4033] leading-relaxed mb-8 font-bold uppercase">
                  Trozos crujientes de cacao puro tostado, perfectos para repostería, snacks y la industria alimentaria.
                </p>
              </div>
              <a 
                href="https://wa.me/51956352862?text=Hola%20Agricarl%20Peru%20SAC,%20deseo%20cotizar%20Nibs%20de%20Cacao%20premium." 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full py-4 bg-[#3d2b1f] text-white hover:bg-[#d4af37] hover:text-[#3d2b1f] font-black rounded-full transition-all uppercase tracking-[0.2em] text-xs shadow-md flex items-center justify-center gap-2"
              >
                <span>COTIZAR</span>
                <Send className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Producto 3 */}
            <div className="bg-white rounded-[2rem] p-6 border border-[#b08968]/20 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden">
              <div className="text-center">
                <div className="h-44 rounded-2xl overflow-hidden mb-6 border border-slate-100 shadow-inner">
                  <EditableMedia
                    mediaKey="img-cacao-cobertura"
                    src="https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&q=80&w=800"
                    alt="Cobertura de Cacao"
                    title="Cobertura de Cacao Fino"
                    section="Página Cacao"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h4 className="text-2xl font-black text-[#3d2b1f] mb-2 uppercase">Cobertura</h4>
                <p className="text-[#5c4033] font-extrabold text-xs mb-4 uppercase tracking-widest border-b-2 border-[#b08968] pb-1 inline-block">
                  Línea Chocolatería
                </p>
                <p className="text-xs text-[#5c4033] leading-relaxed mb-8 font-bold uppercase">
                  Mezcla premium con la fluidez y brillo ideales para baños y bombones de alta calidad.
                </p>
              </div>
              <a 
                href="https://wa.me/51956352862?text=Hola%20Agricarl%20Peru%20SAC,%20deseo%20cotizar%20Cobertura%20de%20Cacao." 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full py-4 bg-[#d4af37] text-[#3d2b1f] hover:bg-[#3d2b1f] hover:text-white font-black rounded-full transition-all uppercase tracking-[0.2em] text-xs shadow-md flex items-center justify-center gap-2"
              >
                <span>COTIZAR</span>
                <Send className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Origen Section */}
      <section className="py-24 px-6 bg-[#f3e5d8] relative overflow-hidden z-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-16 relative z-10">
          <div>
            <div className="inline-flex items-center gap-3 px-5 py-2 bg-[#3d2b1f] rounded-full mb-6 shadow-lg">
              <span className="w-2 h-2 bg-[#d4af37] rounded-full animate-pulse"></span>
              <span className="text-white text-[10px] font-black uppercase tracking-widest">
                Región San Martín · Perú
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-7xl font-serif italic mb-6 leading-none text-[#3d2b1f] uppercase font-black">
              Genética <br />
              <span className="bg-gradient-to-r from-[#3d2b1f] to-[#5c4033] bg-clip-text text-transparent not-italic font-black">
                Pura Amazónica.
              </span>
            </h2>

            <p className="text-[#5c4033] text-base sm:text-lg mb-8 leading-relaxed font-bold">
              El suelo de la Región San Martín otorga a nuestra mazorca una rugosidad característica que protege un tesoro genético inigualable. AGRICARL PERU SAC es sinónimo de trazabilidad de alta pureza.
            </p>

            <a 
              href="https://wa.me/51956352862?text=Hola,%20deseo%20comunicarme%20con%20la%20planta%20en%20San%20Martín." 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-8 py-4 bg-[#3d2b1f] text-white font-black rounded-full hover:bg-[#b08968] hover:scale-105 transition-all shadow-xl inline-block uppercase tracking-widest text-xs"
            >
              CONTACTAR CON PLANTA
            </a>
          </div>

          <div className="relative flex justify-center items-center">
            <div className="absolute inset-0 bg-[#b08968]/10 rounded-full blur-[100px] animate-pulse"></div>
            {/* Large Mascot Display */}
            <div className="w-full max-w-[280px]">
              <MascotSvg idSuffix="large" />
            </div>
          </div>
        </div>
      </section>

      {/* Floating corner mascot */}
      <div className="fixed bottom-6 right-6 z-[200] flex items-center gap-4 pointer-events-none">
        {/* Dialogue Bubble */}
        <a 
          href="https://wa.me/51956352862" 
          target="_blank" 
          rel="noopener noreferrer"
          className={`speech-bubble bg-gradient-to-r from-[#3d2b1f] to-[#5c4033] text-white px-5 py-3 rounded-full font-black text-[10px] shadow-2xl pointer-events-auto relative uppercase tracking-widest italic hover:scale-110 transition-transform ${
            showSpeech ? 'active' : ''
          }`}
        >
          ¡Hola! Cotiza Aquí
          <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[6px] border-l-[#5c4033]"></div>
        </a>

        {/* Mascot Wrapper */}
        <div 
          onClick={handleScrollToTop}
          className="w-24 h-32 md:w-32 md:h-44 pointer-events-auto cursor-pointer drop-shadow-[0_10px_25px_rgba(61,43,31,0.3)] hover:scale-105 transition-all"
          title="Subir"
        >
          <MascotSvg idSuffix="floating" />
        </div>
      </div>
    </div>
  );
}
