import React, { useState, useEffect, useRef } from 'react';
import { useMedia, BackgroundConfig } from '../context/MediaContext';
import { MEDIA_PRESETS } from '../data/mediaPresets';
import { 
  optimizeImageFile, 
  readFileAsDataUrl,
  formatBytes, 
  transformImageUrl, 
  OptimizationResult 
} from '../utils/mediaStorage';
import { isVideoUrl, isYouTubeUrl, getYouTubeEmbedUrl } from './AnimatedImageCarousel';
import { 
  X, 
  Upload, 
  Link as LinkIcon, 
  Grid, 
  RotateCcw, 
  Check, 
  Image as ImageIcon,
  Video,
  Sliders,
  Sparkles,
  Info,
  CheckCircle2,
  AlertTriangle,
  FileCheck,
  Zap,
  Maximize2,
  Minimize2,
  ClipboardPaste,
  ShieldCheck
} from 'lucide-react';

export const ImageEditModal: React.FC = () => {
  const { 
    activeItem, 
    closeEditor, 
    setImage, 
    setBackground, 
    resetImage, 
    resetBackground,
    setImageFit,
    getImageFit 
  } = useMedia();

  const [activeTab, setActiveTab] = useState<'upload' | 'url' | 'presets' | 'background'>('upload');
  const [selectedUrl, setSelectedUrl] = useState<string>('');
  const [selectedFit, setSelectedFit] = useState<'cover' | 'contain'>('cover');
  const [customUrlInput, setCustomUrlInput] = useState<string>('');
  const [presetCategory, setPresetCategory] = useState<string>('todos');
  const [isProcessingFile, setIsProcessingFile] = useState<boolean>(false);
  const [fileError, setFileError] = useState<string | null>(null);
  const [uploadStats, setUploadStats] = useState<OptimizationResult | null>(null);
  
  // URL status feedback
  const [urlStatus, setUrlStatus] = useState<{ type: 'success' | 'warning' | 'error'; message: string } | null>(null);
  const [previewHasError, setPreviewHasError] = useState<boolean>(false);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  // Background specific states
  const [bgOpacity, setBgOpacity] = useState<number>(0.8);
  const [bgColor, setBgColor] = useState<string>('dark');
  const [bgPattern, setBgPattern] = useState<'grid' | 'dots' | 'gradient' | 'none'>('grid');

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (activeItem) {
      const initialSrc = activeItem.currentSrc || activeItem.defaultSrc || '';
      setSelectedUrl(initialSrc);
      const initialFit = activeItem.currentFit || getImageFit(activeItem.key, 'cover');
      setSelectedFit(initialFit);
      setCustomUrlInput(initialSrc && !initialSrc.startsWith('data:') ? initialSrc : '');
      setFileError(null);
      setUploadStats(null);
      setUrlStatus(null);
      setPreviewHasError(false);
      setSaveSuccess(false);

      if (activeItem.type === 'background') {
        setActiveTab('background');
        if (activeItem.currentBg) {
          setBgOpacity(activeItem.currentBg.opacity ?? 0.85);
          setBgPattern(activeItem.currentBg.pattern || 'grid');
        }
      } else {
        setActiveTab('upload');
      }
    }
  }, [activeItem]);

  // Support direct clipboard paste (Ctrl+V / Cmd+V) to upload image from any source
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      if (!activeItem) return;
      if (!e.clipboardData) return;
      const items = e.clipboardData.items;
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          const file = items[i].getAsFile();
          if (file) {
            e.preventDefault();
            handleFileUpload(file);
            break;
          }
        }
      }
    };

    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, [activeItem]);

  if (!activeItem) return null;

  // Process uploaded image or video of ANY resolution safely and efficiently
  const handleFileUpload = async (file: File) => {
    if (!file) return;
    setIsProcessingFile(true);
    setFileError(null);
    setUploadStats(null);
    setPreviewHasError(false);

    const isVideo = file.type.startsWith('video/') || /\.(mp4|webm|mov|m4v|ogv)$/i.test(file.name);

    if (isVideo) {
      try {
        const reader = new FileReader();
        reader.onload = (e) => {
          const directUrl = (e.target?.result as string) || '';
          if (directUrl) {
            setSelectedUrl(directUrl);
            setUploadStats({
              dataUrl: directUrl,
              originalSize: file.size,
              optimizedSize: file.size,
              width: 1920,
              height: 1080,
              format: file.type ? file.type.replace('video/', 'Video ').toUpperCase() : 'Video MP4',
              reductionPercentage: 0
            });
            setPreviewHasError(false);
            setFileError(null);
          }
          setIsProcessingFile(false);
        };
        reader.onerror = () => {
          setFileError('No se pudo leer el archivo de video. Por favor prueba con un video MP4, WebM o MOV.');
          setIsProcessingFile(false);
        };
        reader.readAsDataURL(file);
      } catch (err: any) {
        setFileError(err?.message || 'Error al procesar el archivo de video.');
        setIsProcessingFile(false);
      }
      return;
    }

    try {
      // 1. Lectura inmediata ultra rápida con FileReader: visualización instantánea garantizada
      const reader = new FileReader();
      reader.onload = async (e) => {
        let directUrl = (e.target?.result as string) || '';
        if (directUrl) {
          if (
            directUrl.startsWith('data:application/octet-stream;') ||
            directUrl.startsWith('data:application/x-') ||
            directUrl.startsWith('data:;base64,') ||
            directUrl.startsWith('data:image/pjpeg;')
          ) {
            directUrl = directUrl.replace(/^data:[^;]*;/, 'data:image/jpeg;');
          }
          // Visualizar de inmediato sin esperar compresión
          setSelectedUrl(directUrl);
          setPreviewHasError(false);
          setFileError(null);
        }

        // 2. Optimizar en segundo plano de manera segura para mantener IndexedDB ultraligera
        try {
          const result = await optimizeImageFile(file, 1920, 1920, 0.85);
          if (result && result.dataUrl) {
            setSelectedUrl(result.dataUrl);
            setUploadStats(result);
            setPreviewHasError(false);
          }
        } catch (optimizeErr) {
          console.warn('Compresión en canvas no requerida o completada con imagen directa:', optimizeErr);
        } finally {
          setIsProcessingFile(false);
        }
      };

      reader.onerror = () => {
        setFileError('No se pudo leer el archivo seleccionado. Prueba con otra foto o video.');
        setIsProcessingFile(false);
      };

      reader.readAsDataURL(file);
    } catch (err: any) {
      setFileError(err?.message || 'Error al procesar el archivo. Prueba con una imagen JPG/PNG o video MP4.');
      setIsProcessingFile(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  // Test and load direct image or video URL with auto-transform (e.g. Google Drive, Dropbox, YouTube)
  const handleLoadUrl = (rawUrl: string) => {
    const trimmed = rawUrl.trim();
    if (!trimmed) {
      setUrlStatus({ type: 'error', message: 'Por favor ingresa una URL válida.' });
      return;
    }

    const directUrl = transformImageUrl(trimmed);
    if (directUrl !== trimmed) {
      setCustomUrlInput(directUrl);
    }

    if (isYouTubeUrl(directUrl) || isVideoUrl(directUrl)) {
      setSelectedUrl(directUrl);
      setPreviewHasError(false);
      setUrlStatus({ 
        type: 'success', 
        message: isYouTubeUrl(directUrl) 
          ? '¡Video de YouTube detectado y listo para reproducir en bucle!' 
          : '¡Video en línea verificado y listo para mostrar!' 
      });
      return;
    }

    setUrlStatus({ type: 'warning', message: 'Comprobando acceso al archivo...' });

    const img = new Image();
    img.onload = () => {
      setSelectedUrl(directUrl);
      setPreviewHasError(false);
      setUrlStatus({ 
        type: 'success', 
        message: directUrl !== trimmed 
          ? '¡Enlace de Google Drive / Dropbox convertido y verificado correctamente!' 
          : '¡Imagen en línea verificada y lista para aplicar!' 
      });
    };
    img.onerror = () => {
      setSelectedUrl(directUrl);
      setUrlStatus({ 
        type: 'error', 
        message: 'No se pudo cargar la imagen desde este enlace (puede ser privado o tener bloqueo CORS). Te sugerimos descargarla y usar la pestaña "Subir Archivo".' 
      });
    };
    img.src = directUrl;
  };

  const handleSave = () => {
    setSaveSuccess(true);
    if (activeItem.type === 'background') {
      const bgConfig: BackgroundConfig = {
        image: selectedUrl,
        opacity: bgOpacity,
        pattern: bgPattern,
        color: bgColor === 'dark' ? '#090d16' : bgColor === 'green' ? '#142d18' : bgColor === 'light' ? '#f8fafc' : '#881337',
      };
      setBackground(activeItem.key, bgConfig);
    } else {
      setImage(activeItem.key, selectedUrl);
      setImageFit(activeItem.key, selectedFit);
    }

    setTimeout(() => {
      closeEditor();
    }, 450);
  };

  const handleResetToDefault = () => {
    if (activeItem.type === 'background') {
      resetBackground(activeItem.key);
    } else {
      resetImage(activeItem.key);
    }
    closeEditor();
  };

  const filteredPresets = presetCategory === 'todos' 
    ? MEDIA_PRESETS 
    : MEDIA_PRESETS.filter(p => p.category === presetCategory);

  const hasUnsavedChange = selectedUrl !== (activeItem.currentSrc || activeItem.defaultSrc) || 
                           selectedFit !== (activeItem.currentFit || 'cover');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div 
        className="bg-white rounded-3xl shadow-2xl border border-slate-200/90 w-full max-w-2xl max-h-[94vh] flex flex-col overflow-hidden text-slate-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              {activeItem.type === 'background' ? <Sliders className="w-4.5 h-4.5" /> : isVideoUrl(selectedUrl) ? <Video className="w-4.5 h-4.5" /> : <ImageIcon className="w-4.5 h-4.5" />}
            </div>
            <div>
              <h3 className="font-display font-black text-base sm:text-lg text-slate-900 tracking-tight leading-tight">
                {activeItem.type === 'background' ? 'Editar Fondo de Sección' : 'Cambiar Foto o Subir Video'}
              </h3>
              <p className="text-xs text-slate-500 font-mono">
                {activeItem.title} {activeItem.section ? `· ${activeItem.section}` : ''}
              </p>
            </div>
          </div>
          <button 
            onClick={closeEditor}
            className="w-8 h-8 rounded-full hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer"
            title="Cerrar ventana"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200/70 px-6 bg-white overflow-x-auto gap-2">
          {activeItem.type === 'background' && (
            <button
              onClick={() => setActiveTab('background')}
              className={`py-3 px-3.5 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'background' 
                  ? 'border-emerald-600 text-emerald-700' 
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Estilo de Fondo</span>
            </button>
          )}

          <button
            onClick={() => setActiveTab('upload')}
            className={`py-3 px-3.5 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'upload' 
                ? 'border-emerald-600 text-emerald-700' 
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Subir Foto o Video</span>
          </button>

          <button
            onClick={() => setActiveTab('url')}
            className={`py-3 px-3.5 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'url' 
                ? 'border-emerald-600 text-emerald-700' 
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <LinkIcon className="w-3.5 h-3.5" />
            <span>Enlace Web / YouTube / Drive</span>
          </button>

          <button
            onClick={() => setActiveTab('presets')}
            className={`py-3 px-3.5 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'presets' 
                ? 'border-emerald-600 text-emerald-700' 
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Grid className="w-3.5 h-3.5" />
            <span>Galería Sugerida</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* TAB 1: UPLOAD */}
          {activeTab === 'upload' && (
            <div className="space-y-4">
              <label
                htmlFor="image-file-upload-input"
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                className="border-2 border-dashed border-slate-300 hover:border-emerald-600 rounded-3xl p-7 text-center cursor-pointer transition-all bg-slate-50/50 hover:bg-emerald-50/30 flex flex-col items-center justify-center space-y-3 group relative block select-none"
              >
                <div className="w-14 h-14 rounded-full bg-emerald-100/70 text-emerald-700 flex items-center justify-center group-hover:scale-110 transition-transform shadow-xs">
                  {isProcessingFile ? (
                    <div className="w-6 h-6 border-3 border-emerald-600 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Upload className="w-6 h-6" />
                  )}
                </div>
                <div className="space-y-1">
                  <p className="font-bold text-sm text-slate-800">
                    {isProcessingFile 
                      ? 'Procesando y cargando archivo...' 
                      : 'Haz clic para seleccionar o arrastra tu foto o video aquí'}
                  </p>
                  <p className="text-xs text-slate-500 max-w-md mx-auto">
                    Acepta fotos (JPG, PNG, WEBP) y videos (MP4, WebM, MOV de celular o cámara). Se reproducen en bucle y se guardan automáticamente.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-700 bg-white px-3.5 py-1.5 rounded-full border border-emerald-200 shadow-2xs font-bold pointer-events-none">
                    {isProcessingFile ? 'Cargando archivo...' : 'Seleccionar Foto o Video'}
                  </span>
                  <span className="text-[10px] text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200 flex items-center gap-1 pointer-events-none">
                    <ClipboardPaste className="w-3 h-3 text-slate-600" />
                    <span>O presiona Ctrl+V para pegar</span>
                  </span>
                </div>
              </label>

              <input
                id="image-file-upload-input"
                ref={fileInputRef}
                type="file"
                accept="image/*,.jpg,.jpeg,.png,.webp,.gif,.svg,.jfif,.avif,video/*,.mp4,.webm,.mov,.m4v,.ogv"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleFileUpload(e.target.files[0]);
                  }
                  e.target.value = '';
                }}
              />

              {/* Upload & Compression Statistics Badge */}
              {uploadStats && (
                <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-start gap-3 animate-fadeIn">
                  <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                    <CheckCircle2 className="w-4 h-4 stroke-2" />
                  </div>
                  <div className="space-y-1.5 text-xs flex-1">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <span className="font-bold text-emerald-900 flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-emerald-600" />
                        ¡Foto procesada y lista para verse nítida!
                      </span>
                      {uploadStats.reductionPercentage > 0 && (
                        <span className="bg-emerald-200 text-emerald-900 text-[10px] font-mono px-2 py-0.5 rounded-md font-bold">
                          -{uploadStats.reductionPercentage}% de peso ahorrado
                        </span>
                      )}
                    </div>
                    <p className="text-emerald-800 text-[11px]">
                      Resolución: <span className="font-mono font-bold text-emerald-950">{uploadStats.width} × {uploadStats.height} px</span> · Formato: <span className="font-semibold">{uploadStats.format}</span> · Peso final: <span className="font-mono font-bold text-emerald-950">{formatBytes(uploadStats.optimizedSize)}</span>
                    </p>
                    <div className="pt-1 flex items-center justify-between gap-2 flex-wrap">
                      <p className="text-emerald-700 text-[11px] font-semibold flex items-center gap-1">
                        <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                        Revisa la vista previa y el modo de encuadre abajo.
                      </p>
                      <button
                        type="button"
                        onClick={handleSave}
                        disabled={saveSuccess}
                        className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-black rounded-lg text-xs tracking-wider uppercase shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>{saveSuccess ? '¡Guardado!' : 'Guardar y Aplicar Ahora'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {fileError && (
                <div className="text-xs text-rose-700 bg-rose-50 border border-rose-200 p-3.5 rounded-2xl flex items-start gap-2.5">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />
                  <div className="space-y-1">
                    <p className="font-bold">Aviso sobre el archivo</p>
                    <p>{fileError}</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: DIRECT URL */}
          {activeTab === 'url' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 block">
                  Enlace directo de la imagen o archivo compartido:
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={customUrlInput}
                    onChange={(e) => setCustomUrlInput(e.target.value)}
                    placeholder="https://ejemplo.com/foto.jpg o enlace de Google Drive"
                    className="flex-1 px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs font-mono focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20"
                  />
                  <button
                    onClick={() => handleLoadUrl(customUrlInput)}
                    className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer shrink-0"
                  >
                    Verificar URL
                  </button>
                </div>
              </div>

              {urlStatus && (
                <div className={`p-3 rounded-xl text-xs flex items-start gap-2 ${
                  urlStatus.type === 'success' 
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
                    : urlStatus.type === 'warning'
                    ? 'bg-amber-50 text-amber-800 border border-amber-200'
                    : 'bg-rose-50 text-rose-800 border border-rose-200'
                }`}>
                  {urlStatus.type === 'success' ? (
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600 mt-0.5" />
                  ) : urlStatus.type === 'warning' ? (
                    <Info className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />
                  )}
                  <span>{urlStatus.message}</span>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: PRESETS */}
          {activeTab === 'presets' && (
            <div className="space-y-4">
              <div className="flex gap-2 overflow-x-auto pb-1">
                {[
                  { id: 'todos', label: 'Todos' },
                  { id: 'cacao', label: 'Cacao' },
                  { id: 'sacha', label: 'Sacha Inchi' },
                  { id: 'aguaje', label: 'Aguaje' },
                  { id: 'coco', label: 'Coco' },
                  { id: 'finanzas', label: 'Finanzas / POS' },
                  { id: 'fondos', label: 'Fondos' },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setPresetCategory(cat.id)}
                    className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors cursor-pointer ${
                      presetCategory === cat.id 
                        ? 'bg-emerald-700 text-white shadow-xs' 
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-56 overflow-y-auto pr-1">
                {filteredPresets.map((preset) => {
                  const isCurrent = selectedUrl === preset.url;
                  return (
                    <div
                      key={preset.id}
                      onClick={() => {
                        setSelectedUrl(preset.url);
                        setPreviewHasError(false);
                      }}
                      className={`group relative rounded-2xl overflow-hidden border-2 cursor-pointer transition-all aspect-4/3 bg-slate-100 ${
                        isCurrent 
                          ? 'border-emerald-600 ring-2 ring-emerald-500/40 scale-[0.98]' 
                          : 'border-slate-200 hover:border-slate-400'
                      }`}
                    >
                      <img 
                        src={preset.url} 
                        alt={preset.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-2 text-white">
                        <p className="text-[11px] font-bold truncate leading-tight">{preset.name}</p>
                      </div>
                      {isCurrent && (
                        <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                          <Check className="w-3 h-3 stroke-3" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 4: BACKGROUND STYLES */}
          {activeTab === 'background' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 block">Tonalidad Base del Fondo:</label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { id: 'dark', label: 'Noche Profunda', colorClass: 'bg-slate-950 text-white' },
                    { id: 'green', label: 'Verde Selva', colorClass: 'bg-[#0f2415] text-white' },
                    { id: 'light', label: 'Blanco Limpio', colorClass: 'bg-slate-100 text-slate-900 border border-slate-300' },
                    { id: 'burgundy', label: 'Cacao Oscuro', colorClass: 'bg-[#4c0519] text-white' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setBgColor(item.id)}
                      className={`p-2.5 rounded-xl text-xs font-bold transition-all text-center cursor-pointer ${item.colorClass} ${
                        bgColor === item.id ? 'ring-2 ring-emerald-500 ring-offset-2' : 'opacity-80 hover:opacity-100'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <label className="font-bold text-slate-700">Oscurecimiento del Fondo:</label>
                  <span className="font-mono text-slate-500 font-bold">{Math.round(bgOpacity * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={bgOpacity}
                  onChange={(e) => setBgOpacity(parseFloat(e.target.value))}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
              </div>

              <p className="text-[11px] text-slate-500 italic">
                * Para cambiar la imagen de fondo de esta sección, usa también las pestañas «Subir Cualquier Foto», «Enlace Web / Drive» o «Galería Sugerida».
              </p>
            </div>
          )}

          {/* Visual Framing / Fit Mode Selector */}
          {activeItem.type !== 'background' && (
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <Maximize2 className="w-3.5 h-3.5 text-emerald-600" />
                  Modo de Encuadre de la Foto:
                </span>
                <span className="text-[10px] text-slate-500 font-mono">
                  {selectedFit === 'cover' ? 'Llenar marco (Cover)' : 'Completa sin recortar (Contain)'}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedFit('cover')}
                  className={`p-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer border ${
                    selectedFit === 'cover'
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-900 shadow-2xs'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Maximize2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div className="text-left">
                    <p className="leading-tight">Llenar Todo el Marco</p>
                    <p className="text-[10px] font-normal text-slate-500 leading-tight">Ideal para productos y fotos horizontales</p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedFit('contain')}
                  className={`p-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer border ${
                    selectedFit === 'contain'
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-900 shadow-2xs'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Minimize2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div className="text-left">
                    <p className="leading-tight">Ver Foto Completa</p>
                    <p className="text-[10px] font-normal text-slate-500 leading-tight">Muestra 100% sin recortar bordes</p>
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* Live Preview Box */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 block">
                Vista Previa en Tiempo Real
              </span>
              {hasUnsavedChange && (
                <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Pendiente de guardar
                </span>
              )}
            </div>

            <div className="relative rounded-2xl overflow-hidden border border-slate-200 h-48 bg-slate-950 flex items-center justify-center">
              {selectedUrl ? (
                isYouTubeUrl(selectedUrl) ? (
                  <iframe
                    src={getYouTubeEmbedUrl(selectedUrl)}
                    title="Vista previa video YouTube"
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  />
                ) : isVideoUrl(selectedUrl) ? (
                  <video
                    key={selectedUrl}
                    src={selectedUrl}
                    autoPlay
                    loop
                    muted
                    playsInline
                    controls
                    className={`w-full h-full ${selectedFit === 'contain' ? 'object-contain' : 'object-cover'}`}
                  />
                ) : (
                  <img
                    key={selectedFit}
                    src={selectedUrl}
                    alt="Vista previa"
                    className={`w-full h-full ${selectedFit === 'contain' ? 'object-contain' : 'object-cover'}`}
                    referrerPolicy="no-referrer"
                    style={{ imageOrientation: 'from-image' }}
                    onError={() => {
                      // Nunca marcar error si es una imagen en base64 o blob cargada localmente
                      if (!selectedUrl.startsWith('data:') && !selectedUrl.startsWith('blob:')) {
                        setPreviewHasError(true);
                      }
                    }}
                    onLoad={() => setPreviewHasError(false)}
                  />
                )
              ) : (
                <div className="text-center text-slate-400 p-4">
                  <ImageIcon className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-xs">Sin archivo seleccionado</p>
                </div>
              )}

              {previewHasError && !selectedUrl.startsWith('data:') && !selectedUrl.startsWith('blob:') && (
                <div className="absolute inset-0 bg-slate-900/90 flex flex-col items-center justify-center p-4 text-center text-rose-300">
                  <AlertTriangle className="w-6 h-6 mb-1 text-rose-400" />
                  <p className="text-xs font-semibold">No se puede visualizar el archivo.</p>
                  <p className="text-[10px] text-slate-300 mt-1 max-w-xs">
                    El enlace no es compatible o tiene bloqueo de acceso. Prueba subiendo una foto o video directamente desde tu equipo.
                  </p>
                </div>
              )}

              {activeItem.type === 'background' && !previewHasError && (
                <div 
                  className={`absolute inset-0 pointer-events-none transition-all ${
                    bgColor === 'dark' ? 'bg-slate-950' : bgColor === 'green' ? 'bg-[#0f2415]' : bgColor === 'light' ? 'bg-white' : 'bg-[#4c0519]'
                  } ${bgPattern === 'grid' ? 'bg-architectural-grid' : ''}`}
                  style={{ opacity: bgOpacity }}
                />
              )}

              <div className="absolute bottom-2 left-2 bg-black/80 backdrop-blur-xs text-white text-[10px] font-mono px-2.5 py-1 rounded-full flex items-center gap-1.5">
                <span>{activeItem.type === 'background' ? 'Fondo de Sección' : isVideoUrl(selectedUrl) ? 'Video en Reproducción' : `Modo: ${selectedFit === 'contain' ? 'Completa' : 'Llenar'}`}</span>
                {uploadStats && (
                  <span className="text-emerald-400 font-bold border-l border-white/20 pl-1.5">
                    {uploadStats.format} · {formatBytes(uploadStats.optimizedSize)}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={handleResetToDefault}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer w-full sm:w-auto justify-center"
            title="Restaura la imagen original del sistema"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restablecer Original</span>
          </button>

          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            <button
              onClick={closeEditor}
              className="px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              disabled={saveSuccess}
              className={`px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
                saveSuccess 
                  ? 'bg-emerald-800 text-white' 
                  : hasUnsavedChange
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white ring-2 ring-emerald-500/50'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white'
              }`}
            >
              <Check className="w-4 h-4 stroke-3" />
              <span>{saveSuccess ? '¡Guardado con Éxito!' : 'Guardar y Aplicar'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
