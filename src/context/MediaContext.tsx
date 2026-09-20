import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  loadStoredMedia, 
  saveAllImagesToStorage, 
  saveAllBackgroundsToStorage, 
  saveAllFitsToStorage,
  clearAllMediaStorage 
} from '../utils/mediaStorage';

export interface BackgroundConfig {
  image?: string;
  color?: string;
  opacity?: number; // 0 to 1
  pattern?: 'grid' | 'dots' | 'none' | 'gradient' | 'mesh';
  gradientFrom?: string;
  gradientTo?: string;
}

export interface EditableTarget {
  key: string;
  title: string;
  type: 'image' | 'background';
  currentSrc: string;
  defaultSrc: string;
  section?: string;
  currentBg?: BackgroundConfig;
  currentFit?: 'cover' | 'contain';
}

interface MediaContextType {
  // Image overrides
  images: Record<string, string>;
  getImage: (key: string, defaultSrc: string) => string;
  setImage: (key: string, newSrc: string) => void;
  resetImage: (key: string) => void;

  // Visual Image Fit mode (cover = fill container, contain = show complete without crop)
  imageFits: Record<string, 'cover' | 'contain'>;
  getImageFit: (key: string, defaultFit?: 'cover' | 'contain') => 'cover' | 'contain';
  setImageFit: (key: string, fit: 'cover' | 'contain') => void;

  // Background overrides
  backgrounds: Record<string, BackgroundConfig>;
  getBackground: (sectionKey: string, defaultSetting?: BackgroundConfig) => BackgroundConfig;
  setBackground: (sectionKey: string, setting: BackgroundConfig) => void;
  resetBackground: (sectionKey: string) => void;

  // Global reset
  resetAllMedia: () => void;

  // Visual Edit Mode toggle
  isEditMode: boolean;
  toggleEditMode: () => void;
  setEditMode: (val: boolean) => void;

  // Editor Modal State
  activeItem: EditableTarget | null;
  openEditor: (target: EditableTarget) => void;
  closeEditor: () => void;

  // Central Drawer State
  isDrawerOpen: boolean;
  setIsDrawerOpen: (val: boolean) => void;
  openDrawer: () => void;
  closeDrawer: () => void;

  // Project Disk Persistence & Backups for GitHub / ZIP Download
  saveToProjectDisk: () => Promise<{ success: boolean; message: string; count: number }>;
  exportMediaBackup: () => void;
  importMediaBackup: (jsonContent: string) => Promise<boolean>;
  isSavingToDisk: boolean;
  diskSaveStatus: string | null;
}

const MediaContext = createContext<MediaContextType | null>(null);

const STORAGE_KEY_IMAGES = 'agricarl_media_overrides_v1';
const STORAGE_KEY_BGS = 'agricarl_bg_overrides_v1';
const STORAGE_KEY_FITS = 'agricarl_fits_overrides_v1';
const STORAGE_KEY_EDIT_MODE = 'agricarl_edit_mode_active';

export const MediaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load saved image overrides from localStorage initially for instantaneous first render
  const [images, setImagesState] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_IMAGES);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Load saved background overrides
  const [backgrounds, setBackgroundsState] = useState<Record<string, BackgroundConfig>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_BGS);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Load saved image display fits (cover vs contain)
  const [imageFits, setImageFitsState] = useState<Record<string, 'cover' | 'contain'>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_FITS);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [isSavingToDisk, setIsSavingToDisk] = useState<boolean>(false);
  const [diskSaveStatus, setDiskSaveStatus] = useState<string | null>(null);

  // Hydrate asynchronously from server disk and high-capacity IndexedDB on startup
  useEffect(() => {
    let isMounted = true;

    // 1. Try to fetch from server or public/saved-media.json
    fetch('/api/media')
      .then(res => res.json())
      .then(serverData => {
        if (!isMounted) return;
        if (serverData && serverData.images && Object.keys(serverData.images).length > 0) {
          setImagesState((prev) => ({ ...serverData.images, ...prev }));
        }
        if (serverData && serverData.backgrounds && Object.keys(serverData.backgrounds).length > 0) {
          setBackgroundsState((prev) => ({ ...serverData.backgrounds, ...prev }));
        }
        if (serverData && serverData.fits && Object.keys(serverData.fits).length > 0) {
          setImageFitsState((prev) => ({ ...serverData.fits, ...prev }));
        }
      })
      .catch((err) => {
        console.warn('Could not load media from server:', err);
      });

    // 2. Hydrate from IndexedDB
    loadStoredMedia().then((data) => {
      if (!isMounted) return;
      if (data.images && Object.keys(data.images).length > 0) {
        setImagesState((prev) => ({ ...prev, ...data.images }));
      }
      if (data.backgrounds && Object.keys(data.backgrounds).length > 0) {
        setBackgroundsState((prev) => ({ ...prev, ...data.backgrounds }));
      }
      if (data.fits && Object.keys(data.fits).length > 0) {
        setImageFitsState((prev) => ({ ...prev, ...data.fits }));
      }
    }).catch((err) => {
      console.warn('Error loading media from IndexedDB:', err);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  // Sync to IndexedDB (no 5MB limit!) and safe localStorage backup
  useEffect(() => {
    saveAllImagesToStorage(images).catch((err) => {
      console.warn('Could not persist images to storage:', err);
    });
  }, [images]);

  useEffect(() => {
    saveAllBackgroundsToStorage(backgrounds).catch((err) => {
      console.warn('Could not persist backgrounds to storage:', err);
    });
  }, [backgrounds]);

  useEffect(() => {
    saveAllFitsToStorage(imageFits).catch((err) => {
      console.warn('Could not persist image fits to storage:', err);
    });
  }, [imageFits]);

  // Auto-sync base64 images to project files on server (debounced)
  useEffect(() => {
    const hasBase64 = Object.values(images).some(src => typeof src === 'string' && src.startsWith('data:image/')) ||
      Object.values(backgrounds).some((bg: any) => bg && typeof bg.image === 'string' && bg.image.startsWith('data:image/'));

    if (!hasBase64) return;

    const timer = setTimeout(() => {
      fetch('/api/media/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ images, backgrounds, fits: imageFits })
      })
        .then(res => res.json())
        .then(data => {
          if (data.success && data.images) {
            setImagesState(data.images);
            if (data.backgrounds) setBackgroundsState(data.backgrounds);
            setDiskSaveStatus('¡Fotos sincronizadas como archivos en el proyecto!');
          }
        })
        .catch((err) => {
          console.warn('Auto-sync to disk warning:', err);
        });
    }, 1500);

    return () => clearTimeout(timer);
  }, [images, backgrounds, imageFits]);

  // Edit mode active state (defaults to true so the user immediately sees the edit buttons)
  const [isEditMode, setIsEditMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_EDIT_MODE);
      return saved !== null ? JSON.parse(saved) : true;
    } catch {
      return true;
    }
  });

  const [activeItem, setActiveItem] = useState<EditableTarget | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_EDIT_MODE, JSON.stringify(isEditMode));
    } catch {}
  }, [isEditMode]);

  // Aliases para sincronizar fotos entre el catálogo general, carrusel y la página específica de producto
  const MEDIA_ALIASES: Record<string, string[]> = {
    // Sacha Inchi
    'img-sacha-inchi': ['img-sacha-semilla', 'carousel-sacha-1'],
    'img-sacha-semilla': ['img-sacha-inchi', 'carousel-sacha-1'],
    'carousel-sacha-1': ['img-sacha-inchi', 'img-sacha-semilla'],
    // Cacao
    'img-cacao': ['carousel-cacao-1'],
    'carousel-cacao-1': ['img-cacao'],
    // Aguaje
    'img-aguaje': ['img-aguaje-hero', 'img-aguaje-deshidratado', 'carousel-aguaje-1'],
    'img-aguaje-hero': ['img-aguaje', 'img-aguaje-deshidratado', 'carousel-aguaje-1'],
    'img-aguaje-deshidratado': ['img-aguaje', 'img-aguaje-hero', 'carousel-aguaje-1'],
    'carousel-aguaje-1': ['img-aguaje', 'img-aguaje-hero', 'img-aguaje-deshidratado'],
    // Coco
    'img-coco': ['img-coco-derivados', 'carousel-coco-1'],
    'img-coco-derivados': ['img-coco', 'carousel-coco-1'],
    'carousel-coco-1': ['img-coco', 'img-coco-derivados'],
    // AgriCobros
    'img-agricobros': ['img-agricobros-hero', 'img-cobragood', 'img-cobragood-hero', 'img-gestion-recaudacion', 'carousel-agricobros-1', 'carousel-cobragood-1'],
    'img-agricobros-hero': ['img-agricobros', 'img-cobragood', 'img-cobragood-hero', 'img-gestion-recaudacion', 'carousel-agricobros-1', 'carousel-cobragood-1'],
    'img-cobragood': ['img-agricobros', 'img-agricobros-hero', 'img-cobragood-hero', 'img-gestion-recaudacion', 'carousel-agricobros-1', 'carousel-cobragood-1'],
    'img-cobragood-hero': ['img-agricobros', 'img-agricobros-hero', 'img-cobragood', 'img-gestion-recaudacion', 'carousel-agricobros-1', 'carousel-cobragood-1'],
    'img-gestion-recaudacion': ['img-agricobros', 'img-agricobros-hero', 'img-cobragood', 'img-cobragood-hero', 'carousel-agricobros-1', 'carousel-cobragood-1'],
    'carousel-cobragood-1': ['carousel-agricobros-1', 'img-agricobros', 'img-agricobros-hero', 'img-cobragood', 'img-cobragood-hero', 'img-gestion-recaudacion'],
    'carousel-agricobros-1': ['carousel-cobragood-1', 'img-agricobros', 'img-agricobros-hero', 'img-cobragood', 'img-cobragood-hero', 'img-gestion-recaudacion'],
    // Gestor Contable
    'img-gestor-hero': ['img-gestor-contable', 'carousel-gestor-1'],
    'img-gestor-contable': ['img-gestor-hero', 'carousel-gestor-1'],
    'carousel-gestor-1': ['img-gestor-hero', 'img-gestor-contable'],
  };

  const getImage = (key: string, defaultSrc: string): string => {
    // 1. Verificar clave directa (descartar blob: temporales caducados)
    const direct = images[key];
    if (direct && !direct.startsWith('blob:')) {
      return direct;
    }

    // 2. Verificar alias relacionados
    const aliases = MEDIA_ALIASES[key] || [];
    for (const aliasKey of aliases) {
      const aliasVal = images[aliasKey];
      if (aliasVal && !aliasVal.startsWith('blob:')) {
        return aliasVal;
      }
    }

    return defaultSrc;
  };

  const setImage = (key: string, newSrc: string) => {
    // Nunca guardar URLs blob temporales en la persistencia
    if (newSrc.startsWith('blob:')) {
      console.warn('Se intentó guardar una URL blob temporal. Ignorando.');
      return;
    }

    setImagesState(prev => {
      const next = { ...prev, [key]: newSrc };
      // Sincronizar automáticamente todos los alias asociados
      const aliases = MEDIA_ALIASES[key] || [];
      for (const alias of aliases) {
        next[alias] = newSrc;
      }
      return next;
    });
  };

  const getImageFit = (key: string, defaultFit: 'cover' | 'contain' = 'cover'): 'cover' | 'contain' => {
    if (imageFits[key]) return imageFits[key];
    const aliases = MEDIA_ALIASES[key] || [];
    for (const alias of aliases) {
      if (imageFits[alias]) return imageFits[alias];
    }
    return defaultFit;
  };

  const setImageFit = (key: string, fit: 'cover' | 'contain') => {
    setImageFitsState(prev => {
      const next = { ...prev, [key]: fit };
      const aliases = MEDIA_ALIASES[key] || [];
      for (const alias of aliases) {
        next[alias] = fit;
      }
      return next;
    });
  };

  const resetImage = (key: string) => {
    setImagesState(prev => {
      const next = { ...prev };
      delete next[key];
      const aliases = MEDIA_ALIASES[key] || [];
      for (const alias of aliases) {
        delete next[alias];
      }
      return next;
    });
    setImageFitsState(prev => {
      const next = { ...prev };
      delete next[key];
      const aliases = MEDIA_ALIASES[key] || [];
      for (const alias of aliases) {
        delete next[alias];
      }
      return next;
    });
  };

  const getBackground = (sectionKey: string, defaultSetting?: BackgroundConfig): BackgroundConfig => {
    return backgrounds[sectionKey] || defaultSetting || {};
  };

  const setBackground = (sectionKey: string, setting: BackgroundConfig) => {
    setBackgroundsState(prev => ({ ...prev, [sectionKey]: setting }));
  };

  const resetBackground = (sectionKey: string) => {
    setBackgroundsState(prev => {
      const next = { ...prev };
      delete next[sectionKey];
      return next;
    });
  };

  const resetAllMedia = () => {
    setImagesState({});
    setBackgroundsState({});
    setImageFitsState({});
    clearAllMediaStorage().catch((err) => {
      console.warn('Error clearing media storage:', err);
    });
  };

  const toggleEditMode = () => {
    setIsEditMode(prev => !prev);
  };

  const openEditor = (target: EditableTarget) => {
    const fit = getImageFit(target.key, 'cover');
    setActiveItem({ ...target, currentFit: fit });
  };

  const closeEditor = () => {
    setActiveItem(null);
  };

  const saveToProjectDisk = async (): Promise<{ success: boolean; message: string; count: number }> => {
    setIsSavingToDisk(true);
    setDiskSaveStatus('Guardando fotos en archivos de proyecto (public/uploads)...');
    try {
      const res = await fetch('/api/media/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ images, backgrounds, fits: imageFits })
      });
      const data = await res.json();
      if (data.success) {
        if (data.images) setImagesState(data.images);
        if (data.backgrounds) setBackgroundsState(data.backgrounds);
        const count = Object.keys(data.images || {}).length;
        setDiskSaveStatus(`¡Guardado exitoso! ${count} elementos asegurados en disco.`);
        return { 
          success: true, 
          message: '¡Fotos guardadas permanentemente en archivos locales para GitHub y ZIP!', 
          count 
        };
      } else {
        throw new Error(data.error || 'Error al guardar');
      }
    } catch (err: any) {
      console.error('Error guardando en disco:', err);
      setDiskSaveStatus('No se pudo sincronizar con el servidor.');
      return { success: false, message: err?.message || 'Error de conexión', count: 0 };
    } finally {
      setIsSavingToDisk(false);
    }
  };

  const exportMediaBackup = () => {
    const payload = {
      app: 'AGRICARL PERÚ S.A.C.',
      version: '1.0',
      exportDate: new Date().toISOString(),
      images,
      backgrounds,
      fits: imageFits
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `agricarl-fotos-respaldo-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const importMediaBackup = async (jsonContent: string): Promise<boolean> => {
    try {
      const parsed = JSON.parse(jsonContent);
      if (parsed.images && typeof parsed.images === 'object') {
        setImagesState(prev => ({ ...prev, ...parsed.images }));
      }
      if (parsed.backgrounds && typeof parsed.backgrounds === 'object') {
        setBackgroundsState(prev => ({ ...prev, ...parsed.backgrounds }));
      }
      if (parsed.fits && typeof parsed.fits === 'object') {
        setImageFitsState(prev => ({ ...prev, ...parsed.fits }));
      }
      // Save directly to disk after import
      setTimeout(() => {
        saveToProjectDisk();
      }, 500);
      return true;
    } catch (err) {
      console.error('Error importando archivo JSON de medios:', err);
      return false;
    }
  };

  return (
    <MediaContext.Provider
      value={{
        images,
        getImage,
        setImage,
        resetImage,
        imageFits,
        getImageFit,
        setImageFit,
        backgrounds,
        getBackground,
        setBackground,
        resetBackground,
        resetAllMedia,
        isEditMode,
        toggleEditMode,
        setEditMode: setIsEditMode,
        activeItem,
        openEditor,
        closeEditor,
        isDrawerOpen,
        setIsDrawerOpen,
        openDrawer: () => setIsDrawerOpen(true),
        closeDrawer: () => setIsDrawerOpen(false),
        saveToProjectDisk,
        exportMediaBackup,
        importMediaBackup,
        isSavingToDisk,
        diskSaveStatus,
      }}
    >
      {children}
    </MediaContext.Provider>
  );
};

export const useMedia = () => {
  const context = useContext(MediaContext);
  if (!context) {
    throw new Error('useMedia must be used within a MediaProvider');
  }
  return context;
};
