import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Zap, 
  Clock, 
  ShieldCheck, 
  Repeat, 
  ShoppingCart, 
  TrendingUp, 
  Wallet, 
  Users, 
  Landmark, 
  FileText, 
  CheckCircle, 
  PlayCircle,
  ChevronUp,
  MessageSquare
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import EditableMedia from './EditableMedia';
import EditableBackground from './EditableBackground';

interface GestorContablePageProps {
  onBack: () => void;
}

const OWL_RESPONSES = [
  "¡Generamos archivos TXT 100% compatibles! Si quieres ver cómo funciona, solicita el tutorial completo ahora mismo. 🦉",
  "¡Totalmente! El sistema opera bajo el PCGE vigente en Perú. Solicita el tutorial completo para ver los asientos automáticos. 🇵🇪",
  "¡Siete módulos potentes! Asientos, Egresos, Ventas, Cobranzas, Planilla, Bancos y Generador PLE. ¡Solicita el tutorial de uso! 🚀",
  "¡Hola! Soy tu asistente. Recuerda que puedes solicitar el tutorial completo del uso del aplicativo en cualquier momento. 🦉"
];

export default function GestorContablePage({ onBack }: GestorContablePageProps) {
  const [owlIndex, setOwlIndex] = useState(3); // Default is greeting
  const [showOwlBubble, setShowOwlBubble] = useState(true);

  const handleAskOwl = (index: number) => {
    setShowOwlBubble(false);
    setTimeout(() => {
      setOwlIndex(index);
      setShowOwlBubble(true);
    }, 150);
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-brand-light text-slate-950 font-sans min-h-screen pb-16 relative overflow-hidden text-left bg-architectural-grid">
      {/* Background gradients */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.02] z-10 bg-architectural-dots"></div>
      <div className="absolute top-20 left-10 w-[400px] h-[400px] bg-emerald-400/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-20 right-10 w-[400px] h-[400px] bg-rose-500/5 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Back navigation header */}
      <div className="max-w-7xl mx-auto px-6 pt-6 relative z-20">
        <button 
          onClick={onBack}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-950/10 text-slate-950 hover:bg-slate-950/20 text-xs font-bold uppercase tracking-widest transition-all duration-300 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Regresar a Servicios</span>
        </button>
      </div>

      {/* Hero Section */}
      <section className="relative pt-12 pb-16 md:pt-20 md:pb-28 overflow-hidden text-center lg:text-left">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left Column Text */}
            <div className="lg:col-span-7 space-y-8 text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-950 text-emerald-400 text-[10px] font-black uppercase tracking-[0.2em] shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>Actualizado PLE / PCGE</span>
              </div>
              
              <h1 className="text-6xl md:text-8xl font-black text-slate-900 leading-[0.9] tracking-tighter uppercase italic">
                Gestión <br /> <span className="text-rose-600">Impecable.</span>
              </h1>

              <p className="text-xl text-slate-600 max-w-lg font-medium leading-relaxed">
                Optimiza tu estudio con la herramienta más robusta de Perú. Automatiza el PLE y genera estados financieros con estándar corporativo.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-5 pt-4">
                <a 
                  href="https://wa.me/51956352862?text=Hola,%20solicito%20acceso%20a%20la%20prueba%20gratis%20de%2030%20minutos." 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto"
                >
                  <button className="w-full bg-emerald-500 text-slate-950 px-10 py-5 rounded-2xl font-black text-lg hover:bg-emerald-400 transition-all flex items-center justify-center gap-3 shadow-xl uppercase italic tracking-tighter cursor-pointer">
                    <span>Prueba Gratis</span>
                    <Zap className="w-5 h-5 fill-current" />
                  </button>
                </a>
                <a 
                  href="https://conta.agricarlperu.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto"
                >
                  <button className="w-full bg-white border-4 border-slate-950 text-slate-950 px-10 py-4.5 rounded-2xl font-black text-lg hover:bg-slate-950 hover:text-white transition-all uppercase italic tracking-tighter cursor-pointer">
                    VER DEMO
                  </button>
                </a>
              </div>
            </div>

            {/* Right Column Graphic */}
            <div className="lg:col-span-5 w-full relative">
              <div className="owl-float">
                <div className="overflow-hidden bg-slate-100 rounded-[3rem] border-8 border-white shadow-2xl">
                  <EditableMedia
                    mediaKey="img-gestor-hero"
                    src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=1000"
                    alt="Contador profesional"
                    title="Portada Gestor Contable - Profesional"
                    section="Gestor Contable"
                    className="w-full h-auto object-cover aspect-[4/3]"
                  />
                </div>
                
                {/* Version badge */}
                <div className="absolute -bottom-6 -right-6 bg-slate-950 p-6 rounded-[2rem] shadow-2xl flex items-center justify-center border border-slate-800 border-l-rose-600 border-l-8 min-w-[100px]">
                  <div className="text-emerald-500 font-black italic text-4xl leading-none">5.4</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Benefits section */}
      <EditableBackground
        sectionKey="bg-gestor-benefits"
        title="Fondo Beneficios Gestor Contable"
        defaultColor="#020617"
        defaultOpacity={0.96}
        defaultPattern="grid"
        className="py-20 text-white relative z-20"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <div className="w-14 h-14 bg-rose-600/10 rounded-2xl flex items-center justify-center border border-rose-600/20">
                <Clock className="text-rose-600 w-8 h-8" />
              </div>
              <h4 className="font-black text-2xl uppercase italic tracking-tighter text-white">Máxima Eficiencia</h4>
              <p className="text-slate-400 text-sm font-medium leading-relaxed">
                Reduce el tiempo de digitación en un 80%. Nuestros algoritmos automáticos hacen el trabajo pesado.
              </p>
            </div>

            <div className="space-y-4">
              <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center border border-emerald-500/20">
                <ShieldCheck className="text-emerald-500 w-8 h-8" />
              </div>
              <h4 className="font-black text-2xl uppercase italic tracking-tighter text-white">Validación Dual</h4>
              <p className="text-slate-400 text-sm font-medium leading-relaxed">
                Filtros estructurales para Libros Electrónicos que garantizan envíos sin errores a SUNAT.
              </p>
            </div>

            <div className="bg-emerald-500 p-10 rounded-[2.5rem] flex flex-col justify-center shadow-2xl relative overflow-hidden group text-center text-slate-950">
              <h4 className="font-black text-slate-950 text-3xl italic uppercase tracking-tighter leading-none relative z-10">
                PCGE<br />ADAPTADO
              </h4>
              <p className="text-emerald-950 text-[11px] uppercase font-black tracking-widest opacity-80 mt-4 relative z-10">
                Cumplimiento Tributario
              </p>
            </div>
          </div>
        </div>
      </EditableBackground>

      {/* Modules infrastructure */}
      <section id="caracteristicas" className="py-24 bg-white text-center relative z-20">
        <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
          <h2 className="text-5xl md:text-7xl font-black text-slate-950 tracking-tighter italic mb-4 uppercase">
            Infraestructura Modular
          </h2>
          <p className="text-slate-900 font-black uppercase tracking-widest text-[11px] px-4 py-2 bg-emerald-100 inline-block rounded-lg italic">
            solicita el tutorial completo del uso del aplicativo
          </p>
          <div className="h-1.5 w-32 bg-slate-900 mx-auto rounded-full mt-6"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-white p-8 rounded-[2rem] border border-slate-150 hover:border-emerald-500 border-b-4 hover:border-b-emerald-500 hover:-translate-y-1.5 transition-all duration-300">
            <Repeat className="w-10 h-10 text-slate-950 mb-6 mx-auto" />
            <h3 className="font-black text-slate-900 text-sm mb-2 uppercase tracking-tighter italic leading-none">Apertura/Cierre</h3>
            <p className="text-slate-500 text-[10px] font-bold">Asientos sistematizados.</p>
          </div>

          <div className="bg-white p-8 rounded-[2rem] border border-slate-150 hover:border-rose-600 border-b-4 hover:border-b-rose-600 hover:-translate-y-1.5 transition-all duration-300">
            <ShoppingCart className="w-10 h-10 text-slate-950 mb-6 mx-auto" />
            <h3 className="font-black text-slate-900 text-sm mb-2 uppercase tracking-tighter italic leading-none">Egresos</h3>
            <p className="text-slate-500 text-[10px] font-bold">Gestión de gastos de compras.</p>
          </div>

          <div className="bg-white p-8 rounded-[2rem] border border-slate-150 hover:border-emerald-500 border-b-4 hover:border-b-emerald-500 hover:-translate-y-1.5 transition-all duration-300">
            <TrendingUp className="w-10 h-10 text-slate-950 mb-6 mx-auto" />
            <h3 className="font-black text-slate-900 text-sm mb-2 uppercase tracking-tighter italic leading-none">Ventas</h3>
            <p className="text-slate-500 text-[10px] font-bold">Registro inteligente de ingresos.</p>
          </div>

          <div className="bg-white p-8 rounded-[2rem] border border-slate-150 hover:border-rose-600 border-b-4 hover:border-b-rose-600 hover:-translate-y-1.5 transition-all duration-300">
            <Wallet className="w-10 h-10 text-slate-950 mb-6 mx-auto" />
            <h3 className="font-black text-slate-900 text-sm mb-2 uppercase tracking-tighter italic leading-none">Cobranzas/Pagos</h3>
            <p className="text-slate-500 text-[10px] font-bold">Tesorería centralizada.</p>
          </div>

          <div className="bg-white p-8 rounded-[2rem] border border-slate-150 hover:border-slate-950 border-b-4 hover:border-b-slate-950 hover:-translate-y-1.5 transition-all duration-300">
            <Users className="w-10 h-10 text-slate-950 mb-6 mx-auto" />
            <h3 className="font-black text-slate-900 text-sm mb-2 uppercase tracking-tighter italic leading-none">Planilla</h3>
            <p className="text-slate-500 text-[10px] font-bold">Nómina y beneficios.</p>
          </div>

          <div className="bg-white p-8 rounded-[2rem] border border-slate-150 hover:border-emerald-500 border-b-4 hover:border-b-emerald-500 hover:-translate-y-1.5 transition-all duration-300">
            <Landmark className="w-10 h-10 text-slate-950 mb-6 mx-auto" />
            <h3 className="font-black text-slate-900 text-sm mb-2 uppercase tracking-tighter italic leading-none">Bancos</h3>
            <p className="text-slate-500 text-[10px] font-bold">Conciliación bancaria.</p>
          </div>

          <div className="bg-slate-950 p-8 rounded-[2rem] border-none shadow-2xl relative overflow-hidden group hover:-translate-y-1.5 transition-all duration-300 col-span-1 sm:col-span-2">
            <div className="absolute inset-0 bg-emerald-500 opacity-10"></div>
            <FileText className="w-10 h-10 text-emerald-400 mb-6 mx-auto" />
            <h3 className="font-black text-white text-sm mb-2 uppercase tracking-tighter italic leading-none">Generador PLE</h3>
            <p className="text-emerald-400 text-[10px] font-black uppercase tracking-widest">TXT Turbo SUNAT automático.</p>
          </div>
        </div>
      </section>

      {/* Pricing Membership Section */}
      <section id="precios" className="py-20 bg-slate-100 text-center relative z-20">
        <div className="max-w-3xl mx-auto px-6 flex justify-center">
          <EditableBackground
            sectionKey="bg-gestor-pricing"
            title="Fondo Tarjeta Membresía Gestor"
            defaultColor="#020617"
            defaultOpacity={0.96}
            defaultPattern="mesh"
            className="p-8 sm:p-14 rounded-[3rem] sm:rounded-[4rem] shadow-2xl w-full relative overflow-hidden border-[6px] border-white text-center"
          >
            <div className="absolute top-0 right-0 bg-emerald-500 text-slate-950 text-[10px] font-black px-10 py-4 rounded-bl-[2.5rem] tracking-widest uppercase italic shadow-lg">
              OFERTA ÚNICA
            </div>
            
            <h3 className="text-2xl sm:text-3xl font-black text-white mb-6 uppercase tracking-tighter italic leading-none">
              Membresía Anual Corporativa
            </h3>

            <div className="flex items-baseline justify-center gap-2 mb-8">
              <span className="text-emerald-400 text-3xl sm:text-4xl font-black italic">S/</span>
              <span className="text-8xl sm:text-[10rem] font-black text-white tracking-tighter leading-none">30</span>
              <span className="text-slate-500 text-lg sm:text-xl font-black italic">/ AÑO</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 text-left text-xs font-bold text-slate-300 px-4 sm:px-8 uppercase tracking-widest">
              <div className="flex items-center gap-3">
                <CheckCircle className="text-emerald-400 w-5 h-5 shrink-0" /> <span>Soporte 24/7</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="text-emerald-400 w-5 h-5 shrink-0" /> <span>7 Módulos Full</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="text-emerald-400 w-5 h-5 shrink-0" /> <span>PLE Ilimitado</span>
              </div>
              <div className="flex items-center gap-3 text-emerald-400 font-black">
                <PlayCircle className="text-emerald-400 w-5 h-5 shrink-0" /> <span>solicita el tutorial completo</span>
              </div>
            </div>

            <a 
              href="https://wa.me/51956352862?text=Hola,%20solicito%20el%20tutorial%20completo%20y%20la%20membresía%20anual%20de%20S/30." 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <button className="w-full bg-emerald-500 text-slate-950 py-5 rounded-2xl font-black text-xl sm:text-2xl uppercase italic tracking-tighter hover:bg-emerald-400 transition-all shadow-xl hover:scale-[1.02] cursor-pointer">
                Comprar Ahora
              </button>
            </a>
          </EditableBackground>
        </div>
      </section>

      {/* STICKY OWL ASSISTANT (BÚHO) */}
      <div className="fixed bottom-6 left-6 z-[60] flex flex-col items-start gap-4 pointer-events-none">
        {/* Owl speech bubble dialog with fade-in animation */}
        <AnimatePresence mode="wait">
          {showOwlBubble && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              className="bg-slate-900 border-4 border-white text-white p-5 px-6 rounded-[2.5rem] shadow-2xl relative max-w-[280px] pointer-events-auto text-left"
            >
              <p className="text-xs sm:text-sm font-black italic leading-relaxed uppercase tracking-tighter">
                {OWL_RESPONSES[owlIndex]}
              </p>
              <div className="absolute -bottom-3 left-7 w-0 h-0 border-t-[10px] border-t-white border-x-[10px] border-x-transparent"></div>
              <div className="absolute -bottom-1.5 left-7 w-0 h-0 border-t-[8px] border-t-slate-900 border-x-[8px] border-x-transparent"></div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Owl click and buttons */}
        <div className="flex flex-col items-start gap-3 pointer-events-auto">
          {/* Owl Vector Icon click triggers default greeting */}
          <div 
            className="owl-float flex items-center cursor-pointer" 
            onClick={() => handleAskOwl(3)}
            title="Preguntar a Búho"
          >
            <svg width="75" height="75" viewBox="0 0 100 100" className="drop-shadow-2xl bg-slate-950 rounded-[2rem] p-1 border-4 border-white shadow-2xl">
              <rect x="25" y="30" width="50" height="55" rx="25" fill="#1E293B"/>
              <circle cx="40" cy="45" r="10" fill="white"/>
              <circle cx="60" cy="45" r="10" fill="white"/>
              <circle cx="40" cy="45" r="4" fill="#0F172A"/>
              <circle cx="60" cy="45" r="4" fill="#0F172A"/>
              <path d="M48 55 L50 60 L52 55 Z" fill="#FACC15"/>
              <path d="M25 50 Q10 60 25 75" fill="none" stroke="#1E293B" strokeWidth="8" strokeLinecap="round" />
              <path d="M75 50 Q90 60 75 75" fill="none" stroke="#1E293B" strokeWidth="8" strokeLinecap="round" />
              <path d="M47 62 L53 62 L55 75 L50 82 L45 75 Z" fill="#e11d48"/>
            </svg>
          </div>
          
          {/* Quick response trigger buttons */}
          <div className="flex flex-col gap-1.5 mt-1">
            <button 
              onClick={() => handleAskOwl(0)} 
              className="bg-slate-950 text-emerald-400 hover:bg-emerald-500 hover:text-slate-950 border-2 border-slate-900 text-[9px] font-black py-1.5 px-4 rounded-full transition-all shadow-md uppercase tracking-widest italic cursor-pointer text-left"
            >
              ¿SUNAT PLE?
            </button>
            <button 
              onClick={() => handleAskOwl(1)} 
              className="bg-slate-950 text-emerald-400 hover:bg-emerald-500 hover:text-slate-950 border-2 border-slate-900 text-[9px] font-black py-1.5 px-4 rounded-full transition-all shadow-md uppercase tracking-widest italic cursor-pointer text-left"
            >
              ¿Vigencia?
            </button>
            <a 
              href="https://wa.me/51956352862?text=Hola,%20solicito%20el%20tutorial%20completo%20del%20aplicativo." 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-slate-950 text-rose-400 hover:bg-rose-500 hover:text-white border-2 border-slate-900 text-[9px] font-black py-1.5 px-4 rounded-full transition-all shadow-md uppercase tracking-widest italic text-center cursor-pointer"
            >
              Solicita el Tutorial
            </a>
          </div>
        </div>
      </div>

      {/* Back to top float button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button 
          onClick={handleScrollToTop}
          className="w-12 h-12 rounded-xl bg-slate-900 hover:bg-rose-600 text-white shadow-2xl flex items-center justify-center transition-all cursor-pointer"
          title="Volver Arriba"
        >
          <ChevronUp className="w-6 h-6" />
        </button>
      </div>

    </div>
  );
}
