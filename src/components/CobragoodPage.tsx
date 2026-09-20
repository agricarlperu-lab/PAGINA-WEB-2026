import React from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  ShieldCheck, 
  Activity, 
  MessageCircle, 
  ChevronUp,
  CreditCard
} from 'lucide-react';
import { motion } from 'motion/react';
import EditableMedia from './EditableMedia';
import EditableBackground from './EditableBackground';

interface CobragoodPageProps {
  onBack: () => void;
}

export default function CobragoodPage({ onBack }: CobragoodPageProps) {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-brand-light text-slate-900 font-sans min-h-screen pb-16 relative overflow-hidden bg-architectural-grid">
      {/* Texture grid overlay */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none bg-architectural-dots"></div>
      <div className="absolute top-40 right-[-10%] w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Header back navigation */}
      <div className="max-w-7xl mx-auto px-6 pt-6 relative z-20">
        <button 
          onClick={onBack}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0a1128]/10 text-[#0a1128] hover:bg-[#0a1128]/20 text-xs font-bold uppercase tracking-widest transition-all duration-300 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Regresar a Servicios</span>
        </button>
      </div>

      {/* Hero Section */}
      <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left Column Text */}
            <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-800 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-200">
                <span className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></span>
                <span>Plataforma Transaccional · Potenciado por Agricarl Perú</span>
              </div>

              <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-[#001f3f] leading-[0.95] tracking-tighter uppercase">
                Agri<span className="text-blue-600 italic">Cobros</span>
              </h1>

              <p className="text-lg md:text-xl text-slate-800 max-w-xl mx-auto lg:mx-0 leading-relaxed font-bold">
                Cobranzas inteligentes y recaudación digital a través de la banca móvil. Sin POS y con liquidación directa a tu cuenta corporativa.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                <a 
                  href="https://agricarlperu.com/contacto/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-3 bg-blue-600 text-white px-8 py-4 rounded-3xl font-black text-sm hover:bg-blue-700 transition-all shadow-2xl shadow-blue-500/30 group uppercase tracking-tight"
                >
                  <span>REGISTRARSE AHORA</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>

                {/* Sliding Feed Mockup */}
                <div className="hidden sm:flex items-center bg-white border-2 border-slate-100 px-4 py-2 rounded-2xl shadow-md overflow-hidden h-14 w-48 relative">
                  <div className="tx-feed-item flex items-center gap-2 absolute w-full px-4">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 text-green-700 stroke-[3]" />
                    </div>
                    <span className="text-[11px] font-black text-slate-900 uppercase italic">Cobro Exitoso</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column Graphics */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-md animate-float">
                <div className="rounded-[3rem] sm:rounded-[4rem] overflow-hidden border-[12px] border-white shadow-[0_32px_64px_-16px_rgba(0,0,0,0.15)]">
                  <EditableMedia
                    mediaKey="img-agricobros-hero"
                    src="https://images.unsplash.com/photo-1556742111-a301076d9d18?auto=format&fit=crop&q=80&w=600"
                    alt="Personas realizando un cobro digital con AgriCobros"
                    title="Portada AgriCobros - Cobro Digital"
                    section="AgriCobros"
                    className="w-full h-[400px] sm:h-[480px] object-cover"
                  />
                </div>
                
                {/* Embedded dynamic device vector */}
                <div className="absolute -bottom-10 -right-6 scale-100 sm:scale-110 drop-shadow-2xl">
                  <svg width="150" height="150" viewBox="0 0 200 200">
                    <rect x="50" y="60" width="100" height="90" rx="35" fill="#001f3f" />
                    <rect x="62" y="72" width="76" height="56" rx="18" fill="#1e3a8a" />
                    <rect x="65" y="75" width="70" height="50" rx="15" fill="#3b82f6" fillOpacity="0.8" />
                    <circle cx="85" cy="95" r="4" fill="white" />
                    <circle cx="115" cy="95" r="4" fill="white" />
                    <path d="M 88 112 Q 100 120 112 112" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" />
                    <path d="M 100 60 L 100 35" stroke="#001f3f" strokeWidth="6" strokeLinecap="round" />
                    <circle cx="100" cy="30" r="10" fill="#22c55e" className="animate-pulse" />
                  </svg>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Guide Section */}
      <section id="como-funciona" className="py-20 bg-slate-50 border-y-2 border-slate-100 relative z-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-5xl font-black text-[#001f3f] mb-12 uppercase tracking-tighter italic">
            Procedimiento de Pago para tu Cliente.
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="group p-8 rounded-[2.5rem] bg-white border-2 border-transparent hover:border-blue-600/30 shadow-lg hover:shadow-2xl transition-all duration-300">
              <div className="w-14 h-14 bg-blue-50 text-blue-700 rounded-2xl flex items-center justify-center font-black text-xl mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all">
                01
              </div>
              <h3 className="text-xl font-black text-slate-950 mb-3 uppercase tracking-tight">Banca Móvil</h3>
              <p className="text-sm text-slate-800 font-bold leading-relaxed">
                Abre la App de tu banco habitual desde el celular.
              </p>
            </div>

            <div className="group p-8 rounded-[2.5rem] bg-white border-2 border-transparent hover:border-blue-600/30 shadow-lg hover:shadow-2xl transition-all duration-300">
              <div className="w-14 h-14 bg-blue-50 text-blue-700 rounded-2xl flex items-center justify-center font-black text-xl mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all">
                02
              </div>
              <h3 className="text-xl font-black text-slate-950 mb-3 uppercase tracking-tight">Servicios</h3>
              <p className="text-sm text-slate-800 font-bold leading-relaxed">
                Selecciona la opción de "Pago de Servicios" en el menú.
              </p>
            </div>

            <div className="group p-8 rounded-[2.5rem] bg-blue-600 text-white shadow-2xl scale-100 sm:scale-105 transition-all duration-300 ring-4 ring-blue-600/20">
              <div className="w-14 h-14 bg-white/20 text-white rounded-2xl flex items-center justify-center font-black text-xl mb-6">
                03
              </div>
              <h3 className="text-xl font-black mb-3 uppercase tracking-tight">BUSCAR AGRICARL</h3>
              <p className="text-sm font-black opacity-100">
                Escribe:{' '}
                <span className="bg-white text-blue-700 px-2 py-1 rounded shadow-sm inline-block font-mono text-xs uppercase mt-1">
                  Agricarl Peru Sac
                </span>
              </p>
            </div>

            <div className="group p-8 rounded-[2.5rem] bg-white border border-slate-100 shadow-lg hover:shadow-2xl transition-all duration-300">
              <div className="w-14 h-14 bg-blue-50 text-blue-700 rounded-2xl flex items-center justify-center font-black text-xl mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all">
                04
              </div>
              <h3 className="text-xl font-black text-slate-950 mb-3 uppercase tracking-tight">Confirmar</h3>
              <p className="text-sm text-slate-800 font-bold leading-relaxed">
                Digita el código y confirma el monto a pagar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <EditableBackground
        sectionKey="bg-agricobros-benefits"
        title="Fondo Beneficios AgriCobros"
        defaultColor="#050b1a"
        defaultOpacity={0.96}
        defaultPattern="grid"
        className="py-24 text-white relative overflow-hidden z-20"
      >
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[150px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-12 uppercase tracking-tighter italic">
              ¿Por qué elegir <br />
              <span className="text-green-400">AgriCobros?</span>
            </h2>

            <div className="space-y-8">
              <div className="group flex items-start gap-6 p-6 rounded-3xl hover:bg-white/5 transition-all duration-300">
                <div className="w-16 h-16 bg-green-500/20 rounded-2xl flex items-center justify-center shrink-0 shadow-inner">
                  <ShieldCheck className="w-8 h-8 text-green-400" />
                </div>
                <div>
                  <h4 className="text-xl font-black mb-2 uppercase tracking-tight text-white">
                    Recaudación Bancaria Directa
                  </h4>
                  <p className="text-sm sm:text-base text-slate-300 font-bold opacity-90 leading-relaxed">
                    Tus clientes pueden pagar de forma rápida desde su propia App bancaria buscando a Agricarl Peru Sac. Una solución que garantiza transacciones seguras, inmediatas y sin complicaciones.
                  </p>
                </div>
              </div>

              <div className="group flex items-start gap-6 p-6 rounded-3xl hover:bg-white/5 transition-all duration-300">
                <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center shrink-0 shadow-inner">
                  <Activity className="w-8 h-8 text-blue-400" />
                </div>
                <div>
                  <h4 className="text-xl font-black mb-2 uppercase tracking-tight text-white">
                    Conciliación Inteligente
                  </h4>
                  <p className="text-sm sm:text-base text-slate-300 font-bold opacity-90 leading-relaxed">
                    Cada pago se vincula automáticamente al código del cliente, eliminando errores manuales y optimizando tu flujo de caja 24/7.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Stack Cards Column */}
          <div className="relative flex justify-center">
            <div className="bg-slate-900/60 p-8 rounded-[4rem] sm:rounded-[5rem] backdrop-blur-md border border-white/10 relative overflow-hidden group flex flex-col items-center justify-center w-full max-w-sm h-[520px] shadow-[0_0_80px_rgba(0,0,0,0.5)]">
              {/* Tech background image overlay */}
              <div className="absolute inset-0 w-full h-full opacity-50 mix-blend-screen rounded-[4.5rem] overflow-hidden pointer-events-none">
                <EditableMedia
                  mediaKey="img-agricobros-tech"
                  src="https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?auto=format&fit=crop&q=80&w=700"
                  alt="Robot 3D Tech AgriCobros"
                  title="Robot 3D Tech AgriCobros"
                  section="AgriCobros"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Stacked Interactive Card Visualizer */}
              <div className="relative z-30 mb-16 animate-float">
                <div className="relative w-[240px] h-[150px] sm:w-[280px] sm:h-[180px]">
                  <div className="absolute w-full h-full rounded-3xl bg-gradient-to-br from-indigo-700 to-indigo-950 -rotate-12 translate-x-[-15px] translate-y-[-10px] opacity-60 shadow-2xl"></div>
                  <div className="absolute w-full h-full rounded-3xl bg-gradient-to-br from-blue-600 to-blue-900 -rotate-6 translate-x-[-7px] translate-y-[-5px] opacity-80 shadow-2xl"></div>
                  <div className="absolute w-full h-full rounded-3xl bg-gradient-to-br from-slate-900 to-black border border-white/20 p-6 flex flex-col justify-between shadow-2xl">
                    <div className="flex justify-between items-start">
                      <div className="w-10 h-8 bg-amber-400 rounded-md shadow-inner"></div>
                      <CreditCard className="text-white w-6 h-6" />
                    </div>
                    <div className="space-y-2">
                      <div className="h-1.5 w-full bg-white/20 rounded"></div>
                      <div className="h-1.5 w-1/2 bg-white/20 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Rotating Gear Vectors */}
              <div className="absolute bottom-20 z-20 flex items-center justify-center gap-4">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="1.2" className="animate-gear drop-shadow-[0_0_15px_#22c55e]">
                  <path d="M12.22 2h-.44a2 2 0 0 0-2 2 2 2 0 0 1-2 2 2 2 0 0 0-2 2 2 2 0 0 1-2 2 2 2 0 0 0-2 2v.44a2 2 0 0 0 2 2 2 2 0 0 1 2 2 2 2 0 0 0 2 2 2 2 0 0 1 2 2 2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2 2 2 0 0 1 2-2 2 2 0 0 0 2-2 2 2 0 0 1 2-2 2 2 0 0 0 2-2v-.44a2 2 0 0 0-2-2 2 2 0 0 1-2-2 2 2 0 0 0-2-2 2 2 0 0 1-2-2 2 2 0 0 0-2-2z" />
                </svg>
                <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="1.5" className="animate-gear-fast opacity-90 drop-shadow-[0_0_15px_#3b82f6]" style={{ animationDirection: 'reverse' }}>
                  <path d="M12.22 2h-.44a2 2 0 0 0-2 2 2 2 0 0 1-2 2 2 2 0 0 0-2 2 2 2 0 0 1-2 2 2 2 0 0 0 2 2v.44a2 2 0 0 0 2 2 2 2 0 0 1 2 2 2 2 0 0 0 2 2 2 2 0 0 1 2 2 2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2 2 2 0 0 1 2-2 2 2 0 0 0 2-2 2 2 0 0 1 2-2 2 2 0 0 0 2-2v-.44a2 2 0 0 0-2-2 2 2 0 0 1-2-2 2 2 0 0 0-2-2 2 2 0 0 1-2-2 2 2 0 0 0-2-2z" />
                </svg>
              </div>

              {/* Status Indicator */}
              <div className="absolute bottom-8 left-8 right-8 bg-white py-3 px-5 rounded-2xl shadow-xl flex items-center gap-3 z-40 text-left">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center shadow-md">
                  <Activity className="w-5 h-5 text-green-700" />
                </div>
                <div>
                  <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest leading-none">Sistema de Flujo</p>
                  <p className="text-xs font-black text-blue-950 uppercase mt-1 italic">OPERATIVO 100%</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </EditableBackground>

      {/* Final CTA */}
      <section className="py-20 bg-white text-center relative z-20">
        <div className="max-w-5xl mx-auto px-6">
          <EditableBackground
            sectionKey="bg-agricobros-cta"
            title="Fondo Llamado a la Acción AgriCobros"
            defaultColor="#020617"
            defaultOpacity={0.96}
            defaultPattern="mesh"
            className="rounded-[3rem] sm:rounded-[4rem] p-12 md:p-20 relative overflow-hidden shadow-2xl"
          >
            <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none"></div>
            
            <div className="mb-8 scale-100 sm:scale-110 animate-bounce flex justify-center">
              <svg width="100" height="100" viewBox="0 0 200 200">
                <rect x="50" y="60" width="100" height="90" rx="35" fill="white" />
                <rect x="65" y="75" width="70" height="50" rx="15" fill="#22c55e" />
                <circle cx="85" cy="95" r="4" fill="white" />
                <circle cx="115" cy="95" r="4" fill="white" />
                <path d="M 88 112 Q 100 120 112 112" stroke="white" strokeWidth="4" fill="none" strokeLinecap="round" />
              </svg>
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6 uppercase leading-none italic tracking-tighter">
              ¿Crecemos Juntos?
            </h2>

            <p className="text-slate-300 font-black max-w-xl mx-auto mb-10 text-base sm:text-lg uppercase tracking-widest leading-relaxed">
              Activa AgriCobros hoy. Tu empresa en la era digital.
            </p>

            <a 
              href="https://wa.me/51956352862" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-3 bg-white text-slate-950 hover:bg-blue-50 px-10 py-5 rounded-2xl font-black text-base transition-all shadow-xl"
            >
              <MessageCircle className="w-6 h-6 text-blue-600" />
              <span>CHAT DE ASISTENCIA</span>
            </a>
          </EditableBackground>
        </div>
      </section>

      {/* Floating button scroll up */}
      <div className="fixed bottom-6 right-6 z-40">
        <button 
          onClick={handleScrollToTop}
          className="w-12 h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-2xl flex items-center justify-center transition-all cursor-pointer"
          title="Volver Arriba"
        >
          <ChevronUp className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
