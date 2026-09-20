/**
 * Utilidades de Almacenamiento Persistente e Inteligente de Medios (IndexedDB)
 * y Compresión Automática de Imágenes para AGRICARL PERÚ.
 * 
 * Resuelve definitivamente los problemas de peso ("QuotaExceededError" en localStorage de 5MB)
 * permitiendo almacenar decenas de fotos de alta resolución optimizadas sin límites restrictivos.
 */

import { BackgroundConfig } from '../context/MediaContext';

const DB_NAME = 'agricarl_media_db_v2';
const DB_VERSION = 1;
const STORE_NAME = 'media_store';

const KEY_IMAGES_RECORD = 'all_images';
const KEY_BACKGROUNDS_RECORD = 'all_backgrounds';

// Fallback legacy localStorage keys for migration
const LEGACY_STORAGE_KEY_IMAGES = 'agricarl_media_overrides_v1';
const LEGACY_STORAGE_KEY_BGS = 'agricarl_bg_overrides_v1';

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB no está disponible en este entorno.'));
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

/**
 * Carga todas las imágenes y fondos guardados en IndexedDB.
 * Si no existen, revisa y migra los datos antiguos de localStorage.
 */
export async function loadStoredMedia(): Promise<{
  images: Record<string, string>;
  backgrounds: Record<string, BackgroundConfig>;
  fits: Record<string, 'cover' | 'contain'>;
}> {
  let images: Record<string, string> = {};
  let backgrounds: Record<string, BackgroundConfig> = {};
  let fits: Record<string, 'cover' | 'contain'> = {};

  try {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);

    const [imgs, bgs, savedFits] = await Promise.all([
      new Promise<Record<string, string> | undefined>((resolve) => {
        const req = store.get(KEY_IMAGES_RECORD);
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => resolve(undefined);
      }),
      new Promise<Record<string, BackgroundConfig> | undefined>((resolve) => {
        const req = store.get(KEY_BACKGROUNDS_RECORD);
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => resolve(undefined);
      }),
      new Promise<Record<string, 'cover' | 'contain'> | undefined>((resolve) => {
        const req = store.get(KEY_FITS_RECORD);
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => resolve(undefined);
      }),
    ]);

    if (imgs && typeof imgs === 'object') {
      images = imgs;
    }
    if (bgs && typeof bgs === 'object') {
      backgrounds = bgs;
    }
    if (savedFits && typeof savedFits === 'object') {
      fits = savedFits;
    }
  } catch (err) {
    console.warn('No se pudo acceder a IndexedDB, revisando localStorage:', err);
  }

  // Migración desde localStorage si IndexedDB estaba vacío
  if (Object.keys(images).length === 0) {
    try {
      const legacyImgs = localStorage.getItem(LEGACY_STORAGE_KEY_IMAGES);
      if (legacyImgs) {
        images = JSON.parse(legacyImgs);
        saveAllImagesToStorage(images).catch(() => {});
      }
    } catch {}
  }

  if (Object.keys(backgrounds).length === 0) {
    try {
      const legacyBgs = localStorage.getItem(LEGACY_STORAGE_KEY_BGS);
      if (legacyBgs) {
        backgrounds = JSON.parse(legacyBgs);
        saveAllBackgroundsToStorage(backgrounds).catch(() => {});
      }
    } catch {}
  }

  if (Object.keys(fits).length === 0) {
    try {
      const legacyFits = localStorage.getItem(LEGACY_STORAGE_KEY_FITS);
      if (legacyFits) {
        fits = JSON.parse(legacyFits);
      }
    } catch {}
  }

  return { images, backgrounds, fits };
}

/**
 * Guarda todas las preferencias de encuadre (cover vs contain) en IndexedDB
 */
export async function saveAllFitsToStorage(fits: Record<string, 'cover' | 'contain'>): Promise<void> {
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    store.put(fits, KEY_FITS_RECORD);
    await new Promise((resolve, reject) => {
      tx.oncomplete = resolve;
      tx.onerror = () => reject(tx.error);
    });

    try {
      localStorage.setItem(LEGACY_STORAGE_KEY_FITS, JSON.stringify(fits));
    } catch {}
  } catch (err) {
    console.warn('Error guardando ajustes de imagen en IndexedDB:', err);
  }
}

/**
 * Guarda todo el catálogo de imágenes en IndexedDB
 */
export async function saveAllImagesToStorage(images: Record<string, string>): Promise<void> {
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    store.put(images, KEY_IMAGES_RECORD);
    await new Promise((resolve, reject) => {
      tx.oncomplete = resolve;
      tx.onerror = () => reject(tx.error);
    });

    // Como respaldo secundario y no bloqueante, intentar sincronizar una versión ligera a localStorage
    try {
      // Filtrar imágenes que pesen menos de 100kb para no saturar los 5MB de localStorage
      const safeForLocalStorage: Record<string, string> = {};
      for (const [k, v] of Object.entries(images)) {
        if (v.length < 150000) {
          safeForLocalStorage[k] = v;
        }
      }
      localStorage.setItem(LEGACY_STORAGE_KEY_IMAGES, JSON.stringify(safeForLocalStorage));
    } catch {}
  } catch (err) {
    console.warn('Error guardando imágenes en IndexedDB:', err);
  }
}

/**
 * Guarda todas las configuraciones de fondos en IndexedDB
 */
export async function saveAllBackgroundsToStorage(backgrounds: Record<string, BackgroundConfig>): Promise<void> {
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    store.put(backgrounds, KEY_BACKGROUNDS_RECORD);
    await new Promise((resolve, reject) => {
      tx.oncomplete = resolve;
      tx.onerror = () => reject(tx.error);
    });

    try {
      localStorage.setItem(LEGACY_STORAGE_KEY_BGS, JSON.stringify(backgrounds));
    } catch {}
  } catch (err) {
    console.warn('Error guardando fondos en IndexedDB:', err);
  }
}

/**
 * Limpia todas las personalizaciones guardadas
 */
export async function clearAllMediaStorage(): Promise<void> {
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    store.clear();
    await new Promise((resolve) => {
      tx.oncomplete = resolve;
    });
  } catch {}

  try {
    localStorage.removeItem(LEGACY_STORAGE_KEY_IMAGES);
    localStorage.removeItem(LEGACY_STORAGE_KEY_BGS);
  } catch {}
}

/**
 * Transforma enlaces comunes (como Google Drive o Dropbox) a enlaces directos de imagen
 */
export function transformImageUrl(url: string): string {
  if (!url) return '';
  const trimmed = url.trim();

  // Caso Google Drive: https://drive.google.com/file/d/ID/view?usp=sharing
  const gDriveMatch = trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || trimmed.match(/id=([a-zA-Z0-9_-]+)/);
  if (trimmed.includes('drive.google.com') && gDriveMatch && gDriveMatch[1]) {
    const fileId = gDriveMatch[1];
    // Si es un video o enlace preview, mantener el reproductor de Drive
    if (trimmed.includes('/preview')) {
      return `https://drive.google.com/file/d/${fileId}/preview`;
    }
    // Google User Content directo compatible con etiquetas <img>
    return `https://lh3.googleusercontent.com/d/${fileId}`;
  }

  // Caso Dropbox: transformar ?dl=0 en ?raw=1
  if (trimmed.includes('dropbox.com')) {
    if (trimmed.includes('dl=0')) {
      return trimmed.replace('dl=0', 'raw=1');
    }
    if (!trimmed.includes('raw=1')) {
      const sep = trimmed.includes('?') ? '&' : '?';
      return `${trimmed}${sep}raw=1`;
    }
  }

  return trimmed;
}

export interface OptimizationResult {
  dataUrl: string;
  originalSize: number;
  optimizedSize: number;
  width: number;
  height: number;
  format: string;
  reductionPercentage: number;
}

const KEY_FITS_RECORD = 'all_fits';
const LEGACY_STORAGE_KEY_FITS = 'agricarl_fits_overrides_v1';

/**
 * Normaliza Data URLs para asegurar que tengan un MIME type de imagen válido
 */
export function normalizeImageDataUrl(dataUrl: string, fallbackMime = 'image/jpeg'): string {
  if (!dataUrl || !dataUrl.startsWith('data:')) return dataUrl;
  if (
    dataUrl.startsWith('data:application/octet-stream;') || 
    dataUrl.startsWith('data:application/x-') ||
    dataUrl.startsWith('data:;base64,') ||
    dataUrl.startsWith('data:image/pjpeg;') ||
    dataUrl.startsWith('data:binary/')
  ) {
    return dataUrl.replace(/^data:[^;]*;/, `data:${fallbackMime};`);
  }
  return dataUrl;
}

/**
 * Lee un archivo directamente a Data URL de forma garantizada y normalizada
 */
export function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const res = (e.target?.result as string) || '';
      resolve(normalizeImageDataUrl(res));
    };
    reader.onerror = () => reject(new Error('No se pudo leer el archivo.'));
    reader.readAsDataURL(file);
  });
}

/**
 * Optimiza e ingesta automáticamente CUALQUIER archivo de imagen de cualquier resolución
 * (desde 1 Megapixel hasta 100+ Megapixels, cámaras 4K/8K, fotos de 50MB).
 * 
 * - Si canvas o decodificación fallan, NUNCA deja la imagen en blanco: retorna la Data URL original leída por FileReader.
 * - Escala proporcionalmente hasta un máximo de 1920x1920 manteniendo nitidez cristalina.
 * - Comprime a JPEG/WebP de alta fidelidad que se guarda en IndexedDB al instante.
 */
export async function optimizeImageFile(
  file: File,
  maxWidth = 1920,
  maxHeight = 1920,
  quality = 0.85
): Promise<OptimizationResult> {
  // 1. Siempre obtener primero la Data URL directa y confiable
  const rawDataUrl = await readFileAsDataUrl(file);
  const safeDataUrl = normalizeImageDataUrl(rawDataUrl);

  // Archivos vectoriales SVG no necesitan rasterización ni compresión
  if (file.type === 'image/svg+xml' || file.name.toLowerCase().endsWith('.svg')) {
    return {
      dataUrl: safeDataUrl,
      originalSize: file.size,
      optimizedSize: file.size,
      width: 800,
      height: 800,
      format: 'SVG Vectorial',
      reductionPercentage: 0
    };
  }

  // 2. Intentar escalar con HTMLImageElement + Canvas de forma no bloqueante y segura
  try {
    const img = new Image();
    await new Promise<void>((resolve, reject) => {
      const timeout = setTimeout(() => {
        resolve(); // Si tarda más de 2 segundos, no bloquear, usar directa
      }, 2000);

      img.onload = () => {
        clearTimeout(timeout);
        resolve();
      };
      img.onerror = () => {
        clearTimeout(timeout);
        resolve(); // Continuar con la imagen directa sin lanzar error
      };
      img.src = safeDataUrl;
    });

    const origWidth = img.naturalWidth || img.width;
    const origHeight = img.naturalHeight || img.height;

    // Si no se detectaron dimensiones o la imagen ya es pequeña y ligera, usarla directamente
    if (!origWidth || !origHeight || (origWidth <= maxWidth && origHeight <= maxHeight && file.size < 500000)) {
      return {
        dataUrl: safeDataUrl,
        originalSize: file.size,
        optimizedSize: file.size,
        width: origWidth || 1200,
        height: origHeight || 800,
        format: 'HD Directo',
        reductionPercentage: 0
      };
    }

    // 3. Calcular resolución destino manteniendo el aspecto exacto
    const scale = Math.min(maxWidth / origWidth, maxHeight / origHeight, 1);
    const targetWidth = Math.max(1, Math.round(origWidth * scale));
    const targetHeight = Math.max(1, Math.round(origHeight * scale));

    // 4. Crear canvas
    const canvas = document.createElement('canvas');
    canvas.width = targetWidth;
    canvas.height = targetHeight;

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return {
        dataUrl: safeDataUrl,
        originalSize: file.size,
        optimizedSize: file.size,
        width: origWidth,
        height: origHeight,
        format: 'HD Directo',
        reductionPercentage: 0
      };
    }

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    const isAlphaCandidate = file.type === 'image/png' || file.type === 'image/webp';
    if (!isAlphaCandidate) {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, targetWidth, targetHeight);
    }

    ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

    let outputFormat = isAlphaCandidate ? 'image/webp' : 'image/jpeg';
    let outputDataUrl = '';
    try {
      outputDataUrl = canvas.toDataURL(outputFormat, quality);
      if (!outputDataUrl || outputDataUrl === 'data:,' || outputDataUrl.length < 50) {
        outputFormat = 'image/jpeg';
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, targetWidth, targetHeight);
        ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
        outputDataUrl = canvas.toDataURL('image/jpeg', quality);
      }
    } catch {
      outputDataUrl = safeDataUrl;
    }

    if (!outputDataUrl || outputDataUrl === 'data:,' || outputDataUrl.length < 50) {
      outputDataUrl = safeDataUrl;
    }

    const approxByteSize = Math.round((outputDataUrl.length * 3) / 4);
    const reduction = file.size > 0 
      ? Math.max(0, Math.round(((file.size - approxByteSize) / file.size) * 100))
      : 0;

    return {
      dataUrl: outputDataUrl,
      originalSize: file.size,
      optimizedSize: approxByteSize,
      width: targetWidth,
      height: targetHeight,
      format: outputFormat.includes('webp') ? 'WebP HD' : 'JPEG HD',
      reductionPercentage: reduction
    };
  } catch {
    // Garantía absoluta: siempre devuelve la imagen leída con éxito
    return {
      dataUrl: safeDataUrl,
      originalSize: file.size,
      optimizedSize: file.size,
      width: 1200,
      height: 800,
      format: 'HD Directo',
      reductionPercentage: 0
    };
  }
}

/**
 * Formatea bytes en formato legible (KB, MB)
 */
export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}
