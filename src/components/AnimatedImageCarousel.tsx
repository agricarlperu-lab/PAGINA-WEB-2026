import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Pause, Play, Sparkles, Camera } from 'lucide-react';
import { useMedia } from '../context/MediaContext';
import { transformImageUrl } from '../utils/mediaStorage';

export function isVideoUrl(url: string | undefined | null): boolean {
  if (!url) return false;
  const lower = url.toLowerCase().trim();
  return (
    lower.startsWith('data:video/') ||
    lower.startsWith('blob:') ||
    lower.endsWith('.mp4') ||
    lower.endsWith('.webm') ||
    lower.endsWith('.mov') ||
    lower.endsWith('.m4v') ||
    lower.endsWith('.ogv') ||
    lower.includes('.mp4?') ||
    lower.includes('.webm?') ||
    lower.includes('/video/') ||
    lower.includes('mp4') ||
    lower.includes('youtube.com') ||
    lower.includes('youtu.be') ||
    lower.includes('vimeo.com') ||
    lower.includes('drive.google.com')
  );
}

export function isYouTubeUrl(url: string | undefined | null): boolean {
  if (!url) return false;
  return /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)/i.test(url);
}

export function getYouTubeEmbedUrl(url: string): string {
  const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i);
  return match ? `https://www.youtube.com/embed/${match[1]}?autoplay=1&mute=1&loop=1&playlist=${match[1]}&controls=1` : url;
}

export function isGoogleDriveUrl(url: string | undefined | null): boolean {
  if (!url) return false;
  return /drive\.google\.com/i.test(url);
}

export function getGoogleDriveEmbedUrl(url: string): string {
  if (!url) return '';
  const matchFile = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/i);
  if (matchFile && matchFile[1]) {
    return `https://drive.google.com/file/d/${matchFile[1]}/preview`;
  }
  const matchId = url.match(/[?&]id=([a-zA-Z0-9_-]+)/i);
  if (matchId && matchId[1]) {
    return `https://drive.google.com/file/d/${matchId[1]}/preview`;
  }
  // If already a preview link or other
  if (url.includes('/preview')) return url;
  return url;
}

export interface GalleryItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  image: string;
  description?: string;
  badgeColor?: string;
}

export const GALLERY_IMAGES: GalleryItem[] = [
  {
    id: 'sacha-1',
    title: 'Sacha Inchi - El Maní del Inca',
    subtitle: 'Superalimento Amazónico rico en Omega 3, 6 y 9',
    category: 'Suministro Agrícola',
    image: 'https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&q=80&w=1200',
    description: 'Semillas seleccionadas y almendras secas cultivadas bajo normas orgánicas en la región de San Martín.',
    badgeColor: 'bg-emerald-600'
  },
  {
    id: 'cacao-1',
    title: 'Cacao Amazónico de Alta Pureza',
    subtitle: 'Granos fermentados de perfil fino y aroma superior',
    category: 'Suministro Agrícola',
    image: 'https://images.unsplash.com/photo-1587132137056-bfbf0166836e?auto=format&fit=crop&q=80&w=1200',
    description: 'Proceso de secado controlado al sol garantizando estándares gastronómicos e industriales de exportación.',
    badgeColor: 'bg-amber-600'
  },
  {
    id: 'agricobros-1',
    title: 'Plataforma Transaccional AgriCobros',
    subtitle: 'Cobranza y recaudación digital sin fricciones',
    category: 'Gestión Financiera',
    image: 'https://images.unsplash.com/photo-1556742049-0a670f4a4591?auto=format&fit=crop&q=80&w=1200',
    description: 'Servicio de recaudación financiera AgriCobros: acepta pagos con tarjetas y banca móvil directamente sin POS y con liquidación inmediata.',
    badgeColor: 'bg-blue-600'
  },
  {
    id: 'gestor-1',
    title: 'Gestor Contable Emprendedor 5.4',
    subtitle: 'Automatización del Libro Diario Formato 5.2',
    category: 'Gestión Financiera',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=1200',
    description: 'Sincronización de transacciones con la normativa contable vigente para PYMEs y empresas.',
    badgeColor: 'bg-cyan-600'
  },
  {
    id: 'sacha-2',
    title: 'Aceite Extra Virgen de Sacha Inchi',
    subtitle: 'Extracción en frío de máxima calidad nutricional',
    category: 'Superalimentos',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=1200',
    description: 'Nutracéutico natural galardonado mundialmente por su alta densidad de ácidos grasos esenciales.',
    badgeColor: 'bg-emerald-700'
  },
  {
    id: 'cacao-2',
    title: 'Nibs y Cobertura de Cacao Fino',
    subtitle: 'Materia prima de sabor intenso y tostado artesanal',
    category: 'Agro-Industria',
    image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&q=80&w=1200',
    description: 'Insumo estrella para chocolatería fina, repostería y alimentos funcionales.',
    badgeColor: 'bg-amber-700'
  },
  {
    id: 'aguaje-1',
    title: 'Aguaje Deshidratado Amazónico',
    subtitle: 'Rico en provitamina A y fitoestrógenos naturales',
    category: 'Superalimentos',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=1200',
    description: 'Pulpa deshidratada en polvo fino y hojuelas para la industria nutracéutica y cosmética.',
    badgeColor: 'bg-amber-600'
  },
  {
    id: 'coco-1',
    title: 'Coco & Subproductos de San Martín',
    subtitle: 'Coco Rallado Deshidratado y Aceite Virgen Prensado en Frío',
    category: 'Agro-Industria',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=1200',
    description: 'Insumos puros sin aditivos químicos para la industria gastronómica, panadera y cosmética.',
    badgeColor: 'bg-emerald-800'
  }
];

// 1. COMPONENTE: Carrusel con Animación Automática y Transiciones Graduales
export const AnimatedHeroCarousel: React.FC<{ 
  images?: GalleryItem[];
  onItemClick?: (item: GalleryItem) => void;
}> = ({ images = GALLERY_IMAGES, onItemClick }) => {
  const { getImage, openEditor } = useMedia();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const activeImages = images.length > 0 ? images : GALLERY_IMAGES;

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activeImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isPlaying, activeImages.length]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % activeImages.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + activeImages.length) % activeImages.length);
  };

  const currentItem = activeImages[currentIndex] || activeImages[0];
  const rawImageSrc = getImage(`carousel-${currentItem.id}`, currentItem.image);
  const currentImageSrc = transformImageUrl(rawImageSrc);

  const displayTitle = (currentItem.title || '').replace(/cobragood/gi, 'AgriCobros');
  const displaySubtitle = (currentItem.subtitle || '').replace(/cobragood/gi, 'AgriCobros');
  const displayDescription = (currentItem.description || '').replace(/cobragood/gi, 'AgriCobros');

  return (
    <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 bg-slate-950 aspect-[16/9] sm:aspect-[21/9]">
      {/* Dynamic Animated Background Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentItem.id}
          initial={{ opacity: 0, scale: 1.15 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 w-full h-full cursor-pointer"
          onClick={() => onItemClick && onItemClick(currentItem)}
        >
          {isVideoUrl(currentImageSrc) ? (
            <video
              src={currentImageSrc}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src={currentImageSrc}
              alt={currentItem.title}
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
            />
          )}
          {/* Gradient dark overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Floating Animated Badge & Info */}
      <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 z-20 flex flex-col justify-end pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentItem.id + '-info'}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl space-y-3"
          >
            <div className="flex items-center gap-2">
              <span className={`text-[10px] font-mono uppercase tracking-widest text-white px-3 py-1 rounded-full font-bold shadow-md ${currentItem.badgeColor || 'bg-brand-green'}`}>
                {currentItem.category}
              </span>
              <span className="text-[10px] font-mono text-slate-300 bg-black/40 px-2.5 py-1 rounded-full backdrop-blur-md border border-white/10 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>En movimiento · {currentIndex + 1}/{activeImages.length}</span>
              </span>
            </div>

            <h3 className="text-xl sm:text-3xl font-display font-black text-white uppercase tracking-tight drop-shadow-md">
              {displayTitle}
            </h3>

            <p className="text-xs sm:text-sm text-slate-200 font-light leading-relaxed line-clamp-2 drop-shadow-sm">
              {displaySubtitle} — {displayDescription}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Carousel Controls */}
      <div className="absolute top-4 right-4 z-30 flex items-center gap-2 bg-slate-900/80 backdrop-blur-md p-1.5 rounded-full border border-white/15 print:hidden">
        <button
          onClick={() => {
            openEditor({
              key: `carousel-${currentItem.id}`,
              title: `Diapositiva: ${currentItem.title}`,
              type: 'image',
              currentSrc: currentImageSrc,
              defaultSrc: currentItem.image,
              section: 'Carrusel Principal',
            });
          }}
          className="h-8 px-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 transition-all cursor-pointer shadow-md"
          title="Cambiar la imagen de esta diapositiva"
        >
          <Camera className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Cambiar Foto</span>
        </button>

        <button
          onClick={handlePrev}
          className="w-8 h-8 rounded-full hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          title="Anterior"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-8 h-8 rounded-full hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          title={isPlaying ? "Pausar animación" : "Iniciar animación"}
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
        </button>
        <button
          onClick={handleNext}
          className="w-8 h-8 rounded-full hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          title="Siguiente"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Bottom Progress Bar Indicators */}
      <div className="absolute bottom-3 right-6 z-30 hidden sm:flex items-center gap-1.5 print:hidden">
        {activeImages.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
              idx === currentIndex ? 'w-8 bg-brand-pink-accent' : 'w-2 bg-white/40 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

// 2. COMPONENTE: Marquesina Horizontal Infinita de Imágenes en Movimiento
export const ContinuousMovingImageMarquee: React.FC<{ 
  images?: GalleryItem[];
  onItemClick?: (id: string) => void;
}> = ({ images = GALLERY_IMAGES, onItemClick }) => {
  const { getImage } = useMedia();
  const activeImages = images.length > 0 ? images : GALLERY_IMAGES;
  // Duplicate array to achieve seamless infinite loop
  const duplicatedList = [...activeImages, ...activeImages];

  return (
    <div className="w-full overflow-hidden relative py-4 bg-slate-900/5 backdrop-blur-sm border-y border-slate-200/60">
      {/* Gradient edge masks for smooth fade effect */}
      <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-brand-light to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-brand-light to-transparent z-10 pointer-events-none" />

      <div className="flex">
        <motion.div
          className="flex gap-6 shrink-0"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            repeat: Infinity,
            repeatType: 'loop',
            duration: 28,
            ease: 'linear'
          }}
        >
          {duplicatedList.map((item, index) => {
            const itemSrc = getImage(`carousel-${item.id}`, item.image);
            const title = (item.title || '').replace(/cobragood/gi, 'AgriCobros');
            const subtitle = (item.subtitle || '').replace(/cobragood/gi, 'AgriCobros');
            return (
              <div
                key={`${item.id}-${index}`}
                onClick={() => onItemClick && onItemClick(item.id)}
                className="w-64 sm:w-80 shrink-0 group relative rounded-2xl overflow-hidden shadow-md border border-slate-200/80 bg-white aspect-[16/10] cursor-pointer hover:shadow-2xl hover:border-brand-pink-accent transition-all duration-300"
              >
                <img
                  src={itemSrc}
                  alt={title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end">
                  <span className="text-[9px] font-mono font-bold text-emerald-400 uppercase tracking-widest">
                    {item.category}
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-tight line-clamp-1">
                    {title}
                  </h4>
                  <p className="text-[10px] text-slate-300 font-light line-clamp-1 mt-0.5">
                    {subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};
