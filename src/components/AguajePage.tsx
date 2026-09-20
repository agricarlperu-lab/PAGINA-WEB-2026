import React from 'react';
import { 
  ArrowLeft, 
  MapPin, 
  Sun, 
  Award, 
  Package, 
  Sparkles, 
  Layers, 
  PhoneCall,
  ChevronRight,
  ShieldCheck,
  Droplets,
  HeartPulse,
  Leaf
} from 'lucide-react';
import EditableMedia from './EditableMedia';
import EditableBackground from './EditableBackground';

interface AguajePageProps {
  onBack: () => void;
}

export default function AguajePage({ onBack }: AguajePageProps) {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-brand-light text-slate-800 font-sans pb-20 bg-architectural-grid">
      
      {/* 1. Header Hero con Retorno */}
      <EditableBackground
        sectionKey="bg-aguaje-hero"
        title="Fondo Portada Aguaje"
        defaultColor="#2a1205"
        defaultOpacity={0.96}
        defaultPattern="mesh"
        className="relative text-white pt-10 pb-20 overflow-hidden"
      >
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <button 
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-amber-400 hover:text-amber-300 transition-colors cursor-pointer group mb-8 bg-white/5 px-4 py-2 rounded-xl border border-white/10 hover:border-amber-400/40"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Volver al Catálogo</span>
          </button>

          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-mono font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Superalimento Amazónico · Mauritia flexuosa</span>
              </div>

              <h1 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight uppercase leading-tight">
                Aguaje Deshidratado
              </h1>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-light max-w-2xl">
                Considerado el «Fruto de la Vida» en la selva peruana, el aguaje destaca por ser la fuente natural más rica en provitamina A (betacaroteno), fitoestrógenos naturales, vitamina E y ácidos grasos esenciales. Suministramos pulpa 100% pura deshidratada a bajas temperaturas para la industria nutracéutica, cosmética y alimentaria.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <a
                  href="https://wa.me/51956352862?text=Hola%20AGRICARL%2C%20solicito%20cotizaci%C3%B3n%20y%20ficha%20t%C3%A9cnica%20de%20Aguaje%20Deshidratado"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-brand-green hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-lg hover:shadow-emerald-900/30 transition-all flex items-center gap-2"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Cotizar Lote / Muestra</span>
                </a>
                <button
                  onClick={() => {
                    const el = document.getElementById('especificaciones-aguaje');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl border border-white/20 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Ficha Técnica</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Quick specs pill row */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-800/80 max-w-lg">
                <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] font-mono text-slate-400 block uppercase">Provitamina A</span>
                  <span className="text-sm font-bold text-amber-400">5x vs Zanahoria</span>
                </div>
                <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] font-mono text-slate-400 block uppercase">Humedad</span>
                  <span className="text-sm font-bold text-emerald-400">&lt; 7.0 %</span>
                </div>
                <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] font-mono text-slate-400 block uppercase">Pureza</span>
                  <span className="text-sm font-bold text-white">100% Natural</span>
                </div>
              </div>
            </div>

            {/* Visual Hero Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-amber-500/20 aspect-[4/3] bg-slate-900">
                <EditableMedia
                  mediaKey="img-aguaje-hero"
                  src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=900"
                  alt="Aguaje Amazónico"
                  title="Aguaje Amazónico Principal"
                  section="Aguaje"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white pointer-events-none">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-amber-400" />
                    <span className="font-mono text-[11px]">San Martín, Perú</span>
                  </div>
                  <span className="bg-amber-500/80 text-white font-mono text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                    Cosecha Sostenible
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </EditableBackground>

      {/* 2. Beneficios Nutricionales y Propiedades Activas */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-md">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
              <Sun className="w-5 h-5" />
            </div>
            <h3 className="font-display font-bold text-base text-slate-900 mb-1 uppercase">
              Altísimo Betacaroteno
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-light">
              Concentración excepcional de carotenoides activos y provitamina A, vitales para la salud celular, ocular y dérmica.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-md">
            <div className="w-10 h-10 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center mb-4">
              <HeartPulse className="w-5 h-5" />
            </div>
            <h3 className="font-display font-bold text-base text-slate-900 mb-1 uppercase">
              Fitoestrógenos Nativos
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-light">
              Compuestos vegetales que apoyan el equilibrio hormonal femenino natural y la salud ósea y cardiovascular.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-md">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
              <Droplets className="w-5 h-5" />
            </div>
            <h3 className="font-display font-bold text-base text-slate-900 mb-1 uppercase">
              Ácidos Grasos & Vitamina E
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-light">
              Rico en ácido oleico (Omega 9) y tocoferoles, que confieren alta estabilidad oxidativa y propiedades emolientes.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-md">
            <div className="w-10 h-10 rounded-xl bg-slate-50 text-slate-700 flex items-center justify-center mb-4">
              <Leaf className="w-5 h-5" />
            </div>
            <h3 className="font-display font-bold text-base text-slate-900 mb-1 uppercase">
              Manejo Sin Tala
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-light">
              Recolectado mediante escalamiento tradicional de palmeras vivas, preservando los aguajales y el ecosistema amazónico.
            </p>
          </div>
        </div>
      </div>

      {/* 3. Formatos y Presentaciones */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center space-y-3 mb-12">
          <span className="font-mono text-[10px] tracking-widest text-brand-green uppercase font-bold bg-brand-green/10 px-3 py-1 rounded-full">
            Presentaciones Comerciales
          </span>
          <h2 className="font-display font-black text-2xl sm:text-3xl text-slate-900 uppercase tracking-tight">
            Formatos de Aguaje para Industria y Exportación
          </h2>
          <p className="text-slate-500 text-xs max-w-xl mx-auto">
            Procesado bajo estrictos controles de temperatura para no degradar termolábiles ni carotenoides.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Presentación 1: Polvo Fino */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 bg-amber-50 text-amber-800 text-[11px] font-mono font-bold rounded-lg border border-amber-200">
                  Mesh 60 - 80
                </span>
                <span className="text-xs font-mono text-slate-400">Grado Alimentario / Farmacéutico</span>
              </div>
              <h3 className="font-display font-bold text-xl text-slate-900 uppercase">
                Aguaje Deshidratado en Polvo Micropulverizado
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-light">
                Pulpa deshidratada y pulverizada uniformemente, de color naranja dorado brillante con olor característico frutal. Alta solubilidad y dispersión en fórmulas de batidos, cápsulas, cosméticos y mezclas funcionales.
              </p>
              <ul className="space-y-2 text-xs text-slate-600">
                <li className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Sin aditivos, conservantes ni colorantes sintéticos</span>
                </li>
                <li className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Empaque al vacío en bolsas trilaminadas de 5kg, 10kg y 25kg</span>
                </li>
                <li className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Vida útil recomendada: 24 meses en lugar fresco y seco</span>
                </li>
              </ul>
            </div>
            <a
              href="https://wa.me/51956352862?text=Hola%20AGRICARL%2C%20deseo%20cotizar%20Aguaje%20Deshidratado%20en%20Polvo"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center bg-slate-900 hover:bg-brand-green text-white font-bold text-xs uppercase tracking-wider py-3 rounded-xl transition-colors"
            >
              Solicitar Cotización de Polvo
            </a>
          </div>

          {/* Presentación 2: Hojuelas / Flakes */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 bg-emerald-50 text-emerald-800 text-[11px] font-mono font-bold rounded-lg border border-emerald-200">
                  Hojuelas / Flakes
                </span>
                <span className="text-xs font-mono text-slate-400">Grado Cereal & Snacks</span>
              </div>
              <h3 className="font-display font-bold text-xl text-slate-900 uppercase">
                Aguaje Deshidratado en Hojuelas y Granulado
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-light">
                Cortes de pulpa seleccionada secados al aire caliente controlado para retener textura crujiente y palatabilidad. Ideal para mezclas de frutos secos, barras de cereal, infusiones y formulaciones gourmet.
              </p>
              <ul className="space-y-2 text-xs text-slate-600">
                <li className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Sabor natural agridulce balanceado característico</span>
                </li>
                <li className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Caja master de 10kg con bolsa interna hermética</span>
                </li>
                <li className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Trazabilidad completa de origen en cooperativas de San Martín</span>
                </li>
              </ul>
            </div>
            <a
              href="https://wa.me/51956352862?text=Hola%20AGRICARL%2C%20deseo%20cotizar%20Aguaje%20Deshidratado%20en%20Hojuelas"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center bg-slate-900 hover:bg-brand-green text-white font-bold text-xs uppercase tracking-wider py-3 rounded-xl transition-colors"
            >
              Solicitar Cotización de Hojuelas
            </a>
          </div>
        </div>
      </div>

      {/* 4. Tabla de Especificaciones Técnicas */}
      <div id="especificaciones-aguaje" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <span className="text-[10px] font-mono text-brand-green uppercase font-bold tracking-widest block">
                Ficha Técnica
              </span>
              <h3 className="font-display font-bold text-lg text-slate-900 uppercase">
                Parámetros Fisicoquímicos y Microbiológicos
              </h3>
            </div>
            <Award className="w-6 h-6 text-amber-500" />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-slate-500 font-mono uppercase text-[10px]">
                <tr>
                  <th className="py-3 px-4 rounded-l-xl">Parámetro</th>
                  <th className="py-3 px-4">Rango / Especificación</th>
                  <th className="py-3 px-4 rounded-r-xl">Método</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-light">
                <tr>
                  <td className="py-3 px-4 font-medium text-slate-900">Nombre Científico</td>
                  <td className="py-3 px-4">Mauritia flexuosa L.f.</td>
                  <td className="py-3 px-4 font-mono text-[10px] text-slate-400">Botánico Oficial</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-slate-900">Parte Empleada</td>
                  <td className="py-3 px-4">Pulpa del fruto (Mesocarpio)</td>
                  <td className="py-3 px-4 font-mono text-[10px] text-slate-400">Selección manual</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-slate-900">Humedad Residual</td>
                  <td className="py-3 px-4 font-bold text-emerald-600">&le; 7.0 %</td>
                  <td className="py-3 px-4 font-mono text-[10px] text-slate-400">Termogravimetría</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-slate-900">Betacaroteno</td>
                  <td className="py-3 px-4">&ge; 30 - 50 mg / 100g</td>
                  <td className="py-3 px-4 font-mono text-[10px] text-slate-400">HPLC</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-slate-900">Grasas Totales (Lípidos)</td>
                  <td className="py-3 px-4">20.0 - 30.0 % (Rico en oleico)</td>
                  <td className="py-3 px-4 font-mono text-[10px] text-slate-400">Soxhlet</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-slate-900">Cenizas</td>
                  <td className="py-3 px-4">&le; 4.0 %</td>
                  <td className="py-3 px-4 font-mono text-[10px] text-slate-400">Calcinación 550°C</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-slate-900">Recuento de Microorganismos Aerobios</td>
                  <td className="py-3 px-4">&lt; 10,000 UFC/g</td>
                  <td className="py-3 px-4 font-mono text-[10px] text-slate-400">AOAC 990.12</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-slate-900">E. coli / Salmonella sp.</td>
                  <td className="py-3 px-4 text-emerald-700 font-bold">Ausente en 25g</td>
                  <td className="py-3 px-4 font-mono text-[10px] text-slate-400">ISO 6579</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 5. Llamado a la Acción de Cotización */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <EditableBackground
          sectionKey="bg-aguaje-cta"
          title="Fondo Llamado a la Acción Aguaje"
          defaultColor="#061f14"
          defaultOpacity={0.96}
          defaultPattern="dots"
          className="rounded-3xl p-8 sm:p-12 text-white text-center space-y-6 shadow-xl border border-emerald-500/20"
        >
          <span className="font-mono text-xs text-amber-400 uppercase font-bold tracking-widest block">
            Atención a Empresas y Distribuidores
          </span>
          <h2 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight max-w-xl mx-auto">
            ¿Desea incorporar Aguaje Deshidratado en su línea de productos?
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm font-light max-w-lg mx-auto">
            Abastecimiento continuo, lotes certificados y despacho a nivel nacional e internacional desde San Martín.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a 
              href="https://wa.me/51956352862?text=Hola%20AGRICARL%2C%20solicito%20cotizaci%C3%B3n%20para%20Aguaje%20Deshidratado"
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-brand-green hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider px-8 py-3.5 rounded-xl shadow-lg transition-all"
            >
              Contactar por WhatsApp
            </a>
            <button 
              onClick={onBack}
              className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider px-8 py-3.5 rounded-xl border border-white/20 transition-all cursor-pointer"
            >
              Explorar Otros Productos
            </button>
          </div>
        </EditableBackground>
      </div>

    </div>
  );
}
