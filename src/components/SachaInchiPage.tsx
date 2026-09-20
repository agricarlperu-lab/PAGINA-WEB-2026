import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Leaf, 
  ChevronRight, 
  Sun, 
  Droplet, 
  ShieldCheck, 
  Box, 
  Star, 
  Droplets, 
  Send, 
  PhoneCall 
} from 'lucide-react';
import { motion } from 'motion/react';
import EditableMedia from './EditableMedia';
import EditableBackground from './EditableBackground';

interface SachaInchiPageProps {
  onBack: () => void;
}

export default function SachaInchiPage({ onBack }: SachaInchiPageProps) {
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
    <svg id={`sachita-svg-${idSuffix}`} viewBox="0 -100 300 700" className="w-full h-full">
      <defs>
        {/* Gradiente Cáscara Marrón */}
        <linearGradient id={`shellGrad-${idSuffix}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6d4c41" />
          <stop offset="100%" stopColor="#3e2723" />
        </linearGradient>
        {/* Gradiente Almendra */}
        <radialGradient id={`almondGrad-${idSuffix}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff9c4" />
          <stop offset="80%" stopColor="#fdd835" />
          <stop offset="100%" stopColor="#c5a000" />
        </radialGradient>
      </defs>
      
      {/* Base shadow */}
      <ellipse cx="150" cy="580" rx="90" ry="15" fill="#1b2612" opacity="0.1" />
      
      <g className="anim-body">
        {/* Legs */}
        <g className="anim-leg-l">
          <path d="M125 450 L115 560" stroke="#3e2723" strokeWidth="20" strokeLinecap="round" fill="none" />
          <path d="M90 560 L130 560" stroke="#d4af37" strokeWidth="12" strokeLinecap="round" />
        </g>
        <g className="anim-leg-r">
          <path d="M175 450 L185 560" stroke="#3e2723" strokeWidth="20" strokeLinecap="round" fill="none" />
          <path d="M170 560 L210 560" stroke="#d4af37" strokeWidth="12" strokeLinecap="round" />
        </g>

        {/* Arms with hands */}
        <g className="anim-arm-l">
          <path d="M100 320 Q40 320, 30 380" stroke="#3e2723" strokeWidth="18" strokeLinecap="round" fill="none" />
          <g transform="translate(15, 375) rotate(-20)">
            <path d="M10 0 C0 0 -5 10 -5 20 C-5 30 5 40 15 40 C25 40 35 30 35 20 C35 10 30 0 20 0 Z" fill="#ffffff" stroke="#e5e7eb" strokeWidth="1" />
          </g>
        </g>
        <g className="anim-arm-r">
          <path d="M200 320 Q260 320, 270 380" stroke="#3e2723" strokeWidth="18" strokeLinecap="round" fill="none" />
          <g transform="translate(265, 375) rotate(20)">
            <path d="M10 0 C0 0 -5 10 -5 20 C-5 30 5 40 15 40 C25 40 35 30 35 20 C35 10 30 0 20 0 Z" fill="#ffffff" stroke="#e5e7eb" strokeWidth="1" />
          </g>
        </g>

        {/* 5-pointed star body */}
        <g transform="translate(150, 280)">
          <path d="M0 -180 C40 -120, 160 -150, 170 -50 C180 50, 140 160, 100 170 C40 180, 0 140, -100 170 C-140 160, -180 50, -170 -50 C-160 -150, -40 -120, 0 -180 Z" fill={`url(#shellGrad-${idSuffix})`} stroke="#1b2612" strokeWidth="3" />
          <g opacity="0.8">
            <path d="M0 0 L0 -170" stroke="#1b2612" strokeWidth="4" strokeDasharray="10 5" />
            <path d="M0 0 L160 -50" stroke="#1b2612" strokeWidth="4" strokeDasharray="10 5" />
            <path d="M0 0 L100 160" stroke="#1b2612" strokeWidth="4" strokeDasharray="10 5" />
            <path d="M0 0 L-100 160" stroke="#1b2612" strokeWidth="4" strokeDasharray="10 5" />
            <path d="M0 0 L-160 -50" stroke="#1b2612" strokeWidth="4" strokeDasharray="10 5" />
          </g>
          <ellipse cx="0" cy="-80" rx="35" ry="60" fill={`url(#almondGrad-${idSuffix})`} transform="rotate(0, 0, -80)" />
          <ellipse cx="75" cy="-25" rx="35" ry="60" fill={`url(#almondGrad-${idSuffix})`} transform="rotate(72, 75, -25)" />
          <ellipse cx="45" cy="70" rx="35" ry="60" fill={`url(#almondGrad-${idSuffix})`} transform="rotate(144, 45, 70)" />
          <ellipse cx="-45" cy="70" rx="35" ry="60" fill={`url(#almondGrad-${idSuffix})`} transform="rotate(216, -45, 70)" />
          <ellipse cx="-75" cy="-25" rx="35" ry="60" fill={`url(#almondGrad-${idSuffix})`} transform="rotate(288, -75, -25)" />
          <circle cx="0" cy="0" r="15" fill="#1b1109" />
        </g>

        {/* Eyes & Smile */}
        <g id={`face-${idSuffix}`}>
          <g className="anim-eyes">
            <ellipse cx="125" cy="270" rx="18" ry="24" fill="#ffffff" />
            <circle cx={125 + pupilPos.x} cy={270 + pupilPos.y} r="9" fill="#1b2612" />
          </g>
          <g className="anim-eyes">
            <ellipse cx="175" cy="270" rx="18" ry="24" fill="#ffffff" />
            <circle cx={175 + pupilPos.x} cy={270 + pupilPos.y} r="9" fill="#1b2612" />
          </g>
          <path d="M140 310 Q150 325 160 310" fill="none" stroke="#3e2723" strokeWidth="5" strokeLinecap="round" />
        </g>
      </g>
    </svg>
  );

  return (
    <div className="bg-brand-light text-slate-900 font-sans min-h-screen relative overflow-hidden pb-12 bg-architectural-grid">
      {/* Subtle architectural ambient texture */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.03] z-10 bg-architectural-dots"></div>

      {/* Hero Header Back Link */}
      <div className="max-w-7xl mx-auto px-6 pt-6 relative z-20">
        <button 
          onClick={onBack}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#2d5a27]/10 text-[#2d5a27] hover:bg-[#2d5a27]/25 text-xs font-bold uppercase tracking-widest transition-all duration-300 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Regresar a Productos</span>
        </button>
      </div>

      {/* Hero Section */}
      <EditableBackground
        sectionKey="bg-sacha-hero"
        title="Fondo Portada Sacha Inchi"
        defaultColor="#eef6ee"
        defaultOpacity={0.9}
        defaultPattern="dots"
        className="relative min-h-[85vh] flex items-center justify-center overflow-hidden px-4"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-[#eef6ee] to-slate-200 z-0 opacity-40"></div>
        
        <div className="relative z-10 text-center max-w-6xl">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-center gap-4 mb-4">
              <span className="w-12 h-[2px] bg-[#d4af37]"></span>
              <span className="text-[#2d5a27] font-black text-[11px] sm:text-[12px] tracking-[0.4em] sm:tracking-[0.6em] uppercase">
                Superfood de San Martín, Perú
              </span>
              <span className="w-12 h-[2px] bg-[#d4af37]"></span>
            </div>

            <h1 className="font-serif italic">
              <span className="block text-transparent text-7xl md:text-[9.5rem] font-black leading-none uppercase drop-shadow-md select-none" style={{ WebkitTextStroke: '1.5px #2d5a27' }}>
                Tesoro
              </span>
              <span className="block bg-gradient-to-r from-[#2d5a27] to-[#4a7c44] bg-clip-text text-transparent text-6xl md:text-[8rem] font-black not-italic -mt-4 md:-mt-12 tracking-tighter uppercase drop-shadow-lg">
                AMAZÓNICO.
              </span>
            </h1>

            <p className="max-w-2xl mx-auto text-sm sm:text-lg md:text-xl text-[#2d5a27] font-bold leading-relaxed px-4 uppercase tracking-widest">
              El Omega milenario de <span className="border-b-2 border-[#d4af37] text-[#1b2612]">San Martín</span> procesado con estándares de excelencia mundial.
            </p>

            {/* Foto Destacada Sacha Inchi en Hero */}
            <div className="max-w-lg mx-auto my-6 px-4">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-[#4a7c44]/30 bg-white/60 backdrop-blur-sm aspect-[16/10] group">
                <EditableMedia
                  mediaKey="img-sacha-inchi"
                  src="https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&q=80&w=800"
                  alt="Sacha Inchi de San Martín"
                  title="Foto Principal Sacha Inchi"
                  section="Portada Sacha Inchi"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-3 left-3 pointer-events-none">
                  <span className="bg-[#2d5a27]/90 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full backdrop-blur-md shadow-md">
                    Plukenetia volubilis · San Martín
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-4">
              <a 
                href="https://wa.me/51956352862?text=Hola,%20solicito%20cotización%20de%20Sacha%20Inchi%20(Semilla,%20Almendra,%20Aceite)." 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center gap-4 px-12 py-5 bg-[#2d5a27] text-white font-black rounded-full hover:bg-[#4b3621] hover:scale-105 transition-all shadow-2xl uppercase tracking-widest text-xs"
              >
                <span>SOLICITAR COTIZACIÓN</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>
        </div>
      </EditableBackground>

      {/* Proceso / Calidad Section */}
      <section className="py-24 px-6 bg-white relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif italic mb-4 text-[#2d5a27] uppercase font-black leading-tight">
              EL MANI DE LOS INCAS, <br />
              <span className="text-[#d4af37] not-italic font-sans text-xl md:text-2xl font-black block mt-2">
                El aceite más rico en ácidos grasos insaturados.
              </span>
            </h2>
            <p className="text-[#4a7c44] font-extrabold uppercase tracking-[0.2em] text-xs">
              Procesos de Calidad Agricarl Peru SAC
            </p>
            <div className="w-20 h-1.5 bg-[#d4af37] mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-[#1b2612]/95 backdrop-blur-md border-2 border-[#d4af37] p-8 sm:p-10 rounded-[2rem] hover:-translate-y-2 hover:shadow-2xl hover:bg-[#121e0b] transition-all duration-300 shadow-xl text-white">
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                <Leaf className="text-[#d4af37] w-8 h-8" />
              </div>
              <h3 className="text-xl font-black mb-4 uppercase tracking-tighter">Cosecha Sostenible</h3>
              <p className="text-sm text-white/90 font-medium leading-relaxed">
                Recolección de frutos maduros asegurando la concentración máxima de nutrientes y Omegas.
              </p>
            </div>

            <div className="bg-[#1b2612]/95 backdrop-blur-md border-2 border-[#d4af37] p-8 sm:p-10 rounded-[2rem] hover:-translate-y-2 hover:shadow-2xl hover:bg-[#121e0b] transition-all duration-300 shadow-xl text-white">
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                <Sun className="text-[#d4af37] w-8 h-8" />
              </div>
              <h3 className="text-xl font-black mb-4 uppercase tracking-tighter">Secado Natural</h3>
              <p className="text-sm text-white/90 font-medium leading-relaxed">
                Deshidratación técnica para preservar la integridad de la almendra y sus aceites esenciales.
              </p>
            </div>

            <div className="bg-[#1b2612]/95 backdrop-blur-md border-2 border-[#d4af37] p-8 sm:p-10 rounded-[2rem] hover:-translate-y-2 hover:shadow-2xl hover:bg-[#121e0b] transition-all duration-300 shadow-xl text-white">
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                <Droplet className="text-[#d4af37] w-8 h-8" />
              </div>
              <h3 className="text-xl font-black mb-4 uppercase tracking-tighter">Prensado Frío</h3>
              <p className="text-sm text-white/90 font-medium leading-relaxed">
                Extracción mecánica sin químicos para obtener un aceite virgen de pureza absoluta.
              </p>
            </div>

            <div className="bg-[#1b2612]/95 backdrop-blur-md border-2 border-[#d4af37] p-8 sm:p-10 rounded-[2rem] hover:-translate-y-2 hover:shadow-2xl hover:bg-[#121e0b] transition-all duration-300 shadow-xl text-white">
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                <ShieldCheck className="text-[#d4af37] w-8 h-8" />
              </div>
              <h3 className="text-xl font-black mb-4 uppercase tracking-tighter">Garantía SAC</h3>
              <p className="text-sm text-white/90 font-medium leading-relaxed">
                Trazabilidad completa desde el campo amazónico hasta el destino final con el respaldo de AGRICARL PERU SAC.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Portafolio de Productos (Venta) */}
      <section className="py-24 px-6 bg-[#fcfdfa] relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[#4a7c44] font-black text-xs uppercase tracking-[0.5em] mb-3 block">
              Portafolio Nutricional
            </span>
            <h2 className="text-4xl md:text-6xl font-serif italic text-[#2d5a27] uppercase font-black">
              Nuestros <span className="text-[#d4af37]">Derivados.</span>
            </h2>
            <p className="text-[#2d5a27] font-bold uppercase tracking-widest text-xs mt-2">
              Proteína y Omega 3-6-9 de Origen Vegetal
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Producto 1 */}
            <div className="bg-white rounded-[2rem] p-6 border border-[#4a7c44]/20 shadow-lg hover:shadow-2xl hover:border-[#d4af37] transition-all duration-300 flex flex-col justify-between overflow-hidden">
              <div className="text-center">
                <div className="h-44 rounded-2xl overflow-hidden mb-6 border border-slate-100 shadow-inner">
                  <EditableMedia
                    mediaKey="img-sacha-inchi"
                    src="https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&q=80&w=800"
                    alt="Semilla Seca de Sacha Inchi"
                    title="Semilla Seca de Sacha Inchi"
                    section="Catálogo Sacha Inchi"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h4 className="text-2xl font-black text-[#2d5a27] mb-2 uppercase">Semilla Seca</h4>
                <p className="text-[#4a7c44] font-extrabold text-xs mb-4 uppercase tracking-widest border-b-2 border-[#d4af37] pb-1 inline-block">
                  Grano Entero
                </p>
                <p className="text-xs text-[#4b3621] leading-relaxed mb-8 font-bold uppercase">
                  Semilla de Sacha Inchi con cáscara, ideal para procesos industriales de transformación.
                </p>
              </div>
              <a 
                href="https://wa.me/51956352862?text=Hola,%20deseo%20cotizar%20Semilla%20Seca%20de%20Sacha%20Inchi." 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full py-4 bg-[#d4af37] text-white hover:bg-[#2d5a27] font-black rounded-full transition-all uppercase tracking-[0.2em] text-xs shadow-md flex items-center justify-center gap-2"
              >
                <span>COTIZAR</span>
                <Send className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Producto 2 */}
            <div className="bg-white rounded-[2rem] p-6 border-t-8 border-t-[#d4af37] border-x border-b border-[#4a7c44]/20 shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden">
              <div className="text-center">
                <div className="h-44 rounded-2xl overflow-hidden mb-6 border border-slate-100 shadow-inner">
                  <EditableMedia
                    mediaKey="img-sacha-almendra"
                    src="https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&q=80&w=800"
                    alt="Almendra Seca de Sacha Inchi"
                    title="Almendra Seca de Sacha Inchi"
                    section="Catálogo Sacha Inchi"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h4 className="text-2xl font-black text-[#2d5a27] mb-2 uppercase">Almendra Seca</h4>
                <p className="text-[#4a7c44] font-extrabold text-xs mb-4 uppercase tracking-widest border-b-2 border-[#d4af37] pb-1 inline-block">
                  Pura Energía
                </p>
                <p className="text-xs text-[#4b3621] leading-relaxed mb-8 font-bold uppercase">
                  Corazón de la semilla pelado y deshidratado, listo para snacks o extracciones premium.
                </p>
              </div>
              <a 
                href="https://wa.me/51956352862?text=Hola,%20deseo%20cotizar%20Almendra%20Seca%20de%20Sacha%20Inchi." 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full py-4 bg-[#2d5a27] text-white hover:bg-[#d4af37] font-black rounded-full transition-all uppercase tracking-[0.2em] text-xs shadow-md flex items-center justify-center gap-2"
              >
                <span>COTIZAR</span>
                <Send className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Producto 3 */}
            <div className="bg-white rounded-[2rem] p-6 border border-[#4a7c44]/20 shadow-lg hover:shadow-2xl hover:border-[#d4af37] transition-all duration-300 flex flex-col justify-between overflow-hidden">
              <div className="text-center">
                <div className="h-44 rounded-2xl overflow-hidden mb-6 border border-slate-100 shadow-inner">
                  <EditableMedia
                    mediaKey="img-sacha-aceite"
                    src="https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=800"
                    alt="Aceite Virgen de Sacha Inchi"
                    title="Aceite Virgen de Sacha Inchi"
                    section="Catálogo Sacha Inchi"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h4 className="text-2xl font-black text-[#2d5a27] mb-2 uppercase">Aceite Virgen</h4>
                <p className="text-[#4a7c44] font-extrabold text-xs mb-4 uppercase tracking-widest border-b-2 border-[#d4af37] pb-1 inline-block">
                  Extra Virgen
                </p>
                <p className="text-xs text-[#4b3621] leading-relaxed mb-8 font-bold uppercase">
                  Aceite de primer prensado en frío, con la mayor concentración de Omega del reino vegetal.
                </p>
              </div>
              <a 
                href="https://wa.me/51956352862?text=Hola,%20deseo%20cotizar%20Aceite%20de%20Sacha%20Inchi%20Extra%20Virgen." 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full py-4 bg-[#d4af37] text-white hover:bg-[#2d5a27] font-black rounded-full transition-all uppercase tracking-[0.2em] text-xs shadow-md flex items-center justify-center gap-2"
              >
                <span>COTIZAR</span>
                <Send className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Origen Section */}
      <EditableBackground
        sectionKey="bg-sacha-origen"
        title="Fondo Sección Origen Sacha Inchi"
        defaultColor="#f1f8ee"
        defaultOpacity={0.92}
        defaultPattern="dots"
        className="py-24 px-6 relative overflow-hidden z-20"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-[#e2eedc] to-transparent opacity-50"></div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-16 relative z-10">
          <div>
            <div className="inline-flex items-center gap-3 px-5 py-2 bg-[#2d5a27] rounded-full mb-6 shadow-lg">
              <span className="w-2 h-2 bg-[#d4af37] rounded-full animate-pulse"></span>
              <span className="text-white text-[10px] font-black uppercase tracking-widest">
                San Martín · Selva Alta
              </span>
            </div>
            
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-serif italic mb-6 leading-none text-[#2d5a27] uppercase font-black">
              Genética <br />
              <span className="bg-gradient-to-r from-[#2d5a27] to-[#4a7c44] bg-clip-text text-transparent not-italic font-black">
                Amazónica.
              </span>
            </h2>
            
            <p className="text-[#4a7c44] text-base sm:text-lg mb-8 leading-relaxed font-bold">
              En las fértiles tierras de la región San Martín, el Sacha Inchi desarrolla su máximo potencial biológico. AGRICARL PERU SAC trabaja directamente con productores locales para asegurar una cadena de valor justa y de alta calidad.
            </p>
            
            <a 
              href="https://wa.me/51956352862" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-8 py-4 bg-[#2d5a27] text-white font-black rounded-full hover:bg-[#d4af37] hover:scale-105 transition-all shadow-xl inline-block uppercase tracking-widest text-xs"
            >
              CONTACTAR CON PLANTA
            </a>
          </div>

          <div className="relative flex justify-center items-center">
            <div className="absolute inset-0 bg-[#d4af37]/10 rounded-full blur-[100px] animate-pulse"></div>
            {/* Large Mascot Display */}
            <div className="w-full max-w-[300px]">
              <MascotSvg idSuffix="large" />
            </div>
          </div>
        </div>
      </EditableBackground>

      {/* Floating corner mascot */}
      <div className="fixed bottom-6 right-6 z-[200] flex items-center gap-4 pointer-events-none">
        {/* Dialogue Bubble */}
        <a 
          href="https://wa.me/51956352862" 
          target="_blank" 
          rel="noopener noreferrer"
          className={`speech-bubble bg-gradient-to-r from-[#2d5a27] to-[#4a7c44] text-white px-5 py-3 rounded-full font-black text-[10px] shadow-2xl pointer-events-auto relative uppercase tracking-widest italic hover:scale-110 transition-transform ${
            showSpeech ? 'active' : ''
          }`}
        >
          ¡Hola! Cotiza Sacha Inchi
          <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[6px] border-l-[#4a7c44]"></div>
        </a>

        {/* Mascot Wrapper */}
        <div 
          onClick={handleScrollToTop}
          className="w-28 h-36 md:w-36 md:h-48 pointer-events-auto cursor-pointer drop-shadow-[0_10px_25px_rgba(75,54,33,0.3)] hover:scale-105 transition-all"
          title="Subir"
        >
          <MascotSvg idSuffix="floating" />
        </div>
      </div>
    </div>
  );
}
