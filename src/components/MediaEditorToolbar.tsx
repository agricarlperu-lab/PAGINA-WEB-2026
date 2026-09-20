import React from 'react';
import { useMedia } from '../context/MediaContext';
import { Sliders, Eye, EyeOff, Sparkles, Image as ImageIcon } from 'lucide-react';

export const MediaEditorToolbar: React.FC = () => {
  const { openDrawer, isEditMode, toggleEditMode, images, backgrounds } = useMedia();

  const totalCustomized = Object.keys(images).length + Object.keys(backgrounds).length;

  return (
    <div className="fixed bottom-20 left-5 z-40 print:hidden flex items-center gap-2">
      {/* Primary Toolbar Pill */}
      <div className="bg-slate-950/90 text-white backdrop-blur-md border border-slate-800 rounded-full p-1.5 shadow-2xl flex items-center gap-1.5">
        <button
          onClick={openDrawer}
          className="bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-black px-3.5 py-1.5 rounded-full text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md transition-all hover:scale-105 cursor-pointer"
          title="Abrir panel central de edición de imágenes y fondos"
        >
          <Sliders className="w-3.5 h-3.5 stroke-3" />
          <span className="hidden sm:inline">Editar Fotos, Videos y Fondos</span>
          <span className="sm:hidden">Fotos / Videos</span>
          {totalCustomized > 0 && (
            <span className="bg-slate-950 text-emerald-400 text-[10px] font-mono px-1.5 py-0.2 rounded-full">
              {totalCustomized}
            </span>
          )}
        </button>

        {/* Quick Eye Toggle for in-place edit buttons */}
        <button
          onClick={toggleEditMode}
          className={`p-1.5 rounded-full text-xs transition-colors cursor-pointer ${
            isEditMode 
              ? 'text-emerald-400 hover:bg-slate-800' 
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
          title={isEditMode ? 'Ocultar botones flotantes de edición' : 'Mostrar botones flotantes de edición'}
        >
          {isEditMode ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
};
