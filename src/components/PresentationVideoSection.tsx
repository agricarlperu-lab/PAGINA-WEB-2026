import React, { useState, useRef } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  RotateCcw, 
  Film, 
  CheckCircle2, 
  ExternalLink, 
  Sliders, 
  ShieldCheck, 
  TreePine, 
  X,
  Link as LinkIcon,
  Check,
  Building2,
  Users2,
  HardDrive,
  Share2,
  Globe,
  AlertCircle,
  HelpCircle,
  FileVideo,
  Info
} from 'lucide-react';
import { useMedia } from '../context/MediaContext';
import { useLanguage } from '../context/LanguageContext';
import { isYouTubeUrl, isGoogleDriveUrl, getGoogleDriveEmbedUrl } from './AnimatedImageCarousel';

// Presets de video representativos para AGRICARL PERÚ
export interface VideoPreset {
  id: string;
  title: string;
  subtitle: string;
  url: string;
  thumbnail: string;
  type: 'youtube' | 'drive' | 'direct';
}

export const PRESENTATION_VIDEO_PRESETS: VideoPreset[] = [
  {
    id: 'cacao-san-martin',
    title: 'Cacao Fino de Aroma & Agricultura en San Martín',
    subtitle: 'El Milagro de San Martín: Cacao de exportación y desarrollo sostenible',
    url: 'https://www.youtube.com/watch?v=0kF63N4_X0Y',
    thumbnail: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&q=80&w=800',
    type: 'youtube'
  },
  {
    id: 'amazonia-cadena',
    title: 'Cosecha Amazónica & Superalimentos Nativos',
    subtitle: 'Sacha Inchi, Aguaje y Frutos de la Biodiversidad Peruana',
    url: 'https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&q=80&w=800',
    thumbnail: 'https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&q=80&w=800',
    type: 'youtube'
  },
  {
    id: 'peru-agro-clip',
    title: 'Producción Agrícola y Conexión con el Mercado',
    subtitle: 'Clip panorámico de paisajes y cultivos peruanos en alta definición',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-coffee-beans-in-a-field-of-plants-41617-large.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&q=80&w=800',
    type: 'direct'
  }
];

// Default YouTube presentation video highlighting Peru cacao / San Martin agroforestry
export const DEFAULT_PRESENTATION_VIDEO = 'https://www.youtube.com/watch?v=0kF63N4_X0Y';

interface PresentationVideoSectionProps {
  id?: string;
  className?: string;
}

export const PresentationVideoSection: React.FC<PresentationVideoSectionProps> = ({
  id = 'video-presentacion',
  className = ''
}) => {
  const { language } = useLanguage();
  const { getImage, setImage } = useMedia();

  // Video URL stored in media context under key 'video-presentacion'
  const activeVideoUrl = getImage('video-presentacion', DEFAULT_PRESENTATION_VIDEO);

  // States
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [showConfigModal, setShowConfigModal] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'drive' | 'youtube' | 'presets'>('drive');
  const [customUrlInput, setCustomUrlInput] = useState<string>('');
  const [inputFeedback, setInputFeedback] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);

  const isDrive = isGoogleDriveUrl(activeVideoUrl);
  const isYouTube = !isDrive && isYouTubeUrl(activeVideoUrl);

  // Detect format of whatever the user types in the input
  const inputIsDrive = isGoogleDriveUrl(customUrlInput);
  const inputIsYouTube = isYouTubeUrl(customUrlInput);

  // Helper to construct YouTube embed URL with options
  const getEmbedUrl = (url: string, autoPlayMode: boolean) => {
    const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i);
    const videoId = match ? match[1] : '0kF63N4_X0Y';
    return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=${autoPlayMode ? 1 : 0}&rel=0&modestbranding=1&enablejsapi=1`;
  };

  const handleTogglePlay = () => {
    if (isYouTube || isDrive) {
      setIsPlaying(prev => !prev);
      return;
    }

    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(err => {
          console.warn('Playback blocked by browser policy:', err);
        });
      }
    }
  };

  const handleToggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleFullscreen = () => {
    if (videoContainerRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      } else {
        videoContainerRef.current.requestFullscreen().catch(() => {});
      }
    }
  };

  const handleApplyCustomUrl = (urlToApply?: string) => {
    const rawTarget = (urlToApply || customUrlInput).trim();
    if (!rawTarget) {
      setInputFeedback({
        type: 'error',
        message: language === 'es' ? 'Por favor ingrese un enlace válido de Google Drive, YouTube o MP4.' : 'Please enter a valid Google Drive, YouTube or MP4 link.'
      });
      return;
    }

    // Auto-convert Google Drive sharing links to preview embed
    let finalUrl = rawTarget;
    if (isGoogleDriveUrl(rawTarget)) {
      finalUrl = getGoogleDriveEmbedUrl(rawTarget);
    }

    setImage('video-presentacion', finalUrl);
    setInputFeedback({
      type: 'success',
      message: isGoogleDriveUrl(rawTarget)
        ? (language === 'es' ? '¡Enlace de Google Drive configurado correctamente en modo reproducción!' : 'Google Drive link successfully configured in playback mode!')
        : (language === 'es' ? '¡Video actualizado con éxito!' : 'Video successfully updated!')
    });

    setTimeout(() => {
      setShowConfigModal(false);
      setInputFeedback(null);
      setCustomUrlInput('');
      setIsPlaying(true);
    }, 900);
  };

  return (
    <section 
      id={id} 
      className={`relative py-16 sm:py-24 bg-gradient-to-b from-white via-slate-50/70 to-emerald-950/5 overflow-hidden ${className}`}
    >
      {/* Decorative background glow & architectural lines */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-emerald-600/30 to-transparent" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-10 sm:mb-14">
          <h2 className="font-display font-black text-2xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight uppercase leading-tight">
            {language === 'es' ? 'Conoce AGRICARL PERÚ en Acción' : 'Experience AGRICARL PERU in Action'}
          </h2>

          <p className="text-slate-600 text-base sm:text-lg font-light leading-relaxed">
            {language === 'es' 
              ? 'Descubre cómo articulamos la riqueza productiva de la Amazonía peruana (San Martín) con industrias y compradores de alta exigencia a nivel nacional e internacional.'
              : 'Discover how we bridge the agricultural richness of the Peruvian Amazon (San Martín) with demanding industries and buyers nationally and internationally.'}
          </p>

          {/* Quick Action to Change Video */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => {
                setActiveTab('drive');
                setShowConfigModal(true);
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-[#4c0519] hover:bg-[#6e0d25] border border-rose-900/40 shadow-xs transition-all hover:scale-102 cursor-pointer"
              title="Configurar video de Google Drive"
            >
              <HardDrive className="w-3.5 h-3.5 text-amber-300" />
              <span>{language === 'es' ? 'Poner Video de Google Drive' : 'Add Google Drive Video'}</span>
            </button>

            <button
              onClick={() => setShowConfigModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 shadow-2xs transition-all hover:scale-102 cursor-pointer"
              title={language === 'es' ? 'Cambiar o personalizar el enlace del video' : 'Change or customize video link'}
            >
              <Sliders className="w-3.5 h-3.5 text-emerald-600" />
              <span>{language === 'es' ? 'Opciones de Video' : 'Video Options'}</span>
            </button>

            <div className="text-[11px] font-mono text-emerald-800 bg-emerald-100/70 px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1.5">
              {isDrive ? (
                <>
                  <HardDrive className="w-3 h-3 text-blue-600" />
                  <span>Google Drive Video</span>
                </>
              ) : isYouTube ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-red-600" />
                  <span>YouTube HD</span>
                </>
              ) : (
                <>
                  <span className="w-2 h-2 rounded-full bg-emerald-600" />
                  <span>Reproductor Directo HD</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Video Player Cinema Frame */}
        <div 
          ref={videoContainerRef}
          className="relative max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-2xl border-2 border-slate-800/20 bg-slate-950 group"
        >
          {/* Top Bar on Video Player */}
          <div className="bg-[#121c17] text-white px-4 sm:px-6 py-2.5 flex items-center justify-between border-b border-emerald-900/50 text-xs font-mono">
            <div className="flex items-center gap-2.5">
              <span className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
              <span className="font-bold text-emerald-400 tracking-wider text-[11px] sm:text-xs">AGRICARL PERÚ:</span>
              <span className="text-slate-300 text-[10px] sm:text-xs truncate">
                {language === 'es' ? 'Presentación Institucional y Cadena Productiva' : 'Corporate Presentation & Productive Chain'}
              </span>
            </div>

            <div className="flex items-center gap-3 text-slate-400 text-[11px]">
              {isDrive ? (
                <span className="inline-flex items-center gap-1 text-blue-300 bg-blue-950/90 px-2.5 py-0.5 rounded border border-blue-800">
                  <HardDrive className="w-3 h-3 text-blue-400" />
                  Google Drive HD
                </span>
              ) : isYouTube ? (
                <span className="hidden sm:inline-block text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/80">
                  1080p Full HD
                </span>
              ) : (
                <span className="hidden sm:inline-block text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/80">
                  MP4 Full HD
                </span>
              )}
              <button 
                onClick={handleFullscreen}
                className="hover:text-white transition-colors cursor-pointer p-1"
                title="Pantalla Completa"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Video Player Area */}
          <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden">
            {isDrive ? (
              <iframe
                src={getGoogleDriveEmbedUrl(activeVideoUrl)}
                title="AGRICARL PERÚ - Video de Presentación Institucional (Google Drive)"
                className="w-full h-full border-0"
                allow="autoplay; encrypted-media; fullscreen"
                allowFullScreen
              />
            ) : isYouTube ? (
              <iframe
                src={getEmbedUrl(activeVideoUrl, isPlaying)}
                title="AGRICARL PERÚ - Video de Presentación Institucional"
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : (
              <>
                <video
                  ref={videoRef}
                  src={activeVideoUrl}
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                />

                {/* Big Center Play Overlay (when paused) */}
                {!isPlaying && (
                  <div 
                    onClick={handleTogglePlay}
                    className="absolute inset-0 bg-black/40 backdrop-blur-2xs flex flex-col items-center justify-center cursor-pointer transition-all duration-300 group-hover:bg-black/30"
                  >
                    <button
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-2xl shadow-emerald-900/60 transform hover:scale-110 active:scale-95 transition-all duration-300"
                      aria-label="Reproducir Video de Presentación"
                    >
                      <Play className="w-9 h-9 sm:w-11 sm:h-11 ml-1 fill-white" />
                    </button>
                    <span className="mt-4 text-white text-xs sm:text-sm font-mono tracking-widest uppercase font-bold bg-black/60 px-4 py-1.5 rounded-full border border-white/20">
                      {language === 'es' ? 'Click para Reproducir Presentación' : 'Click to Play Presentation'}
                    </span>
                  </div>
                )}

                {/* Bottom Custom Controls (for direct MP4) */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleTogglePlay}
                      className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
                      title={isPlaying ? 'Pausar' : 'Reproducir'}
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
                    </button>
                    <button
                      onClick={handleToggleMute}
                      className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
                      title={isMuted ? 'Activar Sonido' : 'Silenciar'}
                    >
                      {isMuted ? <VolumeX className="w-4 h-4 text-amber-300" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => {
                        if (videoRef.current) {
                          videoRef.current.currentTime = 0;
                          videoRef.current.play();
                          setIsPlaying(true);
                        }
                      }}
                      className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
                      title="Reiniciar Video"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleFullscreen}
                      className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
                      title="Pantalla Completa"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Lower Informative Banner inside the frame */}
          <div className="bg-[#0b1410] p-4 sm:p-5 border-t border-emerald-900/40 text-slate-300 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600/30 border border-emerald-500/30 flex items-center justify-center shrink-0">
                <TreePine className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <p className="text-white text-xs sm:text-sm font-bold uppercase tracking-wide">
                  {language === 'es' ? 'Abastecimiento Directo desde San Martín' : 'Direct Sourcing from San Martín'}
                </p>
                <p className="text-[11px] text-slate-400 font-light">
                  {language === 'es' 
                    ? 'Tarapoto, Lamas, Mariscal Cáceres y Huallaga Central · Trazabilidad 100%'
                    : 'Tarapoto, Lamas, Mariscal Cáceres and Central Huallaga · 100% Traceability'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {isDrive && (
                <a
                  href={activeVideoUrl.replace('/preview', '/view')}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-mono text-blue-300 hover:text-white bg-blue-950/80 hover:bg-blue-900 px-3 py-1.5 rounded-lg border border-blue-700/60 transition-colors flex items-center gap-1.5"
                  title="Abrir archivo en Google Drive"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>{language === 'es' ? 'Ver en Drive' : 'Open in Drive'}</span>
                </a>
              )}

              <button
                onClick={() => {
                  setActiveTab(isDrive ? 'drive' : 'youtube');
                  setShowConfigModal(true);
                }}
                className="text-xs font-mono text-emerald-300 hover:text-white bg-emerald-950/80 hover:bg-emerald-900 px-3.5 py-1.5 rounded-lg border border-emerald-700/60 transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Sliders className="w-3.5 h-3.5 text-emerald-400" />
                <span>{language === 'es' ? 'Cambiar Video' : 'Change Video'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Google Drive Informational Notice when Drive is active */}
        {isDrive && (
          <div className="max-w-5xl mx-auto mt-4 bg-blue-50 border border-blue-200 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-blue-950">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0">
                <HardDrive className="w-4 h-4" />
              </div>
              <p className="text-xs">
                <span className="font-bold">{language === 'es' ? 'Aviso de Google Drive:' : 'Google Drive Notice:'} </span>
                {language === 'es' 
                  ? 'Para que cualquier persona pueda reproducir el video sin iniciar sesión, asegúrate de que en Drive tenga permiso "Cualquier persona con el enlace" (Lector).'
                  : 'To allow everyone to watch without signing in, make sure the file in Drive has "Anyone with the link" (Viewer) permissions.'}
              </p>
            </div>
            <button
              onClick={() => {
                setActiveTab('drive');
                setShowConfigModal(true);
              }}
              className="text-xs font-bold text-blue-700 hover:text-blue-900 underline whitespace-nowrap cursor-pointer"
            >
              {language === 'es' ? 'Ver instrucciones' : 'View instructions'}
            </button>
          </div>
        )}

        {/* 3 Pillars Below Video */}
        <div className="grid md:grid-cols-3 gap-6 mt-10 max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-display font-black text-slate-900 text-sm uppercase tracking-wide mb-2">
              {language === 'es' ? '1. Trazabilidad y Calidad' : '1. Traceability & Quality'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {language === 'es'
                ? 'Inspeccionamos cada lote de Sacha Inchi, Cacao y Aguaje desde su origen botánico hasta el empaque para garantizar estándares de pureza internacional.'
                : 'We inspect every batch of Sacha Inchi, Cocoa, and Aguaje from its botanical origin to packaging to ensure international purity standards.'}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-4">
              <Users2 className="w-5 h-5" />
            </div>
            <h3 className="font-display font-black text-slate-900 text-sm uppercase tracking-wide mb-2">
              {language === 'es' ? '2. Alianzas con Agricultores' : '2. Farmer Partnerships'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {language === 'es'
                ? 'Comercio justo y asistencia técnica directa a familias y comunidades nativas de la Amazonía, impulsando economías lícitas y sostenibles.'
                : 'Fair trade and direct technical assistance to Amazonian families and native communities, promoting legal and sustainable economies.'}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-4">
              <Building2 className="w-5 h-5" />
            </div>
            <h3 className="font-display font-black text-slate-900 text-sm uppercase tracking-wide mb-2">
              {language === 'es' ? '3. Gestión Tecnológica B2B' : '3. B2B Tech Ecosystem'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {language === 'es'
                ? 'Articulamos software empresarial (AgriCobros) y libros electrónicos SUNAT (PEL Formato 5.2) para una administración transparente y moderna.'
                : 'We integrate business software (AgriCobros) and electronic tax registers (PEL 5.2) for transparent, modernized corporate management.'}
            </p>
          </div>
        </div>

      </div>

      {/* MODAL: Configurar Video (Google Drive / YouTube / Presets) */}
      {showConfigModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div 
            className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-200"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-[#4c0519] text-white px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Film className="w-5 h-5 text-rose-300" />
                <h3 className="font-display font-black text-base uppercase tracking-tight">
                  {language === 'es' ? 'Configurar Video de Presentación' : 'Configure Presentation Video'}
                </h3>
              </div>
              <button 
                onClick={() => setShowConfigModal(false)}
                className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-slate-200 bg-slate-50 px-6 pt-3 gap-2 overflow-x-auto">
              <button
                onClick={() => setActiveTab('drive')}
                className={`pb-3 px-4 text-xs font-bold uppercase tracking-wider flex items-center gap-2 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                  activeTab === 'drive'
                    ? 'border-blue-600 text-blue-700 bg-white rounded-t-lg'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                <HardDrive className="w-4 h-4 text-blue-600" />
                <span>Google Drive</span>
                <span className="bg-blue-100 text-blue-800 text-[10px] px-2 py-0.2 rounded-full font-mono font-bold">
                  {language === 'es' ? 'Recomendado' : 'Recommended'}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('youtube')}
                className={`pb-3 px-4 text-xs font-bold uppercase tracking-wider flex items-center gap-2 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                  activeTab === 'youtube'
                    ? 'border-emerald-600 text-emerald-800 bg-white rounded-t-lg'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                <LinkIcon className="w-4 h-4 text-emerald-600" />
                <span>YouTube / MP4</span>
              </button>

              <button
                onClick={() => setActiveTab('presets')}
                className={`pb-3 px-4 text-xs font-bold uppercase tracking-wider flex items-center gap-2 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                  activeTab === 'presets'
                    ? 'border-slate-800 text-slate-900 bg-white rounded-t-lg'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                <Film className="w-4 h-4 text-slate-600" />
                <span>{language === 'es' ? 'Videos Sugeridos' : 'Suggested Videos'}</span>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">

              {/* TAB 1: GOOGLE DRIVE */}
              {activeTab === 'drive' && (
                <div className="space-y-5">
                  {/* Step-by-step visual instruction */}
                  <div className="bg-blue-50/70 border border-blue-200/90 rounded-2xl p-4.5 space-y-3">
                    <div className="flex items-center gap-2 text-blue-900 font-bold text-xs uppercase tracking-wider">
                      <HardDrive className="w-4 h-4 text-blue-600" />
                      <span>{language === 'es' ? '¿Cómo poner un video desde Google Drive?' : 'How to add a video from Google Drive?'}</span>
                    </div>

                    <div className="grid sm:grid-cols-3 gap-3 pt-1 text-slate-700">
                      <div className="bg-white p-3 rounded-xl border border-blue-100 shadow-2xs space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[11px] font-bold flex items-center justify-center">1</span>
                          <span className="text-xs font-bold text-slate-900">{language === 'es' ? 'Abre tu Drive' : 'Open your Drive'}</span>
                        </div>
                        <p className="text-[11px] text-slate-600 leading-normal">
                          {language === 'es' ? 'Sube tu video a Google Drive y haz clic derecho sobre el archivo.' : 'Upload your video to Google Drive and right-click on the file.'}
                        </p>
                      </div>

                      <div className="bg-white p-3 rounded-xl border border-blue-100 shadow-2xs space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[11px] font-bold flex items-center justify-center">2</span>
                          <span className="text-xs font-bold text-slate-900">{language === 'es' ? 'Habilitar Acceso' : 'Enable Access'}</span>
                        </div>
                        <p className="text-[11px] text-slate-600 leading-normal">
                          {language === 'es' 
                            ? 'Selecciona "Compartir". En Acceso general, cambia a "Cualquier persona con el enlace".'
                            : 'Select "Share". Under General access, change to "Anyone with the link".'}
                        </p>
                      </div>

                      <div className="bg-white p-3 rounded-xl border border-blue-100 shadow-2xs space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[11px] font-bold flex items-center justify-center">3</span>
                          <span className="text-xs font-bold text-slate-900">{language === 'es' ? 'Copiar y Pegar' : 'Copy & Paste'}</span>
                        </div>
                        <p className="text-[11px] text-slate-600 leading-normal">
                          {language === 'es' 
                            ? 'Haz clic en "Copiar enlace", pégalo abajo y presiona "Aplicar video".'
                            : 'Click "Copy link", paste it below, and press "Apply video".'}
                        </p>
                      </div>
                    </div>

                    <div className="text-[11px] text-blue-800 bg-white/80 p-2.5 rounded-lg border border-blue-200 flex items-start gap-2">
                      <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <span>
                        {language === 'es' 
                          ? 'Acepta automáticamente cualquier formato de enlace de Drive (view?usp=sharing, preview o direct ID). El sistema lo transforma automáticamente al reproductor incrustado.'
                          : 'Automatically supports any Drive link format (view?usp=sharing, preview or direct ID). The system automatically embeds it seamlessly.'}
                      </span>
                    </div>
                  </div>

                  {/* Input Form */}
                  <div className="space-y-3">
                    <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-800 block">
                      {language === 'es' ? 'Pega el enlace de tu Video en Google Drive:' : 'Paste your Google Drive Video link:'}
                    </label>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <div className="relative flex-grow">
                        <HardDrive className="w-4 h-4 text-blue-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="url"
                          value={customUrlInput}
                          onChange={e => setCustomUrlInput(e.target.value)}
                          placeholder="https://drive.google.com/file/d/1A2B3C.../view?usp=sharing"
                          className="w-full pl-10 pr-3 py-3 rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 text-xs font-mono text-slate-900 outline-none"
                        />
                      </div>
                      <button
                        onClick={() => handleApplyCustomUrl()}
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shrink-0 flex items-center justify-center gap-2 shadow-sm"
                      >
                        <Check className="w-4 h-4" />
                        <span>{language === 'es' ? 'Aplicar Video Drive' : 'Apply Drive Video'}</span>
                      </button>
                    </div>

                    {/* Format Detector Badge */}
                    {inputIsDrive && (
                      <div className="text-xs font-mono text-blue-800 bg-blue-100/80 px-3 py-2 rounded-xl border border-blue-300 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                        <span>{language === 'es' ? '¡Enlace de Google Drive reconocido! Se convertirá automáticamente a formato incrustable (/preview).' : 'Google Drive link recognized! Will be automatically converted to embed format (/preview).'}</span>
                      </div>
                    )}

                    {inputFeedback && (
                      <p className={`text-xs font-medium flex items-center gap-1.5 mt-1 ${
                        inputFeedback.type === 'success' ? 'text-emerald-700' : 'text-rose-600'
                      }`}>
                        {inputFeedback.type === 'success' ? <Check className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                        <span>{inputFeedback.message}</span>
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 2: YOUTUBE / MP4 */}
              {activeTab === 'youtube' && (
                <div className="space-y-4">
                  <div className="space-y-3">
                    <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700 block">
                      {language === 'es' ? 'Pegar enlace de YouTube, Vimeo o archivo MP4:' : 'Paste YouTube, Vimeo or MP4 file link:'}
                    </label>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <div className="relative flex-grow">
                        <LinkIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="url"
                          value={customUrlInput}
                          onChange={e => setCustomUrlInput(e.target.value)}
                          placeholder="https://www.youtube.com/watch?v=... o https://...video.mp4"
                          className="w-full pl-10 pr-3 py-3 rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 text-xs font-mono text-slate-900 outline-none"
                        />
                      </div>
                      <button
                        onClick={() => handleApplyCustomUrl()}
                        className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shrink-0 flex items-center justify-center gap-2"
                      >
                        <Check className="w-4 h-4" />
                        <span>{language === 'es' ? 'Aplicar' : 'Apply'}</span>
                      </button>
                    </div>

                    {inputIsYouTube && (
                      <div className="text-xs font-mono text-emerald-800 bg-emerald-100/80 px-3 py-2 rounded-xl border border-emerald-300 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{language === 'es' ? '¡Enlace de YouTube detectado! Se cargará en alta definición sin publicidad externa.' : 'YouTube link detected! Will load in HD without external ads.'}</span>
                      </div>
                    )}

                    {inputFeedback && (
                      <p className={`text-xs font-medium flex items-center gap-1.5 mt-1 ${
                        inputFeedback.type === 'success' ? 'text-emerald-700' : 'text-rose-600'
                      }`}>
                        {inputFeedback.type === 'success' ? <Check className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                        <span>{inputFeedback.message}</span>
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 3: PRESETS */}
              {activeTab === 'presets' && (
                <div className="space-y-3">
                  <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700 block">
                    {language === 'es' ? 'Seleccionar video institucional sugerido de San Martín:' : 'Select suggested corporate video from San Martín:'}
                  </label>
                  <div className="space-y-2.5">
                    {PRESENTATION_VIDEO_PRESETS.map(preset => {
                      const isSelected = activeVideoUrl === preset.url;
                      return (
                        <div
                          key={preset.id}
                          onClick={() => handleApplyCustomUrl(preset.url)}
                          className={`p-3.5 rounded-2xl border flex items-center justify-between gap-3 cursor-pointer transition-all ${
                            isSelected 
                              ? 'border-emerald-600 bg-emerald-50/80 shadow-xs' 
                              : 'border-slate-200 hover:border-emerald-400 hover:bg-slate-50'
                          }`}
                        >
                          <div className="min-w-0">
                            <p className="text-xs font-bold text-slate-900 truncate">
                              {preset.title}
                            </p>
                            <p className="text-[11px] text-slate-500 truncate">
                              {preset.subtitle}
                            </p>
                          </div>
                          <div className="shrink-0 flex items-center gap-2">
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-200 text-slate-700 uppercase">
                              {preset.type}
                            </span>
                            {isSelected && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

            </div>

            {/* Modal Footer */}
            <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                onClick={() => {
                  setImage('video-presentacion', DEFAULT_PRESENTATION_VIDEO);
                  setShowConfigModal(false);
                }}
                className="text-xs text-slate-500 hover:text-slate-800 underline cursor-pointer"
              >
                {language === 'es' ? 'Restablecer video por defecto' : 'Reset default video'}
              </button>

              <button
                onClick={() => setShowConfigModal(false)}
                className="w-full sm:w-auto px-6 py-2.5 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                {language === 'es' ? 'Cerrar' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
