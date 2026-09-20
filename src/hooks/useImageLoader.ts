import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';

export interface UseImageLoaderOptions {
  /**
   * Primary image URL or data URI to load.
   */
  src: string;
  /**
   * Fallback image source if primary src fails to load.
   */
  fallbackSrc?: string;
  /**
   * Custom placeholder URL to show while loading or if both src and fallbackSrc fail.
   */
  placeholderSrc?: string;
  /**
   * Enable browser native lazy loading attribute: 'lazy' vs 'eager'.
   * @default true
   */
  lazy?: boolean;
  /**
   * Browser decoding strategy.
   * @default 'async'
   */
  decoding?: 'async' | 'sync' | 'auto';
  /**
   * Enable in-memory resolution normalization & compression for oversized images
   * (e.g., raw camera captures, >2K/4K images, or huge uncompressed base64 data URIs).
   * @default true
   */
  enableCompression?: boolean;
  /**
   * Maximum width or height constraint before downscaling in pixels.
   * Prevents mobile GPU crashes or memory overflow with high-resolution photos.
   * @default 1920
   */
  maxDimension?: number;
  /**
   * Compression quality (0.0 to 1.0) when re-encoding oversized images.
   * @default 0.85
   */
  quality?: number;
  /**
   * Cross-origin attribute for image elements if canvas extraction is required.
   */
  crossOrigin?: 'anonymous' | 'use-credentials';
}

export interface ImageDimensions {
  width: number;
  height: number;
  aspectRatio: number;
}

export interface UseImageLoaderReturn {
  /**
   * The active image source to render (loading placeholder, compressed/normalized src, or fallback).
   */
  currentSrc: string;
  /**
   * Loading state flags.
   */
  status: 'idle' | 'loading' | 'loaded' | 'error';
  isLoading: boolean;
  isLoaded: boolean;
  hasError: boolean;
  error: Error | string | null;
  /**
   * Dimensions of the loaded image.
   */
  dimensions: ImageDimensions | null;
  /**
   * Whether compression / resolution downscaling was applied.
   */
  isCompressed: boolean;
  /**
   * Formatted resolution string (e.g. "1920 × 1080").
   */
  resolutionText: string | null;
  /**
   * Function to re-attempt loading the image.
   */
  reload: () => void;
  /**
   * Pre-packaged props to spread directly onto an <img /> element.
   */
  imgProps: {
    src: string;
    loading: 'lazy' | 'eager';
    decoding: 'async' | 'sync' | 'auto';
    onLoad: (e: React.SyntheticEvent<HTMLImageElement>) => void;
    onError: (e: React.SyntheticEvent<HTMLImageElement>) => void;
  };
}

/**
 * Modern SVG placeholder data URL styled for Agricarl Amazonica
 */
export const DEFAULT_SVG_PLACEHOLDER = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600" fill="none">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f172a" />
      <stop offset="100%" stop-color="#1e293b" />
    </linearGradient>
  </defs>
  <rect width="800" height="600" fill="url(#bg)"/>
  <rect x="2" y="2" width="796" height="596" rx="12" stroke="#334155" stroke-width="1.5" stroke-dasharray="6 6"/>
  <g transform="translate(400, 300)" text-anchor="middle">
    <circle cx="0" cy="-24" r="42" fill="#1e293b" stroke="#334155" stroke-width="2"/>
    <path d="M-18 -12 L-6 -26 L8 -12 L16 -20 L24 -8 L-24 -8 Z" fill="#10b981" fill-opacity="0.8"/>
    <circle cx="12" cy="-30" r="5" fill="#38bdf8"/>
    <text y="44" fill="#94a3b8" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="600" letter-spacing="0.5">AGRICARL • AMAZONÍA</text>
    <text y="66" fill="#64748b" font-family="system-ui, -apple-system, sans-serif" font-size="12">Cargando imagen optimizada...</text>
  </g>
</svg>
`)}`;

/**
 * In-memory LRU-like cache for normalized/compressed image representations
 * to prevent repeated canvas re-compression across component re-renders.
 */
const COMPRESSION_CACHE = new Map<string, { src: string; dims: ImageDimensions }>();

/**
 * Compresses/normalizes an image using HTML Canvas if dimensions or data size exceed thresholds.
 */
async function compressImageOnCanvas(
  imgElement: HTMLImageElement,
  maxDim: number,
  quality: number
): Promise<{ compressedSrc: string; dims: ImageDimensions; didCompress: boolean }> {
  const origW = imgElement.naturalWidth || imgElement.width || 800;
  const origH = imgElement.naturalHeight || imgElement.height || 600;
  const aspectRatio = origH > 0 ? origW / origH : 1;

  const dims: ImageDimensions = {
    width: origW,
    height: origH,
    aspectRatio,
  };

  // If dimensions already fit within constraints and not a massive data URL, no compression needed
  const isOversized = origW > maxDim || origH > maxDim;
  const isHugeDataUrl = imgElement.src.startsWith('data:') && imgElement.src.length > 1_500_000;

  if (!isOversized && !isHugeDataUrl) {
    return { compressedSrc: imgElement.src, dims, didCompress: false };
  }

  // Calculate proportional target dimensions
  const scale = Math.min(maxDim / origW, maxDim / origH, 1);
  const targetW = Math.max(1, Math.round(origW * scale));
  const targetH = Math.max(1, Math.round(origH * scale));

  try {
    const canvas = document.createElement('canvas');
    canvas.width = targetW;
    canvas.height = targetH;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return { compressedSrc: imgElement.src, dims, didCompress: false };
    }

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    // Draw and downscale smoothly
    ctx.drawImage(imgElement, 0, 0, targetW, targetH);

    // Prefer WebP if supported, fallback to JPEG
    let outputUrl = '';
    try {
      outputUrl = canvas.toDataURL('image/webp', quality);
      if (!outputUrl || outputUrl.length < 100 || outputUrl === 'data:,') {
        outputUrl = canvas.toDataURL('image/jpeg', quality);
      }
    } catch {
      outputUrl = canvas.toDataURL('image/jpeg', quality);
    }

    if (outputUrl && outputUrl.length > 100) {
      return {
        compressedSrc: outputUrl,
        dims: { width: targetW, height: targetH, aspectRatio: targetW / targetH },
        didCompress: true,
      };
    }
  } catch {
    // Canvas tainted (CORS) or browser canvas restriction: safely fallback to original
  }

  return { compressedSrc: imgElement.src, dims, didCompress: false };
}

/**
 * useImageLoader
 *
 * Comprehensive hook that:
 * 1. Tracks image loading states ('idle' | 'loading' | 'loaded' | 'error').
 * 2. Provides reliable fallback placeholders on load failure or slow network.
 * 3. Utilizes browser native lazy loading and async decoding.
 * 4. Normalizes high-resolution or oversized camera uploads with client-side compression.
 */
export function useImageLoader({
  src,
  fallbackSrc,
  placeholderSrc = DEFAULT_SVG_PLACEHOLDER,
  lazy = true,
  decoding = 'async',
  enableCompression = true,
  maxDimension = 1920,
  quality = 0.85,
  crossOrigin,
}: UseImageLoaderOptions): UseImageLoaderReturn {
  const [status, setStatus] = useState<'idle' | 'loading' | 'loaded' | 'error'>('loading');
  const [currentSrc, setCurrentSrc] = useState<string>(() => src || fallbackSrc || placeholderSrc);
  const [dimensions, setDimensions] = useState<ImageDimensions | null>(null);
  const [isCompressed, setIsCompressed] = useState(false);
  const [error, setError] = useState<Error | string | null>(null);

  // Attempt tracker to avoid infinite loops on repeated fallback errors
  const attemptsRef = useRef<{ triedPrimary: boolean; triedFallback: boolean }>({
    triedPrimary: false,
    triedFallback: false,
  });

  const isMountedRef = useRef(true);
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  // Main loader workflow
  const loadImage = useCallback(
    (targetSrc: string, isFallbackAttempt = false) => {
      if (!targetSrc) {
        if (!isFallbackAttempt && fallbackSrc) {
          loadImage(fallbackSrc, true);
        } else {
          setStatus('error');
          setError('No valid image URL provided');
          setCurrentSrc(placeholderSrc);
        }
        return;
      }

      setStatus('loading');
      setError(null);

      // Check cache first for instant resolution if previously compressed
      const cacheKey = `${targetSrc}_${maxDimension}_${quality}`;
      if (COMPRESSION_CACHE.has(cacheKey)) {
        const cached = COMPRESSION_CACHE.get(cacheKey)!;
        setCurrentSrc(cached.src);
        setDimensions(cached.dims);
        setIsCompressed(cached.src !== targetSrc);
        setStatus('loaded');
        return;
      }

      const img = new Image();
      if (crossOrigin) {
        img.crossOrigin = crossOrigin;
      }
      img.decoding = decoding;

      let isCancelled = false;

      img.onload = async () => {
        if (isCancelled || !isMountedRef.current) return;

        const w = img.naturalWidth || img.width;
        const h = img.naturalHeight || img.height;
        const initialDims: ImageDimensions = {
          width: w,
          height: h,
          aspectRatio: h > 0 ? w / h : 1,
        };

        // Determine if client-side compression/downscaling is advantageous
        if (enableCompression && (w > maxDimension || h > maxDimension || (targetSrc.startsWith('data:') && targetSrc.length > 1_500_000))) {
          try {
            const { compressedSrc, dims, didCompress } = await compressImageOnCanvas(img, maxDimension, quality);
            if (isCancelled || !isMountedRef.current) return;

            COMPRESSION_CACHE.set(cacheKey, { src: compressedSrc, dims });
            setCurrentSrc(compressedSrc);
            setDimensions(dims);
            setIsCompressed(didCompress);
            setStatus('loaded');
            return;
          } catch {
            // Fall through to uncompressed
          }
        }

        // Standard successful load
        COMPRESSION_CACHE.set(cacheKey, { src: targetSrc, dims: initialDims });
        setCurrentSrc(targetSrc);
        setDimensions(initialDims);
        setIsCompressed(false);
        setStatus('loaded');
      };

      img.onerror = () => {
        if (isCancelled || !isMountedRef.current) return;

        // If primary source failed and fallback is available, try fallback
        if (!isFallbackAttempt && fallbackSrc && fallbackSrc !== targetSrc) {
          attemptsRef.current.triedFallback = true;
          loadImage(fallbackSrc, true);
        } else {
          setStatus('error');
          setError(`No se pudo cargar la imagen: ${targetSrc.slice(0, 60)}...`);
          setCurrentSrc(placeholderSrc);
        }
      };

      img.src = targetSrc;

      return () => {
        isCancelled = true;
      };
    },
    [fallbackSrc, placeholderSrc, crossOrigin, decoding, enableCompression, maxDimension, quality]
  );

  // Trigger loading whenever primary `src` or `fallbackSrc` updates
  useEffect(() => {
    attemptsRef.current = { triedPrimary: true, triedFallback: false };
    const cleanup = loadImage(src);
    return () => {
      if (cleanup) cleanup();
    };
  }, [src, loadImage]);

  const reload = useCallback(() => {
    attemptsRef.current = { triedPrimary: true, triedFallback: false };
    loadImage(src);
  }, [src, loadImage]);

  // Synthetic event handlers for direct <img /> integration
  const handleImgLoad = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      const img = e.currentTarget;
      if (img.naturalWidth && img.naturalHeight) {
        setDimensions({
          width: img.naturalWidth,
          height: img.naturalHeight,
          aspectRatio: img.naturalWidth / img.naturalHeight,
        });
      }
      setStatus('loaded');
    },
    []
  );

  const handleImgError = useCallback(
    () => {
      if (!attemptsRef.current.triedFallback && fallbackSrc && fallbackSrc !== currentSrc) {
        attemptsRef.current.triedFallback = true;
        loadImage(fallbackSrc, true);
      } else {
        setStatus('error');
        setCurrentSrc(placeholderSrc);
      }
    },
    [fallbackSrc, currentSrc, placeholderSrc, loadImage]
  );

  const resolutionText = useMemo(() => {
    if (!dimensions) return null;
    return `${dimensions.width} × ${dimensions.height} px`;
  }, [dimensions]);

  return {
    currentSrc,
    status,
    isLoading: status === 'loading',
    isLoaded: status === 'loaded',
    hasError: status === 'error',
    error,
    dimensions,
    isCompressed,
    resolutionText,
    reload,
    imgProps: {
      src: currentSrc,
      loading: lazy ? 'lazy' : 'eager',
      decoding,
      onLoad: handleImgLoad,
      onError: handleImgError,
    },
  };
}

export default useImageLoader;
