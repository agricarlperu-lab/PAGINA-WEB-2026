import React from 'react';
import { useMedia, BackgroundConfig } from '../context/MediaContext';
import { transformImageUrl } from '../utils/mediaStorage';
import { Sliders, Sparkles } from 'lucide-react';

interface EditableBackgroundProps {
  sectionKey: string;
  title: string;
  defaultImage?: string;
  defaultColor?: string;
  defaultOpacity?: number;
  defaultPattern?: 'grid' | 'dots' | 'gradient' | 'none' | 'mesh';
  className?: string;
  children: React.ReactNode;
  buttonPosition?: 'top-right' | 'top-left' | 'bottom-right';
}

export const EditableBackground: React.FC<EditableBackgroundProps> = ({
  sectionKey,
  title,
  defaultImage = '',
  defaultColor = '#090d16',
  defaultOpacity = 0.85,
  defaultPattern = 'grid',
  className = 'relative',
  children,
  buttonPosition = 'top-right',
}) => {
  const { getBackground, isEditMode, openEditor } = useMedia();

  const defaultSetting: BackgroundConfig = {
    image: defaultImage,
    color: defaultColor,
    opacity: defaultOpacity,
    pattern: defaultPattern as BackgroundConfig['pattern'],
  };

  const bg = getBackground(sectionKey, defaultSetting);
  const activeImage = bg.image || defaultImage;
  const activeOpacity = bg.opacity !== undefined ? bg.opacity : defaultOpacity;
  const activeColor = bg.color || defaultColor;
  const activePattern = bg.pattern || defaultPattern;
  const finalBgImage = activeImage ? transformImageUrl(activeImage) : '';

  const handleEditBg = (e: React.MouseEvent) => {
    e.stopPropagation();
    openEditor({
      key: sectionKey,
      title: title || 'Fondo de Sección',
      type: 'background',
      currentSrc: finalBgImage,
      defaultSrc: defaultImage,
      section: 'Fondos de Pantalla',
      currentBg: bg,
    });
  };

  const posClass = buttonPosition === 'top-left' 
    ? 'top-3 left-3' 
    : buttonPosition === 'bottom-right' 
    ? 'bottom-3 right-3' 
    : 'top-3 right-3';

  return (
    <div className={`relative group ${className}`}>
      {/* Background Image Layer if present */}
      {finalBgImage && (
        <div 
          className="absolute inset-0 bg-cover bg-center pointer-events-none z-0 transition-all duration-500"
          style={{ backgroundImage: `url("${finalBgImage}")` }}
        />
      )}

      {/* Color Tint & Pattern Overlay */}
      <div 
        className={`absolute inset-0 pointer-events-none z-0 transition-opacity duration-300 ${
          activePattern === 'grid' ? 'bg-architectural-grid' : ''
        }`}
        style={{
          backgroundColor: activeColor,
          opacity: finalBgImage ? Math.min(activeOpacity, 0.4) : activeOpacity,
        }}
      />

      {/* In-place Edit Button for Background */}
      <button
        onClick={handleEditBg}
        className={`absolute ${posClass} z-30 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-xl backdrop-blur-md transition-all duration-200 flex items-center gap-1.5 cursor-pointer border border-white/20 ${
          isEditMode 
            ? 'opacity-85 hover:opacity-100 scale-100 bg-slate-900/90 text-white hover:bg-emerald-600 hover:scale-105' 
            : 'opacity-0 group-hover:opacity-100 bg-slate-900/80 text-white hover:bg-emerald-600'
        }`}
        title={`Cambiar fondo de ${title}`}
      >
        <Sliders className="w-3 h-3 text-emerald-400" />
        <span>Editar Fondo</span>
      </button>

      {/* Section Content */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
};

export default EditableBackground;
