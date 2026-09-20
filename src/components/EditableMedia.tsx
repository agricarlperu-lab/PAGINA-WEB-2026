import React from 'react';
import { useMedia } from '../context/MediaContext';
import { isVideoUrl, isYouTubeUrl, getYouTubeEmbedUrl } from './AnimatedImageCarousel';
import { transformImageUrl } from '../utils/mediaStorage';
import { useImageLoader, DEFAULT_SVG_PLACEHOLDER } from '../hooks/useImageLoader';
import { Camera, Video, AlertCircle, Loader2, Play } from 'lucide-react';

interface EditableMediaProps {
  mediaKey?: string;
  src: string;
  alt?: string;
  title?: string;
  section?: string;
  className?: string;
  containerClassName?: string;
  mediaType?: 'auto' | 'image' | 'video';
  showEditButton?: boolean;
  lazy?: boolean;
  enableCompression?: boolean;
  maxDimension?: number;
  placeholderSrc?: string;
}

export const EditableMedia: React.FC<EditableMediaProps> = ({
  mediaKey,
  src: defaultSrc,
  alt = '',
  title,
  section,
  className = 'w-full h-full object-cover',
  containerClassName = 'w-full h-full relative group overflow-hidden',
  mediaType = 'auto',
  showEditButton = true,
  lazy = true,
  enableCompression = true,
  maxDimension = 1920,
  placeholderSrc = DEFAULT_SVG_PLACEHOLDER,
}) => {
  const { getImage, getImageFit, isEditMode, openEditor } = useMedia();

  const effectiveKey = mediaKey || (alt ? `custom-${alt.toLowerCase().replace(/[^a-z0-9]/g, '-')}` : undefined);
  const rawSrc = effectiveKey ? getImage(effectiveKey, defaultSrc) : defaultSrc;
  const finalSrc = transformImageUrl(rawSrc);
  const currentFit = effectiveKey ? getImageFit(effectiveKey, 'cover') : 'cover';

  const isYouTube = isYouTubeUrl(finalSrc);
  const isVid = mediaType === 'video' || (mediaType === 'auto' && (isVideoUrl(finalSrc) || isYouTube));

  // Dynamic class adaptation according to selected fit mode
  let finalClassName = className;
  if (currentFit === 'contain') {
    finalClassName = className.replace('object-cover', 'object-contain');
    if (!finalClassName.includes('object-contain')) {
      finalClassName += ' object-contain';
    }
  } else if (currentFit === 'cover') {
    finalClassName = className.replace('object-contain', 'object-cover');
  }

  // Hook managing image states, fallbacks, native lazy loading, and resolution compression
  const {
    currentSrc,
    isLoading,
    isLoaded,
    hasError,
    imgProps,
    resolutionText,
  } = useImageLoader({
    src: finalSrc,
    fallbackSrc: defaultSrc,
    placeholderSrc,
    lazy,
    enableCompression,
    maxDimension,
  });

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    openEditor({
      key: effectiveKey || `custom-${alt || 'media'}`,
      title: title || alt || 'Foto / Video',
      type: isVid ? 'video' : 'image',
      currentSrc: finalSrc,
      defaultSrc: defaultSrc,
      section: section || 'Página Web',
      currentFit: currentFit,
    });
  };

  const isContainMode = currentFit === 'contain';

  return (
    <div className={`${containerClassName} ${isContainMode ? 'bg-slate-950/90 flex items-center justify-center' : ''}`}>
      {/* Loading Skeleton / Placeholder state */}
      {isLoading && !isVid && !isYouTube && (
        <div className="absolute inset-0 z-10 bg-slate-900/60 backdrop-blur-[2px] flex flex-col items-center justify-center text-slate-400 gap-2 transition-opacity duration-300">
          <div className="w-8 h-8 rounded-full border-2 border-emerald-500/30 border-t-emerald-400 animate-spin flex items-center justify-center">
            <Loader2 className="w-4 h-4 text-emerald-400 animate-pulse" />
          </div>
          <span className="text-[10px] font-medium tracking-wide text-slate-300">Cargando resolución óptima...</span>
        </div>
      )}

      {isYouTube ? (
        <iframe
          src={getYouTubeEmbedUrl(finalSrc)}
          title={alt || 'Video'}
          className={`${finalClassName} border-0 pointer-events-auto`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : isVid ? (
        <video
          src={finalSrc || defaultSrc}
          autoPlay
          loop
          muted
          playsInline
          className={finalClassName}
        />
      ) : (
        <img
          {...imgProps}
          alt={alt}
          className={`${finalClassName} transition-all duration-500 ${
            isLoaded ? 'opacity-100 scale-100' : isLoading ? 'opacity-40 scale-102 filter blur-[1px]' : 'opacity-100'
          }`}
          style={{ imageOrientation: 'from-image' }}
          referrerPolicy="no-referrer"
        />
      )}

      {/* Resolution & optimization badge in Edit Mode */}
      {isEditMode && resolutionText && isLoaded && !isVid && !isYouTube && (
        <div className="absolute bottom-2 left-2 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity bg-slate-950/80 text-emerald-400 text-[9px] font-mono px-2 py-0.5 rounded shadow backdrop-blur-xs border border-emerald-500/30">
          {resolutionText}
        </div>
      )}

      {/* Warning badge if custom image failed to load, visible in edit mode */}
      {hasError && isEditMode && !isVid && !isYouTube && (
        <div className="absolute top-2.5 left-2.5 z-20 bg-amber-500/95 text-white text-[9px] font-mono px-2.5 py-1 rounded-md shadow-md flex items-center gap-1.5 backdrop-blur-xs">
          <AlertCircle className="w-3 h-3 shrink-0" />
          <span>Imagen no disponible, usando respaldo</span>
        </div>
      )}

      {/* Floating in-place Edit Button - visible on hover or edit mode */}
      {showEditButton && (
        <button
          onClick={handleEditClick}
          className={`absolute top-2.5 right-2.5 z-20 px-2.5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-lg backdrop-blur-md transition-all duration-200 flex items-center gap-1.5 cursor-pointer border border-white/20 ${
            isEditMode 
              ? 'opacity-100 scale-100 bg-emerald-700 text-white hover:bg-emerald-600 hover:scale-105' 
              : 'opacity-85 sm:opacity-0 group-hover:opacity-100 bg-slate-900/90 text-white hover:bg-emerald-600 hover:scale-105'
          }`}
          title="Cambiar foto o subir video aquí"
        >
          {isVid || isYouTube ? (
            <Video className="w-3 h-3 text-emerald-400" />
          ) : (
            <Camera className="w-3 h-3 text-emerald-400" />
          )}
          <span className="inline">{isVid || isYouTube ? 'Cambiar Video' : 'Subir Video / Foto'}</span>
        </button>
      )}
    </div>
  );
};

export default EditableMedia;
