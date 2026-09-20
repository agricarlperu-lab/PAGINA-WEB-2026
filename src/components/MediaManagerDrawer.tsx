import React, { useState } from 'react';
import { useMedia } from '../context/MediaContext';
import { transformImageUrl } from '../utils/mediaStorage';
import { 
  X, 
  Sparkles, 
  RotateCcw, 
  Sliders, 
  Layers, 
  Package, 
  SlidersHorizontal,
  CheckCircle2,
  Edit2,
  Eye,
  EyeOff
} from 'lucide-react';

interface ManagedMediaItem {
  id: string;
  key: string;
  title: string;
  category: 'identidad' | 'fondos' | 'productos' | 'carrusel';
  type: 'image' | 'background';
  defaultSrc: string;
  section?: string;
}

export const MEDIA_REGISTRY: ManagedMediaItem[] = [
  // Identidad
  {
    id: 'logo',
    key: 'logo',
    title: 'Logo Corporativo AGRICARL',
    category: 'identidad',
    type: 'image',
    defaultSrc: '/src/assets/images/regenerated_image_1789613068806.jpg', // fallback to default
    section: 'Header y Footer'
  },
  {
    id: 'video-presentacion',
    key: 'video-presentacion',
    title: 'Video de Presentación Institucional',
    category: 'identidad',
    type: 'image',
    defaultSrc: 'https://www.youtube.com/watch?v=0kF63N4_X0Y',
    section: 'Inicio (Video Oficial)'
  },

  // Fondos
  {
    id: 'bg-hero',
    key: 'bg-hero',
    title: 'Fondo del Hero Principal',
    category: 'fondos',
    type: 'background',
    defaultSrc: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&q=80&w=1600',
    section: 'Inicio (Hero)'
  },
  {
    id: 'bg-stats-ribbon',
    key: 'bg-stats-ribbon',
    title: 'Cinta de Métricas e Impacto',
    category: 'fondos',
    type: 'background',
    defaultSrc: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1600',
    section: 'Indicadores (PEL 5.2, 100%, 24/7)'
  },
  {
    id: 'bg-division-agro',
    key: 'bg-division-agro',
    title: 'Fondo División Agroindustrial',
    category: 'fondos',
    type: 'background',
    defaultSrc: 'https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&q=80&w=1600',
    section: 'Líneas Estratégicas'
  },
  {
    id: 'bg-division-tech',
    key: 'bg-division-tech',
    title: 'Fondo División Tecnológica',
    category: 'fondos',
    type: 'background',
    defaultSrc: 'https://images.unsplash.com/photo-1556742049-0a670f4a4591?auto=format&fit=crop&q=80&w=1600',
    section: 'Líneas Estratégicas'
  },
  {
    id: 'bg-contact',
    key: 'bg-contact',
    title: 'Fondo de Sección de Contacto',
    category: 'fondos',
    type: 'background',
    defaultSrc: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&q=80&w=1600',
    section: 'Contacto y Operaciones'
  },
  {
    id: 'bg-contact-panel',
    key: 'bg-contact-panel',
    title: 'Panel Verde de Información de Contacto',
    category: 'fondos',
    type: 'background',
    defaultSrc: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=800',
    section: 'Contacto y Operaciones'
  },
  {
    id: 'bg-footer',
    key: 'bg-footer',
    title: 'Fondo del Pie de Página (Footer)',
    category: 'fondos',
    type: 'background',
    defaultSrc: '',
    section: 'Pie de Página'
  },
  {
    id: 'bg-sacha-hero',
    key: 'bg-sacha-hero',
    title: 'Hero Sacha Inchi',
    category: 'fondos',
    type: 'background',
    defaultSrc: '',
    section: 'Página Sacha Inchi'
  },
  {
    id: 'bg-sacha-origen',
    key: 'bg-sacha-origen',
    title: 'Origen Ancestral Sacha Inchi',
    category: 'fondos',
    type: 'background',
    defaultSrc: 'https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&q=80&w=1200',
    section: 'Página Sacha Inchi'
  },
  {
    id: 'bg-aguaje-hero',
    key: 'bg-aguaje-hero',
    title: 'Hero Aguaje Deshidratado',
    category: 'fondos',
    type: 'background',
    defaultSrc: '',
    section: 'Página Aguaje'
  },
  {
    id: 'bg-aguaje-cta',
    key: 'bg-aguaje-cta',
    title: 'Llamado a la Acción Aguaje',
    category: 'fondos',
    type: 'background',
    defaultSrc: '',
    section: 'Página Aguaje'
  },
  {
    id: 'bg-cobragood-benefits',
    key: 'bg-cobragood-benefits',
    title: 'Beneficios AgriCobros',
    category: 'fondos',
    type: 'background',
    defaultSrc: '',
    section: 'Página AgriCobros'
  },
  {
    id: 'bg-cobragood-cta',
    key: 'bg-cobragood-cta',
    title: 'Tarjeta CTA AgriCobros',
    category: 'fondos',
    type: 'background',
    defaultSrc: '',
    section: 'Página AgriCobros'
  },
  {
    id: 'bg-gestor-benefits',
    key: 'bg-gestor-benefits',
    title: 'Beneficios Gestor Contable',
    category: 'fondos',
    type: 'background',
    defaultSrc: '',
    section: 'Página Gestor Contable'
  },
  {
    id: 'bg-gestor-pricing',
    key: 'bg-gestor-pricing',
    title: 'Tarjeta Precio Gestor Contable',
    category: 'fondos',
    type: 'background',
    defaultSrc: '',
    section: 'Página Gestor Contable'
  },

  // Productos y Servicios
  {
    id: 'prod-sacha',
    key: 'img-sacha-inchi',
    title: 'Sacha Inchi (Maní del Inca)',
    category: 'productos',
    type: 'image',
    defaultSrc: 'https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&q=80&w=800',
    section: 'Catálogo Agro'
  },
  {
    id: 'prod-cacao',
    key: 'img-cacao',
    title: 'Cacao Fino de Aroma',
    category: 'productos',
    type: 'image',
    defaultSrc: 'https://images.unsplash.com/photo-1587132137056-bfbf0166836e?auto=format&fit=crop&q=80&w=800',
    section: 'Catálogo Agro'
  },
  {
    id: 'prod-aguaje',
    key: 'img-aguaje',
    title: 'Aguaje Deshidratado',
    category: 'productos',
    type: 'image',
    defaultSrc: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=800',
    section: 'Catálogo Agro'
  },
  {
    id: 'prod-coco',
    key: 'img-coco',
    title: 'Coco & Subproductos',
    category: 'productos',
    type: 'image',
    defaultSrc: '/src/assets/images/regenerated_image_1789613068806.jpg',
    section: 'Catálogo Agro'
  },
  {
    id: 'serv-cobragood',
    key: 'img-cobragood',
    title: 'Plataforma AgriCobros',
    category: 'productos',
    type: 'image',
    defaultSrc: 'https://images.unsplash.com/photo-1563013544-824ae1d704d3?auto=format&fit=crop&q=80&w=800',
    section: 'Servicios Tech'
  },
  {
    id: 'serv-gestor',
    key: 'img-gestor-contable',
    title: 'Gestor Contable Formato 5.2',
    category: 'productos',
    type: 'image',
    defaultSrc: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800',
    section: 'Servicios Tech'
  },

  // Divisiones Estratégicas
  {
    id: 'div-agro',
    key: 'img-division-agro',
    title: 'División Suministro Agrícola (Foto o Video)',
    category: 'productos',
    type: 'image',
    defaultSrc: 'https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?auto=format&fit=crop&q=80&w=800',
    section: 'Líneas Estratégicas'
  },
  {
    id: 'div-tech',
    key: 'img-division-tech',
    title: 'División Gestión Financiera (Foto o Video)',
    category: 'productos',
    type: 'image',
    defaultSrc: 'https://images.unsplash.com/photo-1556742049-0a670f4a4591?auto=format&fit=crop&q=80&w=800',
    section: 'Líneas Estratégicas'
  },

  // Subproductos y Derivados Específicos
  {
    id: 'sub-coco-shredded',
    key: 'img-coco-shredded',
    title: 'Coco Rallado Deshidratado',
    category: 'productos',
    type: 'image',
    defaultSrc: '/src/assets/images/regenerated_image_1789613071419.jpg',
    section: 'Página Coco'
  },
  {
    id: 'sub-coco-oil',
    key: 'img-coco-oil',
    title: 'Aceite de Coco Virgen Prensado en Frío',
    category: 'productos',
    type: 'image',
    defaultSrc: '/src/assets/images/regenerated_image_1789613074075.png',
    section: 'Página Coco'
  },
  {
    id: 'sub-cacao-nibs',
    key: 'img-cacao-nibs',
    title: 'Nibs de Cacao Puro Tostado',
    category: 'productos',
    type: 'image',
    defaultSrc: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&q=80&w=800',
    section: 'Página Cacao'
  },
  {
    id: 'sub-cacao-cobertura',
    key: 'img-cacao-cobertura',
    title: 'Cobertura de Cacao Fino',
    category: 'productos',
    type: 'image',
    defaultSrc: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&q=80&w=800',
    section: 'Página Cacao'
  },
  {
    id: 'sub-sacha-aceite',
    key: 'img-sacha-aceite',
    title: 'Aceite Extra Virgen Sacha Inchi',
    category: 'productos',
    type: 'image',
    defaultSrc: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=800',
    section: 'Página Sacha Inchi'
  },
  {
    id: 'sub-sacha-semilla',
    key: 'img-sacha-semilla',
    title: 'Semillas Seleccionadas Sacha Inchi',
    category: 'productos',
    type: 'image',
    defaultSrc: 'https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&q=80&w=600',
    section: 'Página Sacha Inchi'
  },
  {
    id: 'sub-sacha-almendra',
    key: 'img-sacha-almendra',
    title: 'Almendras Tostadas Sacha Inchi',
    category: 'productos',
    type: 'image',
    defaultSrc: 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&q=80&w=600',
    section: 'Página Sacha Inchi'
  },
  {
    id: 'sub-aguaje-hero',
    key: 'img-aguaje-hero',
    title: 'Aguaje Liofilizado y Fruto',
    category: 'productos',
    type: 'image',
    defaultSrc: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=800',
    section: 'Página Aguaje'
  },
  {
    id: 'sub-cobragood-hero',
    key: 'img-cobragood-hero',
    title: 'Cobro Digital AgriCobros',
    category: 'productos',
    type: 'image',
    defaultSrc: 'https://images.unsplash.com/photo-1556742111-a301076d9d18?auto=format&fit=crop&q=80&w=600',
    section: 'Página AgriCobros'
  },
  {
    id: 'sub-cobragood-tech',
    key: 'img-cobragood-tech',
    title: 'Visual Robot 3D AgriCobros',
    category: 'productos',
    type: 'image',
    defaultSrc: 'https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?auto=format&fit=crop&q=80&w=700',
    section: 'Página AgriCobros'
  },
  {
    id: 'sub-gestor-hero',
    key: 'img-gestor-hero',
    title: 'Contador Profesional Gestor',
    category: 'productos',
    type: 'image',
    defaultSrc: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=1000',
    section: 'Página Gestor Contable'
  },

  // Carrusel
  {
    id: 'slide-1',
    key: 'carousel-sacha-1',
    title: 'Carrusel: Sacha Inchi Semillas',
    category: 'carrusel',
    type: 'image',
    defaultSrc: 'https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&q=80&w=1200',
    section: 'Hero Slide 1'
  },
  {
    id: 'slide-2',
    key: 'carousel-cacao-1',
    title: 'Carrusel: Cacao Granos',
    category: 'carrusel',
    type: 'image',
    defaultSrc: 'https://images.unsplash.com/photo-1587132137056-bfbf0166836e?auto=format&fit=crop&q=80&w=1200',
    section: 'Hero Slide 2'
  },
  {
    id: 'slide-3',
    key: 'carousel-agricobros-1',
    title: 'Carrusel: AgriCobros Móvil',
    category: 'carrusel',
    type: 'image',
    defaultSrc: 'https://images.unsplash.com/photo-1556742049-0a670f4a4591?auto=format&fit=crop&q=80&w=1200',
    section: 'Hero Slide 3'
  },
  {
    id: 'slide-4',
    key: 'carousel-gestor-1',
    title: 'Carrusel: Gestor Contable 5.2',
    category: 'carrusel',
    type: 'image',
    defaultSrc: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=1200',
    section: 'Hero Slide 4'
  }
];

export const MediaManagerDrawer: React.FC = () => {
  const { 
    isDrawerOpen, 
    closeDrawer, 
    images, 
    backgrounds, 
    getImage, 
    getBackground, 
    openEditor, 
    resetImage, 
    resetBackground,
    resetAllMedia, 
    isEditMode, 
    toggleEditMode 
  } = useMedia();

  const [activeCategory, setActiveCategory] = useState<string>('todos');

  if (!isDrawerOpen) return null;

  const categories = [
    { id: 'todos', label: 'Todos', icon: Layers },
    { id: 'fondos', label: 'Fondos', icon: Sliders },
    { id: 'productos', label: 'Productos & Servicios', icon: Package },
    { id: 'carrusel', label: 'Carrusel', icon: SlidersHorizontal },
    { id: 'identidad', label: 'Logo', icon: Sparkles },
  ];

  const filteredItems = activeCategory === 'todos' 
    ? MEDIA_REGISTRY 
    : MEDIA_REGISTRY.filter(item => item.category === activeCategory);

  const totalCustomized = Object.keys(images).length + Object.keys(backgrounds).length;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/70 backdrop-blur-xs flex justify-end animate-fadeIn">
      <div 
        className="w-full max-w-xl bg-white h-full shadow-2xl flex flex-col justify-between border-l border-slate-200 text-slate-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-6 border-b border-slate-200/90 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-700 text-white flex items-center justify-center shadow-md">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display font-black text-lg text-slate-900 leading-tight">
                Gestor de Imágenes y Fondos
              </h2>
              <p className="text-xs text-slate-500 font-mono">
                AGRICARL PERÚ S.A.C. · Personalización Total
              </p>
            </div>
          </div>
          <button
            onClick={closeDrawer}
            className="w-9 h-9 rounded-full hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer"
            title="Cerrar panel"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Global Controls & Mode Switch */}
        <div className="p-4 bg-emerald-50/60 border-b border-emerald-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <button
              onClick={toggleEditMode}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
                isEditMode 
                  ? 'bg-emerald-700 text-white shadow-sm' 
                  : 'bg-white border border-slate-300 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {isEditMode ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
              <span>{isEditMode ? 'Modo Edición Visible' : 'Modo Edición Oculto'}</span>
            </button>
            <span className="text-[11px] text-slate-600 hidden sm:inline">
              (Botones flotantes en la página)
            </span>
          </div>

          {totalCustomized > 0 && (
            <button
              onClick={() => {
                if (window.confirm('¿Deseas restaurar todas las imágenes y fondos a sus valores predeterminados?')) {
                  resetAllMedia();
                }
              }}
              className="text-[11px] text-rose-600 hover:text-rose-700 hover:underline font-bold flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Restablecer todo ({totalCustomized})</span>
            </button>
          )}
        </div>

        {/* Category Tabs */}
        <div className="flex border-b border-slate-200 px-6 gap-2 overflow-x-auto py-2.5 bg-white">
          {categories.map(cat => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`py-1.5 px-3 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap ${
                  activeCategory === cat.id 
                    ? 'bg-slate-900 text-white' 
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Media Registry List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <div className="grid grid-cols-1 gap-3.5">
            {filteredItems.map(item => {
              const currentSrc = item.type === 'background'
                ? getBackground(item.key, { image: item.defaultSrc }).image || item.defaultSrc
                : getImage(item.key, item.defaultSrc);
              
              const isCustom = item.type === 'background'
                ? !!backgrounds[item.key]
                : !!images[item.key];

              return (
                <div
                  key={item.id}
                  className="bg-white border border-slate-200/90 hover:border-emerald-600/50 rounded-2xl p-3.5 flex items-center justify-between gap-4 shadow-2xs hover:shadow-md transition-all group"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-16 h-14 rounded-xl overflow-hidden bg-slate-900 shrink-0 border border-slate-200 relative">
                      <img
                        src={transformImageUrl(currentSrc)}
                        alt={item.title}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = item.defaultSrc;
                        }}
                      />
                      {isCustom && (
                        <div className="absolute top-1 right-1 w-3.5 h-3.5 bg-emerald-600 rounded-full flex items-center justify-center text-white" title="Personalizado">
                          <CheckCircle2 className="w-2.5 h-2.5" />
                        </div>
                      )}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-sm text-slate-900 truncate">
                          {item.title}
                        </h4>
                      </div>
                      <p className="text-[11px] text-slate-500 font-mono truncate">
                        {item.section} · <span className="capitalize">{item.type === 'background' ? 'Fondo' : 'Imagen'}</span>
                      </p>
                      {isCustom && (
                        <span className="inline-block mt-0.5 text-[9px] font-mono font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                          Personalizado
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => {
                        openEditor({
                          key: item.key,
                          title: item.title,
                          type: item.type,
                          currentSrc,
                          defaultSrc: item.defaultSrc,
                          section: item.section,
                          currentBg: item.type === 'background' ? getBackground(item.key) : undefined,
                        });
                      }}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1 shadow-2xs hover:shadow-xs transition-colors cursor-pointer"
                      title="Editar o cambiar este elemento"
                    >
                      <Edit2 className="w-3 h-3" />
                      <span>Modificar</span>
                    </button>

                    {isCustom && (
                      <button
                        onClick={() => {
                          if (item.type === 'background') {
                            resetBackground(item.key);
                          } else {
                            resetImage(item.key);
                          }
                        }}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                        title="Restaurar a original"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Drawer Footer info */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 text-center">
          <p className="text-xs text-slate-600 leading-relaxed">
            💡 <strong>Consejo</strong>: También puedes pasar el cursor sobre cualquier foto o fondo en la página para hacer clic en el botón <strong>«Cambiar imagen / fondo»</strong>.
          </p>
        </div>
      </div>
    </div>
  );
};
