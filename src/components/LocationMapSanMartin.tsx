import React, { useState } from 'react';
import { 
  MapPin, 
  Navigation, 
  Layers, 
  ZoomIn, 
  ZoomOut, 
  Compass, 
  ExternalLink, 
  Copy, 
  Check, 
  Building2, 
  Leaf, 
  Truck, 
  Maximize2,
  Sparkles
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface PointOfInterest {
  id: string;
  name: string;
  nameEn: string;
  type: 'sede' | 'acopio' | 'aguajal' | 'planta';
  label: string;
  labelEn: string;
  district: string;
  coords: string;
  description: string;
  descriptionEn: string;
  xPercent: number; // position on visual map (percentage)
  yPercent: number;
}

const POINTS_OF_INTEREST: PointOfInterest[] = [
  {
    id: 'sede-central',
    name: 'Sede Central AGRICARL PERÚ S.A.C.',
    nameEn: 'AGRICARL PERÚ S.A.C. Headquarters',
    type: 'sede',
    label: 'Oficina Central & Operaciones',
    labelEn: 'Central Office & Operations',
    district: 'Tarapoto, San Martín',
    coords: '6°29\'36"S 76°22\'06"W',
    description: 'Gestión corporativa, control de calidad, emisión y despacho logístico a nivel nacional.',
    descriptionEn: 'Corporate management, quality control, issuance and nationwide logistics dispatch.',
    xPercent: 54,
    yPercent: 48
  },
  {
    id: 'acopio-cacao-sacha',
    name: 'Centro de Acopio Cacao & Sacha Inchi',
    nameEn: 'Cacao & Sacha Inchi Collection Hub',
    type: 'acopio',
    label: 'Acopio y Selección Granos',
    labelEn: 'Collection & Grain Sorting',
    district: 'Valle del Huallaga Central, San Martín',
    coords: '6°41\'22"S 76°18\'40"W',
    description: 'Recepción directa de cosechas familiares, clasificación física y fermentación controlada.',
    descriptionEn: 'Direct reception of family harvests, physical sorting and controlled fermentation.',
    xPercent: 62,
    yPercent: 65
  },
  {
    id: 'planta-coco-aceites',
    name: 'Planta de Prensado y Coco Rallado',
    nameEn: 'Pressing & Shredded Coconut Plant',
    type: 'planta',
    label: 'Procesamiento Agroindustrial',
    labelEn: 'Agro-Industrial Processing',
    district: 'Lamas / Cacatachi, San Martín',
    coords: '6°25\'10"S 76°26\'30"W',
    description: 'Línea de prensado en frío de aceites vírgenes y deshidratación higiénica de coco y pulpas.',
    descriptionEn: 'Cold pressing line for virgin oils and hygienic dehydration of coconut and pulps.',
    xPercent: 42,
    yPercent: 36
  },
  {
    id: 'aguajal-sostenible',
    name: 'Zona de Cosecha Silvestre Aguaje',
    nameEn: 'Wild Aguaje Sustainable Harvest Zone',
    type: 'aguajal',
    label: 'Manejo de Bosque y Biodiversidad',
    labelEn: 'Forest Management & Biodiversity',
    district: 'Cuenca del Mayo, San Martín',
    coords: '6°08\'15"S 76°45\'50"W',
    description: 'Aguajales naturales protegidos bajo recolección tradicional sin tala de palmeras vivas.',
    descriptionEn: 'Protected natural aguaje palms under traditional non-destructive wild gathering.',
    xPercent: 28,
    yPercent: 25
  }
];

export default function LocationMapSanMartin() {
  const { language } = useLanguage();
  const [activePoint, setActivePoint] = useState<PointOfInterest>(POINTS_OF_INTEREST[0]);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [mapStyle, setMapStyle] = useState<'carto' | 'satellite' | 'terrain'>('terrain');
  const [copiedCoords, setCopiedCoords] = useState<boolean>(false);

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.25, 1.75));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.25, 0.75));
  const handleResetZoom = () => setZoomLevel(1);

  const handleCopyCoords = () => {
    navigator.clipboard.writeText(activePoint.coords);
    setCopiedCoords(true);
    setTimeout(() => setCopiedCoords(false), 2000);
  };

  // Google maps external search URL
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${activePoint.name}, ${activePoint.district}, Peru`
  )}`;

  return (
    <div className="w-full bg-white rounded-3xl border border-slate-200/80 shadow-xl overflow-hidden">
      {/* Header Bar */}
      <div className="bg-slate-900 text-white px-6 py-4 flex flex-wrap items-center justify-between gap-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-400">
            <Compass className="w-5 h-5 animate-spin-slow" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-black text-sm uppercase tracking-wider text-white">
                {language === 'es' ? 'Ubicación Referencial San Martín' : 'San Martín Geographic Hub'}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/30 font-mono text-[9px] font-bold">
                {language === 'es' ? 'GPS Amazonía' : 'Amazon GPS'}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono">
              {language === 'es' ? 'Región San Martín · República del Perú' : 'San Martín Region · Republic of Peru'}
            </p>
          </div>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-1.5 bg-slate-800/80 p-1 rounded-xl border border-slate-700/60 text-xs font-mono print:hidden">
          <button
            onClick={() => setMapStyle('terrain')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              mapStyle === 'terrain'
                ? 'bg-brand-green text-white font-bold shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {language === 'es' ? 'Relieve & Cuencas' : 'Relief & Basins'}
          </button>
          <button
            onClick={() => setMapStyle('satellite')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              mapStyle === 'satellite'
                ? 'bg-brand-green text-white font-bold shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {language === 'es' ? 'Satelital' : 'Satellite'}
          </button>
          <button
            onClick={() => setMapStyle('carto')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              mapStyle === 'carto'
                ? 'bg-brand-green text-white font-bold shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {language === 'es' ? 'Cartográfico' : 'Cartographic'}
          </button>
        </div>
      </div>

      {/* Main Interactive Map Area */}
      <div className="relative w-full h-[420px] sm:h-[480px] bg-slate-950 overflow-hidden select-none">
        
        {/* Map Background Layer depending on mode */}
        <div 
          className="absolute inset-0 transition-transform duration-300 ease-out origin-center"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          {mapStyle === 'satellite' ? (
            <img 
              src="https://images.unsplash.com/photo-1516214104703-d870798883c5?auto=format&fit=crop&q=80&w=1600" 
              alt="Vista satelital San Martín Amazonía" 
              className="w-full h-full object-cover filter contrast-125 brightness-75"
              referrerPolicy="no-referrer"
            />
          ) : mapStyle === 'carto' ? (
            <div className="w-full h-full bg-[#1e293b] relative">
              {/* Cartographic styled grid lines */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)] bg-[size:40px_40px] opacity-30" />
              {/* Stylized river path */}
              <svg className="absolute inset-0 w-full h-full opacity-60" preserveAspectRatio="none" viewBox="0 0 1000 600">
                <path d="M 100 50 Q 250 180 350 220 T 600 350 T 800 520 T 950 580" fill="none" stroke="#0ea5e9" strokeWidth="8" strokeLinecap="round" strokeDasharray="10 5" />
                <path d="M 400 10 Q 420 120 480 200 T 600 350" fill="none" stroke="#38bdf8" strokeWidth="4" />
                <text x="750" y="470" fill="#38bdf8" fontSize="13" fontFamily="monospace" fontWeight="bold" letterSpacing="2">RÍO HUALLAGA</text>
                <text x="260" y="190" fill="#38bdf8" fontSize="12" fontFamily="monospace" fontWeight="bold" letterSpacing="2">RÍO MAYO</text>
              </svg>
            </div>
          ) : (
            // Relieve / Terrain Mode
            <div className="w-full h-full relative bg-gradient-to-tr from-emerald-950 via-slate-900 to-teal-950">
              <img 
                src="https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&q=80&w=1600" 
                alt="Relieve Amazonía San Martín" 
                className="w-full h-full object-cover opacity-40 mix-blend-overlay"
                referrerPolicy="no-referrer"
              />
              {/* Topographical vector contour curves */}
              <svg className="absolute inset-0 w-full h-full opacity-35 pointer-events-none" preserveAspectRatio="none" viewBox="0 0 1000 600">
                <path d="M 0,200 C 300,150 400,300 700,200 C 850,150 950,220 1000,240" fill="none" stroke="#10b981" strokeWidth="1.5" />
                <path d="M 0,260 C 250,210 380,360 680,260 C 820,210 920,280 1000,300" fill="none" stroke="#10b981" strokeWidth="1" strokeDasharray="6 3" />
                <path d="M 0,330 C 280,280 420,420 720,320 C 860,270 940,340 1000,370" fill="none" stroke="#10b981" strokeWidth="1.5" />
                {/* River overlay */}
                <path d="M 120 40 Q 280 170 380 230 T 640 370 T 820 530" fill="none" stroke="#06b6d4" strokeWidth="6" strokeLinecap="round" />
                <text x="660" y="400" fill="#22d3ee" fontSize="11" fontFamily="monospace" fontWeight="bold">CUENCA DEL HUALLAGA</text>
              </svg>
            </div>
          )}

          {/* Coordinate Grid overlay for authenticity */}
          <div className="absolute inset-0 pointer-events-none border border-emerald-500/10">
            <div className="absolute top-3 left-4 font-mono text-[9px] text-emerald-400/70">
              06°00&apos;00&quot;S / 77°00&apos;00&quot;W
            </div>
            <div className="absolute bottom-3 right-4 font-mono text-[9px] text-emerald-400/70">
              07°00&apos;00&quot;S / 76°00&apos;00&quot;W
            </div>
            <div className="absolute top-1/2 left-3 -translate-y-1/2 font-mono text-[8px] text-slate-500/80 -rotate-90 origin-left">
              CORDILLERA ESCALERA
            </div>
          </div>

          {/* Interactive Location Markers */}
          {POINTS_OF_INTEREST.map((point) => {
            const isSelected = activePoint.id === point.id;
            const displayName = language === 'es' ? point.name : point.nameEn;
            return (
              <div
                key={point.id}
                style={{ top: `${point.yPercent}%`, left: `${point.xPercent}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 group"
                onClick={() => setActivePoint(point)}
              >
                {/* Pulsating radar ring for Sede Central */}
                {point.type === 'sede' && (
                  <span className="absolute -inset-3 rounded-full bg-emerald-400/30 animate-ping pointer-events-none" />
                )}

                {/* Marker Pin Icon */}
                <div 
                  className={`relative flex items-center justify-center rounded-2xl shadow-2xl transition-all duration-300 ${
                    isSelected 
                      ? 'w-12 h-12 bg-brand-green text-white scale-110 ring-4 ring-emerald-400/50 shadow-emerald-500/50' 
                      : 'w-9 h-9 bg-slate-900/90 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-700'
                  }`}
                >
                  {point.type === 'sede' && <Building2 className="w-5 h-5" />}
                  {point.type === 'acopio' && <Truck className="w-4 h-4" />}
                  {point.type === 'planta' && <MapPin className="w-4 h-4" />}
                  {point.type === 'aguajal' && <Leaf className="w-4 h-4" />}

                  {/* Marker Pin Point */}
                  <div className={`absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 ${
                    isSelected ? 'bg-brand-green' : 'bg-slate-900'
                  }`} />
                </div>

                {/* Always visible or hover label badge */}
                <div className={`absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider transition-all pointer-events-none shadow-lg ${
                  isSelected 
                    ? 'bg-white text-slate-900 border border-emerald-500/30 opacity-100 scale-100' 
                    : 'bg-slate-900/90 text-slate-300 border border-slate-700/80 opacity-80 group-hover:opacity-100 group-hover:scale-105'
                }`}>
                  {displayName.replace('AGRICARL PERÚ S.A.C.', 'AGRICARL')}
                </div>
              </div>
            );
          })}
        </div>

        {/* Floating Zoom & Control Toolbar */}
        <div className="absolute top-4 right-4 z-30 flex flex-col gap-1.5 bg-slate-900/90 backdrop-blur-md p-1.5 rounded-2xl border border-slate-800 shadow-xl print:hidden">
          <button
            onClick={handleZoomIn}
            title={language === 'es' ? 'Acercar mapa' : 'Zoom in'}
            className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-brand-green text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={handleZoomOut}
            title={language === 'es' ? 'Alejar mapa' : 'Zoom out'}
            className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-brand-green text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={handleResetZoom}
            title={language === 'es' ? 'Centrar vista' : 'Reset view'}
            className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-brand-green text-white flex items-center justify-center transition-colors cursor-pointer text-[10px] font-mono font-bold"
          >
            1x
          </button>
        </div>

        {/* Selected Point Floating Card */}
        <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-md z-30 bg-slate-950/95 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-emerald-500/30 shadow-2xl text-white space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1">
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold uppercase">
                <Sparkles className="w-3 h-3" />
                <span>{language === 'es' ? activePoint.label : activePoint.labelEn}</span>
              </span>
              <h4 className="font-display font-bold text-sm sm:text-base text-white uppercase">
                {language === 'es' ? activePoint.name : activePoint.nameEn}
              </h4>
            </div>
            <div className="w-8 h-8 rounded-xl bg-emerald-950 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <MapPin className="w-4 h-4" />
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed font-light">
            {language === 'es' ? activePoint.description : activePoint.descriptionEn}
          </p>

          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800 text-[11px] font-mono text-slate-400">
            <div className="flex items-center gap-2">
              <span className="text-emerald-400 font-bold">{activePoint.district}</span>
              <span>·</span>
              <span>{activePoint.coords}</span>
            </div>

            <div className="flex items-center gap-2 print:hidden">
              <button
                onClick={handleCopyCoords}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[10px] font-mono transition-colors flex items-center gap-1 cursor-pointer"
                title={language === 'es' ? 'Copiar coordenadas' : 'Copy coordinates'}
              >
                {copiedCoords ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span className="text-emerald-400">{language === 'es' ? 'Copiado' : 'Copied'}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>{language === 'es' ? 'Copiar GPS' : 'Copy GPS'}</span>
                  </>
                )}
              </button>

              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 rounded-lg bg-brand-green hover:bg-emerald-600 text-white text-[10px] font-mono font-bold uppercase transition-colors flex items-center gap-1 shadow-sm"
              >
                <span>{language === 'es' ? 'Ver en Maps' : 'View in Maps'}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* Interactive Hub Quick Selector Ribbon */}
      <div className="bg-slate-50 border-t border-slate-200 px-4 sm:px-6 py-3 print:hidden">
        <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1 sm:pb-0">
          <span className="text-[10px] font-mono uppercase font-bold text-slate-400 whitespace-nowrap mr-2">
            {language === 'es' ? 'Puntos de Interés:' : 'Points of Interest:'}
          </span>
          <div className="flex items-center gap-2">
            {POINTS_OF_INTEREST.map((point) => (
              <button
                key={point.id}
                onClick={() => setActivePoint(point)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-medium transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                  activePoint.id === point.id
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200/80'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${activePoint.id === point.id ? 'bg-emerald-400' : 'bg-slate-400'}`} />
                <span>
                  {language === 'es' 
                    ? point.name.replace('AGRICARL PERÚ S.A.C.', 'Sede Central')
                    : point.nameEn.replace('AGRICARL PERÚ S.A.C. Headquarters', 'Headquarters')}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
