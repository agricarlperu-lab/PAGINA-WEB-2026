import React, { useState } from 'react';
import cocoHeroImg from '../assets/images/regenerated_image_1789613068806.jpg';
import cocoRalladoImg from '../assets/images/regenerated_image_1789613071419.jpg';
import cocoAceiteImg from '../assets/images/regenerated_image_1789613074075.png';
import { EditableMedia } from './EditableMedia';
import { 
  ArrowLeft, 
  MapPin, 
  Award, 
  Sparkles, 
  PhoneCall,
  ChevronRight,
  ShieldCheck,
  Droplets,
  CheckCircle2,
  Utensils,
  Sparkle,
  CircleDot
} from 'lucide-react';

interface CocoPageProps {
  onBack: () => void;
}

export default function CocoPage({ onBack }: CocoPageProps) {
  const [selectedSubProduct, setSelectedSubProduct] = useState<'all' | 'rallado' | 'aceite'>('all');

  return (
    <div className="min-h-screen bg-brand-light text-slate-800 font-sans pb-20 bg-architectural-grid">
      
      {/* 1. Header Hero con Retorno */}
      <div className="relative bg-gradient-to-b from-stone-900 via-slate-900 to-slate-950 text-white pt-10 pb-20 overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <button 
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer group mb-8 bg-white/5 px-4 py-2 rounded-xl border border-white/10 hover:border-emerald-400/40"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Volver al Catálogo</span>
          </button>

          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-mono font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Agroindustria Amazónica · Cocos nucifera</span>
              </div>

              <h1 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight uppercase leading-tight">
                Coco & Subproductos
              </h1>
              <p className="text-emerald-300 font-mono text-xs uppercase tracking-wider font-semibold">
                Coco Rallado Deshidratado · Aceite de Coco Virgen Prensado en Frío
              </p>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-light max-w-2xl">
                En AGRICARL PERÚ S.A.C. valorizamos integralmente el fruto de la palmera cocotera procedente de los valles cálidos de San Martín. Mediante rigurosos procesos de selección física y deshidratación higiénica, proveemos insumos de alta pureza libres de conservantes químicos, azúcares añadidos o blanqueadores artificiales.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <a
                  href="https://wa.me/51956352862?text=Hola%20AGRICARL%2C%20solicito%20cotizaci%C3%B3n%20para%20Coco%20Rallado%20y%20Aceite%20de%20Coco"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-brand-green hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-lg hover:shadow-emerald-900/30 transition-all flex items-center gap-2"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Cotizar Subproductos</span>
                </a>
                <button
                  onClick={() => {
                    const el = document.getElementById('catalogo-coco');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl border border-white/20 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Ver Especificaciones</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Quick specs pill row */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-800/80 max-w-lg">
                <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] font-mono text-slate-400 block uppercase">Ácido Láurico</span>
                  <span className="text-sm font-bold text-emerald-400">&gt; 50 % (Aceite)</span>
                </div>
                <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] font-mono text-slate-400 block uppercase">Humedad Rallado</span>
                  <span className="text-sm font-bold text-amber-400">&le; 3.0 %</span>
                </div>
                <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] font-mono text-slate-400 block uppercase">Ingredientes</span>
                  <span className="text-sm font-bold text-white">100% Puro Coco</span>
                </div>
              </div>
            </div>

            {/* Visual Hero Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-stone-500/20 aspect-[4/3] bg-slate-900">
                <EditableMedia
                  mediaKey="img-coco"
                  src={cocoHeroImg}
                  alt="Coco y Aceite Virgen"
                  title="Hero Coco & Derivados"
                  section="Página Coco"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white pointer-events-none">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-emerald-400" />
                    <span className="font-mono text-[11px]">San Martín, Perú</span>
                  </div>
                  <span className="bg-emerald-600/80 text-white font-mono text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                    Prensado en Frío
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Filtro Interactivo de Subproductos */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        <div className="bg-white rounded-2xl p-2 border border-slate-200/80 shadow-md max-w-md mx-auto flex items-center justify-between gap-1">
          <button
            onClick={() => setSelectedSubProduct('all')}
            className={`flex-1 py-2 rounded-xl text-xs font-mono font-bold uppercase transition-all cursor-pointer ${
              selectedSubProduct === 'all'
                ? 'bg-brand-green text-white shadow-xs'
                : 'text-slate-600 hover:text-brand-dark hover:bg-slate-50'
            }`}
          >
            Todos
          </button>
          <button
            onClick={() => setSelectedSubProduct('rallado')}
            className={`flex-1 py-2 rounded-xl text-xs font-mono font-bold uppercase transition-all cursor-pointer ${
              selectedSubProduct === 'rallado'
                ? 'bg-brand-green text-white shadow-xs'
                : 'text-slate-600 hover:text-brand-dark hover:bg-slate-50'
            }`}
          >
            Coco Rallado
          </button>
          <button
            onClick={() => setSelectedSubProduct('aceite')}
            className={`flex-1 py-2 rounded-xl text-xs font-mono font-bold uppercase transition-all cursor-pointer ${
              selectedSubProduct === 'aceite'
                ? 'bg-brand-green text-white shadow-xs'
                : 'text-slate-600 hover:text-brand-dark hover:bg-slate-50'
            }`}
          >
            Aceite Virgen
          </button>
        </div>
      </div>

      {/* 3. Sección de Subproductos Detallados */}
      <div id="catalogo-coco" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center space-y-3 mb-12">
          <span className="font-mono text-[10px] tracking-widest text-brand-green uppercase font-bold bg-brand-green/10 px-3 py-1 rounded-full">
            Línea Agroindustrial
          </span>
          <h2 className="font-display font-black text-2xl sm:text-3xl text-slate-900 uppercase tracking-tight">
            Subproductos de Coco Disponibles
          </h2>
          <p className="text-slate-500 text-xs max-w-xl mx-auto">
            Procesamiento higiénico garantizado para abastecer a la industria de panadería, confitería, cosmética y distribución mayorista.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          {/* Subproducto 1: Coco Rallado Deshidratado */}
          {(selectedSubProduct === 'all' || selectedSubProduct === 'rallado') && (
            <div className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm flex flex-col justify-between hover:shadow-xl transition-all duration-300">
              <div className="h-56 relative bg-slate-900">
                <EditableMedia
                  mediaKey="img-coco-shredded"
                  src={cocoRalladoImg}
                  alt="Coco Rallado Deshidratado"
                  title="Coco Rallado Deshidratado"
                  section="Página Coco"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                <span className="absolute top-4 left-4 bg-emerald-700 text-white text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-lg pointer-events-none">
                  Grado Alimento & Pastelería
                </span>
              </div>

              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded">
                      Corte Fino & Medio
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">Sin Azúcar Añadida</span>
                  </div>

                  <h3 className="font-display font-bold text-xl text-slate-900 uppercase">
                    Coco Rallado Deshidratado (Desiccated Coconut)
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed font-light">
                    Obtenido a partir de la pulpa fresca y madura de cocos seleccionados, pelada, rallada y deshidratada higiénicamente con aire caliente. Posee un aroma dulce característico, textura suave y color blanco marfil uniforme.
                  </p>

                  <div className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-600">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span><strong>Humedad residual:</strong> &le; 3.0% para máxima vida de anaquel.</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span><strong>Contenido Graso:</strong> Alto en grasas saludables naturales (&ge; 60%).</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span><strong>Aplicaciones:</strong> Repostería, galletería, granolas, barras proteicas y snacks.</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span><strong>Empaque:</strong> Sacos polipropileno con bolsa interior de polietileno de 10kg y 25kg.</span>
                    </div>
                  </div>
                </div>

                <a
                  href="https://wa.me/51956352862?text=Hola%20AGRICARL%2C%20solicito%20cotizaci%C3%B3n%20para%20Coco%20Rallado%20Deshidratado"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center bg-slate-900 hover:bg-brand-green text-white font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl transition-colors shadow-sm block"
                >
                  Cotizar Coco Rallado
                </a>
              </div>
            </div>
          )}

          {/* Subproducto 2: Aceite de Coco Virgen Prensado en Frío */}
          {(selectedSubProduct === 'all' || selectedSubProduct === 'aceite') && (
            <div className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm flex flex-col justify-between hover:shadow-xl transition-all duration-300">
              <div className="h-56 relative bg-slate-900">
                <EditableMedia
                  mediaKey="img-coco-oil"
                  src={cocoAceiteImg}
                  alt="Aceite de Coco Virgen"
                  title="Aceite de Coco Virgen Extra"
                  section="Página Coco"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                <span className="absolute top-4 left-4 bg-amber-600 text-white text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-lg pointer-events-none">
                  Extra Virgen · Primera Prensada
                </span>
              </div>

              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded">
                      No Refinado (Sin RDB)
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">Prensado &lt; 40°C</span>
                  </div>

                  <h3 className="font-display font-bold text-xl text-slate-900 uppercase">
                    Aceite de Coco Virgen Prensado en Frío
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed font-light">
                    Extraído mediante métodos puramente mecánicos a baja temperatura sin utilización de disolventes ni tratamientos químicos. Conserva intactos sus triglicéridos de cadena media (TCM), con más de 50% de ácido láurico.
                  </p>

                  <div className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-600">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span><strong>Ácido Láurico:</strong> Promueve la salud inmunológica y digestiva.</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span><strong>Pureza física:</strong> Transparente en estado líquido (&gt; 24°C), blanco nieve en sólido.</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span><strong>Doble Propósito:</strong> Apto para consumo gourmet/dietario y formulaciones cosméticas.</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span><strong>Presentaciones:</strong> Baldes de 18L, bidones de 20L y cilindros industriales de 200L.</span>
                    </div>
                  </div>
                </div>

                <a
                  href="https://wa.me/51956352862?text=Hola%20AGRICARL%2C%20solicito%20cotizaci%C3%B3n%20para%20Aceite%20de%20Coco%20Virgen"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center bg-slate-900 hover:bg-brand-green text-white font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl transition-colors shadow-sm block"
                >
                  Cotizar Aceite de Coco Virgen
                </a>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* 4. Comparativa de Aplicaciones Industriales */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-md">
          <div className="flex items-center gap-3 mb-6">
            <Utensils className="w-6 h-6 text-brand-green" />
            <h3 className="font-display font-bold text-lg text-slate-900 uppercase">
              Aplicaciones y Sectores de Destino
            </h3>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 text-xs">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h4 className="font-bold text-slate-900 uppercase flex items-center gap-1.5">
                <CircleDot className="w-3.5 h-3.5 text-brand-green" />
                <span>Alimentario & Panadería</span>
              </h4>
              <p className="text-slate-600 leading-relaxed font-light">
                Insumo principal en coberturas, bizcochos, galletería fina, granolas artesanales, leches vegetales y aderezo gourmet.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h4 className="font-bold text-slate-900 uppercase flex items-center gap-1.5">
                <CircleDot className="w-3.5 h-3.5 text-brand-green" />
                <span>Cosmética & Dermocuidado</span>
              </h4>
              <p className="text-slate-600 leading-relaxed font-light">
                Base oleosa de alta penetración para cremas emolientes, jabones artesanales, mascarillas capilares y bálsamos labiales.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h4 className="font-bold text-slate-900 uppercase flex items-center gap-1.5">
                <CircleDot className="w-3.5 h-3.5 text-brand-green" />
                <span>Nutracéutico & Fitness</span>
              </h4>
              <p className="text-slate-600 leading-relaxed font-light">
                Fuente rápida de energía limpia a través de triglicéridos de cadena media (MCTs) para dietas cetogénicas y deportistas.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Llamado a la Acción */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 rounded-3xl p-8 sm:p-12 text-white text-center space-y-6 shadow-xl border border-emerald-500/20">
          <span className="font-mono text-xs text-emerald-400 uppercase font-bold tracking-widest block">
            Cadena de Suministro Directa
          </span>
          <h2 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight max-w-xl mx-auto">
            Abastecimiento de Coco & Subproductos para su Empresa
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm font-light max-w-lg mx-auto">
            Envíos desde Tarapoto y San Martín con despacho consolidado a Lima y principales puertos para mercado nacional y exterior.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a 
              href="https://wa.me/51956352862?text=Hola%20AGRICARL%2C%20solicito%20cotizaci%C3%B3n%20para%20Coco%20y%20Subproductos"
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
              Ver Catálogo Completo
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
